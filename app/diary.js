import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { ChevronLeft, Home, Save } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../utils/storage';

const DailyLog = () => {
    const router = useRouter();
    const { fontSize, isDark } = useSettings();
    const [pain, setPain] = useState(0);
    const [notes, setNotes] = useState('');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await storage.getDailyData();
            if (data && Array.isArray(data)) {
                setLogs(data);
            } else if (data) {
                setLogs([data]);
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        if (!notes.trim() && pain === 0) {
            Alert.alert('Uyarı', 'Lütfen en az bir bilgi girin.');
            return;
        }
        const now = new Date();
        const dateStr = now.toLocaleDateString('tr-TR', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
        const newEntry = { pain, notes, date: dateStr, id: Date.now() };
        const updated = [newEntry, ...logs];
        setLogs(updated);
        await storage.saveDailyData(updated);
        setPain(0);
        setNotes('');
        Alert.alert('HealTrack', 'Günlük kaydınız başarıyla kaydedildi.');
    };

    const getPainColor = (val) => {
        if (val <= 3) return '#4CAF50';
        if (val <= 6) return '#FF9800';
        return '#F44336';
    };

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontSize }]}>Günlüğüm</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Home size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Input Card */}
                <View style={[styles.card, isDark && styles.cardDark]}>
                    <Text style={[styles.sectionLabel, { fontSize: fontSize * 0.95 }]}>
                        Bugünkü Ağrı Şiddeti
                    </Text>
                    <Text style={[styles.painScore, { color: getPainColor(pain), fontSize: fontSize * 2 }]}>
                        {pain}
                    </Text>
                    <Text style={[styles.painDescription, isDark && styles.textDark, { fontSize: fontSize * 0.75 }]}>
                        {pain === 0 ? 'Ağrı yok' : pain <= 3 ? 'Hafif ağrı' : pain <= 6 ? 'Orta ağrı' : 'Şiddetli ağrı'}
                    </Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={10}
                        step={1}
                        value={pain}
                        onValueChange={setPain}
                        minimumTrackTintColor={getPainColor(pain)}
                        maximumTrackTintColor="#D1D1D1"
                        thumbTintColor={getPainColor(pain)}
                    />
                    <View style={styles.sliderLabels}>
                        <Text style={[styles.sliderLabel, isDark && styles.textDark, { fontSize: fontSize * 0.7 }]}>0 - Ağrı yok</Text>
                        <Text style={[styles.sliderLabel, isDark && styles.textDark, { fontSize: fontSize * 0.7 }]}>10 - Dayanılmaz</Text>
                    </View>

                    <Text style={[styles.notesLabel, { fontSize: fontSize * 0.9 }]}>Notlarım</Text>
                    <TextInput
                        style={[styles.notesInput, isDark && styles.inputDark, { fontSize: fontSize * 0.85 }]}
                        multiline
                        placeholder="Ağrınız ve genel durumunuzla ilgili notlar ekleyin..."
                        placeholderTextColor={isDark ? "#888" : "#999"}
                        value={notes}
                        onChangeText={setNotes}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Save size={18} color="#FFF" style={{ marginRight: 8 }} />
                        <Text style={[styles.saveButtonText, { fontSize }]}>KAYDET</Text>
                    </TouchableOpacity>
                </View>

                {/* Log History */}
                {logs.length > 0 && (
                    <View style={styles.historySection}>
                        <Text style={[styles.historyTitle, isDark && styles.textDark, { fontSize: fontSize * 0.9 }]}>
                            Geçmiş Kayıtlar
                        </Text>
                        {logs.map((entry) => (
                            <View key={entry.id || entry.timestamp} style={[styles.logCard, isDark && styles.cardDark]}>
                                <View style={styles.logHeader}>
                                    <Text style={[styles.logDate, isDark && styles.textDark, { fontSize: fontSize * 0.75 }]}>
                                        📅 {entry.date}
                                    </Text>
                                    <View style={[styles.painBadge, { backgroundColor: getPainColor(entry.pain) }]}>
                                        <Text style={[styles.painBadgeText, { fontSize: fontSize * 0.75 }]}>
                                            Ağrı: {entry.pain}/10
                                        </Text>
                                    </View>
                                </View>
                                {entry.notes ? (
                                    <Text style={[styles.logNotes, isDark && styles.textDark, { fontSize: fontSize * 0.8 }]}>
                                        {entry.notes}
                                    </Text>
                                ) : null}
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7f9' },
    containerDark: { backgroundColor: '#0F172A' },
    header: {
        height: 60, backgroundColor: '#E64A19',
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: 20,
    },
    headerTitle: { color: '#FFFFFF', fontWeight: 'bold' },
    content: { padding: 20 },
    card: {
        backgroundColor: '#FFFFFF', borderRadius: 16,
        padding: 20, elevation: 2, marginBottom: 20,
    },
    cardDark: { backgroundColor: '#1E293B', borderColor: '#334155', borderWidth: 1 },
    sectionLabel: {
        fontWeight: 'bold', color: '#E64A19',
        textAlign: 'center', marginBottom: 8,
    },
    painScore: {
        textAlign: 'center', fontWeight: 'bold', marginBottom: 4,
    },
    painDescription: {
        textAlign: 'center', color: '#666', marginBottom: 12,
    },
    slider: { width: '100%', height: 44 },
    sliderLabels: {
        flexDirection: 'row', justifyContent: 'space-between',
        marginBottom: 20,
    },
    sliderLabel: { color: '#999' },
    notesLabel: {
        fontWeight: 'bold', color: '#E64A19', marginBottom: 8,
    },
    notesInput: {
        backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#DDD',
        borderRadius: 12, padding: 14, height: 110,
        textAlignVertical: 'top', color: '#333',
    },
    inputDark: { backgroundColor: '#1E293B', borderColor: '#334155', color: '#FFF' },
    saveButton: {
        backgroundColor: '#E64A19', padding: 14, borderRadius: 10,
        alignItems: 'center', marginTop: 16,
        flexDirection: 'row', justifyContent: 'center',
    },
    saveButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
    textDark: { color: '#F8FAFC' },
    historySection: { marginTop: 4 },
    historyTitle: { fontWeight: 'bold', color: '#E64A19', marginBottom: 12 },
    logCard: {
        backgroundColor: '#FFFFFF', borderRadius: 12,
        padding: 14, marginBottom: 10, elevation: 1,
    },
    logHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    logDate: { color: '#666' },
    painBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    painBadgeText: { color: '#FFF', fontWeight: 'bold' },
    logNotes: { color: '#444', lineHeight: 20 },
});

export default DailyLog;
