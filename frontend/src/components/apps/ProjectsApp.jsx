import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../../services/api';
import SystemStatusWrapper from '../ui/SystemStatusWrapper';
import { ExternalLink, Layers, Search, Filter, Cpu, CheckCircle } from 'lucide-react';
import { DynamicIcon } from '../../utils/iconMap';

export default function ProjectsApp() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [showArchModal, setShowArchModal] = useState(false);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await portfolioAPI.getProjects();
            setProjects(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const categories = ['All', 'AI / ML', 'Web', 'Cloud / DevOps'];

    const filteredProjects = projects.filter((p) => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch =
            searchQuery === '' ||
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
    });

    return (
        <SystemStatusWrapper
            appName="Projects Registry"
            loading={loading}
            error={error}
            empty={projects.length === 0}
            emptyMessage="No software engineering projects found on portfolio server."
            onRetry={fetchProjects}
        >
            <div className="space-y-5 text-slate-200 font-sans">
                {/* Top Controls: Search & Category Filter */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 border-b border-slate-800 pb-4">
                    {/* Category Filter Pills */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                        <Filter className="w-3.5 h-3.5 text-slate-500 mr-1 hidden sm:inline" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${activeCategory === cat
                                    ? 'bg-[var(--accent-primary)] text-white shadow-md'
                                    : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects or tech..."
                            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                    </div>
                </div>

                {/* Projects Cards Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="p-8 text-center font-mono text-xs text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
                        No projects matched query "{searchQuery}" in category "{activeCategory}".
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group bg-slate-900/60 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-xl"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[var(--accent-primary)] font-semibold">
                                                {project.category || 'Engineering'}
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-100 group-hover:text-[var(--accent-primary)] transition-colors mt-1.5">
                                                {project.title}
                                            </h3>
                                        </div>

                                        {project.architectureNodes && (
                                            <button
                                                onClick={() => {
                                                    setSelectedProject(project);
                                                    setShowArchModal(true);
                                                }}
                                                className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
                                                title="View Architecture Nodes"
                                            >
                                                <Cpu className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech stack tags */}
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {(project.technologies || project.tags || []).slice(0, 6).map((tech) => (
                                            <span
                                                key={tech}
                                                onMouseEnter={() => window.dispatchEvent(new CustomEvent('aaryan-os:highlight-tech', { detail: { tech } }))}
                                                onMouseLeave={() => window.dispatchEvent(new CustomEvent('aaryan-os:highlight-tech', { detail: { tech: null } }))}
                                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800/80 hover:border-[var(--accent-border)] hover:text-slate-200 transition-colors cursor-pointer"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer links */}
                                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                                                title="Source Code Repository"
                                            >
                                                <DynamicIcon name="Github" className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-2.5 py-1 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-border)] text-[var(--accent-primary)] text-xs font-mono font-bold flex items-center space-x-1 hover:bg-[var(--accent-primary)] hover:text-white transition-all"
                                            >
                                                <span>Live Demo</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="text-xs text-slate-400 hover:text-white font-mono flex items-center space-x-1"
                                    >
                                        <span>Inspect Spec &gt;</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Project Detail Modal */}
                {selectedProject && !showArchModal && (
                    <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto font-sans">
                            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                                <div>
                                    <span className="text-[10px] font-mono text-[var(--accent-primary)]">{selectedProject.category}</span>
                                    <h2 className="text-base font-bold text-white">{selectedProject.title}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            {selectedProject.problem && (
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold font-mono text-rose-400 uppercase">Problem Statement</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                                        {selectedProject.problem}
                                    </p>
                                </div>
                            )}

                            {selectedProject.solution && (
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase">Architecture Solution</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                                        {selectedProject.solution}
                                    </p>
                                </div>
                            )}

                            {selectedProject.features && (
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold font-mono text-blue-400 uppercase">Key Features</h4>
                                    <ul className="space-y-1 text-xs text-slate-300">
                                        {selectedProject.features.map((f, i) => (
                                            <li key={i} className="flex items-center space-x-2">
                                                <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                                {selectedProject.architectureNodes && (
                                    <button
                                        onClick={() => setShowArchModal(true)}
                                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-mono font-bold flex items-center space-x-1.5"
                                    >
                                        <Cpu className="w-3.5 h-3.5 text-amber-400" />
                                        <span>View Architecture</span>
                                    </button>
                                )}
                                {selectedProject.githubUrl && (
                                    <a
                                        href={selectedProject.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-bold"
                                    >
                                        GitHub Repo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Architecture Node Diagram Modal */}
                {selectedProject && showArchModal && (
                    <div className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fade-in font-sans">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                <div className="flex items-center space-x-2">
                                    <Cpu className="w-5 h-5 text-amber-400" />
                                    <h2 className="text-sm font-bold text-white uppercase font-mono">
                                        Architecture Blueprint — {selectedProject.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setShowArchModal(false)}
                                    className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Node Graph */}
                            <div className="space-y-3 py-2">
                                {selectedProject.architectureNodes.map((node, i) => (
                                    <div key={node.id} className="flex items-start space-x-3">
                                        <div className="w-7 h-7 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                            0{i + 1}
                                        </div>
                                        <div className="flex-1 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-100">{node.label}</span>
                                                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-blue-400 border border-slate-800">
                                                    {node.type}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400">{node.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-2 border-t border-slate-800">
                                <button
                                    onClick={() => setShowArchModal(false)}
                                    className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold"
                                >
                                    Close Diagram
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SystemStatusWrapper>
    );
}
