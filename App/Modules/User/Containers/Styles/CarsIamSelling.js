// @flow

import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window

export default StyleSheet.create({
    container: {
        width: width,
        flex:1,
        flexDirection: 'column',
    },
    contentsContainer:{
        flex: 1,
        zIndex: 10,
    },
    noItemImgStyle: {
        paddingTop: Metrics.basePadding,
        //paddingBottom: Metrics.doubleBaseMargin,
        paddingLeft: 0
    },
    noItemImgSize: {
        width: width/2
    },
    descContainerStyle: {
        paddingLeft: Metrics.basePadding,
        paddingRight: Metrics.basePadding
    },
    descTextStyle: {
        color: Colors.brandColor,
        fontSize: Fonts.size.h4,
        paddingBottom: 8
    },
    descSubTextStyle: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.medium+1,
        paddingLeft: Metrics.mediumLargePadding,
        paddingRight: Metrics.mediumLargePadding
    },
    buttonContainer: {
        paddingTop: Metrics.doubleBaseMargin,
    },
    bottomDescStyle: {
        fontSize: Fonts.size.smallMedium,
        fontStyle: 'italic',
        color: Colors.brandColor,
        textAlign: 'center',
        paddingBottom: 15
    }
})
