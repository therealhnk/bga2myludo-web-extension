import { createTheme } from "@mui/material";

export default function getTheme(darkMode: boolean) {
    return createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#4472c4' : '#404a86'
            },
            secondary: {
                main: darkMode ? '#ffffffb3' : '#00000099',
            },
            text: {
                primary: darkMode ? '#4472c4' : '#404a86',
                secondary: darkMode ? '#ffffffb3' : '#00000099',
            }
        }
    });
}