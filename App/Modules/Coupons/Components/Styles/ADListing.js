// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const listHeight = width <= 320 ? 100 : width <= 375 ? 110 : 120

export default StyleSheet.create({
    listing: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 0.5
        },
        shadowRadius: 1.3,
        shadowOpacity: 0.3,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: Colors.snow,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    listingContainer: {
        width: width,
        height: listHeight
    },
    adImg:{
        width: width,
        height: listHeight
    }
})
