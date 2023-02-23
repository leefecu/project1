// @flow

import React, { Component } from 'react'
import {
    Image,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import { Images, Layout, Metrics } from '../../../Themes'

//Styles
import Styles from './Styles/RefineItem'

export const RefineDefault = ({defaultText, selected, _onClick}) => {

    return (
        <View>
            <TouchableWithoutFeedback onPress={ () => _onClick()}>
                <View style={[Layout.horizontalRow, Styles.container]}>
                    <View style={[selected ? Layout.flex8 : Layout.flex]}>
                        <Text style={[Styles.label, selected && Styles.activeLabel]}>{defaultText}</Text>
                    </View>
                    {selected &&
                        <View style={[Layout.flex2, Styles.centerSubRow, Layout.textBottomAlign]}>
                            <Image source={Images.checkedIcon} style={Styles.checkedImg}/>
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

}

export const RefineSubItem = ({item, selectedItem, _onClick}) => {

    let title = ""
    let value = ""
    
    if(item.label){
        title = item.label
    }else{
        title = item
    }

    if(item.value){
        value = item.value
    }else{
        value = item
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={ () => _onClick(value)}>
                <View style={[Layout.horizontalRow, Styles.container]}>
                    <View style={[selectedItem === value ? Layout.flex8 : Layout.flex]}>
                        <Text style={[Styles.label, selectedItem === value && Styles.activeLabel]}>{title}</Text>
                    </View>
                    {selectedItem === value &&
                        <View style={[Layout.flex2, Styles.centerSubRow, Layout.textBottomAlign]}>
                            <Image source={Images.checkedIcon} style={Styles.checkedImg}/>
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

}

export const RefineSortbyLocation = ({item, selectedItem, _onClick}) => {

    let title = item.label
    let value = item.value
    
    return (
        <View>
            <TouchableWithoutFeedback onPress={ () => _onClick(value)}>
                <View style={[Layout.horizontalRow, Styles.container]}>
                    <View style={[selectedItem === value ? Layout.flex8 : Layout.flex]}>
                        <Text style={[Styles.label, selectedItem === value && Styles.activeLabel]}>{title}</Text>
                    </View>
                    
                    {selectedItem === value &&
                        <View style={[Layout.flex2, Styles.centerSubRow, Layout.textBottomAlign]}>
                            <Image source={Images.checkedIcon} style={Styles.checkedImg}/>
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

}

export default {
    refineDefault: RefineDefault,
    refineSubItem: RefineSubItem,
    refineSortbyLocation: RefineSortbyLocation
}
