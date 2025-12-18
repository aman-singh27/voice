export default function StatsChart({ data, color = '#374151' }) {
    if (!data || data.length === 0) {
        return null;
    }

    const width = 200;
    const height = 40;
    const padding = 4;

    // Calculate min and max for scaling
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    // Generate points for polyline
    const points = data.map((d, i) => {
        const x = padding + (i / (data.length - 1)) * (width - padding * 2);
        const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    // Last point for marker
    const lastPoint = data[data.length - 1];
    const lastX = padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2);
    const lastY = height - padding - ((lastPoint.value - min) / range) * (height - padding * 2);

    return (
        <svg
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="mt-4"
        >
            {/* Sparkline */}
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Last point marker */}
            <circle
                cx={lastX}
                cy={lastY}
                r="2"
                fill={color}
            />
        </svg>
    );
}
