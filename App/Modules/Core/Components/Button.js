import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native'
import {noop} from 'lodash'

import Icon from 'react-native-vector-icons/FontAwesome'

import { Images, Colors, Layout } from '../../../Themes'
import Styles from './Styles/Button'

const Button = ({disabled, showIcon, showImgIcon, icon, imgicon, imgiconStyle, label, containerClass, textClass, _onPress, underlayColor}) => {

    return disabled ? (
        <View
            style={[Styles.container, containerClass, disabled && Styles.disabled]}>
            <View style={Layout.horizontalRow}>
                {showIcon && <Icon style={Styles.icon} name={icon.name} size={icon.size} color={icon.color} />}
                {showImgIcon && <Image source={imgicon} style={[Styles.icon, imgiconStyle]} resizeMode='contain' />}
                <Text style={[Styles.label, textClass, disabled && Styles.disabledLabel]}>{label}</Text>
            </View>
        </View>
    ) : (
        <TouchableHighlight
            onPress={_onPress}
            underlayColor={underlayColor}
            style={[Styles.container, containerClass, disabled && Styles.disabled]}>
            <View style={[Layout.horizontalRow, Layout.itemCentral]}>
                {showIcon && <Icon style={Styles.icon} name={icon.name} size={icon.size} color={icon.color} />}
                {showImgIcon && <Image source={imgicon} style={[Styles.icon, imgiconStyle]} resizeMode='contain' />}
                <Text style={[Styles.label, textClass, disabled && Styles.disabledLabel]}>{label}</Text>
            </View>
        </TouchableHighlight>
    )

}

Button.defaultProps = {
    disabled: false,
    showIcon: false,
    icon: {},
    label: 'Click here',
    containerClass: null,
    textClass: null,
    _onPress: noop,
    underlayColor: Colors.blue,
    imgiconStyle: null
}

export default Button
