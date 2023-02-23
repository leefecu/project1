import React from 'react'
import { View, Text } from 'react-native'
import { Images, Colors } from '../../../Themes'

//Styles
import Styles from './Styles/NewLabel'

const NewLabel = () => {

    return (
        <View style={Styles.container}>
            <Text style={Styles.text}>NEW</Text>
        </View>
        )
}

export default NewLabel
