import * as React from 'react';
import { useDispatch } from 'react-redux'
import { setGeneric } from '../redux/action/genericAction'
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { debounce } from '../util/commonFunction';
import { AddTodo } from './AddTodo';

export const SearchTodo = React.memo(() => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = React.useState(false)

  const searchTodo = (str = '') => {
    dispatch(setGeneric({ 'searchTitle': str }))
  }

  const debounceSearch = debounce(searchTodo, 300)

  return (
    <div className='mt-2 mb-2 d-flex justify-content-between w-100'>
      <div className=''>
        <TextField
          id="standard-basic"
          label="Search Todo"
          variant="standard"
          onKeyUp={(e) => { debounceSearch(e?.target?.value) }}
        />
      </div>

      <div className=''>
        <Button
          variant="contained"
          color="success"
          onClick={() => { setShowModal(true) }}
        >
          Add New
        </Button>
      </div>

      {
        showModal && <AddTodo showModal={showModal} setShowModal={setShowModal}/>
      }
      
    </div>
  )
})