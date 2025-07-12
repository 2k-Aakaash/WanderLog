// src/components/Sidebar.jsx
import React from 'react';
import {
    Drawer,
    Box,
    Button,
    List,
    ListItemIcon,
    ListItemText,
    ListItemButton
} from '@mui/material';
import { Home, ListIcon, Tag, Archive, Star, Settings, Info } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

const Sidebar = ({ sidebarOpen, isMobile, handleSidebarToggle, drawerWidth, theme }) => {
    const { navigate } = useRouter();

    const sidebarItems = [
        { text: 'Home', icon: <Home size={20} />, route: '/' },
        { text: 'All Logs', icon: <ListIcon size={20} />, route: '/logs' },
        { text: 'Tags', icon: <Tag size={20} />, route: '/tags' },
        { text: 'Archived', icon: <Archive size={20} />, route: '/archived' },
        { text: 'Favorites', icon: <Star size={20} />, route: '/favorites' },
        { text: 'Settings', icon: <Settings size={20} />, route: '/settings' },
    ];

    return (
        <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            open={sidebarOpen}
            onClose={isMobile ? handleSidebarToggle : undefined}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: theme.colors.sidebarBackground,
                    color: theme.colors.darkBrown,
                    border: 'none',
                    mt: '64px',
                    height: 'calc(100% - 64px)'
                },
            }}
        >
            <Box sx={{ pt: 2, px: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mb: 3,
                        bgcolor: theme.colors.white,
                        color: theme.colors.text,
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: theme.colors.cardBackground, opacity: 0.9 }
                    }}
                    onClick={() => navigate('/write')}
                >
                    Write Diary
                </Button>
                <List>
                    {sidebarItems.map((item, index) => (
                        <ListItemButton
                            key={item.text}
                            onClick={() => navigate(item.route)}
                            sx={{
                                mb: 1,
                                borderRadius: '8px',
                                bgcolor: index === 0 ? theme.colors.darkBrown : 'transparent',
                                '&:hover': { bgcolor: index === 0 ? theme.colors.darkBrown : 'rgba(255, 255, 255, 0.1)' },
                            }}
                        >
                            <ListItemIcon sx={{ color: index === 0 ? theme.colors.white : theme.colors.darkBrown, minWidth: 36 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    color: index === 0 ? theme.colors.white : theme.colors.darkBrown,
                                    '& .MuiTypography-root': { fontWeight: 500 }
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', position: 'absolute', bottom: 20, width: `calc(${drawerWidth}px - 32px)` }}>
                    <ListItemButton
                        onClick={() => navigate('/about')}
                        sx={{
                            borderRadius: '8px',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                        }}
                    >
                        <ListItemIcon sx={{ color: theme.colors.darkBrown, minWidth: 36 }}>
                            <Info size={20} />
                        </ListItemIcon>
                        <ListItemText
                            primary="About & Help"
                            sx={{
                                color: theme.colors.darkBrown,
                                '& .MuiTypography-root': { fontWeight: 500 }
                            }}
                        />
                    </ListItemButton>
                </Box>

            </Box>
        </Drawer>
    );
};

export default Sidebar;