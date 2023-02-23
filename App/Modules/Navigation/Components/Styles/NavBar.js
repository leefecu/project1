// @flow

import {Dimensions, Platform, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const navW = Platform.OS === 'ios' ? width-18 : width-(Metrics.basePadding*3)
const navH = Platform.OS === 'ios' ? Metrics.navBarHeight-24 : Metrics.navBarHeight-10

export default StyleSheet.create({
    container: {
        height: navH
    },
    iosContainer: {
        width: navW,
    },
    detailContainer: {
        width: navW,
        backgroundColor: Colors.brandColor
    },
    showroomContainer: {
        width: navW,
    },
    innerContainer: {
        height: navH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: Platform.OS === 'ios' ? 'stretch' : 'center',
    },
    navButtonLeftContainer: {
        width: 40,
        height: 37,
        justifyContent: 'center'
    },
    navButtonLeftInnerContainer: {
        //paddingTop: Platform.OS === 'ios' ? 3.5 : 6,
        paddingLeft: Platform.OS === 'ios' ? Metrics.smallestMargin : 0,
    },
    navButtonLeftImg: {
        marginLeft: 0
    },
    navButtonRightContainer: {
        position: 'absolute',
        right: Platform.OS === 'ios' ? 0 : 10
    },
    navButtonRight: {
        marginRight: Metrics.smallMargin,
        backgroundColor: Colors.transparent,
        width: Metrics.icons.medium
    },

    searchBar: {
        backgroundColor: Colors.snow,
        borderRadius: navH/2,
        position: 'absolute',
        //marginTop: Metrics.smallMargin,
        ...Platform.select({
            ios: {
                top: 0,
            },
            android: {
                top: 0,
            },
        }),
        left: Platform.OS === 'ios' ? 37 : 40,
        right: 0,
        width: Platform.OS === 'ios' ? width > 413 ? width-120 : width - 110 : width - 120,
        zIndex: 400,
    },
    onlyLeftNavButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 10
    },
    titleContainer: {
        ...Layout.itemCentral,
        width: navW,
        height: 37,
    },
    detailTitleContainer: {
        paddingHorizontal: Metrics.sortingColumnHeight,
    },
    showroomTitleContainer: {
        paddingLeft: Metrics.sortingColumnHeight
    },
    showroomDetailTitleContainer: {
        paddingHorizontal: Metrics.sortingColumnHeight
    },
    titleText: {
        color: Colors.snow,
        fontSize: 16,
        fontWeight: '600'
    },
    savedIcon: {
        width: Metrics.icons.medium,
        height: 37,
        zIndex: 30,
        position: 'absolute',
        right: 0
    },
    favouriteIconContainer: {
        width: 30,
        height: 30
    },
    favouriteIconInnerContainer: {
        marginRight: 0,
        paddingVertical: 5,
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    favouriteIcon: {
        width: 24,
        height: 24,
    },
})
