// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: Metrics.baseMargin
    },
    icon: {
        marginRight: 4
    },
    dot: {
        marginRight: Metrics.smallMargin,
        position: 'relative',
        top: 6
    },
    itemText: {
        color: Colors.grey3,
        fontSize: Fonts.size.small
    },
    linkText: {
        color: Colors.blue,
        fontSize: Fonts.size.small,
        textDecorationLine: 'underline'
    },
})
