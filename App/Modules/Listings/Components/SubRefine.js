// @flow

import React, { Component } from 'react'
import {
    AsyncStorage,
    ScrollView,
    Image,
    BackAndroid,
    Linking,
    Platform,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import { map, filter, forEach, clone } from 'lodash'
import { Colors, Images, Layout, Metrics } from '../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import ListingsActions from '../../Listings/Actions'
import * as ListingsConstants from '../../Listings/Constants'
import * as ListingsSelectors from '../../Listings/Selectors'

import { titleCase } from '../../Core/Helpers/string'

import RefineItem from './RefineItem'
import RefineSubItem from './SubRefineItem'
import Button from '../../Core/Components/Button'

//Styles
import Styles from './Styles/SubRefine'

class SubRefine extends Component {

    constructor(props) {
        super(props)
        this.onClose = this.onClose.bind(this)
    }

    componentDidMount () {

    }

    onClose () {
        this.props.setSubRefine('main')
    }

    handleRefine = (value) => {
        const {
            region,
            sortby,
            searchQuery,
            searchPanelParams,
            refineListType,
            refineList
        } = this.props

        let newOptions = clone(searchPanelParams)
        //this.props.listScrollToTop('listing')

        if(refineListType === 'sortby'){
            this.props.searchListingsBySortby(value)
        }
        else if(refineListType === 'location'){
            this.props.searchListingsByRegion(value)
        }
        else{
            if(value){

                switch (refineListType){
                    case 'make':
                        newOptions.make = value
                        newOptions.model = null
                        this.props.setRefine('model', 'active', true)
                        this.props.setRefine('model', 'selected', false)
                    break
                }

                newOptions[refineListType] = value
                this.props.setRefine(refineListType, 'selected', true)

            }else{
                if(refineListType === 'make'){
                    newOptions.model = null
                    this.props.setRefine('model', 'active', false)
                }

                newOptions[refineListType] = value
                this.props.setRefine(refineListType, 'selected', false)
            }

            this.props.searchListingsBySearchOptions(newOptions)
        }
        this.onClose()

    }

    _getDefaultItem = () => {
        const {
            region,
            sortby,
            refineListType,
            searchPanelParams
        } = this.props

        if(refineListType !== 'location' && refineListType !== 'sortby'){

            let label = "Any"
            let selected = false
            if( !searchPanelParams[refineListType] ){
                selected = true
            }

            switch (refineListType){
                case 'make':
                    label = 'All'
                break
                case 'model':
                    label = 'All'
                break
            }
            return <RefineSubItem.refineDefault defaultText={label} selected={selected} _onClick = {this.handleRefine}/>
        }

        return null
    }

    _renderOption = ( item, index ) => {
        const {
            sortby,
            region,
            refineListType,
            searchPanelParams
        } = this.props

        if(refineListType === 'sortby' || refineListType === 'location'){
            let selectedItem = ""
            switch (refineListType){
                case 'sortby':
                    selectedItem = sortby
                break
                case 'location':
                    selectedItem = region
                break
            }
            return (
                <RefineSubItem.refineSortbyLocation
                    key={index}
                    item={item}
                    selectedItem = {selectedItem}
                    _onClick = {this.handleRefine}
                />
            )
        }else{
            let selectedItem = searchPanelParams[refineListType]
            return (
                <RefineSubItem.refineSubItem
                    key={index}
                    item={item}
                    selectedItem = {selectedItem}
                    _onClick = {this.handleRefine}
                />
            )
        }
    }

    render () {
        const optionValues = this.props.refineList
        let listTitle = titleCase(this.props.refineListType)

        return (
            <View style={Styles.container}>

                <View style={Styles.header}>
                    <TouchableWithoutFeedback onPress={this.onClose}>
                        <View style={[Styles.leftButton, Styles.topButton]}>
                            <Image style={Styles.backbuttonIcon} source={Images.backbuttonIcon} resizeMode='contain'/>
                            <Text style={Styles.headerText}>Refine</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[Styles.headerTitleContainer]}>
                        <Text style={Styles.headerTitleText}>{listTitle === 'Sortby' ? 'Sort by' : listTitle}</Text>
                    </View>
                </View>

                <ScrollView
                    ref={(ref) => {
                        if (! this.scrollView) {
                            this.scrollView = ref
                        }
                    }}
                    style={Styles.menuContainer}
                >
                    <View style={Styles.refineItemList}>
                        {this._getDefaultItem()}
                        {map(optionValues, this._renderOption)}
                    </View>
                </ScrollView>

            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        refineStatue: ListingsSelectors.getRefineStatus(state),
        region: ListingsSelectors.getRegion(state),
        sortby: ListingsSelectors.getSortby(state),
        searchQuery: ListingsSelectors.getSearchQuery(state),
        searchPanelParams: ListingsSelectors.getSearchPanelParams(state),
        refineListType: ListingsSelectors.getRefineListType(state),
        refineList: ListingsSelectors.getRefineList(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setSubRefine: (status) => dispatch(ListingsActions.setSubRefine(status)),
        setRefine: (key, option, value) => dispatch(ListingsActions.setRefine(key, option, value)),
        searchListingsBySearchOptions: (searchPanelParams) => dispatch(ListingsActions.searchListingsBySearchOptions(searchPanelParams)),
        searchListingsByRegion: (region) => dispatch(ListingsActions.searchListingsByRegion(region)),
        searchListingsBySortby: (sortby) => dispatch(ListingsActions.searchListingsBySortby(sortby))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubRefine)
