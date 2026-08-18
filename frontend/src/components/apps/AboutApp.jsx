import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import { DynamicIcon } from '../../utils/iconMap';
import { Terminal, MapPin, Mail, ExternalLink, ShieldCheck, Award } from 'lucide-react';

export default function AboutApp() {
    const [profile, setProfile] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [aboutData, profilesData] = await Promise.all([
                portfolioAPI.getProfile(),
                portfolioAPI.getProfiles().catch(() => [])
            ]);
            setProfile(aboutData);
            setProfiles(profilesData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const info = profile?.personalInfo || {};
    const passions = info.passions || [];
    const social = info.socialLinks || {};

    return (
        <SystemStatusWrapper
            appName="About Me"
            loading={loading}
            error={error}
            empty={!profile}
            onRetry={loadData}
        >
            <div className="space-y-6 text-slate-200 font-sans">
                {/* System Header Badge */}
                <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-3 text-slate-400">
                    <div className="flex items-center space-x-2">
                        <Terminal className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span>SYSTEM &gt; USERS &gt; AARYAN_PATEL</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-emerald-400 font-bold">{info.status || 'Active & Available'}</span>
                    </div>
                </div>

                {/* Profile Card Hero */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-5">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-xl group-hover:border-[var(--accent-primary)] transition-all">
                            <img
                                src={info.avatar || 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300'}
                                alt={info.name || 'Aaryan Patel'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-500 text-slate-950 shadow-md">
                            <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                                <h1 className="text-xl font-bold text-slate-100">{info.name || 'Aaryan Patel'}</h1>
                                <p className="text-xs font-mono text-[var(--accent-primary)] font-semibold">{info.title || 'Software Engineer'}</p>
                            </div>

                            <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-slate-400 font-mono">
                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                <span>{info.location || 'Navi Mumbai, India'}</span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed pt-1">
                            {info.tagline || info.description}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                            {social.github && (
                                <a
                                    href={social.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors"
                                >
                                    <DynamicIcon name="Github" className="w-3.5 h-3.5 text-purple-400" />
                                    <span>GitHub</span>
                                    <ExternalLink className="w-3 h-3 text-slate-500" />
                                </a>
                            )}

                            {social.leetcode && (
                                <a
                                    href={social.leetcode}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors"
                                >
                                    <DynamicIcon name="Code2" className="w-3.5 h-3.5 text-amber-400" />
                                    <span>LeetCode</span>
                                    <ExternalLink className="w-3 h-3 text-slate-500" />
                                </a>
                            )}

                            {social.linkedin && (
                                <a
                                    href={social.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors"
                                >
                                    <DynamicIcon name="Linkedin" className="w-3.5 h-3.5 text-blue-400" />
                                    <span>LinkedIn</span>
                                    <ExternalLink className="w-3 h-3 text-slate-500" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Education & Core Focus Area */}
                {info.education && (
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                            <Award className="w-4 h-4 text-emerald-400" />
                            <span>Academic Qualification</span>
                        </h3>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs space-y-1 sm:space-y-0">
                            <div>
                                <span className="font-bold text-slate-200">{info.education.degree}</span>
                                <p className="text-slate-400 font-mono">{info.education.institution} • {info.education.location}</p>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 w-fit">
                                {info.education.duration}
                            </span>
                        </div>
                    </div>
                )}

                {/* Core Technical Pillars / Passions */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                        Core Engineering Pillars
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {passions.map((p, idx) => (
                            <div
                                key={idx}
                                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center space-x-3 hover:border-slate-700 transition-colors"
                            >
                                <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${p.color || 'text-blue-400'}`}>
                                    <DynamicIcon name={p.icon || 'Code2'} className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-200">{p.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SystemStatusWrapper>
    );
}
