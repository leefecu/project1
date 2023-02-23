
import React, { Component } from 'react'
import {
    Switch,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { filter, clone } from 'lodash'
import { Images, Colors, Layout } from '../../../Themes'

import ListingsActions from '../../Listings/Actions'
import * as ListingsConstants from '../../Listings/Constants'

import Picker from '../../Core/Components/Picker'

//Styles
import Styles from './Styles/RefineItem'

class RefineItem extends Component {

    constructor(props) {
        super(props)

        this.changedPicker = this.changedPicker.bind(this)
    }

    changedPicker = (type, valueType, value) => {
        const {
            region,
            sortby,
            searchQuery,
            searchPanelParams,
            refineListType,
            refineList
        } = this.props

        let newOptions  = clone(searchPanelParams)
        let newOptionsObj = clone(newOptions[type])

        if(valueType === 'min'){

            const targetMax = searchPanelParams[type]['max']

            if(value && targetMax && targetMax < value){

                newOptionsObj['min'] = targetMax
                newOptionsObj['max'] = value
                newOptions[type] = newOptionsObj

            }else{
                newOptionsObj[valueType] = value
                newOptions[type] = newOptionsObj
            }

        } else {

            const targetMin = searchPanelParams[type]['min']

            if(value && targetMin && targetMin > value){

                newOptionsObj['min'] = value
                newOptionsObj['max'] = targetMin
                newOptions[type] = newOptionsObj

            }else{

                newOptionsObj[valueType] = value
                newOptions[type] = newOptionsObj

            }

        }

        if (value) {
            this.props.setRefine(type, 'selected', true)
        }

        if(!newOptionsObj['min'] && !newOptionsObj['max']){
            this.props.setRefine(type, 'selected', false)
        }

        this.props.searchListingsBySearchOptions(newOptions)
    }

    _getSelectedSingleLabel = (selectedLabelText) => {
        if(selectedLabelText){
            return selectedLabelText
        }else{
            if ( this.props.item.type == 'make' || this.props.item.type == 'model') {
                return 'All'
            }
            return 'Any'
        }
    }

    _getSelectedMultiLabel = (type, min, max) => {
        const {
            searchPanelOptions
        } = this.props

        if(!min && !max){
            return 'Any'
        }else{
            let minLabel = min
            let maxLabel = max

            if(!minLabel){
                minLabel = 'Any'
            } else{
                const filteredMin = filter(searchPanelOptions[type], (item) => item.value === minLabel)
                minLabel = filteredMin[0].label
            }

            if(!maxLabel){
                maxLabel = 'Any'
            }else{
                const filteredMax = filter(searchPanelOptions[type], (item) => item.value === maxLabel)
                maxLabel = filteredMax[0].label
            }

            return minLabel +' to '+ maxLabel

        }
    }

    _renderItem(type) {
        return (

            <View style={[Layout.horizontalRow, Styles.container, type == 'inactive' && Styles.inactiveContainer]}>
                { this._renderItemLabel(type) }
                <View style={[Styles.itemValueContainer, Styles.centerRow, Layout.textBottomAlign]}>
                    <Text style={[Styles.label, Styles.selectedLabel, type == 'selected' ? {color: Colors.blue} : type == 'inactive' && Styles.incativeText ]}>
                        {this._renderSelectedLabel()}
                    </Text>
                    {type == 'selected' ?
                        <TouchableWithoutFeedback onPress={() => this.props._onClickDelVal(this.props.item.type)} >
                            <View style={Styles.delImgContainer}>
                                <Image source={Images.refineDelValue} style={Styles.delImg}/>
                            </View>
                        </TouchableWithoutFeedback>
                    : type == 'none' ?
                        <View style={Styles.delImgContainer}>
                            <Image source={Images.refineRightArrow} style={[Styles.img, Styles.arrowImg]}/>
                        </View>
                    :
                        <View style={Styles.delImgContainer}>
                            <Image source={Images.refineRightArrowInactive} style={[Styles.img, Styles.arrowImg]}/>
                        </View>
                    }

                </View>
            </View>


        )
    }

    _renderItemLabel(type) {
        return (
            <View style={[Styles.itemLabelConteiner]}>
                <Text style={[Styles.label, type == 'inactive' && Styles.incativeText]}>
                    {ListingsConstants.LISTING_REFINE[this.props.item.type]['label']}
                </Text>
            </View>
        )
    }

    _renderSelectedLabel = () => {
        const {
            searchPanelOptions,
            searchPanelParams
        } = this.props

        const targetItem = this.props.item.type
        let label = ""
        let selectedValue = ""

        switch (targetItem) {
            case 'make':
                label = this._getSelectedSingleLabel(searchPanelParams.make)
            break
            case 'model':
                label = this._getSelectedSingleLabel(searchPanelParams.model)
            break
            case 'transmission':
                if(searchPanelOptions && searchPanelParams.transmission){
                    const filteredOption = filter(searchPanelOptions['transmissionOptions'], (option) => option.value == searchPanelParams.transmission)
                    selectedValue = this._getSelectedSingleLabel(filteredOption[0].label)
                }
                label = this._getSelectedSingleLabel(selectedValue)
            break
            case 'bodyType':
                if(searchPanelOptions && searchPanelParams.bodyType){
                    const filteredOption = filter(searchPanelOptions['bodyTypeOptions'], (option) => option.value == searchPanelParams.bodyType)
                    selectedValue = this._getSelectedSingleLabel(filteredOption[0].label)
                }
                label = this._getSelectedSingleLabel(selectedValue)
            break
            case 'fuelType':
                if(searchPanelOptions && searchPanelParams.fuelType){
                    const filteredOption = filter(searchPanelOptions['fuelTypeOptions'], (option) => option.value == searchPanelParams.fuelType)
                    selectedValue = this._getSelectedSingleLabel(filteredOption[0].label)
                }
                label = this._getSelectedSingleLabel(selectedValue)
            break
            case 'listingType':
                if(searchPanelOptions && searchPanelParams.listingType){
                    const filteredOption = filter(searchPanelOptions['listTypeOptions'], (option) => option.value == searchPanelParams.listingType)
                    selectedValue = this._getSelectedSingleLabel(filteredOption[0].label)
                }
                label = this._getSelectedSingleLabel(selectedValue)
            break
            case 'price':
                label = this._getSelectedMultiLabel('priceOptions', searchPanelParams.price.min, searchPanelParams.price.max)
            break
            case 'year':
                label = this._getSelectedMultiLabel('yearOptions', searchPanelParams.year.min, searchPanelParams.year.max)
            break
            case 'odometer':
                label = this._getSelectedMultiLabel('odometerOptions', searchPanelParams.odometer.min, searchPanelParams.odometer.max)
            break
            case 'engineSize':
                label = this._getSelectedMultiLabel('engineSizeOptions', searchPanelParams.engineSize.min, searchPanelParams.engineSize.max)
            break
            case 'doors':
                label = this._getSelectedMultiLabel('doorOptions', searchPanelParams.doors.min, searchPanelParams.doors.max)
            break
            case 'location' :
                if(this.props.regions[this.props.region]){
                    label = this.props.regions[this.props.region]['label']
                }
            break
            case 'sortby' :
                if(this.props.sortOptions[this.props.sortby]){
                    label = this.props.sortOptions[this.props.sortby]['label']
                }
            break
        }

        return label
    }

    _renderView() {

        return(
            <View style={[Layout.horizontalRow, Styles.container, Styles.viewContainer]}>
                { this._renderItemLabel() }
                <View style={[Layout.flex5, Layout.itemStretch, Styles.rightRow]}>
                    <TouchableWithoutFeedback onPress={() => this.props._onClickViewType('list')}>
                        <View style={Styles.buttonContainer}>
                            <Image source={ this.props.item.value == 'list' ? Images.refineListViewActiveIcon : Images.refineListViewIcon} style={Styles.viewTypeImg}/>
                            <Text style={[Styles.viewTypeLabelText, this.props.item.value == 'list' && Styles.activeViewTypeLabelText]}>List</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.props._onClickViewType('card')}>
                        <View style={Styles.buttonContainer}>
                            <Image source={this.props.item.value == 'card' ? Images.refineCardViewActiveIcon : Images.refineCardViewIcon } style={Styles.viewTypeImg}/>
                            <Text style={[Styles.viewTypeLabelText, this.props.item.value == 'card' && Styles.activeViewTypeLabelText]}>Card</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    _renderItemRow() {
        if(this.props.item.active){
            return (
                <TouchableWithoutFeedback
                    ref={this.props.item.name}
                    onPress={ListingsConstants.LISTING_REFINE[this.props.item.type]['selectType'] == 'multi'
                                ? () => this.props._onClickMultiPicker(this.props.item.type, this.props.idx)
                                : () => this.props._onClick(this.props.item.type)}
                >
                    {this.props.item.selected ? this._renderItem('selected') : this._renderItem('none')}
                </TouchableWithoutFeedback>
            )

        } else {

            //INACTIVE ROW (value is not selected)
            return (
                <TouchableWithoutFeedback>
                    {this._renderItem('inactive')}
                </TouchableWithoutFeedback>
            )

        }
    }

    _renderPicker() {

        const {
            searchPanelOptions,
            searchPanelParams
        } = this.props

        let itemList = []
        let renderState = this.props.pickerActive[this.props.item.type]

        if ( this.props.item.type == 'price' ) {

            itemList = searchPanelOptions.priceOptions

        } else if ( this.props.item.type == 'year' ) {

            itemList = searchPanelOptions.yearOptions

        } else if ( this.props.item.type == 'odometer' ) {

            itemList = searchPanelOptions.odometerOptions


        } else if ( this.props.item.type == 'engineSize' ) {

            itemList = searchPanelOptions.engineSizeOptions


        } else if ( this.props.item.type == 'doors' ) {

            itemList = searchPanelOptions.doorOptions

        }

        if( renderState ){

            return (
                <View style={[Styles.pickerContainer, Layout.horizontalRow]}>
                    <View style={[Layout.flex5]}>
                        <Picker type = {this.props.item.type}
                                valueType = "min"
                                itemList = {itemList}
                                defaultLabel = {this.props.item.type == 'price' ? 'Min' : 'Any'}
                                pickerStyle = {[Styles.picker]}
                                itemStyle= {{height: 175}}
                                selectedValue = {searchPanelParams[this.props.item.type]['min']}
                                _onChange = {this.changedPicker}  />
                    </View>
                    <View style={[Layout.flex5]}>
                        <Picker type = {this.props.item.type}
                                valueType = "max"
                                itemList = {itemList}
                                defaultLabel = {this.props.item.type == 'price' ? 'Max' : 'Any'}
                                pickerStyle = {[Styles.picker]}
                                itemStyle= {{height: 175}}
                                selectedValue = {searchPanelParams[this.props.item.type]['max']}
                                _onChange = {this.changedPicker}  />
                    </View>
                </View>
            )
        }
    }

    render () {
        return (
            <View>
                { this.props.item.type == 'view' ?
                    this._renderView()
                :
                    this._renderItemRow()
                }
                {this.props.searchPanelOptions && 
                    ListingsConstants.LISTING_REFINE[this.props.item.type]['selectType'] == 'multi' 
                    && this._renderPicker()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setRefine: (key, option, value) => dispatch(ListingsActions.setRefine(key, option, value)),
        searchListingsBySearchOptions: (searchPanelParams) => dispatch(ListingsActions.searchListingsBySearchOptions(searchPanelParams)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefineItem)

