// @flow

import {
    StyleSheet,
    Dimensions,
    Platform,
    PixelRatio } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'
import * as CoreHelpers from '../../../Core/Helpers'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.detailGreyBg,
        marginBottom: Metrics.bottomButtonBarHeight
    },
    imageSlideContainer: {
        backgroundColor: Colors.snow,
        paddingBottom: Metrics.doubleBaseMargin * 2
        //marginBottom: Metrics.doubleBaseMargin
    },
    singleImageSlideContainer: {
        backgroundColor: Colors.snow,
        paddingBottom: Metrics.doubleBaseMargin,
        //marginBottom: Metrics.doubleBaseMargin
    },
    contentBlock: {
        //backgroundColor: Colors.snow,
    },
    contentInnerBlock: {
        paddingHorizontal: Metrics.baseMargin,
        backgroundColor: Colors.snow,
    },

    nameContainer: {
        ...Layout.itemCentral
    },
    nameText: {
        color: Colors.black,
        textAlign:'center',
        fontSize: Fonts.size.h5
    },

    priceMainInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceContainer: {
        paddingVertical: Metrics.basePadding+2
    },
    arrowImgContainer:{
        paddingHorizontal: 5,
    },
    arrowImg: {
        width: 13,
        height: 10
    },
    specialPriceTextStyle:{
        fontSize: 18
    },
    specialOriginalPriceTextStyle:{
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? '500' : '400'
    },
    couponIcon: {
        marginLeft: Metrics.smallerMargin,
        width: 15,
        height: 14,
    },


    carMainInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: Metrics.largePadding
    },
    carMainInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateInfoContainer:{

    },
    carMainInfoText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.blueGrey
    },

    carMainInfoIconContainer: {
        paddingRight: Metrics.smallPadding
    },
    carMainInfoIcon:{
        width: Metrics.images.small
    },

    showroomButton: {
        paddingTop: 12
    },

    seperator:{
        width:1,
        height: 18,
        borderLeftWidth: 1,
        borderLeftColor: Colors.seperatorBorder,
        marginHorizontal: Metrics.doubleBaseMargin
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    emailButtonContain: {
        //paddingRight: Metrics.smallMargin,
        //backgroundColor: Colors.brandColor
    },
    callButtonContain: {
        //paddingLeft: Metrics.smallMargin,
        //backgroundColor: Colors.primaryPink
    },
    emailButton: {
        backgroundColor: Colors.brandColor
    },
    callButton:{
        backgroundColor: Colors.primaryPink,
    },

})
