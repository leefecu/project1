// @flow

import DeviceInfo from 'react-native-device-info'
import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.snow,
        flex: 1,
    },
    
    noDealContainer: {
        width: width,
        height: height - (Metrics.navBarHeight + Metrics.toolBarHeight + Metrics.tabBarHeight),
        ...Layout.itemCentral
    },
    noDealText: {
        color: Colors.grey6,
        fontSize: Fonts.size.regular,
        position: 'relative',
        top: -20
    },

    listContainer: {
        flex: 1,
        paddingTop: 0,
        marginBottom: Metrics.bottomButtonBarHeight-1 //review리스팅 마지막 리뷰 하단 보더 안보이게 처리하기 위해 -1
    },
    listInnerContainer:{
        flex: 1,
        marginTop: 0,
        borderTopWidth: 0,
        backgroundColor: 'transparent'
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    iphoneXStyle: {
        paddingBottom:  DeviceInfo.getModel() === 'iPhone X' ? Metrics.largePadding : 0
    },
    reviewButtonContain: {
        paddingRight: Metrics.smallMargin,
        backgroundColor: Colors.primaryPink
    },
    reviewButton: {
        backgroundColor: Colors.brandColor
    },

    titleStyle: {
        fontWeight: '600'
    },
    descriptionsText: {
        fontSize: Fonts.size.smallMedium+1,
        color: Colors.black
    },
    subDescText: {
        textAlign: 'center',
        color: Colors.darkBlueGrey,
        fontStyle: 'italic',
        fontWeight: '500',
        padding: Metrics.mediumLargePadding
    },
    modalIcon: {
        width: width/1.5,
        height: 80
    },
})
