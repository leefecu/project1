import React, { PureComponent } from 'react'
import {
    TouchableHighlight,
    Image,
    Platform,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import { GoogleSignin } from 'react-native-google-signin'
import { Images, Colors, Layout, Metrics } from '../../../Themes'

const FBSDK = require('react-native-fbsdk')
const {
    AccessToken,
    LoginButton,
    LoginManager
} = FBSDK

import GoogleAuthButton from '../../Core/Components/GoogleAuthButton'

import UserActions from '../Actions'
import * as UserSelectors from '../Selectors'

import Styles from './Styles/SNSLoginForm'

class SNSNLoginForm extends PureComponent {

    constructor (props) {
        super(props)
        this.facebookLogin = this.facebookLogin.bind(this)
        this.googleLogin = this.googleLogin.bind(this)
        this._onClick = this._onClick.bind(this)

        GoogleSignin.configure({
            iosClientId: Config.GOOGLE_APK_IOS_CLIENT_ID,
        })
        LoginManager.logOut()
    }

    componentDidMount () {
        GoogleSignin.currentUserAsync().then((user) => {
            if (user && user.accessToken) {
                GoogleSignin.signOut()
                .then(() => {
                    this.props.snsLogout()
                })
                .catch((err) => {

                });
            }
        }).done()
    }

    _onClick () {
        const self = this
        if(self.props.error){
            self.props.resetError()   
        }

        LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
            function (result) {
                if (result.isCancelled) {
                    self.props.snsLoginFailure('Log In cancelled')
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data
                        self.facebookLogin(accessToken)
                    })
                }
            },
            function (error) {
                self.props.snsLoginFailure('Woops. There was problem with Facebook login. Please try again.')
            }
        )
    }

    facebookLogin = (token) => {
        const self = this
        fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,gender&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
            if (json.email) {
                self._handleSNSLogin({
                    accessToken: token,
                    email: json.email,
                    name: json.first_name+' '+json.last_name,
                    gender: json.gender,
                    id: json.id,
                    snsType: 'facebook'
                })

                this.props.closeModal()
            }
            else {
                self.props.snsLoginFailure('Woops. There was problem with Facebook login. Please try again.')
            }
        })
        .catch(() => {
            self.props.snsLoginFailure('Woops. There was problem with Facebook login. Please try again.')
        })
    }

    googleLogin = () => {
        const self = this
        GoogleSignin.signIn()
        .then((user) => {
            self._handleSNSLogin({
                accessToken: user.accessToken,
                email: user.email,
                name: user.name,
                id: user.id,
                snsType: 'google'
            })
            
            this.props.closeModal()
        })
        .catch((err) => {
            self.props.snsLoginFailure('Woops. There was problem with Google login. Please try again.')
        })
        .done()
    }

    _handleSNSLogin = (payload) => {
        this.props.snsLogin(payload)
    }

    render () {
        const {
            error,
            loggedIn,
            snsLogout
        } = this.props

        return (
        <View style={Styles.container}>
            <View style={[Styles.row, Layout.textCenterAlign, Layout.textMiddleAlign, {paddingRight: 5}]}>
                <View style={[Styles.snsLoginButtonContainer, Styles.facebookLoginButtonContainer]}>
                    <TouchableHighlight onPress={loggedIn ? snsLogout : this._onClick}>
                        <View style={[Styles.container, Styles.facebookLoginButton]}>
                            <Image style={Styles.facebookIcon} source={Images.facebookLoginIcon}/>
                            <Text style={Styles.loginText}>{loggedIn ? 'Logout' : 'Log In'}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <View style={[Styles.row, Layout.textCenterAlign, Layout.textMiddleAlign, {paddingLeft: 5}]}>
                <View style={[Styles.snsLoginButtonContainer, Styles.googleLoginButtonContainer]}>
                    <GoogleAuthButton loggedIn={loggedIn} _onClick={this.googleLogin} containerStyle={Styles.googleLoginButton}/>
                </View>
            </View>
        </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: UserSelectors.getLoggedIn(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        snsLogin: ({accessToken, email, name, id, snsType}) => dispatch(UserActions.snsLoginRequest(accessToken, email, name, id, snsType)),
        snsLogout: () => dispatch(UserActions.logoutSuccess()),
        snsLoginFailure: (error) => dispatch(UserActions.snsLoginFailure(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SNSNLoginForm)
