import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D4A373',
        },
        secondary: {
            main: '#8B5A2B',
        },
        background: {
            default: '#F4E1C4',
            paper: '#ffffff',
        },
        text: {
            primary: '#000',
        },
    },
    typography: {
        fontFamily: 'SharpSansStandard',
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;