import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

import {toast, ToastContainer} from 'react-toastify';
import { getAll, removeTodo, updateTodo } from '../axios/apiCall'
import { error, success } from '../util/alert';
import { DATA_SUCCESSFULLY_UPDATED, SOME_THING_WENT_WRONG } from '../util/const';
import { Box } from '@mui/system';
import 'react-toastify/dist/ReactToastify.css';
import setModel from '../redux/action/modelAction';
   
toast.configure()


export const TodoTable = React.memo(({ data }) => {
    const dispatch = useDispatch()
    const modelState = useSelector((state) => state?.model)
    const genericState = useSelector((state) => state?.generic)

    const { todo=[] } = modelState
    const { searchTitle='' } = genericState
    const [selectedRow, setSelectedRow] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)

    let title = useRef('')
    let description = useRef('')

    useEffect(() => {
        async function fetchData() {
            const { data: { data: { Todos } } } = await getAll()
            dispatch(setModel('todo', Todos))
            setTimeout(() => { setIsLoading(false) }, 2000)
        }
        fetchData()
    }, [])


    const column = [
        {
            id: 'title', label: 'Title'
        },
        {
            id: 'decription', label: 'Description'
        },
        {
            id: '', label: ''
        },
    ]

    const handleOpen = (obj) => {
        setSelectedRow(obj)
        setIsOpen(true)
    }

    const  handleRemove = async (obj) => {
        setDisable(true)
        const { id } = obj;
        const res = await removeTodo(id)
        console.log('res of delete', res)
        setDisable(false)
    }

    const handleClose = ()  => {
        setSelectedRow({})
        title.current = ''
        description.current = ''
        setIsOpen(false)
    }

    const  handleConfirm = async () => {
        const { id }  = selectedRow
        const payload = {
            'title': title.current,
            'description': description.current
        }
        const res = await updateTodo(id, payload)
        
        if(res.status !== 200){
            error(SOME_THING_WENT_WRONG)
        } else{
            success(DATA_SUCCESSFULLY_UPDATED)
        }
        handleClose()
    }
    
    return (
        <div className='d-flex align-items-center justify-content-center'>
            {
                isLoading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                    <ToastContainer />
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {column.map((column, idx) => (
                                            <TableCell key={idx}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        todo.map((ins) => {
                                            const { id, title, description } = ins
                                            if(title.toLowerCase().includes(searchTitle.toLowerCase())){
                                                return (
                                                    <>
                                                        <TableRow
                                                            hover
                                                            key={id}
                                                        >
                                                            <TableCell>
                                                                {title}
                                                            </TableCell>
    
                                                            <TableCell>
                                                                {description}
                                                            </TableCell>
    
                                                            <TableCell align='right'>
                                                                <>
                                                                <Button
                                                                    className='m-1'
                                                                    variant="contained"
                                                                    onClick={() => { handleOpen(ins) }}
                                                                >Edit</Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick = { () => { handleRemove(ins) }}
                                                                    disabled={disable}
                                                                >Remove</Button>
                                                                </>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Dialog open={isOpen} onClose={() => {handleClose()}}>
                            <DialogTitle>Update Todo</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    name='title'
                                    ref={title}
                                    margin="dense"
                                    id="title"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => { title.current = e.target.value }}
                                />
                                <TextField
                                    name='description'
                                    margin="dense"
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
                                <Button onClick={ () => { handleClose() }}>Close</Button>
                                <Button onClick={ () => { handleConfirm() }}>Confirm</Button>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                    
                    </>
                )
            }
        </div>
    )
})