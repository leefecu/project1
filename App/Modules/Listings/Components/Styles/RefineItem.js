// @flow

import {StyleSheet, Dimensions, Platform} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window
const rowHeight = 45
const containerW = Platform.OS === 'ios' ? width-(width/Metrics.basePadding) : width-((width/Metrics.basePadding))

export default StyleSheet.create({
    container: {
        ...Layout.itemCentral,
        width: containerW,
        height: rowHeight,
        flex: 1,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: Platform.OS === 'ios' ? 0 : Metrics.doubleBaseMargin,
    },
    upcomingContainer: {
        width: width * 0.9,
        height: 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: Metrics.basePadding
    },
    viewContainer: {
        borderBottomWidth: 0
    },
    inactiveContainer: {
        backgroundColor: Colors.selectedGreyBg
    },
    upcomingInnerContainer: {
        paddingBottom: Metrics.basePadding,
    },
    upcomingDescContainer: {
        flex: 0.85
    },
    switchContainer: {
        height: 33,
        flex: 0.15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingRight: Metrics.basePadding
    },
    pickerContainer: {
        padding: 0,
        margin: 0,
        height: 180,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    centerSubRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: Metrics.basePadding
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: Metrics.basePadding
    },
    incativeText: {
        color: Colors.inactiveGreyText,
    },
    label: {
        fontSize: Fonts.size.medium,
        fontWeight: '400',
        paddingLeft: Metrics.basePadding,
        color: Colors.brandColor
    },
    activeLabel:{
        color: Colors.blue,
        fontWeight: '600'
    },
    selectedLabel: {
        color: Colors.inactiveGreyText,
    },
    itemLabelConteiner: {
        flex: width <= 320 ? 0.5 : 0.5,
    },
    itemValueContainer: {
        flex: width <= 320 ? 0.5 : 0.5,
    },
    icon: {
        ...Layout.itemCentral,
    },
    delImgContainer: {
        width: 32,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: Metrics.basePadding
    },
    delImg: {
        width: 15,
        height: 15
    },
    checkedImg: {
        width: 18,
        height: 14
    },
    img: {
        resizeMode: 'contain',
        width: 10,
        height: 10
    },
    arrowImg: {
        width: width <= 320 ? 12 : 12 + 1,
        height: width <= 320 ? 12 : 12 + 1
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8
    },
    viewTypeImg: {
        width: 26,
        height: 22,
        marginLeft: Metrics.doubleBaseMargin,
        marginRight: Metrics.smallMargin
    },
    viewTypeLabelText: {
        fontSize: Fonts.size.medium,
        color: Colors.inactiveGreyText,
        fontWeight: '500',
        paddingLeft: 3
    },
    activeViewTypeLabelText: {
        color: Colors.primaryPink
    },
    picker: {
        height: 180
    }
})
