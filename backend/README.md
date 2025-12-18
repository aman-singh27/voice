# VoiceGuard Backend API

Production-ready Node.js + Express API for deepfake media detection.

## 📁 Project Structure

```
backend/
├── server.js                 # Main Express server
├── routes/
│   └── detect.js            # Detection route
├── controllers/
│   └── detectController.js  # Detection logic
├── middleware/
│   └── upload.js            # Multer file upload
├── utils/
│   └── mockModel.js         # Mock ML model
└── package.json
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Server will run on: **http://localhost:5000**

### 3. Production Start

```bash
npm start
```

## 📋 API Endpoints

### Health Check

**GET** `/health`

**Response**:
```json
{
  "status": "success",
  "message": "VoiceGuard API is running",
  "timestamp": "2025-12-13T00:18:12.000Z"
}
```

### Detect Media

**POST** `/api/detect`

**Content-Type**: `multipart/form-data`

**Request Body**:
- `file` (required) - Media file (video/audio)
- `userId` (required) - Firebase user ID

**Accepted File Types**:
- Video: `.mp4`, `.mov`, `.avi`
- Audio: `.mp3`, `.wav`, `.aac`

**Max File Size**: 100MB

**Success Response** (200):
```json
{
  "status": "success",
  "fileName": "test-video.mp4",
  "label": "Fake",
  "confidence": 0.87,
  "processingTime": "1.3s",
  "mediaType": "video"
}
```

**Error Responses**:

**400 - No File**:
```json
{
  "status": "error",
  "message": "No file uploaded. Please provide a media file."
}
```

**400 - Unsupported Type**:
```json
{
  "status": "error",
  "message": "Unsupported file type."
}
```

**400 - File Too Large**:
```json
{
  "status": "error",
  "message": "File size exceeds the limit (100MB)."
}
```

**500 - Server Error**:
```json
{
  "status": "error",
  "message": "Internal server error. Please try again."
}
```

## 🧪 Testing with cURL

### Upload Video

```bash
curl -X POST http://localhost:5000/api/detect \
  -F "file=@/path/to/video.mp4" \
  -F "userId=user123"
```

### Upload Audio

```bash
curl -X POST http://localhost:5000/api/detect \
  -F "file=@/path/to/audio.mp3" \
  -F "userId=user123"
```

## 🧩 Architecture

### Separation of Concerns

**server.js**
- Express app setup
- Middleware configuration
- Route mounting
- Error handling

**routes/detect.js**
- Route definitions
- Middleware chaining

**controllers/detectController.js**
- Business logic
- Request validation
- Response formatting

**middleware/upload.js**
- File upload handling
- Type validation
- Size limits
- Error handling

**utils/mockModel.js**
- Mock ML inference
- Realistic predictions
- Extensible for real models

## 🔧 Configuration

### File Upload Limits

Edit `middleware/upload.js`:

```javascript
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
```

### Allowed File Types

Edit `middleware/upload.js`:

```javascript
const ALLOWED_TYPES = {
  'video/mp4': true,
  'video/quicktime': true,
  'video/x-msvideo': true,
  'audio/mpeg': true,
  'audio/wav': true,
  'audio/aac': true
};
```

### CORS Configuration

Edit `server.js`:

```javascript
app.use(cors({ origin: '*' })); // Allow all origins

// Or restrict to specific origin:
app.use(cors({ origin: 'http://localhost:5173' }));
```

### Port Configuration

Set environment variable:

```bash
PORT=5000 npm run dev
```

Or edit `server.js`:

```javascript
const PORT = process.env.PORT || 5000;
```

## 📊 Mock Model Behavior

The mock model (`utils/mockModel.js`) simulates realistic deepfake detection:

**Label Distribution**:
- 50% chance of "Fake"
- 50% chance of "Real"

**Confidence Ranges**:
- Fake predictions: 0.60 - 1.00
- Real predictions: 0.70 - 1.00

**Processing Time**:
- Random: 0.5s - 2.5s

**Media Type Detection**:
- Automatically determined from MIME type

### Replacing with Real Model

To integrate a real ML model:

1. Install ML library (e.g., TensorFlow.js, ONNX Runtime)
2. Update `utils/mockModel.js`:

```javascript
import * as tf from '@tensorflow/tfjs-node';

export async function runRealDetection(file) {
  const model = await tf.loadLayersModel('path/to/model');
  // Process file buffer
  const tensor = preprocessFile(file.buffer);
  const prediction = model.predict(tensor);
  
  return {
    label: prediction > 0.5 ? 'Fake' : 'Real',
    confidence: prediction,
    processingTime: '2.1s',
    mediaType: file.mimetype.startsWith('video') ? 'video' : 'audio'
  };
}
```

3. Update controller to use real function

## 🔐 Security Considerations

### Current Implementation

✅ File type validation  
✅ File size limits  
✅ CORS enabled  
✅ Error message sanitization  

### Production Recommendations

- [ ] Add rate limiting (e.g., express-rate-limit)
- [ ] Implement authentication (JWT, API keys)
- [ ] Add request validation (express-validator)
- [ ] Enable HTTPS
- [ ] Restrict CORS to specific origins
- [ ] Add file scanning (antivirus)
- [ ] Implement logging (Winston, Morgan)
- [ ] Add monitoring (Sentry, DataDog)

## 📝 Code Quality

✅ Clean, readable code  
✅ Consistent formatting  
✅ Separation of concerns  
✅ Error handling  
✅ Modular architecture  
✅ ES6 modules  
✅ Async/await  
✅ Descriptive naming  

## 🚧 Future Enhancements

- [ ] Real ML model integration
- [ ] Database storage (MongoDB, PostgreSQL)
- [ ] File storage (AWS S3, Google Cloud Storage)
- [ ] Batch processing
- [ ] WebSocket for real-time updates
- [ ] Admin analytics endpoints
- [ ] User management
- [ ] API documentation (Swagger)

## 📦 Dependencies

**Production**:
- `express` - Web framework
- `multer` - File upload handling
- `cors` - Cross-origin resource sharing

**Development**:
- `nodemon` - Auto-restart on file changes

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port
PORT=5001 npm run dev
```

### File Upload Fails

- Check file size (max 100MB)
- Verify file type is supported
- Ensure `userId` is included in request

### CORS Errors

- Update CORS origin in `server.js`
- Check frontend is making requests to correct URL

## 📄 License

ISC

---

Built with ❤️ for VoiceGuard
