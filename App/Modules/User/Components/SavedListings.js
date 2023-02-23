// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    TouchableHighlight,
    ListView,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationStyles, Images, Colors } from '../../../Themes'

import CoreActions from '../../Core/Actions'
import * as CoreSelectors from '../../Core/Selectors'
import UserActions from '../../User/Actions'
import ListingsActions from '../../Listings/Actions'
import * as ListingsConstants from '../../Listings/Constants'
import { getListingProps } from '../../Listings/Helpers'
import * as ListingsSelectors from '../../Listings/Selectors'
import * as UserSelectors from '../../User/Selectors'

import LoadingView from '../../Core/Components/LoadingView'
import NoItems from '../../Core/Components/NoItems'
import Button from '../../Core/Components/Button'
import Listings from '../../Listings/Components/Listings'

//Styles
import Styles from './Styles/SavedListings'

class SavedListings extends PureComponent {

    constructor (props) {
        super(props)
    }

    refreshListings () {
        const {
            fetchMyListings,
            userState
        } = this.props

        fetchMyListings()
    }

    _onEndReached () {

        const {noMoreListings, list, fetching, page} = this.props
        if (page === 'featured' && ! noMoreListings && ! fetching && list.length > 5) {
            this.props.loadMoreListings()
        }
    }

    setListingListView (listView) {
        if (listView !== undefined) {
            this.listingListView = listView
        }
    }

    _pressListing (listing) {
        const {userState, page} = this.props
        this.props.viewListingDetail(listing)
    }

    _pressRemoveItem = (listing) => {
        const {
            addToMyListing,
            userState
        } = this.props

        addToMyListing(listing._id)
    }

    _renderContents = () => {
        const {
            navigator,
            listings,
            refreshing,
            myListingLoading,
            myListingLength,
            viewListingDetail,
            listingsRegions
        } = this.props

        if(listings.length > 0){

            return (
                <View style={[Styles.contentsContainer]}>
                    <Listings
                        topPage='saved'
                        navigator={navigator}
                        list={listings}
                        loading={myListingLoading}
                        refreshing={refreshing}
                        viewType='list'
                        listingLength={myListingLength}
                        listingsRegions={listingsRegions}
                        setListView={this.setListingListView}
                        refreshListings={this.refreshListings}
                        viewListingDetail={viewListingDetail}
                        featured={true}/>
                </View>
            )

        } else {
            return (

                <NoItems
                    type='cars'
                    noItemContainerStyle = {Styles.noItemContainerStyle}
                    imgSource={Images.noSavedListingBg}
                    imgStyle={Styles.noItemImgStyle}
                    imgSizeStyle={Styles.noItemImgSize}
                    descText='No Cars Saved'
                    descTextStyle={Styles.descTextStyle}
                    descContainerStyle={Styles.descContainer}
                    descSubText='Market cheapest cars exclusively on Car Mate!'
                    descSubTextStyle={Styles.descSubTextStyle}
                    buttonLabel='Browse Cars'
                    buttonContainerStyle= {Styles.buttonContainer}
                    _onPress= {this.props.onPressNoItem}
                />
            )
        }
    }


    render () {
        return (

            <View ref='listings' style={[ApplicationStyles.layout.fullBackground, Styles.container]}>
                {this.props.myListingLoading ?
                    <LoadingView />
                :
                    this._renderContents()
                }
            </View>

        )

    }

}

const mapStateToProps = (state) => {
    return {
        listings: ListingsSelectors.getMyListing(state),
        refreshing: ListingsSelectors.getMyRefreshing(state),
        myListingLoading: ListingsSelectors.getMyListingLoading(state),
        myListingLength: ListingsSelectors.getMyListingLength(state),
        myFetching: ListingsSelectors.getMyFetching(state),
        refine: ListingsSelectors.getRefine(state),
        loggedIn: UserSelectors.getLoggedIn(state),
        listingsRegions: CoreSelectors.getListingRegions(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToMyListing: (listingId) => dispatch(UserActions.addToMyListingRequest(listingId)),
        changeCarDetailTab: (tab) => dispatch(CoreActions.changeCarDetailTab(tab)),
        viewListingDetail: (listing, navigator, page) => dispatch(ListingsActions.viewListingDetail(listing, navigator, page)),
        fetchMyListings: () => dispatch(ListingsActions.myListingsRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedListings)
