// @flow

import React from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Image,
    Platform,
    Keyboard,
    LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import { assign } from 'lodash'
//import { GoogleSignin } from 'react-native-google-signin'
/*const FBSDK = require('react-native-fbsdk')
const {
    LoginManager
} = FBSDK*/

import UserActions from '../Actions'
import * as UserConstants from '../Constants'
import * as UserSelectors from '../Selectors'
import {validateEmail} from '../../Core/Helpers'

import {Colors, Images, Metrics, Layout} from '../../../Themes'

import Button from '../../Core/Components/Button'
import ScrollView from '../../Core/Components/ScrollView'
import LoadingView from '../../Core/Components/LoadingView'
//import SNSLoginForm from '../Components/SNSLoginForm'

import Styles from './Styles/AuthForm'

class Signup extends React.Component {

    props: SignupProps

    state: {
        email: string,
        password: string,
        name: string,
        mobile: string,
        address: string,
        visibleHeight: number,
        rememberMe: boolean
    };

    isAttempting: boolean;
    keyboardDidShowListener: Object;
    keyboardDidHideListener: Object;

    static navigatorStyle = {
        drawUnderNavBar: Platform.OS === 'ios',
        navBarBackgroundColor: Colors.brandColor,
        navBarTextColor: Colors.snow,
        navBarNoBorder: true,
        navBarButtonColor: Colors.snow,
        navBarRightButtonColor: Colors.snow,
        navBarTitleTextCentered: true
    };


    static navigatorButtons = {
        rightButtons: [
            {
                icon: Images.closeModal,
                id: 'close',
                testID: 'signup_close_btn',
                buttonColor: Colors.snow,
                buttonFontSize: 18,
                buttonFontWeight: '600'
            }
        ]
    };
    constructor (props: SignupProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            mobile: '',
            address: '',
            rememberMe: true,
            visibleHeight: Metrics.screenHeight,
            form: {
                invalid: false,
                name: {
                    valid: true,
                    error: null
                },
                email: {
                    valid: true,
                    error: null
                },
                password: {
                    valid: true,
                    error: null
                }
            }
        }
        this.isAttempting = false
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
        this.props.navigator.setTitle({
            title: 'Sign Up'
        })
    }

    componentWillReceiveProps (newProps) {
        this.forceUpdate()
        // Did the login attempt complete?
        /*if (this.isAttempting && !newProps.fetching) {
            NavigationActions.pop()
        }*/
    }

    componentWillMount () {
        // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
        // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

        /*GoogleSignin.configure({
            iosClientId: Config.GOOGLE_APK_IOS_CLIENT_ID
        })*/
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
        this.props.resetError()
    }

    componentDidMount () {
        /*GoogleSignin.currentUserAsync().then((user) => {
            if (user && user.accessToken) {
                GoogleSignin.signOut()
                .then(() => {
                    this.props.snsLogout()
                })
                .catch((err) => {

                });
            }
        }).done()*/
    }

    onNavigatorEvent (event) {
        if (event && event.type == 'NavBarButtonPress' && event.id == 'close') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    _onClickTnC = () => {
        NavigationActions.tnc()
    }

    _onClickPrivacy = () => {
        NavigationActions.privacy()
    }

    keyboardDidShow = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        let newSize = Metrics.screenHeight - (e.endCoordinates.height + Metrics.navBarHeight + Metrics.smallMargin)
        this.setState({
            visibleHeight: newSize
        })
    }

    keyboardDidHide = (e) => {
        // Animation types easeInEaseOut/linear/spring
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
            visibleHeight: Metrics.screenHeight
        })
    }

    handleSignup = () => {
        const { email, password, name, rememberMe } = this.state

        let form = assign(this.state.form, {
            invalid: false,
            name: {
                valid: true,
                error: null
            },
            email: {
                valid: true,
                error: null
            },
            password: {
                valid: true,
                error: null
            }
        })

        if (!name || name === undefined) {
            form.invalid = true
            form.name.valid = false
            form.name.error = 'Please enter full name'
        }
        if (!email || email === undefined) {
            form.invalid = true
            form.email.valid = false
            form.email.error = 'Please enter email address'
        } else if (!validateEmail(email)) {
            form.invalid = true
            form.email.valid = false
            form.email.error = 'Please enter valid email address'
        }
        if (!password || password === undefined) {
            form.invalid = true
            form.password.valid = false
            form.password.error = 'Please enter password'
        }
        else if (password.length < UserConstants.MIN_PASSWORD_LENGTH) {
            form.invalid = true
            form.password.valid = false
            form.password.error = 'Password must be at least 6 characters long'
        }

        if (form.invalid === false) {
            this.props.setAfterLoginAction({action: 'saved'})
            this.props.signup(email, password, name, rememberMe, this.props.navigator)
        } else {
            this.setState({form})
        }
    }

    handleSNSLogin = (payload) => {
        this.props.snsLogin(payload)
    }

    handleChangeName = (text) => {
        this.setState({ name: text })
    }

    handleChangeUsername = (text) => {
        this.setState({ email: text })
    }

    handleChangePassword = (text) => {
        this.setState({ password: text })
    }

    handleLogin = () => {

        this.props.navigator.resetTo({
            screen: 'carmate.Login',
            title: 'Log In',
            animated: true,
            backButtonTitle: '',
        })

    }

    initUser = (token) => {
        const self = this
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
            self.handleSNSLogin({
                accessToken: token,
                email: json.email,
                name: json.name,
                id: json.id,
                snsType: 'facebook'
            })
        })
        .catch(() => {
            reject('ERROR GETTING DATA FROM FACEBOOK')
        })
    }

    facebookLogin = (token) => {
        const self = this
        fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,gender&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
            self.handleSNSLogin({
                accessToken: token,
                email: json.email,
                name: json.first_name + json.last_name,
                gender: json.gender,
                id: json.id,
                snsType: 'facebook'
            })
        })
        .catch(() => {
            reject('ERROR GETTING DATA FROM FACEBOOK')
        })
    }

    googleLogin = () => {
        const self = this
        /*GoogleSignin.signIn()
        .then((user) => {
            self.handleSNSLogin({
                accessToken: user.accessToken,
                email: user.email,
                name: user.givenName + ' ' + user.familyName,
                id: user.id,
                snsType: 'google'
            })
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err)
        })
        .done()*/
    }

    render () {
        const self = this
        const {
            name,
            email,
            password,
            mobile,
            address,
            form
        } = this.state
        const {
            error,
            fetching
        } = this.props
        const editable = !fetching
        const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly

        return (
            <View style={[Styles.container, Styles.iphoneXStyle]}>
            <ScrollView
                contentContainerStyle={{justifyContent: 'center'}}
                style={[Styles.innerContainer]}
                keyboardShouldPersistTaps>

                <View style={[Styles.form, Styles.signupForm]}>
                    <View style={Styles.logoContainer}>
                        <Image style={Styles.logo} source={Images.logoLogin} resizeMode={'contain'} />
                    </View>

                    <View>
                        <View style={[Styles.subRow, Styles.textInputContainer, Styles.textInputTopRadius]}>
                            <View style={Styles.iconContainer}>
                                <Image style={[Styles.loginInputIcon, Styles.emailInputIcon]} source={Images.authNameIcon} resizeMode={'contain'}/>
                            </View>
                            <View style={Styles.inputContainer}>
                                <TextInput
                                    ref='name'
                                    style={[textInputStyle, !form.name.valid && Styles.invalidInput]}
                                    value={name}
                                    editable={editable}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={this.handleChangeName}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() => this.refs.email.focus()}
                                    placeholder={'Name'}
                                    placeholderTextColor={Colors.imageGreyBg}/>
                            </View>
                        </View>
                        {!form.name.valid && form.name.error && <Text style={Styles.errorMsg}>{form.name.error}</Text>}

                        <View style={[Styles.subRow, Styles.textInputContainer]}>
                            <View style={Styles.iconContainer}>
                                <Image style={[Styles.loginInputIcon, Styles.emailInputIcon]} source={Images.authEmailIcon} resizeMode={'contain'}/>
                            </View>
                            <View style={Styles.inputContainer}>
                                <TextInput
                                    ref='email'
                                    style={[textInputStyle, !form.email.valid && Styles.invalidInput]}
                                    value={email}
                                    editable={editable}
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={this.handleChangeUsername}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={() => this.refs.password.focus()}
                                    placeholder={'Email'}
                                    placeholderTextColor={Colors.imageGreyBg}/>
                            </View>
                        </View>
                        {!form.email.valid && form.email.error && <Text style={Styles.errorMsg}>{form.email.error}</Text>}

                        <View style={[Styles.subRow, Styles.textInputContainer, Styles.textInputBottomRadius]}>
                            <View style={Styles.iconContainer}>
                                <Image style={[Styles.loginInputIcon, Styles.pwInputIcon]} source={Images.authPwIcon} resizeMode={'contain'}/>
                            </View>
                            <View style={Styles.inputContainer}>
                                <TextInput
                                    ref='password'
                                    style={[textInputStyle, !form.password.valid && Styles.invalidInput]}
                                    value={password}
                                    editable={editable}
                                    keyboardType='default'
                                    returnKeyType='go'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={this.handleChangePassword}
                                    underlineColorAndroid='transparent'
                                    onSubmitEditing={this.handlePressLogin}
                                    placeholder={'Password'}
                                    placeholderTextColor={Colors.imageGreyBg}/>
                            </View>

                        </View>
                        {!form.password.valid && form.password.error && <Text style={Styles.errorMsg}>{form.password.error}</Text>}

                        {error && <Text style={Styles.errorMsg}>{error}</Text>}

                        <View style={[Styles.buttonTotalRow]}>
                            <Button
                                containerClass={Styles.loginButton}
                                textClass={Styles.loginText}
                                label='SIGN UP'
                                _onPress={() => this.handleSignup()}
                            />
                            <View style={[Styles.buttonRow, Layout.textCenterAlign]}>
                                <View>
                                    <View style={[Layout.textCenterAlign]}>
                                        <Text style={[Styles.infoText]}>By signing up, you agree to our</Text>
                                    </View>
                                    <View style={[Styles.infoTextContainer]}>
                                        <TouchableWithoutFeedback onPress={this._onClickTnC}>
                                            <View style={Styles.linkTextContainer}><Text style={Styles.linkText}>Terms and Conditions</Text></View>
                                        </TouchableWithoutFeedback>
                                        <View style={Styles.linkTextContainer}><Text style={Styles.infoText}> & </Text></View>
                                        <TouchableWithoutFeedback onPress={this._onClickPrivacy}>
                                            <View style={Styles.linkTextContainer}><Text style={Styles.linkText}>Privacy Policy</Text></View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={[Styles.seperatorContainer, Styles.signupSeperatorContainer]}>
                            <View style={Styles.seperatorLine} />
                            <View style={Styles.seperatorLabel}>
                                <Text style={Styles.seperatorText}>OR</Text>
                            </View>
                            <View style={Styles.seperatorLine} />
                        </View>

                        <View>
                            {/*<SNSLoginForm
                                loggedIn={this.props.loggedIn}
                                facebookLogin={this.facebookLogin}
                                googleLogin={this.googleLogin}
                                snsLogout={this.props.snsLogout} />*/}
                        </View>
                    </View>
                </View>

            </ScrollView>

            <View style={[Layout.horizontalRow, Styles.bottomRow, Styles.iphoneXStyle]}>
                <TouchableWithoutFeedback onPress={this.handleLogin}>
                    <View style={[Layout.flex6, Layout.textLeftAlign, Layout.textMiddleAlign]}>
                        <Text style={Styles.bottomText}>Already have an account?</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={[Layout.flex4, Layout.textRightAlign, Layout.textMiddleAlign]}>
                    <Button
                        containerClass={Styles.signupButton}
                        textClass={Styles.signupText}
                        label='Log In'
                        _onPress={() => this.handleLogin()}
                        underlayColor={Colors.brandColor}
                    />
                </View>
            </View>
            {this.props.fetching && <LoadingView />}
        </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        error: UserSelectors.getError(state),
        loggedIn: UserSelectors.getLoggedIn(state),
        fetching: UserSelectors.getFetching(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (email, password, name, rememberMe, navigator) => dispatch(UserActions.signupRequest(email, password, name, rememberMe, navigator)),
        snsLogin: ({accessToken, email, name, id, snsType}) => dispatch(UserActions.snsLoginRequest(accessToken, email, name, id, snsType)),
        snsLogout: () => dispatch(UserActions.logoutSuccess()),
        resetError: () => dispatch(UserActions.resetError()),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
    }
}

type SignupProps = {
    dispatch: () => any,
    fetching: boolean,
    signup: () => void,
    snsLogin: () => void,
    snsLogout: () => void
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
