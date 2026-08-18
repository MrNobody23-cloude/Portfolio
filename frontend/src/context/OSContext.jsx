import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { APP_REGISTRY } from '../config/appRegistry';
import { updateSEO } from '../utils/seo';
import { portfolioAPI } from '../services/api';

const OSContext = createContext(null);

export const THEMES = {
    dark: { name: 'Dark Graphite', bg: '#111311', panel: 'rgba(32, 36, 31, 0.85)', text: '#E8E3D7', accent: '#B89B5E', border: 'rgba(224, 214, 187, 0.14)' },
    light: { name: 'Warm Ivory', bg: '#F3F0E8', panel: 'rgba(239, 235, 225, 0.85)', text: '#252822', accent: '#806A3D', border: 'rgba(38, 42, 35, 0.14)' },
    cyber: { name: 'Cyber Terminal', bg: '#050c18', panel: 'rgba(7, 24, 43, 0.85)', text: '#38bdf8', accent: '#06b6d4', border: 'rgba(14, 165, 233, 0.4)' },
    solarized: { name: 'Solarized Dark', bg: '#002b36', panel: 'rgba(7, 54, 66, 0.85)', text: '#93a1a1', accent: '#2aa198', border: 'rgba(42, 161, 152, 0.3)' },
    midnight: { name: 'Midnight Purple', bg: '#0f0919', panel: 'rgba(24, 15, 38, 0.85)', text: '#f3e8ff', accent: '#a855f7', border: 'rgba(168, 85, 247, 0.3)' },
    paper: { name: 'Clean Paper', bg: '#0d1117', panel: 'rgba(22, 27, 34, 0.85)', text: '#c9d1d9', accent: '#58a6ff', border: 'rgba(48, 54, 61, 0.7)' }
};

export const ACCENT_COLORS = [
    { name: 'Brass Gold', hex: '#B89B5E' },
    { name: 'Olive Green', hex: '#68745E' },
    { name: 'Terracotta Red', hex: '#A96757' },
    { name: 'Sapphire Blue', hex: '#3b82f6' },
    { name: 'Emerald Green', hex: '#10b981' },
    { name: 'Violet Purple', hex: '#8b5cf6' }
];

export function OSProvider({ children }) {
    const [themeKey, setThemeKey] = useState(() => localStorage.getItem('aaryan_os_theme') || 'dark');
    const [accentColor, setAccentColor] = useState(() => localStorage.getItem('aaryan_os_accent') || '#B89B5E');

    const [settings, setSettingsState] = useState(() => {
        const saved = localStorage.getItem('aaryan_os_settings');
        return saved ? JSON.parse(saved) : {
            reducedMotion: false,
            soundEffects: true,
            terminalFontSize: '14px',
            showDesktopIcons: true
        };
    });

    const [hasBooted, setHasBooted] = useState(false);
    const isBooting = !hasBooted;

    // Real Server Health Status: 'checking' | 'online' | 'offline'
    const [serverStatus, setServerStatus] = useState('checking');

    const checkServerHealth = useCallback(async () => {
        try {
            const isHealthy = await portfolioAPI.checkHealth(4000);
            setServerStatus(isHealthy ? 'online' : 'offline');
        } catch {
            setServerStatus('offline');
        }
    }, []);

    useEffect(() => {
        checkServerHealth();
        const interval = setInterval(() => {
            checkServerHealth();
        }, 15000);
        return () => clearInterval(interval);
    }, [checkServerHealth]);

    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [topZIndex, setTopZIndex] = useState(10);
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
    const [isClassicMode, setIsClassicMode] = useState(false);

    const toggleClassicMode = useCallback(() => {
        setIsClassicMode((prev) => {
            const next = !prev;
            const id = Date.now();
            setNotifications((n) => [
                ...n,
                {
                    id,
                    title: next ? 'AARYAN OS // 199X RETRO MODE' : 'AARYAN OS // MODERN MODE',
                    message: next
                        ? 'Retro CRT timeline activated [Ctrl+Alt+A to exit].'
                        : 'Switched back to standard modern desktop operating system.',
                    type: 'info'
                }
            ]);
            setTimeout(() => {
                setNotifications((n) => n.filter((x) => x.id !== id));
            }, 4000);
            return next;
        });
    }, []);

    // Safe partial settings updater
    const setSettings = useCallback((newSettings) => {
        setSettingsState((prev) => {
            const updated = typeof newSettings === 'function' ? newSettings(prev) : { ...prev, ...newSettings };
            localStorage.setItem('aaryan_os_settings', JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Update root CSS variables dynamically whenever accentColor or themeKey changes
    useEffect(() => {
        const root = document.documentElement;
        const currentTheme = THEMES[themeKey] || THEMES.dark;

        if (themeKey === 'light') {
            root.setAttribute('data-theme', 'light');
            root.classList.add('light');
        } else {
            root.setAttribute('data-theme', 'dark');
            root.classList.remove('light');
        }

        root.style.setProperty('--accent-primary', accentColor);
        root.style.setProperty('--accent-hover', `${accentColor}ee`);
        root.style.setProperty('--accent-active', accentColor);
        root.style.setProperty('--accent-glow', `${accentColor}40`);
        root.style.setProperty('--accent-border', `${accentColor}60`);
        root.style.setProperty('--accent-muted', `${accentColor}20`);

        root.style.setProperty('--bg-desktop', currentTheme.bg);
        root.style.setProperty('--bg-panel', currentTheme.panel);
        root.style.setProperty('--text-primary', currentTheme.text);
        root.style.setProperty('--border-panel', currentTheme.border);

        localStorage.setItem('aaryan_os_theme', themeKey);
        localStorage.setItem('aaryan_os_accent', accentColor);
    }, [themeKey, accentColor]);

    const addNotification = useCallback((toast) => {
        const id = Date.now();
        const newToast = { id, title: toast.title, message: toast.message, type: toast.type || 'info' };
        setNotifications((prev) => [...prev, newToast]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 4000);
    }, []);

    const focusWindow = useCallback((id) => {
        setTopZIndex((prev) => {
            const nextZ = prev + 1;
            setWindows((winList) =>
                winList.map((win) =>
                    win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win
                )
            );
            return nextZ;
        });
        setActiveWindowId(id);

        const targetWin = windows.find((w) => w.id === id);
        if (targetWin) {
            const app = APP_REGISTRY.find((a) => a.id === targetWin.appId);
            if (app && app.route && window.location.pathname !== app.route) {
                window.history.pushState({ appId: app.id }, '', app.route);
                setCurrentRoute(app.route);
                updateSEO({ title: app.name, description: app.description, path: app.route });
            }
        }
    }, [windows]);

    const openApp = useCallback((appId, params = {}) => {
        const appDef = APP_REGISTRY.find((a) => a.id === appId);
        if (!appDef) return;

        setIsStartMenuOpen(false);
        setIsCommandPaletteOpen(false);

        const existing = windows.find((w) => w.appId === appId);
        if (existing) {
            if (params && Object.keys(params).length > 0) {
                setWindows((prev) => prev.map((w) => w.id === existing.id ? { ...w, params: { ...w.params, ...params } } : w));
            }
            focusWindow(existing.id);
            return;
        }

        const windowId = `win-${appId}-${Date.now()}`;
        const offset = (windows.length % 6) * 28;
        const isMobile = window.innerWidth < 768;

        const newWin = {
            id: windowId,
            appId,
            title: appDef.name,
            icon: appDef.icon,
            isMinimized: false,
            isMaximized: isMobile,
            position: { x: Math.max(20, 60 + offset), y: Math.max(20, 50 + offset) },
            size: { width: isMobile ? window.innerWidth : 880, height: isMobile ? window.innerHeight - 60 : 580 },
            zIndex: topZIndex + 1,
            params
        };

        setTopZIndex((prev) => prev + 1);
        setWindows((prev) => [...prev, newWin]);
        setActiveWindowId(windowId);

        if (appDef.route && window.location.pathname !== appDef.route) {
            window.history.pushState({ appId }, '', appDef.route);
            setCurrentRoute(appDef.route);
            updateSEO({ title: appDef.name, description: appDef.description, path: appDef.route });
        }
    }, [windows, topZIndex, focusWindow]);

    const closeWindow = useCallback((id) => {
        setWindows((prev) => {
            const filtered = prev.filter((w) => w.id !== id);
            if (activeWindowId === id) {
                const remaining = filtered.filter((w) => !w.isMinimized);
                if (remaining.length > 0) {
                    const topWin = remaining.reduce((max, w) => w.zIndex > max.zIndex ? w : max, remaining[0]);
                    setActiveWindowId(topWin.id);
                } else {
                    setActiveWindowId(null);
                    if (window.location.pathname !== '/') {
                        window.history.pushState({}, '', '/');
                        setCurrentRoute('/');
                        updateSEO({ title: 'Desktop', description: '', path: '/' });
                    }
                }
            }
            return filtered;
        });
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id) => {
        setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const toggleMaximizeWindow = useCallback((id) => {
        setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
        focusWindow(id);
    }, [focusWindow]);

    const updateWindowPosition = useCallback((id, position) => {
        setWindows((prev) => prev.map((w) => w.id === id ? { ...w, position } : w));
    }, []);

    const updateWindowSize = useCallback((id, size) => {
        setWindows((prev) => prev.map((w) => w.id === id ? { ...w, size } : w));
    }, []);

    const resetOSState = useCallback(() => {
        setWindows([]);
        setActiveWindowId(null);
        setThemeKey('dark');
        setAccentColor('#3b82f6');
        setSettingsState({
            reducedMotion: false,
            soundEffects: true,
            terminalFontSize: '14px',
            showDesktopIcons: true
        });
        localStorage.removeItem('aaryan_os_theme');
        localStorage.removeItem('aaryan_os_accent');
        localStorage.removeItem('aaryan_os_settings');
        portfolioAPI.clearCache();
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname;
            setCurrentRoute(path);

            if (path === '/' || path === '') return;
            const matchedApp = APP_REGISTRY.find((a) => a.route === path || path.startsWith(a.route));
            if (matchedApp) {
                openApp(matchedApp.id);
            }
        };

        window.addEventListener('popstate', handlePopState);
        handlePopState();

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                toggleClassicMode();
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen((prev) => !prev);
            } else if (e.key === 'Escape') {
                setIsStartMenuOpen(false);
                setIsCommandPaletteOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleClassicMode]);

    const completeBoot = useCallback(() => {
        setHasBooted(true);
    }, []);

    return (
        <OSContext.Provider
            value={{
                themeKey,
                setThemeKey,
                theme: THEMES[themeKey] || THEMES.dark,
                accentColor,
                setAccentColor,
                settings,
                setSettings,
                resetOSState,
                hasBooted,
                isBooting,
                completeBoot,
                serverStatus,
                checkServerHealth,
                windows,
                activeWindowId,
                openApp,
                closeWindow,
                minimizeWindow,
                toggleMaximizeWindow,
                focusWindow,
                updateWindowPosition,
                updateWindowSize,
                isStartMenuOpen,
                setIsStartMenuOpen,
                isCommandPaletteOpen,
                setIsCommandPaletteOpen,
                notifications,
                addNotification,
                currentRoute,
                isClassicMode,
                toggleClassicMode
            }}
        >
            {children}
        </OSContext.Provider>
    );
}

export function useOS() {
    const context = useContext(OSContext);
    if (!context) {
        throw new Error('useOS must be used within an OSProvider');
    }
    return context;
}
