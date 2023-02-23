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
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.detailGreyBg,
        paddingBottom: Platform.OS === 'ios' ? 0 : 26, 
        //marginBottom: Platform.OS === 'ios' ? Metrics.bottomNavBarHeight+14 : Metrics.navBarHeight,
    },
    noItemContainerStyle: {
        backgroundColor: Colors.snow
    },
    noItemImgStyle: {
        paddingTop: Metrics.basePadding,
        paddingBottom: Metrics.doubleBaseMargin
    },
    noItemImgSize: {
        width: width/2,
        paddingLeft: 20
    },
    descContainerStyle: {
        paddingLeft: Metrics.basePadding,
        paddingRight: Metrics.basePadding
    },
    descTextStyle: {
        color: Colors.inactiveGreyBg,
        fontSize: Fonts.size.h4,
        paddingBottom: 8
    },
    descSubTextStyle: {
        color: Colors.inactiveGreyBg,
        fontSize: Fonts.size.medium+1,
        paddingLeft: Metrics.mediumLargePadding,
        paddingRight: Metrics.mediumLargePadding
    },
    buttonContainer: {
        paddingTop: Metrics.doubleBaseMargin,
    },
    contentsContainer:{
        flex: 1,
        zIndex: 10,
        marginTop: 0,
        backgroundColor: Colors.brandColor
    },
    listInnerContainer:{
        flex: 1,
        marginTop: 0,
    },
    
})
