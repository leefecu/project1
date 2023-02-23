// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        ...Layout.itemCentral,
        width: width,
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.snow
    },
    innerContainer: {
        ...Layout.itemCentral,
        flexDirection: 'row'
    },
    buttonIcon: {
        paddingRight: Metrics.smallPadding
    },
    buttonTitle: {
        color: Colors.blue,
        fontSize: Fonts.size.medium
    },
})
