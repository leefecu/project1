// @flow

import DeviceInfo from 'react-native-device-info'
import { Dimensions, StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, Metrics, Layout } from '../../../../Themes'

const { width, height } = Dimensions.get('window')

const fullWidth = Metrics.screenWidth - (Metrics.baseMargin * 4)
const marginTop = Platform.OS === 'ios' ? Metrics.navBarHeight : Metrics.navBarHeight

export default StyleSheet.create({
    container: {
        width: width,
        height: height-marginTop,
        position: 'relative',
        backgroundColor: Colors.brandColor,
        //marginBottom: 300
    },
    innerContainer: {
        width: width
    },
    form: {
        paddingHorizontal: Metrics.largePadding,
    },
    signupForm: {
        marginBottom: Metrics.navBarHeight + Metrics.bottomButtonBarHeight + (Metrics.basePadding*2)
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop:Metrics.basePadding,
        paddingBottom:Metrics.doubleBaseMargin
    },
    logo: {
        resizeMode: 'contain',
        width: 150,
        height: 52
    },
    infoTextContainer: {
        paddingTop: Metrics.basePadding
    },
    infoText: {
        color: Colors.snow,
        fontSize: Fonts.size.small,
        fontWeight: '300',
        letterSpacing: 1
    },
    buttonTotalRow: {
        width: width - (Metrics.doubleBaseMargin*2),
        paddingTop: Metrics.basePadding,
        //justifyContent: 'center',
    },
    buttonRow: {
        paddingTop: Metrics.mediumLargePadding,
    },
    loginButtonRow: {
        paddingTop: Metrics.smallPadding
    },
    row: {
        marginBottom: Metrics.doubleBaseMargin,
    },
    subRow:{
        marginBottom: Metrics.smallestMargin
    },
    rowLabel: {
        color: Colors.charcoal,
        marginBottom: Metrics.smallMargin
    },
    invalidLabel: {
        color: Colors.red
    },
    invalidInput: {
        backgroundColor: Colors.lighterRed,
        borderColor: Colors.lightRed,
        color: Colors.strongRed
    },
    errorMsg: {
        color: Colors.red,
        fontSize: Fonts.size.small,
        fontWeight: '600',
        marginTop: Metrics.smallMargin
    },
    successMsg: {
        color: Colors.blue,
        fontSize: Fonts.size.small,
        fontWeight: '600',
        marginTop: Metrics.smallMargin
    },
    textInputContainer: {
        backgroundColor: Colors.inputBg,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    iconContainer: {
        width: 35,
        height: Metrics.largeButtonHeight,
        paddingLeft: Metrics.basePadding,
        paddingRight: Metrics.basePadding,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 100
    },
    inputContainer: {
        width: width - (Metrics.doubleBaseMargin * 2),
        height: Metrics.largeButtonHeight,
        paddingLeft: 35,
        paddingRight: Metrics.basePadding,
        top: Platform.OS === 'ios' ? 0 : -2
    },
    loginInputContainer: {
        width: width - (Metrics.doubleBaseMargin * 2),
        height: Metrics.largeButtonHeight,
        paddingLeft: 0,
        marginRight: Metrics.basePadding,
        top: Platform.OS === 'ios' ? 0 : 4
    },
    textInputTopRadius: {
        borderTopLeftRadius: Metrics.buttonRadius,
        borderTopRightRadius: Metrics.buttonRadius
    },
    textInputRadius: {
        borderRadius: Metrics.buttonRadius,
    },
    textInputBottomRadius: {
        borderBottomLeftRadius: Metrics.buttonRadius,
        borderBottomRightRadius: Metrics.buttonRadius,
    },
    loginInputIcon: {
        width: Metrics.icons.tiny,
        height: Metrics.icons.tiny
    },
    textInput: {
        height: Metrics.largeButtonHeight,
        color: Colors.imageGreyBg,
        textAlignVertical: Platform.OS === 'ios' ? 'center' : 'bottom'
    },
    textInputReadonly: {
        borderColor: Colors.greyc,
        borderWidth: 0,
        borderRadius: Metrics.buttonRadius,
        height: Metrics.largeButtonHeight,
        color: Colors.imageGreyBg,
        paddingLeft: 35,
        paddingRight: Metrics.basePadding
    },
    loginRow: {
        paddingBottom: Metrics.doubleBaseMargin,
        paddingHorizontal: Metrics.doubleBaseMargin,
        flexDirection: 'row'
    },
    loginText: {
        textAlign: 'center',
        color: Colors.silver
    },
    topLogo: {
        alignSelf: 'center',
        resizeMode: 'contain'
    },

    googleLoginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.google,
        borderRadius: Metrics.buttonRadius,
        width: fullWidth,
        height: 45
    },
    googleIcon: {
        position: 'absolute',
        top: 10,
        left: 12
    },
    seperatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Metrics.mediumLargePadding,
        paddingBottom: Metrics.mediumLargePadding,
        width: fullWidth
    },
    signupSeperatorContainer: {
        paddingTop: 0,
    },
    loginSeperatorContainer: {
        paddingTop: Metrics.smallPadding,
    },
    seperatorLine: {
        backgroundColor: Colors.inactiveGreyBg,
        height: 1,
        width: fullWidth/2-30
    },
    seperatorLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60
    },
    seperatorText: {
        color: Colors.inactiveGreyBg,
        fontSize: Fonts.size.medium,
        paddingHorizontal: Metrics.basePadding
    },

    checkedContainer: {
        borderColor: Colors.grey9,
        borderWidth: 0,
    },
    checked: {
        backgroundColor: Colors.blue,
        borderColor: Colors.greyc,
        borderWidth: 0,
        borderRadius: Metrics.buttonRadius,
        height: 15,
        width: 15
    },
    rememberMeText: {
        color: Colors.brandColor,
        fontSize: Fonts.size.smallMedium
    },
    forgotPasswordMainImgContainer: {
        ...Layout.itemCentral,
        width: width - (Metrics.doubleBaseMargin*2),
        flexDirection: 'row',
        paddingVertical: Metrics.doubleBaseMargin
    },
    forgotPasswordMainImg: {
        width: 180,
        height: 121,
        marginRight: Metrics.baseMargin
    },
    forgotPasswordTitleContainer: {
        paddingVertical: Metrics.basePadding,
        paddingHorizontal: Metrics.basePadding
    },
    forgotPasswordTitle: {
        color: Colors.snow,
        fontSize: Fonts.size.medium + 1,
        marginBottom: Metrics.smallMargin,
        textAlign: 'center'
    },
    forgotPasswordTextContainer: {
        padding: Metrics.basePadding
    },
    forgotPasswordText: {
        color: Colors.lightBlueGrey,
        fontSize: Fonts.size.smallMedium,
        fontWeight: '500'
    },
    forgotPasswordInputContainer: {
        paddingVertical: Metrics.basePadding
    },

    bottomButtonContainer: {
        flex:1,
        backgroundColor: Colors.red,
        width: 100,
        height: 45
    },

    loginButton: {
        maxWidth: width - (Metrics.doubleBaseMargin*2),
        height: Metrics.largeButtonHeight,
        backgroundColor: Colors.primaryPink,
        paddingVertical: Metrics.mediumMargin,
        borderWidth: 0
    },
    loginText: {
        color: Colors.snow,
        fontSize: Fonts.size.medium,
        fontWeight: 'bold'
    },
    signupButton: {
        backgroundColor: 'transparent',
        borderRadius: Metrics.buttonRadius,
        borderColor: Colors.snow,
        borderWidth: 1,
        height: 42,
        paddingVertical: Metrics.doubleBaseMargin,
        paddingHorizontal: Metrics.doubleBaseMargin
    },
    signupText: {
        color: Colors.snow,
        fontSize: Fonts.size.medium,
        fontWeight: '600'
    },
    infoText: {
        color: Colors.blueGrey,
        fontSize: 12
    },
    infoTextContainer:{
        flexDirection: 'row',
    },
    linkTextContainer: {
        paddingTop: 5,
        paddingBottom: 10
    },    
    linkText: {
        fontSize: 12,
        color: Colors.lightBlueGrey,
        fontWeight: '500'
    },
    asterik: {
        color: Colors.red
    },
    bottomRow: {
        width: width,
        backgroundColor: Colors.brandColor,
        paddingHorizontal: Metrics.largePadding,
        paddingBottom: Platform.OS === 'ios' ? Metrics.doubleBaseMargin : Metrics.doubleBaseMargin*2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1000
    },
    bottomTextContainer:{
        backgroundColor: 'transparent'
    },
    iphoneXStyle: {
        paddingBottom: Platform.OS === 'ios' && DeviceInfo.getModel() === 'iPhone X' ? Metrics.doubleBaseMargin + (Metrics.largePadding*2) : Metrics.doubleBaseMargin*2
    },

    bottomText: {
        color: Colors.snow,
        fontSize: Fonts.size.smallMedium+1
    },
    underlineText: {
        textDecorationLine: 'underline',
    },
})
