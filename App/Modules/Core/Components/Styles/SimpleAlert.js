// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    alertContainer: {
        width: width <= Metrics.maxModalWidth ? width - (Metrics.basePadding*2) : Metrics.maxModalWidth,
        height: Metrics.tabBarHeight,
        backgroundColor: 'rgba(26,26,26,0.8)',
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        left: 0,
        right: 0,
        top: (height / 2 - Metrics.largePadding),
        justifyContent: 'center',
        zIndex: 11,
        flex: 1
    },
    innerContainer: {
        padding: Metrics.largePadding,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {
        width: Metrics.icons.smaller,
        height: Metrics.icons.smaller,
    },
    descText: {
        paddingLeft: 10,
        fontSize: Fonts.size.medium,
        color: Colors.snow,
        fontWeight: '500'
    }
})
