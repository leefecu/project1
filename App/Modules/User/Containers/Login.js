// @flow
import React, { PureComponent } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    Keyboard,
    Platform,
    LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import { assign } from 'lodash'
import {Colors, Images, Metrics, Layout} from '../../../Themes'

import {validateEmail} from '../../Core/Helpers'
import UserActions from '../Actions'
import * as UserSelectors from '../Selectors'

import Button from '../../Core/Components/Button'
import ScrollView from '../../Core/Components/ScrollView'
import LoadingView from '../../Core/Components/LoadingView'
import SNSLoginForm from '../Components/SNSLoginForm'

import Styles from './Styles/AuthForm'

class Login extends PureComponent {

    props: LoginProps;

    state: {
        email: string,
        password: string,
        rememberMe: boolean,
        visibleHeight: number
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
                testID: 'login_close_btn',
                buttonColor: Colors.snow,
                buttonFontSize: 18,
                buttonFontWeight: '600'
            }
        ]
    };

    constructor (props: LoginScreenProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            rememberMe: true,
            visibleHeight: Metrics.screenHeight,
            formInvalid: false,
            emailValid: true,
            emailError: null,
            passwordValid: true,
            passwordError: null
        }
        this.isAttempting = false

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
        this.props.navigator.setTitle({
            title: 'Log In'
        })
    }

    componentWillReceiveProps (newProps) {
        this.forceUpdate()
        if (this.isAttempting && !newProps.fetching) {
            //NavigationActions.pop()
        }
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
        this.props.resetError()
    }

    onNavigatorEvent (event) {

        if (event && event.type === 'NavBarButtonPress' && event.id === 'close') {
            this.closeModal()
        }
        
    }

    keyboardDidShow = (e) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        let newSize = Metrics.screenHeight - (e.endCoordinates.height + Metrics.navBarHeight + Metrics.smallMargin)
        this.setState({
            visibleHeight: newSize
        })
    }

    keyboardDidHide = (e) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({
            visibleHeight: Metrics.screenHeight
        })
    }

    closeModal = () => {
        this.props.navigator.dismissModal({
            animationType: 'slide-down'
        })
    }

    _handleLogin = () => {
        let formInvalid = false
        let emailValid = true
        let emailError = null
        let passwordValid = true
        let passwordError = null

        const { email, password, rememberMe } = this.state

        if (!email || email === undefined) {
            formInvalid= true
            emailValid = false
            emailError= 'Please enter email address'
        } else if (!validateEmail(email)) {
            formInvalid= true
            emailValid = false
            emailError= 'Please enter valid email address'
        }
        if (!password || password === undefined) {
            formInvalid= true
            passwordValid = false
            passwordError = 'Please enter password'
        }

        if (formInvalid === false) {
            //this.props.setAfterLoginAction({action: 'saved'})
            this.props.attemptLogin(email, password, rememberMe, this.props.tryOldLogin, this.props.navigator)

        } else {
            this.setState({
                formInvalid,
                emailValid,
                emailError,
                passwordValid,
                passwordError
            })
        }
    }

    _handleSignup = () => {

        this.props.navigator.resetTo({
            screen: 'carmate.Signup',
            title: 'Signup',
            animated: true,
            backButtonTitle: '',
        })

    }

    _handleChangeUsername = (text) => {
        this.setState({ email: text })
    }

    _handleChangePassword = (text) => {
        this.setState({ password: text })
    }

    _handleForgotPassword = () => {

        this.props.navigator.resetTo({
            screen: 'carmate.ForgotPassword',
            title: 'Forgot Password',
            animated: true,
            backButtonTitle: '',
        })

    }

    render () {
        const self = this
        const {
            email,
            password,
            rememberMe,
            formInvalid,
            emailValid,
            emailError,
            passwordValid,
            passwordError
        } = this.state
        const { error, fetching } = this.props
        const editable = !fetching
        const textInputStyle = !editable ? Styles.textInput : Styles.textInputReadonly

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
                                    <Image style={[Styles.loginInputIcon, Styles.emailInputIcon]} source={Images.authEmailIcon} resizeMode={'contain'}/>
                                </View>
                                <View style={Styles.loginInputContainer}>
                                    <TextInput
                                            ref='email'
                                            style={[textInputStyle, ! emailValid && Styles.invalidInput]}
                                            value={email}
                                            editable={editable}
                                            keyboardType='email-address'
                                            returnKeyType='next'
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            onChangeText={this._handleChangeUsername}
                                            underlineColorAndroid='transparent'
                                            onSubmitEditing={() => this.refs.password.focus()}
                                            placeholder={'Email'}
                                            placeholderTextColor={Colors.imageGreyBg}/>
                                </View>
                            </View>
                            {!emailValid && emailError&& <Text style={Styles.errorMsg}>{emailError}</Text>}
                            
                            <View style={[Styles.subRow, Styles.textInputContainer, Styles.textInputBottomRadius]}>
                                <View style={Styles.iconContainer}>
                                    <Image style={[Styles.loginInputIcon, Styles.pwInputIcon]} source={Images.authPwIcon} resizeMode={'contain'}/>
                                </View>
                                <View style={Styles.loginInputContainer}>
                                    <TextInput
                                        ref='password'
                                        style={[textInputStyle, !emailValid && Styles.invalidInput]}
                                        value={password}
                                        editable={editable}
                                        keyboardType='default'
                                        returnKeyType='go'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        secureTextEntry
                                        onChangeText={this._handleChangePassword}
                                        underlineColorAndroid='transparent'
                                        onSubmitEditing={this._handleLogin}
                                        placeholder={'Password'}
                                        placeholderTextColor={Colors.imageGreyBg}/>
                                </View>

                            </View>
                            {!passwordValid && passwordError && <Text style={Styles.errorMsg}>{passwordError}</Text>}

                            <View style={[Styles.buttonTotalRow]}>
                                <Button
                                    containerClass={Styles.loginButton}
                                    textClass={Styles.loginText}
                                    label='LOG IN'
                                    _onPress={() => this._handleLogin()}
                                    underlayColor={Colors.primaryPink}
                                />
                                {error && <Text style={Styles.errorMsg}>{error}</Text>}
                            </View>

                            <View style={[Styles.buttonRow, Layout.textCenterAlign, Styles.loginButtonRow]}>
                                <View>
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={() => this._handleForgotPassword()}>
                                        <View style={Styles.forgotPasswordTextContainer}>
                                            <Text style={[Styles.forgotPasswordText]}>Forgot password?</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>


                            <View style={[Styles.seperatorContainer, Styles.loginSeperatorContainer]}>
                                <View style={Styles.seperatorLine} />
                                <View style={Styles.seperatorLabel}>
                                    <Text style={Styles.seperatorText}>OR</Text>
                                </View>
                                <View style={Styles.seperatorLine} />
                            </View>


                            <View>
                                <SNSLoginForm
                                    loggedIn={this.props.loggedIn}
                                    facebookLogin={this.facebookLogin}
                                    googleLogin={this.googleLogin}
                                    snsLogout={this.props.snsLogout}
                                    closeModal={this.closeModal}
                                    error={error}
                                    resetError={this.props.resetError}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[Layout.horizontalRow, Styles.bottomRow, Styles.iphoneXStyle]}>
                    <TouchableHighlight style={[Layout.flex6,Layout.textLeftAlign, Layout.textMiddleAlign]} onPress={this._handleSignup}>
                        <View style={[Styles.bottomTextContainer]}>
                            <Text style={Styles.bottomText}>Don't have an account?</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={[Layout.flex4, Layout.textRightAlign, Layout.textMiddleAlign]} >
                        <Button
                            containerClass={[Styles.signupButton]}
                            textClass={Styles.signupText}
                            label='Sign Up'
                            _onPress={() => this._handleSignup()}
                            underlayColor={Colors.brandColor} />
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
        fetching: UserSelectors.getFetching(state),
        tryOldLogin: UserSelectors.getTryOldLogin(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (email, password, rememberMe, tryOldLogin, navigator) => dispatch(UserActions.loginRequest(email, password, rememberMe, tryOldLogin, navigator)),
        snsLogin: ({accessToken, email, name, id, snsType}) => dispatch(UserActions.snsLoginRequest(accessToken, email, name, id, snsType)),
        snsLogout: () => dispatch(UserActions.logoutSuccess()),
        resetError: () => dispatch(UserActions.resetError()),
        setAfterLoginAction: (afterLoginAction) => dispatch(UserActions.setAfterLoginAction(afterLoginAction)),
    }
}


type LoginProps = {
    dispatch: () => any,
    fetching: boolean,
    attemptLogin: () => void
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
