// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
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
    topTitleContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    titleContainer: {
        height: Metrics.detailFooterHeight,
        paddingBottom: 5,
        paddingHorizontal: Metrics.basePadding,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    titleText: {
        color: Colors.darkBlueGrey,
        fontWeight: 'bold',
        fontSize: 13,
    },

    rowContainer: {
        width: width,
        flexDirection: 'column'
    },

    overviewContainer: {
        paddingBottom: Metrics.mediumLargePadding
    },

    overviewRowContainer: {
        width: width,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.smallerPadding
    },
    overviewContentContainer: {
        height: Metrics.detailFooterHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    overviewText: {
        fontSize: Fonts.size.smallMedium+1
    },
    overviewTitleText: {
        color: Colors.blueGrey,
    },
    overviewContentText: {
        color: Colors.black
    },
    fuelImgContainer: {
        marginTop: Metrics.baseMargin
    },
    imgStyle: {
        width: 130,
        height: 43
    },
    fuelInfoText: {
        fontSize: Fonts.size.smallMedium,
        textAlign: 'right'
    },

    featuresContainer: {
    },
    featuresRowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    featuresRowInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: Metrics.mediumLargePadding+6,
        paddingHorizontal: Metrics.basePadding,
        flexWrap: 'wrap'
    },
    featuresRowItem: {
        width: (width-(Metrics.basePadding*2))/2,
        marginTop: 0,
        paddingTop: Metrics.mediumLargePadding,
    },
    featuresText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },

    addtionalDetailsContainer: {
        paddingBottom: Metrics.mediumLargePadding
    },
    addtionalRowContainer: {
        width: width,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.smallerPadding,
        flexWrap: 'wrap'
    },
    addtionalRowInnerContainer: {
        paddingVertical: 6,
        backgroundColor: Colors.snow
    },
    addtionalDetailsText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black,
        lineHeight: width <= 320 ? 20 : 20 + Metrics.addSize
    },
    viewsContainer: {
        backgroundColor: Colors.detailGreyBg,
        paddingVertical: Metrics.basePadding,
        marginBottom: 0,
        borderBottomWidth: 0,
    },
    viewRowContainer:{
        ...Layout.itemCentral,
        width: width,
        flexDirection: 'row',
        paddingTop: 2,
        paddingBottom: Metrics.basePadding,
    },
    viewText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.blueGrey
    },

    noTopBorder: {
        borderTopWidth: 0
    },

    viewMoreText: {
        color: Colors.blue,
        fontWeight: '600',
        marginTop: Metrics.smallMargin,
        textDecorationLine: 'underline',
    },
    upcomingText: {
        color: Colors.primaryPink
    }

})
