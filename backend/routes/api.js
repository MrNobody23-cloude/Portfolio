const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Helper function to read JSON files safely
const readJSONFile = (filename) => {
    const filePath = path.join(__dirname, '../data', filename);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

// GET /api/health - Backend Health Check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), message: 'Portfolio API is running' });
});

// GET /api/profile or /api/about
router.get(['/profile', '/about'], (req, res) => {
    try {
        const data = readJSONFile('about.json');
        if (!data) return res.status(404).json({ error: 'Profile data not found' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// GET /api/projects - Get all projects
router.get('/projects', (req, res) => {
    try {
        const projects = readJSONFile('projects.json') || [];
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// GET /api/projects/:id - Get specific project by ID
router.get('/projects/:id', (req, res) => {
    try {
        const projects = readJSONFile('projects.json') || [];
        const project = projects.find((p) => p.id === req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// GET /api/skills - Get all skills
router.get('/skills', (req, res) => {
    try {
        const skills = readJSONFile('skills.json') || [];
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

// GET /api/experience - Get experience timeline
router.get('/experience', (req, res) => {
    try {
        const experience = readJSONFile('experience.json') || [];
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch experience' });
    }
});

// GET /api/education - Get education background
router.get('/education', (req, res) => {
    try {
        const education = readJSONFile('education.json');
        if (!education) return res.status(404).json({ error: 'Education data not found' });
        res.json(education);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch education' });
    }
});

// GET /api/achievements or /api/certifications - Get achievements
router.get(['/achievements', '/certifications'], (req, res) => {
    try {
        const achievements = readJSONFile('achievements.json') || [];
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// GET /api/resume - Get resume metadata
router.get('/resume', (req, res) => {
    try {
        const resume = readJSONFile('resume.json');
        if (!resume) return res.status(404).json({ error: 'Resume metadata not found' });
        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resume metadata' });
    }
});

// GET /api/profiles - Coding profile URLs and statistics
router.get('/profiles', (req, res) => {
    try {
        const profiles = readJSONFile('profiles.json') || [];
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch coding profiles' });
    }
});

// POST /api/contact - Submit contact form message
router.post('/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields (name, email, message).' });
        }

        console.log(`[CONTACT DISPATCH] From: ${name} (${email}) | Subject: ${subject || 'N/A'}`);
        console.log(`Message: ${message}`);

        res.json({
            success: true,
            message: `Message from ${name} received successfully by Aaryan OS Gateway.`
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process contact message.' });
    }
});

module.exports = router;
