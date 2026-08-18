function getApiBaseUrl() {
    let raw = (import.meta.env.VITE_API_URL || '').trim();
    if (!raw) {
        return 'http://localhost:5000/api';
    }
    // Strip trailing slashes
    raw = raw.replace(/\/+$/, '');
    // Ensure /api is at the end if not already present
    if (!raw.endsWith('/api')) {
        raw = `${raw}/api`;
    }
    return raw;
}

const API_BASE_URL = getApiBaseUrl();

// In-memory client cache to optimize window toggling
const cache = new Map();

async function fetchWithCache(endpoint, options = {}) {
    const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
    if (cache.has(cacheKey) && !options.skipCache) {
        return cache.get(cacheKey);
    }

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        cache.set(cacheKey, data);
        return data;
    } catch (err) {
        console.error(`[AARYAN OS API Error] Failed to fetch ${url}:`, err);
        throw err;
    }
}

export const portfolioAPI = {
    getProfile: (skipCache = false) => fetchWithCache('/profile', { skipCache }),
    getProjects: (skipCache = false) => fetchWithCache('/projects', { skipCache }),
    getProjectById: (id, skipCache = false) => fetchWithCache(`/projects/${id}`, { skipCache }),
    getSkills: (skipCache = false) => fetchWithCache('/skills', { skipCache }),
    getExperience: (skipCache = false) => fetchWithCache('/experience', { skipCache }),
    getEducation: (skipCache = false) => fetchWithCache('/education', { skipCache }),
    getAchievements: (skipCache = false) => fetchWithCache('/achievements', { skipCache }),
    getResume: (skipCache = false) => fetchWithCache('/resume', { skipCache }),
    getProfiles: (skipCache = false) => fetchWithCache('/profiles', { skipCache }),

    checkHealth: async (timeoutMs = 15000) => {
        const url = `${API_BASE_URL}/health`;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const res = await fetch(url, {
                signal: controller.signal,
                cache: 'no-store'
            });
            clearTimeout(timer);
            if (res.ok) {
                const data = await res.json();
                return data && (data.status === 'ok' || Boolean(data.message));
            }
        } catch (err) {
            clearTimeout(timer);
        }

        // Secondary fallback check on root /health if /api/health is unavailable
        const rootHealthUrl = API_BASE_URL.replace(/\/api\/?$/, '/health');
        if (rootHealthUrl !== url) {
            const controller2 = new AbortController();
            const timer2 = setTimeout(() => controller2.abort(), 8000);
            try {
                const res2 = await fetch(rootHealthUrl, {
                    signal: controller2.signal,
                    cache: 'no-store'
                });
                clearTimeout(timer2);
                if (res2.ok) {
                    const data2 = await res2.json();
                    return data2 && (data2.status === 'ok' || Boolean(data2.message));
                }
            } catch (err) {
                clearTimeout(timer2);
            }
        }
        return false;
    },

    sendContact: async (formData) => {
        const url = `${API_BASE_URL}/contact`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (!res.ok) {
            throw new Error(`Failed to send message: HTTP ${res.status}`);
        }
        return await res.json();
    },

    clearCache: () => {
        cache.clear();
        console.log('[AARYAN OS API] Client cache cleared.');
    }
};
