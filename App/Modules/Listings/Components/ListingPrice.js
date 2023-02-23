// @flow

import React, { PureComponent } from 'react'
import {
    Dimensions,
    Image,
    View,
    Text,
} from 'react-native'

import { Images } from '../../../Themes'

import { numberWithCommas } from '../../Core/Helpers/number'
import * as Constants from '../../Core/Constants'

//Styles
import Styles from './Styles/Price'

class ListingPrice extends PureComponent {

    render () {
        const {
            hasCoupon,
            originalPrice,
            planScore,
            price,
            arrowImgStyle,
            arrowImgContainerStyle,
            originalPriceStyle,
            specialPriceTextStyle,
            specialOriginalPriceTextStyle,
            couponIconStyle,
            type
        } = this.props
        
        return (
        <View style={[Styles.Container]}>
            { planScore < 1000 ?
                <View style={[Styles.originalSpecialPrice]}>
                    <View style={[Styles.originalPrice]}>
                        <Text style={[Styles.originalPriceText, originalPriceStyle && originalPriceStyle]}>
                            ${numberWithCommas(price)}
                        </Text>
                        {hasCoupon &&  
                            <Image source={Images.carsCouponIcon} style={[Styles.couponIcon, couponIconStyle]} resizeMode='contain'/>
                        }
                    </View>
                </View>
            :
                <View style={[Styles.originalSpecialPrice]}>
                    <View style={[Styles.specialPrice]}>
                        <Text style={[Styles.specialOriginalPriceText, Styles.lineThrough, specialPriceTextStyle && specialPriceTextStyle]}>
                            ${numberWithCommas(originalPrice)}
                        </Text>
                        <View style={[Styles.arrowImgContainer, arrowImgContainerStyle]}>
                            <Image style={[Styles.arrowImg, arrowImgStyle]} source={Images.listSpecialPriceArrow} resizeMode='contain'/>
                        </View>
                    </View>
                    <View style={[Styles.originalPrice]}>
                        <Text style={[Styles.originalPriceText, Styles.specialPriceText, specialOriginalPriceTextStyle && specialOriginalPriceTextStyle]}>
                            ${numberWithCommas(price)}
                        </Text>
                        {hasCoupon &&
                            <Image source={Images.carsCouponIcon} style={[Styles.couponIcon, couponIconStyle]} resizeMode='contain'/>
                        }
                    </View>
                </View>
            }
            {/*type === 'list' && planScore < 1000 &&
                <View style={[Styles.pricePW]}>
                    <Text style={[Styles.pricePwText]}>$153.19 p/w</Text>
                </View>
            */}
        </View>
        )
    }
}

export default ListingPrice
