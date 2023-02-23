// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import { map, each, filter } from 'lodash'
import { Images, Layout } from '../../../Themes'

import Button from './Button'

//Syltes
import Styles from './Styles/DetailFooter'

class DetailFooter extends PureComponent {

    renderButton (button, multi, index) {
        let containerStyle = Styles.buttonContainer
        let buttonContainerClass = button.buttonCotainerStyle && button.buttonCotainerStyle
        if (multi) {
            buttonContainerClass = button.buttonStyle && button.buttonStyle
            containerStyle = [
                Styles.multiButtonContainer,
                button.buttonCotainerStyle && button.buttonCotainerStyle 
            ]
        }

        return (
            <View key={index} style={containerStyle}>
                <Button
                    containerClass={[Styles.showButton, buttonContainerClass]}
                    textClass={Styles.showText}
                    label={button.buttonLabel}
                    showIcon={false}
                    showImgIcon={true}
                    imgicon={multi ? button.buttonIcon : Images.emailButtonIcon}
                    underlayColor={button.buttonColor}
                    _onPress={button.onClick}
                />
            </View>
        )
    }

    _renderButtonFooter () {

        const {
            button,
            multiButtons,
            singleButton
        } = this.props

        return (
            <View style={[Styles.innerContainer]}>
                {singleButton
                    ? this.renderButton(button, false, 0)
                    : map(multiButtons, (btnObj, index) => this .renderButton(btnObj, true, index))
                }
            </View>
        )
    }

    _renderExclusiveCouponFooter (code) {
        return (
            <View style={Styles.exclusiveButton}>
                <Text style={Styles.exclusiveLabel}>COUPON CODE:</Text>
                <Text style={Styles.exclusiveCode}>{code}</Text>
            </View>
        )
    }

    render () {
        
        const { code } = this.props

        if(code){
            return (
                <View style={[Styles.exclusiveContainer]}>
                    {this._renderExclusiveCouponFooter(code)}
                </View>
            )
        } else {

            return (
                <View style={[Styles.container]}>
                    {this._renderButtonFooter()}
                </View>
            )
        }
    }

}

export default DetailFooter
