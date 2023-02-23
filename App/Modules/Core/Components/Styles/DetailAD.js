// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

const adWidth = width - (Metrics.basePadding*2)
const adHeight = adWidth * 0.618

export default StyleSheet.create({
    container: {
        paddingVertical: Metrics.largePadding
    },
    innerContainer: {
        ...Layout.itemCentral,
        width: width,
        paddingHorizontal: Metrics.basePadding,
        flexDirection: 'column'
    },

    contentTitle: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.smaller + 1
    },

    contentImgContainer: {
        paddingTop: Metrics.basePadding
    },

    contentImg:{
        width: adWidth,
        height: adHeight 
    },
})
