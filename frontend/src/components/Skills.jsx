import React, { useState, useEffect, useRef } from 'react';
import { Code2, Database, Globe, Zap, Target, Trophy, Rocket } from 'lucide-react';

// Icon mapping for JSON data
const iconMap = {
  Code2, Database, Globe, Zap, Target, Trophy, Rocket
};

const categories = [
  { id: 'all', label: 'All Skills', icon: Zap },
  { id: 'frontend', label: 'Frontend', icon: Code2 },
  { id: 'backend', label: 'Backend', icon: Database },
  { id: 'tools', label: 'Tools', icon: Globe },
  { id: 'M.L.', label: 'M.L.', icon: Zap },
  { id: 'other', label: 'Soft Skills', icon: Trophy }
];

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCards, setVisibleCards] = useState(new Set());
  const skillRefs = useRef([]);

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/skills`);
        if (!response.ok) throw new Error('Failed to fetch skills');
        const data = await response.json();
        // Map icon names to actual icon components
        const skillsWithIcons = data.map(skill => ({
          ...skill,
          icon: iconMap[skill.icon] || Code2
        }));
        setSkills(skillsWithIcons);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);


  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    const observers = [];

    skillRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => new Set([...prev, index]));
            } else {
              setVisibleCards(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          },
          { threshold: 0.2 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [filteredSkills]);

  return (
    <section id="skills" className="py-24 section-space relative overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0 opacity-20">
        <div className="stars"></div>
        <div className="stars stars-layer-2"></div>
      </div>

      {/* Floating Ambient Light */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-white/[0.02] blur-2xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-white/[0.015] blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2 rounded-full space-card border border-white/20 mb-4 animate-fade-in-up">
            <Rocket className="w-5 h-5 text-white/60 mr-2" />
            <span className="text-sm font-semibold text-gray-300">SKILLS</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6 font-harry animate-fade-in-up stagger-1">
            My <span className="text-gradient-nebula glow-cyan">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-nebula mx-auto rounded-full animate-scale-in stagger-2"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`space-button flex items-center space-x-2 relative group animate-fade-in-up ${activeCategory === category.id ? 'space-button-primary' : ''
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <category.icon className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading skills...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {/* Skills Grid - Cosmic Meteors */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.name}
                ref={el => skillRefs.current[index] = el}
                className={`group relative transition-all duration-700 ${visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                {/* Meteor Tail Effect */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${skill.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}></div>

                {/* Main Card - Asteroid/Comet */}
                <div className="relative space-card p-6 border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 overflow-hidden group-hover:shadow-2xl">
                  {/* Shooting Star Trail */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>

                  {/* Cosmic Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* Orbiting Icon Container */}
                        <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="w-full h-full bg-[#0a0e27] rounded-xl flex items-center justify-center">
                            <skill.icon className="w-7 h-7 text-white" />
                          </div>
                          {/* Orbiting Particles */}
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>

                        <div>
                          <h3 className="font-bold text-white text-lg">{skill.name}</h3>
                          <p className="text-xs text-gray-400 capitalize">{skill.category}</p>
                        </div>
                      </div>

                      {/* Level Badge */}
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${skill.color} text-white font-bold text-sm shadow-lg`}>
                        {skill.level}%
                      </div>
                    </div>

                    {/* Progress Bar - Warp Speed */}
                    <div className="relative">
                      <div className="text-xs text-gray-400 mb-2 flex justify-between">
                        <span>Mastery Level</span>
                        <span className="text-gradient-cosmic">{skill.level >= 90 ? '⚡ Expert' : skill.level >= 85 ? '🌟 Advanced' : '📈 Proficient'}</span>
                      </div>

                      {/* Outer Progress Container */}
                      <div className="relative h-3 bg-purple-900/30 rounded-full overflow-hidden border border-purple-500/20">
                        {/* Animated Progress Fill */}
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 relative overflow-hidden ${visibleCards.has(index) ? 'w-full' : 'w-0'
                            }`}
                          style={{
                            width: visibleCards.has(index) ? `${skill.level}%` : '0%',
                            transitionDelay: `${(index % 3) * 100 + 200}ms`
                          }}
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>

                        {/* Moving Particle */}
                        <div
                          className={`absolute top-0 bottom-0 w-1 bg-white rounded-full transition-all duration-1000 shadow-lg shadow-white/50 ${visibleCards.has(index) ? 'opacity-100' : 'opacity-0'
                            }`}
                          style={{
                            left: visibleCards.has(index) ? `${skill.level}%` : '0%',
                            transitionDelay: `${(index % 3) * 100 + 200}ms`
                          }}
                        ></div>
                      </div>

                      {/* Skill Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {skill.level >= 90 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                            ⭐ Top Skill
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${skill.color} bg-opacity-20 text-white border border-white/20`}>
                          {skill.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${skill.color} opacity-30 blur-xl transform rotate-45 translate-x-8 -translate-y-8`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-card p-6 border border-purple-500/20 text-center hover-lift group">
            <div className="text-4xl font-black text-gradient-cosmic mb-2">{skills.length}</div>
            <div className="text-sm text-gray-400">Total Skills</div>
            <Zap className="w-6 h-6 text-purple-400 mx-auto mt-2 group-hover:animate-pulse" />
          </div>

          <div className="space-card p-6 border border-cyan-500/20 text-center hover-lift group">
            <div className="text-4xl font-black text-gradient-nebula mb-2">
              {Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%
            </div>
            <div className="text-sm text-gray-400">Avg Mastery</div>
            <Target className="w-6 h-6 text-cyan-400 mx-auto mt-2 group-hover:animate-pulse" />
          </div>

          <div className="space-card p-6 border border-purple-500/20 text-center hover-lift group">
            <div className="text-4xl font-black text-gradient-cosmic mb-2">
              {skills.filter(s => s.level >= 90).length}
            </div>
            <div className="text-sm text-gray-400">Expert Level</div>
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mt-2 group-hover:animate-pulse" />
          </div>

          <div className="space-card p-6 border border-cyan-500/20 text-center hover-lift group">
            <div className="text-4xl font-black text-gradient-nebula mb-2">2+</div>
            <div className="text-sm text-gray-400">Years Coding</div>
            <Rocket className="w-6 h-6 text-purple-400 mx-auto mt-2 group-hover:animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;