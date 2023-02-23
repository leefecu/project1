import React, {Component, PropTypes} from 'react'
import ReactNative, {
    Image,
    Modal,
    View,
    Text
} from 'react-native'

import { Colors, Images, Layout, Metrics } from '../../../Themes'

//Styles
import Styles from './Styles/SimpleAlert'

const SimpleAlert = ({modalVisible, alertStyles, alertIcon, alertDesc, iconImgStyle, descTextStyle}) => {

    if ( ! modalVisible) {
        return null
    }

    alertStyles = alertStyles || Styles.alertContainer
    iconImgStyle = iconImgStyle || Styles.iconImg
    descTextStyle = descTextStyle || Styles.descText

    return (
        <View style={[Styles.container]}>
            <View style={Styles.innerContainer}>
                <View style={alertStyles}>
                    <View style={Styles.iconContainer}>
                        <Image source={alertIcon} style={iconImgStyle} resizeMode='contain' />
                    </View>
                    <View style={Styles.descContainer}>
                        <Text style={descTextStyle}>{alertDesc}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SimpleAlert
