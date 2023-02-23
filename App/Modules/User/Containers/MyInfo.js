// @flow

import React, { Component } from 'react'
import {
    Platform,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationStyles, Images, Colors } from '../../../Themes'

import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'

//Styles
import Styles from './Styles/MyInfo'

class Myinfo extends Component {
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
                testID: 'myinfo_close_btn',
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

    onNavigatorEvent(event) {
        if (event && event.type == 'NavBarButtonPress' && event.id == 'close') {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            })
        }
    }
    

    render () {
        const {
            email,
            name
        } = this.props

        if (! email || ! name) {
            return null
        }

        return (
            <View ref='myinfo' style={[ApplicationStyles.layout.fullBackground, Styles.container]}>
                <View style={Styles.innerContainer}>

                    <View style={Styles.infoRowContainer}>
                        <View style={Styles.infoLabelContainer}>
                            <Text style={Styles.infoLabelText}>Name</Text>
                        </View>
                        <View style={Styles.infoValueContainer}>
                            <Text style={Styles.userInfo}>{name}</Text>
                        </View>
                    </View>


                    <View style={Styles.infoRowContainer}>
                        <View style={Styles.infoLabelContainer}>
                            <Text style={Styles.infoLabelText}>Email</Text>
                        </View>
                        <View style={Styles.infoValueContainer}>
                            <Text style={Styles.userInfo}>{email}</Text>
                        </View>
                    </View>

                </View>
            </View>

        )

    }

}

const mapStateToProps = (state) => {
    return {
        email: UserSelectors.getUserEmail(state),
        name: UserSelectors.getUserName(state)
    }
}

export default connect(mapStateToProps)(Myinfo)