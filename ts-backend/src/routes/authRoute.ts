import { Router, Request, Response } from 'express'
import { checkJwt } from '../middleware/checkJwt'
import { logOut } from '../views/user_views/logOut'
import { signIn } from '../views/user_views/signIn'
import { signUp } from '../views/user_views/signUp'

const authRoute = Router()

authRoute.post('/login', async (req: Request, res: Response) => {
    await signIn(req, res)
})

authRoute.post('/signup', async (req: Request, res: Response) => {
    await signUp(req, res)
})

authRoute.get('/logout/:id', async (req: Request, res: Response) => {
    await logOut(req, res)
})

export default authRoute