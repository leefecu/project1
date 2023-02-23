import { createSelector } from 'reselect'
import {find} from 'lodash'

import * as CouponSelectors from '../../Coupons/Selectors'
import * as ListingSelectors from '../../Listings/Selectors'

export const getLoggedIn = state => state && state.user && state.user.loggedIn

export const getUser = state => state.user && state.user.user

export const getUserProfile = state => state.user.user && state.user.user.profile ? state.user.user.profile : null

export const getMyCoupons = state => state.user.user && state.user.user.profile && state.user.user.profile.myCoupons ? state.user.user.profile.myCoupons : null

export const getMyListings = state => state.user.user && state.user.user.profile && state.user.user.profile.myListings ? state.user.user.profile.myListings : null

export const getAuthToken = state => state.user.authToken ? state.user.authToken : ''

export const getUserId = state => state && state.user && state.user.user ? state.user.user._id : ''

export const getUserEmail = state => state.user.user ? state.user.user.email : ''

export const getUserName = state => state.user.user && state.user.user.profile ? state.user.user.profile.name : ''

export const getUserLocation = state => state.user && state.user.userLocation

export const getError = state => state.user && state.user.error

export const getAfterLoginAction = state => state.user && state.user.afterLoginAction

export const getTargetCouponId = (state, targetCouponId) => targetCouponId

export const getTargetListingId = (state, targetListingId) => targetListingId

export const getUsedCoupons = state => state.user.user && state.user.user.profile && state.user.user.profile.usedCoupons ? state.user.user.profile.usedCoupons : []

export const getSnsType = state => state.user.snsType && state.user.snsType

export const getSuccessMessage = state => state.user.successMessage && state.user.successMessage

export const getFetching = state => state.user.fetching && state.user.fetching

export const getTryOldLogin = state => state.user.tryOldLogin && state.user.tryOldLogin

export const getTabIndex = state => state.user && state.user.tabIndex

export const getTabRoute = state => state.user && state.user.tabRoute

export const getUsedCouponCount = createSelector(
    getLoggedIn,
    getUser,
    (loggedIn, user) => {
        if (loggedIn && user) {
            return user.profile && user.profile.usedCoupons ? user.profile.usedCoupons.length : 0
        }
    }
)

export const getIsMyCoupon = createSelector(
    getLoggedIn,
    getMyCoupons,
    getTargetCouponId,
    CouponSelectors.getSelectedCoupon,
    (loggedIn, myCoupons, targetCouponId, selectedCoupon) => {
        return targetCouponId ? find(myCoupons, (couponId) => couponId === targetCouponId)
        : selectedCoupon && find(myCoupons, (couponId) => couponId === selectedCoupon._id._str)
    }

)

export const getIsMyListing = createSelector(
    getLoggedIn,
    getMyListings,
    getTargetListingId,
    ListingSelectors.getSelecterCar,
    (loggedIn, myListings, targetListingId, selectedCar) => {
        return targetListingId ? find(myListings, (listingId) => listingId === targetListingId)
        : selectedCar && find(myListings, (listingId) => listingId === selectedCar._id._str)
    }

)

export const getTabState = createSelector(
    getTabIndex,
    getTabRoute,
    (tabIndex, tabRoute) => {
        const result = {index: tabIndex, routes:tabRoute}
        return result
    }
)