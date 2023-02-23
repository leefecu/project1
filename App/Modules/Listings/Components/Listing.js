// @flow

import React, { PureComponent } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import {LIST_TYPE_CARD} from '../Constants'

import * as ListingsSelectors from '../../Listings/Selectors'

import CardListing from './CardListing'
import ListListing from './ListListing'
import ADListing from './ADListing'

class Listing extends PureComponent {

    render () {
        if(this.props.advertising === true){
            return <ADListing {...this.props}/>
        }
        return this.props.type === LIST_TYPE_CARD ?
            <CardListing {...this.props} />
            :
            <ListListing {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        viewType: ListingsSelectors.getViewType(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
