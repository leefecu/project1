// @flow

import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const profileSize = 65

export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        position: 'relative',
    },
    innerContainer:{
        backgroundColor: Colors.snow,
        paddingBottom: Metrics.basePadding,
    },

    imageContainer: {
        backgroundColor: Colors.black,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },

    workshopLogoContainer: {
        width: width,
        height: Metrics.images.large,
    },
    workshopLogoTextContainer: {
        ...Layout.itemCentral,
        width: width,
        minHeight: Metrics.images.large,
    },
    workshopLogoImg: {
        height: Metrics.images.large
    },
    dealerShopNameText: {
        color: Colors.lightGrey,
        fontSize: 23,
        textAlign: 'center',
    },
    tabListingViewContainer:{
        flex: 1,
    },
    tabAboutViewContainer:{
        flex: 1,
        marginBottom: Metrics.bottomButtonBarHeight
    },

    scrollableTabView: {
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.detailGreyBg
    },

    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },    
    tabsWrapStyle:{
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.snow, 
        zIndex:-1
    },
    tabStyle: {
        width: width/2,
        height: Metrics.toolBarHeight,
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'transparent',
        zIndex: 3
    },
    tabBarTextStyle: {
        color: Colors.lightBrandColor,
        fontSize: Fonts.size.medium
    },
    tabUnderLineStyle: {
        height: Metrics.tabBarUnderlineHeight,
        backgroundColor: Colors.primaryPink
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

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },

    iphoneXStyle: {
        paddingBottom: DeviceInfo.getModel() === 'iPhone X' ? Metrics.largePadding : 0
    },

    emailButton: {
        backgroundColor: Colors.brandColor
    },
    callButton:{
        backgroundColor: Colors.primaryPink,
    },


})
