// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import { map, each, filter } from 'lodash'

import { Images, Layout } from '../../../Themes'

import { numberWithCommas } from '../../Core/Helpers/number'
import { titleCase, splitByWord, dateConvert } from '../../Core/Helpers/string'
import UList from '../../Core/Components/UList'
import ViewMoreText from '../../Core/Components/ViewMoreText'
import DetailTitle from '../../Core/Components/DetailTitle'

//Syltes
import Styles from './Styles/CarInfoDetail'

class CarInfoDetail extends PureComponent {

    constructor (props) {
        super(props)

        this._renderTextReady = this._renderTextReady.bind(this)
    }
    
    _renderOverviewRow = (title, content, contentStyle) => {
        if( content ) {

            return (
                <View style={[Styles.overviewRowContainer]}>
                    <View style={[Layout.flex5, Layout.textTopAlign, Styles.overviewContentContainer]}>
                        <Text style={[Styles.overviewText, Styles.overviewTitleText]}>{title}</Text>
                    </View>
                    <View style={[Layout.flex5, Layout.textTopAlign, Styles.overviewContentContainer]}>
                        <Text style={[Styles.overviewText, Styles.overviewContentText, contentStyle]}>{content}</Text>
                    </View>
                </View>
            )
        }
        return null
    }

    _renderFuelBadge = () => {
        const {car} = this.props

        if (! car.fuelPromoBadge) {
            return null
        }

        return (
        <View style={Styles.overviewRowContainer}>
            <View style={[Layout.flex5, Layout.textTopAlign, Styles.overviewContentContainer]}>
                <Text style={[Styles.overviewText, Styles.overviewTitleText]}>Fuel Economy Info</Text>
            </View>
            <View style={[Layout.flex5, Layout.textBottomAlign, Styles.overviewContentContainer, Styles.fuelImgContainer]}>
                <Image source={{uri: car.fuelPromoBadge}} style={Styles.imgStyle} resizeMode='cover'/>
            </View>
        </View>
        )
    }

    _renderFuelInfo = () => {
        const {car} = this.props

        return car.fuelConsumption && car.yearlyCost ? (
        <View style={[Styles.overviewRowContainer, Styles.noTopBorder]}>
            <View style={[Layout.flex2, Styles.overviewContentContainer]}>
            </View>
            <View style={[Layout.flex8, Layout.textBottomAlign, Styles.overviewContentContainer]}>
                <Text style={[Styles.overviewContentText, Styles.fuelInfoText]}>
                    Annual fuel cost of ${numberWithCommas(car.yearlyCost)} {"\n"} Fuel economy is {car.fuelConsumption}L per 100km.
                </Text>
            </View>
        </View>
        ) : null
    }

    _renderOverviewContent = () => {
        const {
            car,
            regions
        } = this.props

        return(
            <View style={Styles.rowContainer}>
                {car.odometer && this._renderOverviewRow('Mileage', numberWithCommas(car.odometer)+'km')}
                {car.transmission && this._renderOverviewRow('Transmission', titleCase(car.transmission))}
                {car.engineSize && this._renderOverviewRow('Engine Size', car.engineSize+'cc')}
                {car.bodyType && this._renderOverviewRow('Body Type', titleCase(car.bodyType))}
                {car.history && this._renderOverviewRow('History', car.history)}
                {car.numberPlate && this._renderOverviewRow('Number Plate', car.numberPlate)}
                {car.color && this._renderOverviewRow('Color', car.color)}
                {car.fuelType && this._renderOverviewRow('Fuel Type', car.fuelType)}
                {this._renderOverviewRow('On Road Costs', car.onRoadCosts ? 'Included' : 'Excluded')}
                {this._renderOverviewRow('Registration Expires', car.regExpiry && !isNaN(car.regExpiry) ? dateConvert(car.regExpiry) : 'No Registration')}
                {car.wofExpiry && this._renderOverviewRow('WOF Expires', dateConvert(car.wofExpiry))}
                {this._renderOverviewRow('Seller Type', car.dealerShop ? 'Dealer' : 'Private')}
                {car.upcoming && this._renderOverviewRow('Status', 'In Transit', Styles.upcomingText)}
                {car.regions && car.regions[0] && regions[car.regions[0]] && this._renderOverviewRow('Location', regions[car.regions[0]].label)}
                {/*_renderOverviewRow('', '')*/}

                {this._renderFuelBadge()}

                {this._renderFuelInfo()}

            </View>
        )
    }

    _renderFeaturesContent = () => {
        const features = this.props.car.features

        return (
            <View style={Styles.rowContainer}>
                <View style={Styles.featuresRowContainer}>
                    <UList
                        containerClass={Styles.featuresRowInnerContainer}
                        itemClass = {Styles.featuresRowItem}
                        textClass={Styles.featuresText}
                        items={map(features, (item) => {
                            return {icon: null, label: titleCase(item.replace('_', ' ')), showIcon: true}
                        })}
                    />
                </View>
            </View>
        )
    }

    _renderViewMore = (onPress) => {
        return (
        <Text style={Styles.viewMoreText} onPress={onPress}>
            Show Full Description
        </Text>
        )
    }

    _renderViewLess = (onPress) => {
        return (
        <Text style={Styles.viewMoreText} onPress={onPress}>
            Show Less Description
        </Text>
        )
    }

    async _renderTextReady (diff, scroll) {
        if (this.detail) {
            await nextFrameAsync()
            fullHeight = await measureHeightAsync(this.detail)
            this.props.onViewMore(fullHeight + diff, scroll)
        }
    }

    _renderDetailsContent = () => {
        return (
            <View style={Styles.rowContainer}>
                <View style={Styles.addtionalRowContainer}>
                    <View style={Styles.addtionalRowInnerContainer}>
                        <ViewMoreText
                            numberOfLines={10}
                            renderViewMore={this._renderViewMore}
                            renderViewLess={this._renderViewLess}
                            afterExpand={(diff) => this._renderTextReady(diff)}
                            afterCollapse={(diff, scroll) => this._renderTextReady(diff, scroll)}
                        >
                            <Text style={Styles.addtionalDetailsText}>{this.props.car.description}</Text>
                        </ViewMoreText>
                    </View>
                </View>
            </View>
        )
    }

    render () {
        const features = this.props.car.features
        const description = this.props.car.description
        const advertising = this.props.car.advertising

        return (
            <View style={[Styles.container]}>
                <View style={[Styles.innerContainer, Styles.shadow, Styles.overviewContainer]}>
                    <DetailTitle title='overview' idx={1} />
                    {this._renderOverviewContent()}
                </View>
                {features &&
                    <View style={[Styles.innerContainer, Styles.shadow, Styles.featuresContainer]}>
                        <DetailTitle title='features' idx={2} />
                        {this._renderFeaturesContent()}
                    </View>
                }
                {description &&
                    <View style={[Styles.innerContainer, Styles.shadow, Styles.addtionalDetailsContainer]}>
                        <DetailTitle title='additional details' idx={3} />
                        {this._renderDetailsContent()}
                    </View>
                }
            </View>
        )
    }
}

export default CarInfoDetail
