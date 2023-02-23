// @flow

import React, { PureComponent } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { find } from 'lodash'
import { Colors, Metrics, Images } from '../../../Themes'

import CoreActions from '../../Core/Actions'
import CouponActions from '../Actions'
import * as CouponSelectors from '../Selectors'
import ListingActions from '../../Listings/Actions'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'

import NoticeModal from '../../Core/Components/NoticeModal'
import SimpleAlert from '../../Core/Components/SimpleAlert'

//Styles
import Styles from './Styles/FavouriteButton'

class FavouriteButton extends PureComponent {

    _addToMyCoupon () {
        const {
            addToMyCoupon,
            isInMyCoupon,
            selectedCoupon,
            targetCouponId,
            setAfterLoginAction,
            loggedIn,
            setSavedCoupon
        } = this.props

        let couponId = null
        if( targetCouponId ) {
            couponId = targetCouponId
        }
        else if( selectedCoupon ) {
            couponId = selectedCoupon._id._str
        }

        if (loggedIn && couponId) {
            addToMyCoupon(couponId)
            if( ! isInMyCoupon){
                AsyncStorage.setItem('HasSavedCoupon', 'true')
                setSavedCoupon(true)
            }
        } else {
            this.props.setCouponLoginModalVisible(true, {module: 'coupon', id: couponId})
        }
    }

    render () {
        const {
            targetCouponId,
            favouriteIconInnerContainer,
            favouriteIconContainerStyle,
            favouriteIconStyle,
            isInMyCoupon
        } = this.props

        return (
            <View style={[Styles.favouriteIconContainer, favouriteIconContainerStyle]}>
                <TouchableOpacity onPress={() => this._addToMyCoupon()} testID='couponFavouriteBtn'>
                    <View style={[favouriteIconInnerContainer]}>
                        <Image source={isInMyCoupon ? Images.starFill : this.props.favouriteIcon}
                                resizeMode='contain'
                                style={[Styles.icon, favouriteIconStyle]} />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        loggedIn: UserSelectors.getLoggedIn(state),
        starImg : Images.starWEmpty,
        selectedCoupon: CouponSelectors.getSelectedCoupon(state),
        isInMyCoupon: UserSelectors.getIsMyCoupon(state, props.targetCouponId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToMyCoupon: (couponId) => dispatch(UserActions.addToMyCouponRequest(couponId)),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
        setCouponLoginModalVisible: (needLoginModalVisible, postLoginAction) => dispatch(CouponActions.setCouponLoginModalVisible(needLoginModalVisible, postLoginAction)),
        setSavedCoupon: (status) => dispatch(ListingActions.setSavedCoupon(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteButton)
