import React from 'react'
import ReactNative, {
    Image,
    ScrollView,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text
} from 'react-native'
import { map, noop } from 'lodash'

import { Colors, Images, Layout, Metrics } from '../../../Themes'

import * as CouponHelpers from '../../Coupons/Helpers'
import * as CoreHelpers from '../Helpers'

import Button from './Button'
import UList from './UList'

//Styles
import Styles from './Styles/CallModal'

const CallModal = ({page, modalVisible, itemId, itemTitle, FBEventTitle, workshops, workshopBranches, textStyle, onCancel}) => {
    
    let optionCounter = 0

    const call = (shop) => {
        let phoneNumber = shop.phone 

        if (phoneNumber) {
            global.firebase.analytics().logEvent(FBEventTitle, {
                id: itemId,
                name: itemTitle,
                shopName: shop.name,
                phoneNumber: phoneNumber
            })

            phoneNumber = phoneNumber.replace(/\s/g,'')
            CoreHelpers.handleClick(`tel:${phoneNumber}`)

            onCancel()
        }
    }

    const _renderPhones = () => {
        return (
            <ScrollView 
                ref={(scrollView) => {_scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                style={Styles.modalListContainer}>
                { workshops.length ?
                    map(workshops, (shop, index) => _renderPhoneRow(shop, index) )
                :
                    _renderPhoneRow(workshops, 1)
                }
            </ScrollView>
        )
    }

    const _renderPhoneRow = (shop, index) => {

        let suburb = CoreHelpers.getSuburb(shop.address ? shop.address : shop.physicalAddress)
        return (
            <TouchableOpacity
                key={index} 
                style={[Styles.modalList]}
                onPress={() => call(shop)}>
                <View style={Styles.modalRow}>
                    <View style={Styles.modalItem}>
                        <Image source={Images.callModalIcon} style={Styles.modalItemIcon} resizeMode='contain'/>
                        <Text key={index} style={[Styles.modalItemText, textStyle && textStyle]}>
                            {suburb}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    const _renderPhoneWithShops = () => {
        return (
            <ScrollView 
                ref={(scrollView) => {_scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                style={Styles.modalListContainer}>
                {map(workshops, (shop, index) => _renderPhoneWithShopRow(shop, index) )}
            </ScrollView>
        )
    }

    const _renderPhoneWithShopRow = (shop, index) => {
        let suburb = CoreHelpers.getSuburb(shop.address ? shop.address : shop.physicalAddress)
        return (
            <TouchableOpacity
                key={index} 
                style={[Styles.modalList]}
                onPress={() => call(shop)}>
                <View style={Styles.modalRow}>
                    <View style={Styles.modalItem}>
                        <Image source={Images.callModalIcon} style={Styles.modalItemIcon} resizeMode='contain'/>
                        <Text key={index} style={[Styles.modalItemText, textStyle && textStyle]}>
                            {suburb}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <ReactNative.Modal 
            animationType = {"fade"} 
            transparent = {true}
            visible = {modalVisible}
            onRequestClose={() => null}>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={Styles.overlay} />
            </TouchableWithoutFeedback>
            <View style={[Styles.modalContainer]}>
                <View style={[Styles.modalInnerContainer]}>
                    <View style={[Styles.modalHeader]}>
                        <View style={Styles.modalHeaderInnerContainer}>
                            <Text style={Styles.modalTitleText}>Select a branch</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={onCancel}>
                            <View style={Styles.modalDoneTextContainer}>
                                <Text style={Styles.modalDoneText}>Done</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[Styles.modalBody]}>
                        {workshopBranches > 1 ? 
                            _renderPhoneWithShops()
                        :
                            _renderPhones()
                        }
                    </View>
                </View>
            </View>
        </ReactNative.Modal>        
    )
}

export default CallModal
