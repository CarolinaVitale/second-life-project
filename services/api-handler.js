const axios = require('axios')

class CoordinatesApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/geocode'
        })
    }
    
    
    getCoordinates = response => this.axiosApp.get('/json?address=calle+de+puente+la+reina+27&key=AIzaSyDb3CIAS1ZXY13tYIkYJZ1-RvOLaB0qb8g', response)

}

//address = document.querySelector('#street')
module.exports = CoordinatesApiHandler
