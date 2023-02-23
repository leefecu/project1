// @flow

import React, { PureComponent } from 'react'
import {
    Platform,
    ActivityIndicator,
    RefreshControl,
    Image,
    View,
    Text,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native'
import { List } from 'react-native-elements'
import { ApplicationStyles, Images, Layout } from '../../../Themes'

import CouponsActions from '../Actions'

import NoSearchResult from '../../Core/Components/NoSearchResult'
import Coupon from './Coupon'
import ExclusiveCoupon from './ExclusiveCoupon'
import Button from '../../Core/Components/Button'
import LoadingView from '../../Core/Components/LoadingView'
import ADListing from './ADListing'

//Styles
import Styles from './Styles/CouponList'

class CouponList extends PureComponent {

    constructor( props ) {
        super(props)
        this.onPressStatus = true

        this._onEndReached = this._onEndReached.bind(this)
        this._pressExclusiveCoupon = this._pressExclusiveCoupon.bind(this)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }

    onNavigatorEvent(event) {
        if(event.id === "willAppear"){
            this.onPressStatus = true
        }
    }


    _onEndReached () {
        const {
            noMoreCoupons, 
            coupons, 
            couponsLength,
            fetching, 
            page
        } = this.props

        if (page === 'featured' && ! noMoreCoupons && ! fetching && couponsLength > 5) {
            this.props.loadMoreCoupons()
        }
    }

    _pressExclusiveCoupon (coupon) {
        const {page} = this.props

        this.props.viewExclusiveCouponDetail(page === 'featured' ? coupon._id : coupon._id._str, this.props.navigator)
    }

    _pressCoupon (coupon) {
        const {page} = this.props
        if(this.onPressStatus){
            this.onPressStatus = false
            this.props.viewCouponDetail(page === 'featured' ? coupon._id : coupon._id._str, this.props.navigator, this.props.page)
        }        
    }

    _renderSavedCoupon (coupon, idx) {
        if(coupon.exclusive){

            return (
                <TouchableWithoutFeedback onPress={() => this._pressExclusiveCoupon(coupon)}>
                <View style={[Styles.row, Platform.OS === 'ios' && Styles.shadow]}>
                    <ExclusiveCoupon
                        key={coupon.mongo_id}
                        coupon={coupon}
                        page={this.props.page}
                    />
                </View>
                </TouchableWithoutFeedback>
            )

        } else {

            return (
                <TouchableWithoutFeedback onPress={() => this._pressCoupon(coupon)}>
                    <View style={[Styles.row, Platform.OS === 'ios' && Styles.shadow]}>
                        <Coupon
                            key={coupon.mongo_id}
                            coupon={coupon}
                            page={this.props.page}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )

        }
    }

    _renderCoupon (coupon, idx) {
        if(coupon.advertising === true){
            return(
                <TouchableWithoutFeedback onPress={() => { this.props.viewADListing(coupon.linkUrl, coupon.title); }}>
                    <View style={[Styles.adRow, Platform.OS === 'ios' && Styles.shadow]}>
                        <ADListing advertising={coupon}/>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={() => this._pressCoupon(coupon)}>
                <View style={[Styles.row, Platform.OS === 'ios' && Styles.shadow]}>
                    <Coupon
                        key={coupon.mongo_id}
                        coupon={coupon}
                        page={this.props.page}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderCouponList() {

    }

    _renderFooter () {
        return (
            <View style={Styles.spinnerWrapper}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        )
        
    }

    render() {
        const {
            coupons,
            couponsLength,
            loading,
            isLoading,
            fetching,
            initialLoading,
            refreshing,
            canLoadMoreCoupons,
            noMoreCoupons,
            page,
            listInnerContainerStyle
        } = this.props

        if(initialLoading || loading){
            return(
                <View ref="featured" style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}]}>
                    <LoadingView />
                </View>
            )
        }

        return(
            <View ref={ref => this.listRoot = ref} style={[Styles.container, page === 'saved' && Styles.myCouponsContainer]}>
                {! fetching && couponsLength === 0 ?
                    <NoSearchResult
                        descText = 'No Coupons Found'
                        descSubText = 'Retry with new search criteria.'
                        buttonStatus = {true}
                        buttonLabel = 'Clear Search Criteria'
                        icon = {Images.noSearchResult}
                        _onPress = {this.props._onPressClearSearchCriteria}/>
                :        
                    <List containerStyle={[Styles.listInnerContainer, listInnerContainerStyle && listInnerContainerStyle]}>
                        <FlatList
                            ref={ref => this.props.setListView(ref)}
                            testID={'couponList'}
                            data={coupons}
                            keyExtractor={(item, index) => index.toString()}
                            initialNumToRender={15}
                            onEndReachedThreshold={1}
                            onEndReached={(info) => {
                                if(info.distanceFromEnd >= -10){
                                    this._onEndReached()   
                                }
                            }}
                            refreshing={refreshing}
                            onRefresh={ page !== 'saved' && this.props._onRefresh}
                            renderItem={({ item, index }) => 
                                            page === 'saved' ? this._renderSavedCoupon(item, index) 
                                            : this._renderCoupon(item, index)}
                            ListFooterComponent={page !== 'saved' && fetching && this._renderFooter}
                        />
                    </List>
                }
            </View>  
        )

    }
}

export default CouponList
