import { createSelector } from 'reselect'

export const getCurrentPage = state => state.listings.currentPage

export const getInitialLoading = state => state.listings.initialLoading

export const getSearchPanelParams = state => state.listings.searchPanelParams.asMutable()

export const getRegion = state => state.listings.region

export const getSortby = state => state.listings.sortby

export const getSortOptions = state => state.listings.sortOptions.asMutable()

export const getFetching = state => state.listings.fetching

export const getCarFetching = state => state.listings.carFetching

export const getLoading = state => state.listings.loading

export const getRefine = state => state.listings.refine

export const getRefineChanged = state => state.listings.refineChanged

export const getList = state => state.listings.list.asMutable()

export const getCurrentListLength = state => state.listings.list && state.listings.list.length

export const getNoMoreListings = state => state.listings.noMoreListings

export const getRefreshing = state => state.listings.refreshing

export const getSearchQuery = state => state.listings.searchQuery

export const getTotal = state => state.listings.total

export const getSelecterCar = state => state.listings.selectedCar

export const getSelecterCarId = state => state.listings.selectedCar ? state.listings.selectedCar._id : null

export const getCallModalVisible = state => state.listings.callModalVisible || false

export const getImageGalleryModalVisible = state => state.listings.imageGalleryModalVisible

export const getInitialImageIndex = state => state.listings.initialImageIndex

export const getPostLoginAction = state => state.listings.postLoginAction

export const getNeedLoginModalVisible = state => state.listings.needLoginModalVisible

export const getViewType = state => state.listings.refine.view.value

export const getRefineStatus = state => state.listings.refineStatus

export const getPickerActive = state => state.listings.pickerActive

export const getRefineListType = state => state.listings.refineListType

export const getRefineList = state => state.listings.refineList

export const getSavedCar = state => state.listings.savedCar

export const getSavedCoupon = state => state.listings.savedCoupon

export const getExistingAds = state => state.listings.existingAds.asMutable()


/* My Listing Selectors */
export const getMyListing = state => state.listings.myListings.asMutable();

export const getMyListingLoading = state => state.listings.myListingloading

export const getMyListingLength = state => state.listings.myListings ? state.listings.myListings.length : 0

export const getMyFetching = state => state.listings.myFetching

export const getMyRefreshing = state => state.listings.myRefreshing


export const isLoading = createSelector(
    getFetching,
    getLoading,
    (fetching, loading) => fetching || loading
)

export const canLoadMoreListing = createSelector(
    getFetching,
    getLoading,
    getCurrentListLength,
    getNoMoreListings,
    (fetching, loading, listLength, noMoreListings) => ! fetching && ! loading && listLength > 5 && ! noMoreListings
)
