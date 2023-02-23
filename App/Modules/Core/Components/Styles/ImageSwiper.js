// @flow

import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        position: 'relative'
    },
    imageContainer: {
        backgroundColor: Colors.imageGreyBg,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    paginationIOS: {
        bottom: -27,
    },
    paginationAndroid: {
        bottom: 10,
    },
    image: {
        width,
        height: parseInt(width / 4 * 3),
        flex: 1,
        zIndex: 99,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    button: {
        margin: 2.5,
        width: 5,
        height: 5,
        borderRadius: 5 / 2,
        opacity: 0.9,
    },
    noImageContainer: {
        ...Layout.itemCentral,
        backgroundColor: Colors.imageGreyBg,
        flex: 1,
        height: parseInt(width / 4 * 3),
        padding: 20
    },
    noImage: {
        flex: 1,
        width: width * 0.4,
        zIndex: 99
    },
    noImageL: {
        flex: 1,
        width: width * 0.4,
        height: parseInt(width / 4 * 3),
        zIndex: 98
    },
    noDetailImage: {
        flex: 1,
        width: width * 0.8,
        height: parseInt(width / 4 * 3) * 0.8,
    }
})
