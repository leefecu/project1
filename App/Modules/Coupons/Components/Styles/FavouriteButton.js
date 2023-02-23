// @flow

import {
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native'
import { Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

let window = Dimensions.get('window')
const {height, width} = window

export default StyleSheet.create({
    favouriteIconContainer: {
        width: Metrics.icons.medium,
        height: Metrics.icons.medium,
        backgroundColor: Colors.transparent,
        position: 'relative'
    },
    favouriteIcon: {
        width: Metrics.icons.medium,
        height: Metrics.icons.medium
    },
    descriptionsText: {
        fontSize: Fonts.size.smallMedium
    },
    subDescText: {
        textAlign: 'center',
        color: Colors.darkBlueGrey,
        fontStyle: 'italic',
        fontWeight: '500',
        padding: Metrics.smallPadding,

    },
    modalIcon: {
        width: 140,
        height: 83,
        paddingBottom: Metrics.basePadding
    }
})
