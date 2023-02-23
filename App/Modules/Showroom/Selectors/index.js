import { createSelector } from 'reselect'

export const getInitialLoading = state => state.showroom.initialLoading

export const getLoading = state => state.showroom.loading

export const getRefreshing = state => state.showroom.refreshing

export const getFetching = state => state.showroom.fetching

export const getCarFetching = state => state.showroom.carFetching

export const getDealershop = state => state.showroom.dealerShop.asMutable()

export const getDealerShopShowroomListing = state => state.showroom.dealerShopShowroomListing

export const getDealerShopShowroomListingLength = state => state.showroom.dealerShopShowroomTotal

export const getShowroomCurrentPage = state => state.showroom.showroomCurrentPage

export const getNoMoreShowroomListings = state => state.showroom.noMoreShowroomListings

export const getShowroomImageGalleryModalVisible = state => state.showroom.showroomImageGalleryModalVisible

export const getShowroomSelecterCarId = state => state.showroom.showroomSelectedCar ? state.listings.showroomSelectedCar._id: null

export const getShowroomSelecterCar = state => state.showroom.showroomSelectedCar

export const getTabIndex = state => state.showroom.tabIndex

export const getTabRoute = state => state.showroom.tabRoute

export const getInitialImageIndex = state => state.showroom.initialImageIndex

export const getCallModalVisible = state => state.showroom.callModalVisible || false

export const getTabState = createSelector(
    getTabIndex,
    getTabRoute,
    (tabIndex, tabRoute) => {
    	const result = {index: tabIndex, routes:tabRoute}
    	return result
    }
)
