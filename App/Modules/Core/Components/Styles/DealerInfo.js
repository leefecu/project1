// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.snow,
        paddingBottom: Platform.OS === 'ios' ? 4 : 19
    },
    dealerContainer: {
        width: width,
        flexDirection: 'column',
        zIndex: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },

    innerContainer: {
        width: width,
        marginBottom: 8,
        backgroundColor: Colors.snow
    },
    shadow: {
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
    },
    mapContainer: {
        width: width,
        height: width / 4 * 3
    },

    map: {
        width: width,
        height: width / 4 * 3
    },

    singleDealerDetailContainer:{
        width: width,
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.basePadding+2
    },

    dealerAboutUsContainer: {
        padding: Metrics.basePadding
    },
    dealerDetailInnerContainer: {
        borderRadius: 4,
        backgroundColor: Colors.snow,
    },
    dealerDetailCardShadow: {
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 3
            },
        })
    },
    dealerDetails: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.border
    },
    dealerDetailsRow:{
        padding: Metrics.basePadding
    },
    dealerDetailsHeaderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dealerHeaderText:{
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },
    locationContainer: {
        paddingVertical: Metrics.basePadding-2
    },
    locationText:{
        fontSize: Fonts.size.medium+1,
        color: Colors.black,
        fontWeight: Platform.OS === 'ios' ? '500' : '400'
    },
    distanceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    distanceText: {
        fontSize: Fonts.size.small,
        color: Colors.lighterGrey
    },
    addressText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.blueGrey
    },
    footerContainer: {
        paddingVertical: Metrics.basePadding,
        flexDirection: 'row',
    },

    dealerLogoContainer: {
        ...Layout.itemCentral,
        width: width,
        height: (width/6) + (Metrics.basePadding * 2),
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.basePadding+7,
        flexDirection: 'row'
        //marginTop: -8
    },
    dealerLogoImg: {
        width: width - (Metrics.basePadding * 2),
        height: (width - (Metrics.basePadding*2)) / 6
    },

    buttonContainer: {        
        height: Metrics.smallButtonHeight+2,
        backgroundColor: Colors.snow,
        flexDirection: 'row',
        borderRightWidth:1,
        borderRightColor: Colors.border,
        ...Layout.itemCentral
    },
    showButton: {
        maxWidth: Metrics.maxModalWidth,
        height: Metrics.smallButtonHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        marginHorizontal: Metrics.basePadding
    },
    showText: {
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: '500'
    },
    getDirectionText: {
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: '500'
    },
    icon: {
        height: width <= 320 ? 20 : 20 + 2,
    },
    iconStyle: {
        height: width <= 320 ? 20 : 20 + 2,
    },

    dealerRowContainer: {
        width: width-(Metrics.basePadding * 2),
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: Metrics.mediumMargin
    },
    dealerRowInnerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: Metrics.basePadding,
        paddingBottom: Metrics.mediumMargin
    },
    dealerContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    dealerContentInnerContainer: {
        flexDirection: 'column',    
    },
    dealerPhoneContainer: {
        flexDirection: 'row'
    },
    multiContentContainer: {
        flexDirection: 'row'
    },
    dealerText: {
        fontSize: Fonts.size.smallMedium+1
    },
    dealerTitleText: {
        color: Colors.blueGrey,
    },
    dealerContentText: {
        color: Colors.black
    },
    dealerLinkText: {
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
    bottomPadding: {
        paddingBottom: Metrics.basePadding
    },
    seperator: {
        height: 10
    },
    seperatorLine: {
        width:1,
        height: 18,
        borderLeftWidth: 1,
        borderLeftColor: Colors.seperatorBorder,
        marginHorizontal: Metrics.doubleBaseMargin
    }
})
