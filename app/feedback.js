import { useRouter } from 'expo-router';
import { ChevronLeft, Home, Star } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { storage } from '../utils/storage';

const Feedback = () => {
    const router = useRouter();
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const loadRating = async () => {
            const saved = await storage.getFeedbackRating();
            if (typeof saved === 'number' && !Number.isNaN(saved)) {
                setRating(saved);
            }
        };
        loadRating();
    }, []);

    const handleSave = async () => {
        await storage.saveFeedbackRating(rating);
        router.push('/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Görüşlerim</Text>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Home size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.instructionText}>Bizi değerlendirin.</Text>

                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => setRating(star)}>
                            <Star
                                size={40}
                                color="#000"
                                fill={rating >= star ? "#000" : "transparent"}
                                style={styles.star}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>KAYDET</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7f9',
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    instructionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    star: {
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#E64A19',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Feedback;
