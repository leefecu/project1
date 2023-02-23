// @flow

import {
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native'
import {Fonts, Metrics, Colors, Layout} from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,1)',
        flex: 1
    },
    header: {
        backgroundColor: Colors.background,
        paddingTop: Platform.OS === 'ios' ? 30 : 10,
        paddingBottom:10,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        paddingVertical: 10,
        borderWidth:1,
        borderColor: Colors.snow
    },
    titleText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: Colors.snow,
        textAlign: 'center'
    },

    closeButton: {
        width: 80,
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : 0,
        right: 0
    },
    closeTextContainer: {
        paddingVertical: 10,
        paddingRight: 15
    },
    closeText: {
        color: Colors.snow,
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'right',
    },

    gallery: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    galleryContainer: {
        // flex:1,
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center'
    },
    slide: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        top: Platform.OS === 'ios' ? 0 : -40,
        flex: 1,
        width,
        height: parseInt(width / 4 * 3),
    },
    landscapeImage: {
        top: 0,
        height: width,
        width: parseInt(width / 3 * 4)
    },

    thumbnail: {

    }
})
