const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Helper function to read JSON files
const readJSONFile = (filename) => {
    const filePath = path.join(__dirname, '../data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

// GET /api/skills - Get all skills
router.get('/skills', (req, res) => {
    try {
        const skills = readJSONFile('skills.json');
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch skills' });
    }
});

// GET /api/projects - Get all projects
router.get('/projects', (req, res) => {
    try {
        const projects = readJSONFile('projects.json');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// GET /api/experience - Get experience timeline
router.get('/experience', (req, res) => {
    try {
        const experience = readJSONFile('experience.json');
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch experience' });
    }
});

// GET /api/achievements - Get achievements
router.get('/achievements', (req, res) => {
    try {
        const achievements = readJSONFile('achievements.json');
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// GET /api/profiles - Get coding profiles with live stats
router.get('/profiles', async (req, res) => {
    try {
        const profiles = readJSONFile('profiles.json');
        const { fetchProfileStats } = require('../services/profileFetcher');

        // Fetch live stats for each profile in parallel
        const profilesWithStats = await Promise.all(
            profiles.map(async (profile) => {
                const stats = await fetchProfileStats(profile.platform, profile.profileUrl);
                return {
                    ...profile,
                    stats
                };
            })
        );

        res.json(profilesWithStats);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
});

// GET /api/about - Get about section data
router.get('/about', (req, res) => {
    try {
        const about = readJSONFile('about.json');
        res.json(about);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch about data' });
    }
});

module.exports = router;
