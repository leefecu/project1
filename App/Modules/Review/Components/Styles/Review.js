// @flow

import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    row: {
        flex: 1
    },
    innerContainer: {
        padding: Metrics.mediumLargePadding,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border
    },
    contentContainer: {

    },
    listContainer: {
        paddingTop: 0
    },
    listInnerContainer:{
        flex: 1,
        marginTop: 0,
        borderTopWidth: 0,
        backgroundColor: 'transparent'
    },
    ratingUserContainer: {
        flexDirection: 'row',
        paddingBottom: Metrics.mediumLargePadding
    },
    ratingContainer: {
        flexDirection: 'row',
        flex: 7,
        alignItems: 'flex-start'
    },
    ratingIconContainer: {
        paddingRight: 3
    },
    ratingIcon: {
        width: 23,
    },
    userContainer: {
        flex: 3,
        alignItems: 'flex-end'
    },
    userBackground: {
        ...Layout.itemCentral,
        width: 35,
        height: 35,
        backgroundColor: Colors.inactiveGreyBg,
        borderWidth:0,
        borderRadius: 35
    },
    commentContainer: {
        paddingBottom: Metrics.smallPadding
    },
    registeredDtContainer: {

    },
    contentContainer: {

    },
    userTxt: {
        color: Colors.snow
    },
    commentTxt: {
        color: Colors.black
    },
    dateTxt :{
        color: Colors.darkBlueGrey
    }
})
