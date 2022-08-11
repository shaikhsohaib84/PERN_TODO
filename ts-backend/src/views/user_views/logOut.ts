import { Request, Response, NextFunction } from 'express'

export const logOut = (req: Request, res: Response) => {
  try {
    const {id} = req?.params
    res.clearCookie(id)
    req.cookies[id] = ""
    // res.cookie(id, null, {
    //     path: '/',
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'lax'
    // })
    return res.status(200).json({
        'message': 'logout successfully done'
    })
  } catch (error) {
    return res.status(500).json({
        'message': 'Something went unexpected wrong, not able to log-out'
    })
  }
}
