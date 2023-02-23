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

import { Images, Layout, Colors } from '../../../Themes'

import DetailTitle from './DetailTitle'

//Styles
import Styles from './Styles/SellerInfo'

class SellerInfo extends PureComponent {

    _onPressDealerCall = (phone) => {
        if(phone){

            let phoneNumber = phone.replace(' ', '').replace('(','').replace(')','')
            if (phoneNumber) {
                phoneNumber = phoneNumber.replace(/\s/g,'')
                CoreHelpers.handleClick(`tel:${phoneNumber}`)
            }
        }
    }
    _renderSellerContent = (sellerInfo) => {
            return (
                <View style={[Styles.sellerRowContainer]}>
                    {sellerInfo.suburb && 
                        <View style={[Styles.sellerRowInnerContainer]}>
                            <View style={[Styles.sellerContentContainer]}>
                                <View style={[Styles.imgStyleContainer]}>
                                    <Image source={Images.showroomMapIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                </View>
                                <Text style={[Styles.sellerText, Styles.sellerContentText, Styles.sellerAddress]}>
                                    {sellerInfo.suburb}
                                </Text>
                            </View>
                        </View>
                    }
                    {sellerInfo.phone && 
                        <View style={[Styles.sellerRowInnerContainer]}>
                                <View style={[Styles.sellerContentContainer]}>
                                    <View style={[Styles.imgStyleContainer]}>
                                        <Image source={Images.showroomPhoneIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                    </View>
                                    <TouchableHighlight
                                        onPress={this.props.onClickCall}
                                        underlayColor={Colors.snow} >
                                        <Text style={[Styles.sellerText, Styles.sellerContentText, Styles.sellerLinkText]}>
                                            {sellerInfo.phone}
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                        </View>
                    }
                    {sellerInfo.email && 
                        <View style={[Styles.sellerRowInnerContainer]}>
                            <View style={[Styles.sellerContentContainer]}>
                                <View style={[Styles.imgStyleContainer]}>
                                    <Image source={Images.showroomEmailIcon} style={Styles.imgStyle} resizeMode='contain'/>
                                </View>
                                <TouchableHighlight
                                    onPress={this.props.onClickEmail}
                                    underlayColor={Colors.snow} >
                                    <Text style={[Styles.sellerText, Styles.sellerContentText, Styles.sellerLinkText]}>
                                        {sellerInfo.email}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    }
                </View>
            )
    }
    render () {
        return (
            <View style={[Styles.container]} ref={(c) => this.detail = c}>
                <View style={[Styles.innerContainer, Styles.shadow, Styles.sellerContainer]}>
                    
                    <DetailTitle title='contact info' idx={0} />

                    {this._renderSellerContent(this.props.sellerInfo)}
                </View>
            </View>
        )
    }
}

export default SellerInfo
