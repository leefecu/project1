import React, {PureComponent} from 'react'
import {
    ActivityIndicator,
    View,
    Image,
    TouchableWithoutFeedback,
    Dimensions,
    Platform
} from 'react-native'
import ImageProgress from 'react-native-image-progress'
import {map, noop} from 'lodash'
import Swiper from 'react-native-swiper';
import { ApplicationStyles, Colors, Images } from '../../../Themes'

//Styles
import Styles from './Styles/ImageSwiper'

const { width, height } = Dimensions.get('window')

class SwiperImage extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            imageLoaded: false
        }
    }

    render () {
        const {
            image,
            index
        } = this.props

        return (
        <TouchableWithoutFeedback
            onPress={() => this.props.onImagePress(index)}
        >

            <View style={Styles.imageContainer}>

                <Image
                    source={Images.noImagesL}
                    resizeMode='contain'
                    style={[Styles.noImageL]}
                />

                <ImageProgress
                    source={{uri: image}}
                    indicator={ActivityIndicator}
                    style={Styles.image}
                    resizeMode='contain'
                />
            </View>
        </TouchableWithoutFeedback>
        )
    }
}

export default class ImageSwiper extends PureComponent {

    render() {
        return this.props.images.length > 0 ? (
            <Swiper
                containerStyle={Styles.container}
                height={parseInt(width / 4 * 3)}
                showsButtons={this.props.showsButtons}
                showsPagination={this.props.showsPagination}
                removeClippedSubviews={false}
                scrollEnabled={true}
                name='image-swiper'
                loadMinimal={true}
                loadMinimalSize={3}
                paginationStyle={Platform.OS === 'ios' ? Styles.paginationIOS : Styles.paginationAndroid}
                dotColor={Colors.lighterBlueGrey} 
                activeDotColor={Platform.OS === 'ios' ? Colors.brandColor : Colors.primaryPink} 
                dotStyle={Styles.button}
                activeDotStyle={Styles.button}
            >
                {map(this.props.images, (image, index) => {
                    return <SwiperImage key={index} index={index} onImagePress={this.props.onImagePress} image={image} />
                })}
            </Swiper>
        ) : (
        <View
            style={[Styles.noImageContainer]}
        >
            <Image
                source={Images.noImagesL}
                resizeMode='contain'
                style={[Styles.noImage]}
            />
        </View>
        )
    }
}

ImageSwiper.defaultProps = {
    showsPagination: false,
    showsButtons: false,
    onImagePress: noop
}
