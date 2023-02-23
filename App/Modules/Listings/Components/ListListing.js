// @flow

import React, { PureComponent } from 'react'
import {
    Platform,
    Dimensions,
    Image,
    ListView,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { map, each, filter } from 'lodash'
import classNames from 'classnames'

import { ApplicationStyles, Colors, Images, Metrics, Layout } from '../../../Themes'

import { LIST_TYPE_LIST } from '../Constants'
import { numberWithCommas } from '../../Core/Helpers/number'
import { titleCase } from '../../Core/Helpers/string'
import * as Constants from '../../Core/Constants'

import ListingPrice from './ListingPrice'
import FavouriteButton from '../Components/FavouriteButton'
import ListingImage from './ListingImage'

//Styles
import Styles from './Styles/ListListing'

var window = Dimensions.get('window')

class ListListing extends PureComponent {

    _renderSuburb (region) {
        return this.props.listingsRegions && this.props.listingsRegions[region[0]] &&
            this.props.listingsRegions[region[0]].label
    }

    render () {
        const {
            cardViewMainImage,
            exclusiveCoupons,
            fuelType,
            hasCoupon,
            listingId,
            images,
            listViewMainImage,
            make,
            model,
            odometer,
            originalPrice,
            price,
            plan,
            planScore,
            regions,
            transmission,
            trim,
            upcoming,
            viewCount,
            year
        } = this.props

        const noInfo = "Unknown"
        return (
            <View style={[Styles.listing, Styles.shadow]}>

                <ListingImage
                    key={listingId}
                    carName={year + ' ' + make + ' ' + model + ' ' +trim}
                    listViewMainImage={listViewMainImage}
                    images={images}
                    originalPrice={originalPrice}
                    price={price}
                    plan={plan}
                    planScore={planScore}
                    type={LIST_TYPE_LIST}
                    upcoming={upcoming}
                />

                <View style={[Styles.listingContainer]}>

                    <View style={[Styles.rowInfoContainer, Styles.titleContainer]}>
                        <View style={[Styles.makeModelTrim]}>
                            <Text numberOfLines={1} style={[Styles.makeModelTrimText]}>
                                {year} {make} {model} {trim}
                            </Text>
                        </View>
                        <View style={[Styles.savedIcon]}>
                            <FavouriteButton
                                curFeatures="listings"
                                favouriteIconContainerStyle={Styles.favouriteIconContainer}
                                favouriteIconInnerContainer={Styles.favouriteIconInnerContainer}
                                favouriteIconStyle={Styles.favouriteIcon}
                                favouriteIcon={Images.starBEmpty}
                                targetListingId={listingId}/>
                        </View>
                    </View>

                    { price &&
                        <View style={[Styles.rowInfoContainer, Styles.priceContainer]}>
                            <ListingPrice
                                originalPrice={originalPrice}
                                planScore={planScore}
                                price={price}
                                type={LIST_TYPE_LIST}
                                hasCoupon={hasCoupon}
                                originalPriceStyle={Styles.specialOriginalPriceTextStyle}
                                specialPriceTextStyle={Styles.specialPriceTextStyle}
                                specialOriginalPriceTextStyle={Styles.specialOriginalPriceTextStyle}
                                couponIconStyle={Styles.couponIcon}
                                />
                        </View>
                    }

                    <View style={[Styles.rowInfoContainer, Styles.carDetailInfoContainer]}>
                        <View style={Styles.carDetailInfoInnerContainer}>

                            <View style={[Styles.carDetailInfo, Styles.odometerContainer]}>
                                <Text style={[Styles.carDetailInfoText]}>
                                    {odometer ? numberWithCommas(odometer) : noInfo} km
                                </Text>
                            </View>

                            <View style={Styles.detailInfoSeperator}></View>

                            <View style={[Styles.carDetailInfo, Styles.regionContainer]}>
                                <Text style={[Styles.carDetailInfoText, Styles.dealerText, !regions && Styles.unknownTextStyle]}>
                                    {regions && regions.length > 0 ? this._renderSuburb(regions) : noInfo}
                                </Text>
                            </View>

                        </View>
                        <View style={[Styles.carDetailInfoInnerContainer, Styles.lastContainer]}>
                            {/*<View style={[Styles.carDetailInfo, Styles.viewCountContainer]}>
                                <Image source={Images.viewCount} resizeMode='contain'/>
                                <Text style={[Styles.carDetailInfoText, Styles.viewCountText, !viewCount && Styles.unknownTextStyle]}>
                                    {viewCount ? viewCount : '0'}
                                </Text>
                            </View>*/}
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

ListListing.defaultPrope = {
    type: LIST_TYPE_LIST
}

export default ListListing
