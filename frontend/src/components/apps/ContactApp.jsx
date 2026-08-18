import React, { useState } from 'react';
import { portfolioAPI } from '../../services/api';
import { useOS } from '../../context/OSContext';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Github, Linkedin, MessageSquare } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export default function ContactApp() {
    const { addNotification, settings } = useOS();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ loading: false, success: false, error: 'Please fill in all required fields (Name, Email, Message).' });
            return;
        }

        setStatus({ loading: true, success: false, error: null });
        playSound('click', settings.soundEffects);

        try {
            await portfolioAPI.sendContact(formData);
            setStatus({ loading: false, success: true, error: null });
            addNotification({ title: 'Message Transmitted', message: `Thank you ${formData.name}, your message was dispatched to Aaryan Patel.` });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('[Contact Error]', err);
            setStatus({ loading: false, success: false, error: err.message || 'Failed to dispatch message to portfolio server.' });
        }
    };

    return (
        <div className="space-y-6 text-slate-200 font-sans">
            {/* Header */}
            <div className="flex items-center space-x-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
                    <Mail className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div>
                    <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">COMMUNICATION GATEWAY</h2>
                    <p className="text-xs text-slate-400 font-mono">Send direct message or query to Aaryan Patel</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
                {/* Left Column: Direct Communication Channels */}
                <div className="space-y-3 md:col-span-1">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">Direct Email</h3>
                        <p className="text-xs font-semibold text-slate-200">aaryanpatel.dev@gmail.com</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">Location</h3>
                        <p className="text-xs font-semibold text-slate-200">Navi Mumbai, Maharashtra, India</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">Connect Online</h3>
                        <div className="flex items-center space-x-2 pt-1">
                            <a
                                href="https://github.com/MrNobody23-cloude"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                                title="GitHub Profile"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/aaryan-patel-dev"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                                title="LinkedIn Profile"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dispatch Form */}
                <div className="md:col-span-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-[var(--accent-primary)]" />
                        <span>Dispatch Encrypted Transmission</span>
                    </h3>

                    {status.success && (
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Message dispatched successfully! Aaryan will reply shortly.</span>
                        </div>
                    )}

                    {status.error && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{status.error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-slate-400 font-medium">Your Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Elon Musk"
                                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[var(--accent-primary)]"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-mono text-slate-400 font-medium">Your Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="e.g. elon@x.com"
                                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[var(--accent-primary)]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-400 font-medium">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="e.g. Full Stack Engineering Opportunity"
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[var(--accent-primary)]"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-400 font-medium">Message Body *</label>
                            <textarea
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Type your message here..."
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[var(--accent-primary)] resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status.loading}
                            className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-white shadow-lg flex items-center justify-center space-x-2 transition-transform active:scale-95 disabled:opacity-50"
                            style={{ backgroundColor: 'var(--accent-primary)' }}
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>{status.loading ? 'Transmitting Data...' : 'Dispatch Message'}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
