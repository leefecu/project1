import React, { PureComponent } from 'react';
import { 
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    View, 
    Text, 
    Image, 
    Button,
    TouchableWithoutFeedback,
    TouchableHighlight,
    FlatList
} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { ApplicationStyles, Images, Metrics, Colors } from '../../../Themes'

import { diffListings, getListingProps } from '../Helpers'
import ListingsActions from '../Actions'
import * as ListingsConstants from '../Constants'
import * as ListingsSelectors from '../Selectors'
import * as CoreSelectors from '../../Core/Selectors'

import NoSearchResult from '../../Core/Components/NoSearchResult'
import Listing from '../Components/Listing'
import LoadingView from '../../Core/Components/LoadingView'

//Styles
import Styles from './Styles/Listings'

// Todo: create helper function
const { width, height } = Dimensions.get("window");
const listRowHeight = width <= 320 ? 103 : width <= 375 ? 113 : 123
const cardRowHeight = (width - (Metrics.basePadding * 2)) * 0.618 + 93

class Listings extends PureComponent {

    constructor (props) {
        super(props)
        this.onPressStatus = true

        this._rowRenderer = this._rowRenderer.bind(this)
        this._renderFooter = this._renderFooter.bind(this)
        this._onEndReached = this._onEndReached.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this._onPressClearSearchCriteria = this._onPressClearSearchCriteria.bind(this)
        this._pressListing = this._pressListing.bind(this)
        this._pressADListing = this._pressADListing.bind(this)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

    }

    onNavigatorEvent(event) {
        if(event.id === "willAppear"){
            this.onPressStatus = true
        }
    }

    _onEndReached () {

        const {
            noMoreListings, 
            list, 
            listingLength,
            fetching, 
            page
        } = this.props

        if (! noMoreListings && ! fetching && listingLength > 5) {
            this.props.loadMoreListings()
        }
    }

    _onPressClearSearchCriteria () {
        this.props.resetListingSearchOptions('')
    }

    _onRefresh () {
        this.props.setRefreshing(true)
        this.props.refreshListings()
    }

    _pressADListing (listing) {
        this.props.viewADListing(listing)
    }

    _pressListing (listing) {
        if(this.onPressStatus){
            this.onPressStatus = false
            this.props.viewListingDetail(listing, this.props.navigator, this.props.topPage)
        }
    }

    _renderListing() {

    }

    _renderFooter () {
        return (
            <View style={Styles.spinnerWrapper}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        )
        
    }

    _savedRowRenderer (listing, idx) {
        const props = getListingProps(listing)
        if (listing.status === ListingsConstants.STATUS_SOLD) {

            return (
                <View style={[Styles.itemContainer, Styles.listItemContainer]}>
                    <View style={Styles.soldItemContainer}>
                        <View style={Styles.soldItemCover}>
                            <Button
                                containerClass={Styles.removeButton}
                                textClass={Styles.removeText}
                                label='Remove Sold Item'
                                showIcon={false}
                                showImgIcon={true}
                                imgicon={Images.trashIcon}
                                underlayColor={'transparent'}
                                _onPress={() => this._pressRemoveItem(listing)}
                            />
                        </View>
                        <View key={idx} style={[Styles.row]}>
                            <Listing
                                type={this.props.viewType}
                                listingsRegions={this.props.listingsRegions}
                                {...props}
                            />
                        </View>
                    </View>
                </View>
            )

        } else {

            return (
                <TouchableHighlight onPress={() => this._pressListing(listing)}
                    key={idx}
                    style={[Styles.itemContainer, Styles.listItemContainer]}
                    underlayColor={Colors.snow}>
                    <View style={[Styles.row]}>
                        <Listing
                            type={this.props.viewType}
                            listingsRegions={this.props.listingsRegions}
                            {...props}
                        />
                    </View>
                </TouchableHighlight>
            )
        }
    }

    _rowRenderer (listing, idx) {
        const props = getListingProps(listing)
        let itemContainerStyle = Styles.listItemContainer

        if(this.props.viewType === 'card'){
            if(idx === 0){
                itemContainerStyle = Styles.topCardItemContainer    
            }else{
                itemContainerStyle = Styles.cardItemContainer    
            }
        }
        return (
            <TouchableWithoutFeedback
                key={listing._id}
                onPress={() => listing.advertising === true ? this._pressADListing(listing) : this._pressListing(listing)}
                underlayColor={Colors.snow} >
                <View style={[Styles.row, Styles.itemContainer, itemContainerStyle]} >
                    <Listing
                        type={this.props.viewType}
                        listingsRegions={this.props.listingsRegions}
                        {...props}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
        
    }

    render() {
        const {
            topPage,
            page,
            initialLoading,
            fetching,
            list,
            listingLength,
            viewType,
            refreshing,
            loading,
            listInnerContainerStyle
        } = this.props

        if(initialLoading || loading){
            return (
                <View ref='listings' style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}]}>
                    <LoadingView />
                </View>
            )
        }

        if(topPage === 'saved'){
            
            return (
                <View ref='listings' style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}]}>
                    <View ref={ref => this.listRoot = ref} style={[Styles.container, viewType === 'list' ? Styles.listContainer : Styles.cardContainer]}>
                        <List containerStyle={[Styles.listInnerContainer, listInnerContainerStyle && listInnerContainerStyle]}>
                            <FlatList
                                testID={'carList'}
                                ref={ref => this.props.setListView(ref)}
                                data={list}
                                keyExtractor={(item, index) => index.toString()}
                                refreshing={refreshing}
                                renderItem={({ item, index }) => this._savedRowRenderer(item, index)}
                            />
                        </List>
                    </View>
                </View>
            )
        }

        return (
            <View ref='listings' style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}]}>
                <View ref={ref => this.listRoot = ref} style={[Styles.container, viewType === 'list' ? Styles.listContainer : Styles.cardContainer]}>
                { ! fetching && listingLength === 0 ?
                    <View style={Styles.noDealContainer}>
                        <NoSearchResult
                            descText = 'No Cars Found'
                            descSubText = 'Retry with new search criteria.'
                            buttonStatus = {true}
                            buttonLabel = 'Clear Search Criteria'
                            icon = {Images.noSearchResult}
                            _onPress = {this._onPressClearSearchCriteria}/>
                    </View>
                :
                    <List containerStyle={[Styles.listInnerContainer, listInnerContainerStyle && listInnerContainerStyle]}>
                        <FlatList
                            ref={ref => this.props.setListView(ref)}
                            data={list}
                            keyExtractor={(item, index) => index.toString()}
                            initialNumToRender={15}
                            onEndReachedThreshold={0.5}
                            onEndReached={(info) => {
                                if(info.distanceFromEnd >= -10){
                                    this._onEndReached()    
                                }
                            }}
                            refreshing={refreshing}
                            onRefresh={() => this._onRefresh()}
                            renderItem={({ item, index }) => this._rowRenderer(item, index)}
                            ListFooterComponent={fetching && listingLength > 0 && this._renderFooter}
                        />
                    </List>
                }
                </View>
            </View>
        )
    }
};

Listings.defaultProps = {
    page: 'featured'
}


export default Listings