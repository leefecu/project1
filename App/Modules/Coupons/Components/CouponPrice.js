import React from 'react'
import { View, Image, Text } from 'react-native'

import * as CouponConstants from '../Constants'
import { numberWithCommas } from '../../Core/Helpers/number'

import { Images, Colors } from '../../../Themes'
import Styles from './Styles/CouponPrice'

const CouponPrice = ({coupon, page, containerStyle, exclusive, exclusivePriceStyle}) => {

    const renderNewPrice = () => {
        switch(coupon.type) {
        case CouponConstants.COUPON_TYPE_PRICE_DC:
        case CouponConstants.COUPON_TYPE_PRICE_OFF:
            return <Text style={[Styles.originalPrice, page === 'detail' && Styles.detailOriginalPrice]}>${numberWithCommas(coupon.price)}</Text>
            break

        case CouponConstants.COUPON_TYPE_PERCENTAGE_OFF:
            return <Text style={[Styles.originalPrice, page === 'detail' && Styles.detailOriginalPrice]}>{coupon.price}%</Text>
            break

        case CouponConstants.COUPON_TYPE_FREE:
            return <Text style={[Styles.originalPrice, page === 'detail' && Styles.detailOriginalPrice]}>FREE</Text>
            break

        default:
            return null
        }
    }

    const renderOffPriceArrow = () => {
        switch(coupon.type) {
        case CouponConstants.COUPON_TYPE_PRICE_DC:
            return (
                <View style={Styles.offPriceImageContainer}>
                    <Image source={Images.listSpecialPriceArrow} style={Styles.offPriceImage} resizeMode='contain'/>
                </View>
            )
            break

        default:
            return null
        }
    }

    const renderOffPrice = () => {
        switch(coupon.type) {
            case CouponConstants.COUPON_TYPE_PRICE_OFF:
            case CouponConstants.COUPON_TYPE_PERCENTAGE_OFF:
                return <Text style={[ Styles.offText, Styles.fixedOffPrice, page === 'detail' && Styles.detailOffText ]}>OFF</Text>
                break

            default:
                return null
        }
    }


    const renderOriginalPrice = () => {
        switch(coupon.type) {
        case CouponConstants.COUPON_TYPE_PRICE_DC:
            return (
                <View style={[ Styles.offPriceContainer ]}>
                    <Text style={[ Styles.offPrice, Styles.lineThrough, page === 'detail' && Styles.detailOffPrice]}>
                        ${numberWithCommas(coupon.originalPrice)}
                    </Text>
                </View>
            )
            break

        default:
            return null
        }
    }

    if(exclusive){
        
        return (
            <View style={[Styles.container, containerStyle && containerStyle, page === 'detail' && Styles.detailContainer]}>
                <Text style={[Styles.originalPrice, exclusivePriceStyle]}>FREE</Text>
            </View>
        )

    } else {

        return (
            <View style={[Styles.container, containerStyle && containerStyle, page === 'detail' && Styles.detailContainer]}>
                <View style={[Styles.priceContainer]}>
                    <View style={[Styles.priceInnerContainer]}>
                        {renderOriginalPrice()}
                        {renderOffPriceArrow()}
                    </View>
                </View>
                <View style={[Styles.priceContainer]}>
                    {renderNewPrice()}
                    {renderOffPrice()}
                </View>
            </View>
        )

    }
}

CouponPrice.defaultProps = {
    page: 'coupon'
}

export default CouponPrice
