// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingRight: Metrics.largePadding,
        backgroundColor: Colors.snow
    },
    header: {
        width: width-(width/10),
        height: 50 + Metrics.statusBarHeight,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        paddingTop: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: Colors.snow,
        zIndex: 20
    },
    backButton: {
        paddingBottom: 3,
        backgroundColor: Colors.transparent,
        fontSize: Platform.OS === 'ios' ? Fonts.size.h3 : Fonts.size.h4,
    },
    leftButton: {
        height: 50 + Metrics.statusBarHeight,
        paddingVertical: Metrics.basePadding+2,
        paddingLeft: Metrics.basePadding,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    backbuttonIcon: {
        height: 18
    },
    rightButton: {
        paddingRight: 5
    },
    headerTitleContainer: {
        width: width-(width/10),
        height: 50 + Metrics.statusBarHeight,
        alignItems:'center',
        justifyContent: 'flex-end',
        paddingVertical: Metrics.basePadding+2
    },
    headerText: {
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
        paddingLeft: 3,
        paddingRight: 3
    },
    headerTitleText: {
        color: Colors.black,
        fontSize: Fonts.size.smallMedium+1,
        fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
    },
    
    menuContainer: {
        width: width-(width/10),
        height: height,
        flexDirection: 'column',
        paddingTop: 50 + Metrics.statusBarHeight
    },

    refineItemList: {
        paddingBottom: Metrics.navBarHeight
    },
})
