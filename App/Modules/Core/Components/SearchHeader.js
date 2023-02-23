import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, 
        Text, 
        Image, 
        TouchableHighlight 
} from 'react-native'

import { Images } from '../../../Themes/'

// Styles
import styles from './Styles/Header'

class SearchHeader extends PureComponent {

    constructor (props) {
        super(props)
    }

    render() {
        const { headerTitle,
                title,
                leftButton,
                rightButton,
                searchKeyword } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={[styles.headerContents, styles.leftContainer]}>
                        {leftButton}
                    </View>
                    <View style={[styles.headerContents, styles.searchKeywordContainer]}>
                        {searchKeyword}
                    </View>
                    <View style={[styles.headerContents, styles.rightContainer]}>
                        {rightButton}
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

export default connect(mapStateToProps)(SearchHeader)