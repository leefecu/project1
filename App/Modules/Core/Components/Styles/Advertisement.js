// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

const cardWidth = width- (Metrics.basePadding*2)
const cardHeight = (cardWidth*0.618)

export default StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: cardHeight
    },
    innerContainer: {
    	...Layout.itemCentral,
    	width: width
    },
    adImg: {
        width: cardWidth,
        height: cardHeight
    }
})
