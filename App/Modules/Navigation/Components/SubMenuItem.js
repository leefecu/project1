import React from 'react'
import { 
    View, 
    Text, 
    Image, 
    TouchableHighlight
} from 'react-native'
import {noop} from 'lodash'

import { Images, Colors, Layout, Metrics } from '../../../Themes'

//Styles
import Styles from './Styles/MenuItem'

const SubMenuItem = ({label, lastSubMenu, activeStyle, labelStyle, _onClick, testID}) => {

    return (
        <TouchableHighlight testID={testID}
                            onPress={_onClick} 
                            underlayColor={Colors.snow} 
                            style={[Styles.submenuContainer, 
                                    lastSubMenu == 'lastSubMenu' && Styles.subMenuBottomBorder,]}>
            <View style={[Layout.horizontalRow]}>
                <View style={[Layout.flex2, Styles.icon]}>
                </View>
                <View style={[Layout.flex8, Styles.menu]}>
                    <Text style={[Styles.menuText, activeStyle && Styles.menuActiveText ]}>{label}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default SubMenuItem
