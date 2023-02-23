import React from 'react'
import { Image, View, Text, TouchableHighlight } from 'react-native'
import {noop} from 'lodash'
import { Images, Colors, Layout } from '../../../Themes'

import Styles from './Styles/GoogleAuthButton'

const GoogleAuthButton = ({loggedIn, containerStyle, _onClick}) => {

    return (
        <TouchableHighlight onPress={_onClick}>
            <View style={[Styles.container, containerStyle]}>
                <Image style={Styles.googleIcon} source={Images.googleLoginIcon}/>
                <Text style={Styles.loginText}>{loggedIn ? 'Logout' : 'Log In'}</Text>
            </View>
        </TouchableHighlight>
    )
}

GoogleAuthButton.defaultProps = {
    containerStyle: null,
    loggedIn: false,
    _onClick: noop
}

export default GoogleAuthButton
