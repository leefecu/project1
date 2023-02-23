import { createSelector } from 'reselect'

export const getCategory = state => state.coupons.category

export const getRegion = state => state.coupons.region

export const getSortby = state => state.coupons.sortby

export const getSortOptions = state => state.coupons.sortOptions.asMutable()

export const getInitialLoading = state => state.coupons.initialLoading

export const getFetching = state => state.coupons.fetching

export const getMyFetching = state => state.coupons.myFetching

export const getRefreshing = state => state.coupons.refreshing

export const getLoading = state => state.coupons.loading

export const getMyCouponLoading = state => state.coupons.myCouponLoading

export const getNoMoreCoupons = state => state.coupons.noMoreCoupons

export const getCurrentPage = state => state.coupons.currentPage

export const getCoupons = state => state.coupons.coupons.asMutable()

export const getSearchQuery = state => state.coupons.searchQuery

export const getTotal = state => state.coupons.total

export const getCouponLength = state => state.coupons.coupons ? state.coupons.coupons.length : 0

export const getMyCouponLength = state => state.coupons.myCoupons.length

export const getMyCoupons = state => state.coupons.myCoupons.asMutable()

export const getSelectedCoupon = state => state.coupons.selectedCoupon

export const getPostLoginAction = state => state.coupons.postLoginAction

export const getNeedLoginModalVisible = state => state.coupons.needLoginModalVisible

export const getImageGalleryModalVisible = state => state.coupons.imageGalleryModalVisible

export const getInitialImageIndex = state => state.coupons.initialImageIndex

export const getHowitworksVisible = state => state.coupons.howitworksVisible || false

export const getUseModalVisible = state => state.coupons.useModalVisible || false

export const getRedeemOutcome = state => state.coupons.redeemOutcome

export const getCallModalVisible = state => state.coupons.callModalVisible || false

export const getMapMarkerRegion = state => state.coupons.mapMarkerRegion

export const getExistingAds = state => state.coupons.existingAds.asMutable()

export const isLoading = createSelector(
    getFetching,
    getLoading,
    (fetching, loading) => fetching || loading
)

export const isMyLoading = createSelector(
    getMyFetching,
    getMyCouponLoading,
    (fetching, loading) => fetching || loading
)

export const canLoadMoreCoupons = createSelector(
    getFetching,
    getLoading,
    getNoMoreCoupons,
    getCouponLength,
    (fetching, loading, noMoreCoupons, couponLength) => ! fetching && ! loading && ! noMoreCoupons && couponLength > 5
)

export const shouldRenderFooter = createSelector(
    getNoMoreCoupons,
    getCouponLength,
    getFetching,
    (noMoreCoupons, couponLength, fetching) => ! noMoreCoupons && fetching && couponLength > 5
)

