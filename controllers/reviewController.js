const db = require('../models')

// Model
const Review = db.reviews

// Function
const addReview = async(req, res) => {
    let data = {
        rating: req.body.rating,
        description: req.body.description,
        productId: req.body.productId
    }

    const review = await Review.create(data)
    res.status(200).send(review)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllReviews = async(req, res) => {

    // if (!req.session.authorized) {
    //     // return res.status(403).send('vous nete pas connecté')
    //     return res.status(403).json({authorized: false}) //
    // }

    const reviews = await Review.findAll({
        order: [
            ['id', 'DESC'],
        ],
    })

    res.status(200).send(reviews)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getOneReview = async(req, res) => {
    let id = req.params.id
    let review = await Review.findOne({ where: { id: id }})

    res.status(200).send(review)
}

const updateReview = async(req, res) => {
    let id = req.params.id
    const review = await Review.update(req.body, { where: {id: id}})

    res.status(200).send(review)
}

const deleteReview = async(req, res) => {
    let id = req.params.id
    await Review.destroy({ where: { id: id }})

    res.status(200).send('Review is deleted')
}


module.exports = {
    addReview,
    getAllReviews,
    getOneReview,
    updateReview,
    deleteReview
}


