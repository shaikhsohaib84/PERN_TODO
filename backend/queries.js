const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const {
   SOME_THING_WENT_WRONG,
   INTERNAL_SERVER_ERROR_CODE,
   DELETED_SUCCESSFULLY,
   SUCCESS_STATUS_CODE
} = require('./const')

const getAllTodos = async (req, res) => {
   try {
      const query = await pool.query(
         "select * from todo"
      )
      const { rows } = query
      res.status(SUCCESS_STATUS_CODE).json({
         'message': 'Successfully data fetched',
         'payload': rows,
         'status': SUCCESS_STATUS_CODE
      })

   } catch (error) {
      res.status(INTERNAL_SERVER_ERROR_CODE)
         .json({
            'message': SOME_THING_WENT_WRONG,
            'payload': {},
            'status': INTERNAL_SERVER_ERROR_CODE
         })
   }
}

const createTodo = async (req, res) => {
   try {
      const { title, description } = req.body

      if(!title && !description){
         throw new Error('Title and Description required')
      }
      await pool.query('BEGIN')
      const query = await pool.query(
         "insert into todo (title, description) values ($1, $2) returning *",
         [title, description]
      )

      await pool.query('COMMIT')
      res.status(SUCCESS_STATUS_CODE)
         .json({
            'message': "Data inserted successfully",
            'payload': query?.rows || [],
            "status": SUCCESS_STATUS_CODE
         })
   } catch (error) {
      await pool.query('ROLLBACK')
      res.status(INTERNAL_SERVER_ERROR_CODE).json({
         'message': SOME_THING_WENT_WRONG,
         'payload': {},
         'status': INTERNAL_SERVER_ERROR_CODE
      })
   }
}

const getTodoById = async (req, res) => {
   try {
      let payload = {}, status = SUCCESS_STATUS_CODE
      const { id = '0' } = req?.params
      const query = await pool.query(
         "select * from todo where id = $1",
         [parseInt(id)]
      )
      const { rows = {} } = query
      if (Object.keys(rows).length) {
         payload = {
            'message': 'Successfully data fetched',
            'payload': rows,
            'status': status
         }
      } else {
         status = 400
         payload = {
            'message': 'Data not found',
            'payload': rows,
            'status': status
         }
      }
      res.status(status).json(payload)
   } catch (error) {
      res.status(INTERNAL_SERVER_ERROR_CODE).json({
         'message': SOME_THING_WENT_WRONG,
         'payload': [],
         'status': INTERNAL_SERVER_ERROR_CODE
      })
   }
}

const updateTodoById = async (req, res) => {
   try {
      let query
      let { id } = req.params
      const { title = '', description = '' } = req.body

      if (title.length === 0 && description.length === 0) {
         res.status(400).json({
            'message': 'Title and Description not found',
            'status': 400
         })
      }
      await pool.query('BEGIN')
      if (title.length && description.length === 0) {
         query = await pool.query(
            "UPDATE todo SET title = $1 WHERE id = $2",
            [title, id]
         )
      } else if(title.length === 0 && description.length ){
         query = await pool.query(
            "UPDATE todo SET description = $1 WHERE id = $2",
            [description, id]
         )
      } else {
         query = await pool.query(
            "UPDATE todo SET title = $1 , description = $2 WHERE id = $3",
            [title, description, id]
         )
      }
      await pool.query('COMMIT')

      res.status(SUCCESS_STATUS_CODE).json({
         'message': 'Update done successfully',
         'status': SUCCESS_STATUS_CODE
      })
   } catch (error) {
      await pool.query('ROLLBACK')
      res.status(INTERNAL_SERVER_ERROR_CODE).json({
         'message': SOME_THING_WENT_WRONG,
         'status': INTERNAL_SERVER_ERROR_CODE
      })
   }
}

const bulkUpdateToDoByID = async (req, res) => {
   try {
      const { data = [] } = req?.body

      data.forEach(({ id, title, description }) => {
         try {
            pool.query('BEGIN')
            pool.query(
               "UPDATE todo set title = $1, description = $2 WHERE id = $3",
               [ title, description, id ]
            )
            pool.query('COMMIT')
         } catch (error) {
            pool.query('ROLLBACK')
         }
      });

      res.status(200).json({
         'message': 'Bulk update done successfully',
         'status': SUCCESS_STATUS_CODE
      })
   } catch (error) {
      res.status(INTERNAL_SERVER_ERROR_CODE).json({
         'message': SOME_THING_WENT_WRONG,
         'status': INTERNAL_SERVER_ERROR_CODE
      })
   }
}

const deleteToDoByID = async (req, res) => {
   try {
      const { id } = req.params
      
      if(!id){
         throw new Error('Todo ID not found')
      }
      await pool.query('BEGIN')
      const deleteQuery = pool.query("DELETE FROM todo where id in ($1) RETURNING *;", [parseInt(id)])
      await pool.query('COMMIT')

      res.status(SUCCESS_STATUS_CODE).json({
         'message': DELETED_SUCCESSFULLY,
         'status': SUCCESS_STATUS_CODE
      })

   } catch (error) {
      await pool.query('ROLLBACK')
      res.status(INTERNAL_SERVER_ERROR_CODE).json({
         'message': SOME_THING_WENT_WRONG,
         'status': INTERNAL_SERVER_ERROR_CODE
      })
   }
}

module.exports = {
   getAllTodos,
   createTodo,
   getTodoById,
   updateTodoById,
   deleteToDoByID,
   bulkUpdateToDoByID
}