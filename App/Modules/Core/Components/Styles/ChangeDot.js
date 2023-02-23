// @flow

import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        width: 8,
        height: 8,
        ...Layout.itemCentral
    },
    dot:{
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: Colors.primaryPink
    }
})