// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const cardImg = (width- (Metrics.basePadding*2))*0.618
const labelW = 40
const labelH = 13

export default StyleSheet.create({

    listing: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: Colors.snow,
    },
    shadow: {
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
    },

    listingContainer: {
        paddingVertical: Metrics.basePadding,
        paddingHorizontal: Metrics.basePadding,
        //height: 60,
        //flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },

    rowInfoContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },

    carInfoContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: Metrics.basePadding,
    },
    carInfo: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    carInfoText: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.smallMedium
    },
    odometerContainer: {
        justifyContent: 'flex-end',
        paddingRight: Metrics.rowMargin
    },
    viewCountContainer: {
        ...Layout.itemCentral,
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderLeftColor: Colors.seperatorBorder,
        paddingLeft: Metrics.rowMargin,
    },
    viewCountImgContainer: {
        paddingRight: 5
    },

    priceContainer: {
        justifyContent: 'flex-start'
    },
    specialPriceTextStyle:{
        fontSize: Fonts.size.medium,
    },
    specialOriginalPriceTextStyle:{
        fontSize: Fonts.size.regular
    },

    titleContainer: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    makeModelTrimConatiner:{
        flex: 9,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    regionContainer:{
        paddingBottom: Metrics.smallerPadding
    },
    regionText: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.smaller,
        paddingRight: 10,
    },
    makeModelTrim: {
        position: 'relative'
    },
    makeModelTrimText: {
        color: Colors.black,
        fontSize: Fonts.size.medium,
        fontWeight: '500',
        paddingRight: 10,
    },

    transmissionText: {
        fontSize: Fonts.size.small,

    },

    savedIcon: {
        width: 30,
        height: 30,
        zIndex: 30
    },
    favouriteIconContainer: {
        width: 30,
        height: 30
    },
    favouriteIconInnerContainer: {
        ...Layout.itemCentral,
        flexDirection: 'row'
    },
    favouriteIcon: {
        width: 31,
        height: 31,
    },
})
