import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

interface FinalDestinationSectionProps {
  isCarAtDestination: boolean;
  onGetStarted: () => void;
  onContactUs: () => void;
}

export const FinalDestinationSection: React.FC<FinalDestinationSectionProps> = ({
  isCarAtDestination,
  onGetStarted,
  onContactUs,
}) => {
  const firedConfettiRef = useRef(false);

  useEffect(() => {
    if (isCarAtDestination && !firedConfettiRef.current) {
      firedConfettiRef.current = true;
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.8 },
          colors: ['#65D900', '#7CFF00', '#000000', '#1C1C1C'],
        });
      } catch {
        // Fallback
      }
    } else if (!isCarAtDestination) {
      firedConfettiRef.current = false;
    }
  }, [isCarAtDestination]);

  return (
    <section id="destination" className="relative py-32 bg-white text-[#050505] overflow-hidden">
      <div className="absolute inset-0 grid-bg-pattern opacity-30 pointer-events-none" />

      <div
        data-journey-id="section-8"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 text-center w-full"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505] mb-8 shadow-sm">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isCarAtDestination ? 'bg-[#65D900]' : 'bg-[#65D900]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isCarAtDestination ? 'bg-[#65D900]' : 'bg-[#65D900]'
              }`}
            />
          </span>
          <span>
            {isCarAtDestination
              ? '🎉 JOURNEY COMPLETE • APEX MEGAWATT HUB REACHED'
              : 'FINAL DESTINATION • APEX MEGAWATT HUB'}
          </span>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#050505] leading-[1.1]">
            Drive Into the{' '}
            <span className="text-[#65D900]">
              Future
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#555555] leading-relaxed font-normal">
            Building smarter charging infrastructure for the electric mobility era. Join hundreds of property owners, commercial fleets, and EV drivers accelerating clean transport.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                soundFx.playCelebrationChime();
                onGetStarted();
              }}
              className="px-8 py-4 rounded-2xl bg-[#65D900] hover:bg-[#7CFF00] text-black font-bold text-sm shadow-lg shadow-[#65D900]/25 transition-all flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onContactUs();
              }}
              className="px-8 py-4 rounded-2xl bg-white border border-black text-black hover:bg-black hover:text-white font-bold text-sm transition-all"
            >
              <span>Contact IDSEVION</span>
            </button>
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-black/10 shadow-xl group">
          <img
            src="/images/future-megahub.jpg"
            alt="IDSEVION Apex Megawatt EV Destination Superhub"
            className="w-full h-80 sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-1000"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#111111]/90 border border-white/10 backdrop-blur-xl text-left text-white">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Apex Megawatt Hub Beta</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#65D900]/20 text-[#65D900] font-bold border border-[#65D900]/30">
                  Zero-Carbon Microgrid
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-0.5">
                50 Ultra-Power Bays • Integrated Solar Canopy • 2.5MWh Battery Energy Storage
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onGetStarted();
              }}
              className="px-4 py-2 rounded-xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold font-mono transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Explore Deployment</span>
              <Sparkles className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
