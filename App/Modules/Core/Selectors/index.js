import { createSelector } from 'reselect'

import * as CouponSelectors from '../../Coupons/Selectors'
import * as ListingSelectors from '../../Listings/Selectors'

export const getAndroidUpgrade = state => state.core.android.upgrade

export const getIosUpgrade = state => state.core.ios.upgrade

export const getAndroidMinVersion = state => state.core.android && state.core.android.minimumVersion

export const getIosMinVersion = state => state.core.ios && state.core.ios.minimumVersion

export const getMaintenance = state => state.core.maintenance

export const getOffline = state => state.core.offline

export const getTimeoutAction = state => state.core.timeoutAction

export const getSupportModalVisible = state => state.core.supportModalVisible

export const getTimeout = state => state.core.timeout

export const getSimpleAlertVisible = state => state.core.simpleAlertVisible

export const getSimpleAlertMessage = state => state.core.simpleAlertMessage

export const getCategories = state => state.core.categories

export const getCouponCategories = state => state.core.categories

export const getCouponRegions = state => state.core.couponsRegions

export const getListingRegions = state => state.core.listingsRegions

export const getSavedTabStatus = state => state.core.pageStatus.savedTabStatus

export const getPageStatus = state => state.core.pageStatus.page

export const getMyPageTabStatus = state => state.core.pageStatus.mypageTabStatus

export const getFeaturesTabStatus = state => state.core.pageStatus.featuresTabStatus

export const getCarDetailTabStatus = state => state.core.pageStatus.carDetailTabStatus

export const getSearchInFocus = state => state.core.searchInFocus

export const getPartnerShops = state => state.core.partnerShops

export const getDropDownActive = state => state.core.dropDownActive

export const getSearchPanelOptions = state => state.core.searchPanelOptions

export const getIosUrl = state => state.core.ios && state.core.ios.url

export const getAndroidUrl = state => state.core.android && state.core.android.url

export const getLoading = createSelector(
    CouponSelectors.isLoading,
    ListingSelectors.isLoading,
    (couponLoading, listingLoading) => couponLoading || listingLoading
)