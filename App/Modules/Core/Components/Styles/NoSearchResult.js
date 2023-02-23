// @flow

import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window
const iconWidth = (width/3)

export default StyleSheet.create({
    container: {
        //paddingTop: Metrics.navBarHeight+Metrics.tabBarHeight
    },
    noItemContainer:{
        width: width,
        height: height - Metrics.navBarHeight - (Metrics.tabBarHeight * 2),
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
    imgContainer:{
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Metrics.basePadding,
        paddingBottom: Metrics.doubleBaseMargin,
        paddingLeft: 0
    },
    img: {
        width: iconWidth
    },
    descContainer: {
        paddingLeft: Metrics.basePadding,
        paddingRight: Metrics.basePadding,
        alignItems: 'center'
    },
    descText: {
        color: Colors.inactiveGreyText,
        fontSize: Fonts.size.h4,
        fontWeight: '300',
        paddingBottom: Metrics.basePadding,
        textAlign: 'center',
        paddingBottom: 8
    },
    descSubText: {
        color: Colors.inactiveGreyBg,
        fontSize: Fonts.size.medium+1,
        paddingLeft: Metrics.mediumLargePadding,
        paddingRight: Metrics.mediumLargePadding
    },
    buttonContainer: {
        width: width,
        paddingTop: Metrics.doubleBaseMargin,
        paddingLeft: Metrics.mediumPadding,
        paddingRight: Metrics.mediumPadding,
        paddingBottom: Metrics.mediumPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    showButton: {
        maxWidth: Metrics.maxModalWidth,
        height: Metrics.largeButtonHeight,
        backgroundColor: Colors.primaryPink,
        paddingHorizontal: Metrics.doubleBaseMargin,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    showText: {
        fontSize: Fonts.size.input,
        color: Colors.snow,
        fontWeight: '500'
    },
})
