// @flow

import React, { Component } from 'react'
import {
    Platform,
    Image,
    Linking,
    View,
    Text
} from 'react-native'
import Config from 'react-native-config'
import { ApplicationStyles, Images, Colors } from '../../../Themes'

import * as CoreConstants from '../../Core/Constants'

import NoItems from '../../Core/Components/NoItems'

//Styles
import Styles from './Styles/SellMyCar'

class SellMyCar extends Component {
    static navigatorStyle = {
        drawUnderNavBar: Platform.OS === 'ios',
        navBarBackgroundColor: Colors.brandColor,
        navBarTextColor: Colors.snow,
        navBarNoBorder: true,
        navBarButtonColor: Colors.snow,
        navBarRightButtonColor: Colors.snow
    };

    static navigatorButtons = {
        rightButtons: [
            {
                icon: Images.closeModal,
                id: 'close',
                testID: 'sellmycar_close_btn',
                buttonColor: Colors.snow,
                buttonFontSize: 18,
                buttonFontWeight: '600'
            }
        ]
    };

    constructor (props) {
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.navigator.setTitle({
            title: 'Sell My Car'
        })
    }

    onNavigatorEvent (event) {
        if (event && event.type == 'NavBarButtonPress' && event.id == 'close') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    _onClickSellItNow = () => {
        let url = Config.WEB_URL + 'verification'
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.OPEN_SELL_MY_CAR_WEB)
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render () {
        return (

            <View ref='listings' style={[ApplicationStyles.layout.fullBackground, Styles.container]}>
                <NoItems 
                    type='cars'
                    imgSource={Images.noSellmycar}
                    imgStyle={Styles.noItemImgStyle}
                    imgSizeStyle={Styles.noItemImgSize}
                    descText='Sell Cars Free of Charge'
                    descTextStyle={Styles.descTextStyle}
                    descContainerStyle={Styles.descContainer}
                    descSubText='2 free reusable slots to sell cars.'
                    descSubTextStyle={Styles.descSubTextStyle}
                    buttonLabel='Sell Now'
                    buttonContainerStyle= {Styles.buttonContainer}
                    showAD={false}
                    bottomDesc="*You will be redirected to Car Mate website."
                    bottomDescStyle={Styles.bottomDescStyle}
                    _onPress={() => this._onClickSellItNow()}
                />
            </View>

        )

    }

}

export default SellMyCar
