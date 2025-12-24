/**
 * Profile Stats Fetcher Service
 * Fetches live statistics from various coding platforms
 */

// LeetCode GraphQL API endpoint
const LEETCODE_API = 'https://leetcode.com/graphql/';

// GitHub REST API endpoint
const GITHUB_API = 'https://api.github.com';

/**
 * Fetch LeetCode user stats using GraphQL API
 * @param {string} username - LeetCode username
 * @returns {Promise<object>} - Stats object with problems solved, ranking, etc.
 */
async function fetchLeetCodeStats(username) {
    try {
        const query = `
            query getUserProfile($username: String!) {
                matchedUser(username: $username) {
                    username
                    profile {
                        ranking
                        reputation
                        starRating
                    }
                    submitStatsGlobal {
                        acSubmissionNum {
                            difficulty
                            count
                        }
                    }
                }
            }
        `;

        const response = await fetch(LEETCODE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            body: JSON.stringify({
                query,
                variables: { username }
            })
        });

        if (!response.ok) {
            throw new Error(`LeetCode API returned ${response.status}`);
        }

        const data = await response.json();

        if (!data.data?.matchedUser) {
            throw new Error('User not found on LeetCode');
        }

        const user = data.data.matchedUser;
        const submissions = user.submitStatsGlobal?.acSubmissionNum || [];

        // Calculate total problems solved
        const totalSolved = submissions.reduce((sum, item) => {
            if (item.difficulty !== 'All') {
                return sum + item.count;
            }
            return sum;
        }, 0);

        // Get counts by difficulty
        const easy = submissions.find(s => s.difficulty === 'Easy')?.count || 0;
        const medium = submissions.find(s => s.difficulty === 'Medium')?.count || 0;
        const hard = submissions.find(s => s.difficulty === 'Hard')?.count || 0;

        return {
            problems: `${totalSolved}+`,
            ranking: user.profile?.ranking ? `#${user.profile.ranking.toLocaleString()}` : 'N/A',
            solved: `${easy}E/${medium}M/${hard}H`
        };
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error.message);
        return {
            problems: 'N/A',
            ranking: 'N/A',
            solved: 'N/A'
        };
    }
}

/**
 * Fetch GitHub user stats using REST API
 * @param {string} username - GitHub username
 * @returns {Promise<object>} - Stats object with repos, followers, etc.
 */
async function fetchGitHubStats(username) {
    try {
        const response = await fetch(`${GITHUB_API}/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-App'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const data = await response.json();

        return {
            repos: `${data.public_repos}+`,
            followers: `${data.followers}+`,
            following: `${data.following}`
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error.message);
        return {
            repos: 'N/A',
            followers: 'N/A',
            following: 'N/A'
        };
    }
}

/**
 * Main function to fetch stats based on platform
 * @param {string} platform - Platform name (e.g., 'LeetCode', 'GitHub')
 * @param {string} profileUrl - URL to the user's profile
 * @returns {Promise<object>} - Stats object for the platform
 */
async function fetchProfileStats(platform, profileUrl) {
    // Extract username from profile URL
    const urlParts = profileUrl.replace(/\/$/, '').split('/');
    const username = urlParts[urlParts.length - 1];

    switch (platform.toLowerCase()) {
        case 'leetcode':
            return await fetchLeetCodeStats(username);
        case 'github':
            return await fetchGitHubStats(username);
        default:
            console.warn(`Unknown platform: ${platform}`);
            return {};
    }
}

module.exports = {
    fetchProfileStats,
    fetchLeetCodeStats,
    fetchGitHubStats
};
