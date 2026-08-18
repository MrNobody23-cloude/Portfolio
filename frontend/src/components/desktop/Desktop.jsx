import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { APP_REGISTRY } from '../../config/appRegistry';
import DesktopIcon from './DesktopIcon';
import ContextMenu from './ContextMenu';
import WindowManager from '../window/WindowManager';
import Taskbar from '../taskbar/Taskbar';
import StartMenu from '../taskbar/StartMenu';
import CommandPalette from '../search/CommandPalette';
import DesktopWidgets from './DesktopWidgets';
import MobileOS from '../mobile/MobileOS';
import { FolderGit2, Cpu, Share2 } from 'lucide-react';

import AmbientEnvironment from './AmbientEnvironment';

export default function Desktop() {
    const {
        openApp,
        isStartMenuOpen,
        setIsStartMenuOpen,
        isCommandPaletteOpen,
        notifications,
        settings,
        isClassicMode,
        toggleClassicMode
    } = useOS();

    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleDesktopClick = () => {
        if (contextMenu) setContextMenu(null);
        if (isStartMenuOpen) setIsStartMenuOpen(false);
    };

    // Group desktop apps into cohesive workspace sections
    const workApps = APP_REGISTRY.filter((a) => ['projects', 'about', 'experience', 'resume'].includes(a.id));
    const systemApps = APP_REGISTRY.filter((a) => ['skills', 'terminal', 'explorer', 'settings', 'education'].includes(a.id));
    const connectApps = APP_REGISTRY.filter((a) => ['achievements', 'contact'].includes(a.id));

    return (
        <div
            onContextMenu={handleContextMenu}
            onClick={handleDesktopClick}
            className="relative w-screen h-screen overflow-hidden select-none font-sans text-slate-100 transition-colors duration-500 bg-[var(--bg-desktop,#0b0f19)]"
        >
            {/* Mobile View Threshold (< 768px) */}
            <div className="md:hidden w-full h-full">
                <MobileOS />
            </div>

            {/* Desktop View (>= 768px) */}
            <div className="hidden md:flex flex-col w-full h-full relative">
                {/* Layer 0: Isolated Ambient Environment System (Neural Network & 3D Core) */}
                <AmbientEnvironment />

                {/* Layer 1: Atmospheric Wallpaper & Technical Grid */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Technical Subtle Mesh Grid */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:36px_36px]"></div>

                    {/* Ambient Radial Atmosphere Glowing Orbs */}
                    <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full blur-[160px] opacity-20 transition-all duration-700 bg-[var(--accent-primary)]"></div>
                    <div className="absolute bottom-20 right-20 w-[36rem] h-[36rem] rounded-full blur-[180px] opacity-15 transition-all duration-700 bg-[var(--accent-glow)]"></div>

                    {/* Retro Computing Watermark Header with 199X Mode Toggle (Ctrl+Alt+A) */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleClassicMode();
                        }}
                        className={`absolute bottom-20 left-8 transition-all text-slate-500 pointer-events-auto cursor-pointer font-mono select-none ${isClassicMode ? 'opacity-90 text-emerald-400' : 'opacity-25 hover:opacity-80'
                            }`}
                        title="Click or press Ctrl+Alt+A to toggle AARYAN OS 199X Retro Mode"
                    >
                        <h2 className="text-xl font-bold tracking-widest uppercase flex items-center space-x-2">
                            <span>{isClassicMode ? 'AARYAN OS // 199X RETRO TIMELINE' : 'AARYAN OS // SYSTEM CANVAS'}</span>
                        </h2>
                        <p className="text-[10px]">
                            {isClassicMode
                                ? 'CLASSIC COMPUTER GRAPHICS & CRT AMBIENT ACTIVE [CTRL+ALT+A TO EXIT]'
                                : 'COMPUTER ENGINEERING PORTFOLIO PLATFORM [PRESS CTRL+ALT+A FOR 199X MODE]'}
                        </p>
                    </div>
                </div>

                {/* Desktop Widgets Panel (Top Right HUD) */}
                <DesktopWidgets />

                {/* Layer 2: Categorized Desktop Shortcuts Canvas */}
                {settings.showDesktopIcons && (
                    <div className="flex-1 p-8 flex flex-col space-y-8 items-start justify-start relative z-10 max-w-2xl overflow-y-auto scrollbar-none">
                        {/* Section 1: Work & Portfolio */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 px-1 text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 border-b border-slate-800/60 pb-1 w-full">
                                <FolderGit2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                                <span>// 01 WORKSPACE & PORTFOLIO</span>
                            </div>
                            <div className="flex flex-wrap gap-4 items-start">
                                {workApps.map((app) => (
                                    <DesktopIcon
                                        key={app.id}
                                        id={app.id}
                                        name={app.name}
                                        icon={app.icon}
                                        color={app.color}
                                        onDoubleClick={() => openApp(app.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Section 2: System & Developer Tools */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 px-1 text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 border-b border-slate-800/60 pb-1 w-full">
                                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                                <span>// 02 SYSTEM UTILITIES</span>
                            </div>
                            <div className="flex flex-wrap gap-4 items-start">
                                {systemApps.map((app) => (
                                    <DesktopIcon
                                        key={app.id}
                                        id={app.id}
                                        name={app.name}
                                        icon={app.icon}
                                        color={app.color}
                                        onDoubleClick={() => openApp(app.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Section 3: Connect & Credentials */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2 px-1 text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 border-b border-slate-800/60 pb-1 w-full">
                                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                                <span>// 03 CONNECT & REPOS</span>
                            </div>
                            <div className="flex flex-wrap gap-4 items-start">
                                {connectApps.map((app) => (
                                    <DesktopIcon
                                        key={app.id}
                                        id={app.id}
                                        name={app.name}
                                        icon={app.icon}
                                        color={app.color}
                                        onDoubleClick={() => openApp(app.id)}
                                    />
                                ))}

                                {/* External Profile Desktop Shortcuts */}
                                <DesktopIcon
                                    id="github-link"
                                    name="GitHub Profile"
                                    icon="Github"
                                    color="bg-slate-800"
                                    externalUrl="https://github.com/MrNobody23-cloude"
                                />
                                <DesktopIcon
                                    id="leetcode-link"
                                    name="LeetCode Profile"
                                    icon="Code2"
                                    color="bg-amber-600"
                                    externalUrl="https://leetcode.com/u/6iTydmEn4X/"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Active Window Manager */}
                <WindowManager />

                {/* Start Menu Popup Overlay */}
                {isStartMenuOpen && <StartMenu />}

                {/* Global Search / Command Palette Modal (Ctrl+K) */}
                {isCommandPaletteOpen && <CommandPalette />}

                {/* Right-click Context Menu */}
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={() => setContextMenu(null)}
                    />
                )}

                {/* System Toast Notification Container */}
                <div className="fixed top-4 right-4 z-[10000] space-y-2 pointer-events-none max-w-sm w-full">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className="pointer-events-auto bg-slate-900/95 border text-slate-100 p-3.5 rounded-xl shadow-2xl backdrop-blur-xl flex items-start space-x-3 animate-slide-in-right border-[var(--accent-border)]"
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-[var(--accent-primary)]"
                            ></div>
                            <div>
                                <h4 className="text-xs font-bold font-mono">{n.title}</h4>
                                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom OS Taskbar */}
                <Taskbar />
            </div>
        </div>
    );
}
