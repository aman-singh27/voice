import { runMockDetection } from '../utils/mockModel.js';
import { db, admin } from '../lib/firebase.js';

export const detectMedia = async (req, res) => {
    try {
        // Validate file presence
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded. Please provide a media file.'
            });
        }

        // Validate userId
        if (!req.body.userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required.'
            });
        }

        // Run mock detection
        const result = runMockDetection(req.file);

        // Save to Firestore (only if db is connected)
        if (db) {
            try {
                await db.collection('uploads').add({
                    userId: req.body.userId,
                    fileName: req.file.originalname,
                    label: result.label,
                    confidence: result.confidence,
                    mediaType: result.mediaType,
                    processingTime: result.processingTime,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            } catch (dbError) {
                console.error('Failed to save to Firestore:', dbError.message);
                // Continue execution, don't fail the request
            }
        }

        // Return success response
        return res.json({
            status: 'success',
            fileName: req.file.originalname,
            label: result.label,
            confidence: result.confidence,
            processingTime: result.processingTime,
            mediaType: result.mediaType
        });

    } catch (err) {
        console.error('Detection error:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error. Please try again.'
        });
    }
};
