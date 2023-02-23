import React, {PureComponent} from 'react'
import ReactNative, {Animated, View, Dimensions, Platform, Keyboard} from 'react-native'
import {Colors, Images, Metrics, Layout} from '../../../Themes'

var {height} = Dimensions.get('window')

export default class ScrollView extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            height: new Animated.Value(height),
            keyboardVisible: false
        }

        if ( Platform.OS === 'ios' ) {
            this.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
            this.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
        }
        else {
            this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this))
            this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this))
        }
    }

    keyboardWillShow (e) {


        ReactNative.Animated.timing(
           this.state.height,
            {
                toValue: height - e.endCoordinates.height,
                duration: 0
            },
         ).start()

         this.setState({
             keyboardVisible: true
         })
    }

    keyboardWillHide (e) {

        // reset modalHeight
        ReactNative.Animated.timing(
           this.state.height,
            {
                toValue: height,
                duration: 0
            },
         ).start()

         this.setState({
             keyboardVisible: false
         })
    }

    componentWillUnmount () {
        if (this.keyboardShowListener) {
            this.keyboardShowListener.remove()
        }

        if (this.keyboardHideListener) {
            this.keyboardHideListener.remove()
        }
    }

    render () {
        return (
            <Animated.View style={{height: this.state.height}}>
                <ReactNative.ScrollView {...this.props} keyboardShouldPersistTaps='always' accessible={false}>
                    {this.props.children}
                </ReactNative.ScrollView>
            </Animated.View>
        )
    }
}
