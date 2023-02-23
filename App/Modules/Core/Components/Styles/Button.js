// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        maxWidth: Metrics.maxModalWidth,
        backgroundColor: Colors.buttonBG,
        borderColor: Colors.greyc,
        borderWidth: 1,
        borderRadius: Metrics.buttonRadius,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Metrics.rowMargin,
        paddingTop: Metrics.rowMargin,
    },
    disabled: {
        backgroundColor: Colors.grey6
    },
    icon: {
        marginRight: Metrics.mediumPadding
    },
    label: {
        color: Colors.black,
        fontSize: Fonts.size.small,
        textAlign: 'center'
    },
    disabledLabel: {
        color: Colors.grey3
    }
})
