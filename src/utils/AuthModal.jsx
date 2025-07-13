import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { Modal, Box, Typography, Button, Avatar, IconButton, TextField, Stack } from '@mui/material';
import { LogOut } from 'lucide-react';

export default function AuthModal({ user, setUser }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Google login
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            setOpen(false);
        } catch (e) {
            console.error("Google login failed:", e);
        }
    };

    // Email/Password login
    const handleEmailLogin = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            setOpen(false);
        } catch (e) {
            console.error("Email login failed:", e);
            alert("Login failed: " + e.message);
        }
    };

    // Email/Password signup
    const handleEmailSignup = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            setOpen(false);
        } catch (e) {
            console.error("Signup failed:", e);
            alert("Signup failed: " + e.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (e) {
            console.error("Logout failed:", e);
        }
    };

    return (
        <>
            {/* TopBar Icon */}
            <IconButton onClick={() => setOpen(true)}>
                {user ? (
                    <Avatar
                        src={user.photoURL || undefined}
                        sx={{ width: 24, height: 24 }}
                    >
                        {!user.photoURL && user.email ? user.email[0].toUpperCase() : null}
                    </Avatar>
                ) : (
                    <Avatar sx={{ width: 24, height: 24 }} /> // default empty avatar
                )}
            </IconButton>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    p: 3, bgcolor: 'background.paper', mx: 'auto', my: '20%', width: 300,
                    borderRadius: 2, textAlign: 'center'
                }}>
                    {user ? (
                        <>
                            <Avatar
                                src={user.photoURL || undefined}
                                sx={{ width: 56, height: 56, mx: 'auto' }}
                            >
                                {!user.photoURL && user.email ? user.email[0].toUpperCase() : null}
                            </Avatar>
                            <Typography mt={1}>{user.displayName || user.email}</Typography>
                            <Button
                                onClick={handleLogout}
                                variant="contained"
                                color="error"
                                startIcon={<LogOut />}
                                sx={{ mt: 2 }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" mb={2}>Login to WanderLog</Typography>
                            <Stack spacing={1} mb={2}>
                                <TextField
                                    label="Email"
                                    size="small"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    size="small"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Stack>
                            <Stack spacing={1}>
                                <Button variant="contained" onClick={handleEmailLogin}>
                                    Sign in with Email
                                </Button>
                                <Button variant="outlined" onClick={handleEmailSignup}>
                                    Sign up with Email
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
                                    Sign in with Google
                                </Button>
                            </Stack>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
}
