const router = require('express').Router()
const bcrypt = require('bcrypt')
const AddressAPI = require('../services/api-handler')
const api = new AddressAPI()


const CDNupload = require('../config/cloudinary.config');
const User = require("../models/User.model")
const { count } = require('../models/User.model')


// Signup
router.get('/signup', (req, res) => res.render('auth/signup'))


router.post('/signup', CDNupload.single('profileImg'), (req, res) => {

    // API address
    const streetSearch = req.body.street
    let lat, lng

    api.getCoordinates(streetSearch)
        .then(response => {
            if(!response) return
            lat = response.data.results[0].geometry.location.lat
            lng = response.data.results[0].geometry.location.lng
        })
        .then(() => {

            const { username, firstName, lastName, pwd, email, phoneNumber, street, zipCode, city, country } = req.body

            let path
            if (!req.file) {
               path = undefined
            } else {
                path = req.file.path
            }
            
            const location = {
                type: 'Point',
                coordinates: [lat, lng]
            }

            const address = { street, zipCode, city, country, location }

            if (!username.length || !firstName.length || !lastName.length || !pwd.length || !email.length || !phoneNumber.length || !street.length || !zipCode.length || !city.length || !country.length || !path ) {
                res.render('auth/signup', { errorMessage: 'Fill the blanks' })
                return
            }

            if (!pwd.match(/[0-9]/) || pwd.length < 2) {
                res.render('auth/signup', { errorMessage: 'Password shouls contain one number and two characters' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .findOne({ username })
                .then(user => {

                    if (user) {
                        res.render('auth/signup', { errorMessage: 'User already exists' })
                        return
                    }
                })

            User
                .create({ username, firstName, lastName, profileImg: path, address, pwd: hashPass, email, phoneNumber })
                .then(user => res.render('auth/login', user))
                .catch(err => console.log(err))
        })
})


//Login
router.get('/login', (req, res) => res.render('auth/login'))


router.post('/login', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login', { errorMessage: 'User does not exits' })
                return
            }

            if (bcrypt.compareSync(pwd, user.pwd) === false) {
                res.render('auth/login', { errorMessage: 'Wrong password, try again' })
                return
            }

            req.session.currentUser = user   
            res.redirect('/user/profile')
        })
        .catch(err => console.log(err))
})


//Logout
router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')))


module.exports = router