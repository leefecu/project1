import React, { PureComponent } from 'react';
import {
    Animated,
    Dimensions,
    InteractionManager,
    Linking,
    Platform,
    ScrollView,
    Share,
    View,
    Image,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { assign, clone, drop, map, noop } from 'lodash'
import moment from 'moment'
import { ApplicationStyles, Images, Colors, Metrics } from '../../../Themes/'

import CouponActions from '../../Coupons/Actions'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import * as CoreHelpers from '../../Core/Helpers'
import * as CoreSelectors from '../../Core/Selectors'
import ShowroomActions from '../Actions'
import * as ShowroomSelectors from '../Selectors'
import ListingsActions from '../../Listings/Actions'
import * as ListingConstants from '../../Listings/Constants'
import * as ListingSelectors from '../../Listings/Selectors'

import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'
import { calculateRegion } from '../../../Lib/MapHelpers'

import ImageSwiper from '../../Core/Components/ImageSwiper'
import DetailButton from '../../Core/Components/DetailButton'
import ListingPrice from '../../Listings/Components/ListingPrice'
import CarInfoDetail from '../../Listings/Components/CarInfoDetail'
import CouponInfo from '../../Listings/Components/CouponInfo'
import DealerInfo from '../../Core/Components/DealerInfo'
import DetailAD from '../../Core/Components/DetailAD'
import DetailFooter from '../../Core/Components/DetailFooter'
import ImageGalleryModal from '../Components/ImageGalleryModal'
import CallModal from '../../Core/Components/CallModal'

//Styles
import Styles from './Styles/ShowroomListingDetail'

class ShowroomListingDetail extends PureComponent {

    constructor (props) {
        super(props)

        this.openShowroomImageGallery = this.openShowroomImageGallery.bind(this)
        this._onClickCall = this._onClickCall.bind(this)
        this._onClickEmail = this._onClickEmail.bind(this)
        this._pressADListing = this._pressADListing.bind(this)

        this.footerButton = [{
                buttonCotainerStyle: Styles.emailButtonContain,
                buttonColor: Colors.brandColor,
                buttonStyle: Styles.emailButton,
                buttonLabel: 'EMAIL',
                buttonIcon: Images.emailButtonIcon,
                onClick: this._onClickEmail
            },
            {
                buttonCotainerStyle: Styles.callButtonContain,
                buttonColor: Colors.primaryPink,
                buttonStyle: Styles.callButton,
                buttonLabel: 'CALL',
                buttonIcon: Images.callButtonIcon,
                onClick: this._onClickCall
            }]


        this.props.navigator.setStyle({
            navBarCustomView: 'carmate.NavBar',
            navBarComponentAlignment: 'center',
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator,
                type: 'showroom',
                page: 'detail',
                title: this.props.title
            },
            navBarBackgroundColor: Colors.brandColor,
            navBarTextColor: Colors.snow,
            navBarButtonColor: Colors.snow,
            statusBarHidden: true
        })
    }

    _closeModal (type) {
        switch(type){
            case 'call':
                this.props.setCallModalVisible(false)
            break
        }
    }

    openShowroomImageGallery (index) {
        this.props.openShowroomImageGallery(index)
    }

    _onClickCall () {
        this.props.setCallModalVisible(true)
    }

    _onClickEmail () {
        const {
            car
        } = this.props

        const dealers = car.dealerShop
        const email = dealers.email || ''

        if (email) {
            let dealerShopName = ""
            if ( dealers ) {
                dealerShopName = dealers.name
            }
            Linking.canOpenURL(`mailto:${email}`).then(supported => {

                if (supported) {

                    let subject = ''
                    let contents = ''

                    if(car){
                        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.DEALER_EMAIL_CLICK, {
                            listingId: car._id._str,
                            car: car.year + ' ' + car.make + ' ' + car.model + ' ' + car.trim,
                            dealerName: dealerShopName
                        })
                        subject = `[CarMate User Enquiry] ${car.make} ${car.model} ${car.year}`
                        contents = `Make: ${car.make} \n Model: ${car.model} \n Year: ${car.year} \n `

                        if (car.odometer) {
                            subject += ` ${car.odometer} km`
                            contents += `Odometer: ${car.odometer} km \n `
                        }

                        contents += `Price: ${car.price} \n `

                        if (car.stockNo) {
                            contents += `Stock No: ${car.stockNo} \n  \n `
                        }

                    } else {
                        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.DEALER_SHOWROOM_EMAIL_CLICK, {
                            dealerName: dealers.name,
                            email
                        })
                        let subject = '[CarMate User Enquiry]'
                        let contents = ''
                        
                    }

                    return Linking.openURL(`mailto:${email}?subject=${subject}&body=${contents}`);
                }
                else {
                    console.log('email is not supported')
                }
            }).catch(err => console.error('An error occurred', err))
        }
        else {
            console.log('No Email')
        }
    }


    _onClickShowroom (dealer) {

        this.props.viewShowroomListings(dealer)
        this.props.navigation.navigate('Showroom')
    }

    _pressADListing () {
        const {
            car
        } = this.props

        if( car.advertising && car.advertising.linkUrl ){
            const url = car.advertising.linkUrl
            const title = car.advertising.title ? car.advertising.title : 'Carmate AD'

            if (Platform.OS === 'ios' && url.indexOf("http:") > -1) {
                CoreHelpers.handleClick(url)
            } else {
                this.props.viewAdLink(url, title)
            }

            global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.AD_CLICK_FROM_SHOWROOM_LISTING_DETAIL, {
                title,
                url
            })
        }
    }

    _pressExclusiveCoupon (coupon) {
        this.props.viewExclusiveCouponDetail(coupon.id)
    }

    _getCarMainInfo () {
        const { car } = this.props
        return (
            <View style={[Styles.carMainInfoContainer]}>
                <View style={[Styles.carMainInfo, Styles.dateInfoContainer]}>
                    <View style={[Styles.carMainInfoIconContainer]}>
                        <Image style={Styles.carMainInfoIcon} source={Images.viewCount} resizeMode="contain"/>
                    </View>
                    <Text style={Styles.carMainInfoText}>{this._getDateInfo()}</Text>
                </View>

                <View style={Styles.seperator}></View>

                <View style={[Styles.carMainInfo, Styles.viewCountContainer]}>
                    <View style={[Styles.carMainInfoIconContainer]}>
                        <Image style={Styles.carMainInfoIcon} source={Images.timeIcon} resizeMode="contain"/>
                    </View>
                    <Text style={Styles.carMainInfoText}>{car.viewCount}</Text>
                </View>

                <View style={Styles.seperator}></View>

                <View style={[Styles.carMainInfo, Styles.savedCountContainer]}>
                    <View style={[Styles.carMainInfoIconContainer]}>
                        <Image style={Styles.carMainInfoIcon} source={Images.starBEmpty} resizeMode="contain"/>
                    </View>
                    <Text style={Styles.carMainInfoText}>20</Text>
                </View>
            </View>
        )
    }

    _getDateInfo () {
        const { car } = this.props
        const listedAt = moment(car.createdAt).fromNow()
        return listedAt
    }


    render() {
        const {
            car,
            fetching,
            userLocation,
            regions,
            pageStatus,
            carDetailTabStatus,
            callModalVisible
        } = this.props

        let imgContainerStyle = Styles.singleImageSlideContainer
        if( Platform.OS === 'ios' && car.images && car.images.length > 1){
            imgContainerStyle = Styles.imageSlideContainer
        }

        return (
            <View style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}]}>

                <ScrollView ref={ref => this.scrollView = ref} style={Styles.container}>

                    <View style={imgContainerStyle}>
                        <ImageSwiper
                            images={car.images}
                            showsPagination={true}
                            showsButtons={false}
                            onImagePress={this.openShowroomImageGallery} />
                    </View>

                    <View style={Styles.contentBlock}>
                        <View style={Styles.contentInnerBlock}>
                            <View style={Styles.nameContainer}>
                                <Text style={Styles.nameText}>{car.year} {car.make} {car.model} {car.trim}</Text>
                            </View>

                            <View style={Styles.priceMainInfoContainer}>
                                <View style={[Styles.priceContainer]}>
                                { car.price &&
                                    <ListingPrice
                                        originalPrice={car.originalPrice}
                                        planScore={car.planScore}
                                        price={car.price}
                                        type={ListingConstants.LIST_TYPE_LIST}
                                        hasCoupon={car.exclusiveCoupons && car.exclusiveCoupons.length > 1 ? true : false}
                                        arrowImgStyle={Styles.arrowImg}
                                        arrowImgContainerStyle={Styles.arrowImgContainerStyle}
                                        originalPriceStyle={Styles.specialOriginalPriceTextStyle}
                                        specialPriceTextStyle={Styles.specialPriceTextStyle}
                                        specialOriginalPriceTextStyle={Styles.specialOriginalPriceTextStyle}
                                        couponIconStyle={Styles.couponIcon}/>
                                }
                                </View>

                                {this._getCarMainInfo()}
                            </View>
                        </View>

                        <View style={[Styles.carDetailInfoContainer]}>
                            <CarInfoDetail
                                ref={'CarInfoDetail'}
                                tabLabel="CAR"
                                car={car}
                                regions={regions}
                                onViewMore={this._viewMore}
                                _pressADListing={this._pressADListing}
                            />
                        </View>

                        {car.exclusiveCoupons && car.exclusiveCoupons.length > 0 &&
                            <CouponInfo
                                tabLabel={"COUPON ("+car.exclusiveCoupons.length+")"}
                                dealerShop={car.dealerShop}
                                coupons={car.exclusiveCoupons}
                                onLayout={(evt) => this._handleRendering(evt, 2)}
                                _onClickExclusiveCoupon={this._pressExclusiveCoupon}
                            />
                        }
                        
                        <DealerInfo
                            car={car}
                            dealers={car.dealerShop}
                            dealerRegion={car.regions}
                            regions={regions}
                            userLocation={userLocation}
                            detailPage = {true}
                        />

                    </View>

                    <View style={[Styles.showroomButton]}>
                        <DetailButton 
                            title="Share This Car"
                            icon={Images.shareBIcon}
                        />
                    </View>

                    {car.advertising &&
                        <DetailAD 
                            adUrl={car.advertising.linkUrl} 
                            adImg={car.advertising.imageUrl}
                            adTitle={car.advertising.title}
                            FBEventTitle = {CoreConstants.FB_EVENT.AD_CLICK_FROM_COUPON_DETAIL}
                            viewAdLink={viewAdLink}
                            _pressADListing = {this._pressADListing} />
                    }

                </ScrollView>

                {callModalVisible &&
                    <CallModal
                        page={'showroomDetail'}
                        modalVisible={callModalVisible}
                        workshops={car.dealerShop ? car.dealerShop : sellerInfo}
                        workshopBranches={car.dealerShop ? car.dealerShop.length : 1}
                        textStyle={Styles.callModalText}
                        onCancel={() => this._closeModal('call')} />
                }

                {/*<SimpleAlert
                    modalVisible={this.props.simpleAlertVisible}
                    alertStyles={Styles.alertContainer}
                    alertIcon={Images.alertIcon}
                    alertDesc={this.props.simpleAlertMessage}
                    iconImgStyle={Styles.iconImg}
                    descTextStyle={Styles.descText}/>*/}

                <ImageGalleryModal />


                <View style={Styles.buttonContainer}>
                    <DetailFooter 
                        singleButton={false} 
                        multiButtons = {this.footerButton}
                    />
                </View>
            </View>
        )
    }
};

const mapStateToProps = (state, props) => {
    return {
        car: ShowroomSelectors.getShowroomSelecterCar(state),
        fetching: ShowroomSelectors.getCarFetching(state),
        regions: CoreSelectors.getListingRegions(state),
        simpleAlertVisible: CoreSelectors.getSimpleAlertVisible(state),
        simpleAlertMessage: CoreSelectors.getSimpleAlertMessage(state),
        loggedIn: UserSelectors.getLoggedIn(state),
        userLocation: UserSelectors.getUserLocation(state),
        pageStatus: CoreSelectors.getPageStatus(state),
        carDetailTabStatus: CoreSelectors.getCarDetailTabStatus(state),
        callModalVisible: ShowroomSelectors.getCallModalVisible(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openShowroomImageGallery: (index) => dispatch(ShowroomActions.openShowroomImageGallery(index)),
        viewShowroomListings: (dealer) => dispatch(ShowroomActions.viewShowroomListings(dealer)),
        viewExclusiveCouponDetail: (couponId) => dispatch(CouponActions.exclusiveCouponRequest(couponId)),
        viewAdLink: (url, title) => dispatch(CoreActions.viewAdLink(url, title)),
        resetShowroom: () => dispatch(ShowroomActions.resetShowroom()),
        fetchCar: (showroom) => dispatch(ListingsActions.fetchCar(showroom)),
        setCallModalVisible: (callModalVisible) => dispatch(ShowroomActions.setCallModalVisible(callModalVisible)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowroomListingDetail)
