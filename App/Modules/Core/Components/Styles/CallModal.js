// @flow

import {Dimensions, StyleSheet, Platform} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    modalContainer: {
        position: 'absolute',
        top: (height - 330) / 2,
        left: 0,
        right: 0,
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    modalInnerContainer: {
        maxWidth: Metrics.maxModalWidth,
    },
    modalHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height:Metrics.tabBarHeight,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: Colors.snow,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        zIndex: 20,
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.silver,
    },
    modalHeaderInnerContainer: {
        height:Metrics.tabBarHeight,
        flexDirection: 'row',
        ...Layout.itemCentral
    },
    modalDoneTextContainer: {
        height:Metrics.tabBarHeight,
        paddingRight: 15,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTitleText: {
        color: Colors.black,
        fontSize: Fonts.size.medium+1,
        fontWeight: Platform.OS === 'ios' ? '600' : '500',
        textAlign: 'center',
        paddingLeft: 5,
        backgroundColor: 'transparent'
    },
    modalDoneText: {
        color: Colors.blue,
        fontSize: Fonts.size.medium,
        fontWeight: '500'
    },
    modalBody: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.snow,
        paddingTop: Metrics.tabBarHeight,
        borderRadius: 6,
        zIndex: 10
    },
    modalListContainer: {
        height: 280
    },
    modalList: {
        padding: Metrics.mediumLargePadding,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border
    },
    modalRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lastColumn: {
        borderBottomWidth: 0
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalItemText:{
        fontSize: 15,
        paddingLeft: 5
    },
    modalItemIcon: {
        width: 13,
        height: 13
    },
    selectedModalItem: {
        color: Colors.blue,
        fontWeight: '500'
    },
    checkedIcon: {
    },
})