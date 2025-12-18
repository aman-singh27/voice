# 🎭 VoiceGuard - Deepfake Detection Platform

A production-ready, full-stack web application for detecting deepfake media using advanced machine learning. Built with React, Node.js, Express, and Firebase.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Firebase](https://img.shields.io/badge/Firebase-10.14-orange)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#️-architecture)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Security](#️-security)
- [Components](#-components)
- [Backend](#-backend)
- [Folder Structure](#-folder-structure)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 🎯 Overview

VoiceGuard is a comprehensive deepfake detection platform that allows users to upload video and audio files for analysis. The system uses machine learning to detect potential deepfake manipulation and provides confidence scores to help users identify synthetic or manipulated content.

### Key Capabilities

- **🔐 Secure Authentication** - Firebase-based user management with role-based access control
- **📤 Media Upload & Detection** - Support for video (MP4, MOV, AVI) and audio (MP3, WAV, AAC) files
- **🤖 AI-Powered Analysis** - Mock ML model with realistic detection results (ready for real ML integration)
- **📊 Confidence Scoring** - Detailed analysis with percentage-based confidence metrics
- **📜 Upload History** - Complete tracking of all user uploads with real-time Firestore sync
- **👑 Admin Dashboard** - System-wide analytics, user monitoring, and trend analysis
- **🎨 Premium UI/UX** - Clean, minimal design inspired by Stripe, Linear, and Vercel
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🛡️ Production Security** - Rate limiting, Helmet headers, input validation, and CORS protection

---

## ✨ Features

### User Features

#### 1. Authentication System
- **Email/Password Authentication** via Firebase
- **User Registration** with automatic Firestore profile creation
- **Role-Based Access Control** (User/Admin roles)
- **Protected Routes** with authentication checks
- **Secure Login/Logout** functionality

#### 2. File Upload & Detection
- **Drag-and-Drop Interface** for easy file uploads
- **File Type Validation** - Only accepts video/audio formats
- **File Size Validation** - Maximum 100MB per file
- **Real-Time Processing** with loading states
- **Error Handling** with user-friendly messages
- **Supported Formats:**
  - Video: MP4, MOV, AVI
  - Audio: MP3, WAV, AAC

#### 3. Detection Results
- **Visual Result Display** with color-coded indicators (Red for Fake, Green for Real)
- **Confidence Meter** with animated progress bar
- **File Details** including name, type, and processing time
- **Conditional Styling** based on detection result
- **Navigation** to history and dashboard

#### 4. Upload History
- **Real-Time Firestore Sync** for instant updates
- **Comprehensive Table View** with all upload details
- **Loading Skeleton** for better UX
- **Empty State** with helpful messaging
- **Responsive Design** for all screen sizes
- **Data Displayed:**
  - File name
  - Detection result (Fake/Real)
  - Confidence percentage
  - Media type
  - Upload timestamp

### Admin Features

#### 5. Admin Dashboard
- **Global Upload Table** - View all user uploads across the system
- **Analytics KPI Cards:**
  - Total uploads count
  - Fake media detection count
  - Real media detection count
  - Average confidence score
- **Daily Activity Charts** - Sparkline visualization of 7-day trends
- **Fake Media Frequency** - Track detection patterns
- **Trend Indicators** - Up/down arrows showing changes
- **Advanced Filtering:**
  - Filter by detection result (All/Fake/Real)
  - Search by filename
- **Real-Time Updates** - Automatic data refresh
- **User Monitoring** - See which users uploaded which files

### Technical Features

#### 6. UI/UX Excellence
- **Premium Design** - Handcrafted, minimal aesthetic
- **Fully Responsive** - Mobile-first approach
- **Error Boundaries** - Graceful error handling
- **Toast Notifications** - Real-time user feedback
- **Loading States** - Skeleton screens and spinners
- **Consistent Spacing** - Professional typography and layout
- **Clean Animations** - Smooth transitions and interactions

#### 7. Security Features
- **Rate Limiting** - 20 requests per 15 minutes per IP
- **Helmet Security Headers** - Protection against common vulnerabilities
- **Input Validation** - File type, size, and content validation
- **CORS Protection** - Configurable cross-origin policies
- **Firestore Security Rules** - Database-level access control
- **Protected API Endpoints** - Server-side validation

#### 8. Performance Optimization
- **Code Splitting** - Lazy-loaded routes for faster initial load
- **React.memo** - Optimized component re-renders
- **useMemo** - Memoized expensive calculations
- **Production Build** - Minified and optimized bundle
- **Clean Build** - Zero warnings in production

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library with hooks
- **React Router 6.21** - Client-side routing with lazy loading
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Vite 5.0** - Next-generation frontend build tool
- **Firebase SDK 10.14** - Authentication and Firestore client
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.18** - Minimal web application framework
- **Multer 1.4** - Multipart/form-data file upload handling
- **Firebase Admin 12.0** - Server-side Firebase integration
- **CORS 2.8** - Cross-origin resource sharing
- **Helmet 8.1** - Security headers middleware
- **Express Rate Limit 8.2** - Rate limiting middleware

### Database & Authentication
- **Firebase Authentication** - Secure user management
- **Cloud Firestore** - NoSQL database for uploads and user data

### Development Tools
- **Nodemon 3.0** - Auto-restart development server
- **PostCSS 8.4** - CSS processing
- **Autoprefixer 10.4** - CSS vendor prefixing

### Deployment (Recommended)
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend API hosting
- **Firebase Hosting** - Alternative frontend hosting

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React Application (Vite)                              │ │
│  │  - Authentication (Firebase Auth)                      │ │
│  │  - File Upload UI (Drag & Drop)                        │ │
│  │  - Results Display                                     │ │
│  │  - History & Admin Dashboard                           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Express.js Server                                     │ │
│  │  - Rate Limiting (20 req/15min)                        │ │
│  │  - Helmet Security Headers                             │ │
│  │  - File Upload Middleware (Multer)                     │ │
│  │  - Detection Controller                                │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
┌──────────────────────┐    ┌──────────────────────┐
│  Firebase Services   │    │  ML Detection        │
│  - Firestore DB      │    │  - Mock Model        │
│  - Admin SDK         │    │  - Processing        │
│  - Server Timestamps │    │  - Confidence Score  │
└──────────────────────┘    └──────────────────────┘
```

### Data Flow

1. **User Authentication**
   - User signs up/logs in via React frontend
   - Firebase Authentication validates credentials
   - User profile created in Firestore `users` collection
   - Auth state managed via React Context

2. **File Upload & Detection**
   - User uploads file through drag-and-drop interface
   - File validated on client (type, size)
   - File sent to Express backend via `/api/detect` endpoint
   - Rate limiter checks request count
   - Multer middleware processes file upload
   - Detection controller runs ML analysis
   - Result saved to Firestore `uploads` collection
   - Response returned to frontend

3. **History & Dashboard**
   - Frontend queries Firestore for user-specific uploads
   - Real-time listeners update UI automatically
   - Admin dashboard queries all uploads with filtering
   - Analytics calculated from Firestore data

### Firestore Data Models

#### Users Collection (`users/{userId}`)
```javascript
{
  name: string,           // User's full name
  email: string,          // User's email address
  role: "user" | "admin", // User role for access control
  createdAt: Timestamp    // Account creation timestamp
}
```

#### Uploads Collection (`uploads/{uploadId}`)
```javascript
{
  userId: string,         // Reference to user who uploaded
  fileName: string,       // Original filename
  label: "Fake" | "Real", // Detection result
  confidence: number,     // Confidence score (0-1)
  mediaType: "video" | "audio", // Type of media
  processingTime: string, // Time taken to process (e.g., "1.3s")
  createdAt: Timestamp    // Upload timestamp
}
```

---

## 📦 Installation

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Firebase Project** ([Create one](https://console.firebase.google.com/))
- **Git** for version control

### Step 1: Clone Repository

```bash
git clone <your-repository-url>
cd voice
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### Step 4: Firebase Setup

#### 4.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Follow the setup wizard
4. Enable **Email/Password** authentication:
   - Go to Authentication → Sign-in method
   - Enable Email/Password provider
5. Create **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode
   - Choose a location

#### 4.2 Get Firebase Configuration

1. Go to Project Settings → General
2. Scroll to "Your apps" section
3. Click "Web" icon to add a web app
4. Copy the Firebase configuration object

#### 4.3 Get Service Account Key

1. Go to Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file as `backend/lib/serviceAccountKey.json`
4. **IMPORTANT:** Never commit this file to version control

### Step 5: Configure Environment Variables

#### Frontend Environment (`.env`)

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# API Configuration
VITE_API_BASE_URL=http://localhost:5000
```

#### Backend Environment (Optional)

The backend uses default values, but you can create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
```

### Step 6: Configure Firestore Security Rules

In Firebase Console → Firestore Database → Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own profile
      allow read: if request.auth != null && request.auth.uid == userId;
      // Users can create/update their own profile
      allow write: if request.auth != null && request.auth.uid == userId;
      // Admins can read all user profiles
      allow read: if isAdmin();
    }
    
    // Uploads collection
    match /uploads/{uploadId} {
      // Users can read their own uploads
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      // Admins can read all uploads
      allow read: if isAdmin();
      // Authenticated users can create uploads
      allow create: if request.auth != null;
      // No updates or deletes allowed
      allow update, delete: if false;
    }
  }
}
```

### Step 7: Create Admin User

1. Start the application (see next section)
2. Sign up for a new account
3. Go to Firebase Console → Firestore Database
4. Find your user document in the `users` collection
5. Edit the document and change `role` from `"user"` to `"admin"`
6. Refresh the application to access admin features

---

## 🚀 Running the Application

### Development Mode

You need to run both frontend and backend servers simultaneously.

#### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

**Console Output:**
```
🚀 VoiceGuard API running on http://localhost:5000
📊 Health check: http://localhost:5000/health
🎯 Detection endpoint: http://localhost:5000/api/detect
```

#### Terminal 2: Start Frontend Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

**Console Output:**
```
  VITE v5.0.8  ready in 423 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

### Production Build

#### Build Frontend

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

#### Preview Production Build

```bash
npm run preview
```

#### Run Backend in Production

```bash
cd backend
npm start
```

---

## 🌐 Deployment

### Frontend Deployment (Vercel)

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add Environment Variables:
   - Add all `VITE_*` variables from your `.env`
   - Set `VITE_API_BASE_URL` to your backend URL
7. Click "Deploy"

### Backend Deployment (Render)

1. **Prepare Backend**
   - Ensure `package.json` has `"start": "node server.js"` script
   - Add `backend/lib/serviceAccountKey.json` to `.gitignore`

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** voiceguard-api
     - **Root Directory:** `backend`
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Add Environment Variables**
   - `PORT=5000`
   - `NODE_ENV=production`
   - Add Firebase service account as a secret file or environment variable

4. **Configure CORS**
   - Update `backend/server.js`:
   ```javascript
   app.use(cors({ 
     origin: 'https://your-frontend-domain.vercel.app' 
   }));
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically

### Alternative: Firebase Hosting (Frontend)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Select options:
# - Public directory: dist
# - Single-page app: Yes
# - Automatic builds: No

# Build and deploy
npm run build
firebase deploy --only hosting
```

### Post-Deployment Checklist

- [ ] Test authentication (signup/login)
- [ ] Test file upload and detection
- [ ] Verify history page loads correctly
- [ ] Check admin dashboard (if admin user)
- [ ] Test on mobile devices
- [ ] Verify CORS is working
- [ ] Check rate limiting is active
- [ ] Monitor error logs

---

## 📡 API Documentation

### Base URL

- **Development:** `http://localhost:5000`
- **Production:** `https://your-api-domain.com`

### Endpoints

#### 1. Health Check

**GET** `/health`

Check if the API server is running.

**Response:**
```json
{
  "status": "success",
  "message": "VoiceGuard API is running",
  "timestamp": "2025-12-18T11:00:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Server is running

---

#### 2. Detect Deepfake Media

**POST** `/api/detect`

Upload and analyze media file for deepfake detection.

**Rate Limit:** 20 requests per 15 minutes per IP

**Request:**

Content-Type: `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | Media file (video/audio) |
| `userId` | String | Yes | Firebase user ID |

**Supported File Types:**
- Video: `video/mp4`, `video/quicktime`, `video/x-msvideo`
- Audio: `audio/mpeg`, `audio/wav`, `audio/aac`

**File Size Limit:** 100MB

**Example Request (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', fileObject);
formData.append('userId', currentUser.uid);

const response = await fetch('http://localhost:5000/api/detect', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

**Success Response (200 OK):**
```json
{
  "status": "success",
  "fileName": "sample-video.mp4",
  "label": "Fake",
  "confidence": 0.87,
  "processingTime": "1.3s",
  "mediaType": "video"
}
```

**Error Responses:**

**400 Bad Request** - Invalid file or missing parameters
```json
{
  "status": "error",
  "message": "No file uploaded."
}
```

**400 Bad Request** - Unsupported file type
```json
{
  "status": "error",
  "message": "Unsupported file type."
}
```

**400 Bad Request** - File too large
```json
{
  "status": "error",
  "message": "File size exceeds the limit (100MB)."
}
```

**429 Too Many Requests** - Rate limit exceeded
```json
{
  "status": "error",
  "message": "Too many requests. Please try again later."
}
```

**500 Internal Server Error** - Server error
```json
{
  "status": "error",
  "message": "Detection failed. Please try again."
}
```

**Response Headers:**
- `RateLimit-Limit`: Maximum requests allowed
- `RateLimit-Remaining`: Requests remaining
- `RateLimit-Reset`: Time when limit resets (Unix timestamp)

---

## 🛡️ Security

### Authentication & Authorization

#### Firebase Authentication
- **Email/Password** authentication
- **Secure password** requirements enforced
- **Session management** via Firebase SDK
- **Automatic token refresh**

#### Role-Based Access Control (RBAC)
- **User Role:** Can upload files and view own history
- **Admin Role:** Can access admin dashboard and view all uploads
- **Protected Routes:** Frontend routes protected by authentication checks
- **Admin Routes:** Additional check for admin role

### API Security

#### Rate Limiting
- **Endpoint:** `/api/detect`
- **Limit:** 20 requests per 15 minutes per IP address
- **Purpose:** Prevent abuse, brute force, and DoS attacks
- **Headers:** Returns `RateLimit-*` headers for client tracking

#### Helmet Security Headers
- **Content Security Policy** (CSP) - Disabled for frontend compatibility
- **X-DNS-Prefetch-Control** - Controls DNS prefetching
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME sniffing
- **Strict-Transport-Security** - Enforces HTTPS
- **X-Download-Options** - Prevents file download in IE
- **X-Permitted-Cross-Domain-Policies** - Controls cross-domain policies

#### CORS Protection
- **Configurable origins** - Set allowed domains
- **Development:** `origin: '*'` (all origins allowed)
- **Production:** Specify exact frontend domain
- **Credentials:** Can be enabled for cookie-based auth

### Input Validation

#### File Upload Validation
- **File Type Whitelist:**
  - Video: MP4, MOV, AVI
  - Audio: MP3, WAV, AAC
- **File Size Limit:** 100MB maximum
- **MIME Type Checking:** Server-side validation
- **Empty File Detection:** Rejects zero-byte files
- **Filename Length:** Maximum 255 characters

#### Request Validation
- **Required Fields:** File and userId must be present
- **Type Checking:** Validates data types
- **Sanitization:** Prevents injection attacks

### Data Protection

#### Environment Variables
- **Sensitive Data:** API keys, Firebase config stored in `.env`
- **Never Committed:** `.env` files in `.gitignore`
- **Service Account:** `serviceAccountKey.json` excluded from version control

#### Firestore Security Rules
- **User Isolation:** Users can only read their own data
- **Admin Access:** Admins can read all data
- **Write Protection:** No updates/deletes on uploads
- **Authentication Required:** All operations require auth

#### Error Handling
- **No Internal Details:** Error messages don't expose system internals
- **Generic Messages:** User-friendly error descriptions
- **Server Logging:** Detailed errors logged server-side only

### Best Practices Implemented

- ✅ **HTTPS Only** (in production)
- ✅ **Secure Headers** (Helmet)
- ✅ **Rate Limiting** (Express Rate Limit)
- ✅ **Input Validation** (Multer + custom validators)
- ✅ **CORS Configuration** (Controlled origins)
- ✅ **Authentication** (Firebase Auth)
- ✅ **Authorization** (RBAC)
- ✅ **Database Rules** (Firestore security rules)
- ✅ **Error Handling** (Try-catch blocks)
- ✅ **Environment Variables** (Sensitive data protection)

---

## 🧩 Components

### Frontend Components

#### Layout Components (`src/components/layout/`)

**1. Navbar.jsx**
- Responsive navigation bar
- Authentication-aware (shows different options for logged-in users)
- Admin link for admin users
- Logout functionality
- Mobile-responsive hamburger menu

**2. Container.jsx**
- Reusable container component
- Consistent max-width and padding
- Centers content on the page

**3. PageWrapper.jsx**
- Wraps page content with consistent styling
- Provides padding and background

#### UI Components (`src/components/ui/`)

**1. Button.jsx**
- Reusable button component
- Multiple variants (primary, secondary, danger)
- Loading state support
- Disabled state styling

**2. Input.jsx**
- Styled input field component
- Label support
- Error state styling
- Consistent design system

**3. FileDropzone.jsx**
- Drag-and-drop file upload interface
- File type and size validation
- Visual feedback for drag events
- Error messaging
- File preview

**4. LoadingScreen.jsx**
- Full-screen loading overlay
- Spinner animation
- Optional message display

**5. Toast.jsx**
- Toast notification system
- Success, error, and info variants
- Auto-dismiss functionality
- Smooth animations

**6. StatsChart.jsx**
- Sparkline chart component for admin dashboard
- SVG-based visualization
- 7-day trend display
- Responsive scaling

**7. AccessDenied.jsx**
- Access denied page for unauthorized users
- Clear messaging
- Navigation options

#### System Components (`src/components/system/`)

**1. ErrorBoundary.jsx**
- React error boundary
- Catches JavaScript errors in component tree
- Displays fallback UI
- Prevents app crashes

### Context Providers (`src/context/`)

**1. AuthContext.jsx**
- Manages Firebase authentication state
- Provides `currentUser` and `userRole` to entire app
- Handles user profile fetching from Firestore
- Loading state management

**2. ToastContext.jsx**
- Global toast notification system
- Provides `showToast` function
- Manages toast queue
- Auto-dismiss logic

### Route Protection (`src/routes/`)

**1. ProtectedRoute.jsx**
- Protects routes requiring authentication
- Redirects to login if not authenticated
- Shows loading screen while checking auth

**2. AdminRoute.jsx**
- Protects admin-only routes
- Checks for admin role
- Shows access denied for non-admin users
- Redirects to login if not authenticated

---

## 📄 Pages

### Public Pages

**1. Home.jsx** (`/`)
- Landing page with project showcase
- Feature highlights
- Call-to-action buttons
- Responsive hero section

**2. ProductLanding.jsx** (`/product`)
- Premium product landing page
- Detailed feature descriptions
- Visual demonstrations
- Secondary landing page option

**3. Login.jsx** (`/login`)
- Email/password login form
- Firebase authentication integration
- Error handling
- Link to signup page

**4. Signup.jsx** (`/signup`)
- User registration form
- Creates Firebase auth account
- Creates Firestore user profile
- Automatic login after signup

**5. NotFound.jsx** (`/404`)
- 404 error page
- Helpful navigation links
- Clean design

### Protected Pages (Require Authentication)

**6. Upload.jsx** (`/upload`)
- File upload interface
- Drag-and-drop support
- File validation
- API integration for detection
- Redirects to result page after upload

**7. Result.jsx** (`/result`)
- Displays detection results
- Confidence meter visualization
- File details
- Color-coded result (Fake/Real)
- Navigation to history

**8. History.jsx** (`/history`)
- User's upload history table
- Real-time Firestore sync
- Sortable columns
- Empty state handling
- Loading skeleton

### Admin Pages (Require Admin Role)

**9. AdminDashboard.jsx** (`/admin`)
- System-wide analytics
- KPI cards (total uploads, fake/real counts, avg confidence)
- Daily activity sparkline charts
- Global upload table (all users)
- Advanced filtering (by result, filename)
- Real-time data updates
- Trend indicators

---

## 🔧 Backend

### Server Configuration (`backend/server.js`)

- **Express Application** setup
- **Middleware Stack:**
  - Helmet (security headers)
  - CORS (cross-origin requests)
  - JSON body parser
  - URL-encoded body parser
- **Routes:** `/api` prefix for all API routes
- **Health Check:** `/health` endpoint
- **Error Handlers:**
  - 404 handler for unknown routes
  - Global error handler for uncaught errors
- **Server Startup:** Listens on port 5000 (configurable)

### Routes (`backend/routes/`)

**detect.js**
- **POST** `/api/detect` - Main detection endpoint
- **Middleware Chain:**
  1. Rate limiter (20 req/15min)
  2. File upload (Multer)
  3. Upload error handler
  4. Detection controller

### Controllers (`backend/controllers/`)

**detectController.js**
- **detectMedia** function
- Validates file upload
- Validates userId parameter
- Calls mock ML model
- Saves result to Firestore
- Returns detection result
- Error handling with try-catch

### Middleware (`backend/middleware/`)

**1. upload.js**
- **Multer Configuration:**
  - Memory storage (no disk writes)
  - File type filter (video/audio only)
  - File size limit (100MB)
- **File Filter:** Validates MIME types
- **Error Handler:** Handles Multer errors gracefully

**2. rateLimiter.js**
- **Rate Limit Configuration:**
  - Window: 15 minutes
  - Max requests: 20 per IP
  - Standard headers enabled
- **Custom Handler:** Returns JSON error response
- **Protects Against:**
  - Excessive uploads
  - Brute force attacks
  - DoS attempts

### Utilities (`backend/utils/`)

**mockModel.js**
- **Mock ML Model** for development/testing
- **Simulates Processing Time:** 1-3 seconds
- **Realistic Predictions:**
  - Random Fake/Real label
  - Confidence score (60-95%)
- **Media Type Detection:** Determines video vs audio
- **Ready for Real ML Integration:** Easy to swap with actual model

### Firebase Integration (`backend/lib/`)

**firebase.js**
- **Firebase Admin SDK** initialization
- **Service Account** authentication
- **Firestore Database** connection
- **Server-Side Operations:**
  - Create upload documents
  - Server timestamps
  - Secure data access

---

## 📁 Folder Structure

```
voice/
├── backend/                          # Backend API server
│   ├── controllers/
│   │   └── detectController.js       # Detection business logic
│   ├── lib/
│   │   ├── firebase.js               # Firebase Admin SDK setup
│   │   └── serviceAccountKey.json    # Firebase service account (gitignored)
│   ├── middleware/
│   │   ├── rateLimiter.js            # Rate limiting middleware
│   │   └── upload.js                 # File upload middleware (Multer)
│   ├── routes/
│   │   └── detect.js                 # API routes
│   ├── utils/
│   │   └── mockModel.js              # Mock ML model
│   ├── .gitignore                    # Backend gitignore
│   ├── package.json                  # Backend dependencies
│   ├── package-lock.json
│   └── server.js                     # Express server entry point
│
├── src/                              # React frontend
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.jsx         # Container component
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   └── PageWrapper.jsx       # Page wrapper
│   │   ├── system/
│   │   │   └── ErrorBoundary.jsx     # Error boundary
│   │   └── ui/
│   │       ├── AccessDenied.jsx      # Access denied page
│   │       ├── Button.jsx            # Button component
│   │       ├── FileDropzone.jsx      # File upload dropzone
│   │       ├── Input.jsx             # Input component
│   │       ├── LoadingScreen.jsx     # Loading screen
│   │       ├── StatsChart.jsx        # Sparkline chart
│   │       └── Toast.jsx             # Toast notifications
│   │
│   ├── context/
│   │   ├── AuthContext.jsx           # Authentication context
│   │   └── ToastContext.jsx          # Toast context
│   │
│   ├── lib/
│   │   └── firebase.js               # Firebase client SDK setup
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx        # Admin dashboard
│   │   ├── History.jsx               # Upload history
│   │   ├── Home.jsx                  # Landing page
│   │   ├── Login.jsx                 # Login page
│   │   ├── NotFound.jsx              # 404 page
│   │   ├── ProductLanding.jsx        # Product landing page
│   │   ├── Result.jsx                # Detection result page
│   │   ├── Signup.jsx                # Signup page
│   │   └── Upload.jsx                # Upload page
│   │
│   ├── routes/
│   │   ├── AdminRoute.jsx            # Admin route protection
│   │   └── ProtectedRoute.jsx        # Auth route protection
│   │
│   ├── utils/
│   │   ├── api.js                    # API client functions
│   │   └── firestore.js              # Firestore helper functions
│   │
│   ├── App.jsx                       # Main app component
│   ├── index.css                     # Global styles
│   └── main.jsx                      # React entry point
│
├── .env                              # Environment variables (gitignored)
├── .env.example                      # Environment variable template
├── .gitignore                        # Git ignore rules
├── index.html                        # HTML entry point
├── package.json                      # Frontend dependencies
├── package-lock.json
├── postcss.config.js                 # PostCSS configuration
├── README.md                         # This file
├── tailwind.config.js                # Tailwind CSS configuration
└── vite.config.js                    # Vite configuration
```

---

## 🧪 Testing

### Manual Testing Guide

#### 1. User Flow Testing

**Test Signup Flow:**
1. Navigate to `/signup`
2. Enter name, email, and password
3. Click "Sign Up"
4. Verify redirect to upload page
5. Check Firestore for new user document

**Test Login Flow:**
1. Navigate to `/login`
2. Enter email and password
3. Click "Log In"
4. Verify redirect to upload page
5. Check navbar shows user options

**Test Upload Flow:**
1. Navigate to `/upload`
2. Drag and drop a video/audio file
3. Verify file validation works
4. Click "Upload and Detect"
5. Wait for processing
6. Verify redirect to `/result`
7. Check result display is correct

**Test History Flow:**
1. Navigate to `/history`
2. Verify uploaded file appears in table
3. Check all details are correct
4. Upload another file
5. Verify real-time update

**Test Logout Flow:**
1. Click "Logout" in navbar
2. Verify redirect to home page
3. Try accessing `/upload` directly
4. Verify redirect to `/login`

#### 2. Admin Flow Testing

**Setup Admin User:**
1. Sign up for a new account
2. Go to Firebase Console → Firestore
3. Find user in `users` collection
4. Change `role` to `"admin"`
5. Refresh the application

**Test Admin Dashboard:**
1. Verify "Admin" link appears in navbar
2. Navigate to `/admin`
3. Check KPI cards display correctly
4. Verify sparkline charts render
5. Check global upload table shows all uploads
6. Test filtering by result (All/Fake/Real)
7. Test search by filename
8. Upload a file in another tab
9. Verify real-time update in admin dashboard

#### 3. API Testing

**Test Health Check:**
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "success",
  "message": "VoiceGuard API is running",
  "timestamp": "2025-12-18T11:00:00.000Z"
}
```

**Test Detection Endpoint:**
```bash
curl -X POST http://localhost:5000/api/detect \
  -F "file=@/path/to/video.mp4" \
  -F "userId=test-user-id"
```

**Test Rate Limiting:**
- Make 21 requests within 15 minutes
- Verify 21st request returns 429 error

**Test File Validation:**
- Upload a .txt file → Should reject
- Upload a 150MB file → Should reject
- Upload without file → Should reject
- Upload without userId → Should reject

#### 4. Security Testing

**Test Protected Routes:**
1. Logout completely
2. Try accessing `/upload` → Should redirect to `/login`
3. Try accessing `/history` → Should redirect to `/login`
4. Try accessing `/admin` → Should redirect to `/login`

**Test Admin Routes:**
1. Login as regular user (non-admin)
2. Try accessing `/admin` → Should show access denied
3. Login as admin
4. Access `/admin` → Should work

**Test CORS:**
- Make request from different origin
- Verify CORS headers are present

**Test Firestore Rules:**
1. Try reading another user's uploads → Should fail
2. Try updating an upload document → Should fail
3. Try deleting an upload document → Should fail

#### 5. Responsive Design Testing

**Desktop (1920x1080):**
- All pages render correctly
- No horizontal scroll
- Proper spacing and alignment

**Tablet (768x1024):**
- Navbar collapses appropriately
- Tables are scrollable
- Cards stack properly

**Mobile (375x667):**
- All content is accessible
- Touch targets are adequate
- Forms are usable
- No content overflow

#### 6. Error Handling Testing

**Test Network Errors:**
1. Stop backend server
2. Try uploading a file
3. Verify error toast appears
4. Restart backend
5. Try again → Should work

**Test Invalid Credentials:**
1. Try logging in with wrong password
2. Verify error message appears
3. Try with non-existent email
4. Verify error message appears

**Test File Upload Errors:**
1. Upload unsupported file type
2. Verify error message
3. Upload file > 100MB
4. Verify error message

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Firebase Configuration Issues

**Problem:** "Firebase: Error (auth/invalid-api-key)"

**Solution:**
- Verify `.env` file has correct Firebase config
- Check that all `VITE_FIREBASE_*` variables are set
- Ensure no extra spaces in environment variables
- Restart Vite dev server after changing `.env`

**Problem:** "Firebase: Error (auth/configuration-not-found)"

**Solution:**
- Ensure Firebase project has Email/Password auth enabled
- Check Firebase console for project settings
- Verify project ID matches in `.env`

#### 2. Firestore Permission Errors

**Problem:** "Missing or insufficient permissions"

**Solution:**
- Check Firestore security rules are deployed
- Verify user is authenticated
- For admin features, check user role is set to "admin"
- Ensure rules match the format in this README

#### 3. File Upload Issues

**Problem:** "No file uploaded" error

**Solution:**
- Ensure file is selected before clicking upload
- Check file type is supported (video/audio only)
- Verify file size is under 100MB
- Check browser console for JavaScript errors

**Problem:** "Unsupported file type"

**Solution:**
- Only these formats are supported:
  - Video: MP4, MOV, AVI
  - Audio: MP3, WAV, AAC
- Check file extension matches actual file type

#### 4. CORS Errors

**Problem:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution:**
- Verify backend is running
- Check `VITE_API_BASE_URL` in frontend `.env`
- Ensure backend CORS is configured correctly
- In production, set specific origin in `backend/server.js`

#### 5. Rate Limiting Issues

**Problem:** "Too many requests. Please try again later."

**Solution:**
- Wait 15 minutes for rate limit to reset
- Check if multiple users are on same IP
- In development, you can temporarily increase limit in `backend/middleware/rateLimiter.js`

#### 6. Admin Dashboard Not Accessible

**Problem:** "Access Denied" when trying to access `/admin`

**Solution:**
- Verify user role in Firestore is set to "admin"
- Logout and login again to refresh role
- Check browser console for errors
- Ensure Firestore rules allow admin access

#### 7. Real-Time Updates Not Working

**Problem:** History or admin dashboard doesn't update automatically

**Solution:**
- Check browser console for Firestore errors
- Verify internet connection
- Ensure Firestore rules allow read access
- Try refreshing the page
- Check Firebase quota limits

#### 8. Build Errors

**Problem:** Build fails with dependency errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Problem:** "Cannot find module" errors

**Solution:**
- Check import paths are correct
- Ensure file extensions are included (.js, .jsx)
- Verify file names match imports (case-sensitive)

#### 9. Service Account Issues

**Problem:** Backend can't connect to Firebase

**Solution:**
- Verify `backend/lib/serviceAccountKey.json` exists
- Check file has correct JSON format
- Ensure service account has Firestore permissions
- Download new service account key if needed

#### 10. Environment Variables Not Loading

**Problem:** `undefined` for environment variables

**Solution:**
- Ensure `.env` file is in root directory (not in `src/`)
- Verify variable names start with `VITE_`
- Restart Vite dev server after changing `.env`
- Check for typos in variable names
- Don't use quotes around values in `.env`

### Getting Help

If you encounter issues not covered here:

1. **Check Browser Console** for JavaScript errors
2. **Check Server Logs** for backend errors
3. **Review Firebase Console** for auth/Firestore errors
4. **Verify Environment Variables** are set correctly
5. **Test API Endpoints** with curl or Postman
6. **Check Network Tab** in browser DevTools

---

## 🚀 Future Enhancements

### Backend Improvements

- [ ] **Real ML Model Integration** - Replace mock model with actual deepfake detection AI
- [ ] **File Storage** - Implement AWS S3 or Google Cloud Storage for uploaded files
- [ ] **API Authentication** - Add JWT tokens for API security
- [ ] **Logging** - Implement Winston or Morgan for better logging
- [ ] **Monitoring** - Add Sentry for error tracking
- [ ] **Caching** - Implement Redis for performance
- [ ] **Queue System** - Add Bull for background job processing
- [ ] **Webhooks** - Notify users when processing completes

### Frontend Improvements

- [ ] **Password Reset** - Email-based password recovery
- [ ] **Email Verification** - Verify user emails on signup
- [ ] **Profile Management** - Allow users to update profile
- [ ] **Export History** - Download upload history as CSV/PDF
- [ ] **Advanced Filtering** - More filter options in history
- [ ] **Pagination** - Paginate large upload lists
- [ ] **Dark Mode** - Toggle between light/dark themes
- [ ] **Internationalization** - Multi-language support
- [ ] **Progressive Web App** - Add PWA capabilities
- [ ] **Offline Support** - Service worker for offline access

### Feature Additions

- [ ] **Batch Processing** - Upload multiple files at once
- [ ] **WebSocket Integration** - Real-time processing updates
- [ ] **Video/Audio Preview** - Preview files before upload
- [ ] **Detailed Analysis** - Show frame-by-frame analysis
- [ ] **User Notifications** - Email/push notifications
- [ ] **Admin User Management** - Manage users from dashboard
- [ ] **API Rate Limit Dashboard** - Show usage statistics
- [ ] **Comparison Tool** - Compare multiple files
- [ ] **Report Generation** - Generate PDF reports
- [ ] **Social Sharing** - Share results (with privacy controls)

### Performance Optimizations

- [ ] **Image Optimization** - Compress and lazy-load images
- [ ] **Code Splitting** - Further split code bundles
- [ ] **Service Worker** - Cache static assets
- [ ] **CDN Integration** - Serve assets from CDN
- [ ] **Database Indexing** - Optimize Firestore queries
- [ ] **Compression** - Enable gzip/brotli compression

### Security Enhancements

- [ ] **Two-Factor Authentication** - Add 2FA support
- [ ] **OAuth Integration** - Google/GitHub login
- [ ] **IP Whitelisting** - Restrict API access by IP
- [ ] **Audit Logs** - Track all user actions
- [ ] **Content Security Policy** - Stricter CSP headers
- [ ] **File Scanning** - Scan uploads for malware
- [ ] **Encryption** - Encrypt files at rest

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 VoiceGuard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Technologies

- **React Team** - For the amazing React library
- **Firebase Team** - For Firebase Authentication and Firestore
- **Vercel** - For the Vite build tool and hosting platform
- **Tailwind Labs** - For Tailwind CSS framework
- **Express.js Team** - For the Express framework
- **Lucide** - For beautiful icon library

### Inspiration

- **Stripe** - Design inspiration for clean, minimal UI
- **Linear** - Inspiration for dashboard and analytics
- **Vercel** - Inspiration for landing page design

---

## 📞 Support

For questions, issues, or feature requests:

- **Email:** support@voiceguard.example.com
- **GitHub Issues:** [Create an issue](https://github.com/yourusername/voiceguard/issues)
- **Documentation:** This README file

---

## 👨‍💻 Development Team

**Developed with ❤️ by the VoiceGuard Team**

---

## 📊 Project Stats

- **Total Lines of Code:** ~15,000+
- **Components:** 20+
- **Pages:** 9
- **API Endpoints:** 2
- **Database Collections:** 2
- **Security Features:** 7+
- **Supported File Formats:** 6

---

**VoiceGuard** - Protecting truth in the age of deepfakes 🛡️

*Last Updated: December 18, 2025*
