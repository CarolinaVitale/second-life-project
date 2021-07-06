const router = require('express').Router()
const bcrypt = require('bcrypt')
const AddressAPI = require('../services/api-handler')
const api = new AddressAPI()



const User = require("../models/User.model")
const { count } = require('../models/User.model')


// Signup
router.get('/signup', (req, res) => res.render('auth/signup'))


router.post('/signup', (req, res) => {
    
    // API address
    const streetSearch = req.body.street
    let lat, lng

     api.getCoordinates(streetSearch)
        .then(response => {
            lat = response.data.results[0].geometry.location.lat
            lng = response.data.results[0].geometry.location.lng
        })
        .then(() => {        
                    const { username, firstName, lastName, profileImg, pwd, email, phoneNumber, street, zipCode, city, country } = req.body
                
                    const location = {
                        type: 'Point',
                        coordinates: [lat, lng]
                    }
                
                
                    const address = { street, zipCode, city, country, location }
                    

                    const bcryptSalt = 10
                    const salt = bcrypt.genSaltSync(bcryptSalt)
                    const hashPass = bcrypt.hashSync(pwd, salt)
                
                    User
                        .create({ username, firstName, lastName, profileImg, address, pwd: hashPass, email, phoneNumber })
                        .then((user) => res.render('auth/user-profile', user)) 
                        .catch(err => console.log(err))
        })

    })

//Login
router.get('/login', (req, res) => res.render('auth/login'))

router.post('/login', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(owner => {
            req.session.currentUser = owner
            res.render('auth/user-profile', owner)   //redirect profile page
        })
        .catch(err => console.log(err))
})

//Logout

router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')))



module.exports = router