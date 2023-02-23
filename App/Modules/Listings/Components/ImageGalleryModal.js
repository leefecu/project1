import React, {PureComponent} from 'react'
import ReactNative, {
    Image,
    ActivityIndicator,
    Dimensions,
    Modal,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import {map, noop} from 'lodash'
import Orientation from 'react-native-orientation'
import PhotoView from 'react-native-photo-view'
import { Colors, Images, Layout } from '../../../Themes'

import ListingActions from '../Actions'
import * as ListingSelectors from '../Selectors'

import Button from '../../Core/Components/Button'

//Styles
import Styles from './Styles/ImageGalleryModal'


class ImageGallery extends PureComponent {

    render () {
        const {
            initialImageIndex,
            images,
            orientation
        } = this.props

        const imageStyle = orientation === 'PORTRAIT' ? Styles.image : Styles.landscapeImage

        return (
            <Swiper
                containerStyle={Styles.galleryContainer}
                index={initialImageIndex}
                showsButtons={false}
                showsPagination={false}
                removeClippedSubviews={false}
                scrollEnabled={true}
                onMomentumScrollEnd={this.props.onSwiped}
                name='image-gallery-swiper'
                loadMinimal={true}
                loadMinimalSize={2} >

                {map(images, (image, index) => {
                    return (
                        <View style={Styles.slide} key={index}>
                            <PhotoView
                                key={index}
                                source={{uri: image}}
                                style={orientation === 'PORTRAIT' ? Styles.image : Styles.landscapeImage}
                                indicator={ActivityIndicator}
                                resizeMode='contain'
                                scale={1}
                                onTap={this.onTap}
                                minimumZoomScale={1}
                                maximumZoomScale={3}
                                androidScaleType="fitCenter"
                            />
                        </View>
                    )
                })}
                
            </Swiper>
        )
    }
}

class ImageGalleryModal extends PureComponent {
    static navigatorStyle = {
        drawUnderNavBar: Platform.OS === 'ios',
        navBarBackgroundColor: Colors.background,
        navBarTextColor: Colors.snow
    };

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Close',
                id: 'close',
                testID: 'listing_imgGallery_close_btn',
                buttonColor: Colors.snow,
                buttonFontSize: 18,
                buttonFontWeight: '600'
            }
        ]
    }

    constructor (props) {
        super(props)

        this.state = {
            orientation: 'PORTRAIT'
        }
        
        this.onSwiped = this.onSwiped.bind(this)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
        this.props.navigator.setTitle({
            title: `${this.props.initialImageIndex + 1} of ${this.props.car.images.length}`
        })
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange)
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange)
    }

    _orientationDidChange = (orientation) => {
        this.setState({
            orientation
        })
    }

    componentWillReceiveProps (newProps) {
        if (this.props.modalVisible !== newProps.modalVisible && newProps.modalVisible) {
            Orientation.unlockAllOrientations()
        }
    }

    onNavigatorEvent (event) {
        if (event && event.type == 'NavBarButtonPress' && event.id == 'close') {
            Orientation.lockToPortrait()
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    onSwiped (e, state, context) {
        this.props.navigator.setTitle({
            title: `${state.index + 1} of ${this.props.car.images.length}`
        })
    }

    render () {
        const {
            car,
            initialImageIndex,
            modalVisible
        } = this.props

        const {
            orientation
        } = this.state

        return (
            <View style={Styles.container}>
                <ImageGallery
                    initialImageIndex={initialImageIndex}
                    images={car.images}
                    onSwiped={this.onSwiped}
                    orientation={orientation}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        car: ListingSelectors.getSelecterCar(state),
        initialImageIndex: ListingSelectors.getInitialImageIndex(state),
        modalVisible: ListingSelectors.getImageGalleryModalVisible(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(ListingActions.closeImageGallery())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageGalleryModal)
