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
        marginBottom: Platform.OS === 'ios' ? Metrics.bottomNavBarHeight+14 : Metrics.navBarHeight,
    },
    noItemContainerStyle: {
        backgroundColor: Colors.snow
    },
    noItemImgStyle: {
        paddingTop: Metrics.basePadding,
        paddingBottom: Metrics.doubleBaseMargin,
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
    },
    row: {
        flex: 1,
        backgroundColor: Colors.snow,
    },
    itemContainer: {
        backgroundColor: 'transparent',
    },
    listItemContainer:{
        marginBottom: Metrics.listingGap-3,
    },
    listContent: {
        marginTop: Metrics.baseMargin
    },
    soldItemContainer: {
        position: 'relative',
        width: width,
        flexDirection: 'column'
    },
    soldItemCover: {
        width: width,
        height: width <= 320 ? 100 : 110,
        flex: 1,
        flexDirection: 'column',
        ...Layout.itemCentral,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 30
    },
    removeButton: {
        height: 34,
        flex: 0,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.snow,
        paddingHorizontal: Metrics.basePadding
    },
    removeText: {
        color: Colors.snow,
        fontSize: Fonts.size.smallMedium+1,
        fontWeight: '500'
    },
    listingItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20
    }
})
