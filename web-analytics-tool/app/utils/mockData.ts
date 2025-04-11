
// Mock data for our heatmap visualization

export interface HeatmapPoint {
    x: number;
    y: number;
    value: number;
    }
    
    export interface ReplayEvent {
    type: 'move' | 'click' | 'scroll';
    x: number;
    y: number;
    timestamp: number;
    }
    
    export interface SessionData {
    id: string;
    userId: string;
    device: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    duration: number; // in seconds
    startTime: string;
    events: ReplayEvent[];
    conversionSuccess: boolean;
    landingPage: string;
    exitPage: string;
    contentSnapshot?: string; 
    }
    
    export interface AnalyticsData {
    averageSessionDuration: number;
    bounceRate: number;
    conversionRate: number;
    totalSessions: number;
    deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
    };
    mostEngagedPages: Array<{
    page: string;
    engagementScore: number;
    }>;
    }
    
    // Generate random heat map data points
    export const generateHeatmapData = (pointCount: number = 500): HeatmapPoint[] => {
    const points: HeatmapPoint[] = [];
    
    // Create some clusters to make the heatmap more realistic
    const clusters = [
    { centerX: 35, centerY: 30, radius: 20, density: 0.4 }, // Top navigation
    { centerX: 50, centerY: 50, radius: 25, density: 0.3 }, // Middle content
    { centerX: 80, centerY: 65, radius: 15, density: 0.2 }, // Call to action
    { centerX: 20, centerY: 70, radius: 15, density: 0.1 }, // Left sidebar
    ];
    
    // Generate points based on clusters
    for (let i = 0; i < pointCount; i++) {
    // Randomly choose a cluster with some random noise
    const useCluster = Math.random() < 0.85;
    
    if (useCluster) {
    const cluster = clusters[Math.floor(Math.random() * clusters.length)];
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * cluster.radius;
    
    const x = cluster.centerX + Math.cos(angle) * distance;
    const y = cluster.centerY + Math.sin(angle) * distance;
    const value = Math.random() * 0.8 + 0.2; // Value between 0.2 and 1
    
    points.push({ x, y, value });
    } else {
    // Random point anywhere
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const value = Math.random() * 0.3 + 0.1; // Lower values for random points
    
    points.push({ x, y, value });
    }
    }
    
    return points;
    };
    
    // Generate a realistic replay session
    export const generateReplaySession = (duration: number = 20): ReplayEvent[] => {
    const events: ReplayEvent[] = [];
    let timestamp = 0;
    let currentX = Math.random() * 90 + 5;
    let currentY = 10;
    
    // Start with an initial position
    events.push({ type: 'move', x: currentX, y: currentY, timestamp });
    
    // Generate realistic mouse movements
    while (timestamp < duration * 1000) {
    // Advance time by 50-150ms
    timestamp += Math.floor(Math.random() * 100 + 50);
    
    // Randomly move, click, or scroll
    const eventType = Math.random();
    
    if (eventType > 0.95) {
    // Click event
    events.push({ type: 'click', x: currentX, y: currentY, timestamp });
    } else if (eventType > 0.9) {
    // Scroll event
    events.push({ type: 'scroll', x: currentX, y: currentY, timestamp });
    // Move vertically after scroll
    currentY = Math.max(5, Math.min(95, currentY + (Math.random() * 20 - 5)));
    } else {
    // Move event - update position smoothly
    const targetX = Math.max(0, Math.min(100, currentX + (Math.random() * 20 - 10)));
    const targetY = Math.max(0, Math.min(100, currentY + (Math.random() * 10 - 5)));
    
    // Interpolate a few points to make movement smooth
    const steps = Math.floor(Math.random() * 3) + 1;
    for (let i = 1; i <= steps; i++) {
    const interpX = currentX + (targetX - currentX) * (i / steps);
    const interpY = currentY + (targetY - currentY) * (i / steps);
    timestamp += Math.floor(Math.random() * 50 + 20);
    events.push({ type: 'move', x: interpX, y: interpY, timestamp });
    }
    
    currentX = targetX;
    currentY = targetY;
    }
    }
    
    return events;
    };
    
    // Generate mock analytics data
    export const generateAnalyticsData = (): AnalyticsData => {
    return {
    averageSessionDuration: Math.floor(Math.random() * 180 + 60), // 1-4 minutes
    bounceRate: Math.random() * 0.4 + 0.2, // 20-60%
    conversionRate: Math.random() * 0.15 + 0.05, // 5-20%
    totalSessions: Math.floor(Math.random() * 10000 + 1000),
    deviceBreakdown: {
    desktop: Math.random() * 0.5 + 0.3, // 30-80%
    mobile: Math.random() * 0.4 + 0.1, // 10-50%
    tablet: Math.random() * 0.2 // 0-20%
    },
    mostEngagedPages: [
    { page: '/', engagementScore: Math.random() * 0.5 + 0.5 },
    { page: '/products', engagementScore: Math.random() * 0.5 + 0.3 },
    { page: '/pricing', engagementScore: Math.random() * 0.4 + 0.3 },
    { page: '/about', engagementScore: Math.random() * 0.3 + 0.2 },
    { page: '/contact', engagementScore: Math.random() * 0.3 + 0.1 }
    ].sort((a, b) => b.engagementScore - a.engagementScore)
    };
    };
    
    // Generate multiple user sessions
    export const generateSessions = (count: number = 10): SessionData[] => {
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const landingPages = ['/', '/products', '/pricing', '/about', '/blog'];
    const exitPages = [...landingPages, '/checkout', '/contact', '/signup'];
    
    return Array.from({ length: count }).map((_, index) => {
    const duration = Math.floor(Math.random() * 300 + 20); // 20-320 seconds
    const device = ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 2.8)] as 'desktop' | 'mobile' | 'tablet';
    const landingPage = landingPages[Math.floor(Math.random() * landingPages.length)];
    const exitPage = exitPages[Math.floor(Math.random() * exitPages.length)];
    
    // Generate a timestamp within the last 24 hours
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 24));
    date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));
    
    return {
    id: `session-${index + 1}`,
    userId: `user-${Math.floor(Math.random() * 1000) + 1}`,
    device,
    browser: browsers[Math.floor(Math.random() * browsers.length)],
    duration,
    startTime: date.toISOString(),
    events: generateReplaySession(duration),
    conversionSuccess: Math.random() > 0.7,
    landingPage,
    exitPage
    };
    });
    };
    
    export const mockSessions = generateSessions(25);
    export const mockHeatmapData = generateHeatmapData(1000);
    export const mockAnalytics = generateAnalyticsData();