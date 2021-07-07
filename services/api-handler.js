const axios = require('axios')

class CoordinatesApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/geocode'
        })
    }
    
    getCoordinates = address => this.axiosApp.get(`/json?address=${address}&key=${process.env.APIMAPS}`)
}

module.exports = CoordinatesApiHandler
