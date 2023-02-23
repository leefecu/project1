// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    View,
    Text,
    Platform,
    TouchableHighlight
} from 'react-native'
import { map, each, filter } from 'lodash'
import { Images, Layout, Colors } from '../../../Themes'

import * as CoreHelpers from '../Helpers'

//Syltes
import Styles from './Styles/DetailAD'

class DetailAD extends PureComponent {

    constructor (props) {
        super(props)
        this._pressAD = this._pressAD.bind(this)
    }

    _pressAD () {
        const {
            adUrl,
            adTitle,
            FBEventTitle
        } = this.props

        if( adUrl ){
            const url = adUrl
            const title = adTitle ? adTitle : 'Carmate AD'

            if (Platform.OS === 'ios' && url.indexOf("http:") > -1) {
                CoreHelpers.handleClick(url)
            } else {
                this.props.viewAdLink(url, title)
            }

            global.firebase.analytics().logEvent(FBEventTitle, {
                title,
                url
            })
        }
    }

    render () {
        const {
            adImg
        } = this.props
        
        let imgurl = ''
        if(adImg){
            imgurl = adImg.replace('http:', 'https:')
        }

        return (
            <View style={[Styles.container]}>
                <View style={[Styles.innerContainer]}>
                    <Text style={Styles.contentTitle}>Advertisement</Text>

                    <View style={[Styles.contentImgContainer]}>
                        <TouchableHighlight
                            onPress={this._pressAD}
                            underlayColor={Colors.snow} >
                            <Image style={Styles.contentImg} source={{uri: imgurl}} resizeMode='contain'/>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}

export default DetailAD
