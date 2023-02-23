// @flow

import React, { PropTypes, PureComponent } from 'react'
import {
    Image,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { map, each, filter } from 'lodash'
import classNames from 'classnames'

import { ApplicationStyles, Colors, Images, Metrics, Layout } from '../../../Themes'
import Styles from './Styles/ADListing'

class ADListing extends PureComponent {

    render () {
        const {
            advertising
        } = this.props
        
        let adImg = ''
        if(advertising.listTypeImage){
            adImg = advertising.listTypeImage.replace('http:', 'https:')
        }

        return (
            <View style={[Styles.listing]}>
                <View style={[Styles.listingContainer]}>
                    <Image style={Styles.adImg} source={{uri: adImg}} resizeMode='stretch'/>
                </View>
            </View>
        )
    }
}

export default ADListing
