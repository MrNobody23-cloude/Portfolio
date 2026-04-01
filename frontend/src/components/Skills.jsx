import React, { useState, useEffect } from 'react';
import {
  Code2, Database, Globe, Zap, Target, Trophy, Rocket, Terminal, Cpu, Layers, Sparkles, Wand2, Star, Flame
} from 'lucide-react';

// Icon mapping for JSON data
const iconMap = {
  Code2, Database, Globe, Zap, Target, Trophy, Rocket, Terminal, Cpu, Layers
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools" },
    { id: "M.L.", label: "ML" },
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
    <section id="skills" className="py-40 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Dynamic Header */}
        <div className="mb-32 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 px-4 py-1.5 glass-panel rounded-full border-[#D4AF37]/30">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#d0c5af] uppercase font-cinzel">The Great Grimoire</span>
            </div>
            <h2 className="text-7xl md:text-8xl text-white font-cinzel tracking-tighter leading-tight">
              Mastered <span className="text-reveal italic">Spells</span>
            </h2>
          </div>
          <div className="max-w-sm hidden lg:block">
             <p className="text-xl text-[#99907c] font-serif italic border-l-2 border-[#D4AF37]/40 pl-8 py-2">
                "An archive of manifestations distilled into pure digital essence. Each skill represents a milestone in the journey across the cosmic void of code."
             </p>
          </div>
        </div>

        {/* Diagonal Navigation Grid */}
        <div className="relative mb-32 -mx-4">
          <div className="flex flex-wrap justify-center gap-4 py-8 bg-white/[0.01] border-y border-white/5 transform -skew-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group px-10 py-4 transform skew-y-2 transition-all duration-700 relative
                  ${activeCategory === cat.id ? "scale-110 active:scale-95" : "hover:scale-105"}`}
              >
                <div className={`text-xs font-bold tracking-[0.5em] uppercase font-cinzel transition-all duration-700
                  ${activeCategory === cat.id ? "text-white glow-gold" : "text-[#555] hover:text-[#999]"}`}>
                  {cat.label}
                </div>
                {activeCategory === cat.id && (
                  <div className="absolute inset-0 bg-[#D4AF37]/10 blur-xl animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Skewed Skills Gallery */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-12 h-12 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-8" />
            <p className="text-[#D4AF37] font-harry text-xl tracking-[0.4em] animate-pulse">Manifesting Archive...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 transform -skew-y-2">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="group relative transform skew-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* The Shard Card */}
                <div className="archive-card h-full p-10 rounded-[3rem] border-white/5 hover:border-[#D4AF37]/40 transition-all duration-700 flex items-center gap-8 group-hover:bg-[#0a0a0a] group-hover:-translate-y-4 group-hover:box-glow-gold relative overflow-hidden">
                  
                  {/* Glowing Core */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Icon Focus - Minimal */}
                  <div className="relative w-16 h-16 shrink-0 rounded-2xl glass-panel-heavy border-white/5 group-hover:border-[#D4AF37] flex items-center justify-center transition-all duration-700 shadow-xl group-hover:rotate-12">
                    <skill.icon className="w-6 h-6 text-[#777] group-hover:text-[#D4AF37] transition-all duration-700" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-[#D4AF37]/50 tracking-[0.3em] uppercase font-cinzel mb-1 group-hover:text-[#D4AF37] transition-colors">{skill.category || 'Relic'}</span>
                       <h3 className="text-3xl text-white font-cinzel group-hover:text-[#D4AF37] transition-all duration-500 tracking-tighter leading-none">
                         {skill.name}
                       </h3>
                    </div>
                    
                    {/* Minimal Energy Bar */}
                    <div className="pt-2">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-[#555] tracking-[0.2em] uppercase font-cinzel">Concentration</span>
                          <span className="text-xl font-harry text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">{skill.level}%</span>
                       </div>
                       <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-[2s] ease-out shadow-[0_0_15px_#D4AF37]"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                    </div>
                  </div>

                  {/* Aesthetic Watermark */}
                  <div className="absolute -bottom-4 -right-4 text-7xl font-harry text-[#D4AF37]/5 group-hover:text-[#D4AF37]/10 transition-all duration-1000 rotate-12 pointer-events-none select-none">
                    {idx + 1}
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