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

import NoItems from '../../Core/Components/NoItems'

//Styles
import Styles from './Styles/CarsIamSelling'

class CarsIamSelling extends Component {
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
                testID: 'carsiamselling_close_btn',
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
            title: "Cars I'm Selling"
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
        let url = Config.WEB_URL + 'my-page'
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render () {
        return (

            <View ref='listings' style={[ApplicationStyles.layout.fullBackground, Styles.container]}>
                <NoItems 
                    type='cars'
                    imgSource={Images.carsIamSellingTempIcon}
                    imgStyle={Styles.noItemImgStyle}
                    imgSizeStyle={Styles.noItemImgSize}
                    descText='Temporarily Unavailable '
                    descTextStyle={Styles.descTextStyle}
                    descContainerStyle={Styles.descContainer}
                    descSubText='Sorry for the inconvenience. Please manage your cars on Car Mate web.'
                    descSubTextStyle={Styles.descSubTextStyle}
                    buttonLabel='Manage My Cars'
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

export default CarsIamSelling