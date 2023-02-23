// @flow

import React, { PureComponent } from 'react'
import {
    Dimensions,
    Image,
    ListView,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment';
import { each } from 'lodash'
import { Images, Layout } from '../../../Themes'
import { getImageSource } from '../Helpers'

import CouponPrice from './CouponPrice'
import NewLabel from './NewLabel'
import FavouriteButton from '../Components/FavouriteButton'
import Button from '../../Core/Components/Button'

//Styles
import Styles from './Styles/Coupon'

const ExclusiveCoupon = ({coupon, categories, regionIs, loggedIn, sortby, userLocation, page, soldItem, _pressRemoveItem}) => {

	const _getImageSource = () =>{
	   let couponImage = coupon.category.toLowerCase();
	   return Images[couponImage];
	}

	const _getLogoImageSource = () =>{

		if(coupon.privateCoupon && coupon.workshops ){

            if(coupon.workshops[0].logo){
                const logoImg = coupon.workshops[0].logo.replace('http:', 'https:')
                return <Image style={Styles.workshopLogoImg} source={{uri: logoImg}} resizeMode='contain'/>
            } else {
                return <Text style={Styles.exclusiveCouponName}>{coupon.workshops[0].name}</Text>
            }

		}else{
            return <Image source={Images.carmateExclusive} style={Styles.exclusiveLogoImg} resizeMode='contain'/>
		}
	}

	return (

		<View style={[Styles.exclusiveContainer]}>

            <View style={[Styles.exclusiveImageContainer]}>
                <View style={[coupon.privateCoupon && coupon.workshops && Styles.exclusiveTopIconContainer]}>
                    <Image source={Images[coupon.category.toLowerCase()]} style={[Styles.exclusiveIconImg, coupon.category.toLowerCase() === 'wof' && {marginLeft: 13}]} resizeMode='contain'/>
                </View>
                <View style={Styles.logoImgContainer}>
                    {_getLogoImageSource()}
                </View>
            </View>

            <View style={Styles.contentContainer}>

                <View style={Styles.couponTitleShopInfoContainer}>
                    <View style={[Styles.horizontalRow, Styles.couponTitleContainer]}>
                        <View style={Styles.couponTitle}>
                            <Text ellipsizeMode="tail" numberOfLines={3} style={Styles.name}>{coupon.name} x {coupon.count}</Text>
                        </View>
                    </View>
                </View>

                <View style={[Styles.horizontalRow]}>
                    <View style={[Styles.workshopName]}>
                        <Text style={Styles.workshopNameText}>
                            {coupon.privateCoupon && coupon.workshops ? coupon.workshops[0].name : 'Car Mate Partnered Shops'}
                        </Text>
                        { coupon.isNew && <NewLabel /> }
                    </View>
                </View>

                <View style={[Styles.couponDatailInfo]}>
                    <View style={[Layout.flex4]}>
                        <CouponPrice coupon={coupon} exclusive={true}/>
                    </View>
                    <View style={[Layout.flex6, Layout.horizontalRow, Layout.textBottomAlign]}>
                        <View style={[Styles.marginRow, {marginBottom: 0}]}>
                            <Text style={[Styles.regionText]}>Until : {moment(coupon.expiredAt).format('DD/MM/YYYY')}</Text>
                        </View>
                    </View>
                </View>

            </View>

            {soldItem &&
                <View style={[Styles.soldItemCover]}>
                    <Button
                        containerClass={Styles.removeButton}
                        textClass={Styles.removeText}
                        label='Remove Item'
                        showIcon={false}
                        showImgIcon={true}
                        imgicon={Images.trashIcon}
                        underlayColor={'transparent'}
                        _onPress={_pressRemoveItem}
                    />
                </View>
            }

		</View>
	)
}


export default ExclusiveCoupon
