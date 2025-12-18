import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import detectRouter from './routes/detect.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers (helmet) - applied first
app.use(helmet({
    contentSecurityPolicy: false // Disabled to avoid blocking frontend requests
}));

// Middleware
// CORS: Allow frontend URL from environment variable (production)
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', detectRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'VoiceGuard API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 VoiceGuard API running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🎯 Detection endpoint: http://localhost:${PORT}/api/detect`);
});
