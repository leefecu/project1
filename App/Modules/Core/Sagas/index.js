import { AsyncStorage, Platform } from 'react-native'
import { call, put, select, wait } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import Package from '../../../../package.json'

import { handleClick, requireUpdate, versionSplit } from '../Helpers'

import CoreActions from '../Actions'
import * as CoreConstants from '../Constants'
import CouponActions from '../../Coupons/Actions'
import * as CouponReducer from '../../Coupons/Reducers'
import * as CouponSelectors from '../../Coupons/Selectors'
import ListingsActions from '../../Listings/Actions'
import * as ListingReducer from '../../Listings/Reducers'
import * as ListingSelectors from '../../Listings/Selectors'
import UserActions from '../../User/Actions'

export function * userPositionPromised() {
    const position = {}
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (
            location  => position.on({location}),
            error     => position.on({error}),
            {enableHighAccuracy: true, timeout: CoreConstants.GEO_LOCATION_TIMEOUT, maximumAge: CoreConstants.GEO_LOCATION_MAXIMUMAGE}
        )
    }
    return { getLocation: () => new Promise(location => position.on = location) }
}

export function * fetchSystemCheck (api, {navigator}) {
    try {
        const response = yield call(api.getSystemCheck)

        if (response.ok) {
            yield put(CoreActions.systemCheckSuccess(response.data))
            if(response.data.maintenance){

                navigator.showModal({
                    screen: 'carmate.MaintenanceModal',
                    animationType: 'slide-up',
                    backButtonHidden: true
                })

            } else if(Platform.OS === 'ios' && response.data.ios.Upgrade) {

                let currentVersion = versionSplit(Package.version)
                let minimumVersion = Platform.OS === 'ios' ? response.data.ios.minimumVersion : ṛesponse.data.android.minimumVersion
                minimumVersion = versionSplit(minimumVersion)
                const upgradeState = requireUpdate(currentVersion, minimumVersion)

                if(upgradeState){

                    navigator.showModal({
                        screen: 'carmate.UpdateModal',
                        animationType: 'slide-up',
                        backButtonHidden: true
                    })

                }

            } else if(Platform.OS === 'android' && response.data.android.Upgrade) {

                let currentVersion = versionSplit(Package.version)
                let minimumVersion = Platform.OS === 'ios' ? response.data.ios.minimumVersion : ṛesponse.data.android.minimumVersion
                minimumVersion = versionSplit(minimumVersion)
                const upgradeState = requireUpdate(currentVersion, minimumVersion)

                if(upgradeState){

                    navigator.showModal({
                        screen: 'carmate.UpdateModal',
                        animationType: 'slide-up',
                        backButtonHidden: true
                    })
                }
            }

        } else {
            if (response.problem === CoreConstants.TIMEOUT_ERROR || response.problem === CoreConstants.NETWORK_ERROR) {
                yield put(CoreActions.setTimeout(true, 'systemcheck'))
                navigator.showModal({
                    screen: 'carmate.TimeoutModal',
                    animationType: 'slide-up',
                    backButtonHidden: true
                })
            } else {
                yield put(CoreActions.systemCheckFailure(response.data || response.problem))
            }
        }

    } catch (error) {
        yield put(CoreActions.systemCheckFailure(error))
    }
}

export function * getStorageUserLocation () {
    const position = {}
    AsyncStorage.multiGet(['UserLocationLat', 'UserLocationLon']).then(
            values  => position.on({values}),
            errors  => position.on({errors})
        )

    return { getStorageLocation: () => new Promise( values => { position.on = values }) }

}

export function * fetchSearchOptions (api) {

    try {

        let listingRegion = yield select(ListingSelectors.getRegion)
        let couponRegion = yield select(CouponSelectors.getRegion)
        let userLocation

        //If there is no previous set region value get it from storage or user's current location
        if (! couponRegion) {
            const { getStorageLocation } = yield call(getStorageUserLocation)
            const { errors, values } = yield call(getStorageLocation)

            if ( !values[0][1] && !values[1][1] ) {

                const { getLocation } = yield call(userPositionPromised)
                const { error, location } = yield call(getLocation)

                if (location) {
                    AsyncStorage.setItem('UserLocationLat', location.coords.latitude.toString())
                    AsyncStorage.setItem('UserLocationLon', location.coords.longitude.toString())
                    userLocation = {latitude: location.coords.latitude, longitude: location.coords.longitude}
                    yield put(UserActions.setUserLocationLatLon(location.coords.latitude.toString(), location.coords.longitude.toString()))
                } else {
                    userLocation = {latitude: null, longitude: null}
                }

            } else {

                userLocation = {latitude: values[0][1], longitude: values[1][1]}
                yield put(UserActions.setUserLocationLatLon(values[0][1], values[1][1]))

            }
        }

        const response = yield call(api.getSearchOptions, userLocation)

        if (response.ok) {

            yield put(CoreActions.searchOptionsSuccess(response.data))
            if (! couponRegion && ! isNaN(response.data.userRegion)) {
                couponRegion = response.data.userRegion
                yield put(CouponActions.setCouponRegion(couponRegion))
            }
            if (! listingRegion) {
                listingRegion = 0
                yield put(ListingsActions.setRegion(listingRegion))
            }

            yield put(CouponActions.couponsRequest(false, CouponReducer.INITIAL_STATE.currentPage, CouponReducer.INITIAL_STATE.searchQuery, CouponReducer.INITIAL_STATE.category, couponRegion, CouponReducer.INITIAL_STATE.sortby))
            yield put(ListingsActions.listRequest(false, ListingReducer.INITIAL_STATE.currentPage, ListingReducer.INITIAL_STATE.searchQuery, ListingReducer.INITIAL_STATE.searchPanelParams, listingRegion, ListingReducer.INITIAL_STATE.sortby))

            yield put(CouponActions.setCouponSortOptions(response.data))
            yield put(ListingsActions.setSortOptions(response.data))
        } else {
            yield put(CoreActions.searchOptionsFailure(response.data))
        }

    } catch (error) {
        yield put(CoreActions.searchOptionsFailure(error))
    }
}

export function * showSimpleAlert (action) {
    yield put(CoreActions.setSimpleAlertVisible(true, action.message))
    // Somehow delay(3000) doesn't work
    // Need to call delay(1000) 3 times
    yield delay(1500)
    yield delay(500)
    yield put(CoreActions.setSimpleAlertVisible(false))
}

export function * setViewType (value) {
    AsyncStorage.setItem('ListingViewType', value.value)
}

export function * viewAdLink (url, title) {
    yield put(CoreActions.setAdUrl(url))
    //NavigationActions.ad({title: url.title && url.title})
}
