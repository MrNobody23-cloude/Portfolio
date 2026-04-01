import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Rocket } from 'lucide-react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      to_name: 'Aaryan',
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      }, (err) => {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      });
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header - The Universal Correspondence */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-6 py-2 rounded-full glass-panel border-[#D4AF37]/20 mb-8">
            <Mail className="w-4 h-4 text-[#D4AF37] mr-3" />
            <span className="text-xs font-bold tracking-[0.4em] text-[#d0c5af] uppercase font-cinzel">The Universal Correspondence</span>
          </div>
          <h2 className="text-6xl md:text-7xl text-white mb-8 font-cinzel tracking-tight leading-none">
            Summon <span className="text-reveal glow-gold">Aaryan</span>
          </h2>
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          <p className="text-xl text-[#99907c] mt-10 max-w-2xl mx-auto font-serif italic">
            "Direct your manifestations through the ethereal veil. Your queries shall be archived and addressed across the cosmic weave."
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16">
          {/* Contact Channels - The Relic Grid */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl text-white mb-10 font-cinzel tracking-tight">Ethereal <span className="text-[#D4AF37]">Nodes</span></h3>

            {[
              { 
                icon: Mail, 
                label: "Owl Post (Email)", 
                val: "aaryanpatel080@gmail.com", 
                href: "mailto:aaryanpatel080@gmail.com",
                color: "gold"
              },
              { 
                icon: Linkedin, 
                label: "Guild Link (LinkedIn)", 
                val: "Aaryan Patel", 
                href: "https://linkedin.com/in/aaryan-patel-9869962a2",
                color: "cyan"
              },
              { 
                icon: Github, 
                label: "Ancient Ledger (GitHub)", 
                val: "MrNobody23-cloude", 
                href: "https://github.com/MrNobody23-cloude",
                color: "white"
              }
            ].map((node, i) => (
              <a 
                key={i}
                href={node.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block p-1 overflow-hidden rounded-[2rem] transition-all duration-700 hover:box-glow-gold"
              >
                <div className="archive-card p-6 flex items-center gap-6 rounded-[1.9rem] border-white/5 group-hover:border-[#D4AF37]/40 transition-all duration-700">
                  <div className={`w-14 h-14 glass-panel-heavy rounded-2xl flex items-center justify-center border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-all duration-700`}>
                    <node.icon className={`w-6 h-6 text-[#d0c5af] group-hover:text-[#D4AF37] transition-all`} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#99907c] tracking-[0.2em] uppercase font-cinzel mb-1">{node.label}</div>
                    <div className="text-lg text-white font-cinzel group-hover:text-[#D4AF37] transition-colors">{node.val}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form - The Scroll of Invocation */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="archive-card p-12 rounded-[3rem] space-y-10 border-white/5 box-glow-gold">
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label htmlFor="name" className="text-[10px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase font-cinzel ml-2">
                    Caster's Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a]/50 border-b border-white/10 py-4 px-2 text-white font-serif italic focus:outline-none focus:border-[#D4AF37] transition-all duration-500 placeholder:text-white/10"
                    placeholder="Wanderer's Title..."
                  />
                </div>

                <div className="space-y-4">
                  <label htmlFor="email" className="text-[10px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase font-cinzel ml-2">
                    Return Sigil (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a]/50 border-b border-white/10 py-4 px-2 text-white font-serif italic focus:outline-none focus:border-[#D4AF37] transition-all duration-500 placeholder:text-white/10"
                    placeholder="example@ethereal.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="message" className="text-[10px] font-bold text-[#D4AF37] tracking-[0.3em] uppercase font-cinzel ml-2">
                  The Incantation (Message)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-[#0a0a0a]/50 border-b border-white/10 py-4 px-2 text-white font-serif italic focus:outline-none focus:border-[#D4AF37] transition-all duration-500 placeholder:text-white/10 resize-none"
                  placeholder="Whisper your intent into the archive..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative w-full overflow-hidden rounded-2xl p-[1px] transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-shimmer"></div>
                <div className="relative bg-[#050505] py-6 flex items-center justify-center gap-4 rounded-2xl">
                  <span className="text-xs font-bold text-[#D4AF37] tracking-[0.4em] uppercase font-cinzel">
                    {status === 'sending' ? 'Manifesting...' : 'Seal & Manifest'}
                  </span>
                  <Send className={`w-5 h-5 text-[#D4AF37] transition-transform duration-500 group-hover:translate-x-2`} />
                </div>
              </button>

              {status === 'success' && (
                <div className="text-center py-4 px-8 glass-panel border-[#D4AF37]/20 rounded-2xl animate-fade-in">
                  <p className="text-[#D4AF37] font-serif italic">"The invocation has been recorded. It shall echo in the hall of replies."</p>
                </div>
              )}

              {status === 'error' && (
                <div className="text-center py-4 px-8 glass-panel border-[#AE0001]/20 rounded-2xl animate-shake">
                  <p className="text-[#AE0001] font-serif italic">"The ritual failed. The ethereal static is too strong. Please retry."</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Contact;