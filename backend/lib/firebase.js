/**
 * Firebase Admin SDK Initialization
 * 
 * Supports two modes:
 * 1. Production: Uses FIREBASE_SERVICE_ACCOUNT environment variable
 * 2. Development: Uses local serviceAccountKey.json file
 * 
 * For Production Deployment:
 * - Set FIREBASE_SERVICE_ACCOUNT environment variable with your service account JSON
 * 
 * For Local Development:
 * 1. Go to Firebase Console > Project Settings > Service Accounts
 * 2. Click "Generate New Private Key"
 * 3. Save the downloaded JSON file as "serviceAccountKey.json" in backend/lib/
 * 4. Add "serviceAccountKey.json" to .gitignore (already done)
 * 
 * DO NOT commit the service account key to version control!
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db = null;
let serviceAccount = null;

try {
    // Production: Check for environment variable first
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        console.log('🔧 Using Firebase service account from environment variable');
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    }
    // Development: Fall back to local file
    else {
        const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');

        if (existsSync(serviceAccountPath)) {
            console.log('🔧 Using Firebase service account from local file');
            serviceAccount = JSON.parse(
                readFileSync(serviceAccountPath, 'utf8')
            );
        } else {
            console.warn('⚠️ WARNING: No Firebase service account found. Firestore saving will be disabled.');
        }
    }

    // Initialize Firebase Admin if we have credentials
    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        db = admin.firestore();
        console.log('✅ Firebase Admin initialized successfully');
    }
} catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error.message);
}

export { db, admin };
