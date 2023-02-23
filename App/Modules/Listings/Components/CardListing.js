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

import { LIST_TYPE_CARD } from '../Constants'
import { numberWithCommas } from '../../Core/Helpers/number'
import { titleCase } from '../../Core/Helpers/string'
import * as Constants from '../../Core/Constants'

import ListingPrice from './ListingPrice'
import FavouriteButton from '../Components/FavouriteButton'
import ListingImage from './ListingImage'

//Styles
import Styles from './Styles/CardListing'

var window = Dimensions.get('window')

class CardListing extends PureComponent {

    _renderSuburb (region) {
        return this.props.listingsRegions && this.props.listingsRegions[region[0]] ? this.props.listingsRegions[region[0]].label : ''
    }

    render () {

        const {
            cardViewMainImage,
            exclusiveCoupons,
            hasCoupon,
            listingId,
            images,
            listViewMainInage,
            make,
            model,
            odometer,
            originalPrice,
            price,
            planScore,
            regions,
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
                cardViewMainImage={cardViewMainImage}
                listViewMainInage={listViewMainInage}
                images={images}
                originalPrice={originalPrice}
                price={price}
                planScore={planScore}
                type={LIST_TYPE_CARD}
                upcoming={upcoming}
            />

            <View style={Styles.listingContainer}>

                <View style={[Styles.rowInfoContainer, Styles.titleContainer]}>
                    <View style={[Styles.makeModelTrimConatiner, Styles.ellipsis]}>
                        <View style={[Styles.regionContainer]}>
                            <Text numberOfLines={1} style={[Styles.regionText]}>
                                {regions && regions.length > 0 ? this._renderSuburb(regions) : noInfo}
                            </Text>
                        </View>
                        <View style={[Styles.makeModelTrim, Styles.ellipsis]}>
                            <Text numberOfLines={1} style={[Styles.makeModelTrimText]}>
                                {year} {make} {model} {trim}
                            </Text>
                        </View>
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

                <View style={[Styles.rowInfoContainer, Styles.carInfoContainer]}>
                    <View style={[Styles.carInfo, Styles.priceContainer]}>
                        { price &&
                            <ListingPrice
                                originalPrice={originalPrice}
                                planScore={planScore}
                                price={price}
                                type={LIST_TYPE_CARD}
                                hasCoupon={hasCoupon}
                                originalPriceStyle={Styles.specialOriginalPriceTextStyle}
                                specialPriceTextStyle={Styles.specialPriceTextStyle}
                                specialOriginalPriceTextStyle={Styles.specialOriginalPriceTextStyle}
                            />
                        }
                    </View>
                    <View style={[Styles.rowInfoContainer, Styles.carInfo]}>
                        {odometer &&
                            <View style={[Styles.odometerContainer]}>
                                <Text style={[Styles.carInfoText]}>
                                    {numberWithCommas(odometer)} km
                                </Text>
                            </View>
                        }
                    </View>
                </View>

            </View>
        </View>
        )
    }
}

CardListing.defaultPrope = {
    type: LIST_TYPE_CARD
}

export default CardListing
