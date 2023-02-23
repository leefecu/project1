// @flow

import React, { PureComponent } from 'react'
import {
    Image,
    ScrollView,
    View,
    Text
} from 'react-native'
import { Images, Colors } from '../../../Themes'

import Button from './Button'
import AD from './Advertisement'

//Styles
import Styles from './Styles/NoItems'

class NoItems extends PureComponent {


    render () {

        const {
            noItemContainerStyle,
            imgStyle,
            imgSizeStyle,
            imgSource,
            descContainerStyle,
            descTextStyle,
            descText,
            descSubTextStyle,
            descSubText,
            noButton,
            buttonContainerStyle,
            buttonLabel,
            _onPress,
            bottomDescStyle,
            bottomDesc
        } = this.props

        return (
            <ScrollView style={Styles.container}>
                <View style={[Styles.noItemContainer, noItemContainerStyle && noItemContainerStyle]}>
                    <View style={Styles.topContainer}>
                        <View style={[ Styles.imgContainer, imgStyle && imgStyle ]}>
                            <Image source={this.props.imgSource} style={[Styles.img, imgSizeStyle && imgSizeStyle]} resizeMode='contain'/>
                        </View>
                        <View style={Styles.descContainer, descContainerStyle && descContainerStyle }>
                            <Text style={[ Styles.descText, descTextStyle && descTextStyle ]}>{descText}</Text>
                            <Text style={[ Styles.descSubText, descSubTextStyle && descSubTextStyle ]}>{descSubText}</Text>
                        </View>
                        { ! noButton &&
                            <View style={[Styles.buttonContainer, buttonContainerStyle && buttonContainerStyle]}>
                                <Button
                                    containerClass={Styles.showButton}
                                    textClass={Styles.showText}
                                    label={buttonLabel}
                                    showIcon={false}
                                    underlayColor={Colors.primaryPink}
                                    _onPress={_onPress}
                                />
                            </View>
                        }
                        {bottomDesc &&
                            <View style={Styles.bottomDescContainer}>
                                <Text style={[ Styles.bottomeDesc, bottomDescStyle && bottomDescStyle ]}>
                                    {bottomDesc}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        )

    }

}

NoItems.defaultProps = {
    imgStyle: null,
    showAD: false,
    noItemContainerStyle: null,
    descContainerStyle: null,
    descTextStyle: null,
    descSubTextStyle: null,
    bottomDesc: null
}

export default NoItems
