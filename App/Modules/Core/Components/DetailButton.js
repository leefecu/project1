// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'

import { Colors, Images } from '../../../Themes'


//Styles
import Styles from './Styles/DetailButton'

class DetailButton extends PureComponent {

    constructor (props) {
        super(props)

    }

    render () {
        const {
            sortOptionsListing,
            refine
        } = this.props

        return (
            <TouchableHighlight 
                style={[Styles.container]}
                onPress={this.props.onClick}
                underlayColor={Colors.snow} >

                <View style={[Styles.innerContainer]}>
                    <View style={Styles.buttonIcon}>
                        <Image source={this.props.icon} resizeMode='contain'/>
                    </View>
                    <Text style={Styles.buttonTitle}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default DetailButton
