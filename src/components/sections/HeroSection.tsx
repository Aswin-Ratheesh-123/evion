import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

interface HeroSectionProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-white">
      {/* Subtle Grid Ambient Radiance */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#65D900]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Story Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full flex-1 flex flex-col justify-center">
        {/* Editorial Pill */}
        <div className="flex items-center justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 shadow-sm text-xs font-semibold text-[#050505] backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65D900] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65D900]" />
            </span>
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold">The Charging Journey</span>
            <span className="text-[#888888]">|</span>
            <span className="text-[#555555] font-normal">Next-Gen Ultra-Fast EV Infrastructure</span>
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-[#050505] leading-[1.05]">
              Charging the{' '}
              <span className="text-[#65D900]">
                Future of Mobility
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#555555] max-w-xl font-normal leading-relaxed">
              Intelligent EV charging infrastructure designed for the journeys ahead. Scroll down to follow the vehicle through the future of charging.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onExploreClick();
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-sm font-bold shadow-lg shadow-[#65D900]/25 hover:shadow-xl hover:shadow-[#65D900]/40 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE SOLUTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onContactClick();
                }}
                className="px-7 py-3.5 rounded-2xl bg-white border border-black text-black hover:bg-black hover:text-white text-sm font-bold shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>CONTACT US</span>
              </button>
            </div>

            {/* Fast Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg">
              <div className="border-l-2 border-[#65D900] pl-3">
                <div className="text-2xl font-extrabold font-mono text-[#050505]">350 kW</div>
                <div className="text-xs text-[#555555] font-medium">Liquid-Cooled DC</div>
              </div>
              <div className="border-l-2 border-black pl-3">
                <div className="text-2xl font-extrabold font-mono text-[#050505]">99.98%</div>
                <div className="text-xs text-[#555555] font-medium">Verified Uptime</div>
              </div>
              <div className="border-l-2 border-[#3FA800] pl-3">
                <div className="text-2xl font-extrabold font-mono text-[#050505]">12 Mins</div>
                <div className="text-xs text-[#555555] font-medium">10-80% Charge</div>
              </div>
            </div>
          </div>

          {/* Large Hero EV Showcase Scene (Right side) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 group">
              <img
                src="/images/hero-charging.jpg"
                alt="EVION Ultra-Fast EV Charging Station"
                className="w-full h-80 sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-[#65D900] text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  Origin Hub Station Alpha
                </span>
                <h3 className="text-lg font-bold mt-1.5 text-white">Starting Point</h3>
                <p className="text-xs text-neutral-300">
                  Ready to embark on the electric mobility journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full pt-8 flex items-center justify-between z-10 text-xs font-mono text-[#555555]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#65D900] animate-ping" />
          <span className="font-bold text-[#050505]">VEHICLE READY AT TIMELINE ORIGIN</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F7F7] border border-black/10 text-[#050505] shadow-sm animate-bounce font-bold">
          <span>SCROLL TO START THE JOURNEY</span>
          <ChevronDown className="w-4 h-4 text-[#65D900]" />
        </div>
      </div>
    </section>
  );
};
