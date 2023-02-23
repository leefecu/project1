// @flow

import React, { PureComponent } from 'react'
import {
    TouchableHighlight,
    Linking,
    ScrollView,
    View,
    Image,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationStyles, Images, Colors } from '../../../Themes'

import * as CoreSelectors from '../../Core/Selectors'
import * as CoreHelpers from '../../Core/Helpers'
import ShowroomActions from '../../Listings/Actions'
import * as ShowroomSelectors from '../Selectors'
import * as  UserSelectors from '../../User/Selectors'

import DetailTitle from '../../Core/Components/DetailTitle'
import DealerInfo from '../../Core/Components/DealerInfo'
import DealerDetails from '../../Core/Components/DealerDetails'

//Styles
import Styles from './Styles/ShowroomAbout'

class ShowroomAbout extends PureComponent {
    
    constructor (props) {
        super(props)
        
        this._onClickDealerEmail = this._onClickDealerEmail.bind(this)
        this._onPressDealerCall = this._onPressDealerCall.bind(this)
    }

    copyToClipboard (text) {
        Clipboard.setString(text)
        alert('Copied to clipboard')
    }
    
    _onPressDealerCall (phone) {
        let phoneNumber = phone.replace(' ', '').replace('(','').replace(')','')
        if (phoneNumber) {
            phoneNumber = phoneNumber.replace(/\s/g,'')
            CoreHelpers.handleClick(`tel:${phoneNumber}`)
        }
    }

    _onClickDealerEmail (email) {
        const {
            dealerShop
        } = this.props

        if (email) {
            Linking.canOpenURL(`mailto:${email}`).then(supported => {
                global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.DEALER_SHOWROOM_EMAIL_CLICK, {
                    dealerName: dealerShop.name,
                    email
                })
                if (supported) {
                    return Linking.openURL(`mailto:${email}`);
                }
            })
        }
    }

    _renderContactInfoContent = () => {
        const {
            dealerShop,
            regions,
            userState,
            userLocation
        } = this.props

        return (
            <View style={[Styles.noPadding]}>
                <DealerInfo
                    dealers={dealerShop}
                    dealerRegion={dealerShop.regions}
                    regions={regions}
                    userLocation={userLocation}
                    detailPage = {false}
                />
            </View>
        )
    }

    _renderDealerShopContent = () => {
        const {
            dealerShop
        } = this.props
        
        const phone = dealerShop.phone
        const email = dealerShop.email
        const website = dealerShop.website
        const aboutUs = dealerShop.aboutUs

        return (
            <View style={[Styles.rowContainer, Styles.rowSidePadding, Styles.iphoneXStyle]}>

                <View style={[Styles.dealerRowContainer]}>
                    {phone &&
                    <View style={[Styles.dealerRowInnerContainer]}>
                        <View style={[Styles.dealerContentContainer]}>
                            <View style={[Styles.imgStyleContainer]}>
                                <Image source={Images.showroomPhoneIcon} style={Styles.imgStyle} resizeMode='contain'/>
                            </View>
                            <TouchableHighlight
                                onPress={() => this._onPressDealerCall(phone)}
                                underlayColor={Colors.snow} >
                                <Text style={[Styles.dealerText, Styles.dealerContentText, Styles.dealerLinkText]}>
                                    {phone}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    }

                    {email &&
                    <View style={[Styles.dealerRowInnerContainer]}>
                        <View style={[Styles.dealerContentContainer]}>
                            <View style={[Styles.imgStyleContainer]}>
                                <Image source={Images.showroomEmailIcon} style={Styles.imgStyle} resizeMode='contain'/>
                            </View>
                            <TouchableHighlight
                                onPress={() => this._onClickDealerEmail(email)}
                                underlayColor={Colors.snow} >
                                <Text style={[Styles.dealerText, Styles.dealerContentText, Styles.dealerLinkText]}>
                                    {email}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    }

                    {website &&
                    <View style={[Styles.dealerRowInnerContainer]}>
                        <View style={[Styles.dealerContentContainer]}>
                            <View style={[Styles.imgStyleContainer]}>
                                <Image source={Images.showroomWebIcon} style={Styles.imgStyle} resizeMode='contain'/>
                            </View>
                            <Text
                                selectable={true}
                                style={[Styles.dealerText, Styles.dealerContentText]}
                                onLongPress={() => this.copyToClipboard(website)}
                            >
                                {website.toLowerCase()}
                            </Text>
                        </View>
                    </View>
                    }
                </View>

                {aboutUs && aboutUs !== "" ?
                <Text>{aboutUs}</Text>
                : null
                }
            </View>
        )
    }


    render () {
         const {
            dealerShop
        } = this.props

        return (
            <View style={[ApplicationStyles.layout.fullBackground]}>
                <ScrollView
                    contentContainerStyle={{justifyContent: 'center'}}
                    style={[Styles.container]}
                    keyboardShouldPersistTaps='always'
                >
                    {dealerShop._id &&
                        <View style={[Styles.innerContainer, Styles.shadow]}>
                            <View style={Styles.aboutusContainer}>
                                {this._renderContactInfoContent()}
                            </View>
                        </View>
                    }

                    {dealerShop.dealerPeople && dealerShop.dealerPeople.length > 0 && 
                        <View style={[Styles.innerContainer, Styles.shadow]}>
                            <View style={Styles.dealersContainer}>
                                <DetailTitle title={'Dealers'} idx={2} />
                                <DealerDetails 
                                    dealers={dealerShop.dealerPeople} 
                                    _onPressDealerCall = {this._onPressDealerCall}
                                    _onClickDealerEmail = {this._onClickDealerEmail}
                                />
                            </View>
                        </View>
                    }

                </ScrollView>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        dealerShop: ShowroomSelectors.getDealershop(state),
        listingsRegions: CoreSelectors.getListingRegions(state),
        loggedIn: UserSelectors.getLoggedIn(state),
        userLocation: UserSelectors.getUserLocation(state),
        regions: CoreSelectors.getListingRegions(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowroomAbout)
