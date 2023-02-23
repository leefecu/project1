// @flow

import React, { Component } from 'react'
import {
    Image,
    View,
    Text
} from 'react-native'
import { map } from 'lodash'
import { Images, Metrics } from '../../../Themes'

import Button from './Button'
import * as CouponConstants from '../../Coupons/Constants'

//Styles
import Styles from './Styles/DetailTitle'

const DetailTitle = ({title, idx, rightInfo}) => {
    return (
        <View style={[Styles.container, idx === 1 && Styles.topContainer]}>
            <Text style={Styles.titleText}>{title.toUpperCase()}</Text>
            {rightInfo && rightInfo}
        </View>
    )

}

export default DetailTitle
