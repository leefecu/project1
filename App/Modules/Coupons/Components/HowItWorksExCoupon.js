// @flow

import React, { Component } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import { map } from 'lodash'
import { Images, Metrics } from '../../../Themes'

import Button from '../../Core/Components/Button'
import * as CouponConstants from '../../Coupons/Constants'

import Styles from './Styles/CouponInfo'

const HowItWorksExCoupon = () => {

    const _renderHead = (title, idx) => {

        return (
            <View style={[Styles.titleContainer, idx === 1 && Styles.topTitleContainer]}>
                <Text style={Styles.titleText}>{title.toUpperCase()}</Text>
            </View>
        )
    }

    return (
        <View style={[Styles.container]}>
            <View style={[Styles.innerContainer, Styles.howitworksContainer, Styles.shadow]}>
                {_renderHead('how it works', 2)}
                <View style={[Styles.howitworksContentContainer]}>
                    <View style={Styles.howitworksContentInnerContainer}>

                        <View style={[Styles.contentsInnerContainer, Styles.howitworksRow]}>
                            <View style={[Styles.imageContainer, Styles.howitworksImageContainer]}>
                                <View style={Styles.iconContainer}>
                                    <Image source={Images.howitworksStep1} style={Styles.howitworksIconImgS} resizeMode='contain'/>
                                </View>
                            </View>
                            <View style={[Styles.contentDescContainer, Styles.howitworksStepsContainer]}>
                                <View style={Styles.contentHeader}>
                                    <Text style={[Styles.contentHeaderText, Styles.bold]} >STEP 1:</Text>
                                </View>
                                <View style={Styles.contentDetail}>
                                    <Text style={Styles.contentDetailText}>
                                        Purchase a car with service coupon(s) attached
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={[Styles.contentsInnerContainer, Styles.howitworksRow, {paddingVertical: Metrics.basePadding}]}>
                            <View style={[Styles.imageContainer, Styles.howitworksImageContainer]}>
                                <View style={Styles.iconContainer}>
                                    <Image source={Images.howitworksStep2} style={Styles.howitworksIconImg} resizeMode='contain'/>
                                </View>
                            </View>
                            <View style={[Styles.contentDescContainer, Styles.howitworksStepsContainer]}>
                                <View style={[Styles.contentDescInnerContainer]}>
                                    <View style={Styles.contentHeader}>
                                        <Text style={[Styles.contentHeaderText, Styles.bold]} >STEP 2:</Text>
                                    </View>
                                    <View style={Styles.contentDetail}>
                                        <Text style={Styles.contentDetailText}>
                                            The dealer will issue the coupon(s) to your Car Mate account (Stored in Saved)
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={[Styles.contentsInnerContainer, Styles.howitworksRow]}>
                            <View style={[Styles.imageContainer, Styles.howitworksImageContainer]}>
                                <View style={Styles.iconContainer}>
                                    <Image source={Images.howitworksStep3} style={Styles.howitworksIconImg} resizeMode='contain'/>
                                </View>
                            </View>
                            <View style={[Styles.contentDescContainer, Styles.howitworksStepsContainer]}>
                                <View style={[Styles.contentDescInnerContainer]}>
                                    <View style={Styles.contentHeader}>
                                        <Text style={[Styles.contentHeaderText, Styles.bold]} >STEP 3:</Text>
                                    </View>
                                    <View style={Styles.contentDetail}>
                                        <Text style={[Styles.contentDetailText]}>
                                            Take the coupon(s) to the assigned workshops and get FREE services!
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default HowItWorksExCoupon
