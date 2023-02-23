// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    ratingIconContainer: {
        paddingRight: 3
    },
    ratingIcon: {
        width: 23,
    },
    writeRatingIcon: {
        width: 35,
    },
})
