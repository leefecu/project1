// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Config from 'react-native-config'
import {arrayToUrlParms} from '../Modules/Core/Helpers'

// our "constructor"
const create = (baseURL = Config.API_END_POINT) => {
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache',
            'X-Api-Key': `${Config.APIKEY}`
        },
        // 10 second timeout...
        timeout: 10000
    })

    // Force OpenWeather API Key on all requests
    // api.addRequestTransform((request) => {
    //   request.params['X-Api-Key'] = 'b410b9052554533135e15fc62fa17d8a5f0ffd78'
    // })

    // Wrap api's addMonitor to allow the calling code to attach
    // additional monitors in the future.  But only in __DEV__ and only
    // if we've attached Reactotron to console (it isn't during unit tests).
    if (__DEV__ && console.tron) {
        console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
        api.addMonitor(console.tron.apisauce)
    }

    const getSystemCheck = () => {
        return api.get('systemcheck')
    }

    const getCoupon = (couponId, authToken, userId) => {
        let payload = {couponId}
        if (authToken && userId) {
            payload.authToken = authToken
            payload.userId = userId
        }
        return api.post('coupon', payload)
    }

    const getCar = (carId, authToken, userId) => {
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }
        return api.get('listing/' + carId, {}, {headers})
    }

    const getExclusiveCoupon = (couponId) => {
        return api.get('exclusive-coupon/' + couponId)
    }

    const getUserExclusiveCoupon = (couponId, authToken, userId) => {
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }
        return api.get('user-exclusive-coupon/' + couponId, {}, {headers})
    }

    const getCoupons = (payload) => {
        return api.get('coupons?' + arrayToUrlParms(payload))
    }

    const getMyCoupons = (authToken, userId) => {
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }
        return api.get('myCoupons', {}, {headers})
    }

    const getMyListings = (authToken, userId) => {
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }
        return api.get('myListings', {}, {headers})
    }


    const getSearchOptions = (userLocation) => {
        return api.post('searchOptions', userLocation)
    }

    const getList = (payload) => {
        return api.get('listings?' + arrayToUrlParms(payload))
    }


    const getUser = (userId) => {
        return api.get('user/' + userId)
    }

    const login = (payload) => {
        return api.post('login', payload)
    }

    const logout = (headers) => {
        return api.post('logout', {}, {headers})
    }

    const snsLogin = (payload) => {
        return api.post('sns/login', payload)
    }

    const signup = (payload) => {
        return api.post('users', payload)
    }

    const forgotPassword = (payload) => {
        return api.post('user/forgot-password', payload)
    }

    const addToMyCoupon = (authToken, userId, couponId) => {
        const payload = {
            couponId: couponId
        }
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }
        return api.post('user/add-to-my-coupon', payload, {headers})
    }

    const addToMyListing = (authToken, userId, listingId) => {
        const payload = {
            listingId: listingId
        }
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }
        return api.post('user/add-to-my-listing', payload, {headers})
    }

    const useCoupon = (authToken, userId, couponId) => {
        const payload = {
            userId: userId,
            couponId: couponId
        }
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }
        return api.post('user/use-coupon', payload, {headers})
    }

    const dealerShop = (id) => {
        return api.get('dealerShop/' + id)

    }

    const dealerShopShowroom = (id, page) => {

        return api.get('dealerShop/showroom/' + id + '?page=' + page)

    }

    const getReviews = (couponId) => {
        
        return api.get('reviews/'+couponId)
    }

    const addReviewComment = (authToken, userId, payload) => {
        const headers = {
            'X-User-Id': userId,
            'X-Auth-Token': authToken
        }

        return api.post('reviews/new', payload, {headers})
    }

    return {
        // a list of the API functions from step 2
        addToMyCoupon,
        addToMyListing,
        addReviewComment,
        dealerShop,
        dealerShopShowroom,
        getSystemCheck,
        getCoupon,
        getCar,
        getExclusiveCoupon,
        getUserExclusiveCoupon,
        getCoupons,
        getMyCoupons,
        getMyListings,
        getSearchOptions,
        getList,
        getUser,
        getReviews,
        login,
        logout,
        snsLogin,
        signup,
        forgotPassword,
        useCoupon
    }
}

export default {
    create
}
