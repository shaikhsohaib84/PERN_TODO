import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useRef } from 'react'
import { createTodo } from '../axios/apiCall'
import { error, success } from '../util/alert'
import { DATA_SUCCESSFULLY_UPDATED, SOME_THING_WENT_WRONG } from '../util/const'

export const AddTodo = React.memo(({ showModal, setShowModal}) => {
    const title = useRef()
    const description = useRef()

    const handleClose = ()  => {
        setShowModal(false)
        title.current = ''
        description.current = ''
    }

    const addTodo = async () => {
        const payload = {
            'title': title.current,
            'description': description.current
        }
        const res = await createTodo(payload)
        
        if(res.status !== 200){
            error(SOME_THING_WENT_WRONG)
        } else{
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