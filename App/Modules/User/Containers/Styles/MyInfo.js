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
    },
    innerContainer:{
        width: width,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    infoRowContainer: {
        width: width,
        height: 55,
        borderBottomWidth: 1, 
        borderBottomColor: Colors.border,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Metrics.mediumPadding,
        paddingBottom: Metrics.mediumPadding
    },
    infoLabelContainer: {
        flex: 0.4,
        justifyContent: 'center',
        paddingLeft: Metrics.basePadding
    },
    infoLabelText: {
        color: Colors.brandColor,
        fontSize: Fonts.size.medium
    },
    infoValueContainer: {
        flex: 0.5
    },
    userInfo: {
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: Platform.OS === 'ios' ? '500' : '400',
        paddingLeft: 0,
        paddingBottom: Metrics.smallMargin,
        paddingRight: Metrics.smallMargin,
        paddingTop: Metrics.smallMargin,
    },
    textInput: {
        backgroundColor: 'transparent',
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: Platform.OS === 'ios' ? '500' : '400',
        paddingLeft: 0,
        paddingBottom: Metrics.smallMargin,
        paddingRight: Metrics.smallMargin,
        paddingTop: Metrics.smallMargin,
        height: 32,
        textAlign: 'right'
    },
    deleteButtonContainer: {
        flex:0.1,
        backgroundColor: 'transparent',
    },
    deleteIcon: {
        textAlign: 'center',
        fontSize: Fonts.size.h6,
    }
})
