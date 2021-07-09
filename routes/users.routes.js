const router = require('express').Router()
const User = require('./../models/User.model')

 //user profile
router.get('/profile', (req, res) => {
   
    const { _id } = req.session.currentUser

        User
            .findById(_id)
            .then(user => res.render('auth/user-profile', user))
            .catch(err => console.log(err))
})

module.exports = router