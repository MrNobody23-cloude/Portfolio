import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import { useOS } from '../../context/OSContext';
import { Terminal, Cpu, Clock, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DesktopWidgets() {
    const { openApp } = useOS();
    const [stats, setStats] = useState({ projectsCount: 0, skillsCount: 0, expCount: 0 });
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Clock interval update every second
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Fetch live backend metrics
        Promise.all([
            portfolioAPI.getProjects().catch(() => []),
            portfolioAPI.getSkills().catch(() => []),
            portfolioAPI.getExperience().catch(() => [])
        ]).then(([projects, skills, exp]) => {
            setStats({
                projectsCount: projects.length || 12,
                skillsCount: Array.isArray(skills) ? skills.length : 8,
                expCount: exp.length || 5
            });
        });
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="absolute top-8 right-8 z-10 pointer-events-none flex flex-col items-end space-y-4 max-w-sm w-full select-none">
            {/* 1. System Clock & Environment Hud */}
            <div className="pointer-events-auto w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 p-4 rounded-2xl shadow-2xl transition-all hover:border-[var(--accent-border)] hover:bg-slate-900/60 group">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5 mb-2.5">
                    <div className="flex items-center space-x-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">AARYAN OS // ONLINE</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
                        SYS.NODE.01
                    </span>
                </div>

                {/* Live Clock Display */}
                <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-mono font-black text-slate-100 tracking-tight flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span>{formattedTime}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">{formattedDate}</span>
                </div>
            </div>

            {/* 2. System Diagnostics & Portfolio Metrics HUD */}
            <div className="pointer-events-auto w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 p-4 rounded-2xl shadow-2xl space-y-3 transition-all hover:border-[var(--accent-border)] hover:bg-slate-900/60">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                    <span className="flex items-center space-x-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        <span>System Telemetry</span>
                    </span>
                    <span className="text-emerald-400 flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>AUTHENTICATED</span>
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => openApp('projects')}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-[var(--accent-border)] transition-all flex flex-col items-center justify-center group"
                    >
                        <span className="text-lg font-mono font-black text-slate-100 group-hover:text-[var(--accent-primary)]">
                            {stats.projectsCount}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">Projects</span>
                    </button>

                    <button
                        onClick={() => openApp('skills')}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-[var(--accent-border)] transition-all flex flex-col items-center justify-center group"
                    >
                        <span className="text-lg font-mono font-black text-slate-100 group-hover:text-[var(--accent-primary)]">
                            {stats.skillsCount}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">Tech Stack</span>
                    </button>

                    <button
                        onClick={() => openApp('experience')}
                        className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-[var(--accent-border)] transition-all flex flex-col items-center justify-center group"
                    >
                        <span className="text-lg font-mono font-black text-slate-100 group-hover:text-[var(--accent-primary)]">
                            {stats.expCount}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">Roles</span>
                    </button>
                </div>
            </div>

            {/* 3. Currently Building / Active Focus Module */}
            <div className="pointer-events-auto w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 p-4 rounded-2xl shadow-2xl space-y-2.5 transition-all hover:border-[var(--accent-border)] hover:bg-slate-900/60">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center space-x-1.5">
                        <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span>Currently Building</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">v1.1.0</span>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-slate-100 font-mono">Agentic AI & Full-Stack Systems</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Architecting intelligent AI workflows, full-stack web platforms & OS environments.
                    </p>
                </div>

                <div className="pt-1 flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-[10px] font-mono text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
                        <span>CLI ready</span>
                    </div>

                    <button
                        onClick={() => openApp('terminal')}
                        className="px-2.5 py-1 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent-border)] hover:bg-[var(--accent-primary)] text-slate-200 hover:text-white text-[11px] font-mono font-semibold flex items-center space-x-1.5 transition-all"
                    >
                        <Terminal className="w-3 h-3" />
                        <span>Launch CLI</span>
                        <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
