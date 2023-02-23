// @flow

import DeviceInfo from 'react-native-device-info'
import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts, Layout } from '../../../../Themes/'

var window = Dimensions.get('window')
const {height, width} = window

export default StyleSheet.create({
    container: {
        flex: 1,        
        paddingTop: Metrics.smallMargin,
        paddingBottom: Metrics.smallMargin,
        backgroundColor: Colors.snow
    },
    iphoneXStyle: {
        paddingTop: DeviceInfo.getModel() === 'iPhone X' ? Metrics.largePadding : 0
    },
    header: {
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.5,
        paddingHorizontal: Metrics.baseMargin,
        paddingTop: Metrics.doubleBaseMargin,
        paddingBottom: Metrics.baseMargin,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageColumn: {
    },
    textColumn: {
        width: ((width/10)*9) - (Metrics.basePadding*2) - 80,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    userLoginCotainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 3
    },
    userButtonContainer: {
        flex: 0.5,
        maxWidth: 110,
        height: 38,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.accentPink,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonContainer: {
        backgroundColor: Colors.snow,
        marginRight: 5
    },
    signupButtonContainer: {
        backgroundColor: Colors.accentPink,
        marginLeft: 5
    },
    userButton: {
        fontSize: Fonts.size.medium,
        fontWeight: Platform.OS === 'ios' ? '600' : '500'
    },
    pinkText: {
        color: Colors.accentPink,
    },
    whiteText: {
        color: Colors.snow
    },
    linkDivision: {
        paddingLeft: Metrics.smallerMargin,
        paddingRight: Metrics.smallerMargin
    },
    circle:  {
        backgroundColor: Colors.lightBlue,
        width: 60,
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Metrics.baseMargin,
        position: 'relative'
    },
    blueCircle: {
        backgroundColor: 'transparent'
    },
    greyCircle: {
        backgroundColor: Colors.inactiveGreyBg
    },
    backgroundImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    backgroundImage: {
        width: 60,
        height: 60,
    },
    personImage: {
        width: 28,
        height: 28
    },
    profileName: {
        fontSize: 22,
        color: Colors.snow,
        fontWeight: 'bold'
    },
    text: {
        fontSize: Fonts.size.medium,
        color: Colors.black,
        width: width * 0.5
    },
    userNameText: {
        fontWeight: '400'
    },
    nameText: {
        color: Colors.black
    },
    emailText: {
        color: Colors.blueGrey
    },
    loginText: {
        color: Colors.accentPink
    },
    menuContainer: {
        flexDirection: 'column'
    },
    logoutText: {
        color: Colors.darkRed,
        fontWeight: '500'
    },
    loginButton: {
        backgroundColor: Colors.facebook,
        borderRadius: Metrics.buttonRadius,
    },
    snsButtonRow: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: Metrics.doubleBaseMargin
    },
    snsFBButton: {
        backgroundColor: Colors.facebook,
        borderRadius: Metrics.buttonRadius,
        height: Platform.OS === 'ios' ? 45 : 30, 
        width: Metrics.screenWidth * 0.8 - Metrics.doubleBaseMargin - (Platform.OS === 'ios' ? 0 : 40),
        justifyContent: 'center',
        alignItems: 'center'
    },
    fbLoginButtonContainer: {
        backgroundColor: Colors.facebook,
        height: 45,
        borderRadius: Metrics.buttonRadius,
        paddingHorizontal: Metrics.largePadding,
        ...Layout.itemCentral
    },
    googleButton: {
        width: Metrics.screenWidth * 0.8 - Metrics.doubleBaseMargin
    },
    icon: {

    }
})
