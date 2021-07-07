const router = require('express').Router()

const CDNupload = require('../config/cloudinary.config');
const User = require('../models/User.model')
const Product = require('../models/Product.model');
const { response } = require('express');

//new product
router.get('/new', (req, res) => {

        User
            .find()
            .select('username')
            .then(user => {
                console.log(user)
                res.render('products/add-product', {user})
            })
            .catch(err => console.log(err))

})

router.post('/new', CDNupload.single('imagen'), (req, res) => {
   
    const { name, color, status, description, owner,location } = req.body
    const { path } = req.file

    Product
        .create({ name, color, status, description, owner, imagen: path, location })
        .then(response => res.redirect(`/product/details/${response._id}`))
        .catch(err => console.log(err))
})

//products list
router.get('/list', (req, res) => {
    
    Product
        .find()
        .then(products => res.render('products/products-list', { products}))
        .catch(err => console.log(err))
})


//product details
router.get('/details/:id', (req, res) => {

    const { id } = req.params

    Product
        .findById(id)
        .populate('user')
        .then(product => {
            console.log(product)
            res.render('products/product-details', product)
        })
        .catch(err => console.log(err))
})



//edit product
router.get('/edit/:id', (req, res) => {
    const { id } = req.params

    Product
        .findById(id)
        .then(product => {
            console.log(id)
            res.render('products/product-edit', product)})
        .catch(err => console.log(err))
})

router.post('/edit', (req, res) => {
    const { id } = req.params
    const { name, color, status, description, owner, image, location } = req.body

    Product
        .findByIdAndUpdate(id, { name, color, status, description, owner, image, location })
        .then(() => res.redirect('/product/details'))
        .catch(err => console.log(err))
})

//delete product 

router.get('/delete/:id', (req, res) => {
    const { id } =req.params

    Product
        .findByIdAndDelete(id)
        .then(() => res.redirect('/product/list'))
        .catch(err => console.log(err))
    })


module.exports = router
