import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {concat, clone, map} from 'lodash'

import { ShowroomTypes } from '../Actions'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    initialLoading: true,
    error: null,
    fetching: false,
    carFetching: false,
    loading: false,
    showroomCurrentPage: 1,
    showroomSelectedCar: null,
    dealerShop: {},
    dealerShopShowroomListing: null,
    dealerShopShowroomTotal: null,
    noMoreShowroomListings: false,
    introPass: false,
    savedCar: false,
    refreshing: false,
    savedCoupon: false,
    tabIndex: 0,
    tabRoute: [{ key: '1', title: "All Listings ()" },
              { key: '2', title: 'About Us' }],
    initialImageIndex: 0,
    callModalVisible: false,
    showroomImageGalleryModalVisible: false,
})

/* ------------- Reducers ------------- */

export const dealerShopSuccess = (state: Object, { dealerShop } : Object) => {
       
    return state.merge({dealerShop})
}
export const dealerShopFailure = (state: Object, { error } : Object) => {
    return state.merge({ error })
}

export const dealerShopShowroomSuccess = (state: Object, { data } : Object) => {

    return state.merge({
        dealerShopShowroomListing: data.page === 1 ? data.listings : state.dealerShopShowroomListing.concat(data.listings),
        dealerShopShowroomTotal: data.total,
        fetching: false,
        loading: false,
        refreshing: false,
        initialLoading: false,
        showroomCurrentPage: data.page,
        noMoreShowroomListings: data.listings.length === 0,
    })
}

export const dealerShopShowroomFailure = (state: Object, { error } : Object) => {

    return state.merge({ 
        fetching: false, 
        refreshing: false, 
        loading: false, 
        initialLoading: false, 
        noMoreShowroomListings: false,
        error 
    })
}

export const setShowroomListingsRefreshing = (state: Object, { refreshing }: Boolean) =>
    state.merge({ refreshing })

export const setShowroomListingsLoading = (state: Object, { loading }: Number) =>
    state.merge({ loading })

export const setShowroomListingsFetching = (state: Object, { fetching }: Number) =>
    state.merge({ fetching })

export const setTabIndex = (state: Object, {index}: Number) =>{
    return state.merge({
        tabIndex: index
    })
}

export const setShowroomTabRoute = (state: Object, {totalLength}: Number) =>{
    return state.merge({
        tabRoute: [{ key: '1', title: "All Listings ("+totalLength+")" },
                    { key: '2', title: 'About Us' }]
    })
}

export const showroomCarSuccess = (state: Object, { page, car }: Object) => {
    return state.merge({
        carFetching: false,
        fetching: false,
        loading: false,
        refreshing: false,
        showroomSelectedCar: car,
    })
}

export const showroomListingSelected = (state: Object, { listing }: Object) => {
    return state.merge({ showroomSelectedCar: listing })
}


export const openShowroomImageGallery = (state: Object, { initialImageIndex }: Number) => {
    return state.merge({
        showroomImageGalleryModalVisible: true,
        initialImageIndex
    })
}

export const closeShowroomImageGallery = (state: Objectn) => {
    return state.merge({
        showroomImageGalleryModalVisible: false,
        initialImageIndex: 0
    })
}


export const resetShowroom = (state: Object) => {
    return state.merge({
        initialLoading: true,
        error: null,
        fetching: false,
        carFetching: false,
        loading: false,
        dealerShopShowroomListing: [],
        dealerShopShowroomTotal: 0,
        showroomCurrentPage: 1,
        noMoreShowroomListings: false,
        tabIndex: 0
    })
}

export const setCallModalVisible = (state: Object, { callModalVisible }: Boolean) =>
    state.merge({ callModalVisible })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    
    [ShowroomTypes.DEALER_SHOP_SUCCESS]: dealerShopSuccess,
    [ShowroomTypes.DEALER_SHOP_FAILURE]: dealerShopFailure,
    [ShowroomTypes.DEALER_SHOP_SHOWROOM_SUCCESS]: dealerShopShowroomSuccess,
    [ShowroomTypes.DEALER_SHOP_SHOWROOM_FAILURE]: dealerShopShowroomFailure,

    [ShowroomTypes.SHOWROOM_CAR_FAILURE]: dealerShopShowroomFailure,
    [ShowroomTypes.SHOWROOM_CAR_SUCCESS]: showroomCarSuccess,
    [ShowroomTypes.SHOWROOM_LISTING_SELECTED]: showroomListingSelected,

    [ShowroomTypes.SET_SHOWROOM_LISTINGS_LOADING]: setShowroomListingsLoading,
    [ShowroomTypes.SET_SHOWROOM_LISTINGS_FETCHING]: setShowroomListingsFetching,
    [ShowroomTypes.SET_SHOWROOM_LISTINGS_REFRESHING]: setShowroomListingsRefreshing,
    [ShowroomTypes.RESET_SHOWROOM]: resetShowroom,

    [ShowroomTypes.SET_TAB_INDEX]: setTabIndex,
    [ShowroomTypes.SET_SHOWROOM_TAB_ROUTE]: setShowroomTabRoute,

    [ShowroomTypes.OPEN_SHOWROOM_IMAGE_GALLERY]: openShowroomImageGallery,
    [ShowroomTypes.CLOSE_SHOWROOM_IMAGE_GALLERY]: closeShowroomImageGallery,
    [ShowroomTypes.SET_CALL_MODAL_VISIBLE]: setCallModalVisible,
})
