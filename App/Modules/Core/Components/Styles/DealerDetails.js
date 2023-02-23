// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const contentH = height - Metrics.bottomNavBarHeight - Metrics.navBarHeight - Metrics.bottomButtonBarHeight - Metrics.images.large
const profileSize = 65

export default StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingHorizontal: Metrics.basePadding,
        paddingTop: Metrics.basePadding
    },

    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 4,
        shadowOpacity: 0.2,
    },

    dealerContainer: {
        height: profileSize + (Metrics.basePadding*2),
        paddingBottom: Metrics.basePadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        padding: 0,
        margin: 0
    },
    dealerImgContainer: {
        position: 'relative',
        width: profileSize,
        height: profileSize,
        borderRadius: 100,
    },
    profileImg: {
        width: profileSize,
        height: profileSize,
        borderRadius: profileSize/2,
    },

    dealerInfoContainer: {
        flexDirection: 'column',
        width: width-(Metrics.basePadding*2)-profileSize,
        paddingLeft: Metrics.largePadding
    },
    dealerInfoRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dealerPhoneContainer: {
        paddingVertical: Metrics.mediumPadding,
    },
    iconContainer: {
        paddingRight: Metrics.smallPadding
    },
    dealerInfoIcon:{
        width: 15,
        height: 15
    },
    dealerInfoText: {
        fontSize: 13,
        fontWeight: '500'
    },

    backgroundImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    noImageBackgroundContainer: {
    	backgroundColor: Colors.inactiveGreyBg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //marginRight: Metrics.baseMargin,
        position: 'relative'
    },
    blueText: {
        color: Colors.blue
    },
    noPadding: {
        padding: 0
    },
    noBottomBorder: {
        borderBottomWidth: 0,
        paddingBottom: 0
    },
    /*shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 2,
        shadowOpacity: 0.3,
    }*/
})