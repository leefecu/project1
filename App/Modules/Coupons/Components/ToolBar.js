// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    ListView,
    Picker,
    Platform,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { Images } from '../../../Themes'

import CoreActions from '../../Core/Actions'
import * as CoreSelectors from '../../Core/Selectors'
import * as CouponSelectors from '../Selectors'
import * as ListingSelectors from '../../Listings/Selectors'

import ChangeDot from '../../Core/Components/ChangeDot'

//Styles
import Styles from './Styles/ToolBar'

class ToolBar extends PureComponent {

    getSortingLabel () {
        const {sortOptions, sortby} = this.props
        
        if(sortOptions && sortOptions[sortby] ){
            return (sortOptions && sortOptions[sortby]) ? sortOptions[sortby].label : ''
            
        }
        

    }

    getOptionLabel () {
        const {categories, category} = this.props

        return (categories && categories[category]) && categories[category].label
    }

    openDropdown (type) {
        if (type === 'sortCoupons') {
            this.props.openSortCouponsDropdown()
        } else if (type === 'category') {
            this.props.openCategoryDropdown()
        }
    }

    renderSearchOptions = (type) => {
        let optionStatus = false

        if ( this.props.category > 0 ) {
            optionStatus = true
        }

        return (

            <View style={[Styles.optionColumn]}>
                <View style={Styles.dropdownLabel}>
                    <Image
                        style={Styles.optionIcon}
                        source={Images.wrenchIcon}
                        resizeMode='contain' />
                    <Text style={[Styles.toolbarText, Styles.optionText, Styles.sortingText]}>
                        {this.getOptionLabel()}
                    </Text>
                    { type === 'category' && optionStatus &&
                        <ChangeDot position={Styles.optionPosition}/>
                    }
                </View>
            </View>
        )

    }

    render () {
        const {
            category,
            categories,
            sortOptions,
            sortOptionsListing,
            sortby,
        } = this.props

        return (
            <View style={[Styles.container, Styles.shadow]}>
                <View style={[Styles.innerContainer]}>

                    <TouchableWithoutFeedback onPress={() => this.openDropdown('sortCoupons')}>
                        <View style={[Styles.sortingColumn]}>
                            <View style={Styles.dropdownLabel}>
                                <Text style={[Styles.toolbarText, Styles.sortingText]} ellipsizeMode='tail' numberOfLines={1}>
                                    <Text style={Styles.toolbarText}>Sort by </Text> 
                                    {this.getSortingLabel(sortOptionsListing)}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.openDropdown('category')}>
                        { this.renderSearchOptions('category') }
                    </TouchableWithoutFeedback>

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: CouponSelectors.getCategory(state),
        categories: CoreSelectors.getCategories(state),
        sortby: CouponSelectors.getSortby(state),
        sortOptions: CouponSelectors.getSortOptions(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openCategoryDropdown: () =>  dispatch(CoreActions.openCategoryDropdown()),
        openSortCouponsDropdown: () => dispatch(CoreActions.openSortCouponsDropdown()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
