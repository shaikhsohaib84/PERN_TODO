import { Request, Response } from "express";
import db from "../../../models";

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { userId, title, description } = req?.body
        const query = await db.Todo.create({
            UserId: userId,
            title: title,
            description: description
        })
        
        return res.status(200).json({
            'message': 'Todo created successfully',
            'data': query,
            'status': 200
        })
    } catch (error: any) {
        return res.status(500).json({
            'message': error?.message,
            'data': {},
            'status': 500
        })
    }
}