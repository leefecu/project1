
import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    couponsRequest: ['refresh', 'page', 'searchQuery', 'category', 'region', 'sortby'],
    couponsSuccess: ['refresh', 'data'],
    couponsFailure: ['error'],
    couponRequest: ['couponId', 'navigator', 'page'],
    couponSuccess: ['coupon'],
    couponFailure: ['error'],
    myCouponsRequest: null,
    myCouponsSuccess: ['myCoupons'],
    myCouponsFailure: ['error'],

    resetCouponSearchOptions: ['searchQuery'],
    resetSearchOptions: ['searchQuery'],
    searchCouponsByKeywords: ['searchQuery', 'category', 'region', 'sortby'],
    searchCouponsByCategory: ['category'],
    searchCouponsBySortby: ['sortby'],
    searchCouponsByRegion: ['region'],
    searchCouponsByResetOptions: ['searchQuery', 'category', 'region', 'sortby'],

    setCouponsLoading: ['loading'],
    setCouponSearchQuery: ['searchQuery'],
    setCouponCategory: ['category'],
    setCouponSortby: ['sortby'],
    setCouponRegion: ['region'],
    setCouponSortOptions: ['data'],
    setCouponRefreshing: ['refreshing'],
    setSavedCoupon: ['status'],
    setReviewInfo: ['rating', 'cnt'], 

    setCallModalVisible: ['callModalVisible'],
    setHowitworksModalVisible: ['howitworksVisible'],
    setCouponLoginModalVisible: ['needLoginModalVisible', 'postLoginAction'],

    setCouponExistingAdList: ['adList'],    
    resetCouponExistingAdList: null, 

    userExclusiveCouponRequest: ['couponId', 'navigator'],
    exclusiveCouponRequest: ['couponId', 'navigator'],
    exclusiveCouponSuccess: ['coupon'],
    exclusiveCouponFailure: ['error'],
    
    openCouponImageGallery: ['initialImageIndex', 'navigator'],
    setImageGalleryIndex: ['initialImageIndex'],
    closeImageGallery: null,
})

export const CouponsTypes = Types
export default Creators
