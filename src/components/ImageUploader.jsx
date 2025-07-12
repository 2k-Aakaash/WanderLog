// src/components/ImageUploader.jsx
import React from 'react';
import { Box, Button } from '@mui/material';

const ImageUploader = ({ images, setImages, theme }) => {
    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        for (let file of files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                setImages(prev => [...prev, {
                    base64,
                    url: reader.result // full data URL for preview
                }]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                    mb: 2,
                    bgcolor: theme.colors.primary,
                    color: theme.colors.white,
                    borderRadius: '6px',
                    '&:hover': { bgcolor: theme.colors.darkBrown }
                }}
            >
                Upload Images
                <input
                    hidden
                    multiple
                    accept="image/*"
                    type="file"
                    onChange={handleUpload}
                />
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {images.map((img, idx) => (
                    <Box key={idx} component="img" src={img.url} alt="" sx={{ width: '100%', borderRadius: '8px' }} />
                ))}
            </Box>
        </Box>
    );
};

export default ImageUploader;
