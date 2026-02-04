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
    <section id="contact" className="py-24 section-dark relative overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0 opacity-20">
        <div className="stars"></div>
        <div className="stars stars-layer-2"></div>
      </div>

      {/* Subtle Ambient Light */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/[0.02] blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/[0.015] blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2 rounded-full space-card border border-white/20 mb-4">
            <Rocket className="w-5 h-5 text-white/60 mr-2" />
            <span className="text-sm font-semibold text-gray-300">GET IN TOUCH</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6 font-harry">
            Contact <span className="text-gradient-cosmic glow-gold">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-400 mt-6 max-w-2xl mx-auto">
            Ready to start your next project? Let's connect!
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-3xl text-white mb-8 font-harry">Contact Channels</h3>

            <a href="mailto:your.email@example.com" className="space-card p-5 flex items-center space-x-4 hover-lift group border border-[#D4AF37]/20">
              <div className="w-14 h-14 space-card rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-[#D4AF37]/30 animate-pulse-glow">
                <Mail className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="font-medium text-white">aaryanpatel080@gmail.com</div>
              </div>
            </a>

            <a href="https://linkedin.com/in/aaryan-patel-9869962a2" target="_blank" rel="noopener noreferrer" className="space-card p-5 flex items-center space-x-4 hover-lift group border border-cyan-500/20">
              <div className="w-14 h-14 space-card rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-cyan-500/30 animate-pulse-glow">
                <Linkedin className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">LinkedIn</div>
                <div className="font-medium text-white">Aaryan Patel</div>
              </div>
            </a>

            <a href="https://github.com/MrNobody23-cloude" target="_blank" rel="noopener noreferrer" className="space-card p-5 flex items-center space-x-4 hover-lift group border border-pink-500/20">
              <div className="w-14 h-14 space-card rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-pink-500/30 animate-pulse-glow">
                <Github className="w-7 h-7 text-pink-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">GitHub</div>
                <div className="font-medium text-white">MrNobody23-cloude</div>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-card p-8 space-y-6 border border-[#D4AF37]/20 relative overflow-hidden">
              {/* Glowing Background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 blur-3xl"></div>

              <div className="relative z-10">
                <label htmlFor="name" className="block text-sm font-semibold text-[#D4AF37] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="space-input"
                  placeholder="Your name"
                />
              </div>

              <div className="relative z-10">
                <label htmlFor="email" className="block text-sm font-semibold text-[#D4AF37] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="space-input"
                  placeholder="email@example.com"
                />
              </div>

              <div className="relative z-10">
                <label htmlFor="message" className="block text-sm font-semibold text-[#D4AF37] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="space-input resize-none"
                  placeholder="Tell me about your cosmic project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="space-button space-button-primary w-full py-4 text-base group relative z-10"
              >
                <span className="flex items-center justify-center relative z-10">
                  {status === 'sending' ? 'Transmitting...' : 'Launch Message'}
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {status === 'success' && (
                <div className="p-4 space-card border border-green-500/30 rounded-lg text-green-300 text-center relative z-10 animate-scale-in">
                  ✓ Message received! I'll respond from across the stars soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 space-card border border-red-500/30 rounded-lg text-red-300 text-center relative z-10 animate-scale-in">
                  ✕ Transmission failed. Please try again or contact me directly via email.
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