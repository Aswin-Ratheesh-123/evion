import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Car as CarIcon, Sparkles, Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<string>('milestone-01');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = [
        'milestone-01',
        'milestone-02',
        'milestone-03',
        'milestone-04',
        'milestone-05',
        'milestone-06',
        'milestone-07',
        'milestone-08',
      ];

      const scrollPos = window.scrollY + 280;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
    { number: '01', label: 'Connect', href: '#milestone-01', id: 'milestone-01' },
    { number: '02', label: 'Charge', href: '#milestone-02', id: 'milestone-02' },
    { number: '03', label: 'Destinations', href: '#milestone-03', id: 'milestone-03' },
    { number: '04', label: 'Scale', href: '#milestone-04', id: 'milestone-04' },
    { number: '05', label: 'Intelligence', href: '#milestone-05', id: 'milestone-05' },
    { number: '06', label: 'Energy', href: '#milestone-06', id: 'milestone-06' },
    { number: '07', label: 'Everywhere', href: '#milestone-07', id: 'milestone-07' },
    { number: '08', label: 'Future', href: '#milestone-08', id: 'milestone-08' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-2.5 sm:pt-4 px-3 sm:px-6 lg:px-8">
      {/* Floating Centered Navbar Box */}
      <div
        className={`max-w-7xl mx-auto w-full pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/[0.08] rounded-xl sm:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-[68px] flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white/98' : ''
        }`}
      >
        {/* ========================================================================= */}
        {/* 1. LEFT COLUMN: LOGO */}
        {/* ========================================================================= */}
        <div className="flex items-center flex-shrink-0 lg:flex-1 justify-start">
          <a
            href="#"
            className="flex items-center focus:outline-none group py-1"
            onClick={() => soundFx.playClick()}
            title="EVION - Return to Top"
          >
            <img
              src="/logo1.jpeg"
              alt="EVION"
              className="h-7 sm:h-8 lg:h-9 w-auto max-w-[115px] sm:max-w-[135px] lg:max-w-[145px] object-contain rounded-md transition-transform group-hover:scale-105"
            />
          </a>
        </div>

        {/* ========================================================================= */}
        {/* 2. CENTER COLUMN: NAVIGATION ITEMS (Desktop XL+) */}
        {/* ========================================================================= */}
        <nav className="hidden xl:flex items-center justify-center gap-1.5 2xl:gap-3 flex-shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setActiveSection(link.id);
                }}
                className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                  isActive ? 'bg-[#F7F7F7]' : 'hover:bg-[#F7F7F7]'
                }`}
              >
                <span
                  className={`text-[11px] font-mono transition-colors ${
                    isActive
                      ? 'text-[#65D900] font-bold'
                      : 'text-[#777777] group-hover:text-[#65D900]'
                  }`}
                >
                  {link.number}
                </span>
                <span
                  className={`text-[13px] tracking-tight transition-colors ${
                    isActive
                      ? 'text-[#000000] font-bold'
                      : 'text-[#111111] font-medium group-hover:text-[#000000]'
                  }`}
                >
                  {link.label}
                </span>

                {/* Active Underline Indicator */}
                {isActive && (
                  <span className="absolute -bottom-1 left-2 right-2 h-[2px] bg-[#65D900] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* ========================================================================= */}
        {/* 3. RIGHT COLUMN: CONTROLS & CTA BUTTON */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-end flex-shrink-0 lg:flex-1 gap-1.5 sm:gap-2.5">
          {/* Audio Feedback Toggle (Desktop & Tablet) */}
          <button
            onClick={toggleSound}
            className={`hidden sm:flex h-9 w-9 rounded-xl items-center justify-center border transition-all ${
              isMuted
                ? 'border-black/[0.08] text-[#777777] hover:text-[#000000] bg-[#F7F7F7] hover:bg-neutral-200'
                : 'border-[#65D900]/40 text-[#000000] bg-[#65D900]/15 ring-1 ring-[#65D900]/30 shadow-sm'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#000000]" />}
          </button>

          {/* EV Model Switcher (Tablet & Desktop) */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenVehicleModal();
            }}
            className="hidden md:flex h-9 items-center gap-2 px-3 rounded-xl text-xs font-semibold bg-[#F7F7F7] hover:bg-neutral-200 border border-black/[0.08] text-[#111111] hover:border-black/20 transition-all shadow-sm"
            title="Change Active EV Model"
          >
            <CarIcon className="w-3.5 h-3.5 text-[#000000]" />
            <span className="hidden lg:inline">{currentVehicle.name.replace('EVION ', '')}</span>
            <span className="w-2 h-2 rounded-full bg-[#65D900] shadow-[0_0_6px_#65D900]" />
          </button>

          {/* Primary CTA Button (Optimized label for mobile) */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenBookingModal();
            }}
            className="h-8.5 sm:h-9 lg:h-10 px-3 sm:px-4 lg:px-5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-[#000000] bg-[#65D900] hover:bg-[#7CFF00] shadow-sm sm:shadow-md shadow-[#65D900]/25 hover:shadow-lg hover:shadow-[#65D900]/40 transition-all flex items-center gap-1 sm:gap-1.5 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <span className="sm:inline hidden">EXPLORE SOLUTIONS</span>
            <span className="sm:hidden inline">EXPLORE</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile Sound Toggle & Hamburger Menu Button */}
          <div className="flex xl:hidden items-center gap-1 sm:gap-1.5">
            <button
              onClick={toggleSound}
              className={`sm:hidden h-8.5 w-8.5 rounded-lg flex items-center justify-center border transition-all ${
                isMuted
                  ? 'border-black/[0.08] text-[#777777] bg-[#F7F7F7]'
                  : 'border-[#65D900]/40 text-[#000000] bg-[#65D900]/15'
              }`}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#777777]" /> : <Volume2 className="w-3.5 h-3.5 text-[#000000]" />}
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl flex items-center justify-center bg-[#F7F7F7] hover:bg-neutral-200 border border-black/[0.08] text-[#111111] shadow-sm transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER / FLYOUT */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="max-w-7xl mx-auto w-full xl:hidden mt-2 pointer-events-auto bg-white/98 backdrop-blur-2xl border border-black/[0.08] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Active Model Header on Mobile */}
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#65D900] shadow-[0_0_6px_#65D900]" />
              <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider">
                Journey Navigation
              </span>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(false);
                onOpenVehicleModal();
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#F7F7F7] border border-black/[0.06] text-[10px] font-mono font-semibold text-[#111111]"
            >
              <CarIcon className="w-3 h-3 text-[#65D900]" />
              <span>{currentVehicle.name.replace('EVION ', '')}</span>
              <Sparkles className="w-2.5 h-2.5 text-[#65D900]" />
            </button>
          </div>

          {/* Navigation Links Grid / List */}
          <div className="grid grid-cols-2 gap-1.5 py-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-[#F7F7F7] text-[#000000] font-bold border border-black/[0.08] shadow-xs'
                      : 'text-[#333333] hover:bg-[#F7F7F7] border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className={`text-[10px] font-mono ${
                        isActive ? 'text-[#65D900] font-bold' : 'text-[#888888]'
                      }`}
                    >
                      {link.number}
                    </span>
                    <span className="text-xs font-medium truncate">{link.label}</span>
                  </span>
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#65D900] shrink-0" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-[#AAAAAA] shrink-0" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Quick Action Footer */}
          <div className="pt-2.5 mt-2 border-t border-black/[0.06] flex flex-col gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-2.5 rounded-xl bg-[#65D900] hover:bg-[#7CFF00] text-[#000000] text-xs font-bold shadow-md text-center flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98]"
            >
              <span>EXPLORE ENTERPRISE SOLUTIONS</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
