// @flow

import React from 'react'
import {
    View,
    Text,
    WebView
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Config from 'react-native-config'

import * as CoreSelectors from '../../Core/Selectors'

import Styles from './Styles/WebContents'

class WebADContents extends React.Component {

    render () {
        return (
            <View style={Styles.container}>
                <WebView
                    source={{uri: this.props.adUrl}}
                  />
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        adUrl: CoreSelectors.getAdUrl(state)
    }
}


export default connect(mapStateToProps)(WebADContents)