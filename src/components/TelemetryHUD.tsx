import React, { useState } from 'react';
import type { MilestoneItem, VehicleModel } from '../types';
import { MILESTONES } from '../data/mockData';
import { soundFx } from '../utils/soundEffects';
import { Gauge, Battery, Zap, ChevronDown, ChevronUp, MapPin, Sparkles } from 'lucide-react';

interface TelemetryHUDProps {
  progress: number;
  speedKmh: number;
  batterySoc: number;
  activeMilestone: MilestoneItem | null;
  isCharging: boolean;
  vehicle: VehicleModel;
  onOpenVehicleModal: () => void;
  onSelectMilestone: (milestone: MilestoneItem) => void;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  progress,
  speedKmh,
  batterySoc,
  activeMilestone,
  isCharging,
  vehicle,
  onOpenVehicleModal,
  onSelectMilestone,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const nextMilestone =
    MILESTONES.find((m) => m.progressPercent > progress * 100) || MILESTONES[MILESTONES.length - 1];

  const handleScrollToMilestone = (milestone: MilestoneItem) => {
    soundFx.playClick();
    onSelectMilestone(milestone);
    const el = document.getElementById(`milestone-${milestone.number}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-xs sm:max-w-sm w-full transition-all duration-300">
      <div className="rounded-2xl bg-white/95 border border-black/10 backdrop-blur-xl text-[#050505] p-4 shadow-2xl shadow-black/10">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isCharging ? 'bg-[#65D900]' : 'bg-[#65D900]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isCharging ? 'bg-[#65D900]' : 'bg-[#65D900]'
                }`}
              />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#050505]">
              {isCharging ? '⚡ Milestone Docked' : 'Active Scroll Journey'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenVehicleModal();
              }}
              className="p-1 rounded-md text-[#555555] hover:text-black hover:bg-[#F7F7F7] transition-colors"
              title="Change EV Model"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#65D900]" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md text-[#555555] hover:text-black hover:bg-[#F7F7F7] transition-colors"
              title={isMinimized ? 'Expand HUD' : 'Minimize HUD'}
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="pt-3 space-y-3">
            {/* Primary Telemetry Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-xl bg-[#F7F7F7] border border-black/5 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 text-[10px] text-[#888888] uppercase font-mono">
                  <Gauge className="w-3 h-3 text-[#050505]" />
                  <span>Velocity</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#050505] mt-0.5">
                  {speedKmh} <span className="text-[10px] font-normal text-[#888888]">km/h</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-[#F7F7F7] border border-black/5 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 text-[10px] text-[#888888] uppercase font-mono">
                  <Battery className="w-3 h-3 text-[#3FA800]" />
                  <span>Battery</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#050505] mt-0.5 flex items-center gap-1">
                  <span>{batterySoc}%</span>
                  {isCharging && <Zap className="w-3 h-3 text-[#65D900] fill-[#65D900] animate-bounce" />}
                </div>
              </div>

              <div className="p-2 rounded-xl bg-[#F7F7F7] border border-black/5 flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 text-[10px] text-[#888888] uppercase font-mono">
                  <Zap className="w-3 h-3 text-[#050505]" />
                  <span>Output</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#3FA800] mt-0.5">
                  {isCharging ? '+350' : '0'}{' '}
                  <span className="text-[10px] font-normal text-[#888888]">kW</span>
                </div>
              </div>
            </div>

            {/* Current Active Milestone */}
            <div className="p-2.5 rounded-xl bg-[#F7F7F7] border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isCharging ? 'bg-[#65D900]/20 text-black animate-pulse' : 'bg-white border border-black/10 text-[#555555]'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#65D900]" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-mono text-[#888888] uppercase">
                    {isCharging ? 'Current Milestone' : 'Approaching'}
                  </div>
                  <div className="text-xs font-bold text-[#050505] truncate">
                    {activeMilestone ? activeMilestone.tag : nextMilestone.tag}
                  </div>
                </div>
              </div>
            </div>

            {/* Journey Progress */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#555555] mb-1.5">
                <span>Timeline Journey Progress</span>
                <span className="text-[#050505] font-bold">{Math.round(progress * 100)}%</span>
              </div>

              <div className="relative h-2 rounded-full bg-[#E5E5E5] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#65D900] to-[#7CFF00] transition-all duration-150"
                  style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                />
              </div>

              {/* Milestone Quick Ticks */}
              <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/[0.08]">
                {MILESTONES.map((ms) => {
                  const isPassed = progress * 100 >= ms.progressPercent;
                  const isCurrent = activeMilestone?.id === ms.id;

                  return (
                    <button
                      key={ms.id}
                      onClick={() => handleScrollToMilestone(ms)}
                      className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center text-[8px] font-mono ${
                        isCurrent
                          ? 'ring-2 ring-[#65D900] bg-[#65D900] scale-125 text-black font-bold'
                          : isPassed
                          ? 'bg-black'
                          : 'bg-[#D0D0D0] hover:bg-[#888888]'
                      }`}
                      title={`${ms.tag} — Click to navigate`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Vehicle Model Switcher Link */}
            <div className="flex items-center justify-between text-[11px] text-[#555555] pt-1 border-t border-black/[0.08]">
              <span className="truncate">{vehicle.name}</span>
              <button
                onClick={onOpenVehicleModal}
                className="text-[#3FA800] hover:text-black font-mono text-[10px] font-bold"
              >
                Switch Vehicle →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
