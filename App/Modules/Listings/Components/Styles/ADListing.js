// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const cardWidth = width- (Metrics.basePadding*2)
const cardHeight = (cardWidth*0.618) + 60
const listHeight = width <= 320 ? 100 : width <= 375 ? 110 : 120
const labelW = 40
const labelH = 13

export default StyleSheet.create({
    cardListing: {
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowRadius: 1.5,
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 3
            },
        }),
        borderRadius: 4,
        backgroundColor: Colors.snow,
        width: cardWidth,
        height: cardHeight
    },
    adCardImg:{
        width: cardWidth,
        height: cardHeight
    },

    listListing: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 0.5
        },
        shadowRadius: 1.3,
        shadowOpacity: 0.3,
        elevation: 1,
        backgroundColor: Colors.snow,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    listListingContainer: {
        width: width,
        height: listHeight
    },
    adListImg:{
        width: width,
        height: listHeight
    }
})
