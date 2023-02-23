// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window
const labelW = 48
const labelH = 14
const couponImageWidth = width <= 320 ? 100 : width <= 375 ? 130 : 140
const minHeight = ((couponImageWidth * 3) / 4 ) + 15


const imgWidth = width <= 320 ? 100-20 : width <= 375 ? 130-20 : 140-20
const imgHeight = minHeight - 20
// detect 4S
var factor = window.height < 500 ? 3 : 4
// detect 6Plus
factor = window.width > 410 ? 4.4 : factor

var listHeight = ((window.height - 104) - 4 * 5) / factor
var contactHeight = ((window.height - 64) - 4 * 5)
var noConnectWidth = window.width - 20

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        minHeight: minHeight,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    exclusiveContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        minHeight: minHeight,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    imageContainer: {
        backgroundColor: Colors.imageGreyBg,
        width: couponImageWidth,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    workshopLogoContainer: {
        paddingTop: Metrics.basePadding
    },
    workshopLogoImgContainer: {
        //width: Metrics.couponImageWidth-30
    },
    workshopLogoImg: {
        width: imgWidth - (Metrics.basePadding * 2),
        height: (imgHeight/3) - 5,
    },
    imageWithLogoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: couponImageWidth,
    },
    partneredShops: {
        backgroundColor: Colors.imageGreyBg,
    },
    privateShops: {
        backgroundColor: Colors.snow,
        borderRightColor: Colors.border,
        borderRightWidth: 1
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10
    },
    noImage: {
        zIndex: 9,
        width: imgWidth * 0.8,
        height: imgHeight * 0.8,
        flex: 1
    },
    labelImage: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        //alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: Metrics.mediumPadding
    },
    couponTitleShopInfoContainer: {
        flexDirection: 'column',
    },
    horizontalRow: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    marginRow: {
        marginBottom: Metrics.smallerMargin
    },
    couponTitleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: Metrics.smallerPadding
    },
    couponTitle: {
        flex: width <= 320 ? 0.85 : 0.9,
    },
    savedIcon: {
        width: 30,
        height: 30,
        zIndex: 30
    },
    favouriteIconContainer: {
        width: 30,
        height: 30
    },
    favouriteIconInnerContainer: {
        marginRight: -10,
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
    name: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
        color: Colors.black,
        fontSize: Fonts.size.smallMedium+1,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal'
    },
    shopNewRow: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },  
    workshopName: {
        marginRight: Metrics.smallMargin
    },
    workshopNameText: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.small,
        fontWeight: '400',
        fontStyle: 'italic',
    },
    couponDatailInfo: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingTop: Metrics.largePadding
    },
    redeemText: {
        color: Colors.inactiveGreyText,
        fontSize: Fonts.size.smallMedium,
        fontWeight: Platform.OS === 'ios' ? '500' : 'normal'
    },
    categoryColumn: {
        marginRight: Metrics.smallMargin
    },
    regionColumn: {
        paddingLeft: Metrics.mediumPadding
    },
    wrenchIcon: {
        width: 16,
        height: 16
    },
    mapIcon: {
        width: 12,
        height: 16
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: Metrics.smallerMargin
    },
    shopNameText: {
        fontSize: Fonts.size.small,
    },
    infoText: {
        color: Colors.grey6,
        fontSize: Fonts.size.small,
        width: width >= Metrics.iphone6plusWidth ? 65 : 60
    },
    regionText: {
        color: Colors.suburbText,
        fontSize: Fonts.size.small,
        fontWeight: '400',
    },
    labelContainer: {
        alignItems: 'center',
        height: 20,
        width: couponImageWidth,
        ...Layout.itemCentral
    },
    featureLabel: {
        ...Layout.itemCentral,
        flex: 1,
        position: 'absolute',
        top: 4,
        left: 0,
        zIndex: 30,
        flexDirection: 'column'
    },
    featureLabelBackgroundContainer: {
        width: labelW + 8,
        height: labelH,
        borderTopRightRadius: labelH/2,
        borderBottomRightRadius: labelH/2
    },
    awesomeLabelBg: {
        backgroundColor: Colors.mint
    },
    expiredLabelBg: {
        width: labelW,
        backgroundColor: Colors.redBrown,
    },
    featureLabelTextContainer:{
        width: labelW + 8,
        height: labelH,
        position: 'absolute',
        top: 0,
        left: -1.3,
        zIndex: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    exporedLabelTextStyle: {
        width: labelW,
    },
    featureLabelText: {
        color: Colors.snow,
        fontSize: Fonts.size.smaller - 1,
        fontWeight: '600',
        backgroundColor: 'transparent'
    },
    awesomeLabel: {
        fontWeight: '700',
        letterSpacing: -0.2
    },

    couponItemContainer: {
        width: width,
        flex: 1,
        minHeight: minHeight
    },
    soldItemContainer: {
        position: 'relative',
        width: width,
        flexDirection: 'column'
    },
    soldItemCover: {
        width: width,
        minHeight: minHeight,
        flexDirection: 'column',
        ...Layout.itemCentral,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    soldItemTextContainer: {
        width: width,
        paddingBottom: Metrics.rowMargin,
    },
    soldItemText: {
        color: Colors.snow,
        textAlign: 'center'
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
        fontSize: 14,
        fontWeight: '500'
    },
    couponItem: {
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20
    },

    /* Exclusive Coupon list style*/
    exclusiveImageContainer: {
        //...Layout.itemCentral,
        width: imgWidth + (Metrics.basePadding*2),
        height: imgHeight + (Metrics.basePadding*2),
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Metrics.basePadding,
        backgroundColor: Colors.black,
        paddingVertical: Fonts.size.medium
    },
    exclusiveTopIconContainer: {
        ...Layout.textTopAlign,
        ...Layout.textCenterAlign,
        width: ((imgHeight/3)*2),
        height: ((imgHeight/3)*2)
    },
    exclusiveIconImg: {
        width: ((imgHeight/3)*2) - 10,
        height: ((imgHeight/3)*2) - 10
    },
    exclusiveLogoImg: {
        width: imgWidth - (Metrics.basePadding * 2),
        height: (imgHeight/3) - 5,
    },
    exclusiveCouponName: {
        fontSize: Fonts.size.smallMedium,
        color: Colors.lightGrey
    },
    exclusiveCouponCode: {
        fontSize: Fonts.size.small,
        letterSpacing: 2,
        fontWeight: '600'
    },
    exclusiveText: {
        fontSize: Fonts.size.small,
        color: Colors.brandColor,
        fontWeight: '600'
    },
    exclusiveExpiredText: {
        fontSize: Fonts.size.small,
        color: Colors.red,
        fontWeight: '600'
    },
    exclusiveRedeemText: {
        color: Colors.blue,
        fontSize: Fonts.size.small,
        fontWeight: '600'
    },
    exclusivePriceText: {
        color: Colors.blue,
        fontSize: Fonts.size.h4,
        fontWeight: '600',

    },
})
