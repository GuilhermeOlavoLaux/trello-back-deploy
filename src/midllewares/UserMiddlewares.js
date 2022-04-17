
const { Request, Response, NextFunction } = require('express')

const UserController = require('../controller/user/UserController')

const { JwtPayload, verify } = require('jsonwebtoken')


class UserMiddlewares {
  async validateUserAndPassword(request, response, next) {
    try {
      const { userName, password } = request.body

      if (!userName || !password) {
        return response.status(400).json({ error: 'Preencha todos os campos 👩🏻‍💻' })
      } else {
        return next()
      }
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async tokenHandler(request, response) {
    try {
      const { userName, password } = request.body
      const userController = new UserController()

      const token = await userController.login(userName, password)

      return response.json(token)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
  async auth(request, response, next) {
    const authToken = request.headers.authorization


    if (!authToken) {
      return response.status(401).json({ message: 'Token is missing' })
    }

    const [, token] = authToken.split(' ')

    try {
      const tokenPayload = verify(
        token,
        '1a7052a6-c711-4c8c-9107-cdc76700b630'
      )

      request.user = tokenPayload

      return next()
    } catch (error) {
      return response.status(401).json({
        message: 'Token invalid'
      })
    }
  }
}


module.exports = UserMiddlewares

