import React from 'react'
import {
    ActivityIndicator,
    Image,
    ScrollView,
    View,
    Text
} from 'react-native'
import { Images, Colors, Layout } from '../../../Themes'

import Button from './Button'

//Styles
import Styles from './Styles/NoSearchResult'

const NoSearchResult = ({descText, descSubText, buttonStatus, buttonLabel, _onPress, icon}) => {

    return (
    	<ScrollView style={Styles.container}>
            <View style={Styles.noItemContainer}>
                <View style={Styles.topContainer}>
                    <View style={[ Styles.imgContainer]}>
                        <Image source={icon} style={Styles.img} resizeMode='contain'/>
                    </View>
                    <View style={Styles.descContainer}>
                        <Text style={[ Styles.descText]}>{descText}</Text>
                        <Text style={[ Styles.descSubText]}>{descSubText}</Text>
                    </View>
                    {buttonStatus && 
                        <View style={Styles.buttonContainer}>
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
                </View>
            </View>
        </ScrollView>
    )

}

export default NoSearchResult
