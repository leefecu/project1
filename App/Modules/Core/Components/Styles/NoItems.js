// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window
const iconWidth = (width/3)
const containerH = Platform.OS === 'ios' ? height - Metrics.navBarHeight - ( Metrics.bottomNavBarHeight * 2) : height - Metrics.navBarHeight - ( Metrics.bottomNavBarHeight * 2) - 25
export default StyleSheet.create({
    container: {
        //paddingTop: Metrics.navBarHeight+Metrics.tabBarHeight
        backgroundColor: Colors.snow
    },
    noItemContainer:{
        width: width,
        height: containerH,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    topContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        padding: Metrics.mediumPadding,
    },
    imgContainer:{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20
    },
    img: {
        width: iconWidth
    },
    descContainer: {
        paddingBottom: 30,
        alignItems: 'center'
    },
    descText: {
        color: Colors.inactiveGreyText,
        fontSize: Fonts.size.h4,
        fontWeight: '300',
        paddingBottom: Metrics.basePadding,
        textAlign: 'center'
    },
    descSubText: {
        color: Colors.inactiveGreyText,
        fontSize: Fonts.size.smallMedium+1,
        textAlign: 'center'
    },
    buttonContainer: {
        width: width,
        paddingTop: 30,
        paddingLeft: Metrics.mediumPadding,
        paddingRight: Metrics.mediumPadding,
        paddingBottom: Metrics.mediumPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    showButton: {
        width: width,
        maxWidth: Metrics.maxModalWidth,
        height: Metrics.largeButtonHeight,
        backgroundColor: Colors.primaryPink,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        paddingHorizontal: Metrics.basePadding*2
    },
    showText: {
        fontSize: Fonts.size.input,
        color: Colors.snow,
        fontWeight: '500'
    },
    adContainer: {
        width: width,
        paddingLeft: Metrics.mediumPadding,
        paddingRight: Metrics.mediumPadding,
        paddingBottom: Metrics.basePadding
    },
    ad: {
        height: 80,
        backgroundColor: Colors.brandColor
    },
    bottomDescStyle: {
        fontSize: Fonts.size.h5,
    },
    sepertator: {
        height: 20
    }
})
