import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import {noop} from 'lodash'

import { Images, Colors, Layout, Metrics } from '../../../Themes'

//Styles
import Styles from './Styles/MenuItem'

const MenuItem = ({icon, activeIcon, label, activeStyle, menuType, labelStyle, _onClick, testID}) => {

    const getImageSource = () => {
        if(activeStyle) {
            return Images[activeIcon.name]
        }
        return Images[icon.name]
        
    }

    return (
        <TouchableHighlight testID={testID}
                            onPress={_onClick} 
                            underlayColor={Colors.snow} 
                            style={[Styles.container, 
                                    menuType === 'hasSubMenu' && Styles.hasSubMenu, 
                                    menuType === 'logout' && Styles.logoutContainer,
                                    activeStyle && label !== 'My Page' && Styles.activeContainer ]}>
            <View style={[Layout.horizontalRow]}>

                {menuType != 'logout' &&
                    <View style={[Layout.flex2, Styles.icon]}>
                        <Image source={getImageSource()} style={Styles.img}/>
                    </View>
                }
                <View style={menuType == 'logout' ? [Layout.flex, Layout.textCenterAlign] : [Layout.flex8, Styles.menu]}>
                    <Text style={[Styles.menuText, menuType == 'hasSubMenu' && Styles.hasSubMenuText, activeStyle  && label !== 'My Page' && Styles.menuActiveText, labelStyle]}>{label}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default MenuItem