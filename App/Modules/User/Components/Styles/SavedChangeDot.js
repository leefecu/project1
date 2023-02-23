// @flow

import { Dimensions, StyleSheet } from 'react-native'
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
        top: Metrics.navBarHeight,
        left: 0,
        right: 0,
        flex: 1,
        height: height,
    },
    tabConainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,

    },
    scrollableTabView: {
        marginTop: Metrics.navBarHeight,
        height: Metrics.toolBarHeight,
    },
    scrollableTabBar: {
        height: Metrics.toolBarHeight,
        backgroundColor: Colors.snow, 
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.1,
        elevation: 1
    },
    tabsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tabStyle: {
        height: Metrics.toolBarHeight,
        width: width/2,
        flexDirection: 'row'
    },

    changeDotContainer: {
        height: Metrics.toolBarHeight,
        paddingLeft: 3,
        paddingTop: 10
    },
    changeDot: {
    }
})
