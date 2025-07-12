// src/components/HomePage.jsx
import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
} from '@mui/material';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { itinerariesData } from '../data/itinerariesData';
import { diariesData } from '../data/diariesData';

const HomePage = ({ theme }) => {
    const { navigate } = useRouter();

    return (
        <Box>
            {/* Itinerary Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: theme.colors.text }}>
                    Travel Itineraries
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                    {itinerariesData.map((itinerary, index) => (
                        <Card
                            key={index}
                            onClick={() => navigate('/itinerary', { id: itinerary.id })}
                            sx={{
                                minWidth: 280,
                                bgcolor: theme.colors.primary,
                                color: theme.colors.text,
                                borderRadius: '12px',
                                flexShrink: 0,
                                cursor: 'pointer',
                                '&:hover': { transform: 'translateY(-2px)', transition: 'transform 0.2s' }
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.colors.darkBrown }}>
                                        {itinerary.location}
                                    </Typography>
                                    <Chip label={itinerary.duration} size="small" sx={{ bgcolor: theme.colors.white, color: theme.colors.text }} />
                                </Box>
                                <Typography variant="body2" sx={{ color: theme.colors.darkBrown, mb: 2 }}>
                                    {itinerary.schedule.length} activities planned
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Clock size={16} color={theme.colors.darkBrown} />
                                    <Typography variant="body2" sx={{ color: theme.colors.darkBrown }}>
                                        {itinerary.schedule[0].time} - {itinerary.schedule[itinerary.schedule.length - 1].time}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* Diary Entries Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: theme.colors.text }}>
                    Recent Diaries
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {diariesData.map((diary, index) => (
                        <Card
                            key={index}
                            onClick={() => navigate('/diary', { id: diary.id })}
                            sx={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                '&:hover': { transform: 'translateY(-2px)', transition: 'transform 0.2s' }
                            }}
                        >
                            <Box
                                sx={{
                                    height: 200,
                                    background: diary.gradient,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.7))',
                                    }
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: 'white',
                                        textTransform: 'uppercase',
                                        letterSpacing: 4,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        zIndex: 1,
                                        position: 'relative'
                                    }}
                                >
                                    {diary.title}
                                </Typography>
                            </Box>
                            <CardContent sx={{ bgcolor: theme.colors.cardBackground }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <MapPin size={16} color={theme.colors.text} />
                                        <Typography variant="body2" sx={{ color: theme.colors.text }}>
                                            {diary.location}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Calendar size={16} color={theme.colors.text} />
                                        <Typography variant="body2" sx={{ color: theme.colors.text }}>
                                            {diary.date}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ color: theme.colors.text, mb: 2 }}>
                                    {diary.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {diary.tags.map((tag, tagIndex) => (
                                        <Chip
                                            key={tagIndex}
                                            label={tag}
                                            size="small"
                                            sx={{ bgcolor: theme.colors.primary, color: theme.colors.darkBrown }}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;