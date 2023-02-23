// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { Fonts, Metrics, Colors, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const navH = Platform.OS === 'ios' ? Metrics.navBarHeight : Metrics.navBarHeight-10

export default StyleSheet.create({
    searchBarConatiner: {
        flex:1,
        ...Layout.itemCentral,
        paddingVertical: 2
    },
    searchBarInnerConatiner: {
        flexDirection: 'row',
        borderRadius: navH/2,
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: 'transparent',
        color: Colors.brandColor,
        flex: 1,
        fontSize: Fonts.size.medium,
        fontWeight: '400',
        paddingBottom: Metrics.smallMargin,
        paddingTop: Metrics.smallMargin,
        alignItems: 'center',
    },
    iconContainer: {
        ...Layout.itemCentral,
        width: 30,
        height: 32,
        flexDirection: 'row'
    },
    thunderIcon: {
        width: Metrics.icons.base,
        paddingLeft: 3
    },
    deleteButtonContainer: {
        ...Layout.itemCentral,
        paddingRight: 8,
        backgroundColor: 'transparent',
        height: 32,
        flexDirection: 'row'
    },
})
