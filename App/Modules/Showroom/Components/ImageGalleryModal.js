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

import ShowroomActions from '../Actions'
import * as ShowroomSelectors from '../Selectors'

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

    constructor (props) {
        super(props)

        this.state = {
            currentImageIndex: this.props.initialImageIndex + 1,
            orientation: 'PORTRAIT'
        }

        this.closeModal = this.closeModal.bind(this)
        this.onSwiped = this.onSwiped.bind(this)
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
            this.setState({currentImageIndex: newProps.initialImageIndex + 1})
            Orientation.unlockAllOrientations()
        }
    }

    closeModal () {
        this.setState({currentImageIndex: 1})
        Orientation.lockToPortrait()
        this.props.closeModal()
    }

    onSwiped (e, state, context) {
        this.setState({currentImageIndex: state.index + 1})
    }

    renderHeader () {
        const {car} = this.props
        const {
            currentImageIndex,
            orientation
        } = this.state

        return orientation === 'PORTRAIT' && (
        <View style={Styles.header}>
            <Text style={Styles.closeButton}></Text>
            <Text style={Styles.titleText}>{`${currentImageIndex} of ${car.images.length}`}</Text>

            <TouchableOpacity
                style={Styles.closeButton}
                onPress={this.closeModal}
            >
                <View style={Styles.closeTextContainer}>
                    <Text style={Styles.closeText}>Close</Text>
                </View>
            </TouchableOpacity>
        </View>
        )
    }

    render () {
        const {
            car,
            initialImageIndex,
            modalVisible
        } = this.props

        const {
            currentImageIndex,
            orientation
        } = this.state

        return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={modalVisible}
            onRequestClose={this.closeModal}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={Styles.container}>
                {this.renderHeader()}

                <ImageGallery
                    initialImageIndex={initialImageIndex}
                    images={car.images}
                    onSwiped={this.onSwiped}
                    orientation={orientation}
                />

            </View>
        </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        car: ShowroomSelectors.getShowroomSelecterCar(state),
        initialImageIndex: ShowroomSelectors.getInitialImageIndex(state),
        modalVisible: ShowroomSelectors.getShowroomImageGalleryModalVisible(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(ShowroomActions.closeShowroomImageGallery())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageGalleryModal)
