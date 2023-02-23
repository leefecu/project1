// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    row: {
        flex: 1
    },
    listContainer: {
        paddingTop: 0
    },
    cardContainer: {
        paddingTop: 0
    },
    listInnerContainer:{
        flex: 1,
        marginTop: 0,
        borderTopWidth: 0,
        backgroundColor: 'transparent'
    },
    topCardItemContainer: {
        padding: Metrics.basePadding,
    },
    cardItemContainer:{
        paddingBottom: Metrics.basePadding,
        paddingHorizontal: Metrics.basePadding,
    },
    listItemContainer:{
        marginBottom: Metrics.listingGap-3,
    },
    listContent: {
    },
    spinnerWrapper: {
        marginVertical: 20,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    noDealContainer: {
        width: width,
        height: height - (Metrics.navBarHeight + Metrics.toolBarHeight + Metrics.tabBarHeight),
        ...Layout.itemCentral
    },
    noDealText: {
        color: Colors.grey6,
        fontSize: Fonts.size.regular,
        position: 'relative',
        top: -20
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
    }
})
