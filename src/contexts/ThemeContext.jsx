import { createContext } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const mode = useColorScheme() ?? 'light';                    // e.g. 'light' or 'dark'
    return (
        <ThemeContext.Provider value={{ mode, themeColors }}>
            {children}
        </ThemeContext.Provider>
    );
}

const themeColors = {
    light: {
        background: '#FFFFFF',
        text: '#222222',
        primary: '#1976D2',
        secondary: '#FFC107',
        accent: '#03A9F4',
        card: '#F5F5F5',
        border: '#E0E0E0',
        error: '#D32F2F',
        success: '#388E3C',
        warning: '#FFA000',
    },
    dark: {
        background: '#121212',
        text: '#EEEEEE',
        primary: '#90CAF9',
        secondary: '#FFD54F',
        accent: '#4FC3F7',
        card: '#1E1E1E',
        border: '#333333',
        error: '#EF5350',
        success: '#66BB6A',
        warning: '#FFB300',
    }
}
