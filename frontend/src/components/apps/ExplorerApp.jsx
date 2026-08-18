import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import {
    Folder,
    FileText,
    ChevronRight,
    Home,
    Briefcase,
    GraduationCap,
    Trophy,
    Cpu,
    User,
    HardDrive,
    ArrowLeft,
    ArrowRight
} from 'lucide-react';

export default function ExplorerApp({ windowParams }) {
    const { openApp } = useOS();

    const initialFolder = windowParams?.initialFolder || windowParams?.folder || 'home';
    const [activeFolder, setActiveFolder] = useState(initialFolder);
    const [history, setHistory] = useState([initialFolder]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        portfolioAPI.getProjects()
            .then(setProjects)
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    const navigateTo = (folderId) => {
        if (folderId === activeFolder) return;
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(folderId);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setActiveFolder(folderId);
        setSelectedItemId(null);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            setHistoryIndex(prevIndex);
            setActiveFolder(history[prevIndex]);
            setSelectedItemId(null);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            const nextIndex = historyIndex + 1;
            setHistoryIndex(nextIndex);
            setActiveFolder(history[nextIndex]);
            setSelectedItemId(null);
        }
    };

    const sidebarNav = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'projects', label: 'Projects', icon: Folder },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Cpu },
        { id: 'achievements', label: 'Achievements', icon: Trophy },
        { id: 'resume', label: 'Resume', icon: FileText },
        { id: 'about', label: 'About Me', icon: User }
    ];

    const getDirectoryItems = () => {
        switch (activeFolder) {
            case 'projects':
                if (projects.length > 0) {
                    return projects.map((p) => ({
                        id: `proj-${p.id}`,
                        name: `${p.title.replace(/\s+/g, '_')}.app`,
                        subtitle: p.category || 'Repository App',
                        type: 'app',
                        appId: 'projects',
                        params: { projectId: p.id },
                        icon: Folder,
                        iconColor: 'text-amber-400'
                    }));
                }
                return [
                    { id: 'proj-janniti', name: 'JanNiti_AI.app', subtitle: 'AI Civic Platform', type: 'app', appId: 'projects', params: { projectId: 'janniti-ai' }, icon: Cpu, iconColor: 'text-amber-400' },
                    { id: 'proj-equiphealth', name: 'EquipHealth.app', subtitle: 'IoT Telemetry ML', type: 'app', appId: 'projects', params: { projectId: 'equiphealth' }, icon: HardDrive, iconColor: 'text-cyan-400' },
                    { id: 'proj-edurights', name: 'EduRights.app', subtitle: 'EdTech Platform', type: 'app', appId: 'projects', params: { projectId: 'edurights' }, icon: GraduationCap, iconColor: 'text-emerald-400' },
                    { id: 'proj-sentinelops', name: 'SentinelOps.app', subtitle: 'DevSecOps Scanner', type: 'app', appId: 'projects', params: { projectId: 'sentinelops' }, icon: Cpu, iconColor: 'text-purple-400' },
                    { id: 'proj-agrichain', name: 'AgriChain.app', subtitle: 'Supply Chain Web', type: 'app', appId: 'projects', params: { projectId: 'agrichain' }, icon: Folder, iconColor: 'text-blue-400' }
                ];
            case 'skills':
                return [
                    { id: 'sk-lang', name: 'Languages.spec', subtitle: 'C++, Java, Python, JS, TS', type: 'app', appId: 'skills', icon: FileText, iconColor: 'text-purple-400' },
                    { id: 'sk-front', name: 'Frontend_Dev.spec', subtitle: 'React, Tailwind, HTML, CSS', type: 'app', appId: 'skills', icon: FileText, iconColor: 'text-cyan-400' },
                    { id: 'sk-back', name: 'Backend_Databases.spec', subtitle: 'Node, Express, Mongo, MySQL', type: 'app', appId: 'skills', icon: FileText, iconColor: 'text-emerald-400' },
                    { id: 'sk-ai', name: 'AI_MachineLearning.spec', subtitle: 'Python, Scikit-Learn, ML', type: 'app', appId: 'skills', icon: FileText, iconColor: 'text-amber-400' },
                    { id: 'sk-devops', name: 'DevOps_Tools.spec', subtitle: 'Git, Vite, Docker, Linux', type: 'app', appId: 'skills', icon: FileText, iconColor: 'text-blue-400' }
                ];
            case 'experience':
                return [
                    { id: 'exp-sapphire', name: 'Sapphire_Technologies.log', subtitle: 'Full Stack Dev Intern', type: 'app', appId: 'experience', icon: Briefcase, iconColor: 'text-purple-400' },
                    { id: 'exp-zhagaram', name: 'Zhagaram_Technologies.log', subtitle: 'Machine Learning Intern', type: 'app', appId: 'experience', icon: Briefcase, iconColor: 'text-cyan-400' }
                ];
            case 'education':
                return [
                    { id: 'edu-terna', name: 'Terna_Engineering_College.edu', subtitle: 'B.E. Computer Engineering', type: 'app', appId: 'education', icon: GraduationCap, iconColor: 'text-cyan-400' }
                ];
            case 'achievements':
                return [
                    { id: 'ach-csi', name: 'Clash_Of_Codes_CSI.cert', subtitle: '2nd Runner-up', type: 'app', appId: 'achievements', icon: Trophy, iconColor: 'text-yellow-400' },
                    { id: 'ach-recode', name: 'ACM_Recode_Top10.cert', subtitle: 'Top 10 Team', type: 'app', appId: 'achievements', icon: Trophy, iconColor: 'text-amber-400' },
                    { id: 'ach-sih', name: 'SIH_2024.cert', subtitle: 'Intra-College Qualifier', type: 'app', appId: 'achievements', icon: Trophy, iconColor: 'text-emerald-400' },
                    { id: 'ach-isro', name: 'ISRO_Antriksh.cert', subtitle: 'Official Submission', type: 'app', appId: 'achievements', icon: Trophy, iconColor: 'text-purple-400' },
                    { id: 'ach-hackovium', name: 'Hackovium.cert', subtitle: 'Participant & Builder', type: 'app', appId: 'achievements', icon: Trophy, iconColor: 'text-cyan-400' }
                ];
            case 'resume':
                return [
                    { id: 'res-pdf', name: 'Aaryan_Patel_Resume.pdf', subtitle: 'Official Document', type: 'app', appId: 'resume', icon: FileText, iconColor: 'text-rose-400' }
                ];
            case 'about':
                return [
                    { id: 'ab-bio', name: 'aaryan_bio.txt', subtitle: 'Personal Biography', type: 'app', appId: 'about', icon: User, iconColor: 'text-blue-400' },
                    { id: 'ab-goals', name: 'personal_goals.md', subtitle: 'Engineering Philosophy', type: 'app', appId: 'about', icon: FileText, iconColor: 'text-emerald-400' }
                ];
            case 'home':
            default:
                return [
                    { id: 'dir-projects', name: 'Projects/', subtitle: `${projects.length || 5} Repositories`, type: 'folder', folderId: 'projects', icon: Folder, iconColor: 'text-amber-400' },
                    { id: 'dir-skills', name: 'Skills/', subtitle: 'Diagnostics Data', type: 'folder', folderId: 'skills', icon: Folder, iconColor: 'text-cyan-400' },
                    { id: 'dir-experience', name: 'Experience/', subtitle: 'Career Timeline', type: 'folder', folderId: 'experience', icon: Folder, iconColor: 'text-purple-400' },
                    { id: 'dir-education', name: 'Education/', subtitle: 'Academic Degree', type: 'folder', folderId: 'education', icon: Folder, iconColor: 'text-blue-400' },
                    { id: 'dir-achievements', name: 'Achievements/', subtitle: 'Awards & Certs', type: 'folder', folderId: 'achievements', icon: Folder, iconColor: 'text-yellow-400' },
                    { id: 'dir-about', name: 'About Me/', subtitle: 'Bio & Identity', type: 'folder', folderId: 'about', icon: User, iconColor: 'text-emerald-400' },
                    { id: 'file-resume', name: 'Resume.pdf', subtitle: 'Official Document', type: 'app', appId: 'resume', icon: FileText, iconColor: 'text-rose-400' },
                    { id: 'app-terminal', name: 'Terminal.app', subtitle: 'CLI Environment', type: 'app', appId: 'terminal', icon: Cpu, iconColor: 'text-emerald-400' },
                    { id: 'app-settings', name: 'Settings.app', subtitle: 'System Preferences', type: 'app', appId: 'settings', icon: HardDrive, iconColor: 'text-blue-400' }
                ];
        }
    };

    const handleItemClick = (item) => {
        if (selectedItemId === item.id) {
            handleItemOpen(item);
        } else {
            setSelectedItemId(item.id);
        }
    };

    const handleItemDoubleClick = (item) => {
        handleItemOpen(item);
    };

    const handleItemOpen = (item) => {
        if (item.type === 'folder') {
            navigateTo(item.folderId);
        } else if (item.appId) {
            openApp(item.appId, item.params);
        }
    };

    return (
        <SystemStatusWrapper
            appName="File Explorer"
            loading={loading}
            error={error}
            onRetry={() => {
                setLoading(true);
                portfolioAPI.getProjects().then(setProjects).finally(() => setLoading(false));
            }}
        >
            <div className="h-full flex flex-col sm:flex-row text-slate-200 font-sans select-none">
                {/* Explorer Sidebar */}
                <div className="w-full sm:w-48 bg-slate-950/80 border-b sm:border-b-0 sm:border-r border-slate-800 p-3 space-y-1 shrink-0">
                    <div className="text-[10px] font-mono font-bold text-slate-500 uppercase px-2 py-1 flex items-center space-x-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                        <span>AARYAN_OS Root</span>
                    </div>

                    {sidebarNav.map((nav) => {
                        const IconComponent = nav.icon;
                        const isSelected = activeFolder === nav.id;
                        return (
                            <button
                                key={nav.id}
                                onClick={() => navigateTo(nav.id)}
                                className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${isSelected
                                    ? 'bg-[var(--accent-primary)] text-white shadow-md'
                                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                                    }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                <span>{nav.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Explorer Main Content View */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {/* Breadcrumb & Navigation History Bar */}
                    <div className="flex items-center space-x-2 text-xs font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-400">
                        <div className="flex items-center space-x-1 mr-1">
                            <button
                                onClick={goBack}
                                disabled={historyIndex <= 0}
                                className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                title="Back"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={goForward}
                                disabled={historyIndex >= history.length - 1}
                                className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                title="Forward"
                            >
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <span>AARYAN_OS</span>
                        <ChevronRight className="w-3 h-3 text-slate-600" />
                        <span className="uppercase text-[var(--accent-primary)] font-bold">{activeFolder}</span>
                    </div>

                    {/* Directory Items Grid */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                            Directory Contents
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {getDirectoryItems().map((item) => {
                                const IconComp = item.icon;
                                const isSelected = selectedItemId === item.id;
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => handleItemClick(item)}
                                        onDoubleClick={() => handleItemDoubleClick(item)}
                                        className={`p-3.5 rounded-2xl bg-slate-900/60 border ${isSelected
                                            ? 'border-[var(--accent-primary)] bg-slate-800/80 shadow-md'
                                            : 'border-slate-800 hover:border-slate-700'
                                            } flex flex-col items-center justify-center space-y-2 group transition-all cursor-pointer select-none`}
                                    >
                                        <IconComp className={`w-8 h-8 ${item.iconColor || 'text-amber-400'} group-hover:scale-110 transition-transform`} />
                                        <span className="text-xs font-semibold text-slate-200 text-center truncate max-w-full">{item.name}</span>
                                        <span className="text-[10px] font-mono text-slate-500 text-center truncate max-w-full">{item.subtitle}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </SystemStatusWrapper>
    );
}

