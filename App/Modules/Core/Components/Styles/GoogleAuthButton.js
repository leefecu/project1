// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const fullWidth = Metrics.screenWidth - (Metrics.baseMargin * 4)

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.google,
        borderRadius: Metrics.buttonRadius,
        width: fullWidth,
        height: 42
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: Metrics.baseMargin
    },
    loginText: {
        color: Colors.snow,
        fontSize: Fonts.size.medium,
        fontWeight: '500'
    }
})
