import { db } from '../lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export async function saveDetectionResult(userId, result) {
    try {
        await addDoc(collection(db, 'uploads'), {
            userId,
            fileName: result.fileName,
            mediaType: result.mediaType,
            label: result.label,
            confidence: result.confidence,
            processingTime: result.processingTime,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error saving detection result:', error);
        // Don't throw - allow navigation to continue even if save fails
    }
}

export function subscribeToUserUploads(userId, callback) {
    const q = query(
        collection(db, 'uploads'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const uploads = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(uploads);
    }, (error) => {
        console.error('Error fetching uploads:', error);
        callback([]);
    });
}
