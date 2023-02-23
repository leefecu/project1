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

import {LIST_TYPE_CARD} from '../Constants'
import { ApplicationStyles, Colors, Images, Metrics, Layout } from '../../../Themes'
import Styles from './Styles/ADListing'

class ADListing extends PureComponent {

    _renderList = () => {
        const {
            listTypeImage,
        } = this.props
        
        let adImg = listTypeImage.replace('http:', 'https:')
        return (
            <View style={[Styles.listListingContainer]}>
                <Image style={Styles.adListImg} source={{uri: adImg}} resizeMode='cover'/>
            </View>
        )
    }

    _renderCard = () => {
        const {
            cardTypeImage,
        } = this.props

        let adImg = cardTypeImage.replace('http:', 'https:')
        return (
            <View style={[Styles.cardListingContainer]}>
                <Image style={Styles.adCardImg} source={{uri: adImg}} resizeMode='stretch'/>
            </View>
        )
    }

    render () {
        const {
            cardTypeImage,
            linkUrl,
            listTypeImage,
            type
        } = this.props
        
        return (
            <View style={[type === LIST_TYPE_CARD ? Styles.cardListing : Styles.listListing]}>
                { type === LIST_TYPE_CARD ? this._renderCard() : this._renderList()}
            </View>
        )
    }
}

export default ADListing
