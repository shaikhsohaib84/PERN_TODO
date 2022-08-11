import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import db from '../../../models'
import { validUser } from './validUser'
require('dotenv').config()

export const signIn = async (req: Request, res: Response) => {
    try {
        const secretKey = process.env.SECRET_KEY || ''
        const isSecure = req.app.get('env') != 'development'
        
        let resPayload = {
            'message': '',
            'payload': {}
        }, status = 200

        const { email, password } = req?.body
        const isValidUser = validUser(email, password)

        if (!isValidUser) {
            throw new Error('In-valid user')
        }

        const searchQuery = await db.User.findOne({
            where: {
                email
            }
        })

        if (searchQuery) {
            const { id } = searchQuery
            const isCorrect = await compare(password, searchQuery?.password)

            if (!isCorrect) {
                resPayload = {
                    ...resPayload,
                    'message': 'Incorrect Password',
                }
                status = 404
            } else {
                const token = jwt.sign({
                    id: id
                },
                    secretKey,
                    {
                        expiresIn: "1hr"
                    }
                )
                
                // res.setHeader("token", token)
                res.cookie(String(id), token, {
                    path: '/',
                    httpOnly: true,
                    signed: isSecure,
                    // secure: true,
                    sameSite: 'lax',
                    expires: new Date(Date.now() + 1000 * 30)
                })

                resPayload = {
                    ...resPayload,
                    'message': 'login successfull',
                    'payload': searchQuery
                }
            }
        } else {
            resPayload = {
                ...resPayload,
                'message': 'User not found',
            }
            status = 500
        }
        return res.status(status).json(resPayload)
    } catch (error: any) {
        return res.status(500).json({
            'message': error?.message
        })
    }
}