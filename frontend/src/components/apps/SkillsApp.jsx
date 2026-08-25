import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import { Cpu, Zap, Activity } from 'lucide-react';
import { DynamicIcon } from '../../utils/iconMap';

export default function SkillsApp() {
    const [skillGroups, setSkillGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSkills = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await portfolioAPI.getSkills();
            setSkillGroups(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <SystemStatusWrapper
            appName="Skills Diagnostic"
            loading={loading}
            error={error}
            empty={skillGroups.length === 0}
            emptyMessage="No skills telemetry data found on portfolio server."
            onRetry={fetchSkills}
        >
            <div className="space-y-6 text-slate-200 font-sans">
                {/* Header Diagnostic Banner */}
                <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">TECHNICAL PROFICIENCY DIAGNOSTICS</h2>
                            <p className="text-xs text-slate-400 font-mono">Live competency metrics across software stack</p>
                        </div>
                    </div>
                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                        STATUS: 100% OPERATIONAL
                    </span>
                </div>

                {/* Skill Category Groups */}
                <div className="space-y-5">
                    {skillGroups.map((group, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                            <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-2">
                                <DynamicIcon name={group.icon || 'Cpu'} className="w-4 h-4 text-[var(--accent-primary)]" />
                                <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">
                                    {group.category}
                                </h3>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {(group.skills || []).map((skill, sIdx) => (
                                    <div
                                        key={sIdx}
                                        onMouseEnter={() => window.dispatchEvent(new CustomEvent('aaryan-os:highlight-tech', { detail: { tech: skill.name } }))}
                                        onMouseLeave={() => window.dispatchEvent(new CustomEvent('aaryan-os:highlight-tech', { detail: { tech: null } }))}
                                        className="space-y-1.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/60 hover:border-[var(--accent-border)] transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-slate-100">{skill.name}</span>
                                        </div>

                                        {skill.exp && (
                                            <p className="text-[10px] font-mono text-slate-400 pt-0.5">{skill.exp}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SystemStatusWrapper>
    );
}
