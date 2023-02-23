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

import { ApplicationStyles, Colors, Images, Metrics } from '../../../Themes'
import Styles from './Styles/RegionButton'

import Dropdown from '../../Core/Components/Dropdown'
import CoreActions from '../../Core/Actions'
import * as CoreSelectors from '../../Core/Selectors'
import * as ListingsSelectors from '../../Listings/Selectors'
import * as CouponsSelectors from '../../Coupons/Selectors'

import * as CoreConstants from '../../Core/Constants'

class RegionButton extends Component {

    onParamsChange (type, value) {
        const {
            category,
            searchQuery,
            sortby
        } = this.props

        searchByRegion(searchQuery, category, value, sortby)
        
    }

    render () {
        const {
            searchType,
            listingsRegions,
            couponsRegions,
            curFeaturesPage,
            selectedCouponRegion,
            selectedListingRegion
        } = this.props
        
        let curRegion = ""
        if(searchType === 'cars'){

            if(listingsRegions[selectedListingRegion]){
                curRegion = listingsRegions[selectedListingRegion]['initial']
            }

        }else{

            if(couponsRegions[selectedCouponRegion]){
                curRegion = couponsRegions[selectedCouponRegion]['initial']
            }
            
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.props.openRegionDropdown('region')} testID='searchbarRegionBtn'>
                <View style={[Styles.locationColumn]}>
                    <View style={[Styles.locationInnerColumn]}>
                        <Image
                            style={Styles.locationIcon}
                            source={Images.searchBarRegionIcon}
                            resizeMode='contain'/>
                        <Text style={Styles.locationText}>{curRegion}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

RegionButton.defaultProps = {
    
}

const mapStateToProps = (state) => {
    return {
        listingsRegions: CoreSelectors.getListingRegions(state),
        couponsRegions: CoreSelectors.getCouponRegions(state),
        curFeaturesPage: CoreSelectors.getFeaturesTabStatus(state),
        selectedListingRegion: ListingsSelectors.getRegion(state),
        selectedCouponRegion: CouponsSelectors.getRegion(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openRegionDropdown: (type) => dispatch(CoreActions.openRegionDropdown(type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionButton)
