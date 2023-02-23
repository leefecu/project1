import React, { PureComponent } from 'react';
import { 
    Dimensions,
    View, 
    Text, 
    Image,
    InteractionManager,
    StyleSheet
} from 'react-native';
import { TabViewAnimated, TabBarTop, TabBar } from 'react-native-tab-view';
import { ApplicationStyles, Images, Metrics, Layout, Colors } from '../../../Themes'

//Styles
import Styles from './Styles/TabView'

class TabView extends PureComponent {
 
    constructor (props) {
        super(props)
    }
 
    render() {
        return (
            <View style={[ApplicationStyles.layout.fullBackground, {position: 'relative'}, Styles.container]}>
                <TabViewAnimated
                    style={Styles.container}
                    navigationState={this.props.state}
                    renderScene={this.props._renderScene}
                    renderHeader={this.props._renderHeader}
                    onIndexChange={this.props._handleChangeTab}
                />
            </View>
        )
    }
}

export default TabView