import { Platform } from 'react-native'
import { call, put, select, take } from 'redux-saga/effects'
import { map, find } from 'lodash'
import { Images, Colors } from '../../../Themes'
import DeviceInfo from 'react-native-device-info'

import CouponActions from '../Actions'
import * as CouponConstants from '../Constants'
import * as CouponHelpers from '../Helpers'
import * as CouponSelectors from '../Selectors'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'
import {NETWORK_ERROR, TIMEOUT_ERROR} from '../../Core/Constants'
import * as CoreSaga from '../../Core/Sagas'

export function * fetchCoupon (api, {couponId, navigator, page}) {

    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)
        const response = yield call(api.getCoupon, couponId, authToken, userId)

        if (response.ok) {
            const {coupon} = response.data

            const userLoggedIn = yield select(UserSelectors.getLoggedIn)
            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.COUPON_DETAIL,
                {
                    couponId: coupon._id._str,
                    userId: userLoggedIn ? yield select(UserSelectors.getUserId) : DeviceInfo.getUniqueID(),
                    page
                })

            coupon.images = map(coupon.images, (image) => {
                if (image.indexOf('http') === -1) {
                    return CouponHelpers.getImageSource(image, coupon._id._str, {width: CouponConstants.IMAGE_CARDVIEW_WIDTH, height: CouponConstants.IMAGE_CARDVIEW_HEIGHT})
                }
                return image
            })

            yield put(CouponActions.couponSuccess(coupon))

            if (authToken && userId) {
                yield put(UserActions.setUserDetail(response.data.user))
            }

            navigator.push({
                screen: 'carmate.CouponDetail',
                animated: true,
                backButtonHidden: true,
                passProps: {
                    title: coupon.workshops[0].name,
                    couponId: coupon._id._str
                },
                navigatorStyle: {
                    tabBarHidden: true,
                    drawUnderTabBar: true//Platform.OS === 'ios',
                },
            })

        } else {
            yield put(CouponActions.couponFailure(response.data))
        }

    } catch (error) {
        yield put(CouponActions.couponFailure(error))
    }
}

export function * fetchCoupons (api, {refresh, page, searchQuery, category, region, sortby}) {
    try {
        let error = null, latitude = null, longitude = null
        if (sortby === 'nearest') {
            const { getLocation } = yield call(CoreSaga.userPositionPromised)
            let { error, location } = yield call(getLocation)
            if (error) {
                console.log('Failed to get user position!', error)
            } else {
                latitude = location ? location.coords.latitude : null
                longitude = location ? location.coords.longitude : null
            }
        } else {
            error = null
        }

        //yield put(CoreActions.searchOnBlur())

        if (error) {
            yield put(CouponActions.couponsFailure(error))
        } else {
            if(page === 1){
                yield put(CouponActions.resetCouponExistingAdList())
            }

            const curExistingAds = yield select(CouponSelectors.getExistingAds)
            let arrId = []
            if(page && page > 1 && curExistingAds.length > 0 ){
                arrId = map(curExistingAds, (ad) => ad.id)
            }

            const response = yield call(api.getCoupons, {
                getAdvertising: true,
                page,
                searchQuery,
                categoryId: category,
                regions: region,
                sortby,
                latitude,
                longitude,
                existingAds: JSON.stringify(arrId)
            })

            if (response.ok && response.data.code !== 400) {
                //yield put(UserActions.setUserLocation({latitude, longitude}))
                yield put(CouponActions.couponsSuccess(refresh, response.data))

                if(response.data.coupons && response.data.coupons.length > 0){
                    const coupons = response.data.coupons
                    const ad = find(coupons, (coupon) => coupon.advertising === true)
                    if(ad){
                        const adList = [ad._id]
                        yield put(CouponActions.setCouponExistingAdList(adList))
                    }

                }

            } else {
                if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                    yield put(CoreActions.setTimeout(true, 'fetchCoupons'))
                } else {
                    yield put(CouponActions.couponsFailure(response.data))
                }
            }
        }

    } catch (error) {
        yield put(CouponActions.couponsFailure(error))
    }
}

export function * fetchExclusiveCoupon (api, {couponId, navigator}) {
    try {
        const response = yield call(api.getExclusiveCoupon, couponId)

        if (response.ok) {
            yield put(CouponActions.exclusiveCouponSuccess(response.data))
            //NavigationActions.exclusiveCouponDetail()
            //yield put(NavigationActions.navigate({ routeName: 'ExclusiveCouponDetail'}))

            /*navigator.toggleTabs({
                to: 'hidden',
                animated: true
            })*/

            const coupon = response.data
            navigator.push({
                screen: 'carmate.ExclusiveCouponDetail',
                animated: true,
                backButtonHidden: true,
                passProps: {
                    title: 'View Free Coupon Details',
                    couponId: coupon._id._str
                },
                navigatorStyle: {
                    tabBarHidden: true,
                    drawUnderTabBar: true//Platform.OS === 'ios',
                },
            })

        } else {

            if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                yield put(CoreActions.setTimeout(true, 'fetchExclusiveCoupon'))
            } else {
                yield put(CouponActions.exclusiveCouponFailure(response.data))
            }

        }

    } catch (error) {
        yield put(CouponActions.exclusiveCouponFailure(error))
    }
}

export function * fetchUserExclusiveCoupon (api, {couponId, navigator}) {

    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)

        if (authToken && userId) {
            const response = yield call(api.getUserExclusiveCoupon, couponId, authToken, userId)

            if (response.ok) {
                yield put(CouponActions.exclusiveCouponSuccess(response.data))
                //NavigationActions.exclusiveCouponDetail()

                /*navigator.toggleTabs({
                    to: 'hidden',
                    animated: true
                })*/

                const coupon = response.data
                navigator.push({
                    screen: 'carmate.ExclusiveCouponDetail',
                    animated: true,
                    backButtonHidden: true,
                    passProps: {
                        title: 'View Free Coupon Details',
                        couponId: coupon._id._str
                    },
                    navigatorStyle: {
                        tabBarHidden: true,
                        drawUnderTabBar: true//Platform.OS === 'ios',
                    },
                })


            } else {

                if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                    yield put(CoreActions.setTimeout(true, 'fetchUserExclusiveCoupon'))
                } else {
                    yield put(CouponActions.exclusiveCouponFailure(response.data))
                }

            }

        } else {
            //NavigationActions.login()
        }

    } catch (error) {
        yield put(CouponActions.exclusiveCouponFailure(error))
    }
}

export function * getMyCoupons (api) {
    return function * test (authToken, userId) {
        const response = yield call(api.getMyCoupons, authToken, userId)

        if (response.ok) {
            yield put(CouponActions.myCouponsSuccess(response.data))
        } else {
            yield put(CouponActions.myCouponsFailure(response.data))
        }
    }
}

export function * fetchMyCoupons (api) {
    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)

        if (authToken && userId) {
            const response = yield call(api.getMyCoupons, authToken, userId)

            if (response.ok) {
                const type = ['coupon', response.data.length]
                yield put(UserActions.setTabRoute(type))
                yield put(CouponActions.myCouponsSuccess(response.data))
            } else {
                if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                    yield put(CoreActions.setTimeout(true, 'fetchMyCoupons'))
                } else {
                    yield put(CouponActions.myCouponsFailure(response.data))
                }
            }
        } else {
            //NavigationActions.login()
        }

    } catch (error) {
        yield put(CouponActions.myCouponsFailure(error))
    }
}

export function * fetchCouponsByKeywords (api, {searchQuery}) {
    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.COUPON_QUICK_SEARCH, {searchQuery})

    const category = yield select(CouponSelectors.getCategory)
    const region = yield select(CouponSelectors.getRegion)
    const sortby = yield select(CouponSelectors.getSortby)

    yield put(CouponActions.setCouponsLoading(true))
    yield put(CouponActions.setCouponSearchQuery(searchQuery))
    yield put(CouponActions.couponsRequest(true, 1, searchQuery, category, region, sortby))
}

export function * fetchCouponsByCategory (api, {category}) {
    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.COUPON_CATEGORY_SEARCH, {searchQuery})

    const searchQuery = yield select(CouponSelectors.getSearchQuery)
    const region = yield select(CouponSelectors.getRegion)
    const sortby = yield select(CouponSelectors.getSortby)

    yield put(CouponActions.setCouponsLoading(true))
    yield put(CouponActions.setCouponCategory(category))
    yield put(CouponActions.couponsRequest(true, 1, searchQuery, category, region, sortby))
}

export function * fetchCouponsBySortby (api, {sortby}) {
    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.COUPON_SORTBY, {searchQuery})

    const searchQuery = yield select(CouponSelectors.getSearchQuery)
    const category = yield select(CouponSelectors.getCategory)
    const region = yield select(CouponSelectors.getRegion)

    yield put(CouponActions.setCouponsLoading(true))
    yield put(CouponActions.setCouponSortby(sortby))
    yield put(CouponActions.couponsRequest(true, 1, searchQuery, category, region, sortby))
}

export function * fetchCouponsByRegion (api, {region}) {

    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.COUPON_REGION, {searchQuery})

    const searchQuery = yield select(CouponSelectors.getSearchQuery)
    const category = yield select(CouponSelectors.getCategory)
    const sortby = yield select(CouponSelectors.getSortby)

    yield put(CouponActions.setCouponsLoading(true))
    yield put(CouponActions.setCouponRegion(region))
    yield put(CouponActions.couponsRequest(true, 1, searchQuery, category, region, sortby))
}

export function * resetCouponSearchOptions (api, {searchQuery}){
    yield put(CouponActions.resetSearchOptions())
    yield put(CouponActions.couponsRequest(true, 1, searchQuery, 0, 1, 'featured'))
}

export function * openCouponImageGallery (api, {initialImageIndex, navigator}) {
    yield put(CouponActions.setImageGalleryIndex(initialImageIndex))
    navigator.showModal({
        screen: 'carmate.CouponImageGalleryModal',
        animationType: 'slide-up',
        backButtonHidden: true
    })
}
