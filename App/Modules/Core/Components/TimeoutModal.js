import React, {PureComponent} from 'react'
import ReactNative, {
    Image,
    Platform,
    Modal,
    NetInfo,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { noop } from 'lodash'
import { Colors, Images, Layout, Metrics } from '../../../Themes'

import CoreActions from '../Actions'
import * as CoreSelectors from '../../Core/Selectors'
import CouponActions from '../../Coupons/Actions'
import * as  CouponSelectors from '../../Coupons/Selectors'
import ListingsActions from '../../Listings/Actions'
import * as ListingsSelectors from '../../Listings/Selectors'

//Helpers
import { handleClick, requireUpdate, versionSplit } from '../Helpers'

import Button from './Button'
import Package from '../../../../package.json'

//Styles
import Styles from './Styles/TimeoutModal'

class TimeoutModal extends PureComponent {

    static navigatorStyle = {
        drawUnderNavBar: Platform.OS === 'ios',
        navBarBackgroundColor: Colors.brandColor,
        navBarTextColor: Colors.snow,
        navBarNoBorder: true
    };


    retry () {
        const {
            offline,
            timeoutAction,
            couponCurrentPage,
            couponSearchQuery,
            couponCategory,
            couponRegion,
            couponSortby,
            listingRefresh, 
            listingCurrentPage,
            listingSearchQuery, 
            listingSearchPanelParams, 
            listingRegion, 
            listingSortby,
            setOffline,
            _setTimeout,
            systemCheck,
            searchOption,
            fetchListings,
            fetchCoupons,
            fetchMyCoupons,
            fetchMyListings,
            fetchListing,
        } = this.props

        if (timeoutAction === 'systemcheck') {
            _setTimeout(false, null)
            systemCheck()
            searchOption()
        } else if (timeoutAction === 'fetchListing') {
            _setTimeout(false, null)
            fetchListings(listingRefresh, listingCurrentPage, listingSearchQuery, listingSearchPanelParams, listingRegion, listingSortby)
        } else if (timeoutAction === 'fetchCoupons') {
            _setTimeout(false, null)
            fetchCoupons(true, couponCurrentPage, couponSearchQuery, couponCategory, couponRegion, couponSortby)
        } else if (timeoutAction === 'fetchMyCoupons') {
            _setTimeout(false, null)
            fetchMyCoupons()
        } else if (timeoutAction === 'fetchMyListings') {
            _setTimeout(false, null)
            fetchMyListings()
        } else if (offline) {
            NetInfo.fetch().done((isConnected) => {
                if (typeof isConnected === 'string') {
                    isConnected = isConnected !== 'none'
                }

                setOffline(! isConnected)
            })
        }
    }

    render () {
        const {timeout} = this.props
        return (
            <View style={[Styles.applicationView]}>
                <View style={Styles.container}>
                    <View style={Styles.imageContainer}>
                        {timeout ? 
                            <Image style={Styles.imgSize} source={Images.unstableNetworkMain}  resizeMode='contain'/>
                        : 
                            <Image style={Styles.imgSize} source={Images.offlineMain} resizeMode='contain'/>
                        }
                    </View>

                    <View style={Styles.textContainer}>
                        <Text style={Styles.title}>{timeout ? 'Unstable Network' : 'You\'re currently offline'}!</Text>
                        <Text style={Styles.subTitle}>
                        {
                            timeout ?
                            'Looks like your network is unstable. Please try again.'
                            :
                            'Please check your connection.'
                        }
                        </Text>
                    </View>


                    <View style={[Layout.horizontalRow, Styles.buttonContainer]}>

                            <Button
                                containerClass={Styles.showButton}
                                textClass={Styles.showText}
                                label='Try Again'
                                showIcon={true}
                                icon={{
                                    name: 'repeat',
                                    size: 18,
                                    color: Colors.snow
                                }}
                                underlayColor={Colors.primaryPink}
                                _onPress={() => this.retry()}
                            />
                    </View>

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        offline: CoreSelectors.getOffline(state),
        timeout: CoreSelectors.getTimeout(state),
        timeoutAction: CoreSelectors.getTimeoutAction(state),
        couponCurrentPage: CouponSelectors.getCurrentPage(state),
        couponSearchQuery: CouponSelectors.getSearchQuery(state),
        couponCategory: CouponSelectors.getCategory(state),
        couponRegion: CouponSelectors.getRegion(state),
        couponSortby: CouponSelectors.getSortby(state),
        listingRefresh: ListingsSelectors.getRefreshing(state), 
        listingCurrentPage: ListingsSelectors.getCurrentPage(state),
        listingSearchQuery: ListingsSelectors.getSearchQuery(state), 
        listingSearchPanelParams: ListingsSelectors.getSearchPanelParams(state), 
        listingRegion: ListingsSelectors.getRegion(state), 
        listingSortby: ListingsSelectors.getSortby(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOffline: (offline) => dispatch(CoreActions.setOffline(offline)),
        _setTimeout: (timeout, timeoutAction) => dispatch(CoreActions.setTimeout(timeout, timeoutAction)),
        systemCheck: () => dispatch(CoreActions.systemCheckRequest()),
        searchOption: () => dispatch(CoreActions.searchOptionsRequest()),
        fetchListings: (refresh, page, searchQuery, searchPanelParams, region, sortby) => dispatch(ListingsActions.listRequest(refresh, page, searchQuery, searchPanelParams, region, sortby)),
        fetchCoupons: (refresh, page, searchQuery, category, region, sortby) => dispatch(CouponActions.couponsRequest(refresh, page, searchQuery, category, region, sortby)),
        fetchMyCoupons: () => dispatch(CouponActions.myCouponsRequest()),
        fetchMyListings: () => dispatch(ListingsActions.myListingsRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeoutModal)
