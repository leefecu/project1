import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { CoreTypes } from '../Actions'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    categories: {},
    error: null,
    fetching: false,
    sortOptions: {},
    listingsRegions: {},
    couponsRegions: {},
    partnerShops: [],
    userRegion: 1,
    maintenance: false,
    ios: {
        upgrade: false,
        url: ''
    },
    android: {
        upgrade: false,
        url: ''
    },
    supportModalVisible: false,
    tryOldLogin: true,
    timeout: false,
    timeoutAction: null,
    offline: false,
    simpleAlertVisible: false,
    simpleAlertMessage: null,
    searchPanelOptions: null,
    pageStatus: {
        page: 'listings',
        savedTabStatus: 'cars',
        mypageTabStatus: '',
        carDetailTabStatus: 'carInfo'
    },
    dropDownActive: {
        region: false,
        sortCoupons: false,
        sortListings: false,
        category: false,
        refine: false
    },
    checkSavedCars: true,
    checkSavedCoupons: true,
    searchOnFocus: false,
    adUrl: null
})

/* ------------- Reducers ------------- */

export const changePage = (state: Object, { page }: String) => {

    let pageStatus = {
        page: page,
        featuresTabStatus: state.pageStatus.featuresTabStatus,
        savedTabStatus: state.pageStatus.savedTabStatus,
        mypageTabStatus: state.pageStatus.mypageTabStatus,
        carDetailTabStatus: state.pageStatus.carDetailTabStatus
    }
    return state.merge({ pageStatus : pageStatus })
}

export const changeMyPage = (state: Object, { tab }: String) => {

    let pageStatus = {
        page: 'mypage',
        featuresTabStatus: state.pageStatus.featuresTabStatus,
        savedTabStatus: state.pageStatus.savedTabStatus,
        mypageTabStatus: tab,
        carDetailTabStatus: state.pageStatus.carDetailTabStatus
    }
    return state.merge({ pageStatus : pageStatus })
}

export const searchOptionsRequest = (state: Object) => state.merge({ fetching: true, timeout: false, timeoutAction: null })

export const searchOptionsSuccess = (state: Object, {data}: Object) => {

    return state.merge({
        categories: data.coupons.categories,
        error: null,
        fetching: false,
        listingsRegions: data.listings.regions,
        couponsRegions: data.coupons.regions,
        partnerShops: data.coupons.partnerShops,
        userRegion: data.userRegion,
        timeout: false,
        timeoutAction: null,
        searchPanelOptions: data.searchPanelOptions
    })
}

export const searchOptionsFailure = (state: Object, { error }: Object) =>
    state.merge({ fetching: false, error })

export const systemCheckSuccess = (state: Object, {data}: Object) => {
    return state.merge({
        maintenance: data.maintenance,
        ios: data.ios,
        android: data.android,
        tryOldLogin: data.tryOldLogin,
        timeout: false,
        timeoutAction: null
    })
}

export const setOffline = (state: Object, { offline }: Object) => state.merge({ offline })

export const _setTimeout = (state: Object, { timeout, timeoutAction }: Object) => 
    state.merge({ timeout, timeoutAction })

export const searchOnFocus = (state: Object) => {
    return state.merge({ searchInFocus: true })
}

export const searchOnBlur = (state: Object) => {
    return state.merge({ searchInFocus: false })
}

export const setSimpleAlertVisible = (state: Object, { simpleAlertVisible, simpleAlertMessage }: Object) =>
    state.merge({
        simpleAlertVisible : simpleAlertVisible,
        simpleAlertMessage: simpleAlertVisible ? simpleAlertMessage : null
    })

export const setAdUrl = (state: Object, { url }: Object) => state.merge({adUrl: url})

export const setSupportModalVisible = (state: Object, { supportModalVisible }: Object) => 
    state.merge({ supportModalVisible })

export const openRegionDropdown = (state: Object) => {
    let dropDownActive = {
        region: true,
        sortCoupons: false,
        sortListings: false,
        category: false,
        refine: false
    }
    return state.merge({ dropDownActive: dropDownActive })
}

export const openSortCouponsDropdown = (state: Object) => {
    let dropDownActive = {
        region: false,
        sortCoupons: true,
        sortListings: false,
        category: false,
        refine: false
    }
    return state.merge({ dropDownActive: dropDownActive })
}

export const openSortListingsDropdown = (state: Object) => {
    let dropDownActive = {
        region: false,
        sortCoupons: false,
        sortListings: true,
        category: false,
        refine: false
    }
    return state.merge({ dropDownActive: dropDownActive })
}

export const openCategoryDropdown = (state: Object) => {
    let dropDownActive = {
        region: false,
        sortCoupons: false,
        sortListings: false,
        category: true,
        refine: false
    }
    return state.merge({ dropDownActive: dropDownActive })
}

export const openRefineDropdown = (state: Object) => {
    let dropDownActive = {
        region: false,
        sortCoupons: false,
        sortListings: false,
        category: false,
        refine: true
    }
    return state.merge({ dropDownActive: dropDownActive })
}

export const closeDropdown = (state: Object, { type }: Object) => {
    let dropDownActive = {
        region: false,
        sortCoupons: false,
        sortListings: false,
        category: false,
        refine: false
    }

    return state.merge({ dropDownActive: dropDownActive })
}

export const reducer = createReducer(INITIAL_STATE, {
    [CoreTypes.CHANGE_PAGE]: changePage,
    [CoreTypes.CHANGE_MY_PAGE]: changeMyPage,
    
    [CoreTypes.SEARCH_OPTIONS_REQUEST]: searchOptionsRequest,
    [CoreTypes.SEARCH_OPTIONS_SUCCESS]: searchOptionsSuccess,
    [CoreTypes.SEARCH_OPTIONS_FAILURE]: searchOptionsFailure,
    [CoreTypes.SEARCH_ON_FOCUS]: searchOnFocus,
    [CoreTypes.SEARCH_ON_BLUR]: searchOnBlur,

    [CoreTypes.SYSTEM_CHECK_REQUEST]: searchOptionsRequest,
    [CoreTypes.SYSTEM_CHECK_SUCCESS]: systemCheckSuccess,
    [CoreTypes.SYSTEM_CHECK_FAILURE]: searchOptionsFailure,

    [CoreTypes.SET_TIMEOUT]: _setTimeout,
    [CoreTypes.SET_OFFLINE]: setOffline,
    [CoreTypes.SET_SIMPLE_ALERT_VISIBLE]: setSimpleAlertVisible,
    [CoreTypes.SET_AD_URL]: setAdUrl,
    [CoreTypes.SET_SUPPORT_MODAL_VISIBLE]: setSupportModalVisible,
    
    [CoreTypes.OPEN_REGION_DROPDOWN]: openRegionDropdown,
    [CoreTypes.OPEN_SORT_COUPONS_DROPDOWN]: openSortCouponsDropdown,
    [CoreTypes.OPEN_SORT_LISTINGS_DROPDOWN]: openSortListingsDropdown,
    [CoreTypes.OPEN_CATEGORY_DROPDOWN]: openCategoryDropdown,
    [CoreTypes.OPEN_REFINE_DROPDOWN]: openRefineDropdown,
    [CoreTypes.CLOSE_DROPDOWN]: closeDropdown,
})
