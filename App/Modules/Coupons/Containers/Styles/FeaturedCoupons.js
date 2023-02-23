// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window

export default StyleSheet.create({
    container: {
        width: width,
        flex:1,
        flexDirection: 'column',
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.silver
    },
    
    toolBarContainer:{
        zIndex: 30
    },
    
    contentsContainer:{
        flex: 1,
        zIndex: 10,
        marginTop: -Metrics.baseMargin
    },

    subDescText: {
        textAlign: 'center',
        color: Colors.darkBlueGrey,
        fontStyle: 'italic',
        fontWeight: '500',
        padding: Metrics.smallPadding,
    },
})
