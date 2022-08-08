import { Express, Request, Response } from 'express'
import { createTodo } from './views/todo_views/createTodo'
import { deleteTodo } from './views/todo_views/deleteTodo'
import { getAllTodo } from './views/todo_views/getAllTodo'
import { getTodo } from './views/todo_views/getTodo'
import { updateTodo } from './views/todo_views/updateTodo'

export const routes = (
    app: Express
) => {
    // GET - get all todo data
    app.get('/', async (req: Request, res: Response) => {
        await getAllTodo(req, res)
    })

    // GET - get the selected record from the todo table.
    app.get('/todos/:id', async (req, res) => {
        await getTodo(req, res)
    })

    // POST - Save the todo data into todo table
    app.post('/create-todo', async (req, res) => {
        await createTodo(req, res)
    })

    // PUT - Update the selected todo.
    app.put('/update-todo/:id', async (req, res) => {
        await updateTodo(req, res)
    })

    //DELETE - Delete the selected todo.
    app.delete('/delete-todo/:id', async (req, res) => {
        await deleteTodo(req, res)
    })

}