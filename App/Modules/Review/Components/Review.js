import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    Image
} from 'react-native';
import { ApplicationStyles, Images, Metrics, Layout, Colors } from '../../../Themes'
import { range, map } from 'lodash'
import moment from 'moment'

import RatingIcons from './RatingIcons'


//Styles
import Styles from './Styles/Review'

 
class Review extends PureComponent {
    
    constructor (props) {
        super(props)

        this._renderDateInfo = this._renderDateInfo.bind(this)
        this._renderInitial = this._renderInitial.bind(this)
    }

    _renderDateInfo () {
        const { review } = this.props
        const createdAt = moment(review.createdAt).fromNow()
        return createdAt
    }

    _renderInitial() {
        const {
            review 
        } = this.props 

        let firstName = ""
        let lastName = ""

        if(review.user){
            if(review.user.firstName){
                firstName = review.user.firstName.charAt(0)
            }
            if(review.user.lastName){
                lastName = review.user.lastName.charAt(0)
            }
        }
        const initialName = firstName + lastName
        return initialName.toUpperCase()
    }

    render() {
        const {
            review
        } = this.props
        const ratingRange = range(1, 6)
        
        return (
            <View style={[ApplicationStyles.layout.fullBackground, Styles.container]}>
                <View style={Styles.innerContainer}>
                    <View style={Styles.contentContainer}>
                        <View style={Styles.ratingUserContainer}>
                            <View style={Styles.ratingContainer}>
                                <RatingIcons reviewRating={review.rating}/>
                            </View>
                            <View style={Styles.userContainer}>
                                <View style={Styles.userBackground}>
                                    <Text style={Styles.userTxt}>{this._renderInitial()}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={Styles.commentContainer}>
                            <Text style={Styles.commentTxt}>{review.comment}</Text>
                        </View>

                        <View style={Styles.registeredDtContainer}>
                            <Text style={Styles.dateTxt}>{this._renderDateInfo()}</Text>
                        </View>
                        
                    </View>
                </View>
            </View>
        )
    }
};

export default Review