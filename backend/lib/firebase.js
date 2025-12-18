/**
 * Firebase Admin SDK Initialization
 * 
 * IMPORTANT: You must create a serviceAccountKey.json file in the backend/lib/ directory.
 * 
 * To get your service account key:
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
const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');

if (existsSync(serviceAccountPath)) {
    try {
        const serviceAccount = JSON.parse(
            readFileSync(serviceAccountPath, 'utf8')
        );

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        db = admin.firestore();
        console.log('✅ Firebase Admin initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize Firebase Admin:', error.message);
    }
} else {
    console.warn('⚠️ WARNING: serviceAccountKey.json not found. Firestore saving will be disabled.');
}

export { db, admin };
