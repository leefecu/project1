import React, { PureComponent } from 'react'
import {
    AppState,
    AsyncStorage,
    NetInfo,
    Platform,
    View,
    StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import ReduxPersist from '../../../Config/ReduxPersist'
import DeviceInfo from 'react-native-device-info'

//Selectors
import * as CoreSelectors from '../Selectors'
import * as ListingsSelectors from '../../Listings/Selectors'
import * as CouponsSelectors from '../../Coupons/Selectors'
import * as NavigationSelectors from '../../Navigation/Selectors'

//Actions
import CoreActions from '../Actions'
import NavigationActions from '../../Navigation/Actions'
import ListingsActions from '../../Listings/Actions'
import CouponsActions from '../../Coupons/Actions'
import UserActions from '../../User/Actions'

//Modal
import UpdateModal from '../Components/UpdateModal'
import MaintenanceModal from '../Components/MaintenanceModal'
import SupportModal from '../Components/SupportModal'
import TimeoutModal from '../Components/TimeoutModal'
import DropDownModal from '../Components/DropDownModal'
import PushNotification from '../Components/PushNotificationController'
import Styles from './Styles/HOCRootContainer'

const HOCRootContainer = (view) => (WrappedComponent) => {

    class RootContainer extends PureComponent {

        constructor (props) {
            super(props)

            this._handleAppStateChange = this._handleAppStateChange.bind(this)
            this._handleNetworkConnection = this._handleNetworkConnection.bind(this)
            this._handleOptionChange = this._handleOptionChange.bind(this)
            this._handleListingOptionChange = this._handleListingOptionChange.bind(this)
            this._handleCouponOptionChange = this._handleCouponOptionChange.bind(this)
            //this.scrollToTop = this.scrollToTop.bind(this)
            this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

            Orientation.lockToPortrait()
        }

        componentDidMount () {
            Orientation.lockToPortrait()

            if(view === 'listings'){
                AppState.addEventListener('change', this._handleAppStateChange)
                NetInfo.addEventListener('connectionChange', this._handleNetworkConnection)
            }

        }

        componentWillMount () {
            const self = this
            if(view === 'listings'){
                Orientation.lockToPortrait()
                // if redux persist is not active fire startup action
                if (!ReduxPersist.active) {
                    this.props.systemCheck(this.props.navigator)
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
                        global.firebase.analytics().setUserId(userId)
                        let token = data[0][1] || null
                        let userId = data[1][1] || null
                        let snsType = data[2] && data[2][1] || ''
                        self.props.rememberMe(token, userId, snsType)
                    } else{
                        global.firebase.analytics().setUserId(DeviceInfo.getUniqueID())
                    }
                })

            }
        }

        componentWillUnmount () {

            if(view === 'listings'){
                AppState.removeEventListener('change', this._handleAppStateChange)
                NetInfo.removeEventListener('connectionChange', this._handleNetworkConnection)
            }
        }

        onNavigatorEvent(event) {

            if(event.id && event.id === "bottomTabSelected"){

                let page = ''
                switch ( event.selectedTabIndex ) {
                    case 0: {
                        page = 'listings'
                    }
                    break
                    case 1: {
                        page = 'coupons'
                    }
                    break
                    case 2: {
                        page = 'saved'
                    }
                    break
                }
                this.props.changePage(page)

                if(event.selectedTabIndex === 2){
                    if(!this.props.loggedIn){
                        this.needToLogin()
                    }
                }
            }
        }

        needToLogin(){
            this.props.navigator.showModal({
                screen: 'carmate.Login',
                animationType: 'slide-up',
                backButtonHidden: true
            })

        }

        _handleOptionChange (type, value) {
            const {
                pageStatus
            } = this.props

            switch ( pageStatus ){
                case "listings" : {
                    this._handleListingOptionChange(type, value)
                    //this.scrollToTop('listing')
                }
                break
                case "coupons" : {
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
                sortbyListing
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
                sortbyCoupon
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

        _handleAppStateChange (appState) {
            if (appState === 'active') {
                this.props.systemCheck(this.props.navigator)
            } else if (appState === 'background') {

            }
        }

        _handleNetworkConnection (connectionInfo) {
            const { navigator } = this.props;
            let offline = connectionInfo.type === 'none';
            this.props.setOffline(offline)
            if (offline) {
                navigator.showModal({
                    screen: 'carmate.TimeoutModal',
                    animationType: 'slide-up',
                    backButtonHidden: true
                });
            } else {
                navigator.dismissModal({
                    screen: 'carmate.TimeoutModal',
                    animationType: 'slide-up',
                });
            }
        }

        _renderDropdown() {
            const {
                pageTitle,
                pageStatus,
                dropDownActive,
                category,
                categories,
                regionCoupons,
                regionListings,
                listingsRegions,
                couponsRegions,
                sortbyCoupon,
                sortOptionsCoupon,
                sortbyListing,
                sortOptionsListing
            } = this.props

            if (dropDownActive.region) {
                if(view === pageStatus ){
                    return <DropDownModal
                        open={dropDownActive.region}
                        title='Location'
                        options={view === 'listings' ? listingsRegions : couponsRegions}
                        value={view === 'listings' ? regionListings : regionCoupons}
                        done={() => this.props.closeDropdown()}
                        onSelect={(region) => this._handleOptionChange('region', region)} />
                }

            } else if (dropDownActive.sortCoupons) {

                return <DropDownModal
                    open={dropDownActive.sortCoupons}
                    title='Sort by'
                    options={sortOptionsCoupon}
                    value={sortbyCoupon}
                    done={() => this.props.closeDropdown()}
                    onSelect={(sortby) => this._handleOptionChange('sortby', sortby)} />

            } else if (dropDownActive.sortListings) {

                return <DropDownModal
                    open={dropDownActive.sortListings}
                    title='Sort by'
                    options={sortOptionsListing}
                    value={sortbyListing}
                    done={() => this.props.closeDropdown()}
                    onSelect={(sortby) => this._handleOptionChange('sortby', sortby)} />

            } else if (dropDownActive.category) {

                return <DropDownModal
                    open={dropDownActive.category}
                    title='Category'
                    options={categories}
                    value={category}
                    done={() => this.props.closeDropdown()}
                    onSelect={(category) => this._handleOptionChange('category', category)} />

            }

            return null
        }

        render() {
            const {
                maintenance,
                supportModalVisible,
                offline,
                timeout,
                iosUpgrade,
                androidUpgrade
            } = this.props

            return(
                <View style={[Styles.applicationView]}>
                    <WrappedComponent {...this.props} />
                    <StatusBar barStyle='light-content' />
                    {supportModalVisible && <SupportModal />}
                    {this._renderDropdown()}

                    {view === 'listings' && <PushNotification navigator={this.props.navigator}/>}
                </View>
            )
        }

    }

    const mapStateToProps = (state) => {
        return {
            androidUpgrade: CoreSelectors.getAndroidUpgrade(state),
            iosUpgrade: CoreSelectors.getIosUpgrade(state),
            maintenance: CoreSelectors.getMaintenance(state),
            offline: CoreSelectors.getOffline(state),
            supportModalVisible: CoreSelectors.getSupportModalVisible(state),
            timeout: CoreSelectors.getTimeout(state),
            dropDownActive: CoreSelectors.getDropDownActive(state),
            category: CouponsSelectors.getCategory(state), //only for coupons
            categories: CoreSelectors.getCategories(state),  //only for coupons
            regionCoupons: CouponsSelectors.getRegion(state),
            regionListings: ListingsSelectors.getRegion(state),
            listingsRegions: CoreSelectors.getListingRegions(state),
            couponsRegions: CoreSelectors.getCouponRegions(state),
            sortbyCoupon: CouponsSelectors.getSortby(state),
            sortOptionsCoupon: CouponsSelectors.getSortOptions(state),
            sortbyListing: ListingsSelectors.getSortby(state),
            sortOptionsListing: ListingsSelectors.getSortOptions(state),
            pageStatus: CoreSelectors.getPageStatus(state),
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            rememberMe: (authToken, userId, snsType) => dispatch(UserActions.rememberRequest(authToken, userId, snsType)),
            startup: () => dispatch(CoreActions.searchOptionsRequest()),
            systemCheck: (navigator) => dispatch(CoreActions.systemCheckRequest(navigator)),

            setOffline: (offline) => dispatch(CoreActions.setOffline(offline)),
            setIntroPass: (status) => dispatch(ListingsActions.setIntroPass(status)),
            setSavedCar: (status) => dispatch(ListingsActions.setSavedCar(status)),
            setSavedCoupon: (status) => dispatch(CouponsActions.setSavedCoupon(status)),
            setRefine: (key, option, value) => dispatch(ListingsActions.setRefine(key, option, value)),

            searchCouponsByRegion: (region) => dispatch(CouponsActions.searchCouponsByRegion(region)),
            searchCouponsByCategory: (category) => dispatch(CouponsActions.searchCouponsByCategory(category)),
            searchCouponsBySortby: (sortby) => dispatch(CouponsActions.searchCouponsBySortby(sortby)),
            searchListingsByRegion: (region) => dispatch(ListingsActions.searchListingsByRegion(region)),
            searchListingsBySortby: (sortby) => dispatch(ListingsActions.searchListingsBySortby(sortby)),

            closeDropdown: () => dispatch(CoreActions.closeDropdown()),
            changePage: (page) => dispatch(CoreActions.changePage(page)),

            firebaseSetUserId: () => dispatch(CoreActions.firebaseSetUserId())
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(RootContainer)
}

export default HOCRootContainer;
