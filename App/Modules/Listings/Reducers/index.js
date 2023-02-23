import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {concat, clone, map} from 'lodash'

import { ListingsTypes } from '../Actions'
import * as ListingsConstants from '../Constants'

import * as helper from '../Helpers'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    category: 0,
    currentPage: 1,
    list: [],
    error: null,
    fetching: false,
    carFetching: false,
    initialLoading: true,
    loading: true,
    noMoreListings: false,
    region: null,
    searchQuery: '',
    searchPanelParams: ListingsConstants.DEFAULT_SIDEBAR_SEARCH_OPTION,
    selectedCar: null,
    showroomSelectedCar: null,
    sortby: 'featured',
    sortOptions: {},
    refineStatus: 'main',
    refineChanged: false,
    refine: {
        'make': {idx:1, type: 'make', selected: false, active: true }
        , 'model' :{idx:2, type: 'model', selected: false, active: false }
        , 'price' :{idx:3, type: 'price', selected: false, active: true }
        , 'year' :{idx:4, type: 'year', selected: false, active: true }
        , 'odometer' :{idx:5, type: 'odometer', selected: false, active: true }
        , 'transmission' :{idx:6, type: 'transmission', selected: false, active: true }
        , 'engineSize' :{idx:7, type: 'engineSize', selected: false, active: true }
        , 'bodyType' :{idx:8, type: 'bodyType', selected: false, active: true }
        , 'fuelType' :{idx:9, type: 'fuelType', selected: false, active: true }
        , 'doors' :{idx:10, type: 'doors', selected: false, active: true }
        , 'listingType' :{idx:11, type: 'listingType', selected: false, active: true }
        , 'location' :{idx:12, type: 'location', selected: false, active: true }
        , 'sortby' :{idx:13, type: 'sortby', selected: false, active: true }
        , 'view' :{idx:14, type: 'view', value: 'list'}
        },
    refineListType: "",
    refineList:{},
    total: 0,
    myListings: [],
    myFetching: false,
    myListingInitialloading: true,
    myListingloading: false,
    myRefreshing: false,
    callModalVisible: false,
    useModalVisible: false,
    imageGalleryModalVisible: false,
    showroomImageGalleryModalVisible: false,
    initialImageIndex: 0,
    needLoginModalVisible: false,
    postLoginAction: null,
    redeemOutcome: null,
    refreshing: false,
    dropDownActive: {
        region: false,
        sort: false,
        category: false
    },
    pickerActive: {
        price: false,
        year: false,
        odometer: false,
        engineSize: false,
        doors: false
    },
    showroomCurrentPage: 1,
    dealerShop: {},
    dealerShopShowroomListing: null,
    dealerShopShowroomTotal: null,
    noMoreShowroomListings: false,
    introPass: false,
    savedCar: false,
    existingAds: []
})

/* ------------- Reducers ------------- */

export const listRequest = (state: Object) => state.merge({ fetching: true, noMoreListings: false })

export const listSuccess = (state: Object, {refresh, data}: Object) => {

    return state.merge({
        currentPage: refresh ? 2 : state.currentPage + 1,
        fetching: false,
        refreshing: false,
        loading: false,
        initialLoading: false,
        error: null,
        noMoreListings: data.listings && data.listings.length === 0,
        total: data.total,
        list: refresh ? data.listings : state.list.concat(data.listings)
    })
}

export const listFailure = (state: Object, { error }: Object) =>{
    return state.merge({ 
        fetching: false, 
        refreshing: false, 
        loading: false, 
        initialLoading: false, 
        noMoreListings: false, 
        error 
    })
}

export const carRequest = (state: Object) => {
    return state.merge({
        carFetching: true
    })
}

export const carSuccess = (state: Object, { page, car }: Object) => {
    return state.merge({
        carFetching: false,
        fetching: false,
        loading: false,
        refreshing: false,
        selectedCar: car,
    })
}

export const myListingsRequest = (state: Object) => {
    return state.merge({ 
        myFetching: true
    })
}

export const myListingsSuccess = (state: Object, { myListings }: Object) => {
    return state.merge({
        myRefreshing: false,
        myFetching:false,
        myListingloading: false,
        myListingInitialloading: false,
        myListings: concat(myListings)
    })
}

export const myListingsFailure = (state: Object, { error }: Object) =>{
    return state.merge({ 
        myRefreshing: false,
        myFetching:false,
        myListingloading: false,
        myListingInitialloading: false,
        error 
    })
}

export const listingSelected = (state: Object, { listing }: Object) => {
    return state.merge({ selectedCar: listing })
}

export const setSearchQuery = (state: Object, { searchQuery }: String) =>
    state.merge({ searchQuery })

export const setSortby = (state: Object, { sortby }: Number) => {
    return state.merge({ sortby })
}

export const setRegion = (state: Object, { region }: Number) => {
    return state.merge({ region })
}

export const setSortOptions = (state: Object, { data }: Object) => {
    return state.merge({ sortOptions: data.listings.sortOptions})
}

export const setSearchPanelParams = (state: Object, { searchPanelParams }: Object) => {
    let changeValue = helper.getRefineStatus(state.refine)
    return state.merge({ searchPanelParams: searchPanelParams , refineChanged: changeValue})
}

export const setRefine = (state: Object, { key, option, value }: Object) => {
    let refine = clone(state.refine)
    let refineView = clone(state.refine[key])
    
    switch (option) {
        case 'active' :
            refineView['active'] = value
        break
        case 'selected' :
            refineView['selected'] = value
        break
        case 'value' :
            refineView['value'] = value
        break
    }
    if (refine[key]) {
        refine[key] = refineView
    }
    return state.merge({refine})
}

export const setRefineList = (state: Object, {target, data}: Object) => {
    return state.merge({refineList: data, refineListType: target, refineStatus: 'sub'})
}

export const setListingsRefreshing = (state: Object, { refreshing }: Boolean) =>
    state.merge({ refreshing })

export const setSubRefine = (state: Object, { status }: Object) =>
    state.merge({refineStatus: status})

export const setListingsLoading = (state: Object, { loading }: Number) =>
    state.merge({ loading })

export const setListingsFetching = (state: Object, { fetching }: Number) =>
    state.merge({ fetching })

export const setMyListingsLoading = (state: Object, { myListingloading }: Number) =>
    state.merge({ myListingloading })

export const setCallModalVisible = (state: Object, { callModalVisible }: Boolean) =>
    state.merge({ callModalVisible })

export const setListingLoginModalVisible = (state: Object, { needLoginModalVisible, postLoginAction }: Boolean) =>
    state.merge({ 
        needLoginModalVisible : needLoginModalVisible, 
        postLoginAction: needLoginModalVisible ? postLoginAction : null 
    })

export const setSavedCar = (state: Object, { status }: Boolean) => {
    return state.merge({ savedCar: status })
}

export const setExistingAdList = (state: Object, { adList }: Object) => 
    state.merge({ existingAds: state.existingAds.concat(adList) })

export const resetExistingAdList = (state: Object) => 
    state.merge({ existingAds: [] })

export const resetRefine = (state: Object) => {
    return state.merge({refine: ListingsConstants.DEFAULT_REFINE_OPTIONS})
}

export const resetRefineOptions = (state: Object, {searchQuery}: String) => {
    return state.merge({
        searchQuery: searchQuery,
        refine: ListingsConstants.DEFAULT_REFINE_OPTIONS,
        searchPanelParams: ListingsConstants.DEFAULT_SIDEBAR_SEARCH_OPTION,
        sortby: 'featured',
        region: 0,
        refineChanged: false
    })
}

export const setImageGalleryIndex = (state: Object, { initialImageIndex }: Number) => {
    return state.merge({
        imageGalleryModalVisible: true,
        initialImageIndex
    })
}

export const closeImageGallery = (state: Objectn) => {
    return state.merge({
        imageGalleryModalVisible: false,
        initialImageIndex: 0
    })
}

export const openPicker = (state: Object, { pickerActive } : Object ) => {

    return state.merge({ pickerActive })
}
export const closePicker = (state: Object) => {
    let pickerActive = {
        price: false,
        year: false,
        odometer: false,
        engine: false,
        doors: false
    }
    return state.merge({ pickerActive })
}


export const reducer = createReducer(INITIAL_STATE, {
    [ListingsTypes.LIST_REQUEST]: listRequest,
    [ListingsTypes.LIST_SUCCESS]: listSuccess,
    [ListingsTypes.LIST_FAILURE]: listFailure,
    
    [ListingsTypes.MY_LISTINGS_REQUEST]: myListingsRequest,
    [ListingsTypes.MY_LISTINGS_SUCCESS]: myListingsSuccess,
    [ListingsTypes.MY_LISTINGS_FAILURE]: myListingsFailure,
    
    [ListingsTypes.CAR_REQUEST]: carRequest,
    [ListingsTypes.CAR_SUCCESS]: carSuccess,
    [ListingsTypes.CAR_FAILURE]: listFailure,
    [ListingsTypes.LISTING_SELECTED]: listingSelected,

    [ListingsTypes.SET_SEARCH_QUERY]: setSearchQuery,
    [ListingsTypes.SET_SORTBY]: setSortby,
    [ListingsTypes.SET_REGION]: setRegion,
    [ListingsTypes.SET_SORT_OPTIONS]: setSortOptions,
    [ListingsTypes.SET_SEARCH_PANEL_PARAMS]: setSearchPanelParams,
    [ListingsTypes.SET_REFINE]: setRefine,
    [ListingsTypes.SET_REFINE_LIST]: setRefineList,
    [ListingsTypes.SET_LISTINGS_LOADING]: setListingsLoading,
    [ListingsTypes.SET_LISTINGS_REFRESHING]: setListingsRefreshing,
    [ListingsTypes.SET_LISTINGS_FETCHING]: setListingsFetching,
    [ListingsTypes.SET_MY_LISTINGS_LOADING]: setMyListingsLoading,
    [ListingsTypes.SET_SUB_REFINE]: setSubRefine,
    [ListingsTypes.SET_SAVED_CAR]: setSavedCar,
    [ListingsTypes.SET_EXISTING_AD_LIST]: setExistingAdList,
    
    [ListingsTypes.SET_CALL_MODAL_VISIBLE]: setCallModalVisible,
    [ListingsTypes.SET_LISTING_LOGIN_MODAL_VISIBLE]: setListingLoginModalVisible,

    [ListingsTypes.RESET_EXISTING_AD_LIST]: resetExistingAdList,
    [ListingsTypes.RESET_REFINE]: resetRefine,
    [ListingsTypes.RESET_REFINE_OPTIONS]: resetRefineOptions,
    
    [ListingsTypes.SET_IMAGE_GALLERY_INDEX]: setImageGalleryIndex,
    [ListingsTypes.CLOSE_IMAGE_GALLERY]: closeImageGallery,
    
    [ListingsTypes.OPEN_PICKER]: openPicker,
    [ListingsTypes.CLOSE_PICKER]: closePicker,
})
