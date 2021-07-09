const router = require('express').Router()
const CDNupload = require('../config/cloudinary.config')
const User = require('../models/User.model')
const Product = require('../models/Product.model')

const { checkLoggedUser, checkRoles } = require('./../middleware')
const { isAdmin, isUser } =require('./../utils/index')


//new product
router.get('/new', checkLoggedUser, (req, res) => res.render('products/add-product'))


router.post('/new', CDNupload.single('imagen'), (req, res) => {

    const { name, status, description } = req.body
    let path
    if (!req.file) {
        path = undefined
    } else {
        path = req.file.path
    }
    
    if (!name.length || !status.length || !description.length || !path) {
        res.render('products/add-product', { errorMessage: 'Fill the blanks' })
        return
    }

    Product
        .create({ name, status, description, owner: req.session.currentUser._id, imagen: path })
        .then(product => res.render('products/product-details', product))
        .catch(err => console.log(err))
})


//products list
router.get('/list', (req, res) => {

    const isAdmin = req.session.currentUser?.role === 'ADMIN'

    Product
        .find()
        .then(products => res.render('products/products-list', { products, isAdmin }))
        .catch(err => console.log(err))
})


//product details
router.get('/details/:id', (req, res) => {

    const { id } = req.params

    Product
        .findById(id)
        .populate('owner')
        .then(product => res.render('products/product-details',  product ))
        .catch(err => console.log(err))
})


//edit product
router.get('/edit/:id', (req, res) => {

    const { id } = req.params

    Product
        .findById(id)
        .then(product => res.render('products/product-edit', product))
        .catch(err => console.log(err))
})


router.post('/edit/:id', (req, res) => {
    
    const { id } = req.params
    const { name, status, description, owner, image} = req.body

    Product
        .findByIdAndUpdate(id, { name, status, description, owner, image})
        .then(() => res.redirect('/product/list'))
        .catch(err => console.log(err))
})


//category products


//delete product 
router.get('/delete/:id', (req, res) => {
    const { id } = req.params

    Product
        .findByIdAndDelete(id)
        .then(() => res.redirect('/product/list'))
        .catch(err => console.log(err))
})


module.exports = router
