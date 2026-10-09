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
    <aside
      aria-label="Active Scroll Journey Status Widget"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 w-[calc(100vw-32px)] max-w-[300px] sm:max-w-[316px] transition-all duration-300 pointer-events-none select-none"
    >
      <div className="rounded-[12px] sm:rounded-[14px] bg-white/95 border border-black/[0.08] backdrop-blur-md text-[#111111] p-2 sm:p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] pointer-events-auto">
        {/* ========================================================================= */}
        {/* HEADER BAR (~32-34px) */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.07] h-[30px] sm:h-[32px]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#65D900]" />
              <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#65D900]" />
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-[#111111]">
              {isCharging ? '⚡ Docked' : 'Active Scroll Journey'}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenVehicleModal();
              }}
              className="p-1 rounded text-[#777777] hover:text-[#111111] hover:bg-[#F4F4F4] transition-colors"
              title="Change EV Model"
              aria-label="Change EV Model"
            >
              <Sparkles className="w-3 h-3 text-[#65D900]" />
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setIsMinimized(!isMinimized);
              }}
              className="p-1 rounded text-[#777777] hover:text-[#111111] hover:bg-[#F4F4F4] transition-colors"
              title={isMinimized ? 'Expand HUD' : 'Minimize HUD'}
              aria-label={isMinimized ? 'Expand HUD' : 'Minimize HUD'}
            >
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPACT HUD BODY */}
        {/* ========================================================================= */}
        {!isMinimized && (
          <div className="pt-1.5 space-y-1.5">
            {/* 1. Primary Stat Cards (Height ~48-52px, gap 6px) */}
            <div className="grid grid-cols-3 gap-1.5">
              {/* Velocity */}
              <div className="h-[48px] sm:h-[50px] px-1 py-1 rounded-lg bg-[#F7F7F7] border border-black/[0.04] flex flex-col items-center justify-center">
                <div className="flex items-center gap-0.5 text-[8px] sm:text-[8.5px] text-[#777777] uppercase font-mono leading-none">
                  <Gauge className="w-2.5 h-2.5 text-[#111111]" />
                  <span>Velocity</span>
                </div>
                <div className="text-[13.5px] sm:text-[14.5px] font-mono font-bold text-[#111111] mt-1 leading-none">
                  {speedKmh} <span className="text-[8px] sm:text-[8.5px] font-normal text-[#777777]">km/h</span>
                </div>
              </div>

              {/* Battery */}
              <div className="h-[48px] sm:h-[50px] px-1 py-1 rounded-lg bg-[#F7F7F7] border border-black/[0.04] flex flex-col items-center justify-center">
                <div className="flex items-center gap-0.5 text-[8px] sm:text-[8.5px] text-[#777777] uppercase font-mono leading-none">
                  <Battery className="w-2.5 h-2.5 text-[#3FA800]" />
                  <span>Battery</span>
                </div>
                <div className="text-[13.5px] sm:text-[14.5px] font-mono font-bold text-[#111111] mt-1 leading-none flex items-center gap-0.5">
                  <span>{batterySoc}%</span>
                  {isCharging && (
                    <Zap className="w-2.5 h-2.5 text-[#65D900] fill-[#65D900] animate-bounce" />
                  )}
                </div>
              </div>

              {/* Output */}
              <div className="h-[48px] sm:h-[50px] px-1 py-1 rounded-lg bg-[#F7F7F7] border border-black/[0.04] flex flex-col items-center justify-center">
                <div className="flex items-center gap-0.5 text-[8px] sm:text-[8.5px] text-[#777777] uppercase font-mono leading-none">
                  <Zap className="w-2.5 h-2.5 text-[#111111]" />
                  <span>Output</span>
                </div>
                <div className="text-[13.5px] sm:text-[14.5px] font-mono font-bold text-[#3FA800] mt-1 leading-none">
                  {isCharging ? '+350' : '0'}{' '}
                  <span className="text-[8px] sm:text-[8.5px] font-normal text-[#777777]">kW</span>
                </div>
              </div>
            </div>

            {/* 2. Approaching Milestone (Height ~38-42px) */}
            <div className="h-[38px] sm:h-[40px] px-2 py-1 rounded-lg bg-[#F7F7F7] border border-black/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <div
                  className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-md flex items-center justify-center shrink-0 ${
                    isCharging
                      ? 'bg-[#65D900]/20 text-black animate-pulse'
                      : 'bg-white border border-black/[0.08] text-[#555555]'
                  }`}
                >
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#65D900]" />
                </div>
                <div className="truncate">
                  <div className="text-[7.5px] sm:text-[8px] font-mono text-[#777777] uppercase tracking-wider leading-none">
                    {isCharging ? 'Current Milestone' : 'Approaching'}
                  </div>
                  <div className="text-[10.5px] sm:text-[11.5px] font-bold text-[#111111] truncate leading-tight mt-0.5">
                    {activeMilestone ? activeMilestone.tag : nextMilestone.tag}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Timeline Progress (Height minimal, 2px progress bar, 10px dots) */}
            <div className="pt-0.5">
              <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-[#777777] mb-0.5">
                <span>Timeline Journey Progress</span>
                <span className="text-[#111111] font-bold">{Math.round(progress * 100)}%</span>
              </div>

              <div className="relative h-[2px] rounded-full bg-[#EAEAEA] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#65D900] to-[#7CFF00] transition-all duration-150"
                  style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                />
              </div>

              {/* Milestone Quick Navigation Dots (10px diameter) */}
              <div className="flex items-center justify-between mt-1 pt-0.5 border-t border-black/[0.05]">
                {MILESTONES.map((ms) => {
                  const isPassed = progress * 100 >= ms.progressPercent;
                  const isCurrent = activeMilestone?.id === ms.id;

                  return (
                    <button
                      key={ms.id}
                      onClick={() => handleScrollToMilestone(ms)}
                      className={`w-2.5 h-2.5 rounded-full transition-all flex items-center justify-center text-[6px] font-mono ${
                        isCurrent
                          ? 'ring-2 ring-[#65D900] bg-[#65D900] scale-110 text-black font-bold'
                          : isPassed
                          ? 'bg-[#111111]'
                          : 'bg-[#D4D4D4] hover:bg-[#888888]'
                      }`}
                      title={`${ms.tag} — Click to navigate`}
                      aria-label={`Navigate to ${ms.tag}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* 4. Bottom Row (Height ~22-24px): Vehicle Name & Switch Link */}
            <div className="flex items-center justify-between h-[20px] sm:h-[22px] pt-1 border-t border-black/[0.06] text-[9px] sm:text-[9.5px]">
              <span className="text-[#777777] font-medium truncate max-w-[150px] leading-none">
                {vehicle.name}
              </span>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenVehicleModal();
                }}
                className="text-[#3FA800] hover:text-[#111111] font-mono font-bold transition-colors whitespace-nowrap leading-none"
              >
                Switch Vehicle →
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
