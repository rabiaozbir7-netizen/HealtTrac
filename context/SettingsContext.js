import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { storage } from '../utils/storage';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState(systemColorScheme || 'light');
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        const loadSettings = async () => {
            const savedTheme = await storage.getTheme();
            if (savedTheme) setTheme(savedTheme);

            const savedFontSize = await storage.getFontSize();
            if (savedFontSize) setFontSize(savedFontSize);
        };
        loadSettings();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await storage.saveTheme(newTheme);
    };

    const updateFontSize = async (size) => {
        setFontSize(size);
        await storage.saveFontSize(size);
    };

    const clearAllData = async () => {
        await storage.clearAllData();
        setTheme(systemColorScheme || 'light');
        setFontSize(16);
    };

    return (
        <SettingsContext.Provider value={{
            theme,
            toggleTheme,
            isDark: theme === 'dark',
            fontSize,
            updateFontSize,
            clearAllData
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
