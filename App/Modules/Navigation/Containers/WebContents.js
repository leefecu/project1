// @flow

import React from 'react'
import {
    View,
    Text,
    WebView,
    Platform
} from 'react-native'
import { Images, Colors } from '../../../Themes/'

import Styles from './Styles/WebContents'

class WebContents extends React.Component {

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
                testID: 'webcontent_close_btn',
                buttonColor: Colors.snow,
                buttonFontSize: 18,
                buttonFontWeight: '600'
            }
        ]
    };

    constructor (props: LoginScreenProps) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
        this.props.navigator.setTitle({
            title: this.props.title
        })
    }

    onNavigatorEvent (event) {
        if (event && event.type == 'NavBarButtonPress' && event.id == 'close') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }

    render () {
        return (
            <View style={Styles.container}>
                <WebView
                    source={{uri: this.props.contentUrl}}
                  />
            </View>
        )
    }

}


export default WebContents
