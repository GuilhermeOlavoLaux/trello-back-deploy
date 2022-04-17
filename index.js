const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const tasksRoutes = require("./tasksRoutes")
const userRoutes = require("./UserRoutes")

const conectToDatabase = require('./src/database')

const product = require('./product')

conectToDatabase()

const app = express()
const port = process.env.PORT || 3080


app.use(cors())
app.use(express.json())

app.use(tasksRoutes)
app.use(userRoutes)
app.use('/api/product', product)



app.listen(port, () => {
  console.log(`Backend started at http://localhost:${port} ✅`)
})
