// src/App.jsx
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, useMediaQuery, useTheme } from '@mui/material';
import { Router } from './context/RouterContext';
import TopBar from './components/TopBar';
import Sidebar from './components/SideBar';
import MainLayout from './components/MainLayout';
import RouteRenderer from './components/RouteRenderer';
import { lightTheme, darkTheme } from './themes/themes';

const WanderLogApp = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const muiTheme = useTheme(); // Changed from useMuiTheme to useTheme
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const drawerWidth = 240;

    const currentTheme = isDarkMode ? darkTheme : lightTheme;

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
                        theme={currentTheme}
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                    />

                    <Box sx={{ display: 'flex', mt: '64px' }}>
                        <Sidebar
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