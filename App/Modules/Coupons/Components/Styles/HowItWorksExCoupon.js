// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const couponInfoHeight = 90
const couponImageWidth = width <= 320 ? 100 : width <= 375 ? 120 : 160
const imgPadding = couponImageWidth * 0.1
const couponImageMinusWidth = width <= 320 ? 10 : 5

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.detailGreyBg,
        paddingBottom: Platform.OS === 'ios' ? 5 : 20
    },

    innerContainer: {
        width: width,
        position: 'relative',
    },

    topTitleContainer: {
        marginTop: -8
    },

    titleContainer: {
        height: Metrics.detailFooterHeight,
        paddingBottom: 5,
        paddingHorizontal: Metrics.basePadding,
        backgroundColor: Colors.snow,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex: 30
    },
    titleText: {
        color: Colors.darkBlueGrey,
        fontWeight: 'bold',
        fontSize: Fonts.size.smallMedium, 
    },

    imageContainer: {
        ...Layout.itemCentral,
        width: couponImageWidth,
        flexDirection: 'column',
        padding: imgPadding
    },

    contentsInnerContainer: {
        ...Layout.itemCentral,
        width: width,
        flexDirection: 'row',
    },
    howitworksStepsContainer: {
        padding: Metrics.basePadding,
    },
    contentDescContainer: {
        width: width - couponImageWidth,
        backgroundColor: Colors.snow,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    contentDescInnerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    contentHeaderText: {
        fontSize:  Fonts.size.medium,
        fontWeight: Platform.OS === 'ios' ? '500' : '400',
        color: Colors.black
    },
    contentDetail: {
        paddingTop: Metrics.smallerPadding
    },

    contentDetailText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },

    howitworksContainer: {
        marginBottom: 8,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    howitworksContentContainer: {
        width: width,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingVertical: Metrics.basePadding,
        backgroundColor: Colors.snow,
        zIndex: 20
    },
    howitworksImageContainer: {
        backgroundColor: Colors.snow,
    },
    howitworksIconImgS: {
        width: couponImageWidth/2.5
    },
    howitworksIconImg: {
        width: couponImageWidth/1.5
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
    },

    bold: {
        fontWeight: Platform.OS === 'ios' ? 'bold' : '400'
    }

})
