import React, { PureComponent } from 'react'
import {
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native'
import { Images, Colors, Layout } from '../../../Themes'

import Button from '../../Core/Components/Button'

import Styles from './Styles/NeedToLogin'

class NeedToLogin extends PureComponent {

    constructor (props) {
        super(props)

        this._clickLoginButton = this._clickLoginButton.bind(this)
    }

    _clickLoginButton(){
        
        this.props.navigator.showModal({
            screen: 'carmate.Login',
            animationType: 'slide-up',
            backButtonHidden: true
        })

    }

    render () {
        return (
            <View style={[Styles.applicationView]}>
                <View style={Styles.container}>
                    <View style={Styles.innerContainer}>
                        <View style={Styles.imageContainer}>
                            <Image source={Images.loginForSaved} resizeMode='contain' style={Styles.logo} />
                        </View>

                        <View style={Styles.textContainer}>
                            <Text style={Styles.title}>Login Required</Text>
                            <Text style={Styles.subTitle}>You need to log in to view Saved. Please log in or sign up to continue.</Text>
                        </View>


                        <View style={[Layout.horizontalRow, Styles.buttonContainer]}>

                                <Button
                                    containerClass={Styles.showButton}
                                    textClass={Styles.showText}
                                    label='Log In'
                                    showIcon={true}
                                    underlayColor={Colors.primaryPink}
                                    _onPress={() => this._clickLoginButton()}
                                />
                        </View>

                    </View>
                </View>
            </View>
        )

    }
}

export default NeedToLogin