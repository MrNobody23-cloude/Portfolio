import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_REGISTRY } from '../../config/appRegistry';
import { portfolioAPI } from '../../services/api';
import { DynamicIcon } from '../../utils/iconMap';
import { Search, User, Terminal, FileText, Settings, FolderGit2 } from 'lucide-react';

export default function StartMenu() {
    const { openApp, setIsStartMenuOpen, accentColor } = useOS();
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState(null);
    const [featuredProjects, setFeaturedProjects] = useState([]);

    useEffect(() => {
        portfolioAPI.getProfile().then(setProfile).catch(() => { });
        portfolioAPI.getProjects().then((data) => setFeaturedProjects(data.slice(0, 3))).catch(() => { });
    }, []);

    const info = profile?.personalInfo || {};

    const filteredApps = APP_REGISTRY.filter((app) =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-14 left-4 z-[9998] w-96 max-w-[calc(100vw-32px)] bg-slate-900/95 border border-slate-800 text-slate-200 rounded-2xl shadow-2xl backdrop-blur-2xl p-4 flex flex-col space-y-4 animate-slide-up select-none"
        >
            {/* User Header Profile */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-800">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md overflow-hidden border border-slate-700"
                        style={{ backgroundColor: 'var(--accent-glow)' }}
                    >
                        <img
                            src={info.avatar || 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=150'}
                            alt={info.name || 'Aaryan Patel'}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-100">{info.name || 'Aaryan Patel'}</h3>
                        <p className="text-[11px] font-mono text-[var(--accent-primary)] font-semibold">{info.title || 'Software Engineer'}</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setIsStartMenuOpen(false);
                        openApp('terminal');
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Terminal CLI"
                >
                    <Terminal className="w-4 h-4 text-emerald-400" />
                </button>
            </div>

            {/* Start Menu Search Input */}
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search apps, projects, commands..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                    autoFocus
                />
            </div>

            {/* Pinned Applications Grid */}
            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Pinned Applications</span>
                    <span className="text-[10px] text-slate-500 font-mono">{filteredApps.length} Apps</span>
                </div>

                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
                    {filteredApps.map((app) => (
                        <button
                            key={app.id}
                            onClick={() => {
                                openApp(app.id);
                                setIsStartMenuOpen(false);
                            }}
                            className="group p-2.5 rounded-xl hover:bg-slate-800/80 flex flex-col items-center justify-center space-y-1.5 transition-colors border border-transparent hover:border-slate-800"
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow ${app.color}`}>
                                <DynamicIcon name={app.icon} className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-medium text-slate-300 text-center truncate max-w-full">
                                {app.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Featured Projects Quick Links */}
            {featuredProjects.length > 0 && (
                <div className="border-t border-slate-800/80 pt-3 space-y-2">
                    <div className="px-1 text-[11px] font-bold tracking-wider uppercase text-slate-400">
                        Featured Repositories
                    </div>
                    <div className="space-y-1">
                        {featuredProjects.map((proj) => (
                            <button
                                key={proj.id}
                                onClick={() => {
                                    openApp('projects', { projectId: proj.id });
                                    setIsStartMenuOpen(false);
                                }}
                                className="w-full p-2 rounded-xl hover:bg-slate-800/60 flex items-center justify-between transition-colors text-left border border-slate-800/40"
                            >
                                <div className="flex items-center space-x-2.5 truncate">
                                    <FolderGit2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <div className="truncate">
                                        <h4 className="text-xs font-semibold text-slate-200 truncate">{proj.title}</h4>
                                        <p className="text-[10px] text-slate-400 truncate">{proj.category}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono shrink-0 ml-2">
                                    Inspect &gt;
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Footer Actions */}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs">
                <button
                    onClick={() => {
                        openApp('settings');
                        setIsStartMenuOpen(false);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
                >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                </button>

                <button
                    onClick={() => {
                        openApp('resume');
                        setIsStartMenuOpen(false);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
                >
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>Resume PDF</span>
                </button>
            </div>
        </div>
    );
}
