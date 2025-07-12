// src/components/DiaryDetailPage.jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Button, Typography } from '@mui/material';
import * as fsAccess from 'browser-fs-access';
import { loadAndDecryptWLFile } from '../utils/wlFileHelper';

const DiaryDetailPage = ({ theme }) => {
    const [diary, setDiary] = useState(null);

    const handleLoadFile = async () => {
        try {
            const file = await fsAccess.fileOpen({
                extensions: [".wl"]
            });
            const data = await loadAndDecryptWLFile(file);
            setDiary(data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: theme.colors.background }}>
            {/* Left: markdown */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                {!diary ? (
                    <Box>
                        <Button
                            variant="contained"
                            onClick={handleLoadFile}
                            sx={{
                                bgcolor: theme.colors.primary,
                                color: theme.colors.white,
                                '&:hover': { bgcolor: theme.colors.darkBrown }
                            }}
                        >
                            Load Diary
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h4" sx={{ mb: 1, color: theme.colors.text, fontWeight: 'bold' }}>
                            {diary.meta.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: theme.colors.darkBrown }}>
                            {new Date(diary.meta.date).toLocaleDateString()}
                        </Typography>
                        <ReactMarkdown
                            children={diary.content}
                            components={{
                                p: ({ node, ...props }) => <Typography sx={{ mb: 2, color: theme.colors.text }} {...props} />,
                                h1: ({ node, ...props }) => <Typography variant="h4" sx={{ color: theme.colors.text, mb: 2 }} {...props} />,
                                h2: ({ node, ...props }) => <Typography variant="h5" sx={{ color: theme.colors.text, mb: 2 }} {...props} />,
                            }}
                        />
                    </>
                )}
            </Box>

            {/* Right: image gallery */}
            {diary && (
                <Box sx={{
                    width: 300,
                    borderLeft: `1px dashed ${theme.colors.darkBrown}`,
                    overflowY: 'auto',
                    p: 2
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {diary.images.map((b64, idx) => (
                            <Box key={idx} component="img" src={`data:image/*;base64,${b64}`} alt="" sx={{ width: '100%', borderRadius: '8px' }} />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DiaryDetailPage;
