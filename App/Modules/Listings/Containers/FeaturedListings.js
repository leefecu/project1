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
import Orientation from 'react-native-orientation'

import { ApplicationStyles, Colors, Images, Metrics } from '../../../Themes/'

import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import * as CoreHelpers from '../../Core/Helpers'
import * as CoreSelectors from '../../Core/Selectors'
import ListingsActions from '../Actions'
import * as ListingsSelectors from '../../Listings/Selectors'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'

import HOCRootContainer from '../../Core/Containers/HOCRootContainer'

import ToolBar from '../Components/ToolBar'
import Listings from '../Components/Listings'
import NoticeModal from '../../Core/Components/NoticeModal'
import SimpleAlert from '../../Core/Components/SimpleAlert'

//Styles
import Styles from './Styles/FeaturedListings'

class FeaturedListings extends PureComponent {

    constructor (props) {
        super(props)

        this.loadMoreListings = this.loadMoreListings.bind(this)
        this.refreshListings = this.refreshListings.bind(this)
        this._onClickUserLogin = this._onClickUserLogin.bind(this)
        this.viewADListing = this.viewADListing.bind(this)

        this.props.navigator.setStyle({
            navBarCustomView: 'carmate.NavBar',
            navBarComponentAlignment: 'center',
            navBarHeight: Metrics.navBarHeight-10,
            navBarTopPadding: 24,
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator,
                type: 'cars'
            }
        })
    }
    
    componentWillMount () {
        const self = this
        Orientation.lockToPortrait()
        // if redux persist is not active fire startup action
        this.props.systemCheck()
        this.props.startup()

    }

    _closeNoticeModal () {
        this.props.setListingLoginModalVisible(false)
        this.props.showSimpleAlert('Item was not saved')
    }

    _onClickUserLogin() {
        const {
            setAfterLoginAction,
            postLoginAction
        } = this.props

        let listingId = postLoginAction.id

        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_SAVE_LOGIN, {
            listingId
        })

        setAfterLoginAction({action: 'addToMyListing', listingId: postLoginAction.id})
        
        this.props.navigator.showModal({
            screen: 'carmate.Login',
            animationType: 'slide-up',
            backButtonHidden: true
        })
    }

    setListingListView (listView) {
        if (listView !== undefined) {
            this.listingListView = listView
        }
    }

    refreshListings () {
        const {
            listingLength,
            searchQuery,
            fetchListing,
            searchPanelParams,
            region,
            sortbyListing
        } = this.props

        fetchListing(true, 1, searchQuery, searchPanelParams, region, sortbyListing)
    }

    loadMoreListings () {
        const {
            canLoadMore,
            fetchListing,
            currentPage,
            searchQuery,
            searchPanelParams,
            region,
            sortbyListing
        } = this.props
        
        if (canLoadMore) {
            fetchListing(false, currentPage, searchQuery, searchPanelParams, region, sortbyListing)
        }
    }

    viewADListing (listing) {
        if(listing.linkUrl){
            const url = listing.linkUrl
            const title = listing.title ? listing.title : 'Carmate AD'

            if (Platform.OS === 'ios' && url.indexOf("http:") > -1) {
                CoreHelpers.handleClick(url)
            } else {
                this.props.viewAdLink(url, title)
            }

            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.AD_CLICK_FROM_LISTINGS, {
                title: title,
                url: listing.linkUrl
            })
        }
    }

    render() {
        const {
            list,
            initialLoading,
            loading,
            fetching,
            navigator,
            refreshing,
            viewType,
            noMoreListings,
            listingLength,
            listingsRegions,
            needLoginModalVisible,
            resetListingSearchOptions,
            setRefreshing,
            viewListingDetail,
            pageStatus,
            sortby
        } = this.props

        return (
            <View testID='featuredListingsContainer' ref='listings' style={[ApplicationStyles.layout.fullBackground]}>
                <View style={Styles.container}>
                    <View style={Styles.toolBarContainer}>
                        <ToolBar navigator={this.props.navigator}/>
                    </View>
                    <View style={Styles.contentsContainer}>
                        <Listings
                            topPage='listings'
                            navigator={navigator}
                            list={list}
                            initialLoading={initialLoading}
                            loading={loading}
                            fetching={fetching}
                            refreshing={refreshing}
                            viewType={viewType}
                            noMoreListings={noMoreListings}
                            listingLength={listingLength}
                            setListView={this.setListingListView} 
                            loadMoreListings={this.loadMoreListings}
                            listingsRegions={listingsRegions}
                            refreshListings={this.refreshListings}
                            resetListingSearchOptions={resetListingSearchOptions}
                            setRefreshing={setRefreshing}
                            viewListingDetail={viewListingDetail}
                            viewADListing={this.viewADListing}
                            featured={true}/>
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

FeaturedListings.defaultProps = {
    workDesc: {
        titleText: 'Please log in to save this item',
        descDetails: []
    }
}

const mapStateToProps = (state) => {
    return {
        initialLoading: ListingsSelectors.getInitialLoading(state),
        loading: ListingsSelectors.getLoading(state),
        fetching: ListingsSelectors.getFetching(state),
        refreshing: ListingsSelectors.getRefreshing(state),
        viewType: ListingsSelectors.getViewType(state),
        list: ListingsSelectors.getList(state),
        canLoadMore: ListingsSelectors.canLoadMoreListing(state),
        currentPage: ListingsSelectors.getCurrentPage(state),
        searchQuery: ListingsSelectors.getSearchQuery(state),
        searchPanelParams: ListingsSelectors.getSearchPanelParams(state),
        region: ListingsSelectors.getRegion(state),
        postLoginAction: ListingsSelectors.getPostLoginAction(state),
        needLoginModalVisible: ListingsSelectors.getNeedLoginModalVisible(state),
        simpleAlertVisible: CoreSelectors.getSimpleAlertVisible(state),
        simpleAlertMessage: CoreSelectors.getSimpleAlertMessage(state),
        noMoreListings: ListingsSelectors.getNoMoreListings(state),
        listingLength: ListingsSelectors.getCurrentListLength(state),
        listingsRegions: CoreSelectors.getListingRegions(state),
        pageStatus: CoreSelectors.getPageStatus(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startup: () => dispatch(CoreActions.searchOptionsRequest()),
        systemCheck: () => dispatch(CoreActions.systemCheckRequest()),
        showSimpleAlert: (message) => dispatch(CoreActions.showSimpleAlert(message)),

        fetchListing: (refresh, page, searchQuery, searchPanelParams, region, sortby) => dispatch(ListingsActions.listRequest(refresh, page, searchQuery, searchPanelParams, region, sortby)),
        resetListingSearchOptions: (searchQuery) => dispatch(ListingsActions.resetListingSearchOptions(searchQuery)),
        setRefreshing: (refreshing) => dispatch(ListingsActions.setListingsRefreshing(refreshing)),
        viewAdLink: (url, title) => dispatch(CoreActions.viewAdLink(url, title)),
        viewListingDetail: (listing, navigator, page) => dispatch(ListingsActions.viewListingDetail(listing, navigator, page)),
        setListingLoginModalVisible: (needLoginModalVisible) => dispatch(ListingsActions.setListingLoginModalVisible(needLoginModalVisible)),

        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOCRootContainer('listings')(FeaturedListings))