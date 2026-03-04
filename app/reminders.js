import { useRouter } from 'expo-router';
import { Bell, ChevronLeft, ChevronRight, Plus, Trash2, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../utils/storage';

const Reminders = () => {
    const router = useRouter();
    const { fontSize, isDark } = useSettings();
    const [reminders, setReminders] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ date: '', time: '' });

    useEffect(() => {
        const loadReminders = async () => {
            const savedReminders = await storage.getReminders();
            if (savedReminders && Array.isArray(savedReminders) && savedReminders.length > 0) {
                setReminders(savedReminders);
            } else {
                const initialReminders = [
                    { id: 'medication', title: 'İlaç Hatırlatma Saati', date: '', time: '' },
                    { id: 'doctor', title: 'Doktor Randevusu', date: '', time: '' },
                ];
                setReminders(initialReminders);
                await storage.saveReminders(initialReminders);
            }
        };
        loadReminders();
    }, []);

    const handleDelete = async (id) => {
        const updatedReminders = reminders.filter(r => r.id !== id);
        setReminders(updatedReminders);
        await storage.saveReminders(updatedReminders);
    };

    const handleSave = async () => {
        if (!formData.time) return;

        let updatedReminders;
        if (editingId) {
            updatedReminders = reminders.map(r =>
                r.id === editingId ? { ...r, date: formData.date, time: formData.time } : r
            );
        } else {
            updatedReminders = [...reminders, { id: Date.now().toString(), title: 'Hatırlatma', date: formData.date, time: formData.time }];
        }

        setReminders(updatedReminders);
        await storage.saveReminders(updatedReminders);

        setModalVisible(false);
        setEditingId(null);
        setFormData({ date: '', time: '' });
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            date: item.date || '',
            time: item.time || '',
        });
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontSize }]}>Hatırlatmalar</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {reminders.map((item) => (
                    <View key={item.id} style={[styles.listItem, isDark && styles.cardDark]}>
                        <View style={styles.iconContainer}>
                            <Bell size={24} color="#E64A19" />
                        </View>
                        <TouchableOpacity
                            style={styles.contentContainer}
                            onPress={() => handleEdit(item)}
                        >
                            <View style={styles.textColumn}>
                                <Text style={[styles.itemTitle, isDark && styles.textDark, { fontSize: fontSize * 0.8 }]}>{item.title}</Text>
                                <Text style={[styles.timeText, { fontSize: fontSize * 0.7 }]}>
                                    {(item.date || '') && (item.time || '')
                                        ? `${item.date} ${item.time}`
                                        : item.time || item.date || 'Henüz ayarlanmadı'}
                                </Text>
                            </View>
                            <ChevronRight size={20} color="#E64A19" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                            <Trash2 size={24} color="#E64A19" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, isDark && styles.cardDark]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, isDark && styles.textDark, { fontSize }]}>
                                {editingId === 'medication'
                                    ? 'İlaç Hatırlatma Saati'
                                    : editingId === 'doctor'
                                        ? 'Doktor Randevusu'
                                        : editingId
                                            ? 'Hatırlatmayı Düzenle'
                                            : 'Yeni Hatırlatma Ekle'}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X size={24} color={isDark ? "#FFF" : "#000"} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={[styles.input, isDark && styles.inputDark, { fontSize: fontSize * 0.9 }]}
                            placeholder="Tarih (Opsiyonel, Örn: 01.01.2026)"
                            placeholderTextColor={isDark ? "#888" : "#999"}
                            value={formData.date}
                            onChangeText={(t) => setFormData({ ...formData, date: t })}
                        />
                        <TextInput
                            style={[styles.input, isDark && styles.inputDark, { fontSize: fontSize * 0.9 }]}
                            placeholder="Saat (Örn: 09:00)"
                            placeholderTextColor={isDark ? "#888" : "#999"}
                            value={formData.time}
                            onChangeText={(t) => setFormData({ ...formData, time: t })}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={[styles.saveButtonText, { fontSize }]}>KAYDET</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    headerTitle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 15,
    },
    listItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
        padding: 10,
    },
    cardDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
        borderWidth: 1,
    },
    iconContainer: {
        backgroundColor: '#FBE9E7',
        borderRadius: 25,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#EEE',
        paddingRight: 10,
    },
    textColumn: {
        flex: 1,
        paddingRight: 5,
    },
    itemTitle: {
        color: '#333333',
        fontWeight: 'bold',
    },
    timeText: {
        color: '#888888',
        marginTop: 2,
    },
    textDark: {
        color: '#F8FAFC',
    },
    deleteButton: {
        padding: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        color: '#333',
    },
    inputDark: {
        borderColor: '#334155',
        color: '#FFF',
    },
    saveButton: {
        backgroundColor: '#E64A19',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    }
});

export default Reminders;
