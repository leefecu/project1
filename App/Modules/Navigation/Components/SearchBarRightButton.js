// @flow

import React, { PureComponent } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import SearchCancelButton from './SearchCancelButton'
import RegionButton from './RegionButton'

class SearchRightButton extends PureComponent {

    render () {
        return this.props.searchInFocus ? <SearchCancelButton /> : <RegionButton searchType={this.props.searchType}/>
    }
}

const mapStateToProps = (state) => {
    return {
        searchInFocus: state.core.searchInFocus
    }
}

export default connect(mapStateToProps)(SearchRightButton)
