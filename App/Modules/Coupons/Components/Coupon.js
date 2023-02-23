// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { each } from 'lodash'
import { Images, Layout } from '../../../Themes'

import * as CoreHelpers from '../../Core/Helpers'
import * as CoreSelectors from '../../Core/Selectors'
import * as CouponHelpers from '../Helpers'
import * as CouponSelectors from '../Selectors'
import * as UserSelectors from '../../User/Selectors'

import CouponPrice from './CouponPrice'
import NewLabel from './NewLabel'
import FavouriteButton from '../Components/FavouriteButton'
import Button from '../../Core/Components/Button'

//Styles
import Styles from './Styles/Coupon'

const getImageSource = (coupon, page) => {
    const imageSource = CouponHelpers.getImageSource(coupon.images[0], page === 'featured' ? coupon._id : coupon._id._str, {height: 120, width: 120})
    return imageSource.replace('http://', 'https://')
}

const getSuburb = (workshops) => {

    let suburb = CoreHelpers.getSuburb(workshops[0].address)

    if (workshops.length > 1) {
        let restShopCount = workshops.length - 1
        suburb += ` + ${restShopCount}`
    }

    return suburb
}

class CouponImage extends PureComponent {

    renderImageLabel () {
         const {
            regions,
            coupon,
         } = this.props

        let renderLabel = false
        let featureLabelText
        let labelSize
        let featureLabelBgColor
        let featureLabelTextStyle

        if (coupon.featured > 0) {
            renderLabel = true
            featureLabelText = "AWESOME"
            labelSize = Styles.awesomeLabel
            featureLabelBgColor = Styles.awesomeLabelBg
        }

        if (CouponHelpers.isExpired(coupon)) {
            renderLabel = true
            featureLabelText = "EXPIRED"
            labelSize = Styles.expiredLabel
            featureLabelBgColor = Styles.expiredLabelBg
            featureLabelTextStyle = Styles.exporedLabelTextStyle
        }

        return renderLabel && (
            <View style={[Styles.featureLabel]}>
                <View style={[Styles.featureLabelBackgroundContainer, featureLabelBgColor]}>
                </View>
                <View style={[Styles.featureLabelTextContainer, featureLabelTextStyle]}>
                    <Text style={[Styles.featureLabelText, labelSize]}>{ featureLabelText }</Text>
                </View>
            </View>
        )
    }

    render () {
        const {
            coupon,
            page
        } = this.props

        const imageLabel = this.renderImageLabel()

        return (
        <View style={Styles.imageContainer}>
            {imageLabel}

            <Image
                source={Images.noImages}
                style={Styles.noImage}
                resizeMode={'contain'}
            />

            {coupon.images && coupon.images.length > 0 &&
            <Image
                key={(page === 'featured' ? coupon._id : coupon._id._str) + 'mainImage'}
                source={{uri: getImageSource(coupon, page)}}
                resizeMode='cover'
                style={[Styles.image, imageLabel && Styles.labelImage]}
            />
            }
            
        </View>
        )
    }
}

class Coupon extends PureComponent {

    constructor (props) {
        super(props)
    }

	render () {
         const {
            regions,
            coupon,
            page,
            soldItem
         } = this.props

		return (
            <View style={[Styles.container]}>

                <CouponImage coupon={coupon} regions={regions} page={page} />

                <View style={Styles.contentContainer}>
                    <View style={Styles.couponTitleShopInfoContainer}>
                        <View style={[Styles.horizontalRow, Styles.couponTitleContainer]}>
                            <View style={Styles.couponTitle}>
                                <Text ellipsizeMode="tail" style={Styles.name}>{coupon.name} {coupon.exclusive}</Text>
                            </View>
                            <View style={[Styles.savedIcon]}>
                                <FavouriteButton
                                    key={page === 'featured' ? coupon._id : coupon._id._str}
                                    curFeatures="coupons"
                                    favouriteIconContainerStyle={Styles.favouriteIconContainer}
                                    favouriteIconInnerContainer={Styles.favouriteIconInnerContainer}
                                    favouriteIconStyle={Styles.favouriteIcon}
                                    favouriteIcon={Images.starBEmpty}
                                    targetCouponId={page === 'featured' ? coupon._id : coupon._id._str}/>
                            </View>
                        </View>

                        <View style={[Styles.horizontalRow, Styles.shopNewRow]}>
                            <View style={[Layout.flex7, Styles.workshopName]}>
                                <Text style={Styles.workshopNameText} ellipsizeMode="tail" numberOfLines={1}>
                                	{coupon.workshops[0].name}
                                </Text>
                            </View>
                            <View style={[Styles.newLabelConatainer]}>
                                {coupon.isNew && <NewLabel />}
                            </View>
                        </View>
                    </View>

                    <View style={[Styles.couponDatailInfo]}>
                        <View style={[Layout.textLeftAlign, {flex: 5.5}]}>
                            <CouponPrice coupon={coupon} />
                        </View>
                        <View style={[Layout.textRightAlign, Layout.textBottomAlign, {flex: 4.5}]}>
                            <View style={[Styles.marginRow, {marginBottom: 0}]}>
                                <Text style={Styles.regionText} ellipsizeMode="tail" numberOfLines={1} >
                                	{getSuburb(coupon.workshops)}
                            	</Text>
                            </View>
                        </View>
                    </View>

                </View>

                {soldItem &&
                    <View style={[Styles.soldItemCover, {height: this.state._containerHeight}]}>
                        <View style={Styles.soldItemTextContainer}>
                            <Text style={Styles.soldItemText}>Sorry, this item is no longer available.</Text>
                        </View>
                        <Button
                            containerClass={Styles.removeButton}
                            textClass={Styles.removeText}
                            label='Remove Item'
                            showIcon={false}
                            showImgIcon={true}
                            imgicon={Images.trashIcon}
                            underlayColor={'transparent'}
                            _onPress={this.props._pressRemoveItem}
                        />
                    </View>
                }

            </View>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        regions: CoreSelectors.getCouponRegions(state)
    }
}

export default connect(mapStateToProps)(Coupon)