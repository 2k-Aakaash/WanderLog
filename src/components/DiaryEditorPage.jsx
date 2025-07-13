import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, IconButton, Typography, Divider, styled, createTheme, ThemeProvider } from '@mui/material';
import { Save, FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, Image as ImageIcon, Link as LinkIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../utils/firebase"  // your firebase config

// Custom theme to match original colors
const muiTheme = createTheme({
    palette: {
        background: { main: '#D4A574' },
        cardBackground: { main: '#C8956D' },
        text: { primary: '#000000' },
        darkBrown: { main: '#8B6B3A' },
        white: { main: '#FFFFFF' },
        error: { main: '#EF5350' },
        warning: { main: '#FFCA28' },
        success: { main: '#4CAF50' },
        grey: { main: '#9E9E9E' },
    },
    typography: {
        h2: { fontSize: '1.25rem', fontWeight: 600 },
        h3: { fontSize: '1.125rem', fontWeight: 600 },
        body1: { fontSize: '1rem', lineHeight: 1.6 },
    },
});

// Styled component for save status indicator
const SaveStatusCircle = styled('div')(({ theme, status }) => ({
    width: 16,
    height: 16,
    borderRadius: '50%',
    backgroundColor: {
        saving: theme.palette.warning.main,
        saved: theme.palette.success.main,
        failed: theme.palette.error.main,
        unsaved: theme.palette.grey.main,
    }[status],
    ...(status === 'saving' && {
        animation: 'pulse 1.5s infinite',
        '@keyframes pulse': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.4 },
            '100%': { opacity: 1 },
        },
    }),
}));

const SaveStatusIcon = ({ status }) => <SaveStatusCircle status={status} />;

const ImageUploader = ({ images, setImages, theme }) => {
    const handleImageUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImage = {
                        id: Date.now(),
                        base64: e.target.result,
                        name: file.name,
                    };
                    setImages((prev) => [...prev, newImage]);
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    };

    return (
        <Box>
            <Typography variant="h3" sx={{ color: theme.colors.text, mb: 2 }}>
                Images ({images.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {images.map((image) => (
                    <Box
                        key={image.id}
                        sx={{ position: 'relative', '&:hover .delete-btn': { opacity: 1 } }}
                    >
                        <img
                            src={image.base64}
                            alt={image.name}
                            style={{
                                width: '100%',
                                height: 128,
                                objectFit: 'cover',
                                borderRadius: 8,
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                const imgHTML = `<img src="${image.base64}" alt="${image.name}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
                                document.execCommand('insertHTML', false, imgHTML);
                            }}
                            sx={{ '&:hover': { opacity: 0.8 }, transition: 'opacity 0.2s' }}
                        />
                        <IconButton
                            className="delete-btn"
                            onClick={() => setImages(images.filter((img) => img.id !== image.id))}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: 24,
                                height: 24,
                                bgcolor: muiTheme.palette.error.main,
                                color: muiTheme.palette.white.main,
                                fontSize: '0.875rem',
                                opacity: 0,
                                transition: 'opacity 0.2s',
                                '&:hover': { bgcolor: muiTheme.palette.error.dark },
                            }}
                        >
                            ×
                        </IconButton>
                    </Box>
                ))}
                <Button
                    onClick={handleImageUpload}
                    sx={{
                        width: '100%',
                        height: 96,
                        border: `2px dashed ${theme.colors.darkBrown}`,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'transparent',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.05)' },
                        transition: 'background-color 0.2s',
                    }}
                >
                    <ImageIcon sx={{ fontSize: 24, opacity: 0.6, mb: 1 }} />
                    <Typography sx={{ fontSize: '0.875rem', opacity: 0.6 }}>
                        Add Image
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

// Mock encryption functions
const encryptData = (data) => {
    return btoa(JSON.stringify(data));
};

const decryptData = (encryptedData) => {
    return JSON.parse(atob(encryptedData));
};

// Mock Firebase save function
const saveDiaryToFirebase = async (encryptedData) => {
    console.log('[saveDiaryToFirebase] called with:', encryptedData);

    const auth = getAuth();
    const user = auth.currentUser;

    console.log('[saveDiaryToFirebase] currentUser:', user);

    if (!user) {
        console.error('[saveDiaryToFirebase] User is not logged in!');
        throw new Error("User is not logged in!");
    }

    const diaryId = `diary_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    console.log('[saveDiaryToFirebase] Generated diaryId:', diaryId);

    try {
        await setDoc(doc(db, "diaries", diaryId), {
            encrypted: encryptedData,
            createdAt: Date.now(),
            ownerId: user.uid
        });
        console.log('[saveDiaryToFirebase] Successfully saved to Firestore with ID:', diaryId);
    } catch (e) {
        console.error('[saveDiaryToFirebase] Failed to save to Firestore:', e);
        throw e;
    }

    return diaryId;
};


const DiaryEditorPage = ({ theme: propTheme }) => {
    const theme = propTheme || {
        colors: {
            background: '#D4A574',
            cardBackground: '#C8956D',
            text: '#000000',
            darkBrown: '#8B6B3A',
            white: '#FFFFFF',
        },
    };

    const [content, setContent] = useState(
        `<h1>My Sample Adventure</h1><p>Write your diary here...</p>`
    );
    const [saveStatus, setSaveStatus] = useState('saved');
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('My Sample Adventure');
    const [isPreview, setIsPreview] = useState(false);

    const editorRef = useRef(null);
    const saveTimeoutRef = useRef(null);
    const lastContentRef = useRef(content);

    useEffect(() => {
        if (content !== lastContentRef.current) {
            setSaveStatus('unsaved');
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            saveTimeoutRef.current = setTimeout(() => {
                autoSave();
            }, 2000);
            lastContentRef.current = content;
        }
    }, [content, images]);

    const autoSave = async () => {
        if (!editorRef.current) return;
        setSaveStatus('saving');
        try {
            const diaryObj = {
                title,
                date: new Date().toISOString(),
                content,
                images: images.map((img) => img.base64),
                tags: ['wander', 'log'],
            };
            const encrypted = encryptData(diaryObj);
            await saveDiaryToFirebase(encrypted);
            setSaveStatus('saved');
        } catch (e) {
            console.error('Autosave failed:', e);
            setSaveStatus('failed');
        }
    };

    const handleManualSave = async () => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        if (!editorRef.current) return;
        setSaveStatus('saving');
        try {
            const diaryObj = {
                title,
                date: new Date().toISOString(),
                content,
                images: images.map((img) => img.base64),
                tags: ['wander', 'log'],
            };
            const encrypted = encryptData(diaryObj);
            await saveDiaryToFirebase(encrypted);
            setSaveStatus('saved');
        } catch (e) {
            console.error('Manual save failed:', e);
            setSaveStatus('failed');
        }
    };

    const formatText = (command, value = null) => {
        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand(command, false, value);
            handleContentChange();
        }
    };

    const insertHeading = (level) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString() || `Heading ${level}`;
            const headingHTML = `<h${level}>${selectedText}</h${level}>`;
            range.deleteContents();
            range.insertNode(document.createRange().createContextualFragment(headingHTML));
            range.collapse(false);
            handleContentChange();
        }
    };

    const insertList = (ordered = false) => {
        const listType = ordered ? 'insertOrderedList' : 'insertUnorderedList';
        formatText(listType);
    };

    const handleImageUpload = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target.result;
                    const newImage = { id: Date.now(), base64, name: file.name };
                    const imgHTML = `<img src="${base64}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;" />`;
                    formatText('insertHTML', imgHTML);
                    setImages((prev) => [...prev, newImage]);
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            formatText('createLink', url);
        }
    };

    const handleContentChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    const togglePreview = () => {
        setIsPreview(!isPreview);
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                    bgcolor: theme.colors.background,
                }}
            >
                {/* Left: Editor & toolbar */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    {/* Toolbar */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h2" sx={{ color: theme.colors.text }}>
                            WanderLog Editor
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                onClick={handleManualSave}
                                sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                            >
                                <SaveStatusIcon status={saveStatus} />
                            </IconButton>
                            <Button
                                onClick={handleManualSave}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    bgcolor: theme.colors.darkBrown,
                                    color: theme.colors.white,
                                    borderRadius: 1,
                                    '&:hover': { opacity: 0.9 },
                                    transition: 'opacity 0.2s',
                                }}
                            >
                                Save now
                            </Button>
                        </Box>
                    </Box>

                    {/* Editor Container */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2,
                            overflow: 'hidden',
                            bgcolor: theme.colors.cardBackground,
                        }}
                    >
                        {/* Format Toolbar */}
                        <Box
                            sx={{ p: 1.5, borderBottom: `1px solid rgba(0, 0, 0, 0.2)` }}
                        >
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}
                            >
                                <IconButton
                                    onClick={() => formatText('bold')}
                                    sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                                    title="Bold (Ctrl+B)"
                                >
                                    <FormatBold fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={() => formatText('italic')}
                                    sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                                    title="Italic (Ctrl+I)"
                                >
                                    <FormatItalic fontSize="small" />
                                </IconButton>
                                <Divider
                                    orientation="vertical"
                                    sx={{ height: 24, bgcolor: 'rgba(0, 0, 0, 0.2)', mx: 1 }}
                                />
                                <Button
                                    onClick={() => insertHeading(1)}
                                    sx={{
                                        px: 1.5,
                                        py: 0.5,
                                        minWidth: 'auto',
                                        fontWeight: 'bold',
                                        fontSize: '0.875rem',
                                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' },
                                    }}
                                    title="Heading 1"
                                >
                                    H1
                                </Button>
                                <Button
                                    onClick={() => insertHeading(2)}
                                    sx={{
                                        px: 1.5,
                                        py: 0.5,
                                        minWidth: 'auto',
                                        fontWeight: 'bold',
                                        fontSize: '0.875rem',
                                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' },
                                    }}
                                    title="Heading 2"
                                >
                                    H2
                                </Button>
                                <Button
                                    onClick={() => insertHeading(3)}
                                    sx={{
                                        px: 1.5,
                                        py: 0.5,
                                        minWidth: 'auto',
                                        fontWeight: 'bold',
                                        fontSize: '0.875rem',
                                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' },
                                    }}
                                    title="Heading 3"
                                >
                                    H3
                                </Button>
                                <Divider
                                    orientation="vertical"
                                    sx={{ height: 24, bgcolor: 'rgba(0, 0, 0, 0.2)', mx: 1 }}
                                />
                                <IconButton
                                    onClick={() => insertList(false)}
                                    sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                                    title="Bullet List"
                                >
                                    <FormatListBulleted fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={() => insertList(true)}
                                    sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                                    title="Numbered List"
                                >
                                    <FormatListNumbered fontSize="small" />
                                </IconButton>
                                <Divider
                                    orientation="vertical"
                                    sx={{ height: 24, bgcolor: 'rgba(0, 0, 0, 0.2)', mx: 1 }}
                                />
                                <IconButton
                                    onClick={handleImageUpload}
                                    sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                                    title="Insert Image"
                                >
                                    <ImageIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={insertLink}
                                    sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                                    title="Insert Link"
                                >
                                    <LinkIcon fontSize="small" />
                                </IconButton>
                                <Divider
                                    orientation="vertical"
                                    sx={{ height: 24, bgcolor: 'rgba(0, 0, 0, 0.2)', mx: 1 }}
                                />
                                <IconButton
                                    onClick={togglePreview}
                                    sx={{ p: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } }}
                                    title={isPreview ? 'Edit Mode' : 'Preview Mode'}
                                >
                                    {isPreview ? (
                                        <Visibility fontSize="small" />
                                    ) : (
                                        <VisibilityOff fontSize="small" />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Editor Content */}
                        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                            {isPreview ? (
                                <Box
                                    className="prose prose-sm max-w-none"
                                    sx={{ color: theme.colors.text }}
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            ) : (
                                <Box
                                    ref={editorRef}
                                    contentEditable
                                    onInput={handleContentChange}
                                    sx={{
                                        outline: 'none',
                                        minHeight: '100%',
                                        color: theme.colors.text,
                                        lineHeight: 1.6,
                                        fontSize: '16px',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Right: Images */}
                <Box
                    sx={{
                        width: 320,
                        borderLeft: `2px dashed ${theme.colors.darkBrown}`,
                        p: 2,
                        overflowY: 'auto',
                    }}
                >
                    <ImageUploader images={images} setImages={setImages} theme={theme} />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default DiaryEditorPage;