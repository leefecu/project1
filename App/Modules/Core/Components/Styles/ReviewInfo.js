// @flow

import { Dimensions, StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        width: width,
        paddingVertical: Metrics.basePadding*2,
        paddingHorizontal: Metrics.basePadding,
        borderTopWidth: 1,
        borderTopColor: Colors.border
    },
    innerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    seperatorContainer:{
        paddingHorizontal: Metrics.section,
    },
    seperator:{
        width:1,
        height: 36,
        backgroundColor: Colors.border
    },
    contentContainer:{
        width: (width - (Metrics.basePadding*2))/2 - 25,
        ...Layout.itemCentral,
        flexDirection: 'row'   
    },
    imgContainer: {
        width: 36
    },
    txtContainer: {
        ...Layout.textCenterAlign,
        paddingLeft: Metrics.basePadding
    },
    valaueTxt: {
        fontSize: Fonts.size.h4
    },
    valueLabelTxt: {
        fontSize: Fonts.size.smallMedium,
        color: Colors.darkBlueGrey
    }
})
