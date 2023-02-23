// @flow

import React, { PureComponent } from 'react'
import {
    Platform,
    Image,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import MapView from 'react-native-maps'
import { assign, map, chunk } from 'lodash'
import { Colors, Images, Layout } from '../../../Themes'

import * as CoreHelpers from '../../Core/Helpers'
import * as CoreConstants from '../../Core/Constants'
import { calculateRegion } from '../../../Lib/MapHelpers'

import Button from '../../Core/Components/Button'
import DetailTitle from '../../Core/Components/DetailTitle'

//Styles
import Styles from './Styles/DealerInfo'

class DealerInfo extends PureComponent {

    constructor (props) {
        super(props)
    }

    getDirection = () => {
        const {
            dealers
        } = this.props

        let url
        if (Platform.OS === 'ios') {
            url = `http://maps.apple.com/?z=16&address=${dealers.physicalAddress}`
        } else{
            url = `http://maps.google.com/maps?q=${dealers.physicalAddress}(${dealers.name})&iwloc=A&hl=es`
        }
        /*global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.DEALER_GET_DIRECTION, {
            dealerName: dealers.name
        })*/
        CoreHelpers.handleClick(url)
    }

    getGeoData = () => {
        const {
            dealers,
            regions
        } = this.props

        let suburb = CoreHelpers.getSuburb(dealers.physicalAddress)
        let latitude
        let longitude

        if ( ! suburb) {
            suburb = regions[dealerRegion].label
        }

        if(!dealers.coordinates){
            latitude = dealers.location.coordinates[1]
            longitude = dealers.location.coordinates[0]
        }else{
            latitude = dealers.coordinates[1]
            longitude = dealers.coordinates[0]
        }

        return assign({
            title: suburb,
            suburb,
            latitude: latitude,
            longitude: longitude
        }, dealers)
    }

    _renderDealerLogo = () => {
        const {
            dealers
        } = this.props

        let imgUrl = dealers.logo
        if(dealers.logo){
            imgUrl = imgUrl.replace('http:', 'https:')
        }

        return (

            <View style={Styles.dealerLogoContainer}>
                {imgUrl &&
                    <Image style={Styles.dealerLogoImg} source={{uri: imgUrl}} resizeMode='stretch'/>
                }
            </View>
        )

    }

    _renderDealerPhone = (phone, index, phones) => {
            let bottomStyle
            if(index !== phones.length-1){
                bottomStyle = Styles.bottomPadding
            }
            return (
                <View key={index} style={[Styles.dealerPhoneContainer, bottomStyle && bottomStyle]}>
                    <TouchableHighlight
                        onPress={this.props.onClickCall}
                        underlayColor={Colors.snow} >
                        <Text style={[Styles.dealerText, Styles.dealerContentText, Styles.dealerLinkText]}>
                            {phone[0]}
                        </Text>
                    </TouchableHighlight>

                    {phone.length > 1 &&
                        <View style={Styles.multiContentContainer}>
                            <View style={Styles.seperatorLine}></View>

                            <TouchableHighlight
                                onPress={this.props.onClickCall}
                                underlayColor={Colors.snow} >
                                <Text style={[Styles.dealerText, Styles.dealerContentText, Styles.dealerLinkText]}>
                                    {phone[1]}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    }
                </View>
        )
    }

    _renderDealerDetailInfo = (locations) => {
        const {
            dealers,
            dealerRegion,
            regions,
            userLocation
        } = this.props

        let userLat
        let userLon

        if (userLocation) {
            userLat = userLocation.latitude
            userLon = userLocation.longitude
        }

        //const dealerPhone = ['0000000000', '123123123', '6345345345']
        const dealerPhone = dealers.phone
        const arrDealerPhone = chunk(dealerPhone, 2);
        return(
            <View style={[Styles.singleDealerDetailContainer]}>
                <View style={[Styles.dealerDetailInnerContainer, Styles.dealerDetailCardShadow]}>
                    <View style={Styles.dealerDetails}>
                        <View style={[Styles.dealerDetailsRow]}>
                            <View style={[Styles.dealerDetailsHeaderInfo]}>
                                <Text style={Styles.dealerHeaderText}>{dealers.name}</Text>
                                <Text style={Styles.dealerHeaderText}>{locations.suburb}</Text>
                            </View>
                        </View>

                        <View style={[Styles.dealerRowContainer]}>
                            {dealerPhone &&
                                <View style={[Styles.dealerRowInnerContainer]}>
                                    <View style={[Styles.dealerContentContainer]}>
                                        <View style={[Styles.imgStyleContainer]}>
                                            <Image source={Images.showroomPhoneIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                        </View>
                                        <View style={[Styles.dealerContentInnerContainer]}>
                                            {map(arrDealerPhone, this._renderDealerPhone)}
                                        </View>
                                    </View>
                                </View>
                            }
                            {dealers.physicalAddress &&
                                <View style={[Styles.dealerRowInnerContainer]}>
                                    <View style={[Styles.dealerContentContainer]}>
                                        <View style={[Styles.imgStyleContainer]}>
                                            <Image source={Images.showroomMapIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                        </View>

                                        <TouchableHighlight
                                            onPress={() => this.getDirection()}
                                            underlayColor={Colors.snow} >
                                            <Text style={[Styles.dealerText, Styles.dealerContentText, Styles.dealerLinkText]}>
                                                {dealers.physicalAddress}
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            }
                            {dealers.email &&
                                <View style={[Styles.dealerRowInnerContainer]}>
                                    <View style={[Styles.dealerContentContainer]}>
                                        <View style={[Styles.imgStyleContainer]}>
                                            <Image source={Images.showroomEmailIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                        </View>
                                        <TouchableHighlight
                                            onPress={this.props.onClickEmail}
                                            underlayColor={Colors.snow} >
                                            <Text style={[Styles.dealerText, Styles.dealerContentText, Styles.dealerLinkText]}>
                                                {dealers.email}
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            }
                            {dealers.website &&
                                <View style={[Styles.dealerRowInnerContainer]}>
                                    <View style={[Styles.dealerContentContainer]}>
                                        <View style={[Styles.imgStyleContainer]}>
                                            <Image source={Images.showroomWebIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                        </View>
                                        <TouchableHighlight
                                            onPress={this.props.onClickEmail}
                                            underlayColor={Colors.snow} >
                                            <Text style={[Styles.dealerText, Styles.dealerContentText, Styles.dealerLinkText]}>
                                                {dealers.website}
                                            </Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {
            dealers,
            detailPage
        } = this.props

        let locations = this.getGeoData()
        const region = calculateRegion([locations], { latPadding: 0.05, longPadding: 0.05 })
        let latitude
        let longitude

        if(!dealers.coordinates){
            latitude = dealers.location.coordinates[1]
            longitude = dealers.location.coordinates[0]
        }else{
            latitude = dealers.coordinates[1]
            longitude = dealers.coordinates[0]
        }

        return (
            <View style={[Styles.container, Styles.shadow]}>

                <DetailTitle title='contact info' idx={0} />

                <View style={Styles.dealerContainer}>
                    { detailPage && dealers.logo ?
                        this._renderDealerLogo()
                    :
                        <View style={Styles.sepertator}></View>
                    }

                    {this._renderDealerDetailInfo(locations)}

                </View>
            </View>
        )
    }
}

export default DealerInfo
