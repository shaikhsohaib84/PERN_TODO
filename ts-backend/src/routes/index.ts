import { Router, Request, Response } from 'express'
import todoRoute from './todoRoute'
import authRoute from './authRoute'

const route = Router()

route.use('/todo', todoRoute)
route.use('/auth', authRoute)

export default route