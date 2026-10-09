import React, { useState } from 'react';
import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playStationChime();
    setSubscribed(true);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] text-white border-t border-neutral-900 pt-16 pb-12 relative z-30">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-800">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center">
              <img
                src="/logo1.jpeg"
                alt="EVION"
                className="h-8 sm:h-9 w-auto object-contain rounded-md select-none"
              />
            </div>

            <p className="text-xs text-[#A0A0A0] leading-relaxed max-w-sm">
              Next-generation ultra-fast EV charging infrastructure, AI microgrid intelligence, and turnkey enterprise fleet solutions.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#65D900] pt-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Global Network Status: 99.98% Operational</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              The Journey
            </h4>
            <ul className="space-y-2 text-xs text-white font-mono">
              <li><a href="#milestone-01" className="hover:text-[#65D900] transition-colors">01 Connect</a></li>
              <li><a href="#milestone-02" className="hover:text-[#65D900] transition-colors">02 Charge</a></li>
              <li><a href="#milestone-03" className="hover:text-[#65D900] transition-colors">03 Destinations</a></li>
              <li><a href="#milestone-04" className="hover:text-[#65D900] transition-colors">04 Scale</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Infrastructure
            </h4>
            <ul className="space-y-2 text-xs text-white font-mono">
              <li><a href="#milestone-05" className="hover:text-[#65D900] transition-colors">05 Intelligence</a></li>
              <li><a href="#milestone-06" className="hover:text-[#65D900] transition-colors">06 Smarter Energy</a></li>
              <li><a href="#milestone-07" className="hover:text-[#65D900] transition-colors">07 Everywhere</a></li>
              <li><a href="#milestone-08" className="hover:text-[#65D900] transition-colors">08 The Future</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Grid Insights
            </h4>
            <p className="text-xs text-[#A0A0A0]">
              Receive quarterly technology updates, new superhub corridor announcements, and infrastructure reports.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#65D900]/15 border border-[#65D900]/30 text-[#65D900] text-xs font-mono">
                ✓ Subscribed to EVION Grid Updates
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter corporate email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#65D900]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold transition-colors font-mono shadow-sm"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A0A0A0] font-mono">
          <div>
            © {new Date().getFullYear()} EVION Inc. All rights reserved. Powering the electric mobility era.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#A0A0A0] hover:text-[#65D900] transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Scroll to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
