// @flow

import React, { PureComponent } from 'react'
import {
    ActivityIndicator,
    TouchableWithoutFeedback,
    ListView,
    View,
    Image,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationStyles, Images, Colors } from '../../../Themes'

import CoreActions from '../../Core/Actions'
import ListingsActions from '../../Listings/Actions'
import ShowroomActions from '../../Showroom/Actions'
import { getListingProps } from '../../Listings/Helpers'
import * as ShowroomSelectors from '../Selectors'
import * as ListingsSelectors from '../../Listings/Selectors'
import * as CoreSelectors from '../../Core/Selectors'
import * as UserSelectors from '../../User/Selectors'

import Listings from '../../Listings/Components/Listings'
import NoticeModal from '../../Core/Components/NoticeModal'
import SimpleAlert from '../../Core/Components/SimpleAlert'
import LoadingView from '../../Core/Components/LoadingView'

//Styles
import Styles from './Styles/ShowroomListings'

class ShowroomListings extends PureComponent {
    
    constructor (props) {
        super(props)

        this.refreshListings = this.refreshListings.bind(this)
        this.loadMoreListings = this.loadMoreListings.bind(this)
    }

    setListingListView (listView) {
        if (listView !== undefined) {
            this.listingListView = listView
        }
    }

    setListView (ref) {
        this.listView = ref
    }

    refreshListings () {
        const {
            listingLength,
            searchQuery,
            fetchDealerListings,
            searchPanelParams,
            region,
            sortby
        } = this.props

        fetchDealerListings(true, 1, searchQuery, searchPanelParams, region, sortby)
    }

    loadMoreListings () {
        this.props.viewMoreShowroomListings()
    }

    render () {
         const {
            initialLoading,
            list,
            loading,
            fetching,
            refreshing,
            noMoreShowroomListings,
            listingLength,
            listingsRegions,
            navigator,
            needLoginModalVisible,
            viewShowroomListingDetail
        } = this.props

        if(initialLoading){
            return <LoadingView />
        }

        
        return (
            <View ref='listings' style={[ApplicationStyles.layout.fullBackground]}>
                <View style={Styles.container}>
                    <View style={[Styles.contentsContainer]}>
                        { listingLength > 0 &&
                            <Listings 
                                navigator={navigator}
                                list={list}
                                loading={loading}
                                initialLoading={initialLoading}
                                fetching={fetching}
                                refreshing={refreshing}
                                viewType={'list'}
                                noMoreListings={noMoreShowroomListings}
                                listingLength={listingLength}
                                setListView={this.setListingListView} 
                                loadMoreListings={this.loadMoreListings}
                                refreshListings={this.refreshListings}
                                listingsRegions={listingsRegions}
                                listInnerContainerStyle={Styles.showroomListInnerContainer}
                                viewListingDetail={viewShowroomListingDetail}
                                showroom={true}/>
                        }
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
                    onSecond={() => this.closeNoticeModal()}
                    onClick={() => this.clickUserLogin()}
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
}

const mapStateToProps = (state) => {
    return {
        initialLoading: ShowroomSelectors.getInitialLoading(state),
        fetching: ShowroomSelectors.getFetching(state),
        refreshing: ShowroomSelectors.getRefreshing(state),
        loading: ShowroomSelectors.getLoading(state),
        list: ShowroomSelectors.getDealerShopShowroomListing(state),
        listingLength: ShowroomSelectors.getDealerShopShowroomListingLength(state),
        noMoreShowroomListings: ShowroomSelectors.getNoMoreShowroomListings(state),
        loggedIn: UserSelectors.getLoggedIn(state),
        listingsRegions: CoreSelectors.getListingRegions(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetListingSearchOptions: (searchQuery) => dispatch(ListingsActions.resetListingSearchOptions(searchQuery)),
        setRefreshing: (refreshing) => dispatch(ListingsActions.setListingsRefreshing(refreshing)),
        changeCarDetailTab: (tab) => dispatch(CoreActions.changeCarDetailTab(tab)),
        fetchDealerListings: (id) => dispatch(ShowroomActions.dealerShopRequest(id)),
        viewShowroomListingDetail: (listing, navigator) => dispatch(ShowroomActions.viewShowroomListingDetail(listing, navigator)),
        viewMoreShowroomListings: () => dispatch(ShowroomActions.viewMoreShowroomListings()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowroomListings)
