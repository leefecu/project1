// @flow

import {Dimensions, StyleSheet, Platform} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        position: 'relative',
        flexDirection: 'row'
    },
    detailContainer: {
        top: Platform.OS === 'ios' ? 1 : 6
    },
    originalPrice: {
        color: Colors.red,
        fontSize: Fonts.size.medium + 1,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
        backgroundColor: 'transparent'
    },
    detailOriginalPrice: {
      fontSize: Fonts.size.h5  
    },
    offPrice: {
        color: Colors.black,
        fontSize: Fonts.size.smallMedium + 1,
        letterSpacing:-0.5
    },
    offText: {
        color: Colors.black,
        fontSize: 12,
        fontWeight: '400'
    },
    offPriceImageContainer: {
        ...Layout.itemCentral,
        paddingHorizontal: 4
    },
    offPriceImage: {
        width: 13,
        height: 10
    },
    fixedOffPrice: {
        paddingLeft: 3,
        top: -1
    },
    detailOffPrice: {
        fontSize: Fonts.size.input
    },
    detailOffText: {
        fontSize: Fonts.size.medium+1,
        fontWeight: '400'
    },
    lineThrough: {
        textDecorationLine: 'line-through'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    priceInnerContainer: {
        ...Layout.itemCentral,
        flexDirection: 'row',
    }
})
