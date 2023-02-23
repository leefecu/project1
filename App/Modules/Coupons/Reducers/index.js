import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {clone, concat} from 'lodash'

import { CouponsTypes } from '../Actions'
import * as CouponConstants from '../Constants'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    category: 0,
    currentPage: 1,
    coupons: [],
    myCoupons: [],
    error: null,
    fetching: false,
    myFetching: false,
    initialLoading: true,
    loading: false,
    myCouponLoading: false,
    noMoreCoupons: false,
    region: null,
    searchQuery: '',
    selectedCoupon: null,
    sortby: 'featured',
    sortOptions: {},
    total: 0,
    callModalVisible: false,
    useModalVisible: false,
    howitworksVisible: false,
    needLoginModalVisible: false,
    postLoginAction: null,
    redeemOutcome: null,
    refreshing: false,
    mapMarkerRegion: 0,
    imageGalleryModalVisible: false,
    initialImageIndex: 0,
    dropDownActive: {
        region: false,
        sort: false,
        category: false
    },
    savedCoupon: false,
    existingAds: []
})

/* ------------- Reducers ------------- */

export const couponsRequest = (state: Object) => state.merge({ fetching: true, noMoreCoupons: false })

export const couponsSuccess = (state: Object, {refresh, data}: Object) => {
    return state.merge({
        currentPage: refresh ? 2 : state.currentPage + 1,
        fetching: false,
        refreshing: false,
        loading: false,
        initialLoading: false,
        error: null,
        noMoreCoupons: data.coupons.length === 0,
        total: data.total,
        coupons: refresh ? data.coupons : state.coupons.concat(data.coupons)
    })
}

export const myCouponsRequest = (state: Object) => {
    return state.merge({ 
        myFetching: true, 
        noMoreCoupons: false 
    })
}

export const myCouponsSuccess = (state: Object, data: Object) => {
    return state.merge({ 
        myFetching: false, 
        myCouponLoading: false, 
        refreshing: false, 
        myCoupons: data.myCoupons
    })
}

export const exclusiveCouponSuccess = (state: Object, { coupon }: Object) => {
    return state.merge({ 
        fetching: false, 
        loading: false, 
        refreshing: false,
        selectedCoupon: coupon 
    })
}

export const couponsFailure = (state: Object, { error }: Object) =>
    state.merge({ 
        fetching: false, 
        refreshing: false, 
        loading: false, 
        initialLoading: false, 
        noMoreCoupons: false, 
        myFetching: false, 
        myCouponLoading: false, 
        error 
    })

export const couponSuccess = (state: Object, { coupon }: Object) => {
    return state.merge({ 
        fetching: false, 
        loading: false, 
        refreshing: false, 
        selectedCoupon: coupon, 
        mapMarkerRegion: 0 
    })
}

export const setCouponRefreshing = (state: Object, { refreshing }: Boolean) =>
    state.merge({ refreshing })

export const setCouponSearchQuery = (state: Object, { searchQuery }: String) =>
    state.merge({ searchQuery })

export const setCouponCategory = (state: Object, { category }: Number) =>
    state.merge({ category })

export const setCouponSortby = (state: Object, { sortby }: Number) =>
    state.merge({ sortby })

export const setCouponRegion = (state: Object, { region }: Number) =>
    state.merge({ region })

export const setCouponSortOptions = (state: Object, { data }: Object) =>
    state.merge({ sortOptions: data.coupons.sortOptions})

export const setCouponsLoading = (state: Object, { loading }: Number) =>
    state.merge({ loading })

export const setCallModalVisible = (state: Object, { callModalVisible }: Boolean) =>
    state.merge({ callModalVisible })

export const setHowitworksModalVisible = (state: Object, { howitworksVisible }: Boolean) =>
    state.merge({ howitworksVisible: howitworksVisible })

export const setCouponLoginModalVisible = (state: Object, { needLoginModalVisible, postLoginAction }: Boolean) =>
    state.merge({ needLoginModalVisible : needLoginModalVisible, postLoginAction: needLoginModalVisible ? postLoginAction : null })

export const setSavedCoupon = (state: Object, { status }: Boolean) => {
    return state.merge({ savedCoupon: status })
}

export const setImageGalleryIndex = (state: Object, { initialImageIndex }: Number) => {
    return state.merge({
        imageGalleryModalVisible: true,
        initialImageIndex
    })
}

export const setCouponExistingAdList = (state: Object, { adList }: Object) => 
    state.merge({ existingAds: state.existingAds.concat(adList) })

export const resetCouponExistingAdList = (state: Object) => 
    state.merge({ existingAds: [] })

export const closeImageGallery = (state: Objectn) => {
    return state.merge({
        imageGalleryModalVisible: false,
        initialImageIndex: 0
    })
}

export const resetSearchOptions = (state: Object) => {
    return state.merge({
        loading: false,
        searchQuery: '',
        category: 0,
        sortby: 'featured',
        region: 1
    })
}

export const setReviewInfo = (state: Object, { rating, cnt }: Number) => {
    
    let selectedCoupon = clone(state.selectedCoupon)
    selectedCoupon['reviewRatingAvg'] = rating
    selectedCoupon['reviewCount']= cnt

    return state.merge({
        selectedCoupon: selectedCoupon
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [CouponsTypes.COUPONS_REQUEST]: couponsRequest,
    [CouponsTypes.COUPONS_SUCCESS]: couponsSuccess,
    [CouponsTypes.COUPONS_FAILURE]: couponsFailure,
    [CouponsTypes.COUPON_REQUEST]: couponsRequest,
    [CouponsTypes.COUPON_SUCCESS]: couponSuccess,
    [CouponsTypes.COUPON_FAILURE]: couponsFailure,

    [CouponsTypes.MY_COUPONS_REQUEST]: myCouponsRequest,
    [CouponsTypes.MY_COUPONS_SUCCESS]: myCouponsSuccess,
    [CouponsTypes.MY_COUPONS_FAILURE]: couponsFailure,
    
    [CouponsTypes.SET_COUPON_SEARCH_QUERY]: setCouponSearchQuery,
    [CouponsTypes.SET_COUPON_CATEGORY]: setCouponCategory,
    [CouponsTypes.SET_COUPON_SORTBY]: setCouponSortby,
    [CouponsTypes.SET_COUPON_REGION]: setCouponRegion,
    [CouponsTypes.SET_COUPON_SORT_OPTIONS]: setCouponSortOptions,
    [CouponsTypes.SET_COUPONS_LOADING]: setCouponsLoading,
    [CouponsTypes.SET_COUPON_REFRESHING]: setCouponRefreshing,
    [CouponsTypes.RESET_SEARCH_OPTIONS]: resetSearchOptions,
    [CouponsTypes.SET_SAVED_COUPON]: setSavedCoupon,
    [CouponsTypes.SET_REVIEW_INFO]: setReviewInfo,
    [CouponsTypes.SET_COUPON_EXISTING_AD_LIST]: setCouponExistingAdList,

    [CouponsTypes.RESET_COUPON_EXISTING_AD_LIST]: resetCouponExistingAdList,

    [CouponsTypes.SET_CALL_MODAL_VISIBLE]: setCallModalVisible,
    [CouponsTypes.SET_HOWITWORKS_MODAL_VISIBLE]: setHowitworksModalVisible,
    [CouponsTypes.SET_COUPON_LOGIN_MODAL_VISIBLE]: setCouponLoginModalVisible,
    
    [CouponsTypes.EXCLUSIVE_COUPON_REQUEST]: couponsRequest,
    [CouponsTypes.EXCLUSIVE_COUPON_SUCCESS]: exclusiveCouponSuccess,
    [CouponsTypes.EXCLUSIVE_COUPON_FAILURE]: couponsFailure,
    
    [CouponsTypes.SET_IMAGE_GALLERY_INDEX]: setImageGalleryIndex,
    [CouponsTypes.CLOSE_IMAGE_GALLERY]: closeImageGallery,
})
