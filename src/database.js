const Error = require("mongoose")
const mongoose = require('mongoose')

function connectToDataBase() {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  })

  const db = mongoose.connection
  db.on('error', (error) => console.log(error))
  db.once('open', () => console.log('Connected do DB 💽 ✅'))
}

module.exports = connectToDataBase
