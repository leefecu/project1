import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { ApplicationStyles, Images, Metrics, Layout, Colors } from '../../../Themes'
import { range, map } from 'lodash'


//Styles
import Styles from './Styles/RatingIcons'

 
class RatingIcons extends PureComponent {
    
    constructor (props) {
        super(props)

        this._renderRatingImages = this._renderRatingImages.bind(this)
    }

    _renderRatingImages(current, idx) {
        const {
            reviewRating
        } = this.props

        let imgsource = Images.reviewFilled
        if(current > reviewRating){
            imgsource = Images.reviewEmpty
        }

        return (
            <View key={idx} style={Styles.ratingIconContainer}>
                <Image source={imgsource} style={Styles.ratingIcon} resizeMode='contain'/>
            </View>
        )
    }

    _renderWriteRatingImages(current, idx) {

        const {
            reviewRating,
            onClickRating
        } = this.props

        let imgsource = Images.reviewFilled
        if(current > reviewRating){
            imgsource = Images.reviewEmpty
        }

        return (
            <TouchableWithoutFeedback key={idx} onPress={() => onClickRating(current)}>
                <View style={Styles.ratingIconContainer}>
                    <Image source={imgsource} style={Styles.writeRatingIcon} resizeMode='contain'/>
                </View>
            </TouchableWithoutFeedback>
        )        
    }

    render() {
        const ratingRange = range(1, 6)

        return (
            <View style={Styles.container}>
                { this.props.writeReview ?
                    ratingRange.map((range, idx)=>this._renderWriteRatingImages(range, idx)) 
                :
                    ratingRange.map((range, idx)=>this._renderRatingImages(range, idx))
                }
            </View>
        )
    }
};

export default RatingIcons