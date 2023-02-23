import {
    Linking,
    Dimensions, 
    Platform, 
    PixelRatio
} from 'react-native'

import {map} from 'lodash'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const arrayToUrlParms = (arr) => {
    let out = []
    for (key in arr) {
        if (arr[key] === undefined || arr[key] === null) {
            out.push(key + '=')
        } else {
            out.push(key + '=' + encodeURIComponent(arr[key]))
        }
    }

    return out.join('&')
}

export const getAddress = (address) => {
    let addressToken = address.split(',')
    if (addressToken.length > 2) {
        return addressToken[0]+', '+addressToken[1].replace(/\s/g,'').trim()
    } else if (address.length === 2) {
        return false
    }
}

export const getSuburb = (address) => {
    let addressToken = address.split(',')
    if (addressToken.length > 2) {
        return addressToken[1].replace(/\s/g,'').trim()
    } else if (address.length === 2) {
        return false
    }
}

export const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
    var R = 6371
    var dLat = deg2rad(lat2-lat1)
    var dLon = deg2rad(lon2-lon1)
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    var d = R * c
    return d
}

export const handleClick = (url) => {
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log('Don\'t know how to open URI: ' + url);
        }
    })
}

export const validateEmail = (email) => {
    if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/.test(email)) {
        return true
    }
    return false
}

export const shortcodeParser = (item) => {
    if (typeof item !== 'string') return item

    if (item.indexOf(`[link`) > -1){
        let naked = item.split(/[\[\]]+/)
        let url = naked[1].split(" ")[1]
        let text = naked[2]
        return {
            url,
            text
        }
    } else {
        return {
            url: null,
            text: item
        }
    }
}

export const versionSplit = (version) => {
    if (version == undefined || ! version) return []
    let tokens = version.split('.')
    if (tokens.length === 2 && tokens[1].length ===2 && tokens[1][0] === '0') {
        tokens[2] = tokens[1][1]
        tokens[1] = tokens[1][0]
    }

    return map(tokens, (token) => parseInt(token))
}

export const requireUpdate = (currentVersion, minimumVersion) => {
    if (currentVersion.length !== minimumVersion.length) {
        return true
    }
    for (var i = 0 ; i < currentVersion.length ; i++) {
        if (currentVersion[i] < minimumVersion[i]) {
            return true
        }
    }
    return false
}

// returns a promise to resolve after the given number of milliseconds
export const waitMinimumTime = (time) => {
    var timeout,
        promise

    promise = new Promise((resolve, reject) => {
        timeout = setTimeout(() => {
            resolve()
        }, time)
    })

    return {
        promise,
        cancel: () => {
            clearTimeout(timeout)
        }
    }
}

export const normalize = (size) => {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
    }
}
