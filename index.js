const express = require('express')
const { Sequelize, DataTypes, where } = require('sequelize')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)

// We need to parse JSON coming from requests
app.use(express.json())

// List tasks LISTO
// app.get('/tasks', async (req, res) => {
//   const allTask = await tasks.findAll()
//   res.json({ allTask })
// })

app.get('/tasks', async (req, res) => {
  await tasks.findAll()
  .then(result => res.json(result))
        .catch(error =>{
          res.status(412).json({msg: error.mesaage})
        })
})

// Create task LISTO
// app.post('/tasks', async (req, res) => {
//   const body = req.body
//   console.log(body.task)
//   await tasks.create({task: body.task, done: body.done})
//   res.json(body)
// })

app.post('/tasks', async (req, res) =>{
  const body = req.body
  await tasks.create({task: body.task, done: body.done})
  .then(result => res.json(result))
  .catch(error =>{
    res.status(412).json({msg: error.mesaage})
  })

})

// Show task LISTO
// app.get('/tasks/:id', async (req, res) => {
//   const taskId = req.params.id
//   const task = await tasks.findByPk(taskId)
//   res.send({ task })
// })

app.get('/tasks/:id', async (req, res) =>{
  const taskId = req.params.id
  await tasks.findOne({where: {id:taskId}})
        .then(result => res.json(result))
        .catch(error =>{
          res.status(412).json({msg: error.mesaage})
        })
} )

// Update task
// app.put('/tasks/:id', async (req, res) => {
//   const taskId = req.params.id
//   const body = req.body
//   const task = await tasks.findByPk(taskId)
//   task.update({task:body.task, done: body.done})
//   res.send({ action: 'Updating task', taskId: taskId })
// })

app.put('/tasks/:id', async (req, res) =>{
  const taskId = req.params.id
  const body = req.body
  const task = await tasks.findByPk(taskId)
  await task.update({task:body.task, done: body.done})
  .then(result => res.json(result))
  .catch(error =>{
    res.status(412).json({msg: error.mesaage})
  })
})


// Delete task
// app.delete('/tasks/:id', async (req, res) => {
//   const taskId = req.params.id
//   await tasks.destroy({where: {id:taskId}})
//  res.send({ action: 'Deleting task', taskId: taskId })
// })

app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  await tasks.destroy({where: {id:taskId}})
  .then(result => res.sendStatus(204))
  .catch(error =>{
    res.status(412).json({msg: error.mesaage})
  })
})

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})