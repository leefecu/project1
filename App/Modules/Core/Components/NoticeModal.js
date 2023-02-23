import React, {Component} from 'react'
import ReactNative, {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text
} from 'react-native'
import { map, noop } from 'lodash'

import { Colors, Images, Layout, Metrics } from '../../../Themes'

import * as CoreHelpers from '../Helpers'

import Button from './Button'
import UList from './UList'

//Styles
import Styles from './Styles/NoticeModal'

const NoticeModal = ({animationType, modalVisible, containerStyle, descriptions, titleStyle, descriptionsStyle, subDesc, subDescStyle, icon, iconStyle, secondButton, buttonLabel, secondLabel, onSecond, onClick}) => {
    
    return (
        <View style={[Styles.container]}>
            <View style={Styles.overlay} />
            <View style={Styles.innerContainer}>
                <View style={Styles.modalContainer}>
                    <View style={[Styles.title]}>
                        <View style={Styles.modalIconContainer}>
                            <Image source={icon} style={iconStyle} resizeMode='contain'/>
                        </View>
                        <Text style={[Styles.titleText, titleStyle]}>{descriptions.titleText}</Text>
                    </View>

                    <View style={[Styles.descDatails]}>
                        {descriptions && descriptions.descDetails && descriptions.descDetails.length > 0 &&
                            <UList
                                containerClass={Styles.descUlContainer}
                                itemClass = {Styles.descUlItem}
                                textClass={descriptionsStyle}
                                items={map(descriptions.descDetails, (item) => {
                                    return {icon: null, label: item, hideIcon: true}
                                })}
                            />
                        }
                        { subDesc != "" && 
                            <View style={Styles.subDescContainer}>
                                <Text style={subDescStyle}>{subDesc}</Text> 
                            </View>
                        }
                    </View>

                    {secondButton ? 
                        <View style={[Styles.footer]}>
                            <View style={[Styles.buttonContainer]}>
                                <TouchableWithoutFeedback onPress={onClick}>
                                    <View style={[Layout.flex5, Styles.buttonInnerContainer]}>
                                        <Text style={[Styles.buttonText, Styles.confirmText]}>{buttonLabel}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={onSecond}>
                                    <View style={[Layout.flex5, Styles.buttonInnerContainer, Styles.cancelContainer]}>
                                        <Text style={[Styles.buttonText, Styles.cancelText]}>{secondLabel}</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        </View>
                    :
                        <View style={[Styles.footer, Layout.flex]}>
                            <View style={[Styles.buttonContainer]}>
                                <TouchableWithoutFeedback onPress={onClick}>
                                    <View style={[Layout.flex, Styles.buttonInnerContainer]}>
                                        <Text style={[Styles.buttonText, Styles.confirmText]}>{buttonLabel}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    }
                    
                </View>

            </View>
        </View>
    )
}


NoticeModal.defaultProps = {
    subDesc: "",
    secondButton: false,
    onSecond: noop,
    onClick: noop,
    containerStyle: null,
    titleStyle: null
}
export default NoticeModal
