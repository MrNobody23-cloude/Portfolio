import React, { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, Rocket, Star, Zap, Award, Target, Sparkles, Brain, Heart, Coffee, Trophy, Github, Cloud, ExternalLink, X, Medal, Crown } from 'lucide-react';
import AaryanImage from '../MyInfo/AaryanImage.jpg';

// Import all certificate files from MyInfo directory
const myInfoCertificates = import.meta.glob('../MyInfo/*.*', { eager: true });

// Icon Map for Achievements
const achievementIcons = {
  Trophy, Github, Cloud, Medal, Crown, Award, Star, Zap
};


// Helper to get certificate path
function getCertificatePath(filename) {
  if (!filename) return '';

  const foundKey = Object.keys(myInfoCertificates).find(key => key.endsWith(filename));

  if (foundKey && myInfoCertificates[foundKey]) {
    return myInfoCertificates[foundKey].default;
  }

  return '';
}

function About() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [counters, setCounters] = useState({ projects: 0, satisfaction: 0, experience: 0 });
  const [codingProfiles, setCodingProfiles] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const [profilesRes, aboutRes, achievementsRes] = await Promise.all([
          fetch(`${API_URL}/api/profiles`),
          fetch(`${API_URL}/api/about`),
          fetch(`${API_URL}/api/achievements`)
        ]);

        if (!profilesRes.ok || !aboutRes.ok || !achievementsRes.ok) throw new Error('Failed to fetch data');

        const profilesData = await profilesRes.json();
        const aboutInfo = await aboutRes.json();
        const achievementsData = await achievementsRes.json();

        setCodingProfiles(profilesData);
        setAboutData(aboutInfo);
        setAchievements(achievementsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress through section (0 to 1)
        const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (sectionHeight + viewportHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];

    elementsRef.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleElements(prev => {
                const newSet = new Set(prev);
                newSet.add(index);
                return newSet;
              });

              // Trigger counters when first visible
              if (index === 0 && !visibleElements.has(0)) {
                animateCounters();
              }
            } else {
              setVisibleElements(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
              });
            }
          },
          { threshold: 0.3 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let projectCount = 0;
    let satisfactionCount = 0;
    let experienceCount = 0;

    const timer = setInterval(() => {
      projectCount += 10 / steps;
      satisfactionCount += 100 / steps;
      experienceCount += 2 / steps;

      setCounters({
        projects: Math.min(Math.floor(projectCount), 10),
        satisfaction: Math.min(Math.floor(satisfactionCount), 100),
        experience: Math.min(Math.floor(experienceCount), 2)
      });

      if (projectCount >= 10) clearInterval(timer);
    }, interval);
  };

  const passions = [
    { icon: Brain, label: "Problem Solving", color: "text-[#D4AF37]" },
    { icon: Heart, label: "Clean Code", color: "text-pink-400" },
    { icon: Coffee, label: "Continuous Learning", color: "text-amber-400" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden bg-transparent">
      {/* Celestial Background Layers */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + scrollProgress * 20}% ${50 - scrollProgress * 10}%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Animated Header - The Archivist's Intro */}
        <div
          className="text-center mb-32"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 2),
            transform: `translateY(${scrollProgress * -50}px)`
          }}
        >
          <div className="inline-flex items-center px-6 py-2 rounded-full glass-panel border-[#D4AF37]/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#D4AF37] mr-3" />
            <span className="text-xs font-bold tracking-[0.4em] text-[#d0c5af] uppercase font-cinzel">The Archivist's Origin</span>
          </div>
          <h2 className="text-7xl md:text-8xl text-white font-cinzel tracking-tight leading-none mb-6">
            The <span className="text-reveal glow-gold">Manifestation</span>
          </h2>
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          <p className="text-xl text-[#99907c] mt-10 max-w-2xl mx-auto font-serif italic">
            "A weaver of code, a dreamer of designs, and a relentless pursuer of digital perfection in the celestial void."
          </p>
        </div>

        {/* Main Content Grid - The Scribe's Portrait */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
          {/* Left: Profile Section */}
          <div
            ref={el => elementsRef.current[0] = el}
            className={`relative transition-all duration-1000 ${visibleElements.has(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
          >
            {/* Profile Image - The Soul Image */}
            <div className="relative group">
              {/* Rotating Celestial Orbit */}
              <div className="absolute -inset-10 rounded-full border border-[#D4AF37]/10 animate-spin-slow pointer-events-none"></div>
              <div className="absolute -inset-20 rounded-full border border-white/5 animate-reverse-spin pointer-events-none" style={{ animationDuration: '40s' }}></div>

              <div className="relative aspect-square max-w-md mx-auto rounded-full p-2 glass-panel border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] overflow-hidden group-hover:scale-105 transition-all duration-700">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={AaryanImage}
                    alt="Aaryan Patel"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>

                {/* Ethereal Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stat Medallions */}
              <div className="absolute -bottom-10 -right-10 glass-panel-heavy p-6 rounded-3xl border-[#D4AF37]/30 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 box-glow-gold">
                <div className="text-4xl font-harry text-[#D4AF37] mb-1">{counters.experience}+</div>
                <div className="text-[10px] font-bold text-[#d0c5af] tracking-[0.2em] uppercase font-cinzel">Eons of Dev</div>
              </div>
            </div>
          </div>

          {/* Right: Personal Grimoire */}
          <div
            ref={el => elementsRef.current[1] = el}
            className={`space-y-12 transition-all duration-1000 delay-200 ${visibleElements.has(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
          >
            <div className="space-y-8">
              <h3 className="text-5xl text-white font-cinzel leading-tight tracking-tight">
                Architect of the <br />
                <span className="text-reveal glow-gold">Digital Aether</span>
              </h3>

              <div className="space-y-6 text-[#d0c5af] text-lg font-serif italic leading-relaxed">
                <p className="border-l-2 border-[#D4AF37]/30 pl-8">
                  "In the beginning, there was code. Then came the structure. Now, there is only the seamless fusion of logic and beauty that I strive to create every single day."
                </p>
                <p className="pl-8 text-base not-italic text-[#99907c] font-sans">
                  I am Aaryan Patel, a Software Engineer dedicated to crafting experiences that feel less like software and more like magic. Each line of code is a brushstroke in a much larger masterpiece.
                </p>
              </div>
            </div>

            {/* Stats - The Pillars of Merit */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-8 rounded-3xl border-white/5 hover:border-[#D4AF37]/40 transition-all group box-glow-gold">
                <Rocket className="w-10 h-10 text-[#D4AF37] mb-4 group-hover:animate-bounce" />
                <div className="text-5xl font-harry text-white">{counters.projects}+</div>
                <div className="text-[10px] font-bold text-[#d0c5af] tracking-[0.2em] uppercase font-cinzel mt-2">Relics Forged</div>
              </div>

              <div className="glass-panel p-8 rounded-3xl border-white/5 hover:border-[#D4AF37]/40 transition-all group box-glow-gold">
                <Star className="w-10 h-10 text-[#D4AF37] mb-4 group-hover:rotate-45 transition-transform" fill="currentColor" />
                <div className="text-5xl font-harry text-white">{counters.satisfaction}%</div>
                <div className="text-[10px] font-bold text-[#d0c5af] tracking-[0.2em] uppercase font-cinzel mt-2">Favor of Gods</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coding Profiles - The Celestial Guilds */}
        <div
          ref={el => elementsRef.current[2] = el}
          className="mb-40 pt-20"
        >
          {/* Section Header */}
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-panel border-[#D4AF37]/20">
              <Code2 className="w-4 h-4 text-[#D4AF37] mr-3" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#d0c5af] uppercase font-cinzel">The Competitive Ranks</span>
            </div>
            <h3 className="text-5xl md:text-6xl text-white font-cinzel tracking-tight leading-none">
              Guild <span className="text-reveal glow-gold"> standings</span>
            </h3>
          </div>

          {/* Profile Cards Grid */}
          {!loading && (
            <div className="flex flex-wrap justify-center gap-8 px-4">
              {codingProfiles.map((profile, index) => {
                const isVisible = visibleElements.has(2);

                return (
                  <a
                    key={profile.platform || index}
                    href={profile.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Shadow/Glow Background */}
                    <div className="absolute -inset-4 bg-[#D4AF37]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative w-[300px] h-[380px] archive-card rounded-3xl p-8 border-white/5 group-hover:border-[#D4AF37]/40 transition-all duration-700 overflow-hidden box-glow-gold">
                      {/* Platform Emoji Background */}
                      <div className="absolute -right-8 -top-8 text-[180px] opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-1000 rotate-12 group-hover:rotate-0">
                        {profile.emoji || '💻'}
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-20 h-20 glass-panel-heavy rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 border-[#D4AF37]/20 shadow-xl">
                          {profile.emoji || '💻'}
                        </div>

                        <div className="space-y-1 mb-8">
                          <h4 className="text-3xl text-white font-cinzel leading-none tracking-tight">
                            {profile.platform}
                          </h4>
                          <p className="text-sm text-[#99907c] font-medium tracking-widest uppercase">
                            {profile.username}
                          </p>
                        </div>

                        {/* Profile Stats Mini-List */}
                        <div className="flex-1 space-y-4">
                          {profile.stats && Object.entries(profile.stats).slice(0, 3).map(([key, value], idx) => (
                            <div key={key} className="flex justify-between items-center group/stat">
                              <span className="text-[10px] font-bold text-[#99907c] tracking-[0.2em] uppercase font-cinzel group-hover/stat:text-[#d0c5af] transition-colors">{key}</span>
                              <span className="text-xl font-harry text-[#D4AF37]">{value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between group-hover:pt-6 transition-all duration-500">
                          <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase font-cinzel opacity-0 group-hover:opacity-100 transition-opacity">Enter Profile</span>
                          <ExternalLink className="w-4 h-4 text-[#D4AF37] transform translate-y-1 group-hover:translate-y-0 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievements Section - The Hall of Eternal Fame */}
        {achievements.length > 0 && (
          <div className="mb-40 relative">
            <div className="text-center mb-24 space-y-4">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full glass-panel border-[#D4AF37]/20">
                <Trophy className="w-4 h-4 text-[#D4AF37] mr-3" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#d0c5af] uppercase font-cinzel">Hall of Eternal Fame</span>
              </div>
              <h3 className="text-5xl md:text-6xl text-white font-cinzel tracking-tight leading-none">
                Artifacts of <span className="text-reveal glow-gold"> Merit</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {achievements.map((achievement, idx) => {
                const IconComponent = achievementIcons[achievement.icon] || Trophy;

                return (
                  <div
                    key={achievement.id}
                    className="group relative archive-card p-10 border-white/5 hover:border-[#D4AF37]/40 rounded-[2.5rem] transition-all duration-700 hover:-translate-y-4 box-glow-gold"
                  >
                    <div className="relative z-10 space-y-8">
                      <div className="flex justify-between items-center">
                        <div className="w-16 h-16 glass-panel-heavy rounded-2xl flex items-center justify-center border-[#D4AF37]/20">
                          <IconComponent className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <span className="text-[10px] text-[#99907c] font-bold tracking-[0.2em] uppercase font-cinzel">{achievement.date}</span>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-2xl font-cinzel text-white leading-tight">{achievement.title}</h4>
                        <p className="text-base text-[#99907c] leading-relaxed font-serif italic border-l border-[#D4AF37]/20 pl-6">
                          {achievement.description}
                        </p>
                      </div>

                      {achievement.certificateImage && (
                        <button
                          onClick={() => setSelectedCertificate(achievement)}
                          className="w-full py-4 glass-panel border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase font-cinzel rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all duration-500 overflow-hidden relative group/btn"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            Examine Artifact
                          </span>
                          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 opacity-10"></div>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Certificate Modal - The Sanctum of Truth */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050505]/95 backdrop-blur-2xl transition-all duration-500 animate-fade-in-up">
          <div className="relative max-w-5xl w-full archive-card p-2 rounded-3xl border-[#D4AF37]/30 shadow-[0_0_100px_rgba(212,175,55,0.2)]">
            <div className="flex justify-between items-center p-8 bg-transparent">
              <div className="space-y-1">
                <h3 className="text-2xl font-cinzel text-white">{selectedCertificate.title}</h3>
                <p className="text-[10px] text-[#D4AF37] tracking-[0.4em] uppercase">Document of Merit</p>
              </div>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#d0c5af] hover:text-white transition-all hover:rotate-90 group"
              >
                <X className="w-5 h-5 group-hover:scale-125 transition-transform" />
              </button>
            </div>
            
            <div className="px-8 pb-8 h-[65vh] overflow-hidden">
               <div className="w-full h-full glass-panel-heavy rounded-2xl overflow-hidden p-2 border-white/5">
                {selectedCertificate.certificateImage && selectedCertificate.certificateImage.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={getCertificatePath(selectedCertificate.certificateImage)}
                    className="w-full h-full rounded-lg"
                    title="Certificate Preview"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#0e0e0e]/50 rounded-lg">
                    <img
                      src={getCertificatePath(selectedCertificate.certificateImage)}
                      alt={selectedCertificate.title}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/800x600?text=Artifact+Not+Found";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;