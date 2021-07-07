function initMap() {

    let latitude = document.getElementById('coordinatesLat').dataset.lat
    let longitude = document.getElementById('coordinatesLng').dataset.lng

    console.log(latitude, longitude)

    const myMap = new google.maps.Map(
        document.querySelector('#userAddress'),
        { zoom: 12, center: { lat: latitude, lng: longitude } }
    )
    
    getPlacesData(myMap)
}


function getPlacesData(myMap) {

    axios
        .get('/api/user')
        .then(user => {
            printMarker(user.data.address.location, myMap)
            console.log('L A T    L N G -------', user.data.address.location.coordinates)
        })
        .catch(err => console.log(err))
}


function printMarker(info, myMap) {

    const { coordinates } = info

    new google.maps.Marker({
        map: myMap,
        position: { lat: coordinates[0], lng: coordinates[1] }
    })
}