import { useRouter } from 'expo-router';
import { BookOpen, Clock, FileText, Heart, Home, Lightbulb, Ribbon, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../utils/storage';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const Dashboard = () => {
    const router = useRouter();
    const { fontSize, isDark } = useSettings();
    const [userName, setUserName] = useState('Kullanıcı');

    useEffect(() => {
        const loadProfile = async () => {
            const profile = await storage.getProfile();
            if (profile && profile.name) {
                setUserName(profile.name.split(' ')[0]);
            }
        };
        loadProfile();
    }, []);

    const menuItems = [
        { id: 'profile', title: 'Profil', icon: User, route: '/profile' },
        { id: 'reminders', title: 'Hatırlatmalar', icon: Clock, route: '/reminders' },
        { id: 'education', title: 'Hastalıklarım', icon: BookOpen, route: '/education' },
        { id: 'diary', title: 'Günlüğüm', icon: FileText, route: '/diary' },
        { id: 'suggestions', title: 'Sağlık Akışı', icon: Lightbulb, route: '/suggestions' },
        { id: 'health', title: 'Hareket Takibi', icon: Heart, route: '/health' },
    ];

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <StatusBar barStyle="light-content" />

            {/* Fixed Orange Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Ribbon size={24} color="#FFFFFF" fill="#FFFFFF" />
                    <Text style={[styles.headerTitle, { fontSize }]}>HealTrack</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Home size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.welcomeSection}>
                    <Text style={[styles.welcomeText, isDark && styles.textDark, { fontSize: fontSize * 1.4 }]}>Merhaba, {userName} 👋</Text>
                    <View style={[styles.welcomeSubContainer, isDark && styles.cardDark]}>
                        <Text style={[styles.subWelcomeText, { fontSize: fontSize * 0.85 }]}>Bugünkü durumun nasıl?</Text>
                    </View>
                </View>

                <View style={styles.grid}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.card, isDark && styles.cardDark]}
                            onPress={() => router.push(item.route)}
                        >
                            <item.icon size={32} color={isDark ? "#ADCC31" : "#E64A19"} strokeWidth={2} />
                            <Text style={[styles.cardTitle, isDark && styles.textDark, { fontSize: fontSize * 0.9 }]}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    containerDark: {
        backgroundColor: '#0F172A',
    },
    header: {
        height: 60,
        backgroundColor: '#E64A19',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 16,
    },
    welcomeSection: {
        marginBottom: 20,
        paddingLeft: 4,
    },
    welcomeText: {
        fontWeight: 'bold',
        color: '#333333',
    },
    welcomeSubContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 8,
        elevation: 1,
    },
    subWelcomeText: {
        color: '#E64A19',
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: cardWidth - 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 1,
    },
    iconContainer: {
        marginBottom: 12,
    },
    cardTitle: {
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center',
    },
    textDark: {
        color: '#F8FAFC',
    }
});

export default Dashboard;
