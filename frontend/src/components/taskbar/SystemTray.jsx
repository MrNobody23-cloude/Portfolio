import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Wifi, Sun, Moon, Volume2, Activity, Bell } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export default function SystemTray() {
    const { openApp, themeKey, setThemeKey, settings, serverStatus, checkServerHealth } = useOS();
    const [timeStr, setTimeStr] = useState('');
    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setDateStr(now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = (e) => {
        e.stopPropagation();
        playSound('click', settings.soundEffects);
        const themes = ['dark', 'cyber', 'solarized', 'midnight', 'paper'];
        const nextIdx = (themes.indexOf(themeKey) + 1) % themes.length;
        setThemeKey(themes[nextIdx]);
    };

    return (
        <div className="flex items-center space-x-2 text-xs text-slate-300 select-none">

            {/* Real Server Health Status Indicator */}
            <button
                onClick={checkServerHealth}
                className="flex items-center space-x-1.5 px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-800 text-[11px] hover:bg-slate-800 transition-colors"
                title={`Backend API Status: ${(serverStatus || 'checking').toUpperCase()} (Click to re-check)`}
            >
                {serverStatus === 'online' && (
                    <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
                        <span className="hidden lg:inline text-emerald-400 font-bold">ONLINE</span>
                    </>
                )}
                {serverStatus === 'offline' && (
                    <>
                        <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                        <span className="hidden lg:inline text-rose-400 font-bold">OFFLINE</span>
                    </>
                )}
                {serverStatus === 'checking' && (
                    <>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span className="hidden lg:inline text-amber-400 font-bold">CHECKING</span>
                    </>
                )}
            </button>

            {/* System Status App Shortcut */}
            <button
                onClick={() => openApp('system-status')}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center space-x-1"
                title="System Diagnostics"
            >
                <Activity className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Real-time Clock */}
            <div
                onClick={() => openApp('settings')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-right cursor-pointer transition-colors"
            >
                <div className="font-semibold text-slate-200 text-xs leading-none">{timeStr}</div>
                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">{dateStr}</div>
            </div>
        </div>
    );
}
