// src/components/MainLayout.jsx
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Menu } from 'lucide-react';

const MainLayout = ({ children, sidebarOpen, handleSidebarToggle, theme, drawerWidth }) => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: { xs: '100%', md: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
                marginLeft: { xs: 0, md: sidebarOpen ? 0 : `-${drawerWidth}px` },
                transition: 'all 0.3s ease',
                overflowX: 'hidden'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton
                    onClick={handleSidebarToggle}
                    sx={{ color: theme.colors.text, mr: 2 }}
                >
                    <Menu size={24} />
                </IconButton>
            </Box>
            {children}
        </Box>
    );
};

export default MainLayout;