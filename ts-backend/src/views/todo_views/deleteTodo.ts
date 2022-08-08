import { Request, Response } from 'express'
import db from "../../../models"

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req?.params
        
        const query = await db.Todo.destroy({
            where: {
                id: id
            }
        })
    
        return res.status(200).json({
            'message': 'Selected Todo deleted successfully',
            'status': 200,
            'data': query
        })
    } catch (error: any) {
        return res.status(500).json({
            'message': error?.message,
            'status': 500,
            'data': {}
        })
    }
}

