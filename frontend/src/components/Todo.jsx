import React, { useEffect } from 'react'
import { SearchTodo } from './SearchTodo'
import { TodoTable } from './TodoTable'

export const Todo = React.memo(() => {
  return (
    <div className='w-100 container'>
        <SearchTodo />
        <TodoTable />
    </div>
  )
})