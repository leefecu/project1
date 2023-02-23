// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        width: 65,
        height: 38,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        paddingRight: 5,
    },
    text: {
        ...Fonts.smallBold,
        color: Colors.snow
    }
})
