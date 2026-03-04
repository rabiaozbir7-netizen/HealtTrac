import { Stack } from 'expo-router';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import '../global.css';

function RootLayoutNav() {
    const { isDark } = useSettings();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: isDark ? '#0F172A' : '#F9FAFB' },
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="diary" />
            <Stack.Screen name="education" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="suggestions" />
            <Stack.Screen name="health" />
            <Stack.Screen name="reminders" />
            <Stack.Screen name="feedback" />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <SettingsProvider>
            <RootLayoutNav />
        </SettingsProvider>
    );
}
