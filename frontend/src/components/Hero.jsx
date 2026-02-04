import React, { useEffect, useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Rocket, Sparkles, Wand2 } from 'lucide-react';
import AaryanPatel_Resume from '../MyInfo/AaryanPatel_Resume.pdf';

function Hero() {
  const heroRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX - window.innerWidth / 2) / 40;
      targetY = (e.clientY - window.innerHeight / 2) / 40;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.setProperty('--scroll-y', `${scrollY}px`);
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (heroRef.current) {
        heroRef.current.style.setProperty('--mouse-x', currentX);
        heroRef.current.style.setProperty('--mouse-y', currentY);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
      style={{
        '--mouse-x': '0',
        '--mouse-y': '0',
        '--scroll-y': '0px'
      }}
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transform: 'translate3d(calc(var(--mouse-x) * 2px), calc(var(--mouse-y) * 2px), 0)',
            willChange: 'transform'
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Column */}
            <div className="space-y-8 lg:pr-12">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl leading-tight font-harry">
                  <span className="block text-gray-400 text-2xl sm:text-3xl font-normal mb-2">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                    Aaryan Patel
                  </span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-[2px] bg-gradient-to-r from-white to-gray-500"></div>
                  <p className="text-2xl sm:text-3xl font-semibold text-gray-300">Software Engineer</p>
                </div>
              </div>

              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl">
                Crafting innovative digital solutions with a focus on clean code, exceptional user experience, and cutting-edge technology.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#contact" className="group px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl font-semibold text-white shadow-lg border border-white/10 transition-all hover:scale-105">
                  <span className="flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href={AaryanPatel_Resume} download className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Resume
                </a>
              </div>

              <div className="flex items-center gap-4 pt-4">
                {[
                  { icon: Github, href: 'https://github.com/MrNobody23-cloude' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/aaryan-patel-9869962a2' },
                  { icon: Mail, href: 'mailto:aaryanpatel080@gmail.com' }
                ].map((social, i) => (
                  <a key={i} href={social.href} className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all">
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Stark-Potter Hybrid */}
            <div className="relative lg:block hidden group">
              <div
                className="relative w-full h-[650px] flex items-center justify-center"
                style={{
                  transform: 'perspective(1000px) rotateX(calc(var(--mouse-y) * -0.2deg)) rotateY(calc(var(--mouse-x) * 0.2deg))',
                  willChange: 'transform'
                }}
              >
                {/* HUD Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                  <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite]">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500/20">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,7" />
                      <text x="50" y="2" className="text-[3px] font-harry" fill="currentColor">ALOHOMORA REVELIO LUMOS</text>
                    </svg>
                  </div>
                  <div className="absolute w-[420px] h-[420px] border border-yellow-500/10 rounded-full animate-[spin_20s_linear_infinite_reverse]">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500/30">
                      <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="currentColor" strokeWidth="0.2" />
                    </svg>
                  </div>
                </div>

                {/* Skill Shards */}
                {[
                  { name: 'MERN', stone: 'Reality', color: 'bg-red-500', angle: -60, dist: 220, icon: Rocket },
                  { name: 'M.L.', stone: 'Time', color: 'bg-green-500', angle: 0, dist: 230, icon: Sparkles },
                  { name: 'MongoDB,SQL', stone: 'Space', color: 'bg-blue-500', angle: 60, dist: 220, icon: Wand2 },
                  { name: 'Python', stone: 'Mind', color: 'bg-yellow-400', angle: 120, dist: 220, icon: Sparkles },
                  { name: 'Java', stone: 'Soul', color: 'bg-orange-500', angle: 180, dist: 230, icon: Rocket },
                  { name: 'DSA', stone: 'Power', color: 'bg-[#D4AF37]', angle: 240, dist: 220, icon: Wand2 }
                ].map((shard, index) => {
                  const rad = (shard.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * shard.dist;
                  const y = Math.sin(rad) * shard.dist;
                  const Icon = shard.icon;

                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 group/shard cursor-pointer z-30"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div className="relative w-16 h-20 bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl transition-all duration-500 group-hover/shard:scale-125 group-hover/shard:border-yellow-500/50 group-hover/shard:shadow-[0_0_20px_rgba(234,179,8,0.3)] overflow-hidden animate-[bounce_4s_ease-in-out_infinite]"
                        style={{ animationDelay: `${index * 0.5}s` }}>
                        <div className={`absolute inset-0 opacity-10 ${shard.color} blur-xl group-hover/shard:opacity-40 transition-opacity`}></div>
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2">
                          <Icon className="w-8 h-8 text-white/80 group-hover/shard:rotate-12 transition-transform" />
                          <p className="text-[10px] font-harry text-white/40 mt-1 uppercase tracking-widest">{shard.stone}</p>
                        </div>
                      </div>

                      {/* Tooltip Label */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/shard:opacity-100 transition-all duration-300 transform group-hover/shard:-translate-y-2 pointer-events-none">
                        <div className="bg-black/90 px-4 py-1.5 rounded border border-yellow-500/50 shadow-2xl">
                          <p className="text-sm text-yellow-500 font-harry tracking-widest uppercase">{shard.name}</p>
                        </div>
                      </div>

                      {/* Magical Link Beam */}
                      <div className={`absolute top-1/2 left-1/2 -translate-y-1/2 w-0 h-[1px] ${shard.color} opacity-0 group-hover/shard:opacity-20 transition-all duration-700 origin-left bg-gradient-to-r from-white to-transparent`}
                        style={{
                          width: `${shard.dist}px`,
                          transform: `rotate(${shard.angle + 180}deg)`
                        }}></div>
                    </div>
                  );
                })}

                {/* Central Core */}
                <div className="relative z-20 w-56 h-56 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[3px] border-yellow-500/20 border-t-yellow-500/80 animate-[spin_4s_linear_infinite]"></div>
                  <div className="absolute inset-4 rounded-full border-[1.5px] border-white/10 border-b-white/50 animate-[spin_8s_linear_infinite_reverse]"></div>
                  <div className="w-48 h-48 rounded-full p-1 bg-gradient-to-br from-yellow-500/40 via-gray-900 to-yellow-500/40 shadow-[0_0_80px_rgba(234,179,8,0.2)] overflow-hidden">
                    <div className="w-full h-full rounded-full bg-black relative flex items-center justify-center border border-white/5">
                      <div className="absolute inset-0 opacity-40">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e3a8a_0%,transparent_60%)] animate-pulse"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#4c1d95_0%,transparent_60%)]"></div>
                      </div>
                      <div className="text-center relative z-20">
                        <Wand2 className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] animate-[bounce_3s_ease-in-out_infinite]" />
                        <p className="text-3xl font-harry text-yellow-400">Skills</p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;