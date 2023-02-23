// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

const imgPadding = ((width / 4 * 3 ) * 0.11) * 2
const imgContainerHeight = ( width / 4 * 3 ) - ( (imgPadding) * 2)
const logoImgWidth = (width/2)
const exclusiveIconImgWidth = (width/3)

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.silver,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder
    },
    savedContainer: {
        marginBottom: Metrics.detailFooterHeight + Metrics.basePadding
    },
    innerContainer:{
        backgroundColor: Colors.snow,
        marginBottom: Metrics.rowMargin,
        borderBottomWidth: Platform.OS === 'ios' ? 0 : 0.5,
        borderBottomColor: Colors.lightBorder,
    },
    bottomInnerContainer:{
        marginBottom: Metrics.doubleBaseMargin
    },
    imageContainer: {
        ...Layout.itemCentral,
        backgroundColor: Colors.black,
        width: width,
        height: imgContainerHeight + (imgPadding * 2),
        padding: imgPadding,
        flexDirection: 'column'
    },
    couponImg: {
        width: (imgContainerHeight/3) * 2,
        height: (imgContainerHeight/3) * 2
    },
    couponWOFImg: {
        marginLeft: 20,
    },
    logoImgContainer: {
        paddingTop: 2
    },
    logoImg: {
        width: logoImgWidth,
        height: (imgContainerHeight/3),
        marginTop: Metrics.rowMargin
    },
    exclusiveIconImgWidth: {
        width: exclusiveIconImgWidth,
        height: (imgContainerHeight/3)
    },
    logoText: {
        paddingTop: Metrics.rowMargin,
        color: Colors.lighterGrey,
        fontWeight: '500',
        fontSize: Fonts.size.h4 - 1
    },


    contentBlock: {
        paddingHorizontal: Metrics.baseMargin,
    },
    nameContainer: {
        paddingTop: Metrics.doubleBaseMargin
    },
    nameText: {
        color: Colors.black,
        textAlign:'center',
        fontSize: Fonts.size.h5
    },

    workshopNameContainer: {
        paddingTop: Metrics.mediumPadding
    },
    workshopNameText: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.medium
    },

    priceContainer: {
        paddingVertical: Metrics.mediumLargePadding - 3
    },
    exclusivePrice: {
        fontSize: Fonts.size.h5,
        fontWeight: '500',
        letterSpacing: -0.8
    },
    suburbTextContainer: {
        borderBottomWidth: 0,
        borderBottomColor: Colors.border,
        paddingBottom: Metrics.doubleBaseMargin
    },
    suburbText:{
        fontSize: Fonts.size.smallMedium + 1,
        color: Colors.blueGrey
    },
    couponPriceContainer: {
        justifyContent: 'flex-end'
    },

    multiInfoTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },

    rowContainer: {
        width: width,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.basePadding,
        flexDirection: 'column'
    },

    listItemRowInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    listItemText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },
    descUlItem: {
        width: width,
        flexDirection: 'row',
        paddingTop: Metrics.smallerMargin
    },
    
    branchInfoText: {
        color: Colors.brandColor,
        fontWeight: '500',
    },

    shadow: {
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
    }
})
