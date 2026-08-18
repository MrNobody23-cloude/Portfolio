import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { portfolioAPI } from '../../services/api';

export default function TerminalApp() {
    const { openApp, settings, toggleClassicMode } = useOS();
    const [history, setHistory] = useState([
        { type: 'system', text: 'AARYAN OS [Version 1.1.0] CLI Environment' },
        { type: 'system', text: 'Type "help" or "classic" to switch to 199X Alternate Timeline OS.' }
    ]);
    const [inputVal, setInputVal] = useState('');
    const [commandBuffer, setCommandBuffer] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = async (cmdStr) => {
        const trimmed = cmdStr.trim();
        if (!trimmed) return;

        setCommandBuffer((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);

        const newHistory = [...history, { type: 'input', text: `aaryan23@os:~$ ${trimmed}` }];
        const parts = trimmed.split(' ');
        const cmd = parts[0].toLowerCase();

        switch (cmd) {
            case 'classic':
            case '199x':
            case 'retro':
                toggleClassicMode();
                newHistory.push({
                    type: 'output',
                    text: `[OS TIMELINE SHIFT] Toggled AARYAN OS 199X Retro Alternate Mode. (Shortcut: Ctrl+Alt+A)`
                });
                break;

            case 'help':
                newHistory.push({
                    type: 'output',
                    text: `AVAILABLE COMMANDS:
  classic / 199x — Toggle 199X Retro Alternate Timeline OS Mode (Ctrl+Alt+A)
  neofetch       — System info & profile overview
  about / whoami — Fetch personal biography from backend
  projects       — Fetch project directory from backend API
  skills         — Fetch technical skill diagnostics
  experience     — Fetch professional career timeline
  education      — Fetch academic qualifications
  achievements   — Fetch competitive hackathons & awards
  resume         — Open embedded PDF resume application
  contact        — Open communication gateway app
  clear          — Clear terminal buffer screen`
                });
                break;

            case 'neofetch':
                newHistory.push({
                    type: 'output',
                    text: `
  /\_/\\   aaryan@patel-workstation
 ( o.o )  ------------------------
  > ^ <   OS: AARYAN OS v1.1.0 (x86_64 Web Desktop)
          Host: Terna Engineering College, Navi Mumbai
          Kernel: React 18 / Vite 5 / Node.js Express API
          Uptime: 100% Operational
          Shell: Aaryan CLI v1.1
          Theme: ${settings.themeKey || 'Dark Graphite'}
          Accent: var(--accent-primary)
          Status: Ready for Software Engineering Opportunities
`
                });
                break;

            case 'whoami':
            case 'about':
                newHistory.push({ type: 'system', text: 'Fetching profile data from AARYAN PORTFOLIO API...' });
                try {
                    const profile = await portfolioAPI.getProfile();
                    const info = profile.personalInfo || {};
                    newHistory.push({
                        type: 'output',
                        text: `USER PROFILE:
Name: ${info.name}
Role: ${info.title}
Status: ${info.status}
Location: ${info.location}
Bio: ${info.tagline}`
                    });
                } catch (err) {
                    newHistory.push({ type: 'error', text: `API Error: ${err.message}` });
                }
                break;

            case 'projects':
                newHistory.push({ type: 'system', text: 'Querying project directory from backend API...' });
                try {
                    const projects = await portfolioAPI.getProjects();
                    let txt = 'PROJECT DIRECTORY:\n';
                    projects.forEach((p, i) => {
                        txt += `\n[0${i + 1}] ${p.title} (${p.category})\n    ${p.description}\n    Tech: ${(p.technologies || []).join(', ')}`;
                    });
                    newHistory.push({ type: 'output', text: txt });
                } catch (err) {
                    newHistory.push({ type: 'error', text: `API Error: ${err.message}` });
                }
                break;

            case 'skills':
                newHistory.push({ type: 'system', text: 'Fetching skills diagnostics from backend API...' });
                try {
                    const groups = await portfolioAPI.getSkills();
                    let txt = 'SKILL PROFICIENCY DIAGNOSTICS:\n';
                    groups.forEach((g) => {
                        txt += `\n== ${g.category.toUpperCase()} ==\n`;
                        (g.skills || []).forEach((s) => {
                            txt += `  • ${s.name.padEnd(24)} [${s.level}%]\n`;
                        });
                    });
                    newHistory.push({ type: 'output', text: txt });
                } catch (err) {
                    newHistory.push({ type: 'error', text: `API Error: ${err.message}` });
                }
                break;

            case 'experience':
                newHistory.push({ type: 'system', text: 'Fetching career timeline from backend API...' });
                try {
                    const exp = await portfolioAPI.getExperience();
                    let txt = 'CAREER TIMELINE:\n';
                    exp.forEach((item) => {
                        txt += `\n• ${item.position} @ ${item.company} (${item.duration})\n  ${item.description}\n`;
                    });
                    newHistory.push({ type: 'output', text: txt });
                } catch (err) {
                    newHistory.push({ type: 'error', text: `API Error: ${err.message}` });
                }
                break;

            case 'education':
                newHistory.push({ type: 'system', text: 'Fetching academic qualification from backend API...' });
                try {
                    const edu = await portfolioAPI.getEducation();
                    newHistory.push({
                        type: 'output',
                        text: `ACADEMICS:
Degree: ${edu.degree}
Institution: ${edu.institution} (${edu.duration})
Location: ${edu.location}
Coursework: ${(edu.coursework || []).join(', ')}`
                    });
                } catch (err) {
                    newHistory.push({ type: 'error', text: `API Error: ${err.message}` });
                }
                break;

            case 'achievements':
                newHistory.push({ type: 'system', text: 'Fetching honors from backend API...' });
                try {
                    const ach = await portfolioAPI.getAchievements();
                    let txt = 'HONORS & AWARDS:\n';
                    ach.forEach((item) => {
                        txt += `\n🏆 ${item.title} (${item.date})\n   ${item.description}\n`;
                    });
                    newHistory.push({ type: 'output', text: txt });
                } catch (err) {
                    newHistory.push({ type: 'error', text: `API Error: ${err.message}` });
                }
                break;

            case 'resume':
                openApp('resume');
                newHistory.push({ type: 'output', text: 'Launching Resume PDF Viewer application window...' });
                break;

            case 'contact':
                openApp('contact');
                newHistory.push({ type: 'output', text: 'Launching Communication Gateway application window...' });
                break;

            case 'clear':
                setHistory([]);
                setInputVal('');
                return;

            case 'developer':
            case 'explore':
                window.dispatchEvent(new CustomEvent('aaryan-os:toggle-developer-mode'));
                newHistory.push({
                    type: 'output',
                    text: `[SYSTEM MODE ACTIVATED] AARYAN_OS // DEVELOPER MODE SPATIAL OVERVIEW TOGGLED.
Visualizing nested spatial wireframes, orbit vectors, and 3.5D node telemetry.`
                });
                break;

            case 'matrix':
                window.dispatchEvent(new CustomEvent('aaryan-os:toggle-developer-mode'));
                newHistory.push({
                    type: 'output',
                    text: `[SPATIAL VECTOR PULSE] Initiating matrix spatial telemetry trace...`
                });
                break;

            case 'sudo':
                const subCmd = parts.slice(1).join(' ').toLowerCase();
                if (subCmd === 'hire aaryan') {
                    newHistory.push({
                        type: 'output',
                        text: `PERMISSION GRANTED: Aaryan Patel hired!
Redirecting to contact application gateway...`
                    });
                    openApp('contact');
                } else if (subCmd === 'explore' || subCmd === 'developer' || subCmd === 'mode') {
                    window.dispatchEvent(new CustomEvent('aaryan-os:toggle-developer-mode'));
                    newHistory.push({
                        type: 'output',
                        text: `[ADMIN ACCESS GRANTED] AARYAN_OS // SPATIAL DEVELOPER ENVIRONMENT UNLOCKED.`
                    });
                } else {
                    newHistory.push({ type: 'error', text: `sudo: ${parts.slice(1).join(' ')}: command not found` });
                }
                break;

            default:
                newHistory.push({
                    type: 'error',
                    text: `Command non-zero exit: "${cmd}". Type "help" for a list of valid terminal commands.`
                });
                break;
        }

        setHistory(newHistory);
        setInputVal('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(inputVal);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandBuffer.length > 0) {
                const nextIdx = historyIndex + 1 < commandBuffer.length ? historyIndex + 1 : historyIndex;
                setHistoryIndex(nextIdx);
                setInputVal(commandBuffer[commandBuffer.length - 1 - nextIdx] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIdx = historyIndex - 1;
                setHistoryIndex(nextIdx);
                setInputVal(commandBuffer[commandBuffer.length - 1 - nextIdx] || '');
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInputVal('');
            }
        }
    };

    return (
        <div
            onClick={() => inputRef.current?.focus()}
            className="h-full bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-y-auto flex flex-col justify-between select-text"
        >
            <div className="space-y-2">
                {history.map((item, index) => (
                    <div key={index} className="leading-relaxed">
                        {item.type === 'input' && <span className="text-[var(--accent-primary)] font-bold">{item.text}</span>}
                        {item.type === 'system' && <span className="text-slate-500">{item.text}</span>}
                        {item.type === 'output' && <pre className="whitespace-pre-wrap font-mono text-emerald-400">{item.text}</pre>}
                        {item.type === 'error' && <span className="text-rose-400">{item.text}</span>}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex items-center space-x-2 pt-3 border-t border-slate-900 mt-2 shrink-0">
                <span className="text-[var(--accent-primary)] font-bold">aaryan@os:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs caret-[var(--accent-primary)]"
                    placeholder="Type command ('help', 'neofetch', 'projects')..."
                />
            </div>
        </div>
    );
}
