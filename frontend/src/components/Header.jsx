import React from 'react'
import { useSelector } from'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { userLogout } from '../axios/apiCall'
import { error, success } from '../util/alert'

export const Header = () => {
    const genericState = useSelector((state) => state?.generic)
    let navigate = useNavigate()
    const { user={} } = genericState
    
    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    const handleLogout = async () =>  {
        const { id } = user
        const res = await userLogout(id)
        const { status, data } = res
        if(status !== 200){
            return error('something went unexpected wrong')
        }
        success('You have been logout')
        navigate('/login')
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >

                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todo
                    </Typography>
                    <Button color="inherit" onClick={() => { handleLogin() }}>Login</Button>
                    <Button color="inherit" onClick={() => { handleSignUp() }}>Signup</Button>
                    <Button color="inherit" onClick={() => { handleLogout() }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </>
    )
}
