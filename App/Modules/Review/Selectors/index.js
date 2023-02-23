import { createSelector } from 'reselect'

export const getInitialLoading = state => state.review.initialLoading

export const getLoading = state => state.review.loading

export const getRefreshing = state => state.review.refreshing

export const getFetching = state => state.review.fetching

export const getReviews = state => state.review.reviews

export const getTotal = state => state.review.total

export const getNeedLoginModalForReviewVisible = state => state.review.needLoginModalForReviewVisible

export const getWriteReviewVisible = state => state.review.writeReviewVisible

export const getSuccessModalVisible = state => state.review.successModalVisible