// @flow

import {Dimensions, StyleSheet, Platform} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const fullWidth = Metrics.screenWidth - (Metrics.baseMargin * 4)

export default StyleSheet.create({
    container:{
        width: fullWidth,
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    row: {
        width: (fullWidth) /2,
        height: Platform.OS === 'ios' ? 42 : 42,
    },
    snsLoginButtonContainer: {
        width: (fullWidth - 5) /2,
        height: Platform.OS === 'ios' ? 42 : 42,
        ...Layout.itemCentral,
        borderRadius: Metrics.buttonRadius
    },
    facebookLoginButtonContainer: {
        backgroundColor: Colors.facebook
    },
    googleLoginButtonContainer: {
        backgroundColor: Colors.google
    },
    facebookLoginButton: {
        width: (fullWidth - 20) /2,
        height: Platform.OS === 'ios' ? 42 : 42,
        backgroundColor: Colors.facebook
    },
    googleLoginButton: {
        width: (fullWidth - 20) /2,
        height: Platform.OS === 'ios' ? 42 : 42,
    },
    facebookIcon: {
        width: 24,
        height: 24,
        marginRight: Metrics.baseMargin
    },
    loginText: {
        color: Colors.snow,
        fontSize: Fonts.size.medium,
        fontWeight: '500'
    },
    errorMsg: {
        color: Colors.red,
        fontSize: Fonts.size.small,
        fontWeight: '600',
        marginTop: Metrics.smallMargin
    },
    successMsg: {
        color: Colors.blue,
        fontSize: Fonts.size.small,
        fontWeight: '600',
        marginTop: Metrics.smallMargin
    }
})
