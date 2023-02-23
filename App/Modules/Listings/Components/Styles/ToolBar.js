// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window
const viewTypeWidth = 50

export default StyleSheet.create({
    container: {
        ...Layout.itemCentral,
        height: Metrics.toolBarHeight,
        backgroundColor: Colors.snow,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.1,
    },
    innerContainer: {
        ...Layout.itemCentral,
        flex:1,
        width: width, 
        height: Metrics.toolBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingHorizontal: Metrics.basePadding,
        paddingBottom: Metrics.smallMar
    },
    sortbyRefineContainer: {
        width: width - (Metrics.basePadding * 2) - viewTypeWidth,
        flexDirection: 'row'
    },
    seperator: {
        width: 1,
        height: 25,
        marginHorizontal: 5,
        borderLeftWidth: 1,
        borderLeftColor: Colors.border
    },
    dropdownLabel: {
        ...Layout.itemCentral,
        paddingHorizontal: Metrics.basePadding,
        position: 'relative',
        flexDirection: 'row',
        flex: 1
    },
    locationColumn: {
        ...Layout.itemCentral,
        flex: 0.11,
        borderRightWidth: 0.5,
        borderRightColor: Colors.border,
        paddingHorizontal: width <= Metrics.minimumDeviceWidth ? Metrics.smallerMargin : 0
    },
    sortingColumn: {
        ...Layout.itemCentral,
        flex: 0.5,
        height: Metrics.sortingColumnHeight,
        paddingLeft: Metrics.smallPaddings,
    },
    sortingText: {
        color: Colors.blue,
        fontWeight: '600',
    },
    optionColumn: {
        ...Layout.itemCentral,
        flex: 0.5,
        paddingVertical: 5,
    },
    optionText: {
        color: Colors.brandColor,
        marginLeft: Metrics.smallMargin
    },
    toolbarText: {
        //paddingLeft: Metrics.smallerMargin,
        color: Colors.brandColor,
        fontSize: Fonts.size.medium,
        fontWeight: Platform.OS === 'ios' ? '600' : '600'
    },
    optionIcon: {
        width: Metrics.icons.smaller,
    },
    optionPosition: {
        position: 'absolute',
        top: 1,
        right: -8
    },
    viewTypeContainer: {
        paddingRight: Metrics.smallPaddings,
        justifyContent: 'flex-start'
    },
    viewTypeInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: viewTypeWidth
    },
    viewTypeImgContainer: {
        paddingRight: 5
    },
    viewTypeImg: {
        height: 20,
    },
    seperatorRight: {
        borderRightWidth: 1,
        borderRightColor: Colors.seperatorBorder
    }
})
