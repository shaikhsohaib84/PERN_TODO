import { Request, Response } from "express"
import db from "../../../models"

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req?.params
        const { title, description } = req?.body


        const query = await db.Todo.update({
            title: title,
            description: description
        }, { 
            where: { 
                id: id 
            } 
        });

        res.status(200).json({
            'message': 'Data updated successfully',
            'status': 200
        })
    } catch (error: any) {
        return res.status(500).json({
            'message': error?.message,
            'status': 500,
        })
    }
}