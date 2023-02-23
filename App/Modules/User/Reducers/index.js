import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { UserTypes } from '../Actions'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    authToken: null,
    user: null,
    error: null,
    emailError: null,
    passwordError: null,
    fetching: false,
    loggedIn: false,
    snsType: 'local',
    successMessage: null,
    afterLoginAction: null,
    userLocation: null,
    userLocationLat: null,
    userLocationLon: null,
    tabIndex: 0,
    tabRoute: [{ key: '1', title: "Cars(0)" },
                { key: '2', title: 'Coupons(0)' }]
})

/* ------------- Reducers ------------- */

export const request = (state: Object) => state.merge({ fetching: true, error: null, successMessage: null, emailError: null, passwordError: null })

export const success = (state: Object, { data }: Object) =>
    state.merge({ fetching: false, error: null, emailError: null, passwordError: null, authToken: data.authToken, user: data.user, loggedIn: true, snsType: 'local' })

export const signupSuccess = (state: Object, { data }: Object) =>
    state.merge({ fetching: false, error: null, emailError: null, passwordError: null, authToken: data.authToken, user: data.user, loggedIn: true, snsType: 'local' })

export const failure = (state: Object, { error }: Object) =>
    state.merge({ fetching: false, error })

export const snsLoginSuccess = (state: Object, { data, snsType }: Object) =>
    state.merge({ fetching: false, error: null, authToken: data.authToken, user: data.user, loggedIn: true, snsType: snsType })

export const logoutRequest = (state: Object) => state.merge({ fetching: true })

export const logoutSuccess = (state: Object) => state.merge(INITIAL_STATE)

export const logoutFailure = (state: Object, { error }: Object) =>
    state.merge({ fetching: false, error, authToken: null, user: null, loggedIn: false, snsType: 'local' })

export const rememberSuccess = (state: Object, { data }: Object) =>
    state.merge({ fetching: false, authToken: data.authToken, user:data.user, loggedIn: true, snsType: data.snsType })

export const addToMyCouponSuccess = (state: Object, data: Object) => state.merge({ fetching: false, user: data.user })

export const addToMyListingSuccess = (state: Object, data: Object) => state.merge({ fetching: false, user: data.user })

export const useCouponSuccess = (state: Object, { data }: Object) => state.merge({ fetching: false, user: data })

export const setUserDetail = (state: Object, { user }: Object) => state.merge({ user: user })

export const forgotPasswordSuccess = (state: Object, { successMessage }) => state.merge({ fetching: false, successMessage })

export const setAfterLoginAction = (state: Object, { afterLoginAction }) => state.merge({ afterLoginAction })

export const setUserLocation = (state: Object, { userLocation }) => state.merge({ userLocation })

export const setUserLocationLatLon = (state: Object, { lat, lon }: Object) => {
    return state.merge({ userLocationLat: lat, userLocationLon: lon })
}

export const resetError = (state: Object) => {
    return state.merge({
        error: null,
        emailError: null,
        passwordError: null,
        successMessage: null
    })
}

export const setTabIndex = (state: Object, {index}: Number) =>{
    return state.merge({
        tabIndex: index
    })
}

export const setTabRoute = (state: Object, { status }: Object) =>{
    let tabRoute = [{ key: '1', title: 'Cars(0)' },
                    { key: '2', title: 'Coupons(0)' }]

    switch(status[0]){
        case 'car':
            tabRoute = [{ key: '1', title: 'Cars('+status[1]+')' },
                    { key: '2', title: state.tabRoute[1]['title'] }]
        break
        case 'coupon':
            tabRoute = [{ key: '1', title: state.tabRoute[0]['title'] },
                    { key: '2', title: 'Coupons('+status[1]+')' }]
        break
    }

    return state.merge({
        tabRoute: tabRoute
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [UserTypes.LOGIN_REQUEST]: request,
    [UserTypes.LOGIN_SUCCESS]: success,
    [UserTypes.LOGIN_FAILURE]: failure,

    [UserTypes.SNS_LOGIN_REQUEST]: request,
    [UserTypes.SNS_LOGIN_SUCCESS]: snsLoginSuccess,
    [UserTypes.SNS_LOGIN_FAILURE]: failure,
    
    [UserTypes.LOGOUT_REQUEST]: logoutRequest,
    [UserTypes.LOGOUT_SUCCESS]: logoutSuccess,
    [UserTypes.LOGOUT_FAILURE]: logoutFailure,
    
    [UserTypes.SIGNUP_REQUEST]: request,
    [UserTypes.SIGNUP_SUCCESS]: signupSuccess,
    [UserTypes.SIGNUP_FAILURE]: failure,
    
    [UserTypes.REMEMBER_REQUEST]: request,
    [UserTypes.REMEMBER_SUCCESS]: rememberSuccess,
    [UserTypes.REMEMBER_FAILURE]: failure,
    
    [UserTypes.ADD_TO_MY_COUPON_REQUEST]: request,
    [UserTypes.ADD_TO_MY_COUPON_SUCCESS]: addToMyCouponSuccess,
    [UserTypes.ADD_TO_MY_COUPON_FAILURE]: failure,
    [UserTypes.ADD_TO_MY_LISTING_REQUEST]: request,
    [UserTypes.ADD_TO_MY_LISTING_SUCCESS]: addToMyListingSuccess,
    [UserTypes.ADD_TO_MY_LISTING_FAILURE]: failure,
    
    [UserTypes.USE_COUPON_REQUEST]: request,
    [UserTypes.USE_COUPON_SUCCESS]: useCouponSuccess,
    [UserTypes.USE_COUPON_FAILURE]: failure,

    [UserTypes.FORGOT_PASSWORD_REQUEST]: request,
    [UserTypes.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
    [UserTypes.FORGOT_PASSWORD_FAILURE]: failure,
    
    [UserTypes.SET_USER_DETAIL]: setUserDetail,
    [UserTypes.SET_AFTER_LOGIN_ACTION]: setAfterLoginAction,
    [UserTypes.SET_USER_LOCATION]: setUserLocation,
    [UserTypes.SET_USER_LOCATION_LAT_LON]: setUserLocationLatLon,
    [UserTypes.SET_TAB_INDEX]: setTabIndex,
    [UserTypes.SET_TAB_ROUTE]: setTabRoute,

    [UserTypes.RESET_ERROR]: resetError,
})
