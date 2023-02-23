// @flow

import {StyleSheet, Dimensions} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const imgSize = 32

export default StyleSheet.create({
    applicationView: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    tabIcon: {
        width: imgSize,
        height: imgSize,
    },
    changeDotContainer: {
        height: 5,
        position:'absolute',
        right: -5,
        top: -5,
        zIndex: 100
    }
})
