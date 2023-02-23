
import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    listRequest: ['refresh', 'page', 'searchQuery', 'searchPanelParams', 'region', 'sortby'],
    listSuccess: ['refresh', 'data'],
    listFailure: ['error'],
    
    carRequest: ['listing'],
    carSuccess: ['car', 'page'],
    carFailure: ['error'],

    myListingsRequest: null,
    myListingsSuccess: ['myListings'],
    myListingsFailure: ['error'],
    
    fetchCar: ['showroom'],
    
    listingSelected: ['listing'],
    
    resetRefine: null,
    resetRefineOptions: ['searchQuery'],
    resetListingSearchOptions: ['searchQuery'],
    resetExistingAdList: null, 
    
    searchListingsByKeywords: ['searchQuery'],
    searchListingsBySearchOptions: ['searchPanelParams'],
    searchListingsBySortby: ['sortby'],
    searchListingsByRegion: ['region'],
    
    setListingsLoading: ['loading'],
    setListingsFetching: ['fetching'],
    setMyListingsLoading: ['myListingloading'],
    setSortby: ['sortby'],
    setRegion: ['region'],
    setSortOptions: ['data'],
    setSearchQuery: ['searchQuery'],
    setSearchPanelParams: ['searchPanelParams'],
    setRefine: ['key', 'option', 'value'],
    setRefineList: ['target', 'data'],
    setListingsRefreshing: ['refreshing'],
    setSubRefine: ['status'],
    setSavedCar: ['status'],
    setSavedCoupon: ['status'],
    setExistingAdList: ['adList'],

    setCallModalVisible: ['callModalVisible'],
    setListingLoginModalVisible: ['needLoginModalVisible', 'postLoginAction'],
    
    viewListingDetail: ['listing', 'navigator', 'page'],
    
    openImageGallery: ['initialImageIndex', 'navigator'],
    setImageGalleryIndex: ['initialImageIndex'],
    closeImageGallery: null,
        
    openPicker: ['pickerActive'],
    closePicker: null
})

export const ListingsTypes = Types
export default Creators
