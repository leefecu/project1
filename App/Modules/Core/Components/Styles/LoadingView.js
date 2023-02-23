// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        position: 'absolute',
        left: 0,
        top: -Metrics.navBarHeight,
        height: height,
        width: width,
        ...Layout.itemCentral
    }
})
