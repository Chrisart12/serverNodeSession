const authController = require('../controllers/authController')

const router = require('express').Router()

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/auth', authController.auth)


// router.get('/:id', userController.getOneUser)
// router.put('/:id', userController.updateUser)
// router.delete('/:id', userController.deleteUser)


module.exports = router