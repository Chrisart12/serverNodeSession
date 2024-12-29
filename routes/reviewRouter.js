const reviewController = require('../controllers/reviewController')
const router = require('express').Router()
const { authorized } = require('../service/authorisation') // Middleware permettant de vérifier si l'utilisateur est connecté


// Review Url controller
router.post('/addReview', reviewController.addReview)
router.get('/allReviews', authorized, reviewController.getAllReviews)

// router.get('/:id', productController.getOneProduct)
// router.put('/:id', productController.updateProduct)
router.delete('/:id', reviewController.deleteReview)


module.exports = router