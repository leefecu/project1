// @flow

import React, { Component } from 'react'
import {
    Image,
    ListView,
    Picker,
    Platform,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'

import Styles from './Styles/SearchCancelButton'

import CoreActions from '../../Core/Actions'

class SearchCancelButton extends Component {

    render () {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.searchOnBlur()} testID='searchbarCancelBtn'>
                <View style={Styles.container}>
                    <Text style={Styles.text}>Cancel</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchOnBlur: (type) => dispatch(CoreActions.searchOnBlur())
    }
}

export default connect(null, mapDispatchToProps)(SearchCancelButton)
