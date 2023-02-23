import React, {PureComponent} from 'react'
import ReactNative, {
    Image,
    Linking,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../../../Themes'

import CoreActions from '../Actions'
import * as CoreSelectors from '../Selectors'

import Button from './Button'
import NoticeModal from './NoticeModal'

//Styles
import Styles from './Styles/SupportModal'

class SupportModal extends PureComponent {

    constructor (props) {
        super(props)
    }

    email () {

        let url = 'info@carmate.co.nz'
        Linking.canOpenURL(`mailto:${url}`).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            }
            else {
                console.log('email is not supported')
            }
        }).catch(err => console.error('An error occurred', err));
    }

    closeNoticeModal = () => {
        this.props.setSupportModalVisible(false)
    }

    render () {
        return (
            <NoticeModal
                containerStyle={Styles.container}
                animationType='fade'
                modalVisible={this.props.supportModalVisible}
                titleTextStyle={Styles.titleText}
                descriptions={this.props.workDesc}
                titleStyle={Styles.title}
                descriptionsStyle={Styles.descriptionsText}
                subDesc='Any feedback or ideas are welcome.'
                subDescStyle={Styles.subtitle}
                icon = {Images.supportMain}
                iconStyle = {Styles.modalIcon}
                secondButton={this.props.supportModalVisible}
                buttonLabel="Send Enquiry"
                secondLabel="Cancel"
                onSecond={() => this.props.setSupportModalVisible(false)}
                onClick={() => this.email()} />

        )
    }
}


SupportModal.defaultProps = {
    workDesc: {
        titleText: 'Love To Hear From You!',
        descDetails: []
    },
}

const mapStateToProps = (state) => {
    return {
        supportModalVisible: CoreSelectors.getSupportModalVisible(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSupportModalVisible: (supportModalVisible) => dispatch(CoreActions.setSupportModalVisible(supportModalVisible))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportModal)
