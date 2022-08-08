import { Request, Response } from 'express'
import db from '../../../models'

export const getTodo = async (req: Request, res: Response) => {
    try {
        const  { id='' } = req.params
    
        const query = await db.Todo.findOne({
            where: {
                id: id
            },
            include: db.User
        })
        res.status(200).json({
            'message': 'Data fetched successfully',
            'data': query,
            'status': 200
        })
    } catch (error: any) {
        return res.status(500).json({
            'message': error?.message,
            'data': {},
            'code': 500, 
        })
    }
}