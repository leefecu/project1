// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window

export default StyleSheet.create({
    container: {
        ...Layout.itemCentral,
        position: 'absolute',
        top: Metrics.navBarHeight,
        left: 0,
        right: 0,
        height: Metrics.toolBarHeight,
        backgroundColor: Colors.subHeaderBG,
        borderBottomColor: Colors.couponBottomBorder,
        borderBottomWidth: 1,
        borderTopColor: Colors.couponBottomBorder,
        borderTopWidth: 1,
    },
    innerContainer: {
        flexDirection: 'row',
        ...Layout.itemCentral,
    },
    dropdownLabel: {
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    locationColumn: {
        width: 65,
        height: Platform.OS === 'ios' ? 38 : 30,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 0,
        paddingRight: 5
    },
    locationInnerColumn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    locationIcon: {
        height: 28
    },
    locationText: {
        backgroundColor: 'transparent',
        color: Colors.snow,
        fontSize: width <= 320 ? Fonts.size.smallMedium : Fonts.size.medium+1,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
        paddingLeft: 2
    },
    toolbarText: {
        color: Colors.brandColor,
        fontSize: Fonts.size.small
    },
    searchRefineIcon: {
        width: Metrics.icons.tiny
    }
})
