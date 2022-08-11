import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

require('dotenv').config()

export const checkJwt = async (req: Request | any, res: Response, next: NextFunction) => {
    // Get the JWT token from header
    let jwtPayload: any;
    const secretKey = process.env.SECRET_KEY || ''
    const isSecure = req.app.get('env') != 'development'
    // const token = String(req.headers["authorization"]).split(" ")[1]
    const cookies = req?.headers?.cookie;
    const token = cookies?.split("=")[1]
    

    if (!token || !secretKey) {
        return res.status(404).json({
            message: 'Token not found'
        })
    }

    try {
        jwtPayload = await jwt.verify(token, secretKey)
        res.locals.jwtPayload = jwtPayload

        const { id, iat, exp } = jwtPayload
        const newJwtToken = jwt.sign({ id: id }, secretKey, {
            expiresIn: "1hr"
        })
        // res.setHeader("token", newJwtToken)
        res.cookie(String(id), newJwtToken, {
            path: '/',
            httpOnly: true,
            signed: isSecure,
            secure: true,
            sameSite: 'lax'
        })
        req.id = id
        // Call the next middleware / view.
        next()
    } catch (error: any) {
        return res.status(401).json({
            'message': error?.message
        })
    }
}   