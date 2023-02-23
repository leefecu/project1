// @flow

import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const contentH = height - Metrics.bottomNavBarHeight - Metrics.navBarHeight - Metrics.bottomButtonBarHeight - Metrics.images.large
const profileSize = 65

export default StyleSheet.create({
    container: {
        width: width,
        height: contentH
    },

    contentsContainer:{
        flex: 1,
        zIndex: 10
    },

    innerContainer:{
        backgroundColor: Colors.snow,
        paddingBottom: Metrics.basePadding,
        marginBottom: Metrics.rowMargin,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },

    lastContainer: {
        marginBottom: 0
    },

    imageContainer: {
        backgroundColor: Colors.snow,
        paddingBottom: Metrics.largePadding
    },
    imageContainer: {
        backgroundColor: Colors.black,
        width: width,
        height: width / 2.14 * 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    workshopLogoContainer: {
        width: width,
        paddingVertical: Metrics.largePadding
    },
    workshopLogoImg: {
        height: 60
    },
    dealerShopNameText: {
        color: Colors.lightGrey,
        fontSize: 23,
        textAlign: 'center',
    },

    topTitleContainer: {
        marginTop: -8
    },

    iphoneXStyle: {
        paddingBottom: DeviceInfo.getModel() === 'iPhone X' ? 5 : 0
    },


    titleContainer: {
        height: Metrics.detailFooterHeight,
        paddingBottom: 5,
        paddingHorizontal: Metrics.basePadding,
        backgroundColor: Colors.snow,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex: 30
    },
    titleText: {
        color: Colors.darkBlueGrey,
        fontWeight: 'bold',
        fontSize: Fonts.size.smallMedium, 
    },

    rowContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        //padding: Metrics.basePadding,
    },
    rowSidePadding: {
        paddingHorizontal: Metrics.basePadding,
        paddingTop: Metrics.basePadding
    },
    listItemText: {
        fontSize: Fonts.size.smallMedium
    },

    dealerRowContainer: {
        width: width,
        paddingBottom: Metrics.basePadding
    },
    dealerRowInnerContainer: {
        height: Metrics.sortingColumnHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: Metrics.smallerPadding
    },
    dealerContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    imgStyleContainer: {
        ...Layout.itemCentral,
        flexDirection: 'row',
    },
    imgStyle: {
        height: 20,
        marginRight: Metrics.basePadding
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

    aboutus: {
        marginTop: Metrics.baseMargin
    },

    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 0.2,
    },
    blueText: {
        color: Colors.blue
    },
    noPadding: {
        padding: 0
    },
    noBottomBorder: {
        borderBottomWidth: 0,
        paddingBottom: 0
    }
})
