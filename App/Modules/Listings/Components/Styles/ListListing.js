// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const imageW = width <= 320 ? 100 : width <= 375 ? 130 : 160
const imageH = width <= 320 ? 100 : width <= 375 ? 110 : 120
const labelW = 40
const labelH = 13

export default StyleSheet.create({
    listing: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: Colors.snow,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 0.5
        },
        shadowRadius: 1.3,
        shadowOpacity: 0.3,
        elevation: 1
    },
    rowInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'flex-end'
    },
    priceContainer: {
        paddingTop: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    specialPriceTextStyle:{
        fontSize: Fonts.size.smallMedium
    },
    specialOriginalPriceTextStyle:{
        fontSize: Fonts.size.medium
    },
    carDetailInfoContainer: {
        width: width - (imageW + 19),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    lastContainer: {

    },
    carDetailInfoInnerContainer: {
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        margin: 0
    },
    carDetailInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    carDetailInfoText: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.small,
        fontWeight: '400'
    },
    viewCountText: {
        paddingLeft: 5
    },
    detailInfoSeperator: {
        width: 1,
        height: 11,
        marginHorizontal: 5,
        borderLeftWidth: 1,
        borderLeftColor: Colors.seperatorBorder
    },
    odometerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    regionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    seperatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: Metrics.smallPadding,
        paddingRight: Metrics.smallPadding
    },
    couponIcon:{
        marginLeft: Metrics.smallerMargin,
        width: 17,
        height: 16,
    },
    seperator: {
        width: 4,
        height: 4,
        borderRadius: 3,
        backgroundColor: Colors.darkBlueGrey
    },
    unknownTextStyle: {
        
    },

    listingContainer: {
        width: width - imageW ,
        height: imageH,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: Metrics.mediumPadding,
        paddingHorizontal: Metrics.basePadding
    },
    titleContainer: {
        width: width - (imageW + 19),
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    makeModelTrim: {
        width:  width-(imageW + 19)-30,
    },
    makeModelTrimText: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
        color: Colors.black,
        fontSize: Fonts.size.smallMedium+1,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal'
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
        marginRight: -10,
        paddingVertical: 5,
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    favouriteIcon: {
        width: 24,
        height: 24,
    },
})
