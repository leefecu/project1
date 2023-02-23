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
        height: height - (Metrics.navBarHeight*2),
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
        paddingTop: Metrics.section,
        paddingBottom: Metrics.toolBarHeight,
        paddingHorizontal: Metrics.basePadding
    },
    title: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalIconContainer: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: Colors.brandColor,
        fontSize: Fonts.size.regular-1,
        paddingTop: 15
    },
    descDatails: {
        paddingLeft: Metrics.smallPadding,
        paddingRight: Metrics.smallPadding
    },
    descUlContainer: {
        paddingTop: 10,
        paddingLeft: 0,
        flex: null
    },
    descUlItem: {
        paddingTop: Metrics.smallerMargin
    },
    subDescContainer: {
        justifyContent: 'center',
        paddingBottom: Metrics.basePadding
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
        //paddingVertical: Metrics.mediumLargePadding,
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
    }
})
