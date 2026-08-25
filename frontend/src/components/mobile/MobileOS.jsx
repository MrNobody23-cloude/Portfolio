import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_REGISTRY } from '../../config/appRegistry';
import { portfolioAPI } from '../../services/api';
import { AARYAN_AVATAR } from '../../MyInfo/assets';
import { DynamicIcon } from '../../utils/iconMap';
import AboutApp from '../apps/AboutApp';
import ProjectsApp from '../apps/ProjectsApp';
import SkillsApp from '../apps/SkillsApp';
import ExperienceApp from '../apps/ExperienceApp';
import EducationApp from '../apps/EducationApp';
import AchievementsApp from '../apps/AchievementsApp';
import ResumeApp from '../apps/ResumeApp';
import ContactApp from '../apps/ContactApp';
import TerminalApp from '../apps/TerminalApp';
import ExplorerApp from '../apps/ExplorerApp';
import SettingsApp from '../apps/SettingsApp';
import SystemStatusApp from '../apps/SystemStatusApp';
import { Wifi, Battery, X, Home, Terminal, FileText, User } from 'lucide-react';

export default function MobileOS() {
    const { accentColor } = useOS();
    const [activeMobileApp, setActiveMobileApp] = useState(); // Default open About on mobile
    const [timeStr, setTimeStr] = useState('');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        portfolioAPI.getProfile().then(setProfile).catch(() => { });
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const renderMobileContent = () => {
        switch (activeMobileApp) {
            case 'about': return <AboutApp />;
            case 'projects': return <ProjectsApp />;
            case 'skills': return <SkillsApp />;
            case 'experience': return <ExperienceApp />;
            case 'education': return <EducationApp />;
            case 'achievements': return <AchievementsApp />;
            case 'resume': return <ResumeApp />;
            case 'contact': return <ContactApp />;
            case 'terminal': return <TerminalApp />;
            case 'explorer': return <ExplorerApp />;
            case 'settings': return <SettingsApp />;
            case 'system-status': return <SystemStatusApp />;
            default: return <AboutApp />;
        }
    };

    const activeAppDef = APP_REGISTRY.find((a) => a.id === activeMobileApp);

    return (
        <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden select-none font-sans relative">
            {/* Mobile Top Status Bar */}
            <div className="h-9 px-4 flex items-center justify-between bg-slate-950 border-b border-slate-900 text-xs font-mono text-slate-400 z-50">
                <span className="font-bold text-slate-200">{timeStr}</span>
                <div className="flex items-center space-x-2">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    <div className="flex items-center space-x-1">
                        <span className="text-[10px]">100%</span>
                        <Battery className="w-4 h-4 text-emerald-400" />
                    </div>
                </div>
            </div>

            {/* Main App Content Viewport or Home Grid */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin relative pb-16">
                {activeMobileApp ? (
                    /* Active Fullscreen Mobile App View */
                    <div className="space-y-4 animate-fade-in">
                        {/* Mobile App Navigation Bar */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800 sticky top-0 bg-slate-950/90 backdrop-blur-md z-30 pt-1">
                            <div className="flex items-center space-x-2">
                                <div className={`p-1.5 rounded-lg text-white ${activeAppDef?.color}`}>
                                    <DynamicIcon name={activeAppDef?.icon || 'AppWindow'} className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-slate-100">{activeAppDef?.name}</h2>
                            </div>

                            <button
                                onClick={() => setActiveMobileApp(null)}
                                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Render Mobile App */}
                        {renderMobileContent()}
                    </div>
                ) : (
                    /* Mobile Launcher Grid */
                    <div className="space-y-6 animate-fade-in">
                        {/* Profile Greeting */}
                        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
                            <img
                                src={profile?.personalInfo?.avatar || AARYAN_AVATAR}
                                alt={profile?.personalInfo?.name || "Aaryan Patel"}
                                className="w-12 h-12 rounded-full object-cover border border-slate-700"
                            />
                            <div>
                                <h3 className="text-sm font-bold text-white">{profile?.personalInfo?.name || "Aaryan Patel"}</h3>
                                <p className="text-xs text-slate-400 font-mono">AARYAN OS Mobile v1.0.4</p>
                            </div>
                        </div>

                        {/* App Grid */}
                        <div className="space-y-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">Applications</span>
                            <div className="grid grid-cols-3 gap-3">
                                {APP_REGISTRY.map((app) => (
                                    <button
                                        key={app.id}
                                        onClick={() => setActiveMobileApp(app.id)}
                                        className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center space-y-1.5 transition-active active:scale-95"
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow ${app.color}`}>
                                            <DynamicIcon name={app.icon} className="w-5 h-5" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-200 text-center truncate max-w-full">
                                            {app.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Dock Bar */}
            <div className="h-14 w-full bg-slate-900/95 border-t border-slate-800 flex items-center justify-around px-4 fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl">
                <button
                    onClick={() => setActiveMobileApp(null)}
                    className={`flex flex-col items-center justify-center p-1.5 ${activeMobileApp === null ? 'text-blue-400' : 'text-slate-400'
                        }`}
                >
                    <Home className="w-5 h-5" />
                    <span className="text-[9px] mt-0.5">Home</span>
                </button>

                <button
                    onClick={() => setActiveMobileApp('about')}
                    className={`flex flex-col items-center justify-center p-1.5 ${activeMobileApp === 'about' ? 'text-blue-400' : 'text-slate-400'
                        }`}
                >
                    <User className="w-5 h-5" />
                    <span className="text-[9px] mt-0.5">About</span>
                </button>

                <button
                    onClick={() => setActiveMobileApp('projects')}
                    className={`flex flex-col items-center justify-center p-1.5 ${activeMobileApp === 'projects' ? 'text-blue-400' : 'text-slate-400'
                        }`}
                >
                    <DynamicIcon name="FolderGit2" className="w-5 h-5" />
                    <span className="text-[9px] mt-0.5">Projects</span>
                </button>

                <button
                    onClick={() => setActiveMobileApp('terminal')}
                    className={`flex flex-col items-center justify-center p-1.5 ${activeMobileApp === 'terminal' ? 'text-blue-400' : 'text-slate-400'
                        }`}
                >
                    <Terminal className="w-5 h-5" />
                    <span className="text-[9px] mt-0.5">Terminal</span>
                </button>

                <button
                    onClick={() => setActiveMobileApp('resume')}
                    className={`flex flex-col items-center justify-center p-1.5 ${activeMobileApp === 'resume' ? 'text-blue-400' : 'text-slate-400'
                        }`}
                >
                    <FileText className="w-5 h-5" />
                    <span className="text-[9px] mt-0.5">Resume</span>
                </button>
            </div>
        </div>
    );
}
