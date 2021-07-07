function initMap() {

    const myMap = new google.maps.Map(
        document.querySelector('#userAddress'),
        { zoom: 14, center: { lat: 40.4415188, lng:-3.671316 } }
    )

    getPlacesData(myMap)
}


function getPlacesData(myMap) {

    axios
        .get('/api/users')
        .then(response => response.data.forEach(elm => printMarker(elm.address.location, myMap)))
        .catch(err => console.log(err))
}



// function printMarker(location, myMap) {

//     const { coordinates } = location

//     new google.maps.Marker({
//         map: myMap,
//         position: { lat: coordinates[0], lng: coordinates[1] }
//     })
// }