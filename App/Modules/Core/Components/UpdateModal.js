import React, {PureComponent} from 'react'
import ReactNative, {
    Image,
    Modal,
    Platform,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { noop } from 'lodash'
import { Colors, Images, Layout } from '../../../Themes'

import { handleClick, requireUpdate, versionSplit } from '../Helpers'

import * as CoreSelectors from '../Selectors'

import Package from '../../../../package.json'
import Button from './Button'

//Styles
import Styles from './Styles/UpdateModal'

class UpdateModal extends PureComponent {

    static navigatorStyle = {
        drawUnderNavBar: Platform.OS === 'ios',
        navBarBackgroundColor: Colors.brandColor,
        navBarTextColor: Colors.snow,
        navBarNoBorder: true
    }

    _upgrade () {
        const {
            iosUrl,
            androidUrl
        } = this.props
        
        let url = Platform.OS === 'ios' ? iosUrl : androidUrl

        handleClick(url)
    }

    render () {
        return (
            <View style={[Styles.applicationView]}>
                <View style={Styles.container}>
                    <View style={Styles.innerContainer}>
                        <View style={Styles.imageContainer}>
                            <Image source={Images.updateMain} resizeMode='contain' style={Styles.logo} />
                        </View>

                        <View style={Styles.textContainer}>
                            <Text style={Styles.title}>New Car Mate Is Here!</Text>
                            <Text style={Styles.subTitle}>Cars for sale & free automotive coupons at your hand.</Text>
                        </View>

                        <View style={[Layout.horizontalRow, Styles.buttonContainer]}>
                            <Button
                                containerClass={Styles.showButton}
                                textClass={Styles.showText}
                                label='Update Now'
                                showIcon={false}
                                underlayColor={Colors.primaryPink}
                                _onPress={() => this._upgrade()}
                            />
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        iosUrl: CoreSelectors.getIosUrl(state),
        iosUpgrade: CoreSelectors.getIosUpgrade(state),
        iosMinVersion: CoreSelectors.getIosMinVersion(state),
        androidUrl: CoreSelectors.getAndroidUrl(state),
        androidUpgrade: CoreSelectors.getAndroidUpgrade(state),
        androidMiniVersion: CoreSelectors.getAndroidMinVersion(state),
    }
}

export default connect(mapStateToProps)(UpdateModal)
