const express = require('express')


const UserMiddlewares = require('./src/midllewares/UserMiddlewares')
const UserController = require('./src/controller/tasks/UserController')

const router = express.Router()

const userController = new UserController()

const userMiddlewares = new UserMiddlewares()

router.post('/login', userMiddlewares.validateUserAndPassword, userMiddlewares.tokenHandler)

router.post('/createUser', userController.createUser)

router.delete('/deleteUser', userMiddlewares.auth, userController.deleteUser)

router.put('/updatePassword', userMiddlewares.auth, userController.updatePassword)

router.get('/testeAutenticacao', userMiddlewares.auth, (request, response) => {
  return response.status(200).json('get funcionou ')
})

module.exports = router
