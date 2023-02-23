import React, { Component } from 'react';
import { Image } from 'react-native';

import { Images } from '../../../Themes/'

import Styles from './Styles/TabIcon'

class TabIcon extends Component {

    constructor (props) {
        super(props)
    }

    render() {
        return (
            <Image
                source={this.props.img}
                style={Styles.tabIcon} 
            />
        )
    }
};

export default TabIcon;