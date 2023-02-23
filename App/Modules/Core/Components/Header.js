import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, 
        Text, 
        Image, 
        Share,
        TouchableHighlight 
} from 'react-native'
import { map } from 'lodash'

import { Images } from '../../../Themes/'

// Styles
import styles from './Styles/Header'

class Header extends PureComponent {

    constructor (props) {
        super(props)
    }

    _renderRightHeader = (button, index) => {
        return (
            <View style={styles.rightInnerContainer} key={index}>
                {button}
            </View>
        )
    }

    render() {
        const { headerTitle,
                title,
                leftButton,
                scene,
                navigation } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={[styles.headerContents, styles.leftContainer]}>
                        {this.props.leftButton}
                    </View>
                    <View style={[styles.headerContents, styles.titleContainer]}>
                        <Text style={styles.titleTxt}>{title}</Text>
                    </View>
                    <View style={[styles.headerContents, styles.rightContainer]}>
                        {map(this.props.rightButton, this._renderRightHeader)}
                    </View>
                </View>
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        headerTitle: state.navigation.curPageTitle
    }
}

export default connect(mapStateToProps)(Header)