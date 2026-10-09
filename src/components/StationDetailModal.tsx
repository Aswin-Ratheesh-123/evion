import React from 'react';
import type { StationNode } from '../types';
import { soundFx } from '../utils/soundEffects';
import { X, Zap, MapPin, Clock, Gauge, CheckCircle, Navigation, Radio } from 'lucide-react';

interface StationDetailModalProps {
  station: StationNode | null;
  onClose: () => void;
  onNavigateToSection: (sectionIndex: number) => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({
  station,
  onClose,
  onNavigateToSection,
}) => {
  if (!station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#111111] text-white">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#65D900]/20 border border-[#65D900]/40 text-[#65D900] text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5 fill-[#65D900]" />
              <span>{station.powerKw} kW DC ULTRA-FAST</span>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-xl font-extrabold mt-3 text-white">{station.name}</h3>
          <p className="text-xs text-neutral-400 font-medium flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#65D900]" />
            {station.location} • {station.subTitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-[#555555] leading-relaxed">{station.description}</p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-[#F7F7F7] border border-black/10 flex flex-col items-center text-center">
              <Clock className="w-4 h-4 text-[#050505] mb-1" />
              <span className="text-[10px] uppercase font-mono text-[#888888]">10-80% Time</span>
              <span className="text-sm font-bold text-[#050505] mt-0.5 font-mono">
                {station.metrics.chargeTimeMin} mins
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7F7F7] border border-black/10 flex flex-col items-center text-center">
              <Gauge className="w-4 h-4 text-[#3FA800] mb-1" />
              <span className="text-[10px] uppercase font-mono text-[#888888]">Peak Rate</span>
              <span className="text-sm font-bold text-[#050505] mt-0.5 font-mono">
                {station.powerKw} kW
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7F7F7] border border-black/10 flex flex-col items-center text-center">
              <Radio className="w-4 h-4 text-[#050505] mb-1" />
              <span className="text-[10px] uppercase font-mono text-[#888888]">Architecture</span>
              <span className="text-sm font-bold text-[#050505] mt-0.5 font-mono">
                {station.voltageV}V
              </span>
            </div>
          </div>

          {/* Bay status & protocols */}
          <div className="p-4 rounded-2xl bg-[#F7F7F7] border border-black/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#555555]">Real-time Bay Availability:</span>
              <span className="font-bold text-[#3FA800] flex items-center gap-1 font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-[#65D900]" /> {station.metrics.availability}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#555555]">Protocol Support:</span>
              <span className="font-bold text-[#050505] font-mono">CCS2 • NACS (Tesla) • CHAdeMO</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#555555]">Grid Integration:</span>
              <span className="font-bold text-[#3FA800] font-mono">100% Certified Renewable</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#F7F7F7] border-t border-black/10 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-black/15 text-xs font-semibold text-[#050505] hover:bg-neutral-200 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onNavigateToSection(station.sectionIndex);
              onClose();
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold shadow-md shadow-[#65D900]/25 transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Scroll Directly to Station</span>
          </button>
        </div>
      </div>
    </div>
  );
};
