import React, { Component } from 'react'
import { View } from 'react-native'

//Styles
import Styles from './Styles/ChangeDot'

const ChangeDot = ({position}) => {

    return (
        <View style={[Styles.container, position]}>
        	<View style={[Styles.dot]}></View>
        </View>
    )

}

export default ChangeDot


