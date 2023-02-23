import React from 'react'
import { Image, View, Text, TouchableHighlight } from 'react-native'
import { Colors, Images, Layout } from '../../../Themes'


import Styles from './Styles/GetDirection'

const ShopInfoRow = ({shop, getDirection, iconStyle, getDirectionTextStyle}) => {

    return (
        <View style={[Layout.horizontalRow, Styles.container]}>
            <View style={[Layout.flex, Styles.buttonContainer]}>
                <TouchableHighlight onPress={getDirection} underlayColor={Colors.snow}>
                    <View style={Styles.getDirectionButton}>
                        <Image source={Images.getDirectionIcon} resizeMode='contain' style={[Styles.icon, iconStyle]} />
                        <Text style={[Styles.getDirectionText, getDirectionTextStyle]}>Get Direction</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
        )
}

export default ShopInfoRow
