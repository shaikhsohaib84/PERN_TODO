import {Request, Response} from 'express'
import db from '../../../models'

export const getAllTodo = async (req: Request, res: Response) => {
    try{
        const query = await db.User.findOne({
            where: {
                id: 1
            },
            include: [{
                all: true, nested: true
            }]
        })
        
        res.status(200).json({
            'message': 'Data fetched successfully',
            'data': query,
            'status': 200
        })
    } catch(error: any){
        return res.status(500).json({
            'message': error?.message,
            'code': 500, 
            'data': []
        })
    }
}