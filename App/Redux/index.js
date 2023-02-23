// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
    const rootReducer = combineReducers({
		core: require('../Modules/Core/Reducers').reducer,
		listings: require('../Modules/Listings/Reducers').reducer,
		coupons: require('../Modules/Coupons/Reducers').reducer,
		showroom: require('../Modules/Showroom/Reducers').reducer,
		review: require('../Modules/Review/Reducers').reducer,
		//navigation: require('../Modules/Navigation/Reducers').reducer,
        user: require('../Modules/User/Reducers').reducer
    })

    return configureStore(rootReducer, rootSaga)
}