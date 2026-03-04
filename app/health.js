import { useRouter } from 'expo-router';
import { CheckCircle2, ChevronLeft, Circle, Plus, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../utils/storage';

const Health = () => {
    const router = useRouter();
    const { fontSize, isDark } = useSettings();
    const [movements, setMovements] = useState([
        { id: '1', title: 'Sabah Yürüyüşü', completed: false },
        { id: '2', title: 'Esneme Hareketleri', completed: false },
        { id: '3', title: 'Hafif Egzersiz', completed: false },
        { id: '4', title: 'Nefes Çalışması', completed: false },
        { id: '5', title: 'Akşam Yürüyüşü', completed: false },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        const load = async () => {
            const savedStatus = await storage.getMovementStatus();
            if (savedStatus) {
                if (savedStatus.movements) {
                    // Full movements list saved
                    setMovements(savedStatus.movements);
                } else {
                    // Legacy: only completion flags saved
                    setMovements(prev => prev.map(m => ({
                        ...m,
                        completed: savedStatus[m.id] || false
                    })));
                }
            }
        };
        load();
    }, []);

    const persist = async (updatedMovements) => {
        await storage.saveMovementStatus({ movements: updatedMovements });
    };

    const toggleMovement = async (id) => {
        const updated = movements.map(m =>
            m.id === id ? { ...m, completed: !m.completed } : m
        );
        setMovements(updated);
        await persist(updated);
    };

    const handleAddMovement = async () => {
        if (!newTitle.trim()) return;
        const newItem = { id: Date.now().toString(), title: newTitle.trim(), completed: false };
        const updated = [...movements, newItem];
        setMovements(updated);
        await persist(updated);
        setNewTitle('');
        setModalVisible(false);
    };

    const handleDelete = async (id) => {
        Alert.alert('Sil', 'Bu hareketi silmek istediğinize emin misiniz?', [
            { text: 'İptal', style: 'cancel' },
            {
                text: 'Sil', style: 'destructive', onPress: async () => {
                    const updated = movements.filter(m => m.id !== id);
                    setMovements(updated);
                    await persist(updated);
                }
            }
        ]);
    };

    const completedCount = movements.filter(m => m.completed).length;

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontSize }]}>Günlük Hareket Takibi</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Plus size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Progress bar */}
            <View style={[styles.progressCard, isDark && styles.cardDark]}>
                <Text style={[styles.progressLabel, isDark && styles.textDark, { fontSize: fontSize * 0.85 }]}>
                    Bugünkü İlerleme: {completedCount}/{movements.length}
                </Text>
                <View style={styles.progressBarBg}>
                    <View style={[
                        styles.progressBar,
                        {
                            width: movements.length === 0 ? '0%' : `${(completedCount / movements.length) * 100}%`,
                            backgroundColor: completedCount === movements.length ? '#ADCC31' : '#E64A19'
                        }
                    ]} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {movements.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.listItem, isDark && styles.cardDark, item.completed && styles.listItemDone]}
                        onPress={() => toggleMovement(item.id)}
                        onLongPress={() => handleDelete(item.id)}
                    >
                        <View style={styles.checkArea}>
                            {item.completed ? (
                                <CheckCircle2 size={28} color="#ADCC31" />
                            ) : (
                                <Circle size={28} color={isDark ? "#555" : "#DDD"} />
                            )}
                        </View>
                        <Text style={[
                            styles.itemTitle,
                            isDark && styles.textDark,
                            item.completed && styles.textCompleted,
                            { fontSize: fontSize * 0.9 }
                        ]}>
                            {item.title}
                        </Text>
                        {item.completed && (
                            <View style={styles.doneBadge}>
                                <Text style={[styles.doneText, { fontSize: fontSize * 0.65 }]}>✓ Yapıldı</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
                <Text style={[styles.hint, { fontSize: fontSize * 0.7 }]}>
                    💡 Uzun basarak silme yapabilirsiniz
                </Text>
            </ScrollView>

            {/* Add Movement Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, isDark && styles.cardDark]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, isDark && styles.textDark, { fontSize }]}>
                                Yeni Hareket Ekle
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X size={24} color={isDark ? "#FFF" : "#000"} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.input, isDark && styles.inputDark, { fontSize: fontSize * 0.9 }]}
                            placeholder="Hareket adı (ör: Sabah Yoga)"
                            placeholderTextColor={isDark ? "#888" : "#999"}
                            value={newTitle}
                            onChangeText={setNewTitle}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleAddMovement}>
                            <Text style={[styles.saveButtonText, { fontSize }]}>EKLE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F2' },
    containerDark: { backgroundColor: '#0F172A' },
    header: {
        height: 60, backgroundColor: '#E64A19',
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: 20,
    },
    headerTitle: { color: '#FFFFFF', fontWeight: 'bold' },
    progressCard: {
        margin: 15, marginBottom: 5, backgroundColor: '#FFF',
        borderRadius: 12, padding: 14, elevation: 2,
    },
    cardDark: { backgroundColor: '#1E293B', borderColor: '#334155', borderWidth: 1 },
    progressLabel: { color: '#333', marginBottom: 8, fontWeight: '600' },
    progressBarBg: { height: 8, backgroundColor: '#EEE', borderRadius: 4, overflow: 'hidden' },
    progressBar: { height: 8, borderRadius: 4 },
    scrollContent: { padding: 15 },
    listItem: {
        backgroundColor: '#FFFFFF', flexDirection: 'row',
        alignItems: 'center', padding: 14,
        borderRadius: 12, marginBottom: 10, elevation: 2,
    },
    listItemDone: { opacity: 0.85 },
    checkArea: { marginRight: 12 },
    itemTitle: { flex: 1, fontWeight: 'bold', color: '#333' },
    textCompleted: { textDecorationLine: 'line-through', color: '#ADCC31' },
    textDark: { color: '#F8FAFC' },
    doneBadge: {
        backgroundColor: '#ADCC31', paddingHorizontal: 10,
        paddingVertical: 4, borderRadius: 20,
    },
    doneText: { color: '#FFF', fontWeight: 'bold' },
    hint: { textAlign: 'center', color: '#AAA', marginTop: 10, marginBottom: 20 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontWeight: 'bold', color: '#333' },
    input: { borderWidth: 1, borderColor: '#EEE', borderRadius: 8, padding: 12, marginBottom: 15, color: '#333' },
    inputDark: { borderColor: '#334155', color: '#FFF', backgroundColor: '#1E293B' },
    saveButton: { backgroundColor: '#E64A19', padding: 14, borderRadius: 10, alignItems: 'center' },
    saveButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default Health;
