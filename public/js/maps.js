function initMap() {

    const myMap = new google.maps.Map(
        document.querySelector('#userAddress'),
        { zoom: 12, center: { lat: 40.4392890, lng: -3.6952104 } }
    )
    console.log('C O O R D S --------', myMap.data.map.center)
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