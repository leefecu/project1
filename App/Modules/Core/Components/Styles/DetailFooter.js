// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        width: width,
        backgroundColor: Colors.snow,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingHorizontal: Metrics.basePadding
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    buttonContainer: {
        width: width- (Metrics.basePadding*2),
        padding: Metrics.basePadding
    },

    multiButtonContainer: {
        width: width / 2 - (Metrics.basePadding + 5),
        paddingVertical: Metrics.basePadding
    },

    showButton: {
        height: Metrics.mediumButtonHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0,
        //backgroundColor: Colors.primaryPink,
    },
    showText: {
        fontSize: Fonts.size.medium,
        color: Colors.snow,
        fontWeight: 'bold'
    },
     exclusiveContainer: {
        ...Layout.itemCentral,
        backgroundColor: Colors.brandColor,
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: Metrics.mediumButtonHeight + Metrics.basePadding * 2 + 1,
        width
    },
    exclusiveButton: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    exclusiveLabel: {
        fontSize: Fonts.size.small,
        color: Colors.exclusiveText,
        textAlign: 'center',
    },
    exclusiveCode: {
        fontSize: Fonts.size.h4,
        fontWeight: 'bold',
        letterSpacing: 4,
        color: Colors.snow
    }
})
