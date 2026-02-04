import React, { useState, useEffect } from 'react';
import { Code2, Database, Globe, Zap, Target, Trophy, Rocket, Terminal, Cpu, Layers } from 'lucide-react';

// Icon mapping for JSON data
const iconMap = {
  Code2, Database, Globe, Zap, Target, Trophy, Rocket, Terminal, Cpu, Layers
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools" },
    { id: "M.L.", label: "AI/ML" },
    { id: "other", label: "Core" }
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
    <section id="skills" className="py-20 section-space relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-harry mb-2">
            Technical <span className="text-gradient-cosmic glow-purple">Arsenal</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full" />
        </div>

        {/* Compact Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border border-transparent
                  ${activeCategory === cat.id
                  ? "bg-white/10 text-white border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid - Simple & Interactive */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 rounded-xl p-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: Icon & Name */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                      <skill.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-200 text-sm leading-tight h-10 flex items-center">{skill.name}</span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mt-auto">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}