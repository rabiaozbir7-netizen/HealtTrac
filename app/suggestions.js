import { useRouter } from 'expo-router';
import { ChevronLeft, Home, Send, Share2, ThumbsDown, ThumbsUp, Trash2, User } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { storage } from '../utils/storage';

const Suggestions = () => {
    const router = useRouter();
    const { fontSize, isDark } = useSettings();
    const [comment, setComment] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const loadComments = async () => {
            const savedComments = await storage.getFeedComments();
            const defaultSuggestions = [
                {
                    id: 1,
                    author: 'Yönetici',
                    text: 'Bayram ziyaretlerinde dikkat etmemiz gerekenler;\nSosyal mesafemize dikkat edelim✅\nÇok kalabalık ortamlarda uzun süre durmayalım🚭\nHafta maske kullanalım😷,\nSık sık ellerimizi yıkayalım🧼,\nEvimize gelenlere kolonya ikram edelim🧴.\nKendimizi Enfeksiyondan koruyalım💯😇',
                    date: '07.06.25 18:10',
                    likes: 7,
                    dislikes: 0
                },
                {
                    id: 2,
                    author: 'Yönetici',
                    text: 'AİLENİZ VE SEVDİKLERİNİZLE MUTLU, SAĞLIKLI VE HUZURLU BAYRAMLAR GEÇİRMENİZ DİLEĞİYLE 🌸🌸🌸',
                    date: '06.06.25 22:09',
                    likes: 10,
                    dislikes: 0
                },
                {
                    id: 3,
                    author: 'Yönetici',
                    text: 'YANIK TOST TEORİSİNİ HİÇ DUYDUNUZ MU? :)',
                    link: 'https://www.youtube.com/watch?v=WS0y_PXwyAs',
                    date: '07.05.25 19:17',
                    likes: 15,
                    dislikes: 0
                }
            ];

            if (savedComments) {
                // Combine defaults with saved user comments
                setSuggestions([...defaultSuggestions, ...savedComments]);
            } else {
                setSuggestions(defaultSuggestions);
            }
        };
        loadComments();
    }, []);

    const handleLike = (id) => {
        setSuggestions(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
    };

    const handleDislike = (id) => {
        setSuggestions(prev => prev.map(s => s.id === id ? { ...s, dislikes: s.dislikes + 1 } : s));
    };

    const handleAddComment = async () => {
        if (!comment) return;
        const newComment = {
            id: Date.now(),
            author: 'Kullanıcı',
            text: comment,
            date: 'Az önce',
            likes: 0,
            dislikes: 0
        };

        const updatedSuggestions = [...suggestions, newComment];
        setSuggestions(updatedSuggestions);

        // Only persist user comments
        const userComments = updatedSuggestions.filter(s => s.author === 'Kullanıcı');
        await storage.saveFeedComments(userComments);

        setComment('');
    };

    const handleDeleteComment = async (id) => {
        const updatedSuggestions = suggestions.filter(s => s.id !== id);
        setSuggestions(updatedSuggestions);
        const userComments = updatedSuggestions.filter(s => s.author === 'Kullanıcı');
        await storage.saveFeedComments(userComments);
    };

    return (
        <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { fontSize }]}>Sağlık Akışı</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Home size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {suggestions.map((item) => (
                    <View key={item.id} style={[styles.feedCard, isDark && styles.cardDark]}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.avatar, { backgroundColor: item.author === 'Yönetici' ? '#E64A19' : '#ADCC31' }]}>
                                <User size={16} color="#FFF" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.authorName, isDark && styles.textDark, { fontSize: fontSize * 0.9 }]}>{item.author}</Text>
                                <Text style={[styles.dateText, { fontSize: fontSize * 0.7 }]}>{item.date}</Text>
                            </View>
                            {item.author === 'Kullanıcı' && (
                                <TouchableOpacity onPress={() => handleDeleteComment(item.id)} style={styles.deleteBtn}>
                                    <Trash2 size={18} color="#F44336" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.cardBody}>
                            <Text style={[styles.bodyText, isDark && styles.textDark, { fontSize: fontSize * 0.9 }]}>{item.text}</Text>
                            {item.link && (
                                <TouchableOpacity>
                                    <Text style={[styles.linkText, { fontSize: fontSize * 0.8 }]}>{item.link}</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.cardFooter}>
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(item.id)}>
                                    <ThumbsUp size={18} color={isDark ? "#ADCC31" : "#4CAF50"} />
                                    <Text style={[styles.countText, isDark && styles.textDark]}>{item.likes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionBtn} onPress={() => handleDislike(item.id)}>
                                    <ThumbsDown size={18} color="#F44336" />
                                    <Text style={[styles.countText, isDark && styles.textDark]}>{item.dislikes}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Share2 size={18} color="#2196F3" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={[styles.commentArea, isDark && styles.cardDark]}>
                <View style={styles.inputRow}>
                    <TextInput
                        placeholder="Yorum ekle..."
                        placeholderTextColor={isDark ? "#888" : "#999"}
                        style={[styles.input, isDark && styles.inputDark, { fontSize: fontSize * 0.9 }]}
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={handleAddComment}>
                        <Send size={24} color="#E64A19" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
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
        padding: 12,
    },
    feedCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
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
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    authorName: {
        fontWeight: 'bold',
        color: '#1C1E21',
    },
    dateText: {
        color: '#65676B',
    },
    cardBody: {
        marginBottom: 15,
    },
    bodyText: {
        color: '#050505',
        lineHeight: 22,
    },
    linkText: {
        color: '#216FDB',
        marginTop: 8,
        textDecorationLine: 'underline',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EBEDF0',
        paddingTop: 10,
    },
    actions: {
        flexDirection: 'row',
        gap: 20,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    countText: {
        fontSize: 14,
        color: '#65676B',
    },
    textDark: {
        color: '#F8FAFC',
    },
    commentArea: {
        backgroundColor: '#FFF',
        padding: 12,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        maxHeight: 100,
        paddingVertical: 10,
        color: '#000',
    },
    inputDark: {
        color: '#FFF',
    },
    sendBtn: {
        marginLeft: 10,
    }
});

export default Suggestions;
