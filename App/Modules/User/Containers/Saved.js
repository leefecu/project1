import React, { PureComponent } from 'react'
import {
    Platform,
    AsyncStorage,
    Animated,
    ScrollView,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { TabViewAnimated, TabBarTop, TabBar } from 'react-native-tab-view'
import { ApplicationStyles, Images, Metrics, Colors } from '../../../Themes'

import * as CoreSelectors from '../../Core/Selectors'
import CouponsActions from '../../Coupons/Actions'
import * as CouponsSelectors from '../../Coupons/Selectors'
import ListingsActions from '../../Listings/Actions'
import * as ListingsSelectors from '../../Listings/Selectors'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'

import HOCRootContainer from '../../Core/Containers/HOCRootContainer'
import TabView from '../../Core/Components/TabView'
import SavedListings from '../Components/SavedListings'
import SavedCoupons from '../Components/SavedCoupons'
import SavedChangeDot from '../Components/SavedChangeDot'
import NeedToLogin from '../Components/NeedToLogin'

import Styles from './Styles/Saved'

class Saved extends PureComponent {

    constructor (props) {
        super(props)

        this._handleTabChange = this._handleTabChange.bind(this)
        this._handleBrowseCars = this._handleBrowseCars.bind(this)
        this._handleBrowseCoupons = this._handleBrowseCoupons.bind(this)
        
        this.props.navigator.setStyle({
            navBarCustomView: 'carmate.NavBar',
            navBarComponentAlignment: 'center',
            navBarHeight: Metrics.navBarHeight-10,
            navBarTopPadding: 24,
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator,
                type: 'noSearch',
                title: 'Saved'
            }
        })
    }

    componentDidMount () {
        this.props.fetchMyListings()
        this.props.fetchMyCoupons()
    }

    componentWillUpdate (newProps, nextState) {
        if (newProps.loggedIn && newProps.loggedIn !== this.props.loggedIn) {
            this.props.fetchMyListings()
            this.props.fetchMyCoupons()    
        }
    }


    _handleTabChange(tab) {
        const currentPage = tab.i

        if ( currentPage == 0 ) {
            AsyncStorage.setItem('HasSavedCar', 'false')
            this.props.changeSavedTab('cars')
            this.props.setSavedCar(false)
        } else {
            AsyncStorage.setItem('HasSavedCoupon', 'false')
            this.props.changeSavedTab('coupons')
            this.props.setSavedCoupon(false)
        }
    }

    _handleBrowseCars () {
        this.props.navigator.switchToTab({
            tabIndex: 0
        })
    }

    _handleBrowseCoupons () {
        
        this.props.navigator.switchToTab({
            tabIndex: 1
        })
    }

    _renderChangeDot = (type) => {
        if(!this.props.myListingLoading){
            return (
                <SavedChangeDot type={type === 0 ? 'cars' : 'coupons'}/>
            )
        }
        return null
    }
 
    _handleChangeTab = (index) => {
        this.props.setTabIndex(index)
    }

    _renderHeader = (props) => {
        return <TabBar {...props} 
                style={Styles.tabsWrapStyle}
                tabStyle={Styles.tabStyle}
                pressColor={'transparent'}
                pressOpacity = {1}
                labelStyle={Styles.tabBarTextStyle}
                indicatorStyle={Styles.tabUnderLineStyle}/>
    }

	_renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return (
                    <View style={Styles.page}>
                        <SavedListings 
                        	navigator = {this.props.navigator}
                        	onPressNoItem={this._handleBrowseCars}/>
                    </View>
                )
            case '2':
                return (
                    <View style={Styles.page}>
                        <SavedCoupons
                            navigator={this.props.navigator}
                            onPressNoItem={this._handleBrowseCoupons}/>
                    </View>
                ) 
            default:
                return null;
        }
    }

    render () {
        const {
            myListingLength,
            myCouponLength,
            tabState,
            savedTabStatus,
            loggedIn
        } = this.props

        return (
            <View style={[Styles.container, Styles.viewContainer, Styles.iphoneXStyle]}>
                {loggedIn ?
                    <View style={[tabState.index === 0 ? Styles.tabListingViewContainer : Styles.tabAboutViewContainer]}>
                        <TabView 
                            state={tabState}
                            _renderScene={this._renderScene}
                            _renderHeader={this._renderHeader}
                            _handleChangeTab={this._handleChangeTab}
                        />
                    </View>
                :
                    <NeedToLogin navigator={this.props.navigator}/>
                }
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: ListingsSelectors.getCurrentPage(state),
        myListingLoading: ListingsSelectors.getMyListingLoading(state),
        myCouponLength: CouponsSelectors.getMyCouponLength(state),
        myListingLength: ListingsSelectors.getMyListingLength(state),
        pageStatus: CoreSelectors.getPageStatus(state),
        savedTabStatus: CoreSelectors.getSavedTabStatus(state),
        tabState: UserSelectors.getTabState(state),
        loggedIn: UserSelectors.getLoggedIn(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeFeaturesTab: (tab) => dispatch(CoreActions.changeFeaturesTab(tab)),
        changeSavedTab: (tab) => dispatch(CoreActions.changeSavedTab(tab)),
        fetchMyListings: () => dispatch(ListingsActions.myListingsRequest()),
        fetchMyCoupons: () => dispatch(CouponsActions.myCouponsRequest()),
        setSavedCar: (status) => dispatch(ListingsActions.setSavedCar(status)),
        setSavedCoupon: (status) => dispatch(ListingsActions.setSavedCoupon(status)),
        setTabIndex: (index) => dispatch(UserActions.setTabIndex(index))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HOCRootContainer('saved')(Saved))