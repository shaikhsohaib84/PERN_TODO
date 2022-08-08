 const express = require('express')
 const cors = require('cors')
 const app = express()
 
 const { 
    getAllTodos, 
    createTodo, 
    getTodoById,
    updateTodoById,
    deleteToDoByID,
    bulkUpdateToDoByID
 } = require('./queries')

//  MIDDLEWARE
//  app.use(cors({
//   origin: ['http://localhost:3000']
//  }))
app.use(cors())

 // json() is a built-in middleware function in Express. 
 // This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser
 app.use(express.json())

 // ROUTES

 // GET - get all the data from todo table
 app.get('/', async (req, res) => {
  await getAllTodos(req, res)
 })

 // POST - Save the todo data into todo table
 app.post('/create-todo', async (req, res) => {
   await createTodo(req, res)
 })
 
 // GET - get the selected record from the todo table.
 app.get('/todos/:id', async (req, res) => {
   await getTodoById(req, res)
 })

 // PUT - Update the selected todo.
 app.put('/update-todo/:id', async (req, res) => {
   await updateTodoById(req, res)
 })

 // PUT - Bulk data update for todo.
 app.put('/bulk-update-todo/', async (req, res) => {
  await bulkUpdateToDoByID(req, res)
 })


 //DELETE - Delete the selected todo.
 app.delete('/delete-todo/:id', async(req, res) => {
   await deleteToDoByID(req, res)
 })

 app.listen(5000, ()=> {
    console.log(`express server has started!`);
 }) 