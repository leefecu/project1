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

import { LIST_TYPE_CARD, LIST_TYPE_LIST } from '../Constants'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import ListingsActions from '../Actions'
import * as CoreSelectors from '../../Core/Selectors'
import * as CouponSelectors from '../../Coupons/Selectors'
import * as ListingSelectors from '../Selectors'

import ChangeDot from '../../Core/Components/ChangeDot'

//Styles
import Styles from './Styles/ToolBar'

class ToolBar extends PureComponent {

    constructor (props) {
        super(props)

        this.changeViewType = this.changeViewType.bind(this)
        this.getSortingLabel = this.getSortingLabel.bind(this)
    }

    changeViewType() {
        const curViewType = this.props.refine.view.value
        let viewType = LIST_TYPE_CARD

        if(curViewType === LIST_TYPE_CARD){
            viewType = LIST_TYPE_LIST
        }

        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_VIEW_TYPE_CHANGE, {type: viewType})
        
        this.props.setRefine('view', 'value', viewType)
        this.props.setViewType(viewType)
    }

    openRefine () {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
            to: 'open'
        })
    }

    getSortingLabel () {
        const {
            sortOptionsListing, 
            sortbyListing
        } = this.props

        return (sortOptionsListing && sortOptionsListing[sortbyListing]) 
                    ? sortOptionsListing[sortbyListing].label : ''
    }

    openDropdown (type) {
        if (type === 'sortListings') {
            this.props.openSortListingsDropdown()
        } else {  
            this.props.navigator.toggleDrawer({
                side: 'right',
                animated: true,
                to: 'open',
                screen: 'carmate.Refine'
            })
        }
    }

    renderSearchOptions = (type) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.openDropdown('refine')}>
                <View style={[Styles.optionColumn, Styles.seperatorRight]}>
                    <View style={[Styles.dropdownLabel]}>
                        <Image
                            style={Styles.optionIcon}
                            source={Images.searchRefineIcon}
                            resizeMode='contain' />
                        <Text style={[Styles.toolbarText, Styles.optionText, Styles.sortingText]}>
                            Refine
                        </Text>
                        { this.props.refineChanged &&
                            <ChangeDot position={Styles.optionPosition}/>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )

    }

    render () {
        const {
            sortOptionsListing,
            refine
        } = this.props

        return (
            <View style={[Styles.container, Styles.shadow]} testID='listingToolbar'>
                <View style={[Styles.innerContainer]}>

                    <View style={[Styles.sortbyRefineContainer]}>
                        <TouchableWithoutFeedback onPress={() => this.openDropdown('sortListings')}>
                            <View style={[Styles.sortingColumn, Styles.seperatorRight]}>
                                <View style={[Styles.dropdownLabel]}>
                                    <Text style={[Styles.toolbarText, Styles.sortingText]} ellipsizeMode='tail' numberOfLines={1}>
                                        <Text style={Styles.toolbarText}>Sort by </Text> 
                                        {this.getSortingLabel(sortOptionsListing)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={this.openDrawer}>
                            { this.renderSearchOptions('refine') }
                        </TouchableWithoutFeedback>
                    </View>
                    
                    <View style={[Styles.viewTypeContainer]}>
                        <TouchableWithoutFeedback onPress={this.changeViewType}>
                            <View style={[Styles.viewTypeInnerContainer]}>

                                <View style={[Styles.viewTypeImgContainer]}>
                                    <Image testID='viewTypeBtn'
                                            style={Styles.viewTypeImg}
                                            resizeMode='contain'
                                            source={refine.view.value === LIST_TYPE_CARD 
                                                ? Images.refineCardViewActiveIcon
                                                : Images.refineListViewActiveIcon} />
                                </View>
                                <Image style={Styles.viewTypeArrowImg} resizeMode='contain' source={Images.refineViewTypeArrow}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </View>
        )
    }
}

ToolBar.defaultProps = {
    activeTab: 'listings',
    regions: {}
}

const mapStateToProps = (state) => {
    return {
        sortbyListing: ListingSelectors.getSortby(state),
        sortOptionsListing: ListingSelectors.getSortOptions(state),
        refineChanged: ListingSelectors.getRefineChanged(state),
        refine: ListingSelectors.getRefine(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRefine: (key, option, value) => dispatch(ListingsActions.setRefine(key, option, value)),
        setViewType: (value) => dispatch(CoreActions.setViewType(value)),        
        openSortListingsDropdown: () => dispatch(CoreActions.openSortListingsDropdown()),
        openRefineDropdown: () => dispatch(CoreActions.openRefineDropdown())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
