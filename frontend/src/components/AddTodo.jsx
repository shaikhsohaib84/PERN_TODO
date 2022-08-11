import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useRef } from 'react'
import { createTodo } from '../axios/apiCall'
import { error, success } from '../util/alert'
import { DATA_SUCCESSFULLY_UPDATED, SOME_THING_WENT_WRONG } from '../util/const'
import { useDispatch, useSelector } from 'react-redux'
import setModel from '../redux/action/modelAction'

export const AddTodo = React.memo(({ showModal, setShowModal}) => {
    const dispatch = useDispatch()
    const genericState = useSelector((state) => state?.generic)
    const modelState = useSelector((state) => state?.model)
    const title = useRef()
    const description = useRef()

    const { user={} } = genericState
    const { todo=[] } = modelState

    const handleClose = ()  => {
        setShowModal(false)
        title.current = ''
        description.current = ''
    }

    const addTodo = async () => {
        const todoDeepCopy = JSON.parse(JSON.stringify(todo))

        const { id } = user
        const payload = {
            'userId':  id,
            'title': title.current,
            'description': description.current
        }
        const res = await createTodo(payload)
        const  { status, data: { data } } = res
        if(status !== 200){
            error(SOME_THING_WENT_WRONG)
        } else{
            todoDeepCopy.push(data)
            dispatch(setModel('todo', todoDeepCopy))
            success(DATA_SUCCESSFULLY_UPDATED)
        }
        handleClose()
    }

    return (
        <>
            <Dialog open={true} onClose={ () => handleClose() }>
                <DialogTitle>Create Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="title"
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        ref={title}
                        onChange={(e) => { title.current = e.target.value }}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        ref={description}
                        onChange={(e) => { description.current = e.target.value }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={ () => {handleClose()} }>
                        Cancel
                    </Button>
                    <Button color="success" variant="outlined" onClick={ () => {addTodo()} }>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})