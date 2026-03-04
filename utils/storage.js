import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    DAILY_DATA: 'dailyData',
    PROFILE: 'healtrack_profile',
    THEME: 'healtrack_theme',
    FONT_SIZE: 'healtrack_font_size',
    REMINDERS: 'healtrack_reminders',
    MOVEMENT_STATUS: 'healtrack_movement_status',
    FEED_COMMENTS: 'healtrack_feed_comments',
    EDUCATION_TOPICS: 'healtrack_education_topics',
    FEEDBACK_RATING: 'healtrack_feedback_rating',
};

export const storage = {
    saveDailyData: async (data) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.DAILY_DATA, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving daily data', e);
        }
    },
    getDailyData: async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_DATA);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error getting daily data', e);
            return null;
        }
    },
    saveProfile: async (profile) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
        } catch (e) {
            console.error('Error saving profile', e);
        }
    },
    getProfile: async () => {
        try {
            const profile = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
            return profile ? JSON.parse(profile) : null;
        } catch (e) {
            console.error('Error getting profile', e);
            return null;
        }
    },
    saveTheme: async (theme) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
        } catch (e) {
            console.error('Error saving theme', e);
        }
    },
    getTheme: async () => {
        try {
            return await AsyncStorage.getItem(STORAGE_KEYS.THEME);
        } catch (e) {
            console.error('Error getting theme', e);
            return null;
        }
    },
    saveFontSize: async (size) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.FONT_SIZE, size.toString());
        } catch (e) {
            console.error('Error saving font size', e);
        }
    },
    getFontSize: async () => {
        try {
            const v = await AsyncStorage.getItem(STORAGE_KEYS.FONT_SIZE);
            return v ? parseInt(v) : 16;
        } catch (e) {
            console.error('Error getting font size', e);
            return 16;
        }
    },
    clearAllData: async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.error('Error clearing data', e);
        }
    },
    saveReminders: async (reminders) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
        } catch (e) {
            console.error('Error saving reminders', e);
        }
    },
    getReminders: async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.REMINDERS);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error getting reminders', e);
            return null;
        }
    },
    saveMovementStatus: async (status) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.MOVEMENT_STATUS, JSON.stringify(status));
        } catch (e) {
            console.error('Error saving movement status', e);
        }
    },
    getMovementStatus: async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.MOVEMENT_STATUS);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error getting movement status', e);
            return null;
        }
    },
    saveFeedComments: async (comments) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.FEED_COMMENTS, JSON.stringify(comments));
        } catch (e) {
            console.error('Error saving feed comments', e);
        }
    },
    getFeedComments: async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.FEED_COMMENTS);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error getting feed comments', e);
            return null;
        }
    },
    saveEducationTopics: async (topics) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.EDUCATION_TOPICS, JSON.stringify(topics));
        } catch (e) {
            console.error('Error saving education topics', e);
        }
    },
    getEducationTopics: async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.EDUCATION_TOPICS);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error getting education topics', e);
            return null;
        }
    },
    saveFeedbackRating: async (rating) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.FEEDBACK_RATING, String(rating));
        } catch (e) {
            console.error('Error saving feedback rating', e);
        }
    },
    getFeedbackRating: async () => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEYS.FEEDBACK_RATING);
            return value != null ? Number(value) : null;
        } catch (e) {
            console.error('Error getting feedback rating', e);
            return null;
        }
    },
};
