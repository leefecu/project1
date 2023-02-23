import React from 'react'
import ReactNative, {
    Image,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native'
import { map } from 'lodash'

import { Images, Colors, Layout } from '../../../Themes'
import Styles from './Styles/DropDownModal'

const DropDownModal = ({open, title, options, value, done, onSelect, headerIcon, headerIconImg}) => {

    let optionCounter = 0

    const renderOption = (option, index) => {

        return (
            <TouchableOpacity
                key={index}
                style={[Styles.modalList, ++optionCounter === Object.keys(options).length && Styles.lastColumn]}
                onPress={() => onSelect(option.value)}>
                <View style={Styles.modalRow}>
                    <View style={Styles.modalItem}>
                        <Text key={index} style={[Styles.modalItemText, value === option.value && Styles.selectedModalItem]}>
                            {option.label}
                        </Text>
                    </View>
                    {value === option.value &&
                        <View style={Styles.checkedIcon}>
                            <Image source={Images.checkedIcon} style={Styles.checkedIconImg} resizeMode='contain' />
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={Styles.container}>
            <ReactNative.Modal
                animationType = {"fade"}
                transparent = {true}
                visible = {open}
                onRequestClose={() => null}>
                <TouchableWithoutFeedback onPress={done}>
                    <View style={Styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={[Styles.modalContainer]}>
                    <View style={[Styles.modalInnerContainer]}>
                        <View style={[Styles.modalHeader]}>
                            {headerIcon &&
                                <Image source={headerIconImg} style={Styles.modalHeaderIcon} resizeMode='contain'/>
                            }
                            <Text style={Styles.modalTitleText}>{title}</Text>
                            <TouchableWithoutFeedback onPress={done}>
                                <View style={Styles.modalDoneTextContainer}>
                                    <Text style={Styles.modalDoneText}>Done</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[Styles.modalBody]}>
                            <ScrollView
                                ref={(scrollView) => {_scrollView = scrollView; }}
                                automaticallyAdjustContentInsets={false}
                                style={Styles.modalListContainer}>
                                {map(options, renderOption)}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ReactNative.Modal>
        </View>
    )
}

export default DropDownModal
