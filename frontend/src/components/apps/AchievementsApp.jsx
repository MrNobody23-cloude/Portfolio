import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import { Trophy, Calendar, ExternalLink, ShieldCheck, Award } from 'lucide-react';

export default function AchievementsApp() {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCert, setSelectedCert] = useState(null);

    const fetchAchievements = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await portfolioAPI.getAchievements();
            setAchievements(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    return (
        <SystemStatusWrapper
            appName="Merit & Achievements"
            loading={loading}
            error={error}
            empty={achievements.length === 0}
            emptyMessage="No hackathon or award records found on portfolio server."
            onRetry={fetchAchievements}
        >
            <div className="space-y-6 text-slate-200 font-sans">
                {/* Header */}
                <div className="flex items-center space-x-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400">
                        <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">HACKATHONS, COMPETITIONS & CERTIFICATIONS</h2>
                        <p className="text-xs text-slate-400 font-mono">Verified competitive honors and merits</p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all shadow-lg"
                        >
                            <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <Award className="w-4 h-4" />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                                    </div>
                                    <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                                        <Calendar className="w-3 h-3 text-slate-500" />
                                        <span>{item.date}</span>
                                    </span>
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {item.certificateImage && (
                                <div className="pt-2 border-t border-slate-800/80 flex justify-end">
                                    <button
                                        onClick={() => setSelectedCert(item)}
                                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-mono text-amber-400 flex items-center space-x-1.5 transition-colors"
                                    >
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        <span>Examine Artifact</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Certificate Image Examine Modal */}
                {selectedCert && (
                    <div className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-fade-in font-sans">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <div className="flex items-center space-x-2">
                                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                                    <h3 className="text-sm font-bold text-white uppercase font-mono">{selectedCert.title} Certificate</h3>
                                </div>
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-2 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden max-h-[60vh] flex items-center justify-center">
                                <img
                                    src={`/${selectedCert.certificateImage}`}
                                    alt={selectedCert.title}
                                    className="max-h-full max-w-full object-contain rounded-xl"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600';
                                    }}
                                />
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[11px] font-mono text-slate-400">{selectedCert.date}</span>
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold"
                                >
                                    Close Artifact
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SystemStatusWrapper>
    );
}
