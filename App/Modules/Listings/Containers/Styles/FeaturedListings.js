// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window

export default StyleSheet.create({
    container: {
        width: width,
        flex:1,
        flexDirection: 'column',
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.silver
    },
    
    toolBarContainer:{
        zIndex: 30
    },
    
    contentsContainer:{
        flex: 1,
        zIndex: 10,
    },

    tabConainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,

    },
    subDescText: {
        textAlign: 'center',
        color: Colors.darkBlueGrey,
        fontStyle: 'italic',
        fontWeight: '500',
        padding: Metrics.smallPadding,
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
    regionDropdown: {
        left: width <= Metrics.minimumDeviceWidth ? width * 0.15 - 5 : width * 0.3 - 5
    },
    regionTriangle:{
        left: width - 30
    },
    sortDropdown: {
        left: 5 
    },
    sortTriangle: {
        left: 10
    },
    categoryDropdown: {
        left: width <= Metrics.minimumDeviceWidth ? width * 0.15 - 5 : width * 0.3 - 5
    },
    categoryTriangle: {
        left: width - 30
    },

    scrollableTabView: {
        marginTop: Metrics.navBarHeight    
    },

    introContainer: {
        position: 'absolute',
        top: 0,
        left: 0, right: 0, height: height,
        zIndex: 100
    }
    
})
