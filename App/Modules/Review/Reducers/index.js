import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {concat, clone, remove} from 'lodash'

import { ReviewTypes } from '../Actions'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    initialLoading: true,
    fetching: false,
    refreshing: false,
    loading: false,
    error: null,
    total: 0,
    reviews: {},
    needLoginModalForReviewVisible:false,
    writeReviewVisible: false,
    successModalVisible: false
})

export const reviewsRequest = (state: Object) => state.merge({ fetching: true, noMoreCoupons: false })

export const reviewsSuccess = (state: Object, {data}: Object) => {
    return state.merge({
        fetching: false,
        refreshing: false,
        loading: false,
        initialLoading: false,
        error: null,
        total: data.length,
        reviews: data
    })
}

export const reviewsFailure = (state: Object, { error }: Object) =>
    state.merge({ 
        fetching: false, 
        refreshing: false, 
        loading: false, 
        initialLoading: false,
        error 
    })

export const submitReviewRequest  = (state: Object ) => 
    state.merge({fetching: true})

export const submitReviewListSuccess  = (state: Object, {data, newTotal}: Object) => {

    let reviews = clone(state.reviews)
    remove(reviews, (review) => review.user.id === data.user.id)

    return state.merge({
        fetching: false, 
        total: newTotal,
        reviews: concat(reviews, data)
    })
}

export const submitReviewSuccess  = (state: Object, {data}: Object) => {
    return state.merge({
        fetching: false
    })  
}
export const submitReviewFailure = (state: Object, { error }: Object) => {
    return state.merge({error})
}

export const setLoginModalForReviewVisible = (state: Object, { needLoginModalForReviewVisible }: Boolean) => {
    return state.merge({ 
                needLoginModalForReviewVisible : needLoginModalForReviewVisible
            })
}

export const setWriteReviewModalVisible = (state: Object, { writeReviewVisible}: Boolean) => {
    return state.merge({ writeReviewVisible : writeReviewVisible })
}
    
export const setSuccessModalVisible = (state: Object, { successModalVisible }: Boolean) => 
    state.merge({ successModalVisible : successModalVisible })    

export const setReviewRefreshing = (state: Object, {refreshing}: Boolean) => 
    state.merge({ refreshing })

export const resetReviews = (state: Object) =>
    state.merge({
        initialLoading: true,
        fetching: false,
        refreshing: false,
        loading: false,
        error: null,
        total: 0,
        reviews: {}
    })
    

export const reducer = createReducer(INITIAL_STATE, {
    [ReviewTypes.REVIEWS_REQUEST]: reviewsRequest,
    [ReviewTypes.REVIEWS_SUCCESS]: reviewsSuccess,
    [ReviewTypes.REVIEWS_FAILURE]: reviewsFailure,
    [ReviewTypes.SUBMIT_REVIEW_REQUEST]: submitReviewRequest,
    [ReviewTypes.SUBMIT_REVIEW_LIST_SUCCESS]: submitReviewListSuccess,
    [ReviewTypes.SUBMIT_REVIEW_SUCCESS]: submitReviewSuccess,
    [ReviewTypes.SUBMIT_REVIEW_FAILURE]: submitReviewFailure,
    [ReviewTypes.SET_LOGIN_MODAL_FOR_REVIEW_VISIBLE]: setLoginModalForReviewVisible,
    [ReviewTypes.SET_WRITE_REVIEW_MODAL_VISIBLE]: setWriteReviewModalVisible,
    [ReviewTypes.SET_SUCCESS_MODAL_VISIBLE]: setSuccessModalVisible,
    [ReviewTypes.RESET_REVIEWS]: resetReviews,
})
