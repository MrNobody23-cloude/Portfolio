import React from 'react';
import { useOS } from '../../context/OSContext';
import { APP_REGISTRY } from '../../config/appRegistry';
import { DynamicIcon } from '../../utils/iconMap';
import SystemTray from './SystemTray';
import { playSound } from '../../utils/soundEffects';
import { Search } from 'lucide-react';

export default function Taskbar() {
    const {
        windows,
        activeWindowId,
        openApp,
        focusWindow,
        minimizeWindow,
        isStartMenuOpen,
        setIsStartMenuOpen,
        setIsCommandPaletteOpen,
        settings
    } = useOS();

    const handleStartClick = (e) => {
        e.stopPropagation();
        playSound('click', settings.soundEffects);
        setIsStartMenuOpen(!isStartMenuOpen);
    };

    const handleTaskbarAppClick = (appId) => {
        playSound('click', settings.soundEffects);
        const openWin = windows.find((w) => w.appId === appId);

        if (!openWin) {
            // App is not open -> launch app
            openApp(appId);
        } else if (openWin.id === activeWindowId && !openWin.isMinimized) {
            // App is open and currently active -> minimize it like Windows
            minimizeWindow(openWin.id);
        } else {
            // App is open but inactive or minimized -> restore and focus it
            focusWindow(openWin.id);
        }
    };

    // Base pinned launcher app IDs
    const pinnedAppIds = ['about', 'projects', 'skills', 'experience', 'education', 'achievements', 'resume', 'terminal', 'explorer', 'settings'];

    // Extract all app IDs for currently open windows in OSContext
    const openAppIds = windows.map((w) => w.appId);

    // Combine pinned apps + any open unpinned apps without duplicates
    const taskbarAppIds = Array.from(new Set([...pinnedAppIds, ...openAppIds]));

    return (
        <footer className="h-12 w-full bg-slate-950/90 border-t border-slate-800/90 flex items-center justify-between px-3 relative z-[9990] select-none backdrop-blur-2xl">
            {/* Left: Start Button & Quick Search */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={handleStartClick}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all duration-200 ${isStartMenuOpen
                        ? 'bg-[var(--accent-muted)] border-[var(--accent-border)] text-white shadow-lg'
                        : 'hover:bg-slate-800/80 text-slate-200 border-transparent'
                        }`}
                >
                    <div
                        className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs text-white bg-[var(--accent-primary)] shadow-sm"
                    >
                        A
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase font-mono hidden sm:inline">
                        AARYAN
                    </span>
                </button>

                {/* Global Search Button (Ctrl+K) */}
                <button
                    onClick={() => setIsCommandPaletteOpen(true)}
                    className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-xs"
                    title="Global Search (Ctrl+K)"
                >
                    <Search className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Search...</span>
                    <kbd className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">⌘K</kbd>
                </button>
            </div>

            {/* Center: Dynamic Taskbar Applications Dock */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none max-w-2xl">
                {taskbarAppIds.map((appId) => {
                    const appDef = APP_REGISTRY.find((a) => a.id === appId);
                    if (!appDef) return null;

                    const openWin = windows.find((w) => w.appId === appId);
                    const isOpen = Boolean(openWin);
                    const isActive = openWin && openWin.id === activeWindowId && !openWin.isMinimized;
                    const isMinimized = openWin && openWin.isMinimized;

                    return (
                        <button
                            key={appId}
                            onClick={() => handleTaskbarAppClick(appId)}
                            className={`group relative p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${isActive
                                ? 'bg-slate-800/90 text-white shadow-md border border-[var(--accent-border)]'
                                : isOpen
                                    ? 'bg-slate-900/80 text-slate-300 hover:bg-slate-800/60 border border-slate-800'
                                    : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent'
                                }`}
                            title={`${appDef.name}${isMinimized ? ' (Minimized)' : isActive ? ' (Active)' : isOpen ? ' (Open)' : ''}`}
                        >
                            <DynamicIcon
                                name={appDef.icon}
                                className="w-4 h-4 transition-transform group-hover:scale-110"
                                style={{ color: isActive ? 'var(--accent-primary)' : undefined }}
                            />

                            {/* Status Indicator LED Dot/Bar */}
                            {isOpen && (
                                <div
                                    className={`absolute bottom-0.5 rounded-full transition-all duration-200 ${isActive
                                        ? 'w-4 h-0.5 bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]'
                                        : 'w-2 h-0.5 bg-[var(--accent-primary)] opacity-60'
                                        }`}
                                ></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Right: System Tray & Clock */}
            <SystemTray />
        </footer>
    );
}
