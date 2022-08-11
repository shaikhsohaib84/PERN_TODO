import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userSignUp } from '../axios/apiCall';
import { error } from '../util/alert';

const theme = createTheme();

export const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userPayload = {
            name, email, password
        }
        const res = await userSignUp(userPayload)
        if(res.status !== 200){
            return error('something went unexpected wrong')
        }
        navigate('/login')
        console.log('res', res)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Signup
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                autoFocus
                                margin="normal"
                                required
                                fullWidth
                                id="user-name"
                                label="Name"
                                name="user-name"
                                autoComplete="user-name"
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <Button
                                type="submit"
                                value="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={(e) => { handleSubmit(e) }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={() => { navigate('/login') }} variant="body2">
                                        {"Already have an account? Login In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </form>
            </Container>
        </ThemeProvider>
    )
}
