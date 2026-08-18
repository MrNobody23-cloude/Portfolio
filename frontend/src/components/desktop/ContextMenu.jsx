import React, { useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { RefreshCw, FolderPlus, Terminal, FolderGit2, Settings, Info, ExternalLink } from 'lucide-react';

export default function ContextMenu({ x, y, onClose }) {
    const { openApp, addNotification, accentColor } = useOS();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        };
        window.addEventListener('click', handleClickOutside);
        window.addEventListener('contextmenu', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
            window.removeEventListener('contextmenu', handleClickOutside);
        };
    }, [onClose]);

    // Adjust coordinates if menu would bleed offscreen
    const posX = Math.min(x, window.innerWidth - 200);
    const posY = Math.min(y, window.innerHeight - 260);

    return (
        <div
            ref={menuRef}
            style={{ top: `${posY}px`, left: `${posX}px` }}
            className="fixed z-[9999] w-48 bg-slate-900/95 border border-slate-800 text-slate-200 rounded-xl shadow-2xl p-1.5 backdrop-blur-xl text-xs space-y-0.5 select-none animate-fade-in"
        >
            <button
                onClick={() => {
                    addNotification({ title: 'System Refreshed', message: 'Desktop state and system memory refreshed successfully.' });
                    onClose();
                }}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
            >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Refresh System</span>
            </button>

            <button
                onClick={() => {
                    openApp('explorer');
                    onClose();
                }}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
            >
                <FolderPlus className="w-3.5 h-3.5 text-slate-400" />
                <span>Open File Explorer</span>
            </button>

            <div className="h-px bg-slate-800 my-1"></div>

            <button
                onClick={() => {
                    openApp('terminal');
                    onClose();
                }}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
            >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Terminal Shell</span>
            </button>

            <button
                onClick={() => {
                    openApp('projects');
                    onClose();
                }}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
            >
                <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Browse Projects</span>
            </button>

            <div className="h-px bg-slate-800 my-1"></div>

            <button
                onClick={() => {
                    openApp('settings');
                    onClose();
                }}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
            >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Personalize OS</span>
            </button>

            <button
                onClick={() => {
                    openApp('system-status');
                    onClose();
                }}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
            >
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>System Diagnostics</span>
            </button>
        </div>
    );
}
