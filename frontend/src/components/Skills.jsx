import React, { useState, useEffect } from 'react';
import { Code2, Database, Globe, Zap, Target, Trophy, Rocket, Terminal, Cpu, Layers, Sparkles } from 'lucide-react';

// Icon mapping for JSON data
const iconMap = {
  Code2, Database, Globe, Zap, Target, Trophy, Rocket, Terminal, Cpu, Layers
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "Overview" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "DevOps" },
    { id: "M.L.", label: "Intelligence" },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/skills`);
        if (!response.ok) throw new Error('Failed to fetch skills');
        const data = await response.json();
        const skillsWithIcons = data.map(skill => ({
          ...skill,
          icon: iconMap[skill.icon] || Code2
        }));
        setSkills(skillsWithIcons);
      } catch (err) {
        console.error("Failed to load skills", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black">
      {/* Subtle Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase">Expertise</span>
            </div>
            <h2 className="text-5xl font-harry text-white leading-none">
              Technical Mastery
            </h2>
          </div>

          {/* Compact Filter Tabs */}
          <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                    ${activeCategory === cat.id
                    ? "bg-white text-black shadow-lg shadow-white/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="group relative flex items-center gap-4 p-3 pr-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon Box */}
                <div className="relative shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-black border border-white/10 group-hover:border-white/20 transition-colors shadow-lg">
                  <skill.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-white font-medium truncate group-hover:text-purple-200 transition-colors">{skill.name}</h3>
                    <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">{skill.level}%</span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Subtle Arrow Indicator on Hover */}
                <div className="absolute right-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  {/* <Zap className="w-3 h-3 text-white/50" /> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}