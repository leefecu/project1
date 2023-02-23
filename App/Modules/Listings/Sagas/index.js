import { Platform } from 'react-native'
import { call, put, select, take } from 'redux-saga/effects'
import DeviceInfo from 'react-native-device-info'
import { filter, find, map } from 'lodash'

import ListingsActions from '../Actions'
import * as ListingSelectors from '../Selectors'
import * as ListingsConstants from '../Constants'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'
import {NETWORK_ERROR, TIMEOUT_ERROR} from '../../Core/Constants'
import * as CoreSaga from '../../Core/Sagas'

import { Colors, Images, Layout } from '../../../Themes'

export function * fetchCar (api, {listing}) {
    try {
        const {
            make,
            model,
            trim,
            year
        } = listing

        let titleWords = [year, make, model]
        if (trim) {
            titleWords.push(trim)
        }

        //NavigationActions.listingDetail({ title: titleWords.join(' ') })
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)
        const response = yield call(api.getCar, listing._id, authToken, userId)

        if (response.ok) {
            yield put(ListingsActions.carSuccess(response.data))
        } else {
            yield put(ListingsActions.carFailure(response.data))
        }

    } catch (error) {
        yield put(ListingsActions.carFailure(error))
    }
}

export function * fetchListingDetail (api, {showroom}) {
    try {

        const listingId = yield select(showroom ? ListingSelectors.getShowroomSelecterCarId : ListingSelectors.getSelecterCarId)

        if (listingId) {

            const authToken = yield select(UserSelectors.getAuthToken)
            const userId = yield select(UserSelectors.getUserId)
            const response = yield call(api.getCar, listingId, authToken, userId)
            if (response.ok) {
                if (showroom) {
                    yield put(ListingsActions.showroomCarSuccess(response.data))
                }
                else {
                    yield put(ListingsActions.carSuccess(response.data))
                }
            } else {
                yield put(ListingsActions.carFailure(response.data))
            }
        }
        else {
            yield put(ListingsActions.carFailure('There is no selected car'))
        }

    } catch (error) {
        yield put(ListingsActions.carFailure(error))
    }
}

export function * viewListingDetail (api, {listing, navigator, page}) {

    try {
        const {
            make,
            model,
            trim,
            year
        } = listing

        const userLoggedIn = yield select(UserSelectors.getLoggedIn)
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_DETAIL,
            {
                listingId: listing._id,
                userId: userLoggedIn ? yield select(UserSelectors.getUserId) : DeviceInfo.getUniqueID(),
                page
            })

        let titleWords = [year, make, model]

        if (trim) {
            titleWords.push(trim)
        }

        if(listing.dealerShop){

            listing.dealerShop.phone = [listing.dealerShop.phone]

            listing = listing.merge({
                dealerShop: listing.dealerShop.merge({
                    phone: [listing.dealerShop.phone]
                })
            })

        }

        yield put(ListingsActions.listingSelected(listing))

        /*navigator.toggleTabs({
            to: 'hidden',
            animated: true
        })*/

        navigator.push({
            screen: 'carmate.ListingDetail',
            animated: true,
            backButtonHidden: true,
            passProps: {
                title: titleWords.join(' '),
                listingId: listing._id
            },
            navigatorStyle: {
                tabBarHidden: true,
                drawUnderTabBar: true//Platform.OS === 'ios',
            }
        })

    } catch (error) {
        yield put(ListingsActions.carFailure(error))
    }
}

export function * fetchListing (api, {refresh, page, searchQuery, searchPanelParams, region, sortby}) {

    try {
        let error = null, latitude = null, longitude = null

        if (error) {
            yield put(ListingsActions.listFailure(error))
        } else {
            //const response = yield call(api.getList, {page, searchQuery, searchPanelParams: JSON.stringify(searchPanelParams), regions: region, sortby: sortby, latitude: latitude, longitude: longitude})
            if(page === 1){
                yield put(ListingsActions.resetExistingAdList())
            }

            const curExistingAds = yield select(ListingSelectors.getExistingAds)
            let arrId = []
            if(page && page > 1 && curExistingAds.length > 0 ){
                arrId = map(curExistingAds, (ad) => ad.id)
            }

            const response = yield call(api.getList, {
                getAdvertising: true,
                page,
                searchQuery,
                searchPanelParams: JSON.stringify(searchPanelParams),
                regions: region,
                sortby,
                latitude,
                longitude,
                existingAds: JSON.stringify(arrId)
            })

            yield put(CoreActions.searchOnBlur())

            if (response.ok && response.data.code !== 400) {

                //yield put(UserActions.setUserLocation({latitude, longitude}))
                yield put(ListingsActions.listSuccess(refresh, response.data))
                if(response.data.listings && response.data.listings.length > 0){
                    const listings = response.data.listings
                    const ad = find(listings, (listing) => listing.advertising === true)
                    if(ad){
                        const adList = [ad._id]
                        yield put(ListingsActions.setExistingAdList(adList))
                    }
                }

            } else {

                if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                    yield put(CoreActions.setTimeout(true, 'fetchListing'))
                } else {
                    yield put(ListingsActions.listFailure(response.data))
                }
            }
        }

    } catch (error) {
        yield put(ListingsActions.listFailure(error))
    }
}

export function * fetchMyListings (api) {
    yield put(ListingsActions.setMyListingsLoading(true))

    try {
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)

        if (authToken && userId) {
            const response = yield call(api.getMyListings, authToken, userId)

            if (response.ok) {
                const type = ['car', response.data.listings.length]
                yield put(UserActions.setTabRoute(type))
                yield put(ListingsActions.myListingsSuccess(response.data.listings))
            } else {
                if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                    yield put(CoreActions.setTimeout(true, 'fetchMyListings'))
                } else {
                    yield put(ListingsActions.myListingsFailure(response.data))
                }
            }
        } else {
            //NavigationActions.login()
        }

    } catch (error) {
        yield put(ListingsActions.myListingsFailure(response.data))
    }
}

export function * fetchListingByKeywords (api, {searchQuery}) {
    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_QUICK_SEARCH, {searchQuery})

    const searchPanelParams = yield select(ListingSelectors.getSearchPanelParams)
    const region = yield select(ListingSelectors.getRegion)
    const sortby = yield select(ListingSelectors.getSortby)

    yield put(ListingsActions.setListingsLoading(true))
    yield put(ListingsActions.setSearchQuery(searchQuery))
    yield put(ListingsActions.listRequest(true, 1, searchQuery, searchPanelParams, region, sortby))
}

export function * fetchListingBySearchPanelParams (api, {searchPanelParams}) {
    global.firebase.analytics().logEvent(
        CoreConstants.FB_EVENT.LISTING_REFINE_SERACH,
        {
            bodyType: searchPanelParams.bodyType,
            doorsMin: searchPanelParams.doors && searchPanelParams.doors.min,
            doorsMax: searchPanelParams.doors && searchPanelParams.doors.max,
            engineSizeMin: searchPanelParams.engineSize && searchPanelParams.engineSize.min,
            engineSizeMax: searchPanelParams.engineSize && searchPanelParams.engineSize.max,
            fuelType: searchPanelParams.fuelType,
            keywords: searchPanelParams.keywords,
            listingType: searchPanelParams.listingType,
            make: searchPanelParams.make,
            model: searchPanelParams.model,
            odometerMin: searchPanelParams.odometer && searchPanelParams.odometer.min,
            odometerMax: searchPanelParams.odometer && searchPanelParams.odometer.max,
            priceMin: searchPanelParams.price && searchPanelParams.price.min,
            priceMax: searchPanelParams.price && searchPanelParams.price.max,
            transmission: searchPanelParams.transmission,
            withCouponOnly: searchPanelParams.withCouponOnly,
            yearMin: searchPanelParams.year && searchPanelParams.year.min,
            yearMax: searchPanelParams.year && searchPanelParams.year.max
        })

    const region = yield select(ListingSelectors.getRegion)
    const sortby = yield select(ListingSelectors.getSortby)
    const searchQuery = yield select(ListingSelectors.getSearchQuery)

    yield put(ListingsActions.setListingsLoading(true))
    yield put(ListingsActions.setSearchPanelParams(searchPanelParams))
    yield put(ListingsActions.listRequest(true, 1, searchQuery, searchPanelParams, region, sortby))
}

export function * fetchListingBySortby (api, {sortby}) {
    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_SORTBY, {sortby})

    const region = yield select(ListingSelectors.getRegion)
    const searchQuery = yield select(ListingSelectors.getSearchQuery)
    const searchPanelParams = yield select(ListingSelectors.getSearchPanelParams)

    yield put(ListingsActions.setListingsLoading(true))
    yield put(ListingsActions.setSortby(sortby))
    yield put(ListingsActions.listRequest(true, 1, searchQuery, searchPanelParams, region, sortby))
}

export function * fetchListingByRegion (api, {region}) {
    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_REGION, {region})

    const sortby = yield select(ListingSelectors.getSortby)
    const searchQuery = yield select(ListingSelectors.getSearchQuery)
    const searchPanelParams = yield select(ListingSelectors.getSearchPanelParams)

    yield put(ListingsActions.setListingsLoading(true))
    yield put(ListingsActions.setRegion(region))
    yield put(ListingsActions.listRequest(true, 1, searchQuery, searchPanelParams, region, sortby))
}

export function * resetListingSearchOptions (api, {searchQuery}) {
    yield put(ListingsActions.setListingsLoading(true))
    yield put(ListingsActions.resetRefineOptions(searchQuery))
    yield put(ListingsActions.listRequest(true, 1, '', ListingsConstants.DEFAULT_SIDEBAR_SEARCH_OPTION, 0, 'featured'))
}

export function * openImageGallery (api, {initialImageIndex, navigator}) {
    yield put(ListingsActions.setImageGalleryIndex(initialImageIndex))
    navigator.showModal({
        screen: 'carmate.ListingImageGalleryModal',
        animationType: 'slide-up',
        backButtonHidden: true
    })
}
