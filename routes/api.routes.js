const router = require('express').Router()
const User = require('./../models/User.model')


router.get('/users', (req, res) => {

    User
        .find()
        .then(users => res.json(users))
        console.log('ESTOS SON LOS USUARIOS', users)
        .catch(err => console.log(err))
})


module.exports = router