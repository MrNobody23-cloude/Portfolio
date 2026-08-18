import React from 'react';
import { useOS } from '../../context/OSContext';
import { Terminal, Home } from 'lucide-react';

export default function NotFoundApp() {
    const { openApp, accentColor } = useOS();

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4 text-slate-200 font-mono">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <Terminal className="w-10 h-10" />
            </div>

            <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">404 — APPLICATION NOT FOUND</h2>
                <p className="text-xs text-slate-400">
                    The requested application route or binary does not exist in AARYAN OS.
                </p>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    onClick={() => openApp('about')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow transition-transform active:scale-95"
                    style={{ backgroundColor: accentColor }}
                >
                    Open About Me
                </button>
                <button
                    onClick={() => openApp('terminal')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                >
                    Launch Terminal CLI
                </button>
            </div>
        </div>
    );
}
