// @flow

import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Provider, connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import Orientation from 'react-native-orientation'
import RNFirebase from 'react-native-firebase'

import {registerScreens} from './Screen'
//import applyConfigSettings from './Config'
import createStore from '../../../Redux'

import { Images, Colors, Fonts, Metrics } from '../../../Themes/'

//Actions
import CoreActions from '../../Core/Actions'
import NavigationActions from '../Actions'
import ListingsActions from '../../Listings/Actions'

import TabIcon from '../Components/TabIcon'

//applyConfigSettings()

const store = createStore()

registerScreens(store, Provider)

const navigatorStyle = {
    navBarBackgroundColor: Colors.brandColor,
    navBarTextColor: Colors.snow,
    navBarButtonColor: Colors.snow,
    statusBarHidden: true
};

const configurationOptions = {
    debug: true
};

global.firebase = RNFirebase.initializeApp(configurationOptions)

class App extends Component {

    constructor(props) {
        super(props);
        this.startApp()

        Orientation.lockToPortrait()
    }

    startApp() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Cars',
                    screen: 'carmate.Listings',
                    icon: Images.navCarsIcon,
                    selectedIcon: Images.navCarsIconActive,
                    title: 'Car Mate',
                    testID: 'CarsTab',
                    navigatorStyle
                },
                {
                    label: 'Coupons',
                    screen: 'carmate.Coupons',
                    icon: Images.navCouponsIcon,
                    selectedIcon: Images.navCouponsIconActive,
                    title: 'Car Mate',
                    testID: 'CouponsTab',
                    navigatorStyle
                },
                {
                    label: 'Saved',
                    screen: 'carmate.Saved',
                    icon: Images.navSavedIcon,
                    selectedIcon: Images.navSavedIconActive,
                    title: 'Saved',
                    testID: 'SavedTab',
                    navigatorStyle
                }
            ],
            ...Platform.select({
                ios: {
                    tabsStyle: {
                        tabBarSelectedButtonColor: Colors.primaryPink,
                        tabBarBackgroundColor: Colors.snow,
                        //tabBarBackgroundColor: Colors.brandColor
                    },
                },
                android: {
                    appStyle: {
                        tabBarSelectedButtonColor: Colors.primaryPink,
                        tabBarBackgroundColor: Colors.snow,
                        //tabBarBackgroundColor: Colors.brandColor
                    }
                },
            }),
            drawer: {
                left: {
                    screen: 'carmate.SideMenu',
                },
                right: {
                    screen: 'carmate.Refine',
                },
                style: {
                    drawerShadow: false,
                    contentOverlayColor: 'rgba(0,0,0,0.5)',
                    leftDrawerWidth: 90,
                    rightDrawerWidth: 90,
                    shouldStretchDrawer: false
                },
                disableOpenGesture: true
            }
        });
    }
}

export default App
