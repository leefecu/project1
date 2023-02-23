// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        width: 32,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: Colors.black,
        backgroundColor: Colors.snow,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.black,
        fontSize: Fonts.size.smaller,
        fontWeight: '400'
    }
})
