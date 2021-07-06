const router = require('express').Router()
const bcrypt = require('bcrypt')
const AddressAPI = require('../services/api-handler')
const api = new AddressAPI()



const User = require("../models/User.model")


// Signup
router.get('/signup', (req, res) => res.render('auth/signup'))


router.post('/signup', (req, res) => {
    const { username, firstName, lastName, profileImg, address, lat, lng, pwd, email, phoneNumber } = req.body
    
    api
        .getCoordinates()
        .then(response => console.log(response.data.results[0].geometry.location))

 
    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(pwd, salt)

    User
        .create({ username, firstName, lastName, profileImg, address, location, pwd: hashPass, email, phoneNumber })
        .then(() => res.send(req.body)) // redirect profile page
        .catch(err => console.log(err))
})

//Login
router.get('/login', (req, res) => res.render('auth/login'))

router.post('/login', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(owner => {
            req.session.currentUser = owner
            res.send(owner)   //redirect profile page
        })
        .catch(err => console.log(err))
})

//Logout

router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')))

module.exports = router