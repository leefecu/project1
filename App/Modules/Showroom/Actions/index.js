import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    
    dealerShopRequest: ['id'],
    dealerShopSuccess: ['dealerShop'],
    dealerShopFailure: ['error'],
    dealerShopShowroomRequest: ['id', 'page'],
    dealerShopShowroomSuccess: ['data'],
    dealerShopShowroomFailure: ['error'],

    showroomCarFailure: ['error'],
    showroomCarSuccess: ['car', 'page'],
    showroomListingSelected: ['listing'],
    
    setShowroomListingsLoading: ['loading'],
    setShowroomListingsFetching: ['fetching'],
    setShowroomListingsRefreshing: ['refreshing'],

    viewShowroomListings: ['dealer'],
    viewMoreShowroomListings: null,
    viewShowroomListingDetail: ['listing', 'navigator'],
    
    setTabIndex: ['index'],
    setShowroomTabRoute: ['totalLength'],
    
    setCallModalVisible: ['callModalVisible'],
    
    openShowroomImageGallery: ['initialImageIndex'],
    closeShowroomImageGallery: null,

    resetShowroom: null
    
})

export const ShowroomTypes = Types
export default Creators
