import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_REGISTRY } from '../../config/appRegistry';
import { portfolioAPI } from '../../services/api';
import { Search, AppWindow, FolderGit2, Terminal, ArrowRight } from 'lucide-react';
import { DynamicIcon } from '../../utils/iconMap';

export default function CommandPalette() {
    const { isCommandPaletteOpen, setIsCommandPaletteOpen, openApp } = useOS();
    const [query, setQuery] = useState('');
    const [backendProjects, setBackendProjects] = useState([]);

    useEffect(() => {
        if (isCommandPaletteOpen) {
            portfolioAPI.getProjects().then(setBackendProjects).catch(() => { });
        }
    }, [isCommandPaletteOpen]);

    if (!isCommandPaletteOpen) return null;

    const filteredApps = APP_REGISTRY.filter((app) =>
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase())
    );

    const filteredProjects = backendProjects.filter((p) =>
        query !== '' && (
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase())))
        )
    );

    const handleSelectApp = (appId) => {
        openApp(appId);
        setIsCommandPaletteOpen(false);
    };

    return (
        <div
            onClick={() => setIsCommandPaletteOpen(false)}
            className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 select-none"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-4 shadow-2xl space-y-3 animate-fade-in font-sans"
            >
                {/* Search Input Bar */}
                <div className="relative flex items-center border-b border-slate-800 pb-3">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search AARYAN OS apps, projects, commands..."
                        autoFocus
                        className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                </div>

                {/* Results List */}
                <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                    {/* Applications */}
                    {filteredApps.length > 0 && (
                        <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2">Applications</span>
                            {filteredApps.map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => handleSelectApp(app.id)}
                                    className="w-full p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700 flex items-center justify-between text-left transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-xl text-white ${app.color}`}>
                                            <DynamicIcon name={app.icon} className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-100 group-hover:text-[var(--accent-primary)] transition-colors">{app.name}</h4>
                                            <p className="text-[11px] text-slate-400 font-mono truncate">{app.description}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Dynamic Backend Projects */}
                    {filteredProjects.length > 0 && (
                        <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2">Projects Matched</span>
                            {filteredProjects.map((proj) => (
                                <button
                                    key={proj.id}
                                    onClick={() => {
                                        openApp('projects');
                                        setIsCommandPaletteOpen(false);
                                    }}
                                    className="w-full p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700 flex items-center justify-between text-left transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 rounded-xl bg-slate-900 text-amber-400 border border-slate-800">
                                            <FolderGit2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-100 group-hover:text-[var(--accent-primary)] transition-colors">{proj.title}</h4>
                                            <p className="text-[11px] text-slate-400 font-mono truncate">{proj.category} • {(proj.technologies || []).slice(0, 3).join(', ')}</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                                </button>
                            ))}
                        </div>
                    )}

                    {filteredApps.length === 0 && filteredProjects.length === 0 && (
                        <div className="p-8 text-center font-mono text-xs text-slate-500">
                            No matching applications or projects found for "{query}".
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
