// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    ScrollView,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { assign, map, chunk } from 'lodash'
import { ApplicationStyles, Images, Metrics, Layout, Colors } from '../../../Themes'

import * as CoreHelpers from '../../Core/Helpers'
import * as CoreSelectors from '../../Core/Selectors'
import CouponActions from '../Actions'
import * as CouponConstants from '../Constants'
import * as CouponHelpers from '../Helpers'
import * as CouponSelectors from '../Selectors'
import UserActions from '../../User/Actions'
import { calculateRegion } from '../../../Lib/MapHelpers'

import LoadingView from '../../Core/Components/LoadingView'
import DetailTitle from '../../Core/Components/DetailTitle'
import UList from '../../Core/Components/UList'
import CouponPrice from '../Components/CouponPrice'
import WorkshopInfo from '../../Core/Components/WorkshopInfo'
import HowItWorks from '../Components/HowItWorks'
import DetailFooter from '../../Core/Components/DetailFooter'

import ExclusiveCouponData from '../../../Fixtures/exclusive.coupon'

//Styles
import Styles from './Styles/ExclusiveCouponDetail'

class ExclusiveCouponDetail extends PureComponent {

    constructor (props) {
        super(props)

        this.props.navigator.setStyle({
            navBarCustomView: 'carmate.NavBar',
            navBarComponentAlignment: 'center',
            navBarHeight: Metrics.navBarHeight-10,
            navBarTopPadding: 24,
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator,
                type: 'detail',
                page: 'exclusiveCoupon',
                title: this.props.title,
                couponId: this.props.couponId,
                toggleTabs: this.props.pageStatue === 'saved' ? true : false
            },
            navBarBackgroundColor: Colors.brandColor,
            navBarTextColor: Colors.snow,
            navBarButtonColor: Colors.snow,
            statusBarHidden: true
        })
    }

    _getCouponImg(coupon) {
        const imgName = coupon.category.toLowerCase()

        return (
            <Image source={Images[imgName]} style={[Styles.couponImg, imgName === 'wof' && Styles.couponWOFImg]} resizeMode='contain'/>
        )
    }

    _getLogoImg(coupon, workshop) {
        
        if(coupon.privateCoupon && workshop){
            if(workshop.logo){
                let logoImg = workshop.logo.replace('http:', 'https:')
                return <Image source={{uri: logoImg}} style={Styles.logoImg} resizeMode='contain' />

            }else{
                return <Text style={Styles.logoText}>{workshop.name}</Text>
            }

        } else {

            return <Image source={Images.carmateExclusive} style={Styles.exclusiveIconImgWidth} resizeMode='contain' />
        
        }
    }

    _renderSuburb (targetWorkshop) {
        const {
            coupon,
            partnerShops
        } = this.props

        if(targetWorkshop){
            let address
            if(targetWorkshop.physicalAddress){
                address = targetWorkshop.physicalAddress
            }else{
                address = targetWorkshop.address
            }

            let suburb = CoreHelpers.getSuburb(address)
            if (!coupon.privateCoupon && partnerShops.length > 1) {

                let restShopCount = partnerShops.length - 1
                suburb += " + "+ restShopCount.toString()
            }

            return suburb    
        }
    }

    _renderRightInfo = (txt) =>{
        return (
            <Text style={[Styles.titleText, Styles.branchInfoText]}> 
                { txt } 
            </Text>
        )
    }

    _renderConditionsContent = () =>{
        //const {exclusiveCoupon} = this.props.coupon
        const exclusiveCoupon = this.props.coupon
        const exCoupon = ExclusiveCouponData.options[exclusiveCoupon.category.toLowerCase()]
        const category = exclusiveCoupon.category.toLowerCase()
        var conditions = []

        if (category === CouponConstants.TYPE_MECHNICAL_WARRANTY) {
            conditions.push(`Valid for ${exclusiveCoupon.count} year(s) from purchase date`)
            conditions = conditions.concat(exCoupon.conditions)
        } else if (category === CouponConstants.TYPE_WOF) {
            conditions.push(`Valid for ${exclusiveCoupon.count} usage from purchase date`)
            conditions = conditions.concat(exCoupon.conditions)
        } else if (category === CouponConstants.TYPE_FULL_SERVICE || category === CouponConstants.TYPE_OIL_SERVICE) {
            conditions.push(`Valid for ${exclusiveCoupon.count} usage from purchase date`)
            conditions.push(`Oil up to ${exclusiveCoupon.conditions[2].label}`)
            conditions = conditions.concat(exCoupon.options[exclusiveCoupon.conditions[1].value].conditions)

        } else if (category === CouponConstants.TYPE_TINT) {
            conditions.push(`Valid for ${exclusiveCoupon.conditions[0].label} only`)
            conditions = conditions.concat(exCoupon.conditions)
        }

        return (
            <View style={[Styles.rowContainer]}>
                <UList
                    containerClass={Styles.listItemRowInnerContainer}
                    textClass={Styles.listItemText}
                    itemClass = {Styles.descUlItem}
                    items={map(conditions, (item) => {
                        return {icon: null, label: item}
                    })}
                />
            </View>
        )
    }

    _renderHowItWorks = () => {
        return (
            <HowItWorks />
            )
    }

    render() {
        const {
            coupon,
            detailPage,
            fetching,
            partnerShops,
            mapMarkerRegion,
            regions,
            userState
        } = this.props

        if ( fetching && ! coupon) {
            return <LoadingView />
        }

        let targetWorkshop
        let targetWorkshopName
        if (coupon.privateCoupon){
            if(coupon.workshops) {
                targetWorkshop = coupon.workshops
                targetWorkshopName = targetWorkshop.name   
            }
        } else {
            targetWorkshop = partnerShops[0]
            targetWorkshopName = 'Car Mate Partnered Shops'
        }
        
        let workshops = []
        if(coupon.privateCoupon && coupon.workshops){
            workshops = [coupon.workshops]
        }else{
            workshops = partnerShops
        }    

        const branchesLen = workshops.length
        return (
            <View style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}]}>

                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    style={[Styles.container, coupon.generatedCode && Styles.savedContainer]}>

                    <View style={[Styles.innerContainer, Styles.shadow]}>

                        <View style={Styles.imageContainer}>
                            <View style={Styles.couponImgContainer}>
                                {this._getCouponImg(coupon)}
                            </View>
                            <View style={Styles.logoImgContainer}>
                                {this._getLogoImg(coupon, targetWorkshop)}
                            </View>
                        </View>

                        <View style={Styles.contentBlock}>
                            <View style={[Layout.itemCentral, Styles.nameContainer]}>
                                <Text style={Styles.nameText} ellipsizeMode="tail" numberOfLines={3}>{coupon.name} X {coupon.count}</Text>
                            </View>

                            <View style={[Layout.horizontalRow, Layout.itemCentral]}>
                                <View style={[Styles.workshopNameContainer]}>
                                    <Text style={Styles.workshopNameText}>{targetWorkshopName}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[Styles.detailInfoContentContainer]}>
                            <View style={[Layout.itemCentral, Styles.contentBlock, Styles.priceContainer]}>
                                <CouponPrice exclusive={true} coupon={coupon} containerStyle={Styles.couponPriceContainer} exclusivePriceStyle={Styles.exclusivePrice}/>
                            </View>
                            <View style={[Layout.itemCentral, Styles.contentBlock, Styles.suburbTextContainer]}>
                                <Text style={Styles.suburbText}>{this._renderSuburb(targetWorkshop)}</Text>
                            </View>
                        </View>

                        <View style={[Styles.detailInfoContentContainer]}>
                            <DetailTitle title='Conditions' idx={1} />
                            {this._renderConditionsContent()}
                        </View>
                    </View>


                    <View style={[Styles.innerContainer, Styles.shadow]}>
                        <DetailTitle 
                            title='contact info' 
                            idx={2} 
                            rightInfo={this._renderRightInfo(branchesLen+' Branches')} />
                        <WorkshopInfo tabLabel="Dealer" 
                                        mapMarkerRegion={mapMarkerRegion}
                                        _onScroll={this._scrolledBranchList}
                                        shopName={coupon.workshopName}
                                        shops={workshops} 
                                        regions={regions} 
                                        userLocation={userState.userLocation} 
                                        couponViewCount={coupon.viewCount}
                                        privateCoupon={coupon.privateCoupon}/>
                    </View>

                    <View style={[Styles.innerContainer, coupon.generatedCode && Styles.bottomInnerContainer, Styles.shadow]}>
                        <DetailTitle title='how it works' idx={3}/>
                        {this._renderHowItWorks()}
                    </View>

                </ScrollView>


                <View style={Styles.buttonContainer}>
                    {coupon.generatedCode &&
                        <DetailFooter code={coupon.generatedCode} />
                    }
                </View>
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        coupon: CouponSelectors.getSelectedCoupon(state),
        fetching: CouponSelectors.getFetching(state),
        callModalVisible: CouponSelectors.getCallModalVisible(state),
        useModalVisible: CouponSelectors.getUseModalVisible(state),
        redeemOutcome: CouponSelectors.getRedeemOutcome(state),
        regions: CoreSelectors.getCouponRegions(state),
        partnerShops: CoreSelectors.getPartnerShops(state),
        mapMarkerRegion: CouponSelectors.getMapMarkerRegion(state),
        pageStatue: CoreSelectors.getPageStatus(state),
        userState: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMapMarkerRegion: (idx) => dispatch(CouponActions.setMapMarkerRegion(idx)),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExclusiveCouponDetail)
