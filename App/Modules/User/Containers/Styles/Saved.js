// @flow

import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window
const tabWidth = width/2

export default StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height - Metrics.bottomNavBarHeight,
    },
    tabConainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    scrollableTabView: {
        backgroundColor: Platform.OS ==='ios' ? Colors.snow : Colors.snow
    },
    scrollableTabBar: {
        height: Metrics.toolBarHeight,
        backgroundColor: Colors.snow, 
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.1,
    },
    tabListingViewContainer:{
        flex: 1,
    },
    tabAboutViewContainer:{
        flex: 1,
        marginBottom: Metrics.bottomButtonBarHeight
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
    scrollableTabView: {
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.detailGreyBg
    },
    iphoneXStyle: {
        paddingBottom: DeviceInfo.getModel() === 'iPhone X' ?  Metrics.doubleBaseMargin + (Metrics.largePadding*2) : 0
    },
    changeDotContainer: {
        height: Metrics.toolBarHeight,
        paddingLeft: 3,
        paddingTop: 10
    },
    changeDot: {
    }
})
