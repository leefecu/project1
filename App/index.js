import { Provider, connect } from 'react-redux'

import createStore from './Redux'
import {registerScreens} from './Modules/Navigation/Containers/Screen'
//import applyConfigSettings from './Config'

import App from './Modules/Navigation/Containers/App';

const store = createStore()

registerScreens(store, Provider)

const app = new App()
