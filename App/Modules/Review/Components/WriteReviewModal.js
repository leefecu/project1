import React, { PureComponent } from 'react'
import ReactNative, {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { range, map } from 'lodash'

import { Colors, Images, Layout, Metrics } from '../../../Themes'

import ReviewActions from '../Actions'
import * as CouponSelectors from '../../Coupons/Selectors'
import * as UserSelectors from '../../User/Selectors'

import RatingIcons from './RatingIcons'

//Styles
import Styles from './Styles/WriteReviewModal'

class WriteReviewModal extends PureComponent{

    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
            comment: "",
            commentError: null
        }

        this._onClickRating = this._onClickRating.bind(this)
        this._onClickReviewSubmit = this._onClickReviewSubmit.bind(this)
        this._handleKeyDown = this._handleKeyDown.bind(this)
        this._checkCommentStatus = this._checkCommentStatus.bind(this)
    }

    _onClickRating(ratingNum) {
        this.setState({rating: ratingNum})
    }

    _onClickReviewSubmit() {
        const {
            submitReviewRequest,
            page
        } = this.props

        const {
            rating,
            comment
        } = this.state

        const commentStatus = this._checkCommentStatus()
        
        if (commentStatus) {
            this.props.submitReviewRequest(rating, comment, 'coupon', page)
        }
        
    }

    _handleKeyDown(e) {

        const commentStatus = this._checkCommentStatus()

        if(e.nativeEvent.key === 'Enter'){
            Keyboard.dismiss()
        }
    }

    _checkCommentStatus() {

        if (!this.state.comment) {
            this.setState({
                commentError: 'Please enter your comment.'
            })

            return false
        } else {
            this.setState({
                commentError: null
            })

            return true
        }
    }

    render() {
        const {
            animationType, 
            modalVisible, 
            onPressCancel, 
            onPressSubmit,
        } = this.props

        const {
            rating,
            comment,
            commentError
        } = this.state

        const ratingRange = range(1, 6)
        
        return (
            <View style={Styles.container}>
                <Modal 
                    animationType={animationType} 
                    transparent={true} 
                    visible={modalVisible} 
                    onRequestClose={onPressCancel}>
                    <View style={Styles.overlay} />
                    <View style={[Styles.innerContainer]}>

                        <KeyboardAvoidingView behavior="position" enabled>
                            <View style={[Styles.modalContainer]}>
                                <View style={[Styles.title]}>
                                    <Text style={[Styles.titleText]}>{'Write a Review'.toUpperCase()}</Text>
                                </View>

                                <View style={[Styles.descDatails]}>
                                    <View style={[Styles.descContent]}>
                                        <View style={[Styles.ratingContainer]}>
                                            <View style={[Styles.contentTitle]}>
                                                <Text>1. How satisfied were you with the shop?</Text>
                                            </View>
                                            <View style={Styles.ratingIconsContainer}>
                                                <RatingIcons 
                                                    writeReview={true}
                                                    reviewRating={rating}
                                                    onClickRating={this._onClickRating} />
                                            </View>
                                        </View>    
                                    </View>
                                    <View style={[Styles.descContent]}>
                                        <View style={[Styles.commentContainer]}>
                                            <View style={[Styles.contentTitle]}>
                                                <Text>2. Any comment on your experience?</Text>
                                            </View>
                                            <View style={Styles.commentTextContainer}>
                                                <TextInput
                                                    ref= {(el) => { this.comment = el; }}
                                                    onChangeText={(comment) => this.setState({comment})}
                                                    onKeyPress={this._handleKeyDown}
                                                    value={comment}
                                                    style={Styles.commentBox}
                                                    editable={true}
                                                    keyboardType='default'
                                                    returnKeyType='done'
                                                    autoCapitalize='none'
                                                    autoCorrect={false} 
                                                    multiline = {true}
                                                    maxLength = {250}/>
                                                { commentError && <Text style={Styles.errorMsg}>{commentError}</Text> }
                                                <View style={Styles.bottomTextContainer}>
                                                    <Text style={Styles.bottomText}>250 characters left</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={[Styles.footer]}>
                                    <View style={[Styles.buttonContainer]}>
                                        <TouchableWithoutFeedback onPress={this._onClickReviewSubmit}>
                                            <View style={[Layout.flex5, Styles.buttonInnerContainer]}>
                                                <Text style={[Styles.buttonText, Styles.confirmText]}>Submit</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={onPressCancel}>
                                            <View style={[Layout.flex5, Styles.buttonInnerContainer, Styles.cancelContainer]}>
                                                <Text style={[Styles.buttonText, Styles.cancelText]}>Cancel</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>                        
                            </View>
                        </KeyboardAvoidingView>

                    </View>
                </Modal>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitReviewRequest: (rating, comment, reviewType, page) => dispatch(ReviewActions.submitReviewRequest(rating, comment, reviewType, page)),
    }
}

export default connect(null, mapDispatchToProps) (WriteReviewModal)
