const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  tasks: [
    {
      _id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      situation: {
        type: String,
        required: true
      }
    }
  ]
})

module.exports = mongoose.model('Trello', userSchema)


