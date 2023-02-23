// @flow

import React, { PureComponent } from 'react'
import { AsyncStorage, Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { find } from 'lodash'

import { Images } from '../../../Themes'

import ListingsActions from '../Actions'
import * as ListingSelectors from '../Selectors'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'

import Styles from './Styles/FavouriteButton'

class FavouriteButton extends PureComponent {

    _addToMyListing () {
        const {
            addToMyListing,
            selectedCar,
            targetListingId,
            setAfterLoginAction,
            setSavedCar,
            isInMyListing,
            loggedIn
        } = this.props

        let listingId = null
        if( targetListingId ) {
            listingId = targetListingId
        } else if( selectedCar ) {
            listingId = selectedCar._id._str
        }

        if (loggedIn) {
            if (listingId) {
                addToMyListing(listingId)
                if(!isInMyListing){
                    AsyncStorage.setItem('HasSavedCar', 'true')
                    setSavedCar(true)
                }
            }
        } else {
            this.props.setListingLoginModalVisible(true, {module: 'listing', id: listingId})
        }
    }

    render () {
        const {
            needLoginModalVisible,
            targetListingId,
            favouriteIconContainerStyle,
            favouriteIconInnerContainer,
            favouriteIconStyle,
            favouriteIcon,
            isInMyListing
        } = this.props
        
        return (
            <View style={[Styles.favouriteIconContainer, favouriteIconContainerStyle]}>
                <TouchableOpacity onPress={() => this._addToMyListing()} testID='listingFavouriteBtn'>
                    <View style={favouriteIconInnerContainer}>
                        <Image source={isInMyListing ? Images.starFill : favouriteIcon}
                                resizeMode='contain'
                                style={[Styles.icon, favouriteIconStyle]} />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

FavouriteButton.defaultProps = {
    favouriteIconStyle: Styles.baseIcon,
    favouriteIconContainerStyle: null,
    favouriteIconInnerContainer: null,
    starImg: Images.starWEmpty,
}

const mapStateToProps = (state, props) => {
    return {
        loggedIn: UserSelectors.getLoggedIn(state),
        selectedCar: ListingSelectors.getSelecterCar(state),
        isInMyListing: UserSelectors.getIsMyListing(state, props.targetListingId),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToMyListing: (listingId) => dispatch(UserActions.addToMyListingRequest(listingId)),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
        setListingLoginModalVisible: (needLoginModalVisible, postLoginAction) => dispatch(ListingsActions.setListingLoginModalVisible(needLoginModalVisible, postLoginAction)),
        setSavedCar: (status) => dispatch(ListingsActions.setSavedCar(status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteButton)
