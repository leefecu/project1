// @flow

import React, { PureComponent } from 'react'
import { AppState, 
        AsyncStorage, 
        NetInfo, 
        Platform, 
        StatusBar, 
        View, 
        Text 
} from 'react-native'
import Orientation from 'react-native-orientation'
//import RNFirebase from 'react-native-firebase'

import { connect } from 'react-redux'
import ReduxPersist from '../../../Config/ReduxPersist'

//Selectors
import * as CoreSelector from '../Selectors'
import * as ListingsSelectors from '../../Listings/Selectors'
import * as CouponsSelectors from '../../Coupons/Selectors'
import * as NavigationSelectors from '../../Navigation/Selectors'

//Actions
import CoreActions from '../Actions'
import NavigationActions from '../../Navigation/Actions'
import ListingsActions from '../../Listings/Actions'
import CouponsActions from '../../Coupons/Actions'

//Navigation
import NavigationRouter from '../../Navigation/Containers/NavigationRouter';

//Modal
import UpdateModal from './UpdateModal'
import MaintenanceModal from './MaintenanceModal'
import SupportModal from './SupportModal'
import TimeoutModal from './TimeoutModal'
import DropDownModal from '../Components/DropDownModal'

// Styles
import styles from './Styles/RootContainerStyle'


const Permissions = require('react-native-permissions')
const configurationOptions = {
    debug: true
};

//global.firebase = RNFirebase.initializeApp(configurationOptions)


class RootContainer extends PureComponent {

    constructor (props) {
        super(props)

        this._handleAppStateChange = this._handleAppStateChange.bind(this)
        this._handleNetworkConnection = this._handleNetworkConnection.bind(this)
        this._handleListingOptionChange = this._handleListingOptionChange.bind(this)
        this._handleCouponOptionChange = this._handleCouponOptionChange.bind(this)
        //this.scrollToTop = this.scrollToTop.bind(this)
        Orientation.lockToPortrait()
    }

    componentDidMount () {
        Orientation.lockToPortrait()

        AppState.addEventListener('change', this._handleAppStateChange)
        NetInfo.addEventListener('connectionChange', this._handleNetworkConnection)

        /*if (this.props.loggedIn && this.props.userId) {
            global.firebase.analytics().setUserId(this.props.userId)
        }
        else {
            global.firebase.analytics().setUserId(DeviceInfo.getUniqueID())
        }*/
        
    }

    componentWillMount () {
        const self = this
        Orientation.lockToPortrait()
        // if redux persist is not active fire startup action
        if (!ReduxPersist.active) {
            this.props.systemCheck()
            this.props.startup()
        }

        AsyncStorage.getItem('ListingViewType', (err, result) => {
            if(result){
                this.props.setRefine('view', 'value', result)
            }else{
                this.props.setRefine('view', 'value', 'lists')
            }
        })

        //AsyncStorage.setItem('HasSeenIntroScreen', 'false')
        AsyncStorage.getItem('HasSeenIntroScreen', (err, result) => {
            if(result && result === 'true'){
                this.props.setIntroPass(true)
            }
        })

        AsyncStorage.getItem('HasSavedCar', (err, result) => {
            if(result && result === 'true'){
                this.props.setSavedCar(true)
            }
        })
        AsyncStorage.getItem('HasSavedCoupon', (err, result) => {
            if(result && result === 'true'){
                this.props.setSavedCoupon(true)
            }
        })

        AsyncStorage.multiGet(['authToken', 'userId', 'snsType']).then((data) => {
            //AsyncStorage.multiRemove(['authToken', 'userId', 'snsType'])
            if (data[0][1]) {
                let token = data[0][1] || null
                let userId = data[1][1] || null
                let snsType = data[2] && data[2][1] || ''
                self.props.rememberMe(token, userId, snsType)
            }
        })

    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this._handleAppStateChange)
        NetInfo.removeEventListener('connectionChange', this._handleNetworkConnection)
    }

    _handleOptionChange (type, value) {

        switch ( this.props.pageTitle ){
            case "Cars" : {
                this._handleListingOptionChange(type, value)
                //this.scrollToTop('listing')
            }
            break
            case "Coupons" : {
                this._handleCouponOptionChange(type, value)
                //this.scrollToTop('coupon')
            }
            break
        }

    }

    _handleListingOptionChange (type, value) {
        const {
            coupons,
            fetchCoupons,
            fetching,
            currentPage,
            searchQuery,
            category,
            regionListings,
            sortby
        } = this.props

        if (this.listView) {
            this.listView.scrollTo({y: 0})
        }

        if (type === 'region') {

            this.props.searchListingsByRegion(value)

        } else if (type === 'sortby') {
            if (value === 'nearest') {
                Permissions.getPermissionStatus('location')
                .then(response => {
                    if (response !== 'authorized') {
                        Permissions.requestPermission('location')
                        .then(response => {
                            if (response !== 'authorized') {
                                alert('Please allow to access your location to use this feature')
                            } else if (response === 'authorized') {
                                this.props.searchListingsBySortby(value)
                            }
                        })
                    } else if (response === 'authorized') {
                        this.props.searchListingsBySortby(value)
                    }
                })
            } else {
                this.props.searchListingsBySortby(value)
            }
        }
        this.props.closeDropdown()
    }

    _handleCouponOptionChange (type, value) {
        const {
            coupons,
            fetchCoupons,
            fetching,
            currentPage,
            searchQuery,
            category,
            regionCoupons,
            sortby
        } = this.props

        //this.scrollToTop('coupon')

        if (type === 'region') {

            this.props.searchCouponsByRegion(value)

        } else if (type === 'sortby') {
            if (value === 'nearest') {
                Permissions.getPermissionStatus('location')
                .then(response => {
                    if (response !== 'authorized') {
                        Permissions.requestPermission('location')
                        .then(response => {
                            if (response !== 'authorized') {
                                alert('Please allow to access your location to use this feature')
                            } else if (response === 'authorized') {
                                this.props.searchCouponsBySortby(value)
                            }
                        })
                    } else if (response === 'authorized') {
                        this.props.searchCouponsBySortby(value)
                    }
                })
            } else {
                this.props.searchCouponsBySortby(value)
            }
        } else if (type === 'category') {
            this.props.searchCouponsByCategory(value)
        }
        this.props.closeDropdown()
    }

    _renderDropdown () {

        const {
            pageTitle,
            dropDownActive,
            category,
            categories,
            regionCoupons,
            regionListings,
            listingsRegions,
            couponsRegions,
            sortby,
            sortOptions,
            sortbyListing,
            sortOptionsListing
        } = this.props


        if (dropDownActive.region) {
            return <DropDownModal
                open={dropDownActive.region}
                title='Location'
                options={pageTitle === 'Cars' ? listingsRegions : couponsRegions}
                value={pageTitle === 'Cars' ? regionListings : regionCoupons}
                done={() => this.props.closeDropdown()}
                onSelect={(region) => this._handleOptionChange('region', region)}
            />
        } else if (dropDownActive.sortCoupons) {
            return <DropDownModal
                open={dropDownActive.sortCoupons}
                title='Sort by'
                options={sortOptions}
                value={sortby}
                done={() => this.props.closeDropdown()}
                onSelect={(sortby) => this._handleOptionChange('sortby', sortby)}
            />
        } else if (dropDownActive.sortListings) {
            return <DropDownModal
                open={dropDownActive.sortListings}
                title='Sort by'
                options={sortOptionsListing}
                value={sortbyListing}
                done={() => this.props.closeDropdown()}
                onSelect={(sortby) => this._handleOptionChange('sortby', sortby)}
            />
        } else if (dropDownActive.category) {
            return <DropDownModal
                open={dropDownActive.category}
                title='Category'
                options={categories}
                value={category}
                done={() => this.props.closeDropdown()}
                onSelect={(category) => this._handleOptionChange('category', category)}
            />

        }
        return null
    }

    _handleAppStateChange (appState) {
        if (appState === 'active') {
            this.props.systemCheck()
        }
        else if (appState === 'background') {

        }
    }

    _handleNetworkConnection (isConnected) {
        if (typeof isConnected === 'string') {
            isConnected = isConnected !== 'none'
        }

        this.props.setOffline(! isConnected)
    }

    render () {
        const {
            maintenance,
            supportModalVisible,
            offline,
            timeout,
            iosUpgrade,
            androidUpgrade
        } = this.props

        return (
            <View style={[styles.applicationView]}>
                <StatusBar barStyle='light-content' />
                <NavigationRouter dd={this.props}/>
                {maintenance && <MaintenanceModal />}
                {supportModalVisible && <SupportModal />}
                {
                    /*((Platform.OS === 'ios' && iosUpgrade) ||
                    (Platform.OS === 'android' && androidUpgrade)) &&
                    <UpdateModal />*/
                }
                {(timeout || offline) && <TimeoutModal />}
                
                {this._renderDropdown()}

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        androidUpgrade: CoreSelector.getAndroidUpgrade(state),
        iosUpgrade: CoreSelector.getIosUpgrade(state),
        maintenance: CoreSelector.getMaintenance(state),
        offline: CoreSelector.getOffline(state),
        supportModalVisible: CoreSelector.getSupportModalVisible(state),
        timeout: CoreSelector.getTimeout(state),

        pageTitle: NavigationSelectors.getCurPageTitle(state),

        dropDownActive: CoreSelector.getDropDownActive(state),
        category: CouponsSelectors.getCategory(state), //only for coupons
        categories: CoreSelector.getCategories(state),  //only for coupons
        regionCoupons: CouponsSelectors.getRegion(state),
        regionListings: ListingsSelectors.getRegion(state),
        listingsRegions: CoreSelector.getListingRegions(state),
        couponsRegions: CoreSelector.getCouponRegions(state),
        sortby: CouponsSelectors.getSortby(state),
        sortOptions: CouponsSelectors.getSortOptions(state),
        sortbyListing: ListingsSelectors.getSortby(state),
        sortOptionsListing: ListingsSelectors.getSortOptions(state),
        
    }
};
const mapStateToDispatch = (dispatch) => ({
    rememberMe: (authToken, userId, snsType) => dispatch(UserActions.rememberRequest(authToken, userId, snsType)),
    startup: () => dispatch(CoreActions.searchOptionsRequest()),
    systemCheck: () => dispatch(CoreActions.systemCheckRequest()), 
    setOffline: (offline) => dispatch(CoreActions.setOffline(offline)),
    setIntroPass: (status) => dispatch(ListingsActions.setIntroPass(status)),
    setSavedCar: (status) => dispatch(ListingsActions.setSavedCar(status)),
    setSavedCoupon: (status) => dispatch(ListingsActions.setSavedCoupon(status)),
    setRefine: (key, option, value) => dispatch(ListingsActions.setRefine(key, option, value)),
    closeDropdown: () => dispatch(CoreActions.closeDropdown()),

    searchCouponsByRegion: (region) => dispatch(CouponsActions.searchCouponsByRegion(region)),
    searchCouponsByCategory: (category) => dispatch(CouponsActions.searchCouponsByCategory(category)),
    searchCouponsBySortby: (sortby) => dispatch(CouponsActions.searchCouponsBySortby(sortby)),
    searchListingsByRegion: (region) => dispatch(ListingsActions.searchListingsByRegion(region)),
    searchListingsBySortby: (sortby) => dispatch(ListingsActions.searchListingsBySortby(sortby)),
})

export default connect(mapStateToProps, mapStateToDispatch)(RootContainer)
