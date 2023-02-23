// @flow

import React, { Component } from 'react'
import {
    Picker,
    Platform,
    View,
    Image,
    TouchableWithoutFeedback,
    Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {map} from 'lodash'

import { Images, Colors, Layout } from '../../../Themes'
import Styles from './Styles/Dropdown'

import PickerModal from './PickerModal'

class Dropdown extends Component {

    constructor (props) {
        super(props)

        this.state = {
            value: this.props.value,
            modalVisible: false
        }
    }

    componentWillReceiveProps (newProps) {
        if (newProps.value !== this.state.value) {
            this.setState({value: newProps.value})
        }
    }

    _onChange (value) {
        if (Platform.OS === 'ios') {
            this.setState({
                modalVisible: false
            })
        }
        this.props.onChange(value)
    }

    androidPicker () {
        return (
            <Picker
                mode='dropdown'
                prompt='Select a category'
                style={Styles.transParent}
                selectedValue={this.props.value}
                onValueChange={(value) => this._onChange(value)}>
                {map(this.props.options, (option, index) => <Picker.Item key={index} label={option.label} value={option.value} />)}
            </Picker>
        )
    }

    iosPicker () {
        return (
            <PickerModal
                modalVisible={this.state.modalVisible}
                onCancel={() => this.setState({modalVisible: false})}
                onDone={() => this._onChange(this.state.value)}
            >
                <Picker
                    selectedValue={this.state.value}
                    onValueChange={(value) => this.setState({value})}>
                    {map(this.props.options, (option, index) => <Picker.Item key={index} label={option.label} value={option.value} />)}
                </Picker>
            </PickerModal>
        )
    }

    getLabel () {
        return this.props.options[this.state.value] ? this.props.options[this.state.value].label : ''
    }

    render () {
        return (
            <View style={Styles.container}>
                <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>
                    <View style={Styles.container}>
                        <View style={Styles.label}><Text>{this.props.label}</Text></View>
                        {!this.props.labelOnly &&
                        <View style={Styles.imageContainer}>
                            <Icon name='chevron-down' size={12} color={Colors.grey8} />
                        </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
                {Platform.OS === 'ios' ? this.iosPicker() : this.androidPicker() }
            </View>
        )
    }
}

Dropdown.defaultProps = {
    labelOnly: false
}

export default Dropdown
