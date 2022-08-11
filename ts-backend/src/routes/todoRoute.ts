import { Router, Request, Response } from 'express'
import { checkJwt } from '../middleware/checkJwt'
import { createTodo } from '../views/todo_views/createTodo'
import { deleteTodo } from '../views/todo_views/deleteTodo'
import { getAllTodo } from '../views/todo_views/getAllTodo'
import { getTodo } from '../views/todo_views/getTodo'
import { updateTodo } from '../views/todo_views/updateTodo'

const router = Router()

// GET - get all todo data
router.get('/', [checkJwt], async (req: Request, res: Response) => {
    await getAllTodo(req, res)
})

// GET - get the selected record from the todo table.
router.get('/:id', [checkJwt], async (req: Request, res: Response) => {
    await getTodo(req, res)
})

// POST - Save the todo data into todo table
router.post('/create-todo', [checkJwt], async (req: Request, res: Response) => {
    await createTodo(req, res)
})

// PUT - Update the selected todo.
router.put('/update-todo/:id', [checkJwt], async (req: Request, res: Response) => {
    await updateTodo(req, res)
})

//DELETE - Delete the selected todo.
router.delete('/delete-todo/:id', [checkJwt], async (req: Request, res: Response) => {
    await deleteTodo(req, res)
})

export default router