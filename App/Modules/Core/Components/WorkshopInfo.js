// @flow

import React, { PureComponent } from 'react'
import {
    Platform,
    Dimensions,
    Image,
    View,
    Text,
    ScrollView,
    TouchableHighlight
} from 'react-native'
import MapView from 'react-native-maps'
import { assign, map, chunk } from 'lodash'

import { Colors, Images, Layout } from '../../../Themes'

import * as CoreHelpers from '../../Core/Helpers'
import { calculateRegion } from '../../../Lib/MapHelpers'

import DetailTitle from './DetailTitle'
import UList from './UList'
import Button from './Button'
import GetDirection from './GetDirection'

//Styles
import Styles from './Styles/WorkshopInfo'

var window = Dimensions.get('window')

class WorkshopInfo extends PureComponent {

    constructor (props) {
        super(props)

        this._onClickCall = this._onClickCall.bind(this)
    }

    getDirection = (shop, index) => {
        let url
        const address = shop.address ? shop.address : shop.physicalAddress ? shop.physicalAddress : ''
        if (Platform.OS === 'ios') {
            url = `http://maps.apple.com/?z=16&address=${address}`
        } else{
            url = `http://maps.google.com/maps?q=${address}(${shops.name})&iwloc=A&hl=es`
        }
        CoreHelpers.handleClick(url)
    }

    getGeoData = (shop, index) => {
        const {
            privateCoupon,
            shops
        } = this.props

        if(shop){
            let address
            if(privateCoupon){
                if(shop.address){
                    address = shop.address
                }else{
                    address = shop.physicalAddress
                }
            }else{
                address = shop.address
            }

            let suburb = CoreHelpers.getSuburb(address)

            if ( ! suburb) {
                suburb = regions[shop.regions[0]]
            }

            return assign({
                title: suburb,
                suburb,
                latitude: shop.location[1],
                longitude: shop.location[0]
            }, shops[index])

        }
    }

    _onClickCall(shop) {
        if(shop) {
            let phoneNumber = shop.replace(' ', '').replace('(','').replace(')','')
            if (phoneNumber) {
                phoneNumber = phoneNumber.replace(/\s/g,'')
                CoreHelpers.handleClick(`tel:${phoneNumber}`)
            }
        }
    }

    _renderShopPhone = (phone, index, phones) => {

        let bottomStyle
        if(index !== phones.length-1){
            bottomStyle = Styles.bottomPadding
        }

        return (
            <View key={index} style={[Styles.shopPhoneContainer, bottomStyle && bottomStyle]}>
                {this._renderShopPhoneDetail(phone[0])}

                {phone.length > 1 &&
                    <View style={Styles.multiContentContainer}>
                        <View style={Styles.seperatorLine}></View>
                        {this._renderShopPhoneDetail(phone[1])}
                    </View>
                }
            </View>
        )
    }

    _renderShopPhoneDetail = (phone) => {

        return (
            <TouchableHighlight
                onPress={() => this._onClickCall(phone)}
                underlayColor={Colors.snow} >
                <Text style={[Styles.shopText, Styles.shopContentText, Styles.shopLinkText]}>
                    {phone}
                </Text>
            </TouchableHighlight>
            )
    }

    _renderShopDetailInfo = (shop, index) => {
        const {
            privateCoupon,
            shops,
            userLocation,
            regions
        } = this.props
        let userLat
        let userLon

        if(userLocation){
            userLat = userLocation.latitude
            userLon = userLocation.longitude
        }

        let address
        if(privateCoupon){
            if(shop.address){
                address = shop.address
            } else {
                address = shop.physicalAddress
            }

        }else{
            address = shop.address
        }

        let locations = this.getGeoData(shop, index)
        //const region = calculateRegion([locations], { latPadding: 0.05, longPadding: 0.05 })

        let containerStyle
        if(shops.length > 1){

            if(shops.length-1 === index){
                containerStyle = Styles.lastShopDetailContainer
            } else {
                containerStyle = Styles.shopDetailContainer
            }

        } else {
            containerStyle = Styles.singleShopDetailContainer
        }

        const shopPhone = shop.phone.split()
        const arrShopPhone = chunk(shopPhone, 2);

        return(
            <View key={index} style={containerStyle}>
                <View style={[Styles.shopDetailInnerContainer, Styles.shopDetailCardShadow]}>
                    <View style={Styles.shopDetails}>

                        <View style={[Styles.shopDetailsRow]}>
                            <View style={[Styles.shopDetailsHeaderInfo]}>
                                <View style={[Layout.flex7]}>
                                    <Text style={Styles.shopHeaderText} ellipsizeMode="tail" numberOfLines={1}>{shop.name}</Text>
                                </View>
                                <View style={[Layout.flex3, Layout.textRightAlign]}>
                                    <Text style={Styles.shopHeaderText}>{locations.suburb}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[Styles.shopRowContainer]}>
                        { shopPhone &&
                            <View style={[Styles.shopRowInnerContainer]}>
                                <View style={[Styles.shopContentContainer]}>
                                    <View style={[Styles.imgStyleContainer]}>
                                        <Image source={Images.showroomPhoneIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                    </View>
                                    <View style={[Styles.shopContentInnerContainer]}>
                                        {map(arrShopPhone, this._renderShopPhone)}
                                    </View>
                                </View>
                            </View>
                        }
                        {shop.address &&
                            <View style={[Styles.shopRowInnerContainer]}>
                                <View style={[Styles.shopContentContainer]}>
                                    <View style={[Styles.imgStyleContainer]}>
                                        <Image source={Images.showroomMapIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                    </View>
                                    <View style={[Styles.textContainer]}>
                                        <TouchableHighlight
                                            onPress={() => this.getDirection(shop, index)}
                                            underlayColor={Colors.snow} >
                                            <Text style={[Styles.shopText, Styles.shopContentText, Styles.shopLinkText]}>
                                                {shop.address}
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        }
                        {shop.email &&
                            <View style={[Styles.shopRowInnerContainer]}>
                                <View style={[Styles.shopContentContainer]}>
                                    <View style={[Styles.imgStyleContainer]}>
                                        <Image source={Images.showroomEmailIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                    </View>
                                    <View style={[Styles.textContainer]}>
                                        <TouchableHighlight
                                            onPress={() => this.props._onClickEmail(shop.email)}
                                            underlayColor={Colors.snow} >
                                            <Text style={[Styles.shopText, Styles.shopContentText, Styles.shopLinkText]}>
                                                {shop.email}
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        }
                        {shop.website &&
                            <View style={[Styles.shopRowInnerContainer]}>
                                <View style={[Styles.shopContentContainer]}>
                                    <View style={[Styles.imgStyleContainer]}>
                                        <Image source={Images.showroomWebIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                    </View>
                                    <View style={[Styles.textContainer]}>
                                        <TouchableHighlight
                                            onPress={this.props.onClickEmail}
                                            underlayColor={Colors.snow} >
                                            <Text style={[Styles.shopText, Styles.shopContentText]}>
                                                {shop.website}
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        }
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    _getRegion = () => {
        const {shops} = this.props
        let region = null
        if(shops.length > 1){
            let initialLocations = this.getGeoData(shops[mapMarkerRegion], mapMarkerRegion)
            region = calculateRegion([initialLocations], { latPadding: 0.05, longPadding: 0.05 })
        } else {
            let initialLocations = this.getGeoData(shops[0], 0)
            region = calculateRegion([initialLocations], { latPadding: 0.05, longPadding: 0.05 })
        }

        return region
    }

    render() {
        const {shops} = this.props

        let initialLocations = this.getGeoData(shops[0], 0)
        const region = calculateRegion([initialLocations], { latPadding: 0.05, longPadding: 0.05 })

        return (

            <View style={[Styles.shopContainer]}>
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    horizontal= {true}
                    decelerationRate={0}
                    snapToInterval={shops.length > 1 ? window.width-30 : window.width} //your element width
                    snapToAlignment={"center"}
                    automaticallyAdjustContentInsets={false}
                    onScroll={this._onScroll}
                    scrollEventThrottle={0}
                    style={Styles.shopDetailList}>

                    {shops.map((shop, index) => this._renderShopDetailInfo(shop, index))}

                </ScrollView>
            </View>

        )
    }
}

export default WorkshopInfo
