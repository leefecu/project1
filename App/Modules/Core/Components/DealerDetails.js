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

import * as CoreHelpers from '../Helpers'
import * as CoreConstants from '../Constants'
import { calculateRegion } from '../../../Lib/MapHelpers'

import Button from './Button'

//Styles
import Styles from './Styles/DealerDetails'

class DealerDetails extends PureComponent {

    constructor (props) {
        super(props)
    }

    _renderDealer = (dealer, index, dealerLen) => {
        const {
            dealerShop
        } = this.props

        let photo = dealer.photo
        if (photo) {
            photo = photo.replace('http:', 'https:')
        }
        const phone = dealer.phone ? dealer.phone : dealerShop && dealerShop.phone
        const email = dealer.email ? dealer.email : dealerShop && dealerShop.email
        const position = dealer.position ? `(${dealer.position})` : ''

        return (
            <View key={index} style={[Styles.dealerContainer, dealerLen-1 === index && Styles.noBottomBorder]}>

                {photo ?
                    <View style={[Styles.backgroundImageContainer, Styles.dealerImgContainer, Styles.shadow]}>
                        <Image source={{uri: photo}} style={[Styles.profileImg]} resizeMode='cover' />
                    </View>
                :
                    <View style={[Styles.noImageBackgroundContainer, Styles.dealerImgContainer, Styles.shadow]}>
                        <Image source={Images.leftMenuGuest} style={Styles.personImage} resizeMode='cover' />
                    </View>
                }

                <View style={[Styles.dealerInfoContainer]}>

                    <View style={[Styles.dealerInfoRow, Styles.dealerNameContainer]}>
                        <Text style={[Styles.dealerInfoText, Styles.dealerNameText]}>{dealer.name} {position}</Text>
                    </View>

                    {phone && 
                        <TouchableHighlight
                            onPress={() => this.props._onPressDealerCall(phone)}
                            underlayColor={Colors.snow} >
                            <View style={[Styles.dealerInfoRow, Styles.dealerPhoneContainer]}>
                                <View style={Styles.iconContainer}>
                                    <Image style={Styles.dealerInfoIcon} source={Images.showroomPhoneIcon} resizeMode='contain'/>
                                </View>
                                <Text style={[Styles.dealerInfoText, Styles.dealerPhoneText, Styles.blueText]}>{phone}</Text>
                            </View>
                        </TouchableHighlight>
                    }

                    {email && 
                        <TouchableHighlight
                            onPress={() => this.props._onClickDealerEmail(email)}
                            underlayColor={Colors.snow} >
                            <View style={[Styles.dealerInfoRow, Styles.dealerEmailContainer]}>
                                <View style={Styles.iconContainer}>
                                    <Image style={Styles.dealerInfoIcon} source={Images.showroomEmailIcon} resizeMode='contain'/>
                                </View>
                                <Text style={[Styles.dealerInfoText, Styles.dealerEmailText, Styles.blueText]}>{email}</Text>
                            </View>
                        </TouchableHighlight>
                    }
                </View>
            </View>
        )
    }

    render() {

        const {
            dealers
        } = this.props

        return (
            <View style={[Styles.container]}>
                {dealers.map((dealer, index) => this._renderDealer(dealer, index, dealers.length))}
            </View>
        )
    }
}

export default DealerDetails
