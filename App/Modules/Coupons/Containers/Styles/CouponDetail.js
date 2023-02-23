// @flow

import DeviceInfo from 'react-native-device-info'
import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: Metrics.mediumButtonHeight + (Metrics.basePadding*2) + 1
    },
    imageSlideContainer: {
        backgroundColor: Colors.snow,
        paddingBottom: Metrics.doubleBaseMargin * 2
    },
    singleImageSlideContainer: {
        backgroundColor: Colors.snow,
        paddingBottom: Metrics.doubleBaseMargin
    },
    innerContainer:{
        backgroundColor: Colors.snow,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder,
        marginBottom: Metrics.rowMargin
    },
    contactContainer: {
        backgroundColor: "transparent",
        marginBottom: 0,
        borderBottomWidth: 0,
    },
    contentBlock: {
        paddingHorizontal: Metrics.baseMargin,
    },
    smallSeperatorStyle: {
        width: width - ( Metrics.baseMargin*2 ),
        height: 1,
        margin: Metrics.smallMargin
    },
    seperatorStyle: {
        width: width - ( Metrics.baseMargin*2 ),
        height: 1,
        margin: Metrics.baseMargin
    },
    seperatorGStyle: {
        backgroundColor: Colors.couponBG,
    },
    nameContainer: {
        //paddingTop: Metrics.basePadding
    },
    nameText: {
        color: Colors.black,
        textAlign:'center',
        fontSize: Fonts.size.h5
    },
    workshopNameContainer: {
        paddingTop: Metrics.mediumPadding,
        justifyContent: 'center'
    },
    workshopNameText: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.medium,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
        fontStyle: 'italic',
    },
    priceContainer: {
        paddingVertical: Metrics.mediumLargePadding - 3
    },

    suburbTextContainer: {
        borderBottomWidth: 0,
        borderBottomColor: Colors.border,
        paddingBottom: Metrics.doubleBaseMargin
    },
    suburbText:{
        fontSize: Fonts.size.smallMedium + 1,
        color: Colors.suburbText,
        fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
    },
    couponPriceContainer: {
        justifyContent: 'flex-end'
    },

    titleContainer: {
        height: Metrics.detailFooterHeight,
        paddingBottom: 5,
        paddingHorizontal: Metrics.basePadding,
        backgroundColor: Colors.snow,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    titleText: {
        color: Colors.darkBlueGrey,
        fontWeight: 'bold',
        fontSize: 13, 
    },
    rightTitleInfoText: {
        color: Colors.brandColor,
        fontWeight: '500',
    },
    multiInfoTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },


    rowContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingHorizontal: Metrics.basePadding,
        paddingBottom: Metrics.doubleBaseMargin
    },


    shareButtonText: {
        fontSize: Fonts.size.medium
    },
    infoLabel: {
        color: Colors.grey6,
        fontSize: Fonts.size.small,
        marginBottom: Metrics.smallMargin
    },
    offInfoLabel: {
        color: Colors.grey6,
        fontSize: Fonts.size.small,
        fontWeight: '600',
        marginBottom: Metrics.smallMargin
    },

    listItemRowInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    listItemRow: {
        width: width-(Metrics.basePadding*2),
        marginTop: 0,
        paddingTop: Metrics.basePadding,
    },
    listItemText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },

    pricenowText: {
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: 'bold'
    },
    originalText: {
        color: Colors.brandColor,
        fontSize: Fonts.size.medium
    },
    discountText: {
        color: Colors.red,
        fontSize: Fonts.size.medium
    },
    lineThrough: {
        textDecorationLine: 'line-through'
    },
    redeemCountText: {
        color: Colors.blue,
        fontSize: Fonts.size.medium
    },
    suburb: {
        color: Colors.brandColor,
        fontSize: Fonts.size.smallMedium,
    },
    leftButton: {
        height: 45,
        marginRight: Metrics.smallMargin
    },
    rightButton: {
        height: 45,
        marginLeft: Metrics.smallMargin
    },
    shareButton: {
        height: 45,
    },
    listTitle: {
        fontSize: Fonts.size.medium,
        fontWeight: 'bold',
        color: Colors.lightGrey
    },
    listDesc: {
        paddingLeft: 0
    },

    mapContainer:  {
        position: 'relative',
        height: Dimensions.get('window').width / 16 * 9,
    },
    
    map: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 16 * 9
    },
    
    titleStyle: {
        fontWeight: '600'
    },
    descriptionsText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },
    subDescText: {
        textAlign: 'center',
        color: Colors.darkBlueGrey,
        fontStyle: 'italic',
        fontWeight: '500',
        padding: Metrics.mediumLargePadding
    },
    callModalText: {
        color: Colors.black
    },
    modalIcon: {
        width: width/1.5,
        height: 80
    },

    viewsContainer: {
        backgroundColor: Colors.detailGreyBg,
        paddingVertical: Metrics.basePadding
    },
    viewRowContainer:{
        width: width,
        flexDirection: 'row',
        ...Layout.itemCentral,
        paddingTop: 2,
        paddingBottom: Metrics.basePadding,
        paddingVertical: Metrics.mediumLargePadding,
    },
    viewText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.blueGrey
    },
    linkText: {
        color: Colors.blue,
        fontWeight: '500'
    },

    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.border
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

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },

    iphoneXStyle: {
        paddingBottom: DeviceInfo.getModel() === 'iPhone X' ? Metrics.largePadding : 0
    },

    reviewButtonContain: {
        //paddingRight: Metrics.smallMargin,
        //backgroundColor: Colors.brandColor
    },
    callButtonContain: {
        //backgroundColor: Colors.primaryPink,
        //paddingLeft: Metrics.smallMargin
    },
    reviewButton: {
        backgroundColor: Colors.brandColor
    },
    callButton:{
        backgroundColor: Colors.primaryPink,
    },

})
