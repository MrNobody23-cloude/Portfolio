import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Cpu, CheckCircle2 } from 'lucide-react';

const BOOT_STEPS = [
    "Initializing AARYAN OS...",
    "Loading system modules...",
    "Connecting to portfolio server...",
    "Loading portfolio environment...",
    "SYSTEM READY"
];

const BOOT_DURATION_MS = 4500; // 4.5 seconds progressive boot sequence

export default function BootScreen({ onComplete }) {
    const { completeBoot, accentColor } = useOS();
    const finishBoot = onComplete || completeBoot;

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min(100, Math.floor((elapsed / BOOT_DURATION_MS) * 100));

            const stepIdx = Math.min(
                Math.floor((elapsed / BOOT_DURATION_MS) * BOOT_STEPS.length),
                BOOT_STEPS.length - 1
            );

            setProgress(pct);
            setCurrentStepIndex(stepIdx);

            if (elapsed >= BOOT_DURATION_MS) {
                clearInterval(interval);
                setTimeout(() => finishBoot(), 300);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [finishBoot]);

    return (
        <div className="fixed inset-0 z-[9999] bg-[var(--bg-desktop,#111311)] text-slate-200 font-mono flex flex-col items-center justify-center p-6 select-none overflow-hidden">
            {/* Background Matrix/Grid Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--accent-primary)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <div className="max-w-xl w-full relative z-10 space-y-8 bg-slate-900/80 p-8 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-2xl">
                {/* Header Branding */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-3">
                        <div
                            className="p-2 rounded-lg bg-slate-800 text-white shadow-lg"
                            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                        >
                            <Cpu className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-widest text-white">AARYAN OS</h1>
                            <p className="text-xs text-slate-400">Developer Environment v1.1.0</p>
                        </div>
                    </div>
                    <button
                        onClick={finishBoot}
                        className="text-xs px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
                    >
                        Skip [ESC]
                    </button>
                </div>

                {/* Console Log Lines */}
                <div className="space-y-2.5 text-xs text-slate-300 min-h-[160px] bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 font-mono">
                    {BOOT_STEPS.slice(0, currentStepIndex + 1).map((step, idx) => (
                        <div key={idx} className="flex items-center space-x-2 animate-fade-in">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className={idx === currentStepIndex ? "text-white font-bold" : "text-slate-400"}>
                                {step}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                        <span>SYSTEM BOOT</span>
                        <span style={{ color: accentColor }}>{progress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                            className="h-full rounded-full transition-all duration-75 ease-out"
                            style={{ width: `${progress}%`, backgroundColor: accentColor }}
                        ></div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <span>HOST: aaryanpatel-portfolio</span>
                    <span>ARCH: x86_64 / Web Desktop</span>
                </div>
            </div>
        </div>
    );
}
