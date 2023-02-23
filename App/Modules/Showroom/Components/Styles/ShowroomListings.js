// @flow

import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const contentH = height - Metrics.bottomNavBarHeight - Metrics.navBarHeight - Metrics.images.large
const profileSize = 65

export default StyleSheet.create({
    container: {
        width: width,
        height: contentH
    },

    bottomPadding: {
        paddingBottom: Metrics.largePadding
    },

    contentsContainer:{
        flex: 1,
        zIndex: 10
    },

    showroomListInnerContainer: {
    	marginTop:0,
        paddingBottom: DeviceInfo.getModel() === 'iPhone X' ? Metrics.largePadding+5 : 0
    }

})
