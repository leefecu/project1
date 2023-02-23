// @flow

import React, { PureComponent } from 'react'
import { 
    TextInput,
    TouchableOpacity, 
    View,
    Image,
    Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../../../Themes'

import CoreActions from '../Actions'
import * as CoreSelectors from '../Selectors'
import CouponActions from '../../Coupons/Actions'
import * as CouponSelectors from '../../Coupons/Selectors'
import ListingsActions from '../../Listings/Actions'
import * as ListingSelectors from '../../Listings/Selectors'

//Styles
import Styles from './Styles/SearchBar'

class SearchBar extends PureComponent {

    constructor (props) {
        super(props)

        this.state = {
            searchCouponsKeywords: this.props.couponSearchQuery,
            searchListingsKeywords: this.props.listingSearchQuery,
        }

        this.searchPerformed = false

        this._onFocus = this._onFocus.bind(this)
        this._onBlur = this._onBlur.bind(this)
    }

    componentWillReceiveProps (newProps) {
        if (newProps.searchType === 'cars' &&
            this.props.listingSearchQuery !== newProps.listingSearchQuery &&
            newProps.listingSearchQuery === '') {
            this.setState({searchListingsKeywords: ''})
        }

        if (newProps.searchType === 'coupons' &&
            this.props.couponSearchQuery !== newProps.couponSearchQuery &&
            newProps.couponSearchQuery === '') {
            this.setState({searchCouponsKeywords: ''})
        }
    }
    
    _onBlur () {
        //Keyboard.dismiss
        this.setKeyword()
        this.props.searchOnBlur()
    }

    _onFocus() {
        this.props.searchOnFocus()
    }
    
    _onChangeCouponText (keywords) {
        if (keywords !== this.state.searchCouponsKeywords) {
            this.setState({searchCouponsKeywords: keywords})
        }
    }

    _onChangeListingText (keywords) {
        if (keywords !== this.state.searchListingsKeywords) {
            this.setState({searchListingsKeywords: keywords})
        }
    }

    _resetCouponSearch () {
        if (this.searchPerformed) {
            this.searchPerformed = false
            this.setState({searchCouponsKeywords: ''}, () => {
                this._searchCoupon()
            })
        }
        else {
            this.setState({searchCouponsKeywords: ''})
        }
    }

    _resetListingSearch () {
        if (this.searchPerformed) {
            this.searchPerformed = false
            this.setState({searchListingsKeywords: ''}, () => {
                this._searchListing()
            })
        }
        else {
            this.setState({searchListingsKeywords: ''})
        }
    }
    
    renderClearIcon () {

        if(this.props.searchType == 'cars'){

            return this.state.searchListingsKeywords.length > 0 && (
                <TouchableOpacity onPress={() => this._resetListingSearch()} style={ Styles.deleteButtonContainer }>
                    <Image source={Images.delKeywordButton} style={Styles.deleteIcon} />
                </TouchableOpacity>
            )

        }else{

            return this.state.searchCouponsKeywords.length > 0 && (
                <TouchableOpacity onPress={() => this._resetCouponSearch()} style={ Styles.deleteButtonContainer }>
                    <Image source={Images.delKeywordButton} style={Styles.deleteIcon} />
                </TouchableOpacity>
            )

        }
    }

    _searchCoupon () {
        this.searchPerformed = true
        //this.props.scrollToTop('coupon')
        this.props.searchCouponsByKeywords(this.state.searchCouponsKeywords)
    }

    _searchListing () {
        this.searchPerformed = true
        //this.props.scrollToTop('listing')
        this.props.searchListingsByKeywords(this.state.searchListingsKeywords)
    }

    setKeyword () {
        if (this.props.searchType === 'cars') {
            this.setState({searchListingsKeywords: this.props.listingSearchQuery})
        }
        else {
            this.setState({searchCouponsKeywords: this.props.couponSearchQuery})
        }
    }

    render() {
        const {searchType} = this.props

        return (
            <View style={[Styles.searchBarConatiner]}>
                <View style={[Styles.searchBarInnerConatiner]}>
                    <TouchableOpacity onPress={() => this.searchBar.focus()} testID='searchbarIcon'>
                        <View style={[Styles.iconContainer]}>
                            <Image style={Styles.thunderIcon} source={Images.searchbarIcon} resizeMode='contain' />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        testID='searchbarInput'
                        style={Styles.textInput}
                        ref={ref => this.searchBar = ref}
                        autoCapitalize='none'
                        autoFocus={false}
                        autoCorrect={false}
                        blueOnSubmit={true}
                        enablesReturnKeyAutomatically={false}
                        keyboardType='default'
                        returnKeyType='search'
                        placeholder={searchType == 'cars' ? 'Search Cars...' : 'Search Coupons...'}
                        placeholderTextColor={Colors.brandColor}
                        selectionColor={Colors.grey8}
                        underlineColorAndroid ={Colors.snow}
                        value={searchType == 'cars' ? this.state.searchListingsKeywords : this.state.searchCouponsKeywords}
                        onBlur={this._onBlur}
                        onFocus={this._onFocus}
                        onSubmitEditing={searchType == 'cars' ? () => this._searchListing() : () => this._searchCoupon()}
                        onChangeText={searchType == 'cars' ? (keywords) => this._onChangeListingText(keywords) : (keywords) => this._onChangeCouponText(keywords)}
                    />
                    {this.renderClearIcon()}
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        couponSearchQuery: CouponSelectors.getSearchQuery(state),
        listingSearchQuery: ListingSelectors.getSearchQuery(state),
        searchInFocus: CoreSelectors.getSearchInFocus(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchCouponsByKeywords: (searchQuery) => dispatch(CouponActions.searchCouponsByKeywords(searchQuery)),
        searchListingsByKeywords: (searchQuery) => dispatch(ListingsActions.searchListingsByKeywords(searchQuery)),
        searchOnFocus: () => dispatch(CoreActions.searchOnFocus()),
        searchOnBlur: () => dispatch(CoreActions.searchOnBlur())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)