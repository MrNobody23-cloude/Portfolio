import React from 'react';
import { useOS } from '../../context/OSContext';
import { AlertTriangle, RefreshCw, Terminal, Inbox } from 'lucide-react';

export default function SystemStatusWrapper({
    appName = 'Application',
    loading = false,
    error = null,
    empty = false,
    emptyMessage = 'No records found in directory.',
    onRetry = () => { },
    children
}) {
    const { openApp } = useOS();

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 space-y-4 font-mono select-none">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shadow-xl">
                    <RefreshCw className="w-6 h-6 animate-spin text-[var(--accent-primary)]" />
                </div>
                <div className="text-center space-y-1">
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{appName}.app</h3>
                    <p className="text-[11px] text-slate-400">Requesting data from portfolio backend server...</p>
                </div>
                <div className="w-48 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-[var(--accent-primary)] animate-pulse w-3/4 rounded-full"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4 font-mono select-none">
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-xl">
                    <AlertTriangle className="w-8 h-8" />
                </div>

                <div className="space-y-1.5 max-w-md">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        SYSTEMIC CONNECTION ERROR
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">{appName}.app</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Could not establish connection with AARYAN PORTFOLIO SERVER API.
                    </p>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-400 text-left font-mono truncate">
                        Error: {error.message || 'BACKEND_UNAVAILABLE'}
                    </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center space-x-2"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry Connection</span>
                    </button>
                    <button
                        onClick={() => openApp('terminal', { command: 'status' })}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center space-x-2 transition-colors"
                    >
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Open Terminal</span>
                    </button>
                </div>
            </div>
        );
    }

    if (empty) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3 font-mono select-none">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500">
                    <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{appName} Directory Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">{emptyMessage}</p>
            </div>
        );
    }

    return <>{children}</>;
}
