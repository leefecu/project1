import cloudinary from 'cloudinary-core'
import Config from 'react-native-config'
import moment from 'moment'
import { findLast, find } from 'lodash'

import * as ListingConstants from '../Constants'

// Is the current user logged in?
export const getImageSource = (src, width, height, crop = 'fill') => {
    let imageUrl
    if (src.indexOf('http') !== -1) {
        imageUrl = $.cloudinary.url(src, {
            width,
            height,
            crop: crop,
            type: 'fetch',
            fetch_format: 'auto',
            quality: 'auto'
        })
    } else {
        imageUrl = $.cloudinary.url(src, {
            width,
            height,
            crop: crop,
            fetch_format: 'auto',
            quality: 'auto'
        })
    }

    if (imageUrl.indexOf('jpg') === -1) {
        imageUrl += '.jpg'
    }

    return imageUrl
}


export const getLabelNameByPlanScore = (score) => {

    if (score >= ListingConstants.MIN_SCORE_SPECIAL_SALE){
        return ListingConstants.LABLE_SPECIAL_SALE
    }

    if (score >= ListingConstants.MIN_SCORE_EXCLUSIVE){
        return ListingConstants.LABLE_EXCLUSIVE
    }

    if (score >= ListingConstants.MIN_SCORE_AWESOME){
        return ListingConstants.LABLE_AWESOME
    }

    if (score >= ListingConstants.MIN_SCORE_FEATURED ){
        return ListingConstants.LABLE_FEATURED
    }

    return null
}

export const getRefineStatus = (refine) => {
    const selectedItem = find(refine, {'selected': true})

    if(selectedItem){

        if(selectedItem.type !== 'location' && selectedItem.type !== 'sortby'){
            return true
        }else{
            return false
        }

    }else{

        return false
    }

}

export const getListingProps = (listing) => {
    if(listing && listing.advertising && listing.advertising === true){
        return {
            advertising: listing.advertising,
            cardTypeImage: listing.cardTypeImage,
            description: listing.description,
            linkUrl: listing.linkUrl,
            listTypeImage: listing.listTypeImage
        }
    }

    return {
        listingId: listing._id,
        cardViewMainImage: listing.cardViewMainImage,
        fuelType: listing.fuelType,
        hasCoupon: listing.exclusiveCoupons && listing.exclusiveCoupons.length > 0,
        images: listing.images,
        listViewMainImage: listing.listViewMainImage,
        make: listing.make,
        model: listing.model,
        odometer: listing.odometer,
        originalPrice: listing.originalPrice,
        price: Number(listing.price),
        plan: listing.plan,
        planScore: listing.planScore,
        regions: listing.regions,
        transmission: listing.transmission,
        trim: listing.trim,
        upcoming: listing.upcoming,
        viewCount: listing.viewCount,
        year: listing.year,
        advertising: listing.advertising
    }
}

export const diffListings = (currentListings, newListings) => {
    const diff = find(currentListings, (currentListing, index) => {
        return currentListing._id !== newListings[index]._id
    })
    return diff !== undefined
}