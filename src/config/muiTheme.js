import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
    palette: {
        primary: {
            light: '#9b5e76',
            main: '#6b334a',
            dark: '#3e0822',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e0f9ff',
            main: '#adc6ea',
            dark: '#7d96b8',
            contrastText: '#000',
        },
    },
});

export default muiTheme;
