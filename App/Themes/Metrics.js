// @flow

import {Dimensions, Platform, NativeModules} from 'react-native'

const { StatusBarManager } = NativeModules
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
    minimumDeviceWidth: 320,
    maxModalWidth: width <= 413 ? width * 0.9 : 360,
    iphone6plusWidth: 410,
    marginHorizontal: 10,
    marginVertical: 10,
    section: 25,
    basePadding: 10,
    mediumPadding: 8,
    smallPadding: 5,
    smallerPadding: 3,
    mediumLargePadding: 15,
    largePadding: 20,
    baseMargin: 10,
    mediumMargin: 15,
    doubleBaseMargin: 20,
    smallMargin: 5,
    smallerMargin: 3,
    smallestMargin: 1,
    rowMargin: 8,
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    statusBarHeight: STATUSBAR_HEIGHT,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 56,
    tabBarHeight: (Platform.OS === 'ios') ? 45 : 45,
    toolBarHeight: (Platform.OS === 'ios') ? 44 : 44,
    bottomNavBarHeight: (Platform.OS === 'ios') ? 50 : 50,
    bottomButtonBarHeight: (Platform.OS === 'ios') ? 63 : 63,
    sortingColumnHeight: 30,
    detailFooterHeight: 40,
    dropdownTextWidth: 120,
    couponImageWidth: 120,
    buttonRadius: 4,
    largeButtonHeight: 48,
    mediumButtonHeight: 42,
    smallButtonHeight: 34,
    largeButtonRadius: 6,
    tabBarUnderlineHeight: 6,    
    addSize: 2,
    addDetailSize: 5,
    listingGap: 6,
    icons: {
        tiny: 15,
        smaller: 18,
        small: 20,
        medSmall: 22,
        base: 25,
        medium: 30,
        large: 45,
        xl: 60
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 300
    }
}

export default metrics
