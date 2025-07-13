// src/App.jsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebase'
import { ThemeProvider, createTheme, CssBaseline, Box, useMediaQuery, useTheme } from '@mui/material';
import { Router } from './context/RouterContext';
import TopBar from './components/TopBar';
import SideBar from './components/Sidebar';
import MainLayout from './components/MainLayout';
import RouteRenderer from './components/RouteRenderer';
import { lightTheme, darkTheme } from './themes/themes';

const WanderLogApp = () => {
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const muiTheme = useTheme(); // Changed from useMuiTheme to useTheme
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const drawerWidth = 240;
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // user is logged in
                console.log('[auth] currentUser:', auth.currentUser);
            } else {
                setUser(null); // logged out
            }
        });
        return () => unsubscribe(); // cleanup
    }, []);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:", user.uid);
            // safe to save now
        } else {
            console.log("No user signed in");
        }
    });

    useEffect(() => {
        const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPref);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
    }, [isMobile]);


    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const materialTheme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            background: {
                default: currentTheme.colors.background,
                paper: currentTheme.colors.cardBackground,
            },
            text: {
                primary: currentTheme.colors.text,
            },
        },
    });

    return (
        <Router>
            <ThemeProvider theme={materialTheme}>
                <CssBaseline />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: currentTheme.colors.background,
                    minHeight: '100vh',
                    transition: 'all 0.3s ease'
                }}>
                    <TopBar
                        user={user}
                        setUser={setUser}
                        theme={currentTheme}
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                    />

                    <Box sx={{ display: 'flex', mt: '64px' }}>
                        <SideBar
                            sidebarOpen={sidebarOpen}
                            isMobile={isMobile}
                            handleSidebarToggle={handleSidebarToggle}
                            drawerWidth={drawerWidth}
                            theme={currentTheme}
                        />

                        <MainLayout
                            sidebarOpen={sidebarOpen}
                            handleSidebarToggle={handleSidebarToggle}
                            theme={currentTheme}
                            drawerWidth={drawerWidth}
                        >
                            <RouteRenderer theme={currentTheme} />
                        </MainLayout>
                    </Box>
                </Box>
            </ThemeProvider>
        </Router>
    );
};

export default WanderLogApp;