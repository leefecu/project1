// @flow

import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        height: Metrics.detailFooterHeight,
        paddingBottom: 5,
        paddingHorizontal: Metrics.basePadding,
        backgroundColor: Colors.snow,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

    topContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },

    titleText: {
        color: Colors.darkBlueGrey,
        fontWeight: 'bold',
        fontSize: Fonts.size.smallMedium, 
    },
})
