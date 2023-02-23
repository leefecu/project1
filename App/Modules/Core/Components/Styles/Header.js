// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.brandColor,
        width: width,
        height: Metrics.navBarHeight,
        borderBottomWidth: 0,
        ...Layout.itemCentral,
    },
    innerContainer: {
        ...Layout.horizontalRow,
        ...Layout.itemStretch,
        width: width,
    	paddingTop: 20
    },
    headerContents: {
    	...Layout.textMiddleAlign
    },
    leftContainer: {
    	alignItems: 'flex-start'
    },
    rightContainer: {
        ...Layout.horizontalRow,
        paddingRight: 5
    },
    searchKeywordContainer: {
        flex:1
    },
    titleContainer: {
    	alignItems: 'flex-end',
    },
    titleTxt: {
    	color: Colors.snow,
        fontSize: Fonts.size.medium+1,
        alignItems: 'center'
    },
    backButtonImg: {
        //width: Metrics.icons.medium,
    },
    shareButtonTxt: {
    	color: Colors.snow,
    },
    regionContainer: {
        ...Layout.horizontalRow,
        ...Layout.textBottomAlign,
        ...Layout.textMiddleAlign,
    }
})
