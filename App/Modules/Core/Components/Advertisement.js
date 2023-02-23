// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'

import Styles from './Styles/Advertisement'

class Advertisement extends PureComponent {
    
    render () {
        const {
            advertising
        } = this.props

        let adImg = ""
        if(advertising.imageUrl){
            adImg = advertising.imageUrl.replace('http:', 'https:')
        }
        
        return (
            <View style={[Styles.container]}>
                <View style={[Styles.innerContainer]}>
                    <Image style={[Styles.adImg]} source={{uri: adImg}} resizeMode='contain'/>
                </View>
            </View>
        )

    }
}

export default Advertisement
