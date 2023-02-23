
import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    goPage: ['routeName'],
    pushLoginPage: ['navigator']
})

export const NavigationTypes = Types
export default Creators
