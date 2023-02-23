import React from 'react'
import {
    Clipboard,
    Image,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import {map} from 'lodash'

import { Images, Colors, Layout } from '../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

import {handleClick} from '../Helpers'

//Styles
import Styles from './Styles/UList'

const UList = ({items, containerClass, itemClass, showIcon, textClass, defaultIcon}) => {

    const copyToClipboard = (text) => {
        Clipboard.setString(text)
        alert('Copied to clipboard')
    }

    const renderItem = (item, index) => {
        return (
            <View key={index} style={[Styles.item, itemClass]}>
                { (! item.hideIcon && showIcon) &&
                <Icon name={item.icon || defaultIcon} size={item.size || 4} color={item.color || Colors.black} style={item.icon ? Styles.icon : Styles.dot} />
                }
                {item.image &&
                <Image source={item.image} resizeMode='contain' style={item.imageStyle} />
                }

                {item.url ? (
                <TouchableHighlight onPress={() => handleClick(item.url)}>
                    <View><Text style={Styles.linkText}>{item.label}</Text></View>
                </TouchableHighlight>
                ) :
                <Text selectable={true} style={[Styles.itemText, textClass]} onLongPress={() => copyToClipboard(item.label)}>{item.label}</Text>
                }
            </View>
        )
    }

    return (
        <View style={[Styles.container, containerClass]}>
            {map(items, renderItem)}
        </View>
    )

}

UList.defaultProps = {
    containerClass: null,
    itemClass: null,
    textClass: null,
    defaultIcon: 'circle',
    showIcon: true,
    items: []
}

export default UList
