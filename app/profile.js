import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { ChevronLeft, Home, LogOut, Ribbon, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../utils/storage';

const Profile = () => {
    const router = useRouter();
    const { fontSize, updateFontSize, isDark, toggleTheme, clearAllData } = useSettings();
    const [profile, setProfile] = useState({
        name: '',
        phone: '',
    });

    useEffect(() => {
        const loadProfile = async () => {
            const data = await storage.getProfile();
            if (data) setProfile(data);
        };
        loadProfile();
    }, []);

    const handleUpdate = async (field, value) => {
        const updated = { ...profile, [field]: value };
        setProfile(updated);
        await storage.saveProfile(updated);
    };

    const handleClearData = () => {
        Alert.alert(
            'Verileri Sil',
            'Tüm yerel verileriniz (profil, hatırlatmalar, hareket kayıtları vb.) kalıcı olarak silinecektir. Emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await clearAllData();
                            setProfile({ name: '', phone: '' });
                            Alert.alert('Başarılı', 'Tüm veriler temizlendi.');
                            // Go to dashboard to refresh all states
                            router.replace('/');
                        } catch (error) {
                            console.error('Data clear error:', error);
                            Alert.alert('Hata', 'Veriler silinirken bir sorun oluştu.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profil</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Home size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileAvatar}>
                    <View style={styles.avatarCircle}>
                        <Ribbon size={60} color="#701026" fill="#701026" />
                    </View>
                    <TouchableOpacity style={styles.changePicBtn}>
                        <Text style={styles.changePicText}>RESİM DEĞİŞTİR</Text>
                    </TouchableOpacity>
                    <View style={styles.roleBox}>
                        <Text style={styles.roleText}>YÖNETİCİ ADI / PAROLA AYARLARI</Text>
                    </View>
                </View>

                <View style={[styles.card, isDark && styles.cardDark]}>
                    <View style={styles.inputContainer}>
                        <User size={20} color={isDark ? "#AAA" : "#888"} />
                        <TextInput
                            style={[styles.input, isDark && styles.inputDark, { fontSize }]}
                            value={profile.name}
                            onChangeText={(text) => handleUpdate('name', text)}
                            placeholder="Kullanıcı Adınız"
                            placeholderTextColor={isDark ? "#888" : "#999"}
                        />
                    </View>
                    <TextInput
                        style={[styles.input, isDark && styles.inputDark, { fontSize }]}
                        placeholder="Şifreniz"
                        secureTextEntry
                        placeholderTextColor={isDark ? "#888" : "#999"}
                    />
                    <TextInput
                        style={[styles.input, isDark && styles.inputDark, { fontSize }]}
                        placeholder="Şifreniz Tekrar"
                        secureTextEntry
                        placeholderTextColor={isDark ? "#888" : "#999"}
                    />
                    <TouchableOpacity style={styles.updateButton}>
                        <Text style={[styles.updateText, { fontSize }]}>GÜNCELLE</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.settingsSection}>
                    <Text style={[styles.settingLabel, { fontSize }]}>Yazı Boyutu</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={12}
                        maximumValue={24}
                        step={1}
                        value={fontSize}
                        onValueChange={updateFontSize}
                        minimumTrackTintColor="#ADCC31"
                        thumbTintColor={isDark ? "#ADCC31" : "#E64A19"}
                    />

                    <Text style={[styles.settingLabel, { fontSize }]}>Gece Modunu Etkinleştir</Text>
                    <View style={styles.toggleRow}>
                        <Text style={[styles.modeLabel, isDark && styles.textDark, { fontSize: fontSize * 0.8 }]}>Gündüz Modu</Text>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: "#767577", true: "#E64A19" }}
                        />
                    </View>

                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => Alert.alert('Çıkış', 'Çıkış yapmak istediğinize emin misiniz?')}
                >
                    <LogOut size={20} color="#EF5350" />
                    <Text style={[styles.logoutText, { fontSize }]}>Güvenli Çıkış</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    header: {
        height: 60,
        backgroundColor: '#E64A19',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 20,
    },
    profileAvatar: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginBottom: 10,
    },
    changePicBtn: {
        backgroundColor: '#E64A19',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    changePicText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    roleBox: {
        backgroundColor: '#E64A19',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    roleText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 14,
        color: '#333',
    },
    updateButton: {
        backgroundColor: '#E64A19',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    updateText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    settingsSection: {
        marginTop: 20,
    },
    settingLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#E64A19',
        textAlign: 'center',
        marginBottom: 10,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    modeLabel: {
        fontSize: 12,
        color: '#333',
    },
    actionRow: {
        marginTop: 30,
    },
    fullDataBtn: {
        backgroundColor: '#F44336',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    fullDataText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default Profile;
