// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    text: {
        fontSize: Fonts.size.tiny,
        color: Colors.grey2
    },
    imageContainer: {
        marginLeft: Metrics.smallMargin,
        ...Layout.itemCentral
    }
})
