import { combineReducers } from 'redux';
import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'

import { NavigationTypes } from '../Actions'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	navRoot: navRoot,
    curPageTitle: 'Cars'
})

/* ------------- Reducers ------------- */

export const goPage = (state: Object, routeName) => {
    let nextState = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: routeName }))
    return state.merge({navRoot: nextState, curPageTitle: routeName})
}

export const reducer = createReducer(INITIAL_STATE, {
	[NavigationTypes.GO_PAGE]: goPage,
})
