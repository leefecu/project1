// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const largeFont = 18
const smallFont = 15

export default StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'flex-end'
    },

    originalSpecialPrice: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    originalPriceText: {
        color: Colors.black,
        fontWeight: Platform.OS === 'ios' ? '500' : '400',
        fontSize: largeFont,
        letterSpacing:-0.8
    },
    originalPrice: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    specialOriginalPriceText: {
        color: Colors.black,
        fontSize: smallFont,
        letterSpacing:-0.5
    },
    specialPrice: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    specialPriceText: {
        color: Colors.red,
        backgroundColor: 'transparent'
    },
    couponIcon:{
        marginLeft: Metrics.smallerMargin,
        width: 18,
        height: 17,
    },
    lineThrough: {
        textDecorationLine: 'line-through'
    },
    arrowImgContainer: {
        paddingHorizontal: 4,
    },
    arrowImg: {
        width: 13,
        height: 10
    },
    pricePW: {
        alignItems: 'flex-end',
        flex: 0.45,
    },
    pricePwText: {
        fontWeight: '500',
        color: Colors.brandColor,
        fontSize: Fonts.size.small,
    },
})
