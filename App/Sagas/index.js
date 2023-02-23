import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */
import { UserTypes } from '../Modules/User/Actions'
import { CoreTypes } from '../Modules/Core/Actions'
import { CouponsTypes } from '../Modules/Coupons/Actions'
import { ListingsTypes } from '../Modules/Listings/Actions'
import { ShowroomTypes } from '../Modules/Showroom/Actions'
import { ReviewTypes } from '../Modules/Review/Actions'
import { NavigationTypes } from '../Modules/Navigation/Actions'

/* ------------- Sagas ------------- */

//import * as UserSaga from '../Modules/User/Sagas'
import * as CouponSaga from '../Modules/Coupons/Sagas'
import * as CoreSaga from '../Modules/Core/Sagas'
import * as ListingsSaga from '../Modules/Listings/Sagas'
import * as ShowroomSaga from '../Modules/Showroom/Sagas'
import * as UserSaga from '../Modules/User/Sagas'
import * as ReviewSaga from '../Modules/Review/Sagas'
import * as NavigationSaga from '../Modules/Navigation/Sagas'

export default function * root () {
    const api = DebugSettings.useFixtures ? FixtureAPI : API.create()

    yield [
        //Core
        takeLatest(CoreTypes.SEARCH_OPTIONS_REQUEST, CoreSaga.fetchSearchOptions, api),
        takeLatest(CoreTypes.SYSTEM_CHECK_REQUEST, CoreSaga.fetchSystemCheck, api),
        takeLatest(CoreTypes.SET_VIEW_TYPE, CoreSaga.setViewType),
        takeLatest(CoreTypes.VIEW_AD_LINK, CoreSaga.viewAdLink),
        takeLatest(CoreTypes.SHOW_SIMPLE_ALERT, CoreSaga.showSimpleAlert),

        //Coupons
        takeLatest(CouponsTypes.COUPONS_REQUEST, CouponSaga.fetchCoupons, api),
        takeLatest(CouponsTypes.COUPON_REQUEST, CouponSaga.fetchCoupon, api),
        takeLatest(CouponsTypes.MY_COUPONS_REQUEST, CouponSaga.fetchMyCoupons, api),
        takeLatest(CouponsTypes.EXCLUSIVE_COUPON_REQUEST, CouponSaga.fetchExclusiveCoupon, api),
        takeLatest(CouponsTypes.USER_EXCLUSIVE_COUPON_REQUEST, CouponSaga.fetchUserExclusiveCoupon, api),
        takeLatest(CouponsTypes.RESET_COUPON_SEARCH_OPTIONS, CouponSaga.resetCouponSearchOptions, api),
        takeLatest(CouponsTypes.SEARCH_COUPONS_BY_KEYWORDS, CouponSaga.fetchCouponsByKeywords, api),
        takeLatest(CouponsTypes.SEARCH_COUPONS_BY_CATEGORY, CouponSaga.fetchCouponsByCategory, api),
        takeLatest(CouponsTypes.SEARCH_COUPONS_BY_SORTBY, CouponSaga.fetchCouponsBySortby, api),
        takeLatest(CouponsTypes.SEARCH_COUPONS_BY_REGION, CouponSaga.fetchCouponsByRegion, api),
        takeLatest(CouponsTypes.OPEN_COUPON_IMAGE_GALLERY, CouponSaga.openCouponImageGallery, api),

        //Listings
        takeLatest(ListingsTypes.CAR_REQUEST, ListingsSaga.fetchCar, api),
        takeLatest(ListingsTypes.LIST_REQUEST, ListingsSaga.fetchListing, api),
        takeLatest(ListingsTypes.MY_LISTINGS_REQUEST, ListingsSaga.fetchMyListings, api),
        takeLatest(ListingsTypes.VIEW_LISTING_DETAIL, ListingsSaga.viewListingDetail, api),
        takeLatest(ListingsTypes.RESET_LISTING_SEARCH_OPTIONS, ListingsSaga.resetListingSearchOptions, api),
        takeLatest(ListingsTypes.OPEN_IMAGE_GALLERY, ListingsSaga.openImageGallery, api),
        takeLatest(ListingsTypes.SEARCH_LISTINGS_BY_KEYWORDS, ListingsSaga.fetchListingByKeywords, api),
        takeLatest(ListingsTypes.SEARCH_LISTINGS_BY_SORTBY, ListingsSaga.fetchListingBySortby, api),
        takeLatest(ListingsTypes.SEARCH_LISTINGS_BY_REGION, ListingsSaga.fetchListingByRegion, api),
        takeLatest(ListingsTypes.SEARCH_LISTINGS_BY_SEARCH_OPTIONS, ListingsSaga.fetchListingBySearchPanelParams, api),

        //Showroom
        takeLatest(ShowroomTypes.VIEW_SHOWROOM_LISTINGS, ShowroomSaga.viewShowroomListings, api),
        takeLatest(ShowroomTypes.DEALER_SHOP_REQUEST, ShowroomSaga.fetchDealerShop, api),
        takeLatest(ShowroomTypes.DEALER_SHOP_SHOWROOM_REQUEST, ShowroomSaga.fetchDealerShopShowroom, api),
        takeLatest(ShowroomTypes.VIEW_MORE_SHOWROOM_LISTINGS , ShowroomSaga.viewMoreShowroomListings, api),
        takeLatest(ShowroomTypes.VIEW_SHOWROOM_LISTING_DETAIL, ShowroomSaga.viewShowroomListingDetail, api),

        //User
        takeLatest(UserTypes.LOGIN_REQUEST, UserSaga.login, api),
        takeLatest(UserTypes.LOGOUT_REQUEST, UserSaga.logout, api),
        takeLatest(UserTypes.SNS_LOGIN_REQUEST, UserSaga.snsLogin, api),
        takeLatest(UserTypes.SIGNUP_REQUEST, UserSaga.signup, api),
        takeLatest(UserTypes.REMEMBER_REQUEST, UserSaga.rememberMe, api),
        takeLatest(UserTypes.ADD_TO_MY_COUPON_REQUEST, UserSaga.addCouponFavourite, api),
        takeLatest(UserTypes.ADD_TO_MY_LISTING_REQUEST, UserSaga.addListingFavourite, api),
        takeLatest(UserTypes.USE_COUPON_REQUEST, UserSaga.useCoupon, api),
        takeLatest(UserTypes.FORGOT_PASSWORD_REQUEST, UserSaga.forgotPassword, api),

        //Review
        takeLatest(ReviewTypes.REVIEWS_REQUEST, ReviewSaga.fetchReviews, api),
        takeLatest(ReviewTypes.SUBMIT_REVIEW_REQUEST, ReviewSaga.submitReviewRequest, api),

        //NavigationSaga
        takeLatest(NavigationTypes.PUSH_LOGIN_PAGE, NavigationSaga.pushLoginPage)
    ]    
}
