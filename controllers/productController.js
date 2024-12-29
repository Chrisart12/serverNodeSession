const db = require('../models')


const Product = db.products
const Review = db.reviews

const addProduct = async(req, res) => {
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false 
    }

    const product = await Product.create(info)
    res.status(200).send(product)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllProducts = async(req, res) => {

    // j'ai remplacé cette partie par un middleware dans les routes
    // if (!req.session.authorized) {
    //     // return res.status(403).send('vous nete pas connecté')
    //     return res.status(403).json({authorized: false}) //
    // }

    let products = await Product.findAll({
        order: [
            ['id', 'DESC'],
        ],
        // attributes: [
        //     'title',
        //     'price'
        // ]

    })

    res.status(200).send(products)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getOneProduct = async(req, res) => {
    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})

    res.status(200).send(product)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateProduct = async(req, res) => {
    let id = req.params.id
    const product = await Product.update(req.body, { where: {id: id}})

    res.status(200).send(product)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteProduct = async(req, res) => {
    let id = req.params.id
    await Product.destroy({ where: { id: id }})

    res.status(200).send('Product is deleted')
}

const getPublishedProduct = async(req, res) => {
    let id = req.params.id
    products = await Product.findAll({ where: { published: true }})

    res.status(200).send(products)
}

// /connect one to may relation
const getProductReviews = async(req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            // as: 'review'
        }],
        where: { id: id}
    })
    
    res.status(200).send(data)
}

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews
}