

const v4 = require('uuid')

const User = require('../../model/User')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')



class UserController {
  async login(userName, password) {
    try {
      const users = await User.find()

      const user = users.find((user) => user.userName === userName)

      if (user === null || user === undefined) {
        throw ('Este usuário não existe 👨🏻‍💻👩🏻‍💻')
      }
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          {
            user_id: user._id,
            user_login: user.userName
          },
          '1a7052a6-c711-4c8c-9107-cdc76700b630',
          {
            expiresIn: '1h'
          }
        )
        return { token }
      } else {
        throw ('Senha incorreta, tente novamente 👩🏻‍💻')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async createUser(request, response) {
    const { userName, password, tasks } = request.body

    const users = await User.find()

    if (!userName || !password) {
      return response.status(400).json({ error: 'Preencha todos os campos 👨🏻‍💻' })
    }

    let userCreationFlag = false

    users.forEach((user) => {
      if (user.userName === userName) {
        userCreationFlag = true
      }
    })

    if (userCreationFlag) {
      return response.status(400).json({ error: 'Este usuário já existe, tente novamente 👨🏻‍💻' })
    } else {
      const hashedPassword = await bcrypt.hash(request.body.password, 10)
      const task = new User({
        _id: v4(),
        userName: userName,
        password: hashedPassword,
        tasks: tasks
      })
      try {
        await task.save()
        return response.status(201).json({ message: 'Usuário criado com sucesso 👩🏻‍💻' })
      } catch (error) {
        return response.status(400).json({ error: error.message })
      }
    }
  }

  async deleteUser(request, response) {
    try {
      const userToBeDeleted = await User.findById(request.user.user_id)

      if (userToBeDeleted !== undefined) {
        await User.findByIdAndRemove(request.user.user_id)
      } else {
        return response.status(400).json({ message: `Este usuário não existe  👨🏻‍💻` })
      }

      return response.status(200).json({ message: 'Usuário deletado com sucesso  👩🏻‍💻' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async updatePassword(request, response) {
    const { password } = request.body
    try {
      if (!password) {
        return response.status(400).json({ error: 'Informe uma nova senha  👨🏻‍💻' })
      }

      const userToUpdate = await User.findById(request.user.user_id)

      userToUpdate.password = await bcrypt.hash(password, 10)

      await userToUpdate.save()

      return response.status(200).json({ message: 'Usuário atualizado com sucesso 👩🏻‍💻' })
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}

module.exports = UserController