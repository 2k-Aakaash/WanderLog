// src/components/SaveStatusIcon.jsx
import React from 'react';
import { CircularProgress } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';
export const SaveStatusIcon = ({ status }) => {
    if (status === "saving") return <CircularProgress size={20} />;
    if (status === "saved") return <CheckCircle size={20} color="green" />;
    if (status === "failed") return <XCircle size={20} color="red" />;
    return null;
};
