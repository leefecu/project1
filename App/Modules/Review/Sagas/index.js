
import { call, put, select, take } from 'redux-saga/effects'
import { map, find, update } from 'lodash'
import ReviewActions from '../Actions'
import * as ReviewConstants from '../Constants'
import * as ReviewSelectors from '../Selectors'
import CoreActions from '../../Core/Actions'
import * as CoreConstants from '../../Core/Constants'
import CouponsActions from '../../Coupons/Actions'
import * as CouponsSelectors from '../../Coupons/Selectors'
import UserActions from '../../User/Actions'
import * as UserSelectors from '../../User/Selectors'
import {NETWORK_ERROR, TIMEOUT_ERROR} from '../../Core/Constants'
import * as CoreSaga from '../../Core/Sagas'

export function * fetchReviews (api, {id, navigator}) {
    try {

        const response = yield call(api.getReviews, id)
        
        if( response.ok ){
            yield put(ReviewActions.reviewsSuccess(response.data))
        } else {
            yield put(ReviewActions.reviewsFailure(response.data))    
        }
    } catch(error) {
        yield put(ReviewActions.reviewsFailure(error))
    }
}

export function * submitReviewRequest (api, {rating, comment, reviewType, page}) {

    try {
        
        const authToken = yield select(UserSelectors.getAuthToken)
        const userId = yield select(UserSelectors.getUserId)
        const userProfile = yield select(UserSelectors.getUserProfile)
        const coupon = yield select(CouponsSelectors.getSelectedCoupon)

        if (authToken && userId) {
            const data = {
                rating: rating,
                comment: comment,
                type: reviewType,
                user: {
                    id: userId,
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName
                },
                coupon: {
                    id: coupon._id._str
                }
            }

            
            const response = yield call(api.addReviewComment, authToken, userId, data);
            
            if (response.ok) {
                
                global.firebase.analytics().logEvent(CoreConstants.FB_EVENT.COUPON_WRITE_REVIEW, {
                    couponId: coupon._id._str,
                })
                
                yield put(CouponsActions.setReviewInfo(response.data.newAvg, response.data.newCnt))

                if(page === 'reviewList'){
                    yield put(ReviewActions.submitReviewListSuccess(data, response.data.newCnt && response.data.newCnt))
                } else {
                    yield put(ReviewActions.submitReviewSuccess(data, page))    
                }
                
		        yield put(ReviewActions.setWriteReviewModalVisible(false))
		        yield put(ReviewActions.setSuccessModalVisible(true))

            } else {

                if (response.problem === TIMEOUT_ERROR || response.problem === NETWORK_ERROR) {
                    yield put(CoreActions.setTimeout(true, 'submitReviewRequest'))
                } else {
                    yield put(ReviewActions.submitReviewFailure(response.data))
                }
                
            }
        }

    } catch (error) {
        yield put(ReviewActions.submitReviewFailure(error))
    }
}