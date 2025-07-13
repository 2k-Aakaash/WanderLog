import React, { useState, useEffect } from 'react';
import MDEditor from "@uiw/react-md-editor";
import { Box, Typography, IconButton, Stack, Button } from '@mui/material';
import { SaveStatusIcon } from './SaveStatusIcon';
import ImageUploader from './ImageUploader';
import { encryptData, decryptData } from '../utils/encrypt';
import { saveDiaryToFirebase } from '../utils/firebaseHelper';

const DiaryEditorPage = ({ theme }) => {
    const [value, setValue] = useState("# My Sample Adventure\nWrite your diary here...");
    const [images, setImages] = useState([]); // [{base64, url}]
    const [saveStatus, setSaveStatus] = useState("saved");

    // Autosave every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => autoSave(), 5000);
        return () => clearInterval(interval);
    }, [value, images]);

    const autoSave = async () => {
        setSaveStatus("saving");
        try {
            const diaryObj = {
                title: "My Sample Adventure",
                date: new Date().toISOString(),
                content: value,
                images: images.map(img => img.base64),
                tags: ["wander", "log"]
            };
            const encrypted = encryptData(diaryObj);
            await saveDiaryToFirebase(encrypted); // ✅ push to Firestore
            setSaveStatus("saved");
        } catch (e) {
            console.error("Autosave failed:", e);
            setSaveStatus("failed");
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: theme.colors.background }}>
            {/* Left: Editor */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                {/* Toolbar */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ color: theme.colors.text, flex: 1 }}>
                        WanderLog Editor
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={autoSave} size="small">
                            <SaveStatusIcon status={saveStatus} />
                        </IconButton>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={autoSave}
                            sx={{
                                bgcolor: theme.colors.darkBrown,
                                color: theme.colors.white,
                                borderRadius: '6px',
                                textTransform: 'none',
                                '&:hover': { bgcolor: theme.colors.darkBrown, opacity: 0.9 }
                            }}
                        >
                            Save now
                        </Button>
                    </Stack>
                </Box>
                {/* Editor */}
                <Box sx={{
                    flex: 1,
                    bgcolor: theme.colors.cardBackground,
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <MDEditor
                        value={value}
                        onChange={setValue}
                        height="100%"
                        style={{
                            backgroundColor: theme.colors.cardBackground,
                            color: theme.colors.text,
                            borderRadius: '8px'
                        }}
                    />
                </Box>
            </Box>

            {/* Right: Images */}
            <Box sx={{
                width: 300,
                borderLeft: `1px dashed ${theme.colors.darkBrown}`,
                overflowY: 'auto',
                p: 2
            }}>
                <ImageUploader images={images} setImages={setImages} theme={theme} />
            </Box>
        </Box>
    );
};

export default DiaryEditorPage;
