// @flow

import {
    Dimensions, 
    Platform,
    StyleSheet } from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        top: 0,
        height: height,
        width: width,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    innerContainer: {
        padding: Metrics.baseMargin,
        height: height,
        width: width,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        maxWidth: Metrics.maxModalWidth,
        width: width <= Metrics.maxModalWidth+(Metrics.basePadding*2) ? width - (Metrics.basePadding*2) : Metrics.maxModalWidth,
        borderRadius: 6,
        position: 'relative',
        backgroundColor: Colors.snow,
        paddingTop: Metrics.mediumLargePadding,
        paddingBottom: Metrics.toolBarHeight
    },
    title: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Metrics.basePadding,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border
    },
    titleText: {
        color: Colors.brandColor,
        fontSize: Fonts.size.regular-1,
        paddingBottom: Metrics.mediumLargePadding,
    },
    descDatails: {
        paddingHorizontal: Metrics.basePadding,
        paddingVertical: Metrics.doubleBaseMargin
    },
    
    descContent:{
        alignItems: 'center'
    },
    ratingContainer: {
        width: width-(Metrics.basePadding*2)-(Metrics.largePadding*2),
        maxWidth: Metrics.maxModalWidth-(Metrics.basePadding*2)-(Metrics.largePadding*2)
    },
    contentTitle:{
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ratingIconsContainer: {
        paddingVertical: Metrics.largePadding,
        alignItems: 'center'
    },

    commentTextContainer: {
        paddingTop: Metrics.largePadding
    },
    commentBox: {
        width: width-(Metrics.basePadding*2)-(Metrics.largePadding*2),
        maxWidth: Metrics.maxModalWidth-(Metrics.basePadding*2)-(Metrics.largePadding*2),
        height: 90,
        borderWidth:1,
        borderColor: Colors.border,
        borderRadius: 5

    },

    bottomTextContainer:{
        paddingTop: Metrics.smallMargin,
        alignItems: 'flex-end'
    },
    bottomText: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.smaller
    },

    footer: {
        width: width <= Metrics.maxModalWidth+(Metrics.basePadding*2) ? width - (Metrics.basePadding*2) : Metrics.maxModalWidth,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        ...Layout.itemCentral,
        position: 'absolute',
        bottom: 0,
        left:0,
    },
    buttonContainer: {
        width: width <= Metrics.maxModalWidth+(Metrics.basePadding*2) ? width - (Metrics.basePadding*2) : Metrics.maxModalWidth,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        flexDirection: 'row',
        ...Layout.itemCentral,
    },
    buttonInnerContainer: {
        height: Metrics.toolBarHeight,
        ...Layout.itemCentral,
    },
    cancelContainer: {
        borderLeftWidth: 1,
        borderLeftColor: Colors.border,
    },
    buttonText: {
        fontSize: Fonts.size.regular,
        fontWeight: '500'
    },
    cancelText: {
        color: Colors.brandColor,
    },
    confirmText: {
        color: Colors.blue,
    },
    errorMsg: {
        color: Colors.red,
        fontSize: Fonts.size.small,
        fontWeight: '600',
        marginTop: Metrics.smallMargin
    }
})
