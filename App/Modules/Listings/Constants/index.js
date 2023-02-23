export const STATUS_DRAFT = 'DRAFT'
export const STATUS_PENDING = 'PENDING'
export const STATUS_ACTIVE = 'ACTIVE'
export const STATUS_INACTIVE = 'INACTIVE'
export const STATUS_EXPIRED = 'EXPIRED'
export const STATUS_SOLD = 'SOLD'
export const STATUS_REJECTED = 'REJECTED'
export const STATUS_DELETED = 'DELETED'

export const STOCK_TYPE_CURRENT = 'current'
export const STOCK_TYPE_UPCOMING = 'upcoming'
export const STOCK_TYPE_SOLD = 'sold'

export const SORT_BY_FEATURED = 'featured'
export const SORT_BY_LATEST = 'latest'
export const SORT_BY_RELEVANCE = 'relevance'
export const SORT_BY_LOWEST_PRICE = 'lowestPrice'
export const SORT_BY_HIGHEST_PRICE = 'relevance'
export const SORT_BY_OLDEST_VEHICLES = 'oldestVehicles'
export const SORT_BY_NEWEST_VEHICLES = 'newestVehicles'
export const SORT_BY_LOWEST_MILEAGE = 'lowestMileage'
export const SORT_BY_HIGHEST_MILEAGE = 'highestMileage'


export const MATCH_ALL_QUERY = {"match_all": {}}

export const DEFAULT_SIDEBAR_SEARCH_OPTION = {
    model: null,
    make: null,
    withCouponOnly: false,
    price: {
        min: null,
        max: null
    },
    year: {
        min: null,
        max: null
    },
    transmission: null,
    bodyType:null,
    odometer: {
        min: null,
        max: null
    },
    engineSize: {
        min: null,
        max: null
    },
    doors: {
        min: null,
        max: null
    },
    fuelType: null,
    keywords: null,
    listingType: null
}

export const DEFAULT_REFINE_OPTIONS = {
    'make': {idx:1, type: 'make', selected: false, active: true }
    , 'model' :{idx:2, type: 'model', selected: false, active: false }
    , 'price' :{idx:3, type: 'price', selected: false, active: true }
    , 'year' :{idx:4, type: 'year', selected: false, active: true }
    , 'odometer' :{idx:5, type: 'odometer', selected: false, active: true }
    , 'transmission' :{idx:6, type: 'transmission', selected: false, active: true }
    , 'engineSize' :{idx:7, type: 'engineSize', selected: false, active: true }
    , 'bodyType' :{idx:8, type: 'bodyType', selected: false, active: true }
    , 'fuelType' :{idx:9, type: 'fuelType', selected: false, active: true }
    , 'doors' :{idx:10, type: 'doors', selected: false, active: true }
    , 'listingType' :{idx:11, type: 'listingType', selected: false, active: true }
    , 'location' :{idx:12, type: 'location', selected: false, active: true }
    , 'sortby' :{idx:13, type: 'sortby', selected: false, active: true }
    , 'view' :{idx:14, type: 'view', value: 'list'}
}

export const LABLE_EXCLUSIVE = 'exclusive'
export const LABLE_AWESOME = 'awesome'
export const LABLE_FEATURED = 'featured'
export const LABLE_SPECIAL_SALE = 'special'
export const LABEL_UPCOMING = 'upcoming'

export const MIN_SCORE_EXCLUSIVE = 170
export const MIN_SCORE_AWESOME = 150
export const MIN_SCORE_FEATURED = 70
export const MIN_SCORE_SPECIAL_SALE = 999

export const LISTING_REFINE = {
    'make': {label : 'Make', selectType: 'single'},
    'model' : {label : 'Model', selectType: 'single'},
    'price' : {label : 'Price', selectType: 'multi'},
    'year' : {label : 'Year', selectType: 'multi'},
    'odometer' : {label : 'Odometer', selectType: 'multi'},
    'transmission' : {label : 'Transmission', selectType: 'single'},
    'engineSize' : {label : 'Engine Size', selectType: 'multi'},
    'bodyType' : {label : 'Body Type', selectType: 'single'},
    'fuelType' : {label : 'Fuel Type', selectType: 'single'},
    'doors' : {label : 'Doors', selectType: 'multi'},
    'listingType' : {label : 'Seller Type', selectType: 'single'},
    'location' : {label : 'Location', selectType: 'single'},
    'sortby' : {label : 'Sort by', selectType: 'single'},
    'upcoming' : {label : 'Upcoming'},
    'view' : { label : 'View' }
}

export const LIST_TYPE_CARD = 'card'
export const LIST_TYPE_LIST = 'list'
