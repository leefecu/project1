// @flow

import React, { PureComponent } from 'react'
import {
    Platform,
    Dimensions,
    Image,
    View,
    Text,
    ScrollView,
    TouchableHighlight
} from 'react-native'
import { assign, map, chunk } from 'lodash'

import { Colors, Images, Layout } from '../../../Themes'


//Styles
import Styles from './Styles/ReviewInfo'

var window = Dimensions.get('window')

class ReviewInfo extends PureComponent {

    constructor (props) {
        super(props)
    }

    render() {
        const {
            rating,
            reviewsCnt
        } = this.props

        return (
            <View style={[Styles.container]}>
                <View style={Styles.innerContainer}>
                    <View style={[Styles.contentContainer]}>
                        <View style={[Styles.imgContainer]}>
                            <Image source={Images.reviewRatingIcon} resizeMode='contain'/>
                        </View>
                        <View style={[Styles.txtContainer]}>
                            <Text style={Styles.valaueTxt}>{rating ? rating.toFixed(1) : 0}</Text>
                            <Text style={Styles.valueLabelTxt}>RATINGS</Text>
                        </View>
                    </View>
                    <View style={Styles.seperatorContainer}>
                        <View style={Styles.seperator}>
                        </View>
                    </View>
                    <TouchableHighlight 
                        onPress={this.props.onClickReviews}
                        underlayColor={Colors.snow} >
                        <View style={[Styles.contentContainer]}>
                            <View style={[Styles.imgContainer]}>
                                <Image source={Images.reviewCountIcon} resizeMode='contain'/>
                            </View>
                            <View style={[Styles.txtContainer]}>
                                <Text style={Styles.valaueTxt}>{reviewsCnt}</Text>
                                <Text style={Styles.valueLabelTxt}>REVIEWS</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
                    
        )
    }
}

export default ReviewInfo
