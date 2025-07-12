// src/components/ItineraryDetailPage.jsx
import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Chip
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { itinerariesData } from '../data/itinerariesData';

const ItineraryDetailPage = ({ theme }) => {
    const { navigate, routeParams } = useRouter();
    const itinerary = itinerariesData.find(i => i.id === routeParams.id);

    if (!itinerary) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h5" sx={{ color: theme.colors.text }}>
                    Itinerary not found
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigate('/')} sx={{ color: theme.colors.text, mr: 2 }}>
                    <ArrowLeft size={24} />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.colors.text }}>
                    {itinerary.location}
                </Typography>
                <Chip label={itinerary.duration} sx={{ ml: 2, bgcolor: theme.colors.primary, color: theme.colors.darkBrown }} />
            </Box>

            <Card sx={{ bgcolor: theme.colors.cardBackground, borderRadius: '12px' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: theme.colors.text }}>
                        Daily Schedule
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {itinerary.schedule.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 2,
                                    bgcolor: theme.colors.primary,
                                    borderRadius: '8px',
                                    gap: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        minWidth: 80,
                                        textAlign: 'center',
                                        py: 1,
                                        px: 2,
                                        bgcolor: theme.colors.darkBrown,
                                        color: theme.colors.white,
                                        borderRadius: '6px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {item.time}
                                </Box>
                                <Typography variant="body1" sx={{ color: theme.colors.darkBrown, fontWeight: 500 }}>
                                    {item.activity}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ItineraryDetailPage;