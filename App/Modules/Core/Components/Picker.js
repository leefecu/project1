import React from 'react'
import { Picker, Platform } from 'react-native'
import { concat, map } from 'lodash'


const renderPricePickerItem = (item, index) => {
        return <Picker.Item key={index} label = {item.label.toString()} value = {item.value} />
}

const ValuePicker = ({type, valueType, itemList, defaultLabel, pickerStyle, itemStyle, selectedValue, _onChange}) => {
    let pickerItems = []
    if (Platform.OS === 'ios') {
        pickerItems.push(<Picker.Item key={-1} label = {defaultLabel} value = {null}/>)
    }
    pickerItems = concat(pickerItems, itemList.map((item, index) => renderPricePickerItem(item, index)))
    return (
        <Picker
            style={pickerStyle}
            itemStyle={itemStyle}
            selectedValue = {selectedValue}
            onValueChange = {(itemValue, itemIndex) => _onChange(type, valueType, itemValue)}>
           {pickerItems}
        </Picker>
    )

}

export default ValuePicker


