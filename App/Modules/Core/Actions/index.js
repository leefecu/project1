import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    changePage: ['page'],
    changeMyPage: ['tab'],

    searchOptionsRequest: null,
    searchOptionsRequest: null,
    searchOptionsSuccess: ['data'],
    searchOptionsFailure: ['error'],
    searchOnFocus: null,
    searchOnBlur: null,

    systemCheckRequest: ['navigator'],
    systemCheckSuccess: ['data'],
    systemCheckFailure: ['error'],

    showSimpleAlert: ['message'],
    viewAdLink: ['url', 'title'],

    setViewType: ['value'],
    setAdUrl: ['url'],
    setTimeout: ['timeout', 'timeoutAction'],
    setOffline: ['offline'],

    setSupportModalVisible: ['supportModalVisible'],
    setSimpleAlertVisible: ['simpleAlertVisible', 'simpleAlertMessage'],

    openRegionDropdown: null,
    openSortCouponsDropdown: null,
    openSortListingsDropdown: null,
    openCategoryDropdown: null,
    openRefineDropdown: null,
    closeDropdown: ['type']
})

export const CoreTypes = Types
export default Creators
