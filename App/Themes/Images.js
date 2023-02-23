// @flow

// leave off /
const images = {
    logo: require('../Images/logo.png'),
    logoLogin: require('../Images/logo-login.png'),
    wideLogo: require('../Images/wideLogo.png'),
    clearLogo: require('../Images/top_logo.png'),
    ignite: require('../Images/ignite_logo.png'),
    tileBg: require('../Images/tile_bg.png'),
    background: require('../Images/BG.png'),
    carforsaleIcon: require('../Images/tabbar/listing.png'),
    carforsaleActiveIcon: require('../Images/tabbar/listingActive.png'),
    couponsIcon: require('../Images/tabbar/coupons.png'),
    couponsActiveIcon: require('../Images/tabbar/couponsActive.png'),
    nearMeIcon: require('../Images/tabbar/nearMe.png'),
    nearMeActiveIcon: require('../Images/tabbar/nearMeActive.png'),
    dropdownArrow: require('../Images/icons/drop-arrow.png'),
    dropdownSingleArrow: require('../Images/header/dropdown.png'),
    person: require('../Images/person.png'),
    squareLogo: require('../Images/square_logo.png'),
    directionIcon: require('../Images/icons/direction.png'),
    getDirectionIcon: require('../Images/icons/getDirection-icon.png'),
    callIcon: require('../Images/icons/call-shop-icon.png'),
    upgrade: require('../Images/update.png'),
    carmateExclusive: require('../Images/carmateExclusive.png'),
    checkedIcon: require('../Images/icons/checked-icon.png'),
    needToLogin: require('../Images/need-login.png'),
    loginForSaved: require('../Images/loginForSaved.png'),
    alertIcon: require('../Images/alert-icon.png'),
    authNameIcon: require('../Images/icons/login-name.png'),
    authEmailIcon: require('../Images/icons/login-email.png'),
    authPwIcon: require('../Images/icons/login-pw.png'),
    closeModal: require('../Images/icons/close-modal.png'),
    
    /* Favourite Icons */
    starBEmpty: require('../Images/icons/star-b-empty.png'),
    starWEmpty: require('../Images/icons/star-w-empty.png'),
    starFill: require('../Images/icons/star-fill.png'),
    
    /* Share Icons */
    shareIcon: require('../Images/icons/share-icon.png'),

    /* Header Images */
    featureSwitchBack: require('../Images/header/features-background.png'),
    featureSwitchCar: require('../Images/header/features-cars.png'),
    featureSwitchCoupon: require('../Images/header/features-coupons.png'),
    featureSwitchButtonBack: require('../Images/header/features-selected.png'),
    pageBackbuttonIcon: require('../Images/header/back-button.png'),
    delKeywordButton: require('../Images/header/del-value.png'),
    hamburgerMenuIcon: require('../Images/hamburgerMenu.png'),

    /* Search Icons */
    searchbarIcon: require('../Images/header/search-icon.png'),
    searchBarIconCars: require('../Images/header/car-search-grey-icon.png'),
    searchBarIconCoupons: require('../Images/header/coupon-search-grey-icon.png'),
    searchBarRegionIcon: require('../Images/header/region.png'),
    searchBarRegionActiveIcon: require('../Images/header/searchBarRegionActive.png'),
    searchRefineIcon: require('../Images/header/search-refine-icon.png'),
    wrenchIcon: require('../Images/header/search-category-icon.png'),

    /* Features label */
    listSpecialPriceArrow: require('../Images/icons/special-price-arrow.png'),
    labelSpecial: require('../Images/label/special-rectangle-label.png'),
    labelSale: require('../Images/label/sale-label.png'),
    labelExpired: require('../Images/label/expired-label.png'),
    labelUpcoming: require('../Images/label/upcoming-label.png'),
    labelValue: require('../Images/label/value-label.png'),
    labelAwesome: require('../Images/label/awesome-label.png'),
    labelFeatured: require('../Images/label/featured-label.png'),
    labelFreeCoupon: require('../Images/label/free-coupon-label.png'),
    listCouponIcon: require('../Images/icons/listings-bottom-icon.png'),
    listCouponLabelBack: require('../Images/labelBack.png'),
    labelFeaturedCard: require('../Images/label/featured-label-card.png'),
    labelUpcomingCard: require('../Images/label/upcoming-label-card.png'),
    labelValueCard: require('../Images/label/value-label-card.png'),

    /*Features - car icons*/
    carsCouponIcon: require('../Images/icons/cars-coupon-icon.png'),

    /* Features - coupon icons */
    tint: require('../Images/coupons/tint.png'),
    fullservice: require('../Images/coupons/fullservice.png'),
    mechwarranty: require('../Images/coupons/mechwarranty.png'),
    oil: require('../Images/coupons/oil.png'),
    wof: require('../Images/coupons/wof.png'),

    /* Left menu icons */
    leftMenuGuest: require('../Images/mobile-side-menu-icon/guest-icon.png'),
    leftMenuUserNameBack: require('../Images/mobile-side-menu-icon/username-back.png'),
    leftMenuCarsForSaleIcon: require('../Images/mobile-side-menu-icon/car-mob-inactive.png'),
    leftMenuCarsForSaleActiveIcon: require('../Images/mobile-side-menu-icon/car-mob-active.png'),
    leftMenuSellMyCarIcon: require('../Images/mobile-side-menu-icon/sell-mob-inactive.png'),
    leftMenuSellMyCarActiveIcon: require('../Images/mobile-side-menu-icon/sell-mob-active.png'),
    leftMenuCouponsIcon: require('../Images/mobile-side-menu-icon/coupon-mob-inactive.png'),
    leftMenuCouponsActiveIcon: require('../Images/mobile-side-menu-icon/coupon-mob-active.png'),
    leftMenuSavedListIcon: require('../Images/mobile-side-menu-icon/mylist-mob-inactive.png'),
    leftMenuSavedListActiveIcon: require('../Images/mobile-side-menu-icon/mylist-mob-active.png'),
    leftMenuMyPageIcon: require('../Images/mobile-side-menu-icon/myinfo-mob-inactive.png'),
    leftMenuMyPageActiveIcon: require('../Images/mobile-side-menu-icon/myinfo-mob-active.png'),
    leftMenuHowItWorksIcon: require('../Images/mobile-side-menu-icon/how-mob-inactive.png'),
    leftMenuHowItWorksActiveIcon: require('../Images/mobile-side-menu-icon/how-mob-active.png'),
    leftMenuSupportIcon: require('../Images/mobile-side-menu-icon/help-mob-inactive.png'),
    leftMenuSupportActiveIcon: require('../Images/mobile-side-menu-icon/help-mob-active.png'),
    leftMenuTncIcon: require('../Images/mobile-side-menu-icon/tnc-inactive.png'),
    leftMenuTncActiveIcon: require('../Images/mobile-side-menu-icon/tnc-active.png'),
    leftMenuPrivacyPolicyIcon: require('../Images/mobile-side-menu-icon/privacy-inactive.png'),
    leftMenuPrivacyPolicyActiveIcon: require('../Images/mobile-side-menu-icon/privacy-active.png'),
    backbuttonIcon: require('../Images/mobile-side-menu-icon/back-button-icon.png'),

    /* Refine icons */
    refineListViewIcon: require('../Images/mobile-side-menu-icon/listView-icon.png'),
    refineListViewActiveIcon: require('../Images/mobile-side-menu-icon/listView-active-icon.png'),
    refineCardViewIcon: require('../Images/mobile-side-menu-icon/cardView-icon.png'),
    refineCardViewActiveIcon: require('../Images/mobile-side-menu-icon/cardView-active-icon.png'),
    refineRightArrow: require('../Images/mobile-side-menu-icon/right-arrow.png'),
    refineRightArrowInactive: require('../Images/mobile-side-menu-icon/right-arrow-inactive.png'),
    refineDelValue: require('../Images/mobile-side-menu-icon/del-value.png'),
    refineViewTypeArrow: require('../Images/mobile-side-menu-icon/view-type-arrow.png'),

    /* Navigation(Bottom) icons */
    navCarsIcon: require('../Images/navi-icon/cars-active.png'),
    navCarsIconActive: require('../Images/navi-icon/cars-active.png'),
    navCouponsIcon: require('../Images/navi-icon/coupons.png'),
    navCouponsIconActive: require('../Images/navi-icon/coupons-active.png'),
    navSavedIcon: require('../Images/navi-icon/saved.png'),
    navSavedIconActive: require('../Images/navi-icon/saved-active.png'),
    navMoreIcon: require('../Images/navi-icon/more.png'),
    navMoreIconActive: require('../Images/navi-icon/more-active.png'),

    /* No result */
    noDeals: require('../Images/no-deals.png'),
    noImages: require('../Images/icons/no-image.png'),
    noImagesL: require('../Images/icons/no-image-L.png'),
    noSearchResult: require('../Images/no-search-result.png'),
    noDealBg: require('../Images/noDeal.png'),
    noSellmycar: require('../Images/sellmycar.png'),
    noSavedListingBg: require('../Images/no-car-listings.png'),
    noSavedCouponBg: require('../Images/no-coupons.png'),

    /* Car Details */
    fuelEconomyInfoImg: require('../Images/fuelEconomyInfo.png'),
    emailButtonIcon: require('../Images/icons/email-button.png'),
    callButtonIcon: require('../Images/icons/call-button.png'),
    lineBreak: require('../Images/tab-line-break.png'),
    viewCount: require('../Images/icons/view-count.png'),
    timeIcon: require('../Images/icons/time-icon.png'),
    shareBIcon: require('../Images/icons/share-b-icon.png'),
    showroomIcon: require('../Images/icons/showroom-icon.png'),

    /* Coupon Details */
    backArrowIcon: require('../Images/icons/back-arrow-button.png'),

    /* Showroom */
    showroomEmailIcon: require('../Images/icons/showroom-email-icon.png'),
    showroomPhoneIcon: require('../Images/icons/showroom-phone-icon.png'),
    showroomMapIcon: require('../Images/icons/showroom-map-icon.png'),
    showroomWebIcon: require('../Images/icons/web-icon.png'),

    /* Call Modal */
    callModalIcon: require('../Images/icons/call-modal-icon.png'),

    /* How it works */
    howitworksModal: require('../Images/howitworks/howitworksModal.png'),
    howitworksStep1: require('../Images/howitworks/howitworks_step1.png'),
    howitworksStep2: require('../Images/howitworks/howitworks_step2.png'),
    howitworksStep3: require('../Images/howitworks/howitworks_step3.png'),
    howtousecouponsButtonIcon: require('../Images/howitworks/howtousecoupon-button-icon.png'),

    /* Review */
    reviewEmpty: require('../Images/reviews/empty-review.png'),
    reviewFilled: require('../Images/reviews/filled-review.png'),
    noReview: require('../Images/reviews/noReview.png'),
    reviewButtonIcon: require('../Images/reviews/review-button-icon.png'),
    reviewNeedToLogin: require('../Images/reviews/review-needtologin.png'),
    reviewSuccess: require('../Images/reviews/success-review.png'),
    reviewCountIcon: require('../Images/reviews/review-count-icon.png'),
    reviewRatingIcon: require('../Images/reviews/review-rating-icon.png'),

    /* Sell My Car */
    sellMyCarIcon: require('../Images/tabbar/sell-tab.png'),
    sellMyCarActiveIcon: require('../Images/tabbar/sell-tab-active.png'),

    /* Cars I am selling */
    carsIamSellingTempIcon: require('../Images/carsiamselling-temp-notice.png'),

    /* My Page */
    myPageIcon: require('../Images/tabbar/mypage-tab.png'),
    myPageActiveIcon: require('../Images/tabbar/mypage-tab-active.png'),
    myCouponsIcon: require('../Images/tabbar/coupon-tab.png'),
    myCouponsActiveIcon: require('../Images/tabbar/coupon-tab-active.png'),
    trashIcon: require('../Images/icons/trash-icon.png'),
    facebookLoginIcon: require('../Images/icons/facebook-login-icon.png'),
    googleLoginIcon: require('../Images/icons/google-login-icon.png'),

    /* Supoort */
    supportMain: require('../Images/support.png'),

    /* Unstable Network */
    unstableNetworkMain: require('../Images/unstable-network.png'),
    offlineMain: require('../Images/offline.png'),

    /* Maintenance */
    maintenanceMain: require('../Images/Maintenance.png'),

    /* ForgotPassword */
    forgotPwMain: require('../Images/ForgotPassword.png'),

    /* Update */
    updateMain: require('../Images/app-update.png'),

    /* AD */
    adTest: require('../Images/adTest.png')
}

export default images
