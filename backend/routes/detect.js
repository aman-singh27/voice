import express from 'express';
import upload, { handleUploadError } from '../middleware/upload.js';
import { detectMedia } from '../controllers/detectController.js';
import { detectRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// POST /api/detect - Upload and detect deepfake media
// Rate limiter → Upload → Error handler → Controller
router.post('/detect', detectRateLimiter, upload.single('file'), handleUploadError, detectMedia);

export default router;
