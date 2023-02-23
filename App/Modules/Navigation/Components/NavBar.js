import React, { PureComponent } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Platform
} from 'react-native';
import { Images, Colors } from '../../../Themes/'

import SearchBar from '../../Core/Components/SearchBar'
import SearchBarRightButton from './SearchBarRightButton'

import ListingFavouriteButton from '../../Listings/Components/FavouriteButton'
import CouponFavouriteButton from '../../Coupons/Components/FavouriteButton'

//Styles
import Styles from './Styles/NavBar'


class NavBar extends PureComponent {

    constructor (props) {
        super(props)

        this._openDrawer = this._openDrawer.bind(this)
        this._onClickBackButton = this._onClickBackButton.bind(this)
    }

    _openDrawer () {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
            to: 'open'
        })
    }

    _onClickBackButton() {
        if(this.props.toggleTabs){
            this.props.navigator.toggleTabs({
                to: 'show',
                animated: true
            })   
        }

        this.props.navigator.pop({
            animated: true
        })
    }

    renderNoSearch () {
        const { title } = this.props

        return (
            <View style={[Styles.container, Styles.detailContainer]}>
                <View style={Styles.innerContainer}>
                    <View style={[Styles.navButtonLeftContainer, Styles.onlyLeftNavButton]}>
                        <TouchableOpacity onPress={this._openDrawer} testID='sidemenuBtn'>
                            <View style={Styles.navButtonLeftInnerContainer}>
                                <Image source={Images.hamburgerMenuIcon} style={Styles.navButtonLeftImg} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.titleContainer}>
                        <Text style={Styles.titleText}>{title}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderDetail () {
        const {
            couponId,
            listingId,
            page,
            title,
        } = this.props

        return (
            <View style={[Styles.container, Styles.detailContainer]}>
                <View style={Styles.innerContainer}>
                    <View style={[Styles.navButtonLeftContainer, Styles.onlyLeftNavButton]}>
                        <TouchableOpacity onPress={this._onClickBackButton} testID='detailBackBtn'>
                            <View style={Styles.navButtonLeftInnerContainer}>
                                <Image source={Images.pageBackbuttonIcon} style={Styles.navButtonLeftImg} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={[Styles.titleContainer, Styles.detailTitleContainer]}>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.titleText}>
                            {title}
                        </Text>
                    </View>


                    <View style={[Styles.savedIcon]}>
                        {page === 'listing' &&
                            <ListingFavouriteButton
                                curFeatures="listings"
                                favouriteIconContainerStyle={Styles.favouriteIconContainer}
                                favouriteIconInnerContainer={Styles.favouriteIconInnerContainer}
                                favouriteIconStyle={Styles.favouriteIcon}
                                favouriteIcon={Images.starWEmpty}
                                targetListingId={listingId}/>
                        }
                        {page === 'coupon' &&
                            <CouponFavouriteButton
                                curFeatures="coupons"
                                favouriteIconContainerStyle={Styles.favouriteIconContainer}
                                favouriteIconInnerContainer={Styles.favouriteIconInnerContainer}
                                favouriteIconStyle={Styles.favouriteIcon}
                                favouriteIcon={Images.starWEmpty}
                                targetCouponId={couponId}/>
                        }
                    </View>
                </View>
            </View>
        )
    }

    renderShowroom () {
        const {
            page,
            title,
        } = this.props

        return (
            <View style={[Styles.container, Styles.showroomContainer]}>
                <View style={Styles.innerContainer}>
                    <View style={[Styles.navButtonLeftContainer, Styles.onlyLeftNavButton]}>
                        <TouchableOpacity onPress={() => this._onClickBackButton()}>
                            <View style={Styles.navButtonLeftInnerContainer}>
                                <Image source={Images.pageBackbuttonIcon} style={Styles.navButtonLeftImg} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={[Styles.titleContainer,
                                page === 'detail'
                                ? Styles.showroomDetailTitleContainer
                                : Styles.showroomTitleContainer ]}>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.titleText}>{title}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {
            page,
            title,
            type,
        } = this.props

        if(type === 'noSearch') {
            return this.renderNoSearch()
        } else if(type === 'detail' && (page === 'listing' || page === 'coupon' || page === 'exclusiveCoupon' || page === 'review')) {
            return this.renderDetail()
        } else if(type === 'showroom') {
            return this.renderShowroom()
        }
        
        return (
            <View style={[Styles.container, Platform.OS === 'ios' &&  Styles.iosContainer]} testID='navbarContainer'>
                <View style={Styles.innerContainer}>
                    <View style={Styles.navButtonLeftContainer}>
                        <TouchableOpacity onPress={this._openDrawer} testID='sidemenuBtn'>
                            <View style={Styles.navButtonLeftInnerContainer} testID='hamburgerBtn'>
                                <Image source={Images.hamburgerMenuIcon} style={Styles.navButtonLeftImg} resizeMode='contain'/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.searchBar}>
                        <SearchBar searchType={type} />
                    </View>
                    <View style={Styles.navButtonRightContainer}>
                        <SearchBarRightButton searchType={type}/>
                    </View>
                </View>
            </View>
        )
    }
}

NavBar.defaultProps = {
    type: 'cars'
};

export default NavBar
