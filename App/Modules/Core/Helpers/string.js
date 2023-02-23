import moment from 'moment'

RegExp.escape = function(s) {
    return s.replace(/[-\/\\^$*+?()|[\]{}]/g, '\\$&')
}

export const ensureString = (text) => {
    if (typeof text === 'number' && (text % 1 === 0)){
        text += ''
    }
    return text
}

export const splitByWord = (string) => {
    return RegExp.escape(string).trim().split(/[ \-\:]+/)
}

export const buildRegExp = (searchText) => {
    var parts = RegExp.escape(searchText).trim().split(/[ \-\:]+/)
        return "(" + parts.join('|') + ")"
}

export const titleCase= (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toTitleCase = (str) => {
    if (!str) return null
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export const xmlToJson = (xml) => {

    // Create the return object
    var obj = {}

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {}
            for (var j = 0 ; j < xml.attributes.length ; j++) {
                var attribute = xml.attributes.item(j)
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0 ; i < xml.childNodes.length ; i++) {
            var item = xml.childNodes.item(i)
            var nodeName = item.nodeName
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item)
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName]
                    obj[nodeName] = []
                    obj[nodeName].push(old)
                }
                obj[nodeName].push(xmlToJson(item))
            }
        }
    }
    return obj
}

export const getWebsiteUrl = (website) => {
    if (website.indexOf('http') !== -1) {
        return website
    } else {
        return 'http://' + website
    }
}

export const dateConvert = (unix, format) => {
    if (unix.length > 10) {
        unix = unix.slice(0, 10)
    }
    format = format || 'MMM YYYY'
    return moment.unix(unix).format(format)
}
