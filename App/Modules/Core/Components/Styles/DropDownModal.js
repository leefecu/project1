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
        //marginLeft: 20,
        //marginRight: 20,
        height:Metrics.tabBarHeight,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: Platform.OS === 'ios' ? Colors.snow : Colors.silver,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        zIndex: 20,
    },
    modalHeaderIcon: {
        width: 15,
        height: 15
    },
    modalTitleText: {
        color: Colors.black,
        fontSize: Fonts.size.medium+1,
        fontWeight: Platform.OS === 'ios' ? '600' : '500',
        textAlign: 'center',
        paddingTop: 13,
        backgroundColor: 'transparent'
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
        //marginLeft: 20,
        //marginRight: 20,
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
        borderBottomWidth: 0.5,
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
    },
    modalItemText:{
        fontSize: Fonts.size.medium,
        fontWeight: '400',
        color: Colors.black
    },
    selectedModalItem: {
        color: Colors.blue,
        fontWeight: Platform.OS === 'ios' ? '600' : '500'
    },
    checkedIcon: {
    },
})