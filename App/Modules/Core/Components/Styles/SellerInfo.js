// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.detailGreyBg,
        paddingBottom: Platform.OS === 'ios' ? 4 : 19
    },

    innerContainer: {
        width: width,
        marginBottom: 8,
        backgroundColor: Colors.snow,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },

    shadow: {
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
    },
    
    sellerContainer: {
        //paddingVertical: Metrics.basePadding
    },
    sellerRowContainer: {
        width: width,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingVertical: Metrics.basePadding
    },
    sellerRowInnerContainer: {
        height: Metrics.sortingColumnHeight,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.smallerPadding
    },
    sellerContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    sellerText: {
        fontSize: Fonts.size.smallMedium+1
    },
    sellerContentText: {
        color: Colors.black
    },
    imgStyleContainer: {
        ...Layout.itemCentral,
        flexDirection: 'row',
    },
    imgStyle: {
        height: 20,
        marginRight: Metrics.basePadding
    },
    sellerLinkText: {
        color: Colors.blue,
        fontWeight: '500'
    }
})
