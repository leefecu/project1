import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    loginRequest: ['email', 'password', 'rememberMe', 'tryOldLogin', 'navigator'],
    loginSuccess: ['data'],
    loginFailure: ['error'],
    
    snsLoginRequest: ['accessToken', 'email', 'name', 'id', 'snsType'],
    snsLoginSuccess: ['data', 'snsType'],
    snsLoginFailure: ['error'],
    
    logoutRequest: ['authToken', 'userId'],
    logoutSuccess: null,
    logoutFailure: ['error'],
    
    signupRequest: ['email', 'password', 'name', 'rememberMe', 'navigator'],
    signupSuccess: ['data'],
    signupFailure: ['error'],
    
    rememberRequest: ['authToken', 'userId', 'snsType'],
    rememberSuccess: ['data'],
    rememberFailure: ['error'],
    
    addToMyListingRequest: ['listingId'],
    addToMyListingSuccess: ['user'],
    addToMyListingFailure: ['error'],
    addToMyCouponRequest: ['couponId'],
    addToMyCouponSuccess: ['user'],
    addToMyCouponFailure: ['error'],
    
    useCouponRequest: ['couponId'],
    useCouponSuccess: ['data'],
    useCouponFailure: ['error'],
    
    
    forgotPasswordRequest: ['email'],
    forgotPasswordSuccess: ['successMessage'],
    forgotPasswordFailure: ['error'],

    setUserDetail: ['user'],
    setAfterLoginAction: ['afterLoginAction'],
    setUserLocation: ['userLocation'],
    setUserLocationLatLon: ['lat', 'lon'],
    setTabIndex: ['index'],
    setTabRoute: ['status'],

    resetError: null
})

export const UserTypes = Types
export default Creators
