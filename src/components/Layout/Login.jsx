import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Card, CardContent } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { login, isAuthenticated } from '../auth'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const ok = login(email, password)
        if (ok) {
            navigate('/admin/queries')
        } else {
            setError('Invalid credentials')
        }
    }

    if (isAuthenticated()) {
        navigate('/admin/queries')
    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default', p: 2 }}>
            <Container maxWidth="xs">
                <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Admin Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error && (
                                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                        {error}
                                    </Typography>
                                )}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
} 