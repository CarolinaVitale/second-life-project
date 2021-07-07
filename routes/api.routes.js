const router = require('express').Router()
const User = require('./../models/User.model')


//JSON all users
router.get('/all-users', (req, res) => {

    User
        .find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})


// JSON currrent user
router.get('/user', (req, res) => {

    const { _id } = req.session.currentUser

    User
        .findById(_id)
        .then(user => res.send(user))
})


module.exports = router