# 🔥 Firebase Service Account Setup Guide

## Overview
Your backend needs Firebase Admin SDK credentials to save detection results to Firestore. There are two ways to provide these credentials:

1. **Local Development**: Use `serviceAccountKey.json` file
2. **Production Deployment**: Use `FIREBASE_SERVICE_ACCOUNT` environment variable

---

## 📥 Step 1: Download Service Account Key from Firebase

### 1.1 Go to Firebase Console
Visit: [https://console.firebase.google.com/](https://console.firebase.google.com/)

### 1.2 Select Your Project
Click on your VoiceGuard project

### 1.3 Navigate to Service Accounts
1. Click the **⚙️ Settings** icon (top left, next to "Project Overview")
2. Select **Project settings**
3. Click the **Service accounts** tab

### 1.4 Generate New Private Key
1. Scroll down to the **Firebase Admin SDK** section
2. Click the **Generate new private key** button
3. A dialog will appear warning you to keep this key secure
4. Click **Generate key**
5. A JSON file will download automatically (e.g., `voiceguard-xxxxx-firebase-adminsdk-xxxxx.json`)

---

## 💾 Step 2: Save the Service Account Key

### For Local Development

1. **Rename the downloaded file** to `serviceAccountKey.json`
2. **Move it to the correct location**:
   ```
   voice/
   └── backend/
       └── lib/
           └── serviceAccountKey.json  ← Put it here!
   ```

3. **Verify the file structure** - Your `serviceAccountKey.json` should look like this:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "xxxxxxxxxxxxx",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
     "client_id": "xxxxxxxxxxxxx",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
   }
   ```

4. **Security Check**: Verify the file is in `.gitignore`
   - Open `backend/.gitignore`
   - Confirm it contains: `lib/serviceAccountKey.json`
   - ✅ This file will NEVER be committed to Git

---

## 🚀 Step 3: Configure for Production (Render Deployment)

When deploying to Render, you'll use an environment variable instead of the file.

### Option A: Environment Variable (Recommended)

1. **Copy the entire contents** of your `serviceAccountKey.json` file
2. **Go to Render Dashboard** → Your Web Service → Environment
3. **Add a new environment variable**:
   - **Key**: `FIREBASE_SERVICE_ACCOUNT`
   - **Value**: Paste the entire JSON content (as a single line or formatted)

### Option B: Secret File (Alternative)

1. **Go to Render Dashboard** → Your Web Service → Environment
2. **Click "Secret Files"**
3. **Add a new secret file**:
   - **Filename**: `lib/serviceAccountKey.json`
   - **Contents**: Paste the entire JSON content

---

## ✅ Step 4: Verify Setup

### Local Development Test

1. **Start your backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Check the console output**:
   - ✅ Success: `🔧 Using Firebase service account from local file`
   - ✅ Success: `✅ Firebase Admin initialized successfully`
   - ❌ Error: `⚠️ WARNING: No Firebase service account found`

### Production Test (After Deployment)

1. **Check Render logs** for:
   - ✅ `🔧 Using Firebase service account from environment variable`
   - ✅ `✅ Firebase Admin initialized successfully`

2. **Test the API**:
   - Upload a file through your frontend
   - Check if the upload appears in Firestore
   - Go to Firebase Console → Firestore Database → `uploads` collection

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `serviceAccountKey.json` in `.gitignore`
- Use environment variables for production
- Rotate keys if compromised
- Limit service account permissions

### ❌ DON'T:
- Commit `serviceAccountKey.json` to Git
- Share the key publicly
- Hardcode credentials in code
- Use the same key across multiple projects

---

## 🐛 Troubleshooting

### Issue: "No Firebase service account found"
**Solution**: 
- Check if `serviceAccountKey.json` exists in `backend/lib/`
- Verify the file name is exactly `serviceAccountKey.json`
- Ensure the JSON is valid (no syntax errors)

### Issue: "Failed to initialize Firebase Admin"
**Solution**:
- Verify the JSON structure is correct
- Check if the service account has Firestore permissions
- Ensure your Firebase project ID matches

### Issue: "Permission denied" when saving to Firestore
**Solution**:
- Check Firestore security rules
- Verify the service account has the "Firebase Admin SDK Administrator" role
- Go to Firebase Console → IAM & Admin → check permissions

---

## 📚 Additional Resources

- [Firebase Admin SDK Setup](https://firebase.google.com/docs/admin/setup)
- [Service Account Documentation](https://cloud.google.com/iam/docs/service-accounts)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

## 🎯 Quick Checklist

- [ ] Downloaded service account key from Firebase Console
- [ ] Renamed file to `serviceAccountKey.json`
- [ ] Placed file in `backend/lib/` directory
- [ ] Verified file is in `.gitignore`
- [ ] Tested local development (backend starts successfully)
- [ ] (For production) Added `FIREBASE_SERVICE_ACCOUNT` environment variable to Render
- [ ] Verified uploads are saved to Firestore

---

**Need Help?** Check the main README.md or refer to the Firebase Console documentation.
