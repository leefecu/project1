// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const rowHeight = 45
const logoutHeight = 34

export default StyleSheet.create({
    container: {
        ...Layout.itemCentral,
        height: rowHeight,
        flex: 1,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
    },
    activeContainer: {
        backgroundColor: Colors.selectedGreyBg
    },
    submenuContainer: {
        ...Layout.itemCentral,
        flex: 1,
        paddingVertical: Metrics.baseMargin
    },
    subMenuBottomBorder: {
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
    },
    logoutContainer: {
        ...Layout.itemCentral,
        height: logoutHeight,
        flex: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: Colors.darkRed,
        borderBottomColor: Colors.darkRed,
        marginTop: Metrics.sortingColumnHeight,
        marginBottom: Metrics.sortingColumnHeight,
    },
    icon: {
        ...Layout.itemCentral,
    },
    img: {
        resizeMode: 'contain',
        width: 24,
    },
    menu: {
        ...Layout.textLeftAlign,
        ...Layout.textMiddleAlign,
    },
    menuText: {
        color: Colors.brandColor,
        fontSize: Fonts.size.medium,
        fontWeight: '400'
    },
    menuActiveText: {
        color: Colors.brandColor,
        fontWeight: '600'
    },
    logoutmenu: {
        ...Layout.textCenterAlign,
        ...Layout.textMiddleAlign,
    },
    hasSubMenu: {
        borderBottomWidth: 0,
    },
    hasSubMenuText: {
        color: Colors.inactiveGreyText,
    }
})
