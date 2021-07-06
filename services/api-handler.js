const axios = require('axios')

class CoordinatesApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/geocode'
        })
    }
    
    
    getCoordinates = address => this.axiosApp.get(`/json?address=${address}&key=AIzaSyDb3CIAS1ZXY13tYIkYJZ1-RvOLaB0qb8g`)

}

//address = document.querySelector('#street')
module.exports = CoordinatesApiHandler
