// @flow

import React, { PureComponent } from 'react'
import {
    Platform,
    Image,
    Linking,
    ScrollView,
    Share,
    View,
    Text,
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { assign, map, chunk } from 'lodash'
import { ApplicationStyles, Images, Metrics, Layout, Colors } from '../../../Themes'

import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import * as CoreHelpers from '../../Core/Helpers'
import * as CoreSelectors from '../../Core/Selectors'
import CouponActions from '../Actions'
import * as CouponConstants from '../Constants'
import * as CouponHelpers from '../Helpers'
import * as CouponSelectors from '../Selectors'
import ReviewActions from '../../Review/Actions'
import * as ReviewSelectors from '../../Review/Selectors'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'
import { calculateRegion } from '../../../Lib/MapHelpers'

import HOCRootContainer from '../../Core/Containers/HOCRootContainer'

import ImageSwiper from '../../Core/Components/ImageSwiper'
import LoadingView from '../../Core/Components/LoadingView'
import DetailButton from '../../Core/Components/DetailButton'
import DetailTitle from '../../Core/Components/DetailTitle'
import UList from '../../Core/Components/UList'
import CouponPrice from '../Components/CouponPrice'
import WorkshopInfo from '../../Core/Components/WorkshopInfo'
import DetailAD from '../../Core/Components/DetailAD'
import DetailFooter from '../../Core/Components/DetailFooter'
import ReviewInfo from '../../Core/Components/ReviewInfo'
import NoticeModal from '../../Core/Components/NoticeModal'
import CallModal from '../../Core/Components/CallModal'
import WriteReviewModal from '../../Review/Components/WriteReviewModal'
import SimpleAlert from '../../Core/Components/SimpleAlert'


//Styles
import Styles from './Styles/CouponDetail'

class CouponDetail extends PureComponent {

    constructor (props) {
        super(props)

        this._closeModal = this._closeModal.bind(this)
        this._onClickHowToUseCoupons = this._onClickHowToUseCoupons.bind(this)
        this._onClickReviews = this._onClickReviews.bind(this)
        this._onClickAllReviews = this._onClickAllReviews.bind(this)
        this._onClickBackToDetail = this._onClickBackToDetail.bind(this)
        this._onClickShare = this._onClickShare.bind(this)
        this.openImageGallery = this.openImageGallery.bind(this)
        
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        this.footerButton = [{
            buttonCotainerStyle: Styles.reviewButtonContain,
            buttonColor: Colors.brandColor,
            buttonStyle: Styles.reviewButton,
            buttonLabel: 'REVIEW',
            buttonIcon: Images.reviewButtonIcon,
            onClick: this._onClickReviews
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
                page: 'coupon',
                title: this.props.title,
                couponId: this.props.couponId,
                toggleTabs: true
            },
            navBarBackgroundColor: Colors.brandColor,
            navBarTextColor: Colors.snow,
            navBarButtonColor: Colors.snow,
            statusBarHidden: true
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
            case 'howitworks':
                this.props.setHowitworksModalVisible(false)
            break
            case 'review':
                this.props.setLoginModalForReviewVisible(false)
            break
            case 'myCoupons':
                this.props.setCouponLoginModalVisible(false)
                this.props.showSimpleAlert('Item was not saved')
            break
            case 'writeReview':
                this.props.setWriteReviewModalVisible(false)
            break
            case 'success':
                this.props.setSuccessModalVisible(false)
            break
        }
    }

    openImageGallery (index) {
        this.props.openImageGallery(index, this.props.navigator)
    }
    
    _onClickHowToUseCoupons () {
        this.props.setHowitworksModalVisible(true)
    }

    _onClickAllReviews () {
        const {
            coupon,
            navigator
        } = this.props

        this.props.viewReviews(coupon._id._str, navigator)
    
        navigator.push({
            screen: 'carmate.Reviews',
            title: 'Reviews('+coupon.reviewCount+')',
            animated: true,
            backButtonTitle: '',
            navigatorStyle: {
                tabBarHidden: true,
                drawUnderTabBar: true//Platform.OS === 'ios',
            }
        })
    }

    _onClickReviews () {
        if(this.props.loggedIn){
            this.props.setWriteReviewModalVisible(true)
        } else {
            this.props.setLoginModalForReviewVisible(true)
        }
        
    }

    _onClickCall = () => {
        this.props.setCallModalVisible(true)
    }

    _onClickBackToDetail() {

    }

    _onClickEmail = (email) => {
        const {
            coupon,
            title
        } = this.props

        if (email) {

            Linking.canOpenURL(`mailto:${email}`).then(supported => {

                if (supported) {

                    let subject = ''

                    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.WORKSHOP_EMAIL_CLICK, {
                        listingId: coupon._id._str,
                        car: coupon.name,
                        workshopName: coupon.workshopName
                    })
                    subject = `[CarMate User Enquiry(coupon)] ${coupon.name}`


                    return Linking.openURL(`mailto:${email}?subject=${subject}`);
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

    _onClickUserLogin = (type) => {

        const {
            setAfterLoginAction,
            setLoginModalForReviewVisible,
            postLoginAction,
            coupon
        } = this.props

        let couponId = ""
        let FBLog = ""
        switch(type){
            case 'review':
                couponId = coupon._id._str
                setLoginModalForReviewVisible(false)
                setAfterLoginAction({action: 'reviewCoupons', couponId })
                FBLog = CoreConstants.FB_EVENT.COUPON_LOGIN_FOR_REVIEW
            break
            case 'myCoupons':
                couponId = postLoginAction.id
                setAfterLoginAction({action: 'addToMyCoupon', couponId })
                FBLog = CoreConstants.FB_EVENT.COUPON_LOGIN_FOR_SAVE
            break
        }

        global.firebase.analytics().logEvent(FBLog, {
            couponId
        })
        
        this.props.navigator.showModal({
            screen: 'carmate.Login',
            animationType: 'slide-up',
            backButtonHidden: true
        })
    }

    _onClickShare () {
        const {
            coupon,
            title
        } = this.props

        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.SHARE_COUPON, {
            couponId: coupon._id._str
        })

        Share.share({
            message: 'CarMate | ' + title,
            url: Config.WEB_URL + 'coupon/' + coupon._id._str
          }, {
            // Android only:
            // dialogTitle: 'Share BAM goodness',
            // iOS only:
            // excludedActivityTypes: [
            //   'com.apple.UIKit.activity.PostToTwitter'
            // ]
          })
    }

    _scrolledBranchList = (e) => {
        const {
            coupon
        } = this.props

        if(coupon.workshops.length > 1){
            const contentOffset = e.nativeEvent.contentOffset.x;
            const mapMarker = Math.ceil(contentOffset/width)
            this.props.setMapMarkerRegion(mapMarker)   
        }
    }

    getGeoData () {
        const {
            coupon,
            regions
        } = this.props

        let suburb

        return map(coupon.workshops, (shop) => {
            suburb = CoreHelpers.getSuburb(shop.address)
            if ( ! suburb) {
                suburb = regions[shop.regions[0]]
            }
            return assign({
                title: suburb,
                suburb,
                latitude: shop.location[1],
                longitude: shop.location[0]
            }, shop)
        })
    }

    _renderSuburb () {
        const {coupon: {workshops}} = this.props

        let suburb = CoreHelpers.getSuburb(workshops[0].address)

        if (workshops.length > 1) {
            let restShopCount = workshops.length - 1
            suburb += ` + ${restShopCount}`
        }

        return suburb
    }

    _renderHighlightsContent = () =>{
        const {
            coupon
        } = this.props

        return (
            <View style={Styles.rowContainer}>
                <UList
                    containerClass={Styles.listItemRowInnerContainer}
                    itemClass={Styles.listItemRow}
                    textClass={Styles.listItemText}
                    items={map(coupon.description, (item) => {
                        description = CoreHelpers.shortcodeParser(item)
                        if (description.url) {
                            return {icon: null, label: description.text, url: description.url}
                        } else {
                            return {icon: null, label: description.text}
                        }
                    })}
                />
            </View>
        )
    }

    _renderTncContent = () => {
        const {
            coupon
        } = this.props

        return (
            <View style={Styles.rowContainer}>
                <UList
                    containerClass={Styles.listItemRowInnerContainer}
                    itemClass={Styles.listItemRow}
                    textClass={Styles.listItemText}
                    style={Styles.listDesc}
                    items={map(coupon.tandc, (item) => {
                        tandc = CoreHelpers.shortcodeParser(item)
                        if (tandc.url) {
                            return {icon: null, label: tandc.text, url: tandc.url}
                        } else {
                            return {icon: null, label: tandc.text}
                        }
                    })}
                />
            </View>
        )
    }

    _renderContactRightInfo = (txt) =>{
        return (
            <Text style={[Styles.titleText, Styles.rightTitleInfoText]}> 
                { txt } 
            </Text>
        )
    }

    _renderReviewRightInfo = (txt) => {
        return (
            <TouchableHighlight
                onPress={this._onClickAllReviews}
                underlayColor={Colors.snow} >
                <Text style={[Styles.titleText, Styles.rightTitleInfoText, Styles.linkText]}> 
                    { txt } 
                </Text>
            </TouchableHighlight>
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
            userLocation,
            callModalVisible,
            howitworksVisible,
            howitworksDesc,
            LoginModalForReviewVisible,
            needLoginModalVisible,
            writeReviewVisible,
            successDesc,
            successModalVisible,
            loginForReviewDesc,
            viewAdLink,
            user
        } = this.props

        if ( fetching && ! coupon) {
            return <LoadingView />
        }

        let sliderStyle = Styles.singleImageSlideContainer
        if(coupon.images && coupon.images.length > 1){
            sliderStyle = Styles.imageSlideContainer
        }

        let locations = this.getGeoData()
        const region = calculateRegion(locations, { latPadding: 0.05, longPadding: 0.05 })
        
        let branchesLen = 0
        if(coupon.workshops) {
            branchesLen = coupon.workshops.length
        }

        return (
            <View style={[ApplicationStyles.layout.fullBackground, Styles.iphoneXStyle, {position: 'relative'}]}>

                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    style={[Styles.container, coupon.generatedCode && Styles.savedContainer]}>

                    <View style={[Styles.innerContainer, Styles.shadow]}>
                        <View style={sliderStyle}>
                            <ImageSwiper 
                                images={coupon.images} 
                                showsPagination={true}
                                showsButtons={false}
                                onImagePress={this.openImageGallery}
                            />
                        </View>

                        <View style={Styles.contentBlock}>
                            <View style={[Layout.itemCentral, Styles.nameContainer]}>
                                <Text style={Styles.nameText} ellipsizeMode="tail" >{coupon.name}</Text>
                            </View>

                            <View style={[Layout.horizontalRow, Layout.itemCentral]}>
                                <View style={[Styles.workshopNameContainer]}>
                                    <Text style={Styles.workshopNameText}>{coupon.workshops[0].name}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[Styles.detailInfoContentContainer]}>
                            <View style={[Layout.itemCentral, Styles.contentBlock, Styles.priceContainer]}>
                                <CouponPrice exclusive={true} coupon={coupon} containerStyle={Styles.couponPriceContainer} exclusivePriceStyle={Styles.exclusivePrice}/>
                            </View>
                            <View style={[Layout.itemCentral, Styles.contentBlock, Styles.suburbTextContainer]}>
                                <Text style={Styles.suburbText}>{this._renderSuburb()}</Text>
                            </View>
                        </View>

                        <View style={[Styles.detailInfoContentContainer]}>
                            <DetailTitle title='Highlights' idx={1} />
                            {this._renderHighlightsContent()}
                        </View>

                    </View>

                    <View style={[Styles.innerContainer, Styles.shadow]}>
                        <View style={Styles.tncContainer}>
                            <DetailTitle title='Terms & Conditions' idx={2} />
                            {this._renderTncContent()}
                        </View>
                    </View>

                    <View style={[Styles.innerContainer, Styles.shadow]}>
                        <View style={Styles.tncContainer}>
                            <DetailTitle 
                                title='Reviews' 
                                idx={3}  
                                rightInfo={this._renderReviewRightInfo('View all reviews')} 
                                rightInfoStyle={Styles.branchInfoText} />
                            
                            <ReviewInfo
                                rating={coupon.reviewRatingAvg}
                                reviewsCnt={coupon.reviewCount}
                                onClickReviews={this._onClickAllReviews} />
                        </View>
                    </View>

                    <View style={[Styles.innerContainer, Styles.shadow]}>
                        <DetailTitle 
                            title='contact info' 
                            idx={4} 
                            rightInfo={this._renderContactRightInfo(branchesLen+' Branches')} 
                            rightInfoStyle={Styles.branchInfoText}/>

                        <WorkshopInfo tabLabel="Dealer" 
                                        _onScroll={this._scrolledBranchList}
                                        _onClickEmail={this._onClickEmail}
                                        shops={coupon.workshops} 
                                        regions={regions} 
                                        userLocation={userLocation} 
                                        couponViewCount={coupon.viewCount}
                                        privateCoupon={coupon.privateCoupon}/>
                    </View>

                    <View style={[Styles.showroomButton]}>
                        <DetailButton 
                            title="How to Use Coupons"
                            icon={Images.howtousecouponsButtonIcon}
                            onClick={() => this._onClickHowToUseCoupons()} />
                    </View>

                    <DetailButton 
                        title="Share This Coupon"
                        icon={Images.shareBIcon} 
                        onClick={() => this._onClickShare()}
                    />

                    {coupon.advertising &&
                        <DetailAD 
                            adUrl={coupon.advertising.linkUrl} 
                            adImg={coupon.advertising.imageUrl}
                            adTitle={coupon.advertising.title}
                            FBEventTitle = {CoreConstants.FB_EVENT.AD_CLICK_FROM_COUPON_DETAIL}
                            viewAdLink={viewAdLink} />
                    }

                </ScrollView>

                {callModalVisible &&
                    <CallModal
                        page={'coupon'}
                        modalVisible={callModalVisible}
                        itemId={coupon._id._str}
                        itemTitle={coupon.name}
                        FBEventTitle={CoreConstants.FB_EVENT.WORKSHOP_PHONE_CALL}
                        workshops={coupon.workshops}
                        workshopBranches={coupon.workshops.length}
                        textStyle={Styles.callModalText}
                        onCancel={() => this._closeModal('call')} />
                }

                {howitworksVisible &&
                    <NoticeModal
                        modalVisible={howitworksVisible}
                        titleStyle={Styles.titleStyle}
                        descriptions={howitworksDesc}
                        descriptionsStyle={Styles.descriptionsText}
                        subDesc="Easy as, isn’t it?"
                        subDescStyle={Styles.subDescText}
                        icon = {Images.howitworksModal}
                        iconStyle = {Styles.modalIcon}
                        cancelButton={false}
                        buttonLabel="Got It"
                        onClick={() => this._closeModal('howitworks')} />
                }

                {LoginModalForReviewVisible &&
                    <NoticeModal
                        modalVisible={LoginModalForReviewVisible}
                        titleStyle={Styles.titleStyle}
                        descriptions={loginForReviewDesc}
                        descriptionsStyle={Styles.descriptionsText}
                        subDesc="Sign up is super easy!"
                        subDescStyle={Styles.subDescText}
                        icon = {Images.reviewNeedToLogin}
                        iconStyle = {Styles.modalIcon}
                        secondButton={true}
                        buttonLabel="Log In"
                        secondLabel="Cancel"
                        onSecond={() => this._closeModal('review')}
                        onClick={() => this._onClickUserLogin('review')} />
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
                        onSecond={() => this._closeModal('myCoupons')}
                        onClick={() => this._onClickUserLogin('myCoupons')} />
                }

                {writeReviewVisible &&
                    <WriteReviewModal
                        page='couponDetail'
                        modalVisible={writeReviewVisible}
                        onPressCancel={() => this._closeModal('writeReview')}/>
                }

                {successModalVisible &&
                    <NoticeModal
                        key='success'
                        modalVisible={successModalVisible}
                        titleStyle={Styles.titleStyle}
                        descriptions={successDesc}
                        descriptionsStyle={Styles.descriptionsText}
                        subDesc="Thanks for your contribution."
                        subDescStyle={Styles.subDescText}
                        icon = {Images.reviewSuccess}
                        iconStyle = {Styles.modalIcon}
                        secondButton={false}
                        buttonLabel="Close"
                        onClick={() => this._closeModal('success')} />
                }
                
                <SimpleAlert
                    modalVisible={this.props.simpleAlertVisible}
                    alertStyles={Styles.alertContainer}
                    alertIcon={Images.alertIcon}
                    alertDesc={this.props.simpleAlertMessage}
                    iconImgStyle={Styles.iconImg}
                    descTextStyle={Styles.descText}/>
                
                <View style={[Styles.buttonContainer, Styles.iphoneXStyle]}>
                    <DetailFooter 
                        singleButton={false} 
                        multiButtons = {this.footerButton} />
                </View>
            </View>
        )

    }
}

CouponDetail.defaultProps = {
    howitworksDesc: {
        titleText: '3 STEPS TO USE COUPONS:',
        descDetails: [
            '1. Show coupons to service providers'
            , '2. Get services stated in the coupons'
            , '3. Pay discounted prices!' ]
    },
    loginForReviewDesc: {
        titleText: 'Please login to leave your review'
    },
    workDesc: {
        titleText: 'Please log in to save this item',
        descDetails: []
    },
    successDesc: {
        titleText: 'Your review is successfully posted!'
    }
}


const mapStateToProps = (state) => {
    return {
        coupon: CouponSelectors.getSelectedCoupon(state),
        fetching: CouponSelectors.getFetching(state),
        redeemOutcome: CouponSelectors.getRedeemOutcome(state),
        regions: CoreSelectors.getCouponRegions(state),
        partnerShops: CoreSelectors.getPartnerShops(state),
        mapMarkerRegion: CouponSelectors.getMapMarkerRegion(state),
        loggedIn: UserSelectors.getLoggedIn(state),
        userLocation: UserSelectors.getUserLocation(state),
        callModalVisible: CouponSelectors.getCallModalVisible(state),
        howitworksVisible: CouponSelectors.getHowitworksVisible(state),
        LoginModalForReviewVisible: ReviewSelectors.getNeedLoginModalForReviewVisible(state),
        needLoginModalVisible: CouponSelectors.getNeedLoginModalVisible(state),
        writeReviewVisible: ReviewSelectors.getWriteReviewVisible(state),
        successModalVisible: ReviewSelectors.getSuccessModalVisible(state),
        postLoginAction: CouponSelectors.getPostLoginAction(state),
        simpleAlertVisible: CoreSelectors.getSimpleAlertVisible(state),
        simpleAlertMessage: CoreSelectors.getSimpleAlertMessage(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openImageGallery: (index, navigator) => dispatch(CouponActions.openCouponImageGallery(index, navigator)),
        setMapMarkerRegion: (idx) => dispatch(CouponActions.setMapMarkerRegion(idx)),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
        setHowitworksModalVisible: (howitworksModalVisible) => dispatch(CouponActions.setHowitworksModalVisible(howitworksModalVisible)),
        setCallModalVisible: (callModalVisible) => dispatch(CouponActions.setCallModalVisible(callModalVisible)),
        setCouponLoginModalVisible: (needLoginModalVisible, postLoginAction) => dispatch(CouponActions.setCouponLoginModalVisible(needLoginModalVisible, postLoginAction)),
        setWriteReviewModalVisible: (writeReviewVisible, submitState) => dispatch(ReviewActions.setWriteReviewModalVisible(writeReviewVisible, submitState)),
        setLoginModalForReviewVisible: (needLoginModalForReviewVisible) => dispatch(ReviewActions.setLoginModalForReviewVisible(needLoginModalForReviewVisible)),
        setSuccessModalVisible: (successModalVisible) => dispatch(ReviewActions.setSuccessModalVisible(successModalVisible)),
        showSimpleAlert: (message) => dispatch(CoreActions.showSimpleAlert(message)),
        submitReviewRequest: () => dispatch(ReviewActions.submitReviewRequest()),
        viewAdLink: (url, title) => dispatch(CoreActions.viewAdLink(url, title)),
        viewReviews: (id, navigator) => dispatch(ReviewActions.reviewsRequest(id, navigator))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOCRootContainer('couponDetail')(CouponDetail))
