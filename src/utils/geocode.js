const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VtYW5tYW5kYWxhcHUiLCJhIjoiY2p4em1lejhhMDRqbjNjcGo4dDBjeGlnYiJ9.skOPm9FjbFWhn8TNFxan3Q&limit=1'
    
    request({ url, json: true }, (error, { body }) => {
        //console.log('geocode error: ' + error)
        //console.log('geocode body: ' + body)       
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message) {
            callback(body.message, undefined)       
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode