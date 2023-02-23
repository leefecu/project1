import React, { PureComponent } from 'react';
import { 
    AsyncStorage,
    ScrollView, 
    View, 
    Text, 
    Image, 
    Button,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation';
import Config from 'react-native-config'
import { GoogleSignin } from 'react-native-google-signin'
import { Images, Colors, Metrics } from '../../../Themes/'

const FBSDK = require('react-native-fbsdk')
const {
    AccessToken,
    LoginButton,
    LoginManager
} = FBSDK

import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import NavigationActions from '../Actions'
import UserActions from '../../User/Actions'
import * as UserHelpers from '../../User/Helpers'

import MenuItem from './MenuItem'
import SubMenuItem from './SubMenuItem'
import GoogleAuthButton from '../../Core/Components/GoogleAuthButton'

import * as CoreSelectors from '../../Core/Selectors'
import * as UserSelectors from '../../User/Selectors'

//Styles
import Styles from './Styles/SideMenu'

class SideMenu extends PureComponent {

    static navigatorStyle = {
        drawUnderTabBar: Platform.OS === 'ios',
    };

    constructor (props) {
        super(props)

        this._handleLogin = this._handleLogin.bind(this)
        this._handleLogout = this._handleLogout.bind(this)
        this._handleSnsLogout = this._handleSnsLogout.bind(this)
        this._handleGoogleLogout = this._handleGoogleLogout.bind(this)
        this._handleLogin = this._handleLogin.bind(this)
        this._handleSignup = this._handleSignup.bind(this)
        this._handleTab = this._handleTab.bind(this)
        this._handleSellMyCars = this._handleSellMyCars.bind(this)
        this._handleMyPage = this._handleMyPage.bind(this)
        this._handleSupport = this._handleSupport.bind(this)
        this.closeSideMenu = this.closeSideMenu.bind(this)
        this._handleWebContent = this._handleWebContent.bind(this)
        this.getActiveSubMenuStyle = this.getActiveSubMenuStyle.bind(this)
    }

    getActiveMenuStyle (page) {
        const curPage = this.props.pageStatus
        
        return page === curPage
    }

    getActiveSubMenuStyle (page, tab) {
        const curPage = this.props.pageStatus
        const mypageTab = this.props.mypageStatus
        
        return page === curPage &&  page === 'mypage' && tab === mypageTab
    }

    _handleLogout() {
        AsyncStorage.multiRemove(['authToken', 'userId', 'snsType'])
        this.props.logout()
    }

    _handleSnsLogout() {
        AsyncStorage.multiRemove(['authToken', 'userId', 'snsType'])
        this.closeSideMenu()
        this.props.navigator.switchToTab({
            tabIndex: 0
        })
        this.props.snsLogout()
    }

    _handleGoogleLogout() {
        const self = this
        GoogleSignin.signOut()
        .then(() => {
            self._handleSnsLogout()
        })
        .catch((err) => {
            console.log(err)
        });
    }

    _handleLogin() {
        this.closeSideMenu()

        this.props.navigator.showModal({
            screen: 'carmate.Login',
            animationType: 'slide-up',
            backButtonHidden: true
        })

    }

    _handleSignup() {
        this.closeSideMenu()

        this.props.navigator.showModal({
            screen: 'carmate.Signup',
            animationType: 'slide-up',
            backButtonHidden: true
        })
    }

    _handleTab(tabIndex) {
        this.closeSideMenu()

        let page = ''
        switch ( tabIndex ) {
            case 0: {
                page = 'listings'
            }
            break
            case 1: {
                page = 'coupons'
            }
            break
            case 2: {
                page = 'saved'
            }
            break
        }
        this.props.changePage(page)

        this.props.navigator.switchToTab({
            tabIndex: tabIndex
        })

    }

    _handleSellMyCars() {
        this.closeSideMenu()
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.OPEN_SELL_MY_CAR_PAGE)
        this.props.navigator.showModal({
            screen: 'carmate.SellMyCar',
            animationType: 'slide-up',
            backButtonHidden: true
        })

    }

    _handleMyPage(type) {
        //temporarily blocked
        //this.props.changeMyPage(type)

        let screen = ''
        let title = ''
        switch (type) {
            case 'carsiamselling': {
                screen = 'carmate.CarsIamSelling'
                title = "Cars I'm Selling"
            }
            break
            case 'myinfo': {
                screen = 'carmate.MyInfo'
                title = "My Info"
            }
            break
        }

        this.closeSideMenu()
        global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.VIEW_MY_INFO)
        this.props.navigator.showModal({
            screen: screen,
            animationType: 'slide-up',
            backButtonHidden: true
        })
    }

    _handleSupport() {
        this.closeSideMenu()
        this.props.setSupportModalVisible(true)
    }

    _handleWebContent(type) {
        let url = ''
        let title = ''
        switch (type) {
            case 'tnc': {
                url = Config.WEB_URL + 'terms-and-conditions?carmateM=true'
                title = 'Terms and Conditions'
            }
            break
            case 'privacy': {
                url = Config.WEB_URL + 'privacy?carmateM=true'
                title = 'Terms and Conditions'
            }
            break
        }


        this.closeSideMenu()

        this.props.navigator.showModal({
            screen: 'carmate.WebContents',
            animationType: 'slide-up',
            backButtonHidden: true,
            passProps: {
                contentUrl: url,
                title: title
            },
        })

    }


    closeSideMenu() {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
            to: 'close'
        })
    }
    
    renderInitial() {
        const {
            loggedIn,
            snsType,
            user,
            authToken,
            userId,
            userEmail
        } = this.props
        
        return loggedIn ?
            <Text style={Styles.profileName}>{user && UserHelpers.getInitial(user)}</Text>
        :
            <Image source={Images.leftMenuGuest} style={Styles.personImage} resizeMode='cover' />
    }

    renderLogoutButton() {
        const {
            loggedIn,
            snsType,
        } = this.props

        const self = this

        if (snsType === 'facebook') {
            let fbLoginButton = <LoginButton
                loginBehaviorIOS={'native'}
                readPermissions={["public_profile", "email"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            alert("Log In failed with error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("Log In was cancelled");
                        } else {
                            AccessToken.getCurrentAccessToken().then((data) => {
                            const { accessToken } = data
                                self.initUser(accessToken)
                            })
                        }
                    }
                }
                onLogoutFinished={() => self._handleSnsLogout()}/>
            return Platform.OS === 'ios' ?
                <View style={[Styles.snsButtonRow]}>
                    <View style={[Styles.snsFBButton]}>
                        {fbLoginButton}
                    </View>
                </View>
                :
                <View style={Styles.snsButtonRow}><View style={Styles.fbLoginButtonContainer}>{fbLoginButton}</View></View>
        } else if (snsType === 'google') {
            return <View style={Styles.snsButtonRow}><GoogleAuthButton loggedIn={loggedIn} _onClick={() => this._handleGoogleLogout()} containerStyle={Styles.googleButton} /></View>
        }
        return <MenuItem label='Log Out' labelStyle={Styles.logoutText} menuType='logout' _onClick={() => this._handleLogout()} />
    }

    renderUserEmail(user) {
        if(user.email){
            return (
                <View>
                    <Text style={[Styles.text, Styles.emailText]} ellipsizeMode='tail' numberOfLines={1}>{user.email}</Text>
                </View>
            )
        } else if(user.emails){
            return (
                <View>
                    <Text style={[Styles.text, Styles.emailText]} ellipsizeMode='tail' numberOfLines={1}>{user.emails[0].address}</Text>
                </View>
            )
        }
    }

    render () {
        const {
            loggedIn,
            snsType,
            user,
            authToken,
            userId,
            userEmail,
            pageStatus
        } = this.props

        return (
            <ScrollView style={[Styles.container, Styles.iphoneXStyle]} testID='sideMenuContainer'>

                <View style={Styles.header}>

                    <View style={[Styles.imageColumn]}>
                        <View style={[Styles.circle, loggedIn ? Styles.blueCircle : Styles.greyCircle]}>
                            {loggedIn &&
                                <View style={Styles.backgroundImageContainer}>
                                    <Image style={Styles.backgroundImage} source={Images.leftMenuUserNameBack} resizeMode='contain'/>
                                </View>
                            }
                            {this.renderInitial()}
                        </View>
                    </View>

                    <View style={Styles.textColumn}>
                        <View>
                            <Text style={[Styles.text, Styles.userNameText, !loggedIn ? {paddingBottom: 3} : Styles.nameText]} ellipsizeMode='tail' numberOfLines={1}>
                                { loggedIn && user ? UserHelpers.getFullName(user) : 'Guest' }
                            </Text>
                            {!loggedIn &&
                                <View style={Styles.userLoginCotainer}>
                                    <TouchableWithoutFeedback onPress={() => this._handleLogin()}>
                                        <View style={[Styles.userButtonContainer, Styles.loginButtonContainer]}>
                                            <Text style={[Styles.userButton, Styles.pinkText]}>Log In</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this._handleSignup()}>
                                        <View style={[Styles.userButtonContainer, Styles.signupButtonContainer, {marginLeft: 5}]}>
                                            <Text style={[Styles.userButton, Styles.whiteText]}>Sign Up</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            }
                        </View>

                        {loggedIn && user && this.renderUserEmail(user)}
                    </View>

                </View>

                <View style={Styles.menuContainer}>
                    <View>
                        <MenuItem
                                testID='sideMenuCars'
                                label='Cars'
                                menuType='mainmenu'
                                activeStyle = {this.getActiveMenuStyle('listings')}
                                icon={{style: Styles.icon, name: 'leftMenuCarsForSaleIcon', size: 30, color: Colors.icon}}
                                activeIcon={{style: Styles.icon, name: 'leftMenuCarsForSaleActiveIcon', size: 30, color: Colors.icon}}
                                _onClick={() => this._handleTab(0)} />
                        <MenuItem
                                testID='sideMenuCoupons'
                                label='Coupons'
                                menuType='mainmenu'
                                activeStyle = {this.getActiveMenuStyle('coupons')}
                                icon={{style: Styles.icon, name: 'leftMenuCouponsIcon', size: 30, color: Colors.icon}}
                                activeIcon={{style: Styles.icon, name: 'leftMenuCouponsActiveIcon', size: 30, color: Colors.icon}}
                                _onClick={() => this._handleTab(1)} />
                        <MenuItem
                                testID='sideMenuSaved'
                                label='Saved'
                                menuType='mainmenu'
                                activeStyle = {this.getActiveMenuStyle('saved')}
                                icon={{style: Styles.icon, name: 'leftMenuSavedListIcon', size: 30, color: Colors.icon}}
                                activeIcon={{style: Styles.icon, name: 'leftMenuSavedListActiveIcon', size: 30, color: Colors.icon}}
                                _onClick={() => this._handleTab(2)} />
                        <MenuItem
                                testID='sideMenuSellmycar'
                                label='Sell My Car'
                                menuType='mainmenu'
                                activeStyle = {this.getActiveMenuStyle('sellmycar')}
                                icon={{style: Styles.icon, name: 'leftMenuSellMyCarIcon', size: 30, color: Colors.icon}}
                                activeIcon={{style: Styles.icon, name: 'leftMenuSellMyCarActiveIcon', size: 30, color: Colors.icon}}
                                _onClick={() => this._handleSellMyCars()}/>
                        <MenuItem
                                testID='sideMenuMypage'
                                label='My Page'
                                menuType='hasSubMenu'
                                activeStyle = {this.getActiveMenuStyle('mypage')}
                                icon={{style: Styles.icon, name: 'leftMenuMyPageIcon', size: 30, color: Colors.icon}}
                                activeIcon={{style: Styles.icon, name: 'leftMenuMyPageActiveIcon', size: 30, color: Colors.icon}} />
                            <SubMenuItem
                                testID='sideMenuCarsiamselling'
                                label="Cars I'm Selling"
                                lastSubMenu=''
                                activeStyle = {this.getActiveSubMenuStyle('mypage', 'carsiamselling')}
                                _onClick={() => loggedIn ? this._handleMyPage('carsiamselling') : this._handleLogin()}/>
                            <SubMenuItem
                                testID='sideMenuMyinfo'
                                label="My Info"
                                lastSubMenu='lastSubMenu'
                                activeStyle = {this.getActiveSubMenuStyle('mypage', 'myinfo')}
                                _onClick={() => loggedIn ? this._handleMyPage('myinfo') : this._handleLogin()}/>
                        <MenuItem
                            testID='sideMenuSupport'
                            label='Support'
                            menuType='mainmenu'
                            activeStyle = {this.getActiveMenuStyle('support')}
                            icon={{style: Styles.icon, name: 'leftMenuSupportIcon', size: 32, color: Colors.icon}}
                            activeIcon={{style: Styles.icon, name: 'leftMenuSupportActiveIcon', size: 30, color: Colors.icon}}
                            _onClick={() => this._handleSupport()} />
                        <MenuItem
                            testID='sideMenuTnc'
                            label='Terms & Conditions'
                            menuType='mainmenu'
                            activeStyle = {this.getActiveMenuStyle('tAndC')}
                            icon={{style: Styles.icon, name: 'leftMenuTncIcon', size: 25, color: Colors.icon}}
                            activeIcon={{style: Styles.icon, name: 'leftMenuTncActiveIcon', size: 30, color: Colors.icon}}
                            _onClick={() => this._handleWebContent('tnc')} />
                        <MenuItem
                            testID='sideMenuPrivacy'
                            label='Privacy Policy'
                            menuType='mainmenu'
                            activeStyle = {this.getActiveMenuStyle('privacyPolicy')}
                            icon={{style: Styles.icon, name: 'leftMenuPrivacyPolicyIcon', size: 30, color: Colors.icon}}
                            activeIcon={{style: Styles.icon, name: 'leftMenuPrivacyPolicyActiveIcon', size: 30, color: Colors.icon}}
                            _onClick={() => this._handleWebContent('privacy')} />

                        {loggedIn && this.renderLogoutButton()}
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: UserSelectors.getLoggedIn(state),
        snsType: UserSelectors.getSnsType(state),
        user: UserSelectors.getUser(state),
        authToken: UserSelectors.getAuthToken(state),
        userId: UserSelectors.getUserId(state),
        userEmail: UserSelectors.getUserEmail(state),
        pageStatus: CoreSelectors.getPageStatus(state),
        mypageStatus: CoreSelectors.getMyPageTabStatus(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logoutRequest()),
        snsLogout: () => dispatch(UserActions.logoutSuccess()),
        changePage: (page) => dispatch(CoreActions.changePage(page)),
        changeMyPage: (tab) => dispatch(CoreActions.changeMyPage(tab)),
        setSupportModalVisible: (supportModalVisible) => dispatch(CoreActions.setSupportModalVisible(supportModalVisible)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)