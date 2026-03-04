import { useRouter } from 'expo-router';
import { ChevronLeft, FileText, Home, Plus, Trash2, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../utils/storage';

const Section = ({ title, items, isDark, fontSize }) => (
    <View style={{ marginBottom: 14 }}>
        <Text style={{ color: '#FF6F00', fontWeight: 'bold', fontSize: fontSize * 0.95, marginBottom: 6 }}>
            {title}
        </Text>
        {items.map((item, i) => (
            <Text key={i} style={{ color: isDark ? '#E2E8F0' : '#444', fontSize: fontSize * 0.85, lineHeight: 22, marginBottom: 4 }}>
                {'• '}{item}
            </Text>
        ))}
    </View>
);

const Education = () => {
    const router = useRouter();
    const { fontSize, isDark } = useSettings();
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [educationTopics, setEducationTopics] = useState([
        {
            id: 1,
            title: 'Multipl Miyelom Nedir?',
            date: '17.12.24 13:35',
            sections: [
                {
                    title: '📌 Tanım',
                    items: [
                        'Multipl Miyelom (MM), kemik iliğinde bulunan ve antikor üreten plazma hücrelerinin kontrolsüz çoğalmasıyla karakterize bir kan kanseri türüdür.',
                        'Bu durum; kansızlık (anemi), kemik ağrıları, böbrek fonksiyonlarında bozulma ve bağışıklık sisteminin zayıflamasına yol açabilir.',
                        'Erken teşhis ve düzenli tedavi ile hastalık kontrol altına alınabilir bir süreçtir.',
                    ]
                },
                {
                    title: '✅ Öneriler',
                    items: [
                        'Düzenli doktor kontrollerinizi aksatmayın.',
                        'Tedavi takvimize sadık kalın, ilaçlarınızı zamanında alın.',
                        'Beslenmenize dikkat edin; yeterli sıvı alın.',
                    ]
                },
                {
                    title: '⚠️ Dikkat Edilmesi Gerekenler',
                    items: [
                        'Açıklanamayan kemik ağrısı, yorgunluk veya tekrarlayan enfeksiyonlarda sağlık ekibinizle iletişime geçin.',
                        'Bağışıklık sisteminizin hassas olduğunu unutmayın.',
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Ağrı Yönetimi Rehberi',
            date: '17.12.24 13:35',
            sections: [
                {
                    title: '📌 Tanım',
                    items: [
                        'Hastalık seyri veya tedavi yan etkileri nedeniyle oluşan kemik ve eklem ağrılarını yönetmek yaşam kalitesi için kritiktir.',
                    ]
                },
                {
                    title: '✅ Öneriler',
                    items: [
                        'İlaçlarınızı saatinde alın.',
                        'İlaç dışı yöntem olarak; nefes egzersizleri ve hafif meditasyon uygulayabilirsiniz.',
                        'Doktorunuzun onayladığı bölgelere ılık (sıcak değil) uygulama yapabilirsiniz.',
                    ]
                },
                {
                    title: '⚠️ Dikkat Edilmesi Gerekenler',
                    items: [
                        'Aniden şiddetlenen veya uykudan uyandıran yeni bir ağrı oluştuğunda mutlaka sağlık ekibinize haber verin.',
                        'Ağrı kesici ilaçları doktor önerisi olmadan artırmayın.',
                    ]
                }
            ]
        },
        {
            id: 3,
            title: 'Yorgunlukla Baş Etme Stratejileri',
            date: '17.12.24 13:35',
            sections: [
                {
                    title: '📌 Tanım',
                    items: [
                        'Kanserle ilişkili yorgunluk, dinlenmekle geçmeyen derin bir bitkinlik hissidir.',
                    ]
                },
                {
                    title: '✅ Enerji Tasarrufu Stratejileri',
                    items: [
                        'Enerjinizi tasarruflu kullanın; gün içindeki en önemli işlerinizi enerjinizin en yüksek olduğu sabah saatlerine planlayın.',
                        'Gün içinde 15-20 dakikalık kısa şekerlemeler yapın.',
                        'Hareketsizlik yorgunluğu artırır; günde 15-30 dakika arası hafif tempolu yürüyüşler yapın.',
                        'Yürüyüşler kan dolaşımını ve moralinizi iyileştirir.',
                    ]
                },
                {
                    title: '⚠️ Dikkat Edilmesi Gerekenler',
                    items: [
                        'Yorgunluğunuzu sağlık ekibinizle paylaşın; bazen anemi veya başka nedenlerden kaynaklanıyor olabilir.',
                        'Aşırı yorgunluk hissinde aktiviteyi azaltın ve dinlenin.',
                    ]
                }
            ]
        },
        {
            id: 4,
            title: 'Enfeksiyonlardan Korunma',
            date: '17.12.24 13:35',
            sections: [
                {
                    title: '📌 Neden Önemli?',
                    items: [
                        'Multipl Miyelom tedavisi bağışıklık sisteminizi zayıflatır. Bu nedenle enfeksiyonlara karşı daha savunmasız olabilirsiniz.',
                    ]
                },
                {
                    title: '✅ Korunma Önerileri',
                    items: [
                        'Kalabalık ortamlardan kaçının.',
                        'Kişisel hijyeninize ve el yıkamaya azami dikkat gösterin.',
                        'Mevsimsel meyve-sebze tüketerek vücut direncinizi destekleyin.',
                        'Hastalık belirtisi gösteren kişilerle yakın temastan kaçının.',
                    ]
                },
                {
                    title: '⚠️ Dikkat Edilmesi Gerekenler',
                    items: [
                        'Ateş, titreme veya enfeksiyon belirtilerinde hemen sağlık ekibinizle iletişime geçin.',
                        'Tedaviniz boyunca aşı takvimini doktorunuzla görüşün.',
                    ]
                }
            ]
        }
    ]);

    const [newTopic, setNewTopic] = useState({ title: '', content: '' });

    useEffect(() => {
        const loadTopics = async () => {
            const saved = await storage.getEducationTopics();
            if (saved && Array.isArray(saved) && saved.length > 0) {
                setEducationTopics(saved);
            }
        };
        loadTopics();
    }, []);

    const persistTopics = async (nextTopics) => {
        setEducationTopics(nextTopics);
        await storage.saveEducationTopics(nextTopics);
    };

    const handleDelete = async (id) => {
        const updated = educationTopics.filter(topic => topic.id !== id);
        await persistTopics(updated);
    };

    const handleSave = async () => {
        if (!newTopic.title) return;
        const updated = [{
            id: Date.now(),
            title: newTopic.title,
            date: new Date().toLocaleString('tr-TR'),
            sections: [
                {
                    title: '📄 İçerik',
                    items: newTopic.content ? newTopic.content.split('\n').filter(l => l.trim()) : [newTopic.title]
                }
            ]
        }, ...educationTopics];

        await persistTopics(updated);
        setShowAddForm(false);
        setNewTopic({ title: '', content: '' });
    };

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontSize }]}>Hastalıklarım</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => setShowAddForm(true)}>
                        <Plus size={24} color="#ADCC31" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/')}>
                        <Home size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {educationTopics.map((topic) => (
                    <TouchableOpacity
                        key={topic.id}
                        style={[styles.listItem, isDark && styles.cardDark]}
                        onPress={() => setSelectedTopic(topic)}
                    >
                        <View style={styles.itemIcon}>
                            <FileText size={32} color={isDark ? "#ADCC31" : "#888"} />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={[styles.topicTitle, isDark && styles.textDark, { fontSize: fontSize * 0.9 }]}>{topic.title}</Text>
                            <Text style={[styles.dateText, { fontSize: fontSize * 0.6 }]}>Eklenme Tarihi: {topic.date}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(topic.id)}>
                            <Trash2 size={24} color="#E64A19" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Content Detail Modal */}
            <Modal
                visible={!!selectedTopic}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, isDark && styles.cardDark]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, isDark && styles.textDark, { fontSize, color: isDark ? '#FFF' : '#1A1A1A' }]}>{selectedTopic?.title}</Text>
                            <TouchableOpacity onPress={() => setSelectedTopic(null)}>
                                <X size={24} color={isDark ? "#FFF" : "#000"} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ maxHeight: '90%' }}>
                            {selectedTopic?.sections?.map((section, idx) => (
                                <Section
                                    key={idx}
                                    title={section.title}
                                    items={section.items}
                                    isDark={isDark}
                                    fontSize={fontSize}
                                />
                            ))}
                            {/* Fallback for old-format topics */}
                            {!selectedTopic?.sections && (
                                <Text style={[styles.contentBody, isDark && styles.textDark, { fontSize: fontSize * 0.9 }]}>
                                    {selectedTopic?.content}
                                </Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Add Education Modal */}
            <Modal
                visible={showAddForm}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, isDark && styles.cardDark]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, isDark && styles.textDark, { fontSize }]}>Yeni Eğitim Ekle</Text>
                            <TouchableOpacity onPress={() => setShowAddForm(false)}>
                                <X size={24} color={isDark ? "#FFF" : "#000"} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={[styles.input, isDark && styles.inputDark, { fontSize: fontSize * 0.9 }]}
                            placeholder="Eğitim Başlığı"
                            placeholderTextColor={isDark ? "#888" : "#999"}
                            value={newTopic.title}
                            onChangeText={(t) => setNewTopic({ ...newTopic, title: t })}
                        />
                        <TextInput
                            style={[styles.input, styles.textArea, isDark && styles.inputDark, { fontSize: fontSize * 0.9 }]}
                            placeholder="İçerik (her satır madde olarak görünür)"
                            multiline
                            placeholderTextColor={isDark ? "#888" : "#999"}
                            value={newTopic.content}
                            onChangeText={(t) => setNewTopic({ ...newTopic, content: t })}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={[styles.buttonText, { fontSize }]}>KAYDET</Text>
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
    header: { height: 60, backgroundColor: '#E64A19', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
    headerTitle: { color: '#FFFFFF', fontWeight: 'bold' },
    headerRight: { flexDirection: 'row', gap: 12 },
    scrollContent: { padding: 15 },
    listItem: { backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
    cardDark: { backgroundColor: '#1E293B', borderColor: '#334155', borderWidth: 1 },
    itemIcon: { marginRight: 15 },
    itemContent: { flex: 1 },
    topicTitle: { fontWeight: 'bold', color: '#333' },
    dateText: { color: '#999', marginTop: 4 },
    textDark: { color: '#F8FAFC' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 16 },
    modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, maxHeight: '85%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontWeight: 'bold', color: '#333', flex: 1, marginRight: 10 },
    contentBody: { color: '#333', lineHeight: 24 },
    input: { borderWidth: 1, borderColor: '#EEE', borderRadius: 8, padding: 12, marginBottom: 15, color: '#333' },
    textArea: { height: 120, textAlignVertical: 'top' },
    inputDark: { borderColor: '#334155', color: '#FFF', backgroundColor: '#1E293B' },
    saveButton: { backgroundColor: '#E64A19', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#FFF', fontWeight: 'bold' },
});

export default Education;
