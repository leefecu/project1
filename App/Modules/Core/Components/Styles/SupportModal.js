// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        height: height,
        width: width,
        padding: 20,
        ...Layout.itemCentral
    },
    title: {
        fontSize: Fonts.size.smallMedium+1,
        fontWeight: '500'
    },
    subtitle: {
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
    },
})
