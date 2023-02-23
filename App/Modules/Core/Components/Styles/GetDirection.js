// @flow

import {StyleSheet, Dimensions} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.snow,
        borderColor: Colors.blue,
        borderWidth: 0,
        borderRadius: Metrics.buttonRadius,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Metrics.rowMargin,
        paddingTop: Metrics.rowMargin
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    getDirectionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 13,
        height: 18,
    },
    getDirectionText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.blue,
        fontWeight: '500',
        paddingLeft: Metrics.basePadding 
    }
})
