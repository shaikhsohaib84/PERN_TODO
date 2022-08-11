import { hashSync } from 'bcrypt'
import {Request, Response} from 'express'
import db from '../../../models'
import { validUser } from './validUser'

export const signUp = async (req: Request, res: Response) => {
    try {
        let resPayload = {
            'message': '',
            'data': {}
        }
        const { name, email, password } = req?.body
        const isValidUser = validUser(email, password)
        
        if(!isValidUser){
            throw new Error('In-valid user')
        }

        const searchQuery = await db.User.findOne({
            where: {
                email: email
            }
        })

        if (!searchQuery){
            const hashPassword = hashSync(password, 10)
            const createQuery = await db.User.create({
                name, email, password: hashPassword
            })
            
            resPayload = {
                ...resPayload,
                'message': 'User sign-up successfull',
                'data': createQuery
            }
        }else{
            resPayload = {
                ...resPayload,
                'message': 'User email in-use',
                'data': searchQuery
            }
        }
        return res.status(200).json(resPayload)
    } catch (error: any) {
        return res.status(500).json({
            'message': error?.message,
            'data': {},
            'status': 500
        })
    }
}