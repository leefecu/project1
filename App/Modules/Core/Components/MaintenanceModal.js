import React, {PureComponent} from 'react'
import ReactNative, {
    Platform,
    Image,
    Modal,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { noop } from 'lodash'
import { Colors, Images, Layout } from '../../../Themes'

import * as CoreSelectors from '../Selectors'

//Styles
import Styles from './Styles/MaintenanceModal'

class MaintenanceModal extends PureComponent {

    static navigatorStyle = {
        drawUnderNavBar: Platform.OS === 'ios',
        navBarBackgroundColor: Colors.brandColor,
        navBarTextColor: Colors.snow,
        navBarNoBorder: true
    };

    render () {
        return (
            <View style={[Styles.applicationView]}>
                <View style={Styles.container}>
                    <View style={Styles.innerContainer}>
                        <View style={Styles.imageContainer}>
                            <Image source={Images.maintenanceMain} resizeMode='contain' style={Styles.logo} />
                        </View>

                        <View style={Styles.textContainer}>
                            <Text style={Styles.title}>Maintenance In Progress</Text>
                            <Text style={Styles.subTitle}>Sorry for the inconvenience.</Text>
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        maintenance: CoreSelectors.getMaintenance(state)
    }
}

export default connect(mapStateToProps)(MaintenanceModal)
