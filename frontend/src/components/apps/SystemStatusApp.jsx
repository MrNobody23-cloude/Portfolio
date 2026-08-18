import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { portfolioAPI } from '../../services/api';
import { Activity, Cpu, HardDrive, ShieldCheck, Server, RefreshCw } from 'lucide-react';

export default function SystemStatusApp() {
    const { windows, activeWindowId, accentColor, serverStatus, checkServerHealth } = useOS();
    const [projectCount, setProjectCount] = useState(5);
    const [achievementCount, setAchievementCount] = useState(5);

    useEffect(() => {
        portfolioAPI.getProjects().then((data) => setProjectCount(data.length)).catch(() => { });
        portfolioAPI.getAchievements().then((data) => setAchievementCount(data.length)).catch(() => { });
    }, []);

    return (
        <div className="space-y-6 text-slate-200 font-mono text-xs">
            {/* Diagnostics Header */}
            <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                        <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-100 font-sans">AARYAN OS DIAGNOSTICS &amp; METRICS</h2>
                        <p className="text-xs text-slate-400">Live memory, active processes &amp; platform architecture</p>
                    </div>
                </div>
                <button
                    onClick={checkServerHealth}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700 flex items-center space-x-1 text-[11px]"
                    title="Refresh Server Health"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Refresh API</span>
                </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase">ACTIVE WINDOWS</span>
                    <div className="text-xl font-bold text-white">{windows.length}</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase">VERIFIED PROJECTS</span>
                    <div className="text-xl font-bold text-blue-400">{projectCount}</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase">CERTIFICATIONS</span>
                    <div className="text-xl font-bold text-amber-400">{achievementCount}</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase">SERVER STATUS</span>
                    <div className={`text-xl font-bold uppercase ${serverStatus === 'online' ? 'text-emerald-400' : serverStatus === 'offline' ? 'text-rose-400' : 'text-amber-400'
                        }`}>
                        {serverStatus}
                    </div>
                </div>
            </div>

            {/* Active Process List */}
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
                    Running Process Threads ({windows.length})
                </h3>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {windows.map((win) => (
                        <div
                            key={win.id}
                            className={`p-2.5 rounded-xl flex items-center justify-between border ${win.id === activeWindowId
                                ? 'bg-slate-800 border-slate-700 text-white'
                                : 'bg-slate-950/60 border-slate-800 text-slate-400'
                                }`}
                        >
                            <div className="flex items-center space-x-2 truncate">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: win.id === activeWindowId ? accentColor : '#64748b' }}></span>
                                <span className="font-bold">{win.title}</span>
                                <span className="text-[10px] text-slate-500">[{win.appId}]</span>
                            </div>
                            <span className="text-[10px] text-slate-400">z-index: {win.zIndex}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
