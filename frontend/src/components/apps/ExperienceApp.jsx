import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function ExperienceApp() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExperience = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await portfolioAPI.getExperience();
            setExperience(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperience();
    }, []);

    return (
        <SystemStatusWrapper
            appName="Career Timeline"
            loading={loading}
            error={error}
            empty={experience.length === 0}
            emptyMessage="No internship or work history records found on portfolio server."
            onRetry={fetchExperience}
        >
            <div className="space-y-6 text-slate-200 font-sans">
                {/* Header */}
                <div className="flex items-center space-x-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
                        <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">PROFESSIONAL EXPERIENCE & INTERNSHIPS</h2>
                        <p className="text-xs text-slate-400 font-mono">Industry internships and technical project history</p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
                    {experience.map((item, idx) => (
                        <div key={idx} className="relative group">
                            {/* Timeline Node Icon */}
                            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-[var(--accent-primary)] group-hover:scale-125 transition-transform shadow-md"></div>

                            {/* Card */}
                            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-100">{item.position}</h3>
                                        <p className="text-xs font-mono text-[var(--accent-primary)] font-semibold">{item.company}</p>
                                    </div>

                                    <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                                        <span className="flex items-center space-x-1">
                                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                            <span>{item.duration}</span>
                                        </span>
                                        {item.location && (
                                            <span className="flex items-center space-x-1">
                                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                                <span>{item.location}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed">
                                    {item.description}
                                </p>

                                {item.skills && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {item.skills.map((s, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SystemStatusWrapper>
    );
}
