import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';

export default function EducationApp() {
    const [edu, setEdu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEducation = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await portfolioAPI.getEducation();
            setEdu(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    return (
        <SystemStatusWrapper
            appName="Education Directory"
            loading={loading}
            error={error}
            empty={!edu}
            emptyMessage="No education data found on portfolio server."
            onRetry={fetchEducation}
        >
            <div className="space-y-6 text-slate-200 font-sans">
                {/* Header */}
                <div className="flex items-center space-x-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                        <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">ACADEMIC DEGREES & COURSEWORK</h2>
                        <p className="text-xs text-slate-400 font-mono">Formal computer engineering background</p>
                    </div>
                </div>

                {/* Institution Card */}
                {edu && (
                    <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                            <div>
                                <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                                    {edu.status || 'Active Degree'}
                                </span>
                                <h3 className="text-base font-bold text-slate-100 mt-1">{edu.degree}</h3>
                                <p className="text-xs font-semibold text-slate-400 font-mono">{edu.institution} • {edu.location}</p>
                            </div>
                            <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 w-fit">
                                {edu.duration}
                            </div>
                        </div>

                        {edu.focusArea && (
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold font-mono text-slate-400 uppercase flex items-center space-x-1.5">
                                    <Award className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Specialization &amp; Focus Area</span>
                                </h4>
                                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                                    {edu.focusArea}
                                </p>
                            </div>
                        )}

                        {/* Coursework List */}
                        {edu.coursework && (
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold font-mono text-slate-400 uppercase flex items-center space-x-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                                    <span>Key Engineering Modules</span>
                                </h4>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    {edu.coursework.map((course, idx) => (
                                        <div
                                            key={idx}
                                            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2 text-xs text-slate-300"
                                        >
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                            <span>{course}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </SystemStatusWrapper>
    );
}
