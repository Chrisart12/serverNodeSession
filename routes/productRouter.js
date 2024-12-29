const productController = require('../controllers/productController')
const router = require('express').Router()

const { authorized } = require('../service/authorisation') // Middleware permettant de vérifier si l'utilisateur est connecté

// One to many
router.get('/getProductReviews/:id', productController.getProductReviews)

router.post('/addProduct',  productController.addProduct)
router.get('/allProducts', authorized, productController.getAllProducts)
router.get('/published', productController.getPublishedProduct)
router.get('/:id', productController.getOneProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router