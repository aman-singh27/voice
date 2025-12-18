import admin from 'firebase-admin';

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production: Use environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    // Development: Use local file
    serviceAccount = await import('./serviceAccountKey.json', { with: { type: 'json' } });
    serviceAccount = serviceAccount.default;
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
export { admin };
