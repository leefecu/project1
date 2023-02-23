// @flow

import React, { PureComponent } from 'react';
import {
    Platform,
    Animated,
    Linking,
    Dimensions,
    InteractionManager,
    ScrollView,
    Share,
    View,
    Image,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import PropTypes from 'prop-types';
import { assign, clone, drop, map, noop } from 'lodash'
import moment from 'moment'
import { ApplicationStyles, Images, Colors, Metrics } from '../../../Themes/'

import CouponActions from '../../Coupons/Actions'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import * as CoreHelpers from '../../Core/Helpers'
import * as CoreSelectors from '../../Core/Selectors'
import ListingsActions from '../Actions'
import * as ListingsConstants from '../Constants'
import * as ListingsSelectors from '../Selectors'
import ShowroomActions from '../../Showroom/Actions'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'
import { calculateRegion } from '../../../Lib/MapHelpers'

import ImageSwiper from '../../Core/Components/ImageSwiper'
import DetailButton from '../../Core/Components/DetailButton'
import DealerInfo from '../../Core/Components/DealerInfo'
import SellerInfo from '../../Core/Components/SellerInfo'
import DetailAD from '../../Core/Components/DetailAD'
import DetailFooter from '../../Core/Components/DetailFooter'
import ListingPrice from '../Components/ListingPrice'
import CarInfoDetail from '../Components/CarInfoDetail'
import CouponInfo from '../Components/CouponInfo'
import CallModal from '../../Core/Components/CallModal'
import NoticeModal from '../../Core/Components/NoticeModal'
import FavouriteButton from '../Components/FavouriteButton'
import SimpleAlert from '../../Core/Components/SimpleAlert'

//Styles
import Styles from './Styles/ListingDetail'

class ListingDetail extends PureComponent {

    constructor (props) {
        super(props)

        this._closeModal = this._closeModal.bind(this)
        this._onClickCall = this._onClickCall.bind(this)
        this._onClickEmail = this._onClickEmail.bind(this)
        this._onClickUserLogin = this._onClickUserLogin.bind(this)
        this._onClickShare = this._onClickShare.bind(this)
        this.openImageGallery = this.openImageGallery.bind(this)
        this._pressADListing = this._pressADListing.bind(this)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

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
            navBarHeight: Metrics.navBarHeight-10,
            navBarTopPadding: 24,
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator,
                type: 'detail',
                page: 'listing',
                title: this.props.title,
                listingId: this.props.listingId,
                toggleTabs: true
            },
            navBarBackgroundColor: Colors.brandColor,
            navBarTextColor: Colors.snow,
            navBarButtonColor: Colors.snow,
            statusBarHidden: true
        })
    }

    componentDidMount() {

        if (! this.props.showroom) {
            this.props.resetShowroom()
        }
        InteractionManager.runAfterInteractions(() => {
            this.setState({transitionCompletd: true})
            this.props.fetchCar(this.props.showroom)
        })
    }

    onNavigatorEvent(event) {
        if (event && event.type == 'NavBarButtonPress' && event.id == 'close') {
            this.props.navigator.toggleTabs({
                to: 'shown',
                animated: true
            })

            this.props.navigator.pop({
                animated: true
            })
        }
    }

    _closeModal (type) {
        switch(type){
            case 'call':
                this.props.setCallModalVisible(false)
            break
            case 'login':
                this.props.setListingLoginModalVisible(false)
                this.props.showSimpleAlert('Item was not saved')
            break
        }
    }

    _onClickCall () {
        const {
            car
        } = this.props


        let dealerShopPhone
        if ( car.dealerShop ) {
            if (typeof car.dealerShop.phone === 'object') {
                dealerShopPhone = car.dealerShop.phone[0]
            } else {
                dealerShopPhone = car.dealerShop.phone
            }
        } else {
            dealerShopPhone = car.phone
        }

        if(dealerShopPhone){
            let dealerShopName = ""
            if ( car.dealerShop ) {
                dealerShopName = car.dealerShop.name
            }
            let phoneNumber = dealerShopPhone.replace(' ', '').replace('(','').replace(')','')
            if (phoneNumber) {
                global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.DEALER_PHONE_CALL, {
                    listingId: car._id._str,
                    car: car.year + ' ' + car.make + ' ' + car.model + ' ' + car.trim,
                    dealerName: dealerShopName,
                    phoneNumber: dealerShopPhone
                })
                phoneNumber = phoneNumber.replace(/\s/g,'')
                CoreHelpers.handleClick(`tel:${phoneNumber}`)
            }
        }
    }

    _onClickUserLogin() {
        const {
            car,
            setAfterLoginAction,
            postLoginAction
        } = this.props

        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_SAVE_LOGIN, {
            listingId: car._id._str
        })

        setAfterLoginAction({action: 'addToMyListing', listingId: postLoginAction.id})
        
        this.props.navigator.showModal({
            screen: 'carmate.Login',
            animationType: 'slide-up',
            backButtonHidden: true
        })
    }
    openImageGallery (index) {
        this.props.openImageGallery(index, this.props.navigator)
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

        this.props.navigator.push({
            screen: 'carmate.Showroom',
            title: dealer.name,
            animated: true,
            backButtonHidden: true,
            passProps: {
                title: dealer.name
            },
            navigatorStyle: {
                tabBarHidden: true,
                drawUnderTabBar: true//Platform.OS === 'ios',
            }
        })
    }

    _onClickShare () {
        const {
            car,
            title
        } = this.props

        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.SHARE_CAR, {
            listingId: car._id._str
        })
        Share.share({
            message: 'CarMate | ' +title,
            url: Config.WEB_URL + 'listing/' + car._id
            //url:'https://www.carmate.co.nz/listings/' + car._id
          }, {
            // Android only:
            // dialogTitle: 'Share BAM goodness',
            // iOS only:
            // excludedActivityTypes: [
            //   'com.apple.UIKit.activity.PostToTwitter'
            // ]
          })
    }

    render() {
        const {
            car,
            fetching,
            userLocation,
            regions,
            pageStatus,
            carDetailTabStatus,
            callModalVisible,
            needLoginModalVisible,
            viewAdLink,
            simpleAlertVisible
        } = this.props

        let imgContainerStyle = Styles.singleImageSlideContainer
        if( Platform.OS === 'ios' && car.images && car.images.length > 1){
            imgContainerStyle = Styles.imageSlideContainer
        }

        let sellerInfo
        if(!car.dealerShop){
            sellerInfo = {
                'email' : car.email,
                'phone' : car.phone,
                'suburb' : car.suburb,
                'region' : car.regions[0]
            }
        }

        return (
            <View style={[ApplicationStyles.layout.fullBackground, Styles.iphoneXStyle, {position: 'relative'}]}>

                <ScrollView ref={ref => this.scrollView = ref} style={[Styles.container]}>

                    <View style={imgContainerStyle}>
                        <ImageSwiper
                            images={car.images}
                            showsPagination={true}
                            showsButtons={false}
                            onImagePress={this.openImageGallery} />
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
                                        type={ListingsConstants.LIST_TYPE_LIST}
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
                                navigator={this.props.navigator}
                                tabLabel={"COUPON ("+car.exclusiveCoupons.length+")"}
                                dealerShop={car.dealerShop}
                                coupons={car.exclusiveCoupons}
                                onLayout={(evt) => this._handleRendering(evt, 2)}
                            />
                        }
                        
                        {car.dealerShop ?
                            <DealerInfo
                                car={car}
                                dealers={car.dealerShop}
                                dealerRegion={car.regions}
                                regions={regions}
                                userLocation={userLocation}
                                detailPage = {true}
                                _onClickEmail = {this._onClickEmail}
                            />
                        :
                            <SellerInfo
                                regions={regions}
                                sellerInfo={sellerInfo}
                                userLocation={userLocation}
                                onClickEmail={this._onClickEmail}
                                onClickCall={this._onClickCall}
                                detailPage = {true}
                            />
                        }

                    </View>

                    {car.dealerShop &&
                        <View style={[Styles.showroomButton]}>
                            <DetailButton 
                                title="Dealer’s Other Cars"
                                icon={Images.showroomIcon}
                                onClick={() => this._onClickShowroom(car.dealerShop)}
                            />
                        </View>
                    }
                    <DetailButton 
                        title="Share This Car"
                        icon={Images.shareBIcon}
                        onClick={() => this._onClickShare()}
                    />
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
                        page={'listing'}
                        modalVisible={callModalVisible}
                        itemId={car._id}
                        FBEventTitle={CoreConstants.FB_EVENT.DEALER_PHONE_CALL}
                        workshops={car.dealerShop ? car.dealerShop : sellerInfo}
                        workshopBranches={car.dealerShop ? car.dealerShop.length : 1}
                        textStyle={Styles.callModalText}
                        onCancel={() => this._closeModal('call')} />
                }

                {needLoginModalVisible &&
                    <NoticeModal
                        animationType='fade'
                        modalVisible={needLoginModalVisible}
                        titleTextStyle={Styles.titleText}
                        descriptions={this.props.workDesc}
                        descriptionsStyle={Styles.descriptionsText}
                        subDesc="Sign up is super easy!"
                        subDescStyle={Styles.subDescText}
                        icon = {Images.needToLogin}
                        iconStyle = {Styles.modalIcon}
                        secondButton={true}
                        buttonLabel="Log In"
                        secondLabel="Cancel"
                        onSecond={() => this._closeModal('login')}
                        onClick={() => this._onClickUserLogin()}
                    />
                }

                {simpleAlertVisible &&
                    <SimpleAlert
                        modalVisible={simpleAlertVisible}
                        alertStyles={Styles.alertContainer}
                        alertIcon={Images.alertIcon}
                        alertDesc={this.props.simpleAlertMessage}
                        iconImgStyle={Styles.iconImg}
                        descTextStyle={Styles.descText}
                    />
                }

                <View style={[Styles.buttonContainer, Styles.iphoneXStyle]}>
                    <DetailFooter 
                        singleButton={false} 
                        multiButtons = {this.footerButton}
                    />
                </View>
            </View>
        )
    }
};

ListingDetail.defaultProps = {
    workDesc: {}
}

const mapStateToProps = (state, props) => {
    return {
        car: ListingsSelectors.getSelecterCar(state),
        fetching: ListingsSelectors.getCarFetching(state),
        postLoginAction: ListingsSelectors.getPostLoginAction(state),
        regions: CoreSelectors.getListingRegions(state),
        loggedIn: UserSelectors.getLoggedIn(state),
        userLocation: UserSelectors.getUserLocation(state),
        pageStatus: CoreSelectors.getPageStatus(state),
        carDetailTabStatus: CoreSelectors.getCarDetailTabStatus(state),
        simpleAlertVisible: CoreSelectors.getSimpleAlertVisible(state),
        simpleAlertMessage: CoreSelectors.getSimpleAlertMessage(state),
        callModalVisible: ListingsSelectors.getCallModalVisible(state),
        needLoginModalVisible: ListingsSelectors.getNeedLoginModalVisible(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        /*changeCarDetailTab: (tab) => dispatch(CoreActions.changeCarDetailTab(tab)),
        viewUserExclusiveCouponDetail: (couponId) => dispatch(CouponActions.userExclusiveCouponRequest(couponId)),
        viewExclusiveCouponDetail: (couponId) => dispatch(CouponActions.exclusiveCouponRequest(couponId)),*/
        openImageGallery: (index, navigator) => dispatch(ListingsActions.openImageGallery(index, navigator)),
        viewShowroomListings: (dealer) => dispatch(ShowroomActions.viewShowroomListings(dealer)),
        resetShowroom: () => dispatch(ShowroomActions.resetShowroom()),
        fetchCar: (showroom) => dispatch(ListingsActions.fetchCar(showroom)),
        setCallModalVisible: (callModalVisible) => dispatch(ListingsActions.setCallModalVisible(callModalVisible)),
        setListingLoginModalVisible: (needLoginModalVisible) => dispatch(ListingsActions.setListingLoginModalVisible(needLoginModalVisible)),
        showSimpleAlert: (message) => dispatch(CoreActions.showSimpleAlert(message)),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
        viewAdLink: (url, title) => dispatch(CoreActions.viewAdLink(url, title)),
    }
}

ListingDetail.defaultProps = {
    workDesc: {
        titleText: 'Please log in to save this item',
        descDetails: []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetail)
