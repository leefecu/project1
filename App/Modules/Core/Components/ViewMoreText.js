import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'

const emptyFunc = ()=> {}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()))
}

function measureHeightAsync(component) {
    return new Promise(resolve => {
        component.measure((x, y, w, h) => {
            resolve(h)
        })
    })
}

class ViewMoreText extends PureComponent {

    constructor (props) {
        super(props)

        this.isTruncated = false
        this.originalHeight = 0
        this.shouldShowMore = false
        this.contentHeight = 0
        this.isInit = false

        this.state = {
            numberOfLines: null,
            opacity: 0
        }

        this.onLayout = this.onLayout.bind(this)
        this.onPressMore = this.onPressMore.bind(this)
        this.onPressLess = this.onPressLess.bind(this)
        this.scrollOn = false
    }

    async componentDidUpdate (prevProps, prevState){
        let fullHeight = 0, limitedHeight = 0

        if (prevState.numberOfLines !== this.state.numberOfLines) {

            if(this.state.numberOfLines === null){
                limitedHeight = await measureHeightAsync(this._text)
                await nextFrameAsync()

                if (this.originalHeight > limitedHeight) {
                    if (this.props.afterExpand) {
                        this.props.afterExpand(this.originalHeight - limitedHeight + 20)
                    } else {
                        emptyFunc()
                    }
                }
            } else {
                fullHeight = await measureHeightAsync(this._text)
                await nextFrameAsync()
                limitedHeight = await measureHeightAsync(this._text)

                if (fullHeight > limitedHeight) {
                    if (this.props.afterCollapse) {
                        this.props.afterCollapse(limitedHeight - fullHeight, this.scrollOn)
                    } else {
                        emptyFunc()
                    }
                }
            }
        }
    }

    onLayout(event){
        const {x, y, width, height} = event.nativeEvent.layout

        if(height === 0 || this.state.opacity === 1) return false;

        this.setOriginalHeight(height)
        this.checkTextTruncated(height)
        if(this.state.numberOfLines === this.props.numberOfLines){
            this.setState({
                opacity: 1
            })
        }
    }

    setOriginalHeight(height){
        if(this.originalHeight === 0){
            this.originalHeight = height

            this.setState({
                numberOfLines: this.props.numberOfLines
            })
        }
    }

    checkTextTruncated(height){
        if(height < this.originalHeight){
            this.shouldShowMore = true
        }
    }

    onPressMore(){
        this.scrollOn = true
        this.setState({
            numberOfLines: null
        })
    }

    onPressLess(){
        this.setState({
            numberOfLines: this.props.numberOfLines
        })
    }

    renderViewMore(){
        return (
            <Text onPress={this.onPressMore}>
                View More
            </Text>
        )
    }

    renderViewLess(){
        return (
            <Text onPress={this.onPressLess}>
                View Less
            </Text>
        )
    }

    renderFooter(){
        let {
            numberOfLines
        } = this.state;

        if (this.shouldShowMore === true){
            if(numberOfLines > 0) {
                return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
            } else {
                return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
            }
        }
    }

    render(){

        return (
            <View onLayout={this.onLayout} style={{opacity: this.state.opacity}} ref={text => this._text = text}>
                <Text
                    numberOfLines={this.state.numberOfLines}>
                    {this.props.children}
                </Text>
                {this.renderFooter()}

                {
                    this.state.numberOfLines &&
                    <View style={{width: 1, height: 1}}></View>
                }

            </View>
        )
    }

}
/*
ViewMoreText.PropTypes = {

    renderViewMore: PropTypes.func,
    renderViewLess: PropTypes.func,
    afterCollapse: PropTypes.func,
    afterExpand: PropTypes.func,
    numberOfLines: PropTypes.number.isRequired
}*/

ViewMoreText.defaultProps = {
    numberOfLines: 5
}

export default ViewMoreText
