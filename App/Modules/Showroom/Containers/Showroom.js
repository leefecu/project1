import React, { PureComponent } from 'react';
import { 
    Dimensions,
    View, 
    Text, 
    Image,
    InteractionManager,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { TabViewAnimated, TabBarTop, TabBar } from 'react-native-tab-view'
import { ApplicationStyles, Images, Metrics, Layout, Colors } from '../../../Themes'

import CoreActions from '../../Core/Actions'
import ShowroomActions from '../Actions'
import * as ShowroomSelectors from '../Selectors'

import LoadingView from '../../Core/Components/LoadingView'
import ShowroomListings from '../Components/ShowroomListings'
import ShowroomAbout from '../Components/ShowroomAbout'
import TabView from '../../Core/Components/TabView'
import DetailFooter from '../../Core/Components/DetailFooter'
import CallModal from '../../Core/Components/CallModal'

//Styles
import Styles from './Styles/Showroom'

const { width, height } = Dimensions.get('window')
 
class Showroom extends PureComponent {

    constructor (props) {
        super(props)

        this._onClickCall = this._onClickCall.bind(this)
        this._onClickEmail = this._onClickEmail.bind(this)

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
                type: 'showroom',
                title: this.props.title
            },
            navBarBackgroundColor: Colors.brandColor,
            navBarTextColor: Colors.snow,
            navBarButtonColor: Colors.snow,
            statusBarHidden: true
        })
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({transitionCompletd: true})
        })
    }

    componentWillUnmount() {
        //this.props.resetShowroom()
    }

    _getLogoImageSource = () => {
        const {
            dealerShop
        } = this.props
        
        let logoImg = dealerShop.logo

        if ( logoImg ){
            logoImg = logoImg.replace('http:', 'https:')
            return (
                <View style={Styles.workshopLogoContainer}>
                    <Image style={Styles.workshopLogoImg} source={{uri: logoImg}} resizeMode='contain'/>
                </View>
            )
        }
        return (
            <View style={Styles.workshopLogoTextContainer}>
                <Text style={Styles.dealerShopNameText}>{dealerShop.name}</Text>
            </View>
        )
    
    }

    _closeModal (type) {
        switch(type){
            case 'call':
                this.props.setCallModalVisible(false)
            break
        }
    }

    _onClickCall () {
        this.props.setCallModalVisible(true)
    }

    _onClickEmail () {
        const {
            dealerShop
        } = this.props

        if (dealerShop.email) {
            Linking.canOpenURL(`mailto:${dealerShop.email}`).then(supported => {

                if (supported) {
                    global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.DEALER_EMAIL_CLICK, {
                          dealerName: dealerShop.name
                    })
                    let subject = `[CarMate User Enquiry] from your showroom visitor`
                    let contents = `———————————————————————— \n This email was sent from a Car Mate user \n www.carmate.co.nz \n `

                    return Linking.openURL(`mailto:${dealerShop.email}?subject=${subject}`);
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
 
    _handleChangeTab = (index) => {
        this.props.setTabIndex(index)
    }

    _renderHeader = (props) => {
        return <TabBar {...props} 
                style={Styles.tabsWrapStyle}
                tabStyle={Styles.tabStyle}
                pressColor={'transparent'}
                pressOpacity = {1}
                labelStyle={Styles.tabBarTextStyle}
                indicatorStyle={Styles.tabUnderLineStyle}/>
    }

    _renderScene = ({ route }) => {

        switch (route.key) {
            case '1':
                return (
                    <View style={Styles.page}>
                        <ShowroomListings navigator={this.props.navigator}/>
                    </View>
                )
            case '2':
                return (
                    <View style={Styles.page}>
                        <ShowroomAbout />
                    </View>
                ) 
            default:
                return null;
        }
    }

    render() {
        const {
            dealerShop,
            dealerShopShowroomTotal,
            loading,
            tabState,
            callModalVisible
        } = this.props

        if(loading){
            return <LoadingView />
        }
        
        return (
            <View style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}, Styles.container]}>
                <View style={[Styles.innerContainer, {paddingBottom:0, marginBottom:0}]}>
                    <View style={Styles.imageContainer}>
                        {this._getLogoImageSource()}
                    </View>
                </View>

                <View style={tabState.index === 0 ? Styles.tabListingViewContainer : Styles.tabAboutViewContainer}>
                    <TabView 
                        state={tabState}
                        _renderScene={this._renderScene}
                        _renderHeader={this._renderHeader}
                        _handleChangeTab={this._handleChangeTab}
                    />
                </View>

                { tabState.index === 1 &&
                    <View style={[Styles.buttonContainer, Styles.iphoneXStyle]}>
                        <DetailFooter 
                            singleButton={false} 
                            multiButtons = {this.footerButton}
                        />
                    </View>
                }


                {callModalVisible &&
                    <CallModal
                        page={'showroom'}
                        modalVisible={callModalVisible}
                        workshops={dealerShop}
                        workshopBranches={dealerShop.length}
                        textStyle={Styles.callModalText}
                        onCancel={() => this._closeModal('call')} />
                }
            </View>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        dealerShop: ShowroomSelectors.getDealershop(state),
        dealerShopShowroomTotal: ShowroomSelectors.getDealerShopShowroomListingLength(state),
        loading: ShowroomSelectors.getLoading(state),
        tabState: ShowroomSelectors.getTabState(state),
        callModalVisible: ShowroomSelectors.getCallModalVisible(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCarDetailTab: (tab) => dispatch(CoreActions.changeCarDetailTab(tab)),
        setTabIndex: (index) => dispatch(ShowroomActions.setTabIndex(index)),
        resetShowroom: () => dispatch(ShowroomActions.resetShowroom()),
        setCallModalVisible: (callModalVisible) => dispatch(ShowroomActions.setCallModalVisible(callModalVisible)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Showroom)