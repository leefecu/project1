
import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    reviewsRequest: ['id', 'navigator'],
    reviewsSuccess: ['data'],
    reviewsFailure: ['error'],
	submitReviewRequest: ['rating', 'comment', 'reviewType', 'page'],
    submitReviewListSuccess: ['data', 'newTotal'],
	submitReviewSuccess: ['data'],
	submitReviewFailure: ['error'],
    setLoginModalForReviewVisible: ['needLoginModalForReviewVisible'],
    setWriteReviewModalVisible: ['writeReviewVisible'],
    setSuccessModalVisible: ['successModalVisible'],
    setReviewRefreshing: ['refreshing'],
    resetReviews: null
})

export const ReviewTypes = Types

export default Creators
