import React from 'react';
import { useOS } from '../../context/OSContext';
import { Settings, Palette, Volume2, VolumeX, Layout, RefreshCw, Check, Sparkles, Sliders } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export default function SettingsApp() {
    const {
        themeKey,
        setThemeKey,
        accentColor,
        setAccentColor,
        settings,
        setSettings,
        resetOSState,
        addNotification
    } = useOS();

    const themes = [
        { key: 'dark', label: 'Dark Graphite (Default)', color: '#111311' },
        { key: 'light', label: 'Warm Ivory (Light)', color: '#F3F0E8' },
        { key: 'cyber', label: 'Cyber Terminal', color: '#050c18' },
        { key: 'solarized', label: 'Solarized Dark', color: '#002b36' },
        { key: 'midnight', label: 'Midnight Purple', color: '#0f0919' },
        { key: 'paper', label: 'Clean Paper', color: '#0d1117' }
    ];

    const accents = [
        { hex: '#B89B5E', label: 'Brass Gold' },
        { hex: '#68745E', label: 'Olive Green' },
        { hex: '#A96757', label: 'Terracotta Red' },
        { hex: '#3b82f6', label: 'Sapphire Blue' },
        { hex: '#10b981', label: 'Emerald Green' },
        { hex: '#8b5cf6', label: 'Violet Purple' }
    ];

    return (
        <div className="space-y-6 text-slate-200 font-sans select-none">
            {/* Header */}
            <div className="flex items-center space-x-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
                    <Settings className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">SYSTEM PREFERENCES & PERSONALIZATION</h2>
                    <p className="text-xs text-slate-400 font-mono">Configure OS desktop theme, system accent, audio feedback & layout</p>
                </div>
            </div>

            {/* OS Theme Selector */}
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-blue-400" />
                    <span>Desktop Visual Theme</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                    {themes.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => {
                                setThemeKey(t.key);
                                playSound('click', settings.soundEffects);
                                addNotification({ title: 'Theme Updated', message: `Applied ${t.label}` });
                            }}
                            className={`p-3 rounded-xl border flex items-center justify-between transition-all ${themeKey === t.key
                                ? 'bg-slate-800 text-white border-[var(--accent-primary)] shadow-md'
                                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: t.color }}></div>
                                <span className="text-xs font-semibold">{t.label}</span>
                            </div>
                            {themeKey === t.key && <Check className="w-4 h-4 text-[var(--accent-primary)]" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* System Accent Color Selection */}
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>System Accent Color</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {accents.map((a) => (
                        <button
                            key={a.hex}
                            onClick={() => {
                                setAccentColor(a.hex);
                                playSound('click', settings.soundEffects);
                                addNotification({ title: 'System Accent Changed', message: `Accent set to ${a.label}` });
                            }}
                            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950 border transition-all ${accentColor === a.hex ? 'border-white shadow-lg' : 'border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center space-x-2.5">
                                <div
                                    className="w-4 h-4 rounded-full shadow-sm transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: a.hex }}
                                ></div>
                                <span className="text-xs font-medium text-slate-200">{a.label}</span>
                            </div>
                            {accentColor === a.hex && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* System Preference Toggles */}
            <div className="grid sm:grid-cols-2 gap-4">
                {/* Toggle 1: UI Audio Feedback */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-200">UI Audio Feedback</h4>
                        <p className="text-[11px] text-slate-400">Play web audio clicks & window sound effects</p>
                    </div>
                    <button
                        onClick={() => {
                            const updated = !settings.soundEffects;
                            setSettings({ soundEffects: updated });
                            playSound('click', updated);
                        }}
                        className={`p-2.5 rounded-xl border transition-colors ${settings.soundEffects
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                            }`}
                        title="Toggle Audio Feedback"
                    >
                        {settings.soundEffects ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                </div>

                {/* Toggle 2: Desktop Icons Display */}
                <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-200">Desktop Shortcuts Grid</h4>
                        <p className="text-[11px] text-slate-400">Show curated workspace icons on desktop</p>
                    </div>
                    <button
                        onClick={() => {
                            const updated = !settings.showDesktopIcons;
                            setSettings({ showDesktopIcons: updated });
                            playSound('click', settings.soundEffects);
                        }}
                        className={`p-2.5 rounded-xl border transition-colors ${settings.showDesktopIcons
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                            }`}
                        title="Toggle Desktop Icons"
                    >
                        <Layout className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* System State Reset */}
            <div className="pt-3 flex justify-between items-center border-t border-slate-800">
                <button
                    onClick={() => {
                        resetOSState();
                        addNotification({ title: 'System Reset', message: 'OS state, theme, and window positions reset to default.' });
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center space-x-2 transition-colors active:scale-95"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset OS Layout to Default</span>
                </button>

                <span className="text-[10px] text-slate-500 font-mono">AARYAN OS Settings v1.1.0</span>
            </div>
        </div>
    );
}
