import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import { FileText, Download, ExternalLink, Printer, ShieldCheck } from 'lucide-react';

export default function ResumeApp() {
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResumeData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await portfolioAPI.getResume();
            setResumeData(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumeData();
    }, []);

    const pdfPath = resumeData?.downloadUrl || '/AaryanPatel_Resume.pdf';

    const handlePrint = () => {
        const printWindow = window.open(pdfPath, '_blank');
        if (printWindow) {
            printWindow.focus();
            printWindow.print();
        }
    };

    return (
        <SystemStatusWrapper
            appName="Resume Document"
            loading={loading}
            error={error}
            empty={!resumeData}
            emptyMessage="No resume metadata found on portfolio server."
            onRetry={fetchResumeData}
        >
            <div className="h-full flex flex-col space-y-4 text-slate-200 font-sans">
                {/* Top Actions Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800 gap-3 shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
                            <FileText className="w-5 h-5 text-[var(--accent-primary)]" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">{resumeData?.filename || 'AaryanPatel_Resume.pdf'}</h2>
                            <p className="text-xs text-slate-400 font-mono">Official Curriculum Vitae • {resumeData?.lastUpdated || '2026'}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handlePrint}
                            className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Print Document"
                        >
                            <Printer className="w-4 h-4" />
                        </button>

                        <a
                            href={pdfPath}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Open External Tab"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>

                        <a
                            href={pdfPath}
                            download="AaryanPatel_Resume.pdf"
                            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white shadow-lg flex items-center space-x-2 transition-transform active:scale-95"
                            style={{ backgroundColor: 'var(--accent-primary)' }}
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                        </a>
                    </div>
                </div>

                {/* Embedded PDF Viewer Frame */}
                <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative min-h-[380px]">
                    <iframe
                        src={`${pdfPath}#toolbar=0&navpanes=0`}
                        title="Aaryan Patel Resume PDF"
                        className="w-full h-full border-none rounded-2xl"
                    />
                </div>
            </div>
        </SystemStatusWrapper>
    );
}
