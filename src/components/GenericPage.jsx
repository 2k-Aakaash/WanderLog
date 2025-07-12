// src/components/GenericPage.jsx
import React from 'react';
import {
    Box,
    Typography,
    Card,
    IconButton
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

const GenericPage = ({ title, theme }) => {
    const { navigate } = useRouter();

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigate('/')} sx={{ color: theme.colors.text, mr: 2 }}>
                    <ArrowLeft size={24} />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.colors.text }}>
                    {title}
                </Typography>
            </Box>
            <Card sx={{ bgcolor: theme.colors.cardBackground, borderRadius: '12px', p: 4 }}>
                <Typography variant="h6" sx={{ color: theme.colors.text, textAlign: 'center' }}>
                    {title} page - Coming Soon!
                </Typography>
            </Card>
        </Box>
    );
};

export default GenericPage;