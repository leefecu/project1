// @flow

import {Dimensions, Platform, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    singleBtn: {
        ...Layout.textBottomAlign,
        ...Layout.textMiddleAlign,
        padding: 10,
    },
    multiBtn: {
        ...Layout.textBottomAlign,
        ...Layout.textMiddleAlign,
        paddingHorizontal: 5,
        paddingVertical: 10
    },

})
