import React, { PureComponent } from 'react';
import { 
    ActivityIndicator,
    Dimensions,
    View, 
    Text, 
    Image,
    FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { ApplicationStyles, Images, Metrics, Layout, Colors } from '../../../Themes'

import * as CouponsSelectors from '../../Coupons/Selectors'
import ReviewActions from '../Actions'
import * as ReviewSelectors from '../Selectors'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'

import LoadingView from '../../Core/Components/LoadingView'
import NoSearchResult from '../../Core/Components/NoSearchResult'
import DetailFooter from '../../Core/Components/DetailFooter'
import Review from '../Components/Review'
import NoticeModal from '../../Core/Components/NoticeModal'
import WriteReviewModal from '../Components/WriteReviewModal'

//Styles
import Styles from './Styles/Reviews'

const { width, height } = Dimensions.get('window')
 
class Reviews extends PureComponent {
    
    constructor (props) {
        super(props)

        this._rowRenderer = this._rowRenderer.bind(this)
        this._renderFooter = this._renderFooter.bind(this)
        this._onEndReached = this._onEndReached.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
        this._onClickWriteReview = this._onClickWriteReview.bind(this)
        this._onClickBackToDetail = this._onClickBackToDetail.bind(this)
        this._onClickUserLogin = this._onClickUserLogin.bind(this)
        this._openLoginModal = this._openLoginModal.bind(this)
        this._renderNoReviews = this._renderNoReviews.bind(this)
        this._renderReviewsRow = this._renderReviewsRow.bind(this)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

        this.footerButton = {
            buttonCotainerStyle: Styles.reviewButtonContain,
            buttonColor: Colors.primaryPink,
            buttonStyle: Styles.reviewButton,
            buttonLabel: 'Write a REVIEW',
            buttonIcon: Images.reviewButtonIcon,
            onClick: this._onClickWriteReview
        }

    }

    componentWillReceiveProps(nextProps) {
        if(this.props.total !== nextProps.total){

            this.props.navigator.setTitle({
              title: 'Reviews('+nextProps.total+')',
            });

        }

    }

    componentWillUnmount () {
        this.props.resetReviews()
    }

    onNavigatorEvent(event) {
        if (event && event.type === 'DeepLink' && event.link === 'reviews/writeReview') {
            this.props.setWriteReviewModalVisible(true)
        }

    }

    _closeModal (type) {
        switch(type){
            case 'success':
                this.props.setSuccessModalVisible(false)
            break
            case 'writeReview':
                this.props.setWriteReviewModalVisible(false)
            break
            case 'review':
                this.props.setLoginModalForReviewVisible(false)
            break
        }
    }

    _onClickSubmit() {
        this.props.submitReviewRequest()
    }

    _onClickWriteReview () {
        const {
            loggedIn
        } = this.props

        if(loggedIn){
            this.props.setWriteReviewModalVisible(true)
        } else {
            this.props.setLoginModalForReviewVisible(true)
        }
        
    }

    _onClickUserLogin () {
        this.props.setLoginModalForReviewVisible(false)
        setTimeout(() => {this._openLoginModal()}, 0);
    }

    _openLoginModal() {
        const {
            setAfterLoginAction,
            coupon
        } = this.props

        /*global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.LISTING_SAVE_LOGIN, {
            listingId
        })*/

        setAfterLoginAction({action: 'reviewCoupons'})
        
        this.props.navigator.showModal({
            screen: 'carmate.Login',
            animationType: 'slide-up',
            backButtonHidden: true
        })
    }

    _onClickBackToDetail() {
        this.props.setSuccessModalVisible(false)
        this.props.navigator.pop({
            animated: true
        })
    }

    _onEndReached() {

    }

    _onRefresh() {
        this.props.setRefreshing(true)
        this.props.refreshReviews(this.props.selectedCoupon._id._str, this.props.navigator)
    }

    _rowRenderer(review, idx) {
        return (
            <View style={[Styles.row, Styles.itemContainer]} >
                <Review review={review}/>
            </View>
        )
    }

    _renderFooter () {
        return (
            <View style={Styles.spinnerWrapper}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        )
        
    }

    _renderReviewsRow() {
        const {
            refreshing,
            fetching,
            reviews
        } = this.props

        return(
            <View ref={ref => this.listRoot = ref} style={[Styles.listContainer]}>
                <List containerStyle={[Styles.listInnerContainer]}>
                    <FlatList
                        data={reviews}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={15}
                        onEndReachedThreshold={1}
                        onEndReached={this._onEndReached}
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                        renderItem={({ item, index }) => this._rowRenderer(item, index)}
                        ListFooterComponent={fetching && this._renderFooter}
                    />
                </List>

            </View>
        )

    }

    _renderNoReviews() {

        return (
                <View style={Styles.noReviewContainer}>
                    <NoSearchResult
                        descText = 'No Reviews Yet'
                        descSubText = 'Write a first review for this coupon!'
                        buttonStatus = {false}
                        icon = {Images.noReview} />
                </View>        
        )

    }

    render() {
        const{
            initialLoading,
            loading,
            fetching,
            total,
            loginForReviewDesc,
            LoginModalForReviewVisible,
            writeReviewVisible,
            successDesc,
            successModalVisible
        } = this.props

        const noResult = false

        if(initialLoading || (loading && fetching)){
            return (
                <View ref='reviews' style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}]}>
                    <LoadingView />
                </View>
            )
        }
        
        return (
            <View ref='reviews' style={[ApplicationStyles.layout.fullBackground, Styles.iphoneXStyle, {position: 'relative'}]}>
                {total > 0 ?
                    this._renderReviewsRow()
                :
                    this._renderNoReviews()
                }     

                <View style={[Styles.buttonContainer, Styles.iphoneXStyle]}>
                    <DetailFooter 
                        singleButton={true} 
                        button = {this.footerButton}
                        multiButtons = {false}
                    />
                </View>


                {LoginModalForReviewVisible &&
                    <NoticeModal
                        key='login'
                        modalVisible={true}
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
                        onClick={() => this._onClickUserLogin()} />
                }

                {writeReviewVisible &&
                    <WriteReviewModal
                        page='reviewList'
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
                        secondButton={true}
                        buttonLabel="Back to Detail"
                        secondLabel="Close"
                        onSecond={() => this._closeModal('success')}
                        onClick={() => this._onClickBackToDetail()} />
                }
                
            </View>
        )
    }
};


Reviews.defaultProps = {
    loginForReviewDesc: {
        titleText: 'Please login to leave your review'
    },
    successDesc: {
        titleText: 'Your review is successfully posted!'
    }
}

const mapStateToProps = (state) => {
    return {
        initialLoading: ReviewSelectors.getInitialLoading(state),
        loading:  ReviewSelectors.getLoading(state),
        fetching:  ReviewSelectors.getFetching(state),
        refreshing:  ReviewSelectors.getRefreshing(state),
        total: ReviewSelectors.getTotal(state),
        reviews: ReviewSelectors.getReviews(state),
        selectedCoupon: CouponsSelectors.getSelectedCoupon(state),
        LoginModalForReviewVisible: ReviewSelectors.getNeedLoginModalForReviewVisible(state),
        writeReviewVisible: ReviewSelectors.getWriteReviewVisible(state),
        successModalVisible: ReviewSelectors.getSuccessModalVisible(state),
        loggedIn: UserSelectors.getLoggedIn(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshReviews: (id, navigator) => dispatch(ReviewActions.reviewsRequest(id, navigator)),
        submitReviewRequest: () => dispatch(ReviewActions.submitReviewRequest()),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
        setRefreshing: (refreshing) => dispatch(ReviewActions.setReviewRefreshing(refreshing)),
        setSuccessModalVisible: (successModalVisible) => dispatch(ReviewActions.setSuccessModalVisible(successModalVisible)),
        setWriteReviewModalVisible: (writeReviewVisible, submitState) => dispatch(ReviewActions.setWriteReviewModalVisible(writeReviewVisible, submitState)),
        setLoginModalForReviewVisible: (needLoginModalForReviewVisible, postLoginAction) => dispatch(ReviewActions.setLoginModalForReviewVisible(needLoginModalForReviewVisible, postLoginAction)),
        resetReviews: () => dispatch(ReviewActions.resetReviews())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)