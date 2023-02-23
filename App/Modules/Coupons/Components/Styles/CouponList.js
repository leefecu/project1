// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const couponImageWidth = width <= 320 ? 100 : width <= 375 ? 130 : 140
const minHeight = ((couponImageWidth * 3) / 4 ) + 15

export default StyleSheet.create({
    container: {
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.detailGreyBg,
        flex: 1,
        marginTop: 0
    },
    myCouponsContainer: {
        flex: 1,
    },
    listInnerContainer:{
        marginTop: 10,
        borderTopWidth: 0,
        backgroundColor: 'transparent'
    },
    row: {
        flex: 1,
        backgroundColor: Colors.snow,
        marginBottom: Metrics.listingGap-3,
        minHeight: minHeight
    },
    adRow: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: Metrics.listingGap-3,
        minHeight: (couponImageWidth * 3) / 4
    },
    exclusiveRow: {
        //height: 100
    },
    rowSeperator: {
        borderBottomWidth: 0,
        borderBottomColor: Colors.border,
        borderTopWidth: 0,
        borderTopColor: Colors.border,
        height: Metrics.rowMargin
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 0.5
        },
        shadowRadius: 1.3,
        shadowOpacity: 0.3,
    },
    boldLabel: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.snow,
        textAlign: 'center',
        marginBottom: Metrics.smallMargin
    },
    label: {
        textAlign: 'center',
        color: Colors.snow
    },
    listContent: {
        marginTop: Metrics.baseMargin
    },
    spinnerWrapper: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    noDealContainer: {
        width: width,
        height: height - (Metrics.navBarHeight + Metrics.toolBarHeight + Metrics.tabBarHeight),
        ...Layout.itemCentral
    },
    noDeal: {
        width: width * 0.4
    },
    noDealText: {
        color: Colors.grey6,
        fontSize: Fonts.size.regular,
        position: 'relative',
        top: -20
    },
    couponItemTopMargin: {
        marginTop: Metrics.baseMargin,
    },
    couponItemContainer: {
        width: width,
        flex: 1,
        minHeight: minHeight
    },
    soldItemContainer: {
        position: 'relative',
        width: width,
        flexDirection: 'column'
    },
    soldItemCover: {
        width: width,
        minHeight: 110,
        flexDirection: 'column',
        ...Layout.itemCentral,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 30
    },
    removeButton: {
        height: 34,
        flex: 0,
        backgroundColor: 'transparent',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.snow,
        paddingHorizontal: Metrics.basePadding
    },
    removeText: {
        color: Colors.snow,
        fontSize: 14,
        fontWeight: '500'
    },
    couponItem: {
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20
    }
})
