import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter for /api/detect endpoint
 * 
 * Protects against:
 * - Excessive file uploads
 * - Brute force attacks
 * - Denial of service attempts
 * 
 * Configuration:
 * - Window: 15 minutes
 * - Max requests: 20 per IP
 * - Clean JSON error responses
 */

export const detectRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers

    // Custom error handler matching API response format
    handler: (req, res) => {
        res.status(429).json({
            status: 'error',
            message: 'Too many requests. Please try again later.'
        });
    },

    // Skip successful requests from being logged
    skipSuccessfulRequests: false,

    // Skip failed requests from being logged
    skipFailedRequests: false
});
