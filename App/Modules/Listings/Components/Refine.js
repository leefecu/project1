// @flow

import React, { Component } from 'react'
import {
    ScrollView,
    Image,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { map, filter, clone, forEach } from 'lodash'
import { Colors, Images, Layout } from '../../../Themes'

import CoreActions from '../../Core/Actions'
import * as CoreSelectors from '../../Core/Selectors'
import ListingsActions from '../../Listings/Actions'
import * as ListingsSelectors from '../../Listings/Selectors'
import * as ListingsConstants from '../../Listings/Constants'

import SubRefine from './SubRefine'
import RefineItem from './RefineItem'
import Button from '../../Core/Components/Button'
import LoadingView from '../../Core/Components/LoadingView'

//Styles
import Styles from './Styles/Refine'

class Refine extends Component {

    constructor(props) {
        super(props)

        this.onClear = this.onClear.bind(this)
        this.onClose = this.onClose.bind(this)
        this.handleRefine = this.handleRefine.bind(this)
        this.handleMultiPicker = this.handleMultiPicker.bind(this)
        this.handleDelVal = this.handleDelVal.bind(this)
        this.handleViewType = this.handleViewType.bind(this)
    }

    componentDidMount () {

    }

    onClear() {
        this.props.closePicker()
        this.props.resetListingSearchOptions('')
    }

    onClose () {
        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true,
            to: 'close',
            screen: 'carmate.Refine'
        })
    }


    getsubRefine = (type) => {
        const {
            regions,
            refine,
            sortOptions,
            searchPanelOptions,
            searchPanelParams
        } = this.props

        if (searchPanelOptions) {
            switch(type){
                case 'make':
                    this.props.setRefineList('make', searchPanelOptions.carMakers.map((item) => item.maker))
                break
                case 'model':
                    const filteredList = filter(searchPanelOptions.carMakers, (item) => item.maker == searchPanelParams.make)
                    if (filteredList && filteredList.length > 0) {
                        this.props.setRefineList('model', filteredList[0].models)
                    }
                break
                case 'transmission':
                    this.props.setRefineList('transmission', searchPanelOptions.transmissionOptions.map((item) => item))
                break
                case 'bodyType':
                    this.props.setRefineList('bodyType', searchPanelOptions.bodyTypeOptions.map((item) => item))
                break
                case 'fuelType':
                    this.props.setRefineList('fuelType', searchPanelOptions.fuelTypeOptions.map((item) => item))
                break
                case 'listingType':
                    this.props.setRefineList('listingType', searchPanelOptions.listTypeOptions.map((item) => item))
                break
                case 'location':
                    this.props.setRefineList('location', regions)
                break
                case 'sortby':
                    this.props.setRefineList('sortby', sortOptions)
                break
            }
        }
    }

    handleRefine(type) {
        this.props.closePicker()
        this.getsubRefine(type)
    }

    handleMultiPicker(type, idx) {
        let pickerActive = {
            price: false,
            year: false,
            odometer: false,
            engineSize: false,
            doors: false
        }

        if ( this.props.pickerActive[type] ){

            this.props.closePicker()

        } else {

            forEach(pickerActive, function(value, key){
                if(type == key){
                    pickerActive[key] = true
                }
            })

            const targetIndex = idx * 50
            this.refs.refine.scrollTo({x:0, y: targetIndex-150, animated: true})
            this.props.openPicker(pickerActive)
        }

    }

    handleDelVal(type) {
        const {
            searchPanelParams,
            searchListingsBySearchOptions
        } = this.props

        let newOptions  = clone(searchPanelParams)
        let newOptionsObj = clone(newOptions[type])

        if(ListingsConstants.LISTING_REFINE[type].selectType === 'multi'){

            this.props.setRefine(type, 'selected', false)
            newOptionsObj['min'] = null
            newOptionsObj['max'] = null
            newOptions[type] = newOptionsObj
            this.props.searchListingsBySearchOptions(newOptions)
        } else {

            if(type === 'make'){
                this.props.setRefine('model', 'active', false)
                this.props.setRefine('model', 'selected', false)
                newOptions['model'] = null

            }

            this.props.setRefine(type, 'selected', false)
            newOptions[type] = null
            this.props.searchListingsBySearchOptions(newOptions)
        }
    }

    handleViewType(type) {
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_VIEW_TYPE_CHANGE, {type})
        this.props.setRefine('view', 'value', type)
        this.props.setViewType(type)
        this.props.closePicker()
    }

    _renderOption() {
        return (
            <View style={Styles.refineItemList}>
                {map(this.props.refine, this._renderItem)}
            </View>
        )
    }

    _renderItem = (item, index) => {
        return (
            <RefineItem
                {...this.props}
                key = {index}
                item = {item}
                idx = {item['idx']}
                pickerActive = {this.props.pickerActive}
                _onClick = {this.handleRefine}
                _onClickMultiPicker = {this.handleMultiPicker}
                _onClickDelVal = {this.handleDelVal}
                _onClickViewType = {this.handleViewType}
            />
        )
    }

    render () {
        if(this.props.refineStatue === 'sub'){
            return <SubRefine />
        }

        return (
            <View style={[Styles.container, Styles.iphoneXStyle]}>
                <View style={Styles.header}>
                    <TouchableWithoutFeedback onPress={this.onClear}>
                        <View style={[Styles.leftButton, Styles.topButton]}>
                            <Text style={[Styles.headerText]}>Clear</Text>
                        </View>
                    </TouchableWithoutFeedback>
                        <View style={[Styles.headerTitle]}>
                            <Text style={Styles.headerTitleText}>Refine Listings</Text>
                        </View>
                    <TouchableWithoutFeedback onPress={this.onClose}>
                        <View style={[Styles.rightButton, Styles.topButton]}>
                            <Text style={Styles.headerText}>Done</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <ScrollView ref='refine' style={Styles.menuContainer}>
                    {this._renderOption()}
                </ScrollView>

                <View style={[Layout.horizontalRow, Styles.container, Styles.fixedBottomButton, Styles.iphoneXStyle]}>
                    <View style={[Layout.flex, Styles.buttonContainer]}>
                        <Button
                            containerClass={Styles.showButton}
                            textClass={Styles.showText}
                            label={ this.props.listingFetching ? 'Searching cars...' : 'Show '+this.props.total+' cars' }
                            showIcon={false}
                            underlayColor={Colors.primaryPink}
                            _onPress={this.onClose}
                        />
                    </View>
                </View>
            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        total: ListingsSelectors.getTotal(state),
        region: ListingsSelectors.getRegion(state),
        regions: CoreSelectors.getListingRegions(state),
        refineStatue: ListingsSelectors.getRefineStatus(state),
        refine: ListingsSelectors.getRefine(state),
        searchQuery: ListingsSelectors.getSearchQuery(state),
        sortOptions: ListingsSelectors.getSortOptions(state),
        sortby: ListingsSelectors.getSortby(state),
        pickerActive: ListingsSelectors.getPickerActive(state),
        searchPanelParams: ListingsSelectors.getSearchPanelParams(state),
        searchPanelOptions: CoreSelectors.getSearchPanelOptions(state),
        listingFetching: ListingsSelectors.getFetching(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setViewType: (value) => dispatch(CoreActions.setViewType(value)),
        resetListingSearchOptions: (searchQuery) => dispatch(ListingsActions.resetListingSearchOptions(searchQuery)),
        setRefine: (key, option, value) => dispatch(ListingsActions.setRefine(key, option, value)),
        setRefineList: (target, data) => dispatch(ListingsActions.setRefineList(target, data)),
        openPicker: (pickerActive) => dispatch(ListingsActions.openPicker(pickerActive)),
        closePicker: () => dispatch(ListingsActions.closePicker()),
        searchListingsBySearchOptions: (searchPanelParams) => dispatch(ListingsActions.searchListingsBySearchOptions(searchPanelParams)),
        setSubRefine: (status) => dispatch(ListingsActions.setSubRefine(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Refine)
