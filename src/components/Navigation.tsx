import React, { useState, useEffect } from 'react';
import { Zap, Volume2, VolumeX, Car as CarIcon, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import type { VehicleModel } from '../types';

interface NavigationProps {
  currentVehicle: VehicleModel;
  onOpenVehicleModal: () => void;
  onOpenBookingModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentVehicle,
  onOpenVehicleModal,
  onOpenBookingModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playClick();
    }
  };

  const navLinks = [
    { label: '01 Connect', href: '#milestone-01' },
    { label: '02 Charge', href: '#milestone-02' },
    { label: '03 Destinations', href: '#milestone-03' },
    { label: '04 Scale', href: '#milestone-04' },
    { label: '05 Intelligence', href: '#milestone-05' },
    { label: '06 Energy', href: '#milestone-06' },
    { label: '07 Everywhere', href: '#milestone-07' },
    { label: '08 Future', href: '#milestone-08' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 backdrop-blur-xl shadow-md shadow-black/[0.04] border-b border-black/[0.08]'
          : 'py-5 bg-white/60 backdrop-blur-md border-b border-black/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => soundFx.playClick()}
          >
            <div className="relative w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform border border-black/10">
              <Zap className="w-5 h-5 text-[#65D900] fill-[#65D900]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-[#050505] flex items-center gap-0.5">
                IDS<span className="text-[#65D900]">EVION</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-[#6B6B6B] font-semibold -mt-1">
                The Charging Journey
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundFx.playClick()}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#333333] hover:text-black hover:bg-[#F7F7F7] active:text-[#3FA800] transition-all font-mono"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Widgets */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all ${
                isMuted
                  ? 'border-black/10 text-[#888888] hover:text-black bg-white shadow-sm'
                  : 'border-[#65D900]/40 text-black bg-[#65D900]/15 shadow-sm ring-1 ring-[#65D900]/30'
              }`}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-black" />}
            </button>

            {/* Vehicle Model Selector Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenVehicleModal();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-black/10 hover:border-[#65D900] text-[#050505] hover:text-black transition-all shadow-sm"
              title="Change EV Model"
            >
              <CarIcon className="w-3.5 h-3.5 text-black" />
              <span className="hidden md:inline">{currentVehicle.name.replace('IDSEVION ', '')}</span>
              <span className="w-2 h-2 rounded-full bg-[#65D900] shadow-[0_0_6px_#65D900]" />
            </button>

            {/* Primary CTA: Explore Solutions */}
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenBookingModal();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black bg-[#65D900] hover:bg-[#7CFF00] shadow-md shadow-[#65D900]/25 hover:shadow-lg hover:shadow-[#65D900]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>EXPLORE SOLUTIONS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white border border-black/10 text-[#050505]"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-black" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-black/10 text-[#050505] shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-b border-black/[0.08] px-6 py-5 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-mono font-semibold text-[#333333] hover:text-[#3FA800] py-1 border-b border-neutral-100"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVehicleModal();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F7F7F7] border border-black/10 text-xs font-semibold text-[#050505]"
              >
                <span className="flex items-center gap-2">
                  <CarIcon className="w-4 h-4 text-black" />
                  <span>EV Model: {currentVehicle.name}</span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#65D900]" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-2.5 rounded-xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold shadow-md text-center"
              >
                EXPLORE SOLUTIONS
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
