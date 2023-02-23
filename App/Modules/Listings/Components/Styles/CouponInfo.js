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

    imageContainer: {
        ...Layout.itemCentral,
        width: couponImageWidth,
        flexDirection: 'column',
        padding: imgPadding
    },

    couponContainer: {
        width: width,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        zIndex: 20
    },
    contentsInnerContainer: {
        ...Layout.itemCentral,
        width: width,
        flexDirection: 'row',
    },
    couponInnerContainer:{
        height: couponInfoHeight + (imgPadding*2),
        marginBottom: 3,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    couponImageContainer: {
        height: couponInfoHeight + (imgPadding*2),
        backgroundColor: Colors.black,
        paddingVertical: Fonts.size.medium
    },
    couponIconImg: {
        width: ((couponInfoHeight/3)*2) - couponImageMinusWidth,
        height: ((couponInfoHeight/3)*2) - couponImageMinusWidth
    },
    exclusiveLogoImg:{
        width: 82,
        height: 20,
        marginTop: 8
    },
    logoImg: {
        width: ((couponInfoHeight/3)*2) + ((imgPadding - 5 )*2),
        height: couponInfoHeight/3,
    },
    logoText: {
        paddingTop: Metrics.mediumPadding,
        color: Colors.lighterGrey,
        fontWeight: '500',
        fontSize: Fonts.size.small
    },
    couponContentContainer: {
        height: couponInfoHeight + (imgPadding*2),
        padding: imgPadding,
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
    greyBlueText: {
        color: Colors.blueGrey
    },
    contentDetailText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },

    buttonContainer: {
        backgroundColor: Colors.snow,
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    showButton: {
        maxWidth: Metrics.maxModalWidth,
        height: Metrics.smallButtonHeight,
        paddingHorizontal: Metrics.basePadding,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.lighterBorder
    },
    showText: {
        color: Colors.blue,
        fontSize: 14,
        fontWeight: '500'
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
