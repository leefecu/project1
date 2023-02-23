// @flow

import React, { PureComponent } from 'react'
import {
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { noop } from 'lodash'
import { ApplicationStyles, Images } from '../../../Themes'

import CouponsActions from '../../Coupons/Actions'
import * as CouponSelectors from '../../Coupons/Selectors'
import * as UserSelectors from '../../User/Selectors'

import CouponList from '../../Coupons/Components/CouponList'
import NoItems from '../../Core/Components/NoItems'

//Styles
import Styles from './Styles/SavedCoupons'

class SavedCoupons extends PureComponent {

    constructor (props) {
        super(props)
        this.refreshCoupons = this.refreshCoupons.bind(this)
    }


    componentDidMount () {
        this.props.fetchMyCoupons()
    }

    componentWillUpdate (newProps, nextState) {
        if (newProps.loggedIn && newProps.loggedIn !== this.props.loggedIn) {
            this.props.fetchMyCoupons()
        }
    }

    setListView (ref) {
        this.listView = ref
    }

    refreshCoupons () {
        this.props.fetchMyCoupons()
    }

    render () {

        const {
            navigator,
            myCoupons,
            myCouponLength,
            fetching,
            loading,
            isLoading
        } = this.props
        return (
            <View ref='listings' style={[ApplicationStyles.layout.fullBackground, Styles.container]}>
                {this.props.myCouponLength > 0 ?
                    <View style={Styles.contentsContainer}>
                        <CouponList
                            setListView={(ref) => this.setListView(ref)}
                            navigator={navigator}
                            refreshing={false}
                            page={'saved'}
                            coupons={myCoupons}
                            couponsLength = {myCouponLength}
                            fetching = {fetching}
                            loading = {loading}
                            isLoading = {isLoading}
                            listInnerContainerStyle = {Styles.listInnerContainer}
                            viewCouponDetail={this.props.viewCouponDetail}
                            viewExclusiveCouponDetail={this.props.viewExclusiveCouponDetail}/>
                    </View>
                :
                    <NoItems
                        type='coupons'
                        imgSource={Images.noSavedCouponBg}
                        imgStyle={Styles.noItemImgStyle}
                        imgSizeStyle={Styles.noItemImgSize} 
                        descText='No Coupons Saved'
                        descTextStyle={Styles.descTextStyle}
                        descContainerStyle={Styles.descContainer}
                        descSubText='Get discounts on automotive services!'
                        descSubTextStyle={Styles.descSubTextStyle}
                        buttonLabel='Browse Coupons'
                        buttonContainerStyle= {Styles.buttonContainer}
                        _onPress= {this.props.onPressNoItem}
                    />
                }
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loggedIn: UserSelectors.getLoggedIn(state),
        myCoupons: CouponSelectors.getMyCoupons(state),
        myCouponLength: CouponSelectors.getMyCouponLength(state),
        fetching: CouponSelectors.getMyFetching(state),
        loading: CouponSelectors.getMyCouponLoading(state),
        isLoading: CouponSelectors.isMyLoading(state),
        refreshing: CouponSelectors.getRefreshing(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyCoupons: () => dispatch(CouponsActions.myCouponsRequest()),
        viewAdLink: (url, title) => dispatch(CoreActions.viewAdLink(url, title)),
        viewCouponDetail: (couponId, navigator, page) => dispatch(CouponsActions.couponRequest(couponId, navigator, page)),
        viewExclusiveCouponDetail: (couponId, navigator) => dispatch(CouponsActions.userExclusiveCouponRequest(couponId, navigator)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedCoupons)
