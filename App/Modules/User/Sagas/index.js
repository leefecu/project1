import { 
    AsyncStorage,
    Platform
} from 'react-native'
import { call, fork, put, select, take } from 'redux-saga/effects'
import Config from 'react-native-config'
import DeviceInfo from 'react-native-device-info'

import API from '../../../Services/Api'

import UserActions from '../Actions'
import * as UserSelectors from '../Selectors'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import CouponActions from '../../Coupons/Actions'
import ListingActions from '../../Listings/Actions'
import * as CouponConstants from '../../Coupons/Constants'
import ReviewActions from '../../Review/Actions'

import {CouponDetailNavigator} from '../../Coupons/Containers/CouponDetail'

const saveUserInfo = (authToken, userId, snsType) => {
    AsyncStorage.multiSet([
        ['authToken', authToken],
        ['userId', userId],
        ['snsType', snsType]
    ])
}

export function * forgotPassword (api, {email}) {
    try {
        const response = yield call(api.forgotPassword, {email})

        if (response.ok) {
            if (response.data.error) {
                yield put(UserActions.forgotPasswordFailure(response.data.error))
            } else {
                yield put(UserActions.forgotPasswordSuccess(response.data.successMessage))
            }
        } else {
            yield put(UserActions.logoutFailure(response.data))
        }

    } catch (error) {
        yield put(UserActions.loginFailure(error))
    }
}

export function * login (api, {email, password, rememberMe, tryOldLogin, navigator}) {
    try {
        const response = yield call(api.login, {email, password})
        const afterLoginAction = yield select(UserSelectors.getAfterLoginAction)

        if (response.ok) {
            const data = response.data

            if (data.error) {
                yield put(UserActions.loginFailure(data.error))
            } else {
                const {authToken, userId} = data
                const userResp = yield call(api.getUser, userId)

                if (userResp.ok) {
                    yield put(UserActions.loginSuccess({authToken, user: userResp.data}))

                    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_LOGIN_SUCCESS, {email, id: userResp.data._id})
                    global.firebase.analytics().setUserId(userResp.data._id)

                    yield put(CouponActions.myCouponsRequest())
                    yield put(ListingActions.myListingsRequest())

                    if(afterLoginAction && afterLoginAction.action && afterLoginAction.action === 'saved'){
                        yield put(CoreActions.changePage(afterLoginAction.action))
                    }

                    if (rememberMe) {
                        saveUserInfo(authToken, userId, 'local')
                    }


                    navigator.dismissModal({
                        animationType: 'slide-down'
                    })

                    if (afterLoginAction) {

                        if (afterLoginAction.action === 'MyPage') {
                            
                            yield put(UserActions.setAfterLoginAction(null))
                            
                        } else if (afterLoginAction.action === 'addToMyCoupon') {
                            
                            yield put(CouponActions.setCouponLoginModalVisible(false))
                            yield put(UserActions.addToMyCouponRequest(afterLoginAction.couponId))
                            yield put(UserActions.setAfterLoginAction(null))
                            
                        } else if (afterLoginAction.action === 'addToMyListing') {

                            yield put(ListingActions.setListingLoginModalVisible(false))
                            yield put(UserActions.addToMyListingRequest(afterLoginAction.listingId))
                            yield put(UserActions.setAfterLoginAction(null))

                        } else if (afterLoginAction.action === 'openUseModal') {

                            yield put(CouponActions.setUseModalVisible(true))
                            yield put(UserActions.setAfterLoginAction(null))

                        }else if (afterLoginAction.action === 'saved') {

                            yield put(UserActions.setAfterLoginAction(null))

                        }else if (afterLoginAction.action === 'reviewCoupons') {

                            yield put(ReviewActions.setWriteReviewModalVisible(true))
                            yield put(UserActions.setAfterLoginAction(null))

                        }
                    }
                } else {
                    yield put(UserActions.loginFailure(userResp.data))
                    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_LOGIN_FAILED, {email})
                }
            }
        } else {
            yield put(UserActions.loginFailure(response.data))
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_LOGIN_FAILED, {email})
        }

    } catch (error) {
        yield put(UserActions.loginFailure(error))
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_LOGIN_ERROR, {email, error})
    }
}

export function * logout (api) {
    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)
        const response = yield call(api.logout, {'X-Auth-Token': authToken, 'X-User-Id': userId})

        if (response.ok) {
            yield put(UserActions.logoutSuccess())  
            global.firebase.analytics().setUserId(DeviceInfo.getUniqueID())
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_LOGOUT_SUCCESS, {userId})
            
        } else {
            yield put(UserActions.logoutFailure(response.data))
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_LOGOUT_FAILED, {userId})   
        }

    } catch (error) {
        yield put(UserActions.logoutFailure(error))
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_LOGOUT_ERROR, {error})   
    }
}

export function * snsLogin (api, {accessToken, email, name, id, snsType}) {
    try {
        const payload = {accessToken, email, name, id, snsType}
        const response = yield call(api.snsLogin, payload)
        const afterLoginAction = yield select(UserSelectors.getAfterLoginAction)

        if (response.ok) {

            global.firebase.analytics().logEvent(
                snsType === 'facebook' 
                    ? CoreConstants.FB_EVENT.USER_FB_LOGIN_SUCCESS 
                    : CoreConstants.FB_EVENT.USER_GOOGLE_LOGIN_SUCCESS,
                { email, name })
            global.firebase.analytics().setUserId(response.data.user._id)

            saveUserInfo(response.data.authToken, response.data.user._id, payload.snsType)
            yield put(UserActions.snsLoginSuccess({authToken: response.data.authToken, user: response.data.user}, payload.snsType))
            
            yield put(CouponActions.myCouponsRequest())
            yield put(ListingActions.myListingsRequest())

            if (afterLoginAction) {
                if (afterLoginAction.action === 'MyPage') {
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                    //NavigationActions.MyPage()
                } else if (afterLoginAction.action === 'addToMyCoupon') {
                    yield put(UserActions.addToMyCouponRequest(afterLoginAction.couponId))
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                } else if (afterLoginAction.action === 'addToMyListing') {
                    yield put(UserActions.addToMyListingRequest(afterLoginAction.listingId))
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                } else if (afterLoginAction.action === 'openUseModal') {
                    yield put(CouponActions.setUseModalVisible(true))
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                }else if (afterLoginAction.action === 'saved') {
                    //yield put(UserActions.addToMyCouponRequest(authToken, userId, afterLoginAction.couponId))
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                    //NavigationActions.saved()
                    yield put(CoreActions.changePage(afterLoginAction.action))
                }
            } else {
                //NavigationActions.pop()
            }
        } else {
            yield put(UserActions.snsLoginFailure(response.data))
            global.firebase.analytics().logEvent(
                snsType === 'facebook' 
                    ? CoreConstants.FB_EVENT.USER_FB_LOGIN_FAILED 
                    : CoreConstants.FB_EVENT.USER_GOOGLE_LOGIN_FAILED,
                {user: userResp.data})

        }

    } catch (error) {
        yield put(UserActions.snsLoginFailure(error))
        global.firebase.analytics().logEvent(
            snsType === 'facebook' 
                ? CoreConstants.FB_EVENT.USER_FB_LOGIN_ERROR 
                : CoreConstants.FB_EVENT.USER_GOOGLE_LOGIN_ERROR,
            {error: error})
    }
}

export function * signup (api, {email, password, name, rememberMe, navigator}) {
    try {
        const payload = {email, password, name}
        const response = yield call(api.signup, payload)
        const afterLoginAction = yield select(UserSelectors.getAfterLoginAction)

        if (response.ok) {
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_SIGNUP_SUCCESS,{
                email,
                name
            })

            response.data.user.email = response.data.user.emails ? response.data.user.emails[0].address : response.data.user.email

            yield put(UserActions.signupSuccess(response.data))

            if (rememberMe) {
                saveUserInfo(response.data.authToken, response.data.user._id, 'local')
            }

            if (afterLoginAction) {
                if (afterLoginAction.action === 'MyPage') {
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                    //NavigationActions.MyPage()
                    navigator.pop({
                        animated: true
                    })
                } else if (afterLoginAction.action === 'addToMyCoupon') {
                    yield put(UserActions.addToMyCouponRequest(afterLoginAction.couponId))
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                    navigator.pop({
                        animated: true
                    })
                } else if (afterLoginAction.action === 'addToMyListing') {
                    yield put(UserActions.addToMyListingRequest(afterLoginAction.listingId))
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                    navigator.pop({
                        animated: true
                    })
                } else if (afterLoginAction.action === 'openUseModal') {
                    yield put(CouponActions.setUseModalVisible(true))
                    yield put(UserActions.setAfterLoginAction(null))
                    //NavigationActions.pop()
                    navigator.pop({
                        animated: true
                    })
                }else if (afterLoginAction.action === 'saved') {
                    yield put(UserActions.setAfterLoginAction(null))
                    yield put(CoreActions.changePage(afterLoginAction.action))
                    navigator.dismissModal({
                        animationType: 'slide-down'
                    })
                }
            } else {
                //NavigationActions.pop()
            }
        } else {
            yield put(UserActions.signupFailure(response.data))
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_SIGNUP_FAILED,{
                user: response.data
            })
        }

    } catch (error) {
        yield put(UserActions.signupFailure(error))
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_SIGNUP_ERROR,{
            error: error
        })
    }
}

export function * rememberMe (api, {authToken, userId, snsType}) {
    try {
        const response = yield call(api.getUser, userId)

        if (response.ok) {
            yield put(UserActions.rememberSuccess({authToken: authToken, user: response.data, snsType: snsType}))
            
        } else {
            yield put(UserActions.rememberFailure(response.data))
        }

    } catch (error) {
        yield put(UserActions.rememberFailure(error))
    }
}

export function * addCouponFavourite (api, {couponId}) {
    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)
        const userEmail = yield select(UserSelectors.getUserEmail)
        const response = yield call(api.addToMyCoupon, authToken, userId, couponId)

        if (response.ok) {
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_SAVE_COUPON, {
                userId,
                userEmail,
                couponId
            })
            response.data.user.email = response.data.user.emails ? response.data.user.emails[0].address : response.data.user.email

            yield put(UserActions.addToMyCouponSuccess(response.data.user))
            const type = ['coupon', response.data.myCoupons.length]
            yield put(UserActions.setTabRoute(type))
            yield put(CouponActions.myCouponsSuccess(response.data.myCoupons))
        } else {
            yield put(UserActions.addToMyCouponFailure(response.data))
        }

    } catch (error) {
        yield put(UserActions.addToMyCouponFailure(error))
    }
}

export function * addListingFavourite (api, {listingId}) {
    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)
        const userEmail = yield select(UserSelectors.getUserEmail)
        const response = yield call(api.addToMyListing, authToken, userId, listingId)

        if (response.ok) {
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.USER_SAVE_LISTING, {
                userId,
                userEmail,
                listingId
            })

            response.data.user.email = response.data.user.emails ? response.data.user.emails[0].address : response.data.user.email

            yield put(UserActions.addToMyListingSuccess(response.data.user))
            const type = ['car', response.data.myListings.listings.length]
            yield put(UserActions.setTabRoute(type))
            yield put(ListingActions.myListingsSuccess(response.data.myListings.listings))
        } else {
            yield put(UserActions.addToMyListingFailure(response.data))
        }

    } catch (error) {
        yield put(UserActions.addToMyListingFailure(error))
    }
}

export function * useCoupon (api, {couponId}) {
    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)
        const response = yield call(api.useCoupon, authToken, userId, couponId)

        if (response.ok) {
            if (response.data.error) {
                yield put(UserActions.useCouponFailure(response.data.error))
                yield put(CouponActions.setCouponRedeemOutcome(CouponConstants.COUPON_REDEEM_EXIST))
            } else {
                yield put(UserActions.useCouponSuccess(response.data))
                yield put(CouponActions.setCouponRedeemOutcome(CouponConstants.COUPON_REDEEM_SUCCESS))
            }
        } else {
            yield put(UserActions.useCouponFailure(response.data))
            yield put(CouponActions.setCouponRedeemOutcome(CouponConstants.COUPON_REDEEM_FAILURE))
        }

    } catch (error) {
        yield put(UserActions.useCouponFailure(error))
        yield put(CouponActions.setCouponRedeemOutcome(CouponConstants.COUPON_REDEEM_FAILURE))
    }
}
