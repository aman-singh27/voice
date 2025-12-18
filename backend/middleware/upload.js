import multer from 'multer';
import path from 'path';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const ALLOWED_TYPES = {
    'video/mp4': true,
    'video/quicktime': true,
    'video/x-msvideo': true,
    'audio/mpeg': true,
    'audio/wav': true,
    'audio/aac': true
};

// Configure storage (memory storage for processing)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
    if (ALLOWED_TYPES[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type.'), false);
    }
};

// Create multer instance
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

// Error handling middleware
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: 'error',
                message: 'File size exceeds the limit (100MB).'
            });
        }
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    if (err) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    next();
};

export default upload;
