// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: Colors.border
    },
    shopContainer: {
        width: width,
        flexDirection: 'column',
        zIndex: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    shopDetailContainer:{
        width: width-30,
        paddingLeft: Metrics.basePadding+2,
        paddingVertical: Metrics.basePadding + 2,
    },
    lastShopDetailContainer: {
        width: width-30,
        padding: Metrics.basePadding + 2
    },
    singleShopDetailContainer:{
        width: width,
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.basePadding + 2,
    },
    shopDetailInnerContainer: {
        borderRadius: 4,
        backgroundColor: Colors.snow
    },
    shopDetailCardShadow: {
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 0.5,
                elevation: 1,
            },
            android: {
                elevation: 3
            },
        })
    },
    shopDetails: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.border
    },
    shopDetailsRow:{
        padding: Metrics.basePadding,
    },
    shopHeaderText:{
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },
    shopDetailsHeaderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    shopRowContainer: {
        //width: width-(Metrics.basePadding * 2),
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: Metrics.mediumMargin
    },
    shopRowInnerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: Metrics.basePadding,
        paddingBottom: Metrics.mediumMargin
    },
    shopContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    shopContentInnerContainer: {
        flexDirection: 'column',    
    },
    shopPhoneContainer: {
        flexDirection: 'row'
    },
    multiContentContainer: {
        flexDirection: 'row'
    },
    shopText: {
        fontSize: Fonts.size.smallMedium+1
    },
    shopTitleText: {
        color: Colors.blueGrey,
    },
    shopContentText: {
        color: Colors.black
    },
    shopLinkText: {
        color: Colors.blue,
        fontWeight: '500'
    },

    imgStyleContainer: {
        ...Layout.itemCentral,
        flexDirection: 'row',
    },
    imgStyle: {
        height: 20,
        marginRight: Metrics.basePadding
    },
    textContainer:{
        maxWidth: width-(Metrics.basePadding * 4)-20
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderLeftColor: Colors.border
    },
    hidden: {
        height: 0
    }
})
