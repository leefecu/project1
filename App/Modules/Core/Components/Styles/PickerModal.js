// @flow

import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        padding: 0,
        paddingBottom: 0,
        justifyContent: 'flex-end'
    },
    actionSheetButtonRow: {
        backgroundColor: Colors.silver,
        flexDirection: 'row',
        justifyContent:'flex-end',
        height: 40,
    },
    contents: {
        backgroundColor: Colors.silver,
    },
    buttonText: {
        color: Colors.textInteractive,
        alignSelf: 'center',
        fontSize: Fonts.size.medium+1
    },
    button: {
        justifyContent: 'center'
    },
    buttonDone: {
        fontWeight: 'bold',
        paddingLeft: 16,
        paddingRight: 16
    },
})
