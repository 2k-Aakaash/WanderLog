// src/components/TopBar.jsx
import React from 'react';
import {
    AppBar, Toolbar, Typography, TextField, IconButton, Box, InputAdornment, useTheme
} from '@mui/material';
import { Search, Settings, Moon, Sun } from 'lucide-react';
import AuthModal from '../utils/AuthModal';

const TopBar = ({ user, setUser, theme, isDarkMode, toggleTheme }) => {
    const muiTheme = useTheme();

    return (
        <AppBar position="fixed" sx={{ bgcolor: theme.colors.primary, boxShadow: 'none', zIndex: muiTheme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ color: theme.colors.darkBrown, fontWeight: '900', mr: 2, fontSize: '28px' }}>
                    WanderLog
                </Typography>

                <TextField
                    placeholder="Search Diaries"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                        backgroundColor: theme.colors.white,
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': { borderColor: 'transparent' },
                        },
                        '& .MuiInputBase-input': { color: theme.colors.text },
                        flexGrow: 1, mx: { xs: 1, md: 2 }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={18} color={theme.colors.text} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={toggleTheme} sx={{ bgcolor: theme.colors.darkBrown, color: theme.colors.white, borderRadius: '10px' }}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </IconButton>
                    <AuthModal user={user} setUser={setUser} />
                    <IconButton sx={{ bgcolor: theme.colors.darkBrown, color: theme.colors.white, borderRadius: '10px' }}>
                        <Settings size={20} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
