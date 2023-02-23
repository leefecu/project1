// @flow

import DeviceInfo from 'react-native-device-info'
import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window
const itemListBottom = Platform.OS === 'ios' ? Metrics.navBarHeight + Metrics.mediumButtonHeight+(Metrics.basePadding*2) : Metrics.navBarHeight * 3
const containerW = Platform.OS === 'ios' ? width-(width/Metrics.basePadding) : width-((width/Metrics.basePadding))

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.snow
    },
    header: {
        width: containerW,
        height: 50 + Metrics.statusBarHeight,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        paddingTop: 0,
        paddingRight: Platform.OS === 'ios' ? 0 : 30,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: Colors.snow,
        zIndex: 20
    },
    leftButton: {
        paddingVertical: Metrics.basePadding+2,
        paddingLeft: Metrics.smallPadding,
        paddingRight: Metrics.basePadding
    },
    rightButton: {
        paddingVertical: Metrics.basePadding+2,
        paddingLeft: Metrics.basePadding,
        paddingRight: Metrics.smallPadding
    },
    headerTitle:{
        paddingVertical: Metrics.basePadding+2
    },
    headerText: {
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: '500',
        paddingLeft: Metrics.smallPadding,
        paddingRight: Metrics.smallPadding
    },
    redText: {
        color: Colors.red
    },
    headerTitleText: {
        color: Colors.black,
        fontSize: Fonts.size.medium+1,
        fontWeight: '600'
    },
    
    menuContainer: {
        width: containerW,
        flexDirection: 'column',
        paddingTop: 50 + Metrics.statusBarHeight,
        paddingRight: Metrics.doubleBaseMargin,
    },
    logoutText: {
        color: Colors.red
    },
    snsButtonRow: {
        paddingVertical: Metrics.doubleBaseMargin
    },
    fbLoginButtonContainer: {
        backgroundColor: Colors.facebook,
        height: 45,
        borderRadius: Metrics.buttonRadius,
        paddingHorizontal: Metrics.largePadding,
        ...Layout.itemCentral
    },
    googleButton: {
        width: Metrics.screenWidth * 0.8 - Metrics.doubleBaseMargin
    },
    refineItemList: {
        paddingBottom: itemListBottom + Metrics.smallPadding
    },
    fixedBottomButton: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 0 : 0,
        left: 0
    },
    buttonContainer: {
        padding: Metrics.basePadding,
        backgroundColor: Colors.snow,
        borderTopWidth: 1,
        borderTopColor: Colors.border
    },
    iphoneXStyle: {
        paddingBottom: DeviceInfo.getModel() === 'iPhone X' ? Metrics.largePadding : 0
    },
    showButton: {
        height: Metrics.mediumButtonHeight,
        backgroundColor: Colors.primaryPink,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    showText: {
        fontSize: Fonts.size.medium+1,
        color: Colors.snow,
        fontWeight: 'bold'
    }
})
