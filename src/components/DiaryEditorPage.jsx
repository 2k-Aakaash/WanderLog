import React, { useState, useEffect, useRef } from 'react';
import MDEditor from "@uiw/react-md-editor";
import { Box, Typography, IconButton, Stack, Button } from '@mui/material';
import { SaveStatusIcon } from './SaveStatusIcon';
import ImageUploader from './ImageUploader';
import * as fsAccess from 'browser-fs-access';
import { encryptAndSaveWLFile } from '../utils/wlFileHelper';

const DiaryEditorPage = ({ theme }) => {
    const [value, setValue] = useState("# My Sample Adventure\nWrite your diary here...");
    const [images, setImages] = useState([]); // { base64, url }
    const [saveStatus, setSaveStatus] = useState("saved");
    const saveFileHandle = useRef(null);

    // Autosave every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => autoSave(), 5000);
        return () => clearInterval(interval);
    }, [value, images]);

    const autoSave = async () => {
        if (!saveFileHandle.current) return;
        setSaveStatus("saving");
        try {
            const dataToSave = {
                meta: { title: "My Sample Adventure", date: new Date().toISOString(), tags: ["wander", "log"] },
                content: value,
                images: images.map(i => i.base64)
            };
            const blob = encryptAndSaveWLFile(dataToSave);

            const writable = await saveFileHandle.current.createWritable();
            await writable.write(blob);
            await writable.close();

            setSaveStatus("saved");
        } catch (e) {
            console.error("Autosave failed:", e);
            setSaveStatus("failed");
        }
    };

    const handlePickFile = async () => {
        try {
            const handle = await fsAccess.fileSave({
                suggestedName: "NewDiary.wl",
                description: "WanderLog Diary File",
                extensions: [".wl"],
                mimeTypes: ["text/plain"]
            });
            saveFileHandle.current = handle;
            await autoSave(); // save immediately
        } catch (e) {
            console.error("File pick failed:", e);
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: theme.colors.background }}>
            {/* Left: Editor area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                {/* Toolbar & title */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ color: theme.colors.text, flex: 1 }}>
                        WanderLog Editor
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={handlePickFile} size="small">
                            <SaveStatusIcon status={saveStatus} />
                        </IconButton>
                        {/* extra manual save button if wanted */}
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

            {/* Right: Image upload/preview */}
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
