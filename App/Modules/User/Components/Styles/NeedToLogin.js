// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    applicationView: {
        flex: 1
    },
    container: {
        backgroundColor: Colors.snow,
        flex: 1,
        position: 'absolute',
        left: 0,
        top: -Metrics.navBarHeight,
        height: height,
        width: width,
        padding: 20,
        ...Layout.itemCentral
    },
    innerContainer: {
        //padding: Metrics.doubleBaseMargin,
        ...Layout.itemCentral
    },
    imageContainer: {
        paddingTop: Metrics.basePadding,
        paddingBottom: Metrics.doubleBaseMargin,
    },
    logo: {
        width: width * 0.7
    },
    textContainer: {
        width: width - (Metrics.doubleBaseMargin *2),
        paddingLeft: Metrics.basePadding,
        paddingRight: Metrics.basePadding
    },
    title: {
        color: Colors.brandColor,
        textAlign: 'center',
        fontSize: Fonts.size.h4,
        fontWeight: '300',
        paddingLeft: Metrics.basePadding,
        paddingRight: Metrics.basePadding,
        paddingBottom: 8
    },
    subTitle: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.medium,
        textAlign: 'center',
        fontSize: Fonts.size.medium+1,
        paddingLeft: Metrics.mediumLargePadding,
        paddingRight: Metrics.mediumLargePadding,
    },
    buttonContainer: {
        ...Layout.itemCentral,
        width: width,
        paddingHorizontal: Metrics.basePadding,
        paddingTop: Metrics.doubleBaseMargin,
    },
    showButton: {
        width: width - (Metrics.doubleBaseMargin),
        maxWidth: Metrics.maxModalWidth,
        height: Metrics.largeButtonHeight,
        backgroundColor: Colors.primaryPink,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
    },
    showText: {
        fontSize: Fonts.size.input,
        color: Colors.snow,
        fontWeight: '500'
    },
})
