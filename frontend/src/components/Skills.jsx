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
    <section id="skills" className="py-24 relative overflow-hidden bg-[#050505]">

      {/* Magical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="gold-dust" style={{ top: '10%', left: '20%', animationDelay: '0s' }} />
        <div className="gold-dust" style={{ top: '30%', left: '70%', animationDelay: '1s' }} />
        <div className="gold-dust" style={{ top: '60%', left: '40%', animationDelay: '2s' }} />
        <div className="gold-dust" style={{ top: '80%', left: '10%', animationDelay: '0.5s' }} />
        <div className="gold-dust" style={{ top: '15%', left: '85%', animationDelay: '1.5s' }} />

        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#740001] opacity-[0.03] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header - Magical Theme */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#D4AF37] mb-4 border border-[#D4AF37]/30 px-4 py-1.5 rounded-full bg-[#D4AF37]/5 backdrop-blur-sm animate-fade-in-up">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="text-sm font-harry tracking-widest uppercase">Magical Mastery</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-harry text-white mb-6 animate-fade-in-up" style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}>
            Arsenal of Spells
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg font-serif italic animate-fade-in-up delay-100">
            "A wizard is only as good as the spells they master. Here lies the collection of incantations and artifacts I've acquired."
          </p>
        </div>

        {/* Filter Tabs - Scroll - Magical Design */}
        <div className="flex justify-center mb-12 animate-fade-in-up delay-200">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-[#1a1a1a]/80 border border-[#D4AF37]/20 backdrop-blur-md shadow-lg shadow-[#D4AF37]/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-serif tracking-wide transition-all duration-300 relative overflow-hidden group
                    ${activeCategory === cat.id
                    ? "text-[#050505] bg-gradient-to-r from-[#D4AF37] to-[#F4C430] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    : "text-[#94a3b8] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"}`}
              >
                <span className="relative z-10">{cat.label}</span>
                {activeCategory !== cat.id && (
                  <span className="absolute inset-0 bg-[#D4AF37]/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-4" />
            <p className="text-[#D4AF37] font-harry text-xl animate-pulse">Summoning Skills...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="group relative h-full animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Card Container */}
                <div className="h-full p-6 rounded-2xl bg-[#111] border border-[#333] group-hover:border-[#D4AF37]/50 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center transform group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)]">

                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${skill.color ? skill.color.replace('from-', 'from-').replace('to-', 'to-') : 'from-[#D4AF37]/10 to-transparent'} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Icon Circle with Magical Glow */}
                  <div className="relative w-16 h-16 mb-6 rounded-full bg-[#050505] border border-[#333] group-hover:border-[#D4AF37] flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <skill.icon className="w-8 h-8 text-[#94a3b8] group-hover:text-[#D4AF37] transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12" />

                    {/* Orbiting Particles ring (CSS only) */}
                    <div className="absolute inset-0 rounded-full border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 scale-125 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{skill.name}</h3>
                  <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4C430] transition-all duration-1000 ease-out transform origin-left scale-x-0 group-hover:scale-x-100"
                      style={{ width: `${skill.level}%`, transitionDelay: '0.1s' }}
                    />
                    <div
                      className="h-full bg-[#333] group-hover:hidden"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex justify-between w-full text-xs font-serif text-[#666] group-hover:text-[#8B7500] uppercase tracking-wider">
                    <span>Power Level</span>
                    <span>{skill.level}%</span>
                  </div>

                  {/* Decorative Runes */}
                  <div className="absolute top-4 right-4 text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 text-xs font-harry rotate-12 transition-colors">
                    Lumos
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