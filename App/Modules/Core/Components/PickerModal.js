
import React, {Component} from 'react'
import ReactNative, {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import Styles from './Styles/PickerModal'


const button = (text, onPress) => {
    return (
        <TouchableOpacity
            style={Styles.button} onPress={onPress}>
            <Text
                style={[Styles.buttonText, Styles['button' + text]]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const PickerModal = ({children, modalVisible, onCancel, onDone}) => {

    return (
        <Modal animationType={'slide'} transparent={true} visible={modalVisible} onRequestClose={onCancel}>
            <View style={Styles.modalContainer}>
                <View style={Styles.actionSheetButtonRow}>
                    {button('Done', onDone, Styles, 'selectPickerOptionAndClose')}
                </View>
                <View style={Styles.contents}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

PickerModal.PropTypes = {
    children: PropTypes.object.isRequired,
    modalVisible: PropTypes.boolean,        //isRequired, // Todo, setting there propTypes to isRequired causes an error.  Why
    onCancel: PropTypes.function,           //isRequired,
    onDone: PropTypes.function              //isRequired
}

export default PickerModal
