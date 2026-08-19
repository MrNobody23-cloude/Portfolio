const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware Configuration
const rawFrontendUrl = process.env.FRONTEND_URL || '';
const configuredOrigins = rawFrontendUrl
    .split(',')
    .map(url => url.trim().replace(/\/+$/, ''))
    .filter(Boolean);

const defaultAllowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'https://aaryanpatel-portfolio.web.app',
    'https://aaryanpatel-portfolio.firebaseapp.com',
    ...configuredOrigins
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);

        const cleanOrigin = origin.replace(/\/+$/, '');
        const isAllowed = defaultAllowedOrigins.includes(cleanOrigin) ||
            cleanOrigin.endsWith('.vercel.app') ||
            cleanOrigin.endsWith('.web.app') ||
            cleanOrigin.endsWith('.firebaseapp.com') ||
            cleanOrigin.endsWith('.netlify.app') ||
            cleanOrigin.includes('localhost') ||
            process.env.NODE_ENV !== 'production';

        if (isAllowed) {
            return callback(null, true);
        }

        // Return true to avoid crashing preflight OPTIONS or public portfolio requests
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    if (process.env.FRONTEND_URL) {
        console.log(`🚀 Server running online`);
    }
    else {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    }
});
