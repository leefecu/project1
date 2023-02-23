import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    Image, 
    Button,
    Platform 
} from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { ApplicationStyles, Images, Metrics } from '../../../Themes/'

import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import * as CoreHelpers from '../../Core/Helpers'
import * as CoreSelectors from '../../Core/Selectors'
import CouponsActions from '../Actions'
import * as CouponsSelectors from '../Selectors'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'

import HOCRootContainer from '../../Core/Containers/HOCRootContainer'

import ToolBar from '../Components/ToolBar'
import NoticeModal from '../../Core/Components/NoticeModal'
import SimpleAlert from '../../Core/Components/SimpleAlert'
import CouponList from '../Components/CouponList'

//Styles
import Styles from './Styles/FeaturedCoupons'

class FeaturedCoupons extends PureComponent {

    constructor (props) {
        super(props)

        this._onRefresh = this._onRefresh.bind(this)
        this.loadMoreCoupons = this.loadMoreCoupons.bind(this)
        this.refreshCoupons = this.refreshCoupons.bind(this)
        this._onPressClearSearchCriteria = this._onPressClearSearchCriteria.bind(this)
        this._onClickUserLogin = this._onClickUserLogin.bind(this)
        this._closeNoticeModal = this._closeNoticeModal.bind(this)
        this.viewADListing = this.viewADListing.bind(this)
        
        this.props.navigator.setStyle({
            navBarCustomView: 'carmate.NavBar',
            navBarComponentAlignment: 'center',
            navBarHeight: Metrics.navBarHeight-10,
            navBarTopPadding: 24,
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator,
                type: 'coupons'
            }
        })
    }

    _closeNoticeModal() {
        this.props.setCouponLoginModalVisible(false)
        this.props.showSimpleAlert('Item was not saved')
    }

    _onRefresh () {
        this.props.setCouponRefreshing(true)
        this.refreshCoupons()
    }

    _onPressClearSearchCriteria () {
        this.props.resetCouponSearchOptions('')
    }

    _onClickUserLogin () {

        const {
            setAfterLoginAction,
            postLoginAction
        } = this.props

        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.COUPON_LOGIN_FOR_SAVE, {
            couponId: postLoginAction.id
        })

        setAfterLoginAction({action: 'addToMyCoupon', couponId: postLoginAction.id})
        
        this.props.navigator.showModal({
            screen: 'carmate.Login',
            animationType: 'slide-up',
            backButtonHidden: true
        })
    }

    viewADListing (url, title) {
        
        if(url){
            
            if (Platform.OS === 'ios' && url.indexOf("http:") > -1) {
                CoreHelpers.handleClick(url)
            } else {
                this.props.viewAdLink(url, title)
            }


            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.AD_CLICK_FROM_COUPONS, {
                title,
                url
            })
        }
    }

    setCouponListView (listView) {
        if (listView !== undefined) {
            this.listingListView = listView
        }
    }

    refreshCoupons () {
        const {
            canLoadMoreCoupons,
            fetchCoupons,
            currentPage,
            searchQuery,
            category,
            region,
            sortby
        } = this.props

        fetchCoupons(true, 1, searchQuery, category, region, sortby)
    }

    loadMoreCoupons () {

        const {
            canLoadMoreCoupons,
            fetchCoupons,
            currentPage,
            searchQuery,
            category,
            region,
            sortby
        } = this.props

        if (canLoadMoreCoupons) {
            fetchCoupons(false, currentPage, searchQuery, category, region, sortby)
        }
    }


    render() {
        const {
        	coupons,
            loading,
            isLoading,
	        fetching,
	        initialLoading,
	        noMoreCoupons,
	        refreshing,
	        canLoadMoreCoupons,
	        category,
	        region,
	        sortby,
	        currentPage,
	        searchQuery,
	        needLoginModalVisible,
            navigator,
            viewCouponDetail,
            viewExclusiveCouponDetail
        } = this.props
        
        return (
            <View testID='FeaturedCouponsContainer' ref='featured' style={[ApplicationStyles.layout.fullBackground]}>
                <View style={Styles.container}>
                    <View style={Styles.toolBarContainer}>
                        <ToolBar/>
                    </View>
                    <View style={Styles.contentsContainer}>
                    	<CouponList 
                            navigator={navigator}
                            setListView={this.setCouponListView}
                    		coupons = {coupons}
                            couponsLength = {coupons.length}
                            loading = {loading}
                    		isLoading = {isLoading}
                    		initialLoading = {initialLoading}
                    		refreshing = {refreshing}
                    		fetching = {fetching}
                    		canLoadMoreCoupons = {canLoadMoreCoupons}
                    		noMoreCoupons = {noMoreCoupons}
                    		page = {'featured'}
                    		_onRefresh = {this._onRefresh}
                            _onPressClearSearchCriteria = {this._onPressClearSearchCriteria}
                            viewCouponDetail = {viewCouponDetail}
                            viewExclusiveCouponDetail = {viewExclusiveCouponDetail}
                            viewADListing = {this.viewADListing}
                            loadMoreCoupons = {this.loadMoreCoupons}
                    	/>
                    </View>
                </View>

                {needLoginModalVisible &&
	                <NoticeModal
	                    animationType='fade'
	                    modalVisible={needLoginModalVisible}
	                    titleTextStyle={Styles.titleText}
	                    descriptions={this.props.workDesc}
	                    descriptionsStyle={Styles.descriptionsText}
	                    subDesc="Sign up is super easy!"
	                    subDescStyle={Styles.subDescText}
	                    icon = {Images.needToLogin}
	                    iconStyle = {Styles.modalIcon}
	                    secondButton={true}
	                    buttonLabel="Log In"
	                    secondLabel="Cancel"
	                    onSecond={() => this._closeNoticeModal()}
	                    onClick={() => this._onClickUserLogin()}
	                />
                }

                <SimpleAlert
                    modalVisible={this.props.simpleAlertVisible}
                    alertStyles={Styles.alertContainer}
                    alertIcon={Images.alertIcon}
                    alertDesc={this.props.simpleAlertMessage}
                    iconImgStyle={Styles.iconImg}
                    descTextStyle={Styles.descText}
                />
            </View>

        )

    }
};

FeaturedCoupons.defaultProps = {
    workDesc: {
        titleText: 'Please log in to save this item',
        descDetails: []
    }
}

const mapStateToProps = (state) => {
    return {
        categories: CoreSelectors.getCouponCategories(state),
        regions: CoreSelectors.getCouponRegions(state),
    	coupons: CouponsSelectors.getCoupons(state),
        category: CouponsSelectors.getCategory(state),
        region: CouponsSelectors.getRegion(state),
        searchQuery: CouponsSelectors.getSearchQuery(state),
        sortby: CouponsSelectors.getSortby(state),
        loading: CouponsSelectors.getLoading(state),
        isLoading: CouponsSelectors.isLoading(state),
        fetching: CouponsSelectors.getFetching(state),
        initialLoading: CouponsSelectors.getInitialLoading(state),
        refreshing: CouponsSelectors.getRefreshing(state),
        canLoadMoreCoupons: CouponsSelectors.canLoadMoreCoupons(state),
        currentPage: CouponsSelectors.getCurrentPage(state),
        needLoginModalVisible: CouponsSelectors.getNeedLoginModalVisible(state),
        userLocation: UserSelectors.getUserLocation(state),
        postLoginAction: CouponsSelectors.getPostLoginAction(state),
        simpleAlertVisible: CoreSelectors.getSimpleAlertVisible(state),
        simpleAlertMessage: CoreSelectors.getSimpleAlertMessage(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToMyCoupon: (couponId) => dispatch(UserActions.addToMyCouponRequest(couponId)),
        closeDropdown: () => dispatch(CouponsActions.closeDropdown()),
        fetchCoupons: (refresh, page, searchQuery, category, region, sortby) => dispatch(CouponsActions.couponsRequest(refresh, page, searchQuery, category, region, sortby)),
        resetCouponSearchOptions: () => dispatch(CouponsActions.resetCouponSearchOptions()),
        searchByCategory: (searchQuery, category, region, sortby) => dispatch(CouponsActions.searchCouponsByCategory(searchQuery, category, region, sortby)),
        searchBySortby: (searchQuery, category, region, sortby) => dispatch(CouponsActions.searchCouponsBySortby(searchQuery, category, region, sortby)),
        searchByRegion: (region) => dispatch(CouponsActions.searchCouponsByRegion(region)),
        setCouponRefreshing: (refreshing) => dispatch(CouponsActions.setCouponRefreshing(refreshing)),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
        setCouponLoginModalVisible: (needLoginModalVisible) => dispatch(CouponsActions.setCouponLoginModalVisible(needLoginModalVisible)),
        showSimpleAlert: (message) => dispatch(CoreActions.showSimpleAlert(message)),
        viewAdLink: (url, title) => dispatch(CoreActions.viewAdLink(url, title)),
        viewCouponDetail: (couponId, navigator, page) => dispatch(CouponsActions.couponRequest(couponId, navigator, page)),
        viewExclusiveCouponDetail: (couponId, navigator) => dispatch(CouponsActions.userExclusiveCouponRequest(couponId, navigator)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOCRootContainer('coupons')(FeaturedCoupons))