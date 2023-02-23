// @flow

import React from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    Keyboard,
    Platform,
    LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import { assign } from 'lodash'
import {Colors, Images, Metrics, Layout} from '../../../Themes'

import {validateEmail} from '../../Core/Helpers'
import UserActions from '../Actions'
import * as UserSelectors from '../Selectors'

import Button from '../../Core/Components/Button'
import ScrollView from '../../Core/Components/ScrollView'
import LoadingView from '../../Core/Components/LoadingView'

import Styles from './Styles/AuthForm'

class ForgotPassword extends React.Component {

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
                testID: 'forgotpassword_close_btn',
                buttonColor: Colors.snow,
                buttonFontSize: 18,
                buttonFontWeight: '600'
            }
        ]
    };

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            visibleHeight: Metrics.screenHeight,
            form: {
                invalid: false,
                email: {
                    valid: true,
                    error: null
                }
            }
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    onNavigatorEvent (event) {
        if (event && event.type == 'NavBarButtonPress' && event.id == 'close') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
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

    handleSubmit = () => {
        const { email } = this.state

        let form = assign(this.state.form, {
            invalid: false,
            email: {
                valid: true,
                error: null
            }
        })

        if (!email || email === undefined) {
            form.invalid = true
            form.email.valid = false
            form.email.error = 'Please enter email address'
        } else if (!validateEmail(email)) {
            form.invalid = true
            form.email.valid = false
            form.email.error = 'Please enter valid email address'
        }

        if (form.invalid === false) {
            this.props.forgotPassword(email)
        } else {
            this.setState({form})
        }
    }

    handleChangeEmail = (text) => {
        this.setState({ email: text })
    }

    render () {
        const self = this
        const { email, form } = this.state
        const { error, fetching, successMessage } = this.props
        const editable = !fetching
        const textInputStyle = !editable ? Styles.textInput : Styles.textInputReadonly
        
        return (
            <View>
                <ScrollView
                    contentContainerStyle={{justifyContent: 'center'}}
                    style={[Styles.container]}
                    keyboardShouldPersistTaps>

                    <View style={Styles.form}>

                        <View style={Styles.forgotPasswordMainImgContainer}>
                            <Image style={[Styles.forgotPasswordMainImg]} source={Images.forgotPwMain} resizeMode="contain"/>
                        </View>

                        <View style={Styles.forgotPasswordTitleContainer}>
                            <Text style={[Styles.forgotPasswordTitle, Styles.forgotPwInfoText]}>Enter your email below to receive your password reset link.</Text>
                        </View>

                        <View style={Styles.forgotPasswordInputContainer}>

                            <View style={[Styles.subRow, Styles.textInputContainer, Styles.textInputRadius]}>
                                <View style={Styles.iconContainer}>
                                    <Image style={[Styles.loginInputIcon, Styles.emailInputIcon]} source={Images.authEmailIcon} resizeMode={'contain'}/>
                                </View>
                                <View style={Styles.loginInputContainer}>
                                    <TextInput
                                        ref='email'
                                        style={[textInputStyle, !form.email.valid && Styles.invalidInput]}
                                        value={email}
                                        editable={editable}
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={this.handleChangeEmail}
                                        underlineColorAndroid='transparent'
                                        onSubmitEditing={() => this.handleSubmit()}
                                        placeholder={'Email'}
                                        placeholderTextColor={Colors.imageGreyBg}
                                    />
                                </View>
                            </View>

                            
                            {!form.email.valid && form.email.error && 
                                <View>
                                    <Text style={Styles.errorMsg}>{form.email.error}</Text>
                                </View>
                            }

                            <View style={[Styles.buttonTotalRow]}>
                                <Button
                                    containerClass={Styles.loginButton}
                                    textClass={Styles.loginText}
                                    label='SUBMIT'
                                    _onPress={() => this.handleSubmit()}
                                />
                                {error && <Text style={Styles.errorMsg}>{error}</Text>}
                                {successMessage && <Text style={Styles.successMsg}>{successMessage}</Text>}
                            </View>

                        </View>
                    </View>

                </ScrollView>
                {this.props.fetching && <LoadingView />}
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        error: UserSelectors.getError(state),
        successMessage: UserSelectors.getSuccessMessage(state),
        fetching: UserSelectors.getFetching(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(UserActions.forgotPasswordRequest(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
