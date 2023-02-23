import { call, put, select, take } from 'redux-saga/effects'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import ShowroomActions from '../Actions'
import * as ShowroomSelectors from '../Selectors'
import ListingsActions from '../../Listings/Actions'
import * as ListingSelectors from '../../Listings/Selectors'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import * as UserSelectors from '../../User/Selectors'
import {NETWORK_ERROR, TIMEOUT_ERROR} from '../../Core/Constants'
import * as CoreSaga from '../../Core/Sagas'

export function * viewShowroomListingDetail (api, {listing, navigator}) {
    try {
        const {
            make,
            model,
            trim,
            year
        } = listing
        
        const userLoggedIn = yield select(UserSelectors.getLoggedIn)
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.SHOWROOM_LISTING_DETAIL, 
            { 
                listindId: listing._id, 
                userId: userLoggedIn ? yield select(UserSelectors.getUserId) : DeviceInfo.getUniqueID()
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

        yield put(ShowroomActions.showroomListingSelected(listing))
        
        /*navigator.toggleTabs({
            to: 'hidden',
            animated: true
        })*/

        navigator.push({
            screen: 'carmate.ShowroomListingDetail',
            title: titleWords.join(' '),
            animated: true,
            backButtonHidden: true,
            passProps: {
                title: titleWords.join(' ')
            },
            navigatorStyle: {
                tabBarHidden: true,
                drawUnderTabBar: true//Platform.OS === 'ios',
            }
        })


    } catch (error) {
        yield put(ShowroomActions.showroomCarFailure(error))
    }
}

export function * fetchShowroomCar (api, {listing}) {
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

        //NavigationActions.ShowroomListingDetail({ title: titleWords.join(' ') })

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
export function * fetchDealerShop (api, {id}) {
    try {

        const response = yield call(api.dealerShop, id)

        if (response.ok) {
            response.data.phone = [response.data.phone]
            yield put(ShowroomActions.dealerShopSuccess(response.data))
        } else {

            if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                yield put(CoreActions.setTimeout(true, 'fetchDealerShop'))
            } else {
                yield put(ShowroomActions.dealerShopFailure(response.data))
            }

        }

    } catch (error) {
        yield put(ShowroomActions.dealerShopFailure(response.data))
    }
}

export function * fetchDealerShopShowroom (api, {id, page}) {
    try {

        const response = yield call(api.dealerShopShowroom, id, page)

        if ( response.ok ) {
            response.data.page = page
            yield put(ShowroomActions.setShowroomTabRoute(response.data.total))
            yield put(ShowroomActions.dealerShopShowroomSuccess(response.data))

        } else {

            if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                yield put(CoreActions.setTimeout(true, 'fetchDealerShopShowroom'))
            } else {
                yield put(ShowroomActions.dealerShopShowroomFailure(response.data))
            }

        }

    } catch (error) {
        yield put(ShowroomActions.dealerShopShowroomFailure(error))
    }
}

export function * viewShowroomListings (api, {dealer}) {

    try {

        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.DEALER_SHOWROOM_FROM_LISTING, {
            dealerName: dealer.name,
            dealerId: dealer.id
        })

        yield put(ShowroomActions.dealerShopRequest(dealer.id))
        yield put(ShowroomActions.dealerShopShowroomRequest(dealer.id, 1))
        //NavigationActions.showroom({title: dealer.name})
        //yield put(NavigationActions.navigate({ routeName: 'Showroom'}));

    } catch (error) {
        yield put(ShowroomActions.dealerShopShowroomFailure(error))
    }
}

export function * viewMoreShowroomListings (api) {
    try {
        const dealerShop = yield select(ShowroomSelectors.getDealershop)
        const currentPage = yield select(ShowroomSelectors.getShowroomCurrentPage)

        yield put(ShowroomActions.setShowroomListingsFetching(true))
        yield put(ShowroomActions.dealerShopShowroomRequest(dealerShop._id._str, currentPage + 1))
    } catch (error) {
        yield put(ShowroomActions.dealerShopShowroomFailure(error))
    }
}
