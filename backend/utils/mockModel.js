export function runMockDetection(file) {
    // Simulate processing delay
    const processingTimeMs = Math.floor(Math.random() * 2000) + 500; // 500-2500ms
    const processingTimeSec = (processingTimeMs / 1000).toFixed(1);

    // Determine media type
    const mediaType = file.mimetype.startsWith('video') ? 'video' : 'audio';

    // Generate realistic mock prediction
    const isFake = Math.random() > 0.5;

    // Confidence tends to be higher for "Real" predictions in real models
    const baseConfidence = isFake
        ? Math.random() * 0.4 + 0.6  // Fake: 0.60-1.00
        : Math.random() * 0.3 + 0.7; // Real: 0.70-1.00

    return {
        label: isFake ? 'Fake' : 'Real',
        confidence: Number(baseConfidence.toFixed(2)),
        processingTime: `${processingTimeSec}s`,
        mediaType
    };
}
