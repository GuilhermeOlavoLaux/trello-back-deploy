const express = require('express')

const UserMiddlewares = require('./src/midllewares/UserMiddlewares')
const TasksController = require('./src/controller/tasks/TasksController')

const router = express.Router()

const tasksController = new TasksController()

const userMiddlewares = new UserMiddlewares()

router.get('/tasks', userMiddlewares.auth, tasksController.getTasks)

router.put('/deleteTask/:taskId', userMiddlewares.auth, tasksController.deleteTask)

router.put('/addTask', userMiddlewares.auth, tasksController.addTask)

router.put('/updateTask', userMiddlewares.auth, tasksController.updateTask)


module.exports = router

