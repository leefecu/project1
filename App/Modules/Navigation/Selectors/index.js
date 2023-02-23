import { createSelector } from 'reselect'
import {find} from 'lodash'

export const getCurPageTitle = state => state.navigation.curPageTitle
