import React, { useEffect, useRef, useState } from 'react';
import { Code2, Server, Database, Rocket, Star, Zap, Award, Target, Sparkles, Brain, Heart, Coffee, Trophy, Github, Cloud, ExternalLink, X, Medal, Crown } from 'lucide-react';
import AaryanImage from '../MyInfo/AaryanImage.jpg';

// Icon Map for Achievements
const achievementIcons = {
  Trophy, Github, Cloud, Medal, Crown, Award, Star, Zap
};


// Helper to get certificate path from public folder
function getCertificatePath(filename) {
  if (!filename) return '';
  // Files in public/certificates are accessible at /certificates/filename
  return `/certificates/${filename}`;
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

  // Fetch profiles and about data
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
    { icon: Brain, label: "Problem Solving", color: "text-purple-400" },
    { icon: Heart, label: "Clean Code", color: "text-pink-400" },
    { icon: Coffee, label: "Continuous Learning", color: "text-amber-400" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 section-dark relative overflow-hidden">
      {/* Subtle Dark Mesh Gradient Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + scrollProgress * 30}% ${50 - scrollProgress * 20}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
          transform: `scale(${1 + scrollProgress * 0.1})`
        }}
      ></div>

      {/* Subtle Ambient Light with Parallax */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-white/[0.02] blur-3xl"
        style={{ transform: `translateY(${scrollProgress * 100}px) translateX(${scrollProgress * -50}px)` }}
      ></div>
      <div
        className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-white/[0.015] blur-3xl"
        style={{ transform: `translateY(${scrollProgress * -80}px) translateX(${scrollProgress * 40}px)` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated Header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 2),
            transform: `translateY(${scrollProgress * -50}px) scale(${1 - scrollProgress * 0.1})`
          }}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full space-card border border-white/20 mb-6 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white/60 mr-2" />
            <span className="text-sm font-bold text-gradient-cosmic">ABOUT ME</span>
          </div>
          <h2 className="text-7xl md:text-8xl font-harry leading-tight">
            Know <span className="text-gradient-cosmic glow-purple">Me</span>
          </h2>
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Profile Section */}
          <div
            ref={el => elementsRef.current[0] = el}
            className={`space-y-8 transition-all duration-1000 ${visibleElements.has(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
          >
            {/* Profile Image Card */}
            <div className="relative group">
              {/* Rotating Ring */}
              <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-white/10 animate-spin" style={{ animationDuration: '30s' }}></div>

              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group-hover:border-white/20 transition-all duration-500">
                <img
                  src={AaryanImage}
                  alt="Aaryan Patel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Scan Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-2000"></div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-3xl text-white font-harry">Aaryan Patel</h3>
                  <p className="text-gray-400">Software Engineer</p>
                </div>

                {/* Corner Decorations */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-4 h-4 border-2 ${i === 0 ? 'top-4 left-4 border-t-white/40 border-l-white/40' :
                      i === 1 ? 'top-4 right-4 border-t-white/40 border-r-white/40' :
                        i === 2 ? 'bottom-4 left-4 border-b-white/40 border-l-white/40' :
                          'bottom-4 right-4 border-b-white/40 border-r-white/40'
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  ></div>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 space-card border-2 border-white/20 p-4 rounded-2xl shadow-xl backdrop-blur-sm">
                <div className="text-3xl font-black text-gradient-cosmic">{counters.experience}+</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-card border-2 border-white/10 p-6 rounded-2xl hover:scale-105 transition-transform group">
                <Rocket className="w-10 h-10 text-white/60 mb-3 group-hover:translate-y-[-5px] transition-transform" />
                <div className="text-4xl font-black text-gradient-cosmic">{counters.projects}+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>

              <div className="space-card border-2 border-white/10 p-6 rounded-2xl hover:scale-105 transition-transform group">
                <Star className="w-10 h-10 text-white/60 mb-3 group-hover:rotate-12 transition-transform" fill="currentColor" />
                <div className="text-4xl font-black text-gradient-nebula">{counters.satisfaction}%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right: About Content */}
          <div
            ref={el => elementsRef.current[1] = el}
            className={`space-y-8 transition-all duration-1000 delay-200 ${visibleElements.has(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
          >
            <div className="space-y-6">
              <h3 className="text-5xl text-white font-harry leading-tight">
                Cosmic Code <br />
                <span className="text-gradient-nebula animate-pulse-glow">Explorer</span>
              </h3>

              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p className="relative pl-6 before:content-['▸'] before:absolute before:left-0 before:text-purple-400 before:text-2xl">
                  I'm a Software Engineer navigating through the vast cosmos of technology. My mission is to build stellar applications that transcend dimensions.
                </p>
                <p className="relative pl-6 before:content-['▸'] before:absolute before:left-0 before:text-cyan-400 before:text-2xl">
                  When not coding, I explore new frontiers in AI and Machine Learning, constantly pushing the boundaries of what's possible.
                </p>
              </div>
            </div>

            {/* Passions */}
            <div className="flex flex-wrap gap-4">
              {passions.map((passion, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 space-card border border-purple-500/30 px-5 py-3 rounded-full hover:scale-105 hover:border-purple-500/60 transition-all"
                >
                  <passion.icon className={`w-5 h-5 ${passion.color}`} />
                  <span className="text-sm font-medium text-gray-300">{passion.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coding Profiles - Premium Glass Cards */}
        <div
          ref={el => elementsRef.current[2] = el}
          className="mb-24 relative"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-6">
              <Code2 className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium text-purple-300">COMPETITIVE PROGRAMMING</span>
            </div>
            <h3 className="text-5xl font-harry">
              Coding <span className="text-gradient-cosmic">Profiles</span>
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real-time stats from my coding journey across platforms
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center gap-8">
              {[1, 2].map((_, i) => (
                <div key={i} className="w-80 h-72 rounded-3xl bg-white/5 animate-pulse" />
              ))}
            </div>
          )}

          {/* Debug: Show if no profiles */}
          {!loading && codingProfiles.length === 0 && (
            <div className="text-center text-red-400 py-8">
              <p>No profiles loaded. Check console for errors.</p>
              <p className="text-sm text-gray-500 mt-2">API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}</p>
            </div>
          )}

          {/* Profile Cards Grid */}
          {!loading && codingProfiles.length > 0 && (
            <div
              className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto px-4"
            >
              {codingProfiles.map((profile, index) => {
                const isVisible = visibleElements.has(2)

                return (
                  <a
                    key={profile.platform || index}
                    href={profile.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-br ${profile.gradient || 'from-purple-500 to-cyan-500'} rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-500`} />

                    {/* Card */}
                    <div className="relative w-72 h-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl group-hover:border-white/40 group-hover:scale-105 transition-all duration-500 overflow-hidden">

                      {/* Animated Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient || 'from-purple-500/10 to-cyan-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                      </div>

                      {/* DEFAULT VIEW - Profile Preview */}
                      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:translate-y-4">
                        {/* Platform Icon */}
                        <div className={`w-24 h-24 bg-gradient-to-br ${profile.gradient || 'from-purple-500 to-cyan-500'} rounded-2xl flex items-center justify-center mb-5 shadow-2xl transition-all duration-300`}>
                          <span className="text-5xl">{profile.emoji || '💻'}</span>
                        </div>

                        {/* Platform Name */}
                        <h4 className="text-2xl text-white text-center mb-1 font-harry">
                          {profile.platform}
                        </h4>
                        <p className="text-gray-300 text-sm text-center mb-4">{profile.username}</p>

                        {/* Hover Hint */}
                        <div className="flex items-center gap-2 text-gray-400 text-xs mt-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                          <span>Hover to see stats</span>
                        </div>
                      </div>

                      {/* HOVER VIEW - Stats */}
                      <div className="absolute inset-0 p-6 flex flex-col opacity-0 scale-95 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
                        {/* Compact Header */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                          <div className={`w-12 h-12 bg-gradient-to-br ${profile.gradient || 'from-purple-500 to-cyan-500'} rounded-xl flex items-center justify-center shadow-lg`}>
                            <span className="text-2xl">{profile.emoji || '💻'}</span>
                          </div>
                          <div>
                            <h4 className="text-lg text-white font-harry">{profile.platform}</h4>
                            <p className="text-gray-300 text-xs">{profile.username}</p>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="flex-1 space-y-3">
                          {profile.stats && Object.keys(profile.stats).length > 0 ? (
                            Object.entries(profile.stats).map(([key, value], idx) => (
                              <div
                                key={key}
                                className="flex justify-between items-center py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all"
                                style={{
                                  transitionDelay: `${idx * 50}ms`
                                }}
                              >
                                <span className="text-gray-200 text-sm capitalize font-medium">{key}</span>
                                <span className="text-lg font-bold text-white group-hover:text-white transition-colors">
                                  {value}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-500 text-sm py-4">
                              Loading stats...
                            </div>
                          )}
                        </div>

                        {/* View Profile Link */}
                        <div className="pt-4 mt-auto text-center border-t border-white/10">
                          <span className="inline-flex items-center text-sm text-purple-300 hover:text-white transition-colors">
                            View Full Profile
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Corner Decorations */}
                      <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-white/30 rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Ambient Background Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          </div>
        </div>

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <div className="mb-24 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6">
                <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-yellow-300">HALL OF FAME</span>
              </div>
              <h3 className="text-5xl font-harry">
                My <span className="text-gradient-nebula glow-cyan">Achievements</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {achievements.map((achievement, idx) => {
                const IconComponent = achievementIcons[achievement.icon] || Trophy; // Dynamic Icon

                return (
                  <div
                    key={achievement.id}
                    className="group relative space-card p-6 border border-white/10 hover:border-yellow-500/40 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-yellow-500/30 transition-colors">
                          <IconComponent className="w-6 h-6 text-yellow-400" />
                        </div>
                        <span className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded-full">{achievement.date}</span>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        {achievement.description}
                      </p>

                      <button
                        onClick={() => setSelectedCertificate(achievement)}
                        className="w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all text-sm font-medium text-gray-300 hover:text-white group-hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Certificate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="relative max-w-4xl w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white max-w-[80%] truncate">{selectedCertificate.title}</h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="p-1 bg-black/50 h-[70vh] flex items-center justify-center">
              {/* Handle PDF vs Image */}
              {selectedCertificate.certificateImage && selectedCertificate.certificateImage.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={getCertificatePath(selectedCertificate.certificateImage)}
                  className="w-full h-full rounded-lg"
                  title="Certificate Preview"
                />
              ) : (
                <img
                  src={getCertificatePath(selectedCertificate.certificateImage)}
                  alt={selectedCertificate.title}
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x600?text=Certificate+Not+Found";
                  }}
                />
              )}
            </div>
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;