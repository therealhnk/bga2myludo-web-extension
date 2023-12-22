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
        },
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: darkMode ? 'rgba(97, 97, 97, 0.92)' : '#404A84',//'rgba(255, 255, 255, 0.92)',
                        color: darkMode ? '#ffffffb3' : 'white',
                        fontWeight: 'bold'
                    }
                }
            }
        }
    });
}