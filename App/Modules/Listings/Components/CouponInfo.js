// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { Images, Metrics } from '../../../Themes'

import CouponActions from '../../Coupons/Actions'
import * as CouponConstants from '../../Coupons/Constants'

import Button from '../../Core/Components/Button'
import DetailTitle from '../../Core/Components/DetailTitle'

//Styles
import Styles from './Styles/CouponInfo'

class CouponInfo extends PureComponent {

    constructor (props) {
        super(props)
    }

    _onClickExclusiveCoupon (coupon) {
        this.props.viewExclusiveCouponDetail(coupon.id, this.props.navigator)
    }

    _getCouponLabel = (label) => {
        switch (label){
            case 'FULLSERVICE':
                return CouponConstants.LABEL_FULL_SERVICE
            break
            case 'OIL':
                return CouponConstants.LABEL_OIL_SERVICE
            break
            case 'TINT':
                return CouponConstants.LABEL_TINT
            break
            case 'WOF':
                return CouponConstants.LABEL_WOF
            break
            case 'MECHWARRANTY':
                return CouponConstants.LABEL_MECHNICAL_WARRANTY
            break
        }
    }

    _renderLogoImg = (coupon) => {

        const {
            dealerShop
        } = this.props

        if (coupon.privateCoupon) {
            if (coupon.workshops && coupon.workshops[0].logo) {
                let logoImg = workshop.logo.replace('http:', 'https:')
                return <Image source={{uri: logoImg}} style={Styles.logoImg} resizeMode='contain' />
            } else {
                return <Text style={Styles.logoText} ellipsizeMode="tail" numberOfLines={2}>{dealerShop.name}</Text>
            }
        }

        return <Image source={Images.carmateExclusive} style={Styles.exclusiveLogoImg} resizeMode='contain'/>

    }

    _renderCouponsContent = (coupon, index) => {
        
        const {
            dealerShop
        } = this.props

        let couponDetail = 'Car Mate Partnered Shops'

        if (coupon.privateCoupon) {
            if (coupon.workshops) {
                couponDetail = coupon.workshops[0].name
            }
            else {
                couponDetail = dealerShop.name
            }
        }

        return (
            <View key={index} style={[Styles.contentsInnerContainer, Styles.couponInnerContainer, Styles.shadow]}>
                <View style={[Styles.imageContainer, Styles.couponImageContainer]}>
                    <View style={Styles.couponIconContainer}>
                        <Image source={Images[coupon.category.toLowerCase()]} style={[Styles.couponIconImg, coupon.category.toLowerCase() === 'wof' && {marginLeft: 13}]} resizeMode='contain'/>
                    </View>
                    <View style={Styles.logoImgContainer}>
                        {this._renderLogoImg(coupon)}
                    </View>
                </View>
                <View style={[Styles.contentDescContainer, Styles.couponContentContainer]}>
                    <View style={[Styles.contentDescInnerContainer]}>
                        <View style={Styles.contentHeader}>
                            <Text style={Styles.contentHeaderText} >{this._getCouponLabel(coupon.category)} X {coupon.count}</Text>
                        </View>
                        <View style={Styles.contentDetail}>
                            <Text style={[Styles.contentDetailText, Styles.greyBlueText]}>{couponDetail}</Text>
                        </View>
                    </View>
                    <View style={Styles.buttonContainer}>
                        <Button
                            containerClass={[Styles.showButton]}
                            textClass={Styles.showText}
                            label='View Details'
                            showIcon={false}
                            showImgIcon={false}
                            underlayColor='transparent'
                            _onPress={() => this._onClickExclusiveCoupon(coupon)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {
            coupons
        } = this.props

        return (
            <View style={[Styles.container]}>
                <View style={[Styles.innerContainer]}>
                    <DetailTitle title='buy this car & get free coupon(s)' idx={0} />
                    <View style={Styles.couponContainer}>
                        {coupons.map((coupon, index) => this._renderCouponsContent(coupon, index))}
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewExclusiveCouponDetail: (couponId, navigator) => dispatch(CouponActions.exclusiveCouponRequest(couponId, navigator))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CouponInfo)
