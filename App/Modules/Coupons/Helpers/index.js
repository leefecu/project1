import cloudinary from 'cloudinary-core'
import Config from 'react-native-config'
import moment from 'moment'
import { findLast, map } from 'lodash'

// Is the current user logged in?
export const getImageSource = (image, couponId, imageSize) => {
    const cl = cloudinary.Cloudinary.new({
        api_key: Config.CLOUDINARY_API_KEY,
        cloud_name: Config.CLOUDINARY_CLOUD_NAME,
        secure_distribution: true
    })

    if (image.indexOf('https') !== -1) {
        return cl.url(image, {
            width: imageSize.width,
            height: imageSize.height,
            crop: 'scale',
            type: 'fetch',
            fetch_format: 'auto'
        })
    } else {
        return cl.url('coupon/' + couponId + '/' + image, {
            width: imageSize.width,
            height: imageSize.height,
            crop: 'scale'
        }).replace('http://', 'https://')
    }

}

export const canIUseThisCoupon = (usedCoupons, couponId) => {
    var found = null
    if (usedCoupons && usedCoupons.length > 0){
        found = findLast(usedCoupons, (item)=> {
            return item.couponId._str === couponId
        })
        if (!found) return true

        var sameMonth = moment(found.timestamp).isSame(new Date().getTime(), 'month');
        var sameYear = moment(found.timestamp).isSame(new Date().getTime(), 'year');

        if (sameMonth && sameYear){
            return false
        }else{
            return true
        }
    }

    return true
}

export const isExpired = (coupon) => {

    if (coupon.limit){
        if (parseInt(coupon.redeemCount) >= parseInt(coupon.limit)){
            return true
        }
    }

    if (coupon.endDate){
        var endDate = moment(coupon.endDate)
        var now = moment()
        if (now > endDate) {
           return true
        }
    }

    return false
}


function deg2rad(deg) {
    return deg * (Math.PI/180)
}