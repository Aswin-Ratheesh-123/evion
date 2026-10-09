import React from 'react';
import { Shield, Clock, BatteryCharging } from 'lucide-react';
import type { StationNode } from '../../types';

interface JourneySectionProps {
  isChargingHere: boolean;
  station: StationNode | undefined;
  onOpenBooking: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  isChargingHere,
  station,
}) => {
  return (
    <section id="journey" className="relative py-28 bg-[#F7F7F7] overflow-hidden">
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />

      <div
        data-journey-id="section-1"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-semibold text-[#050505] font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>SECTION 02</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">THE EV JOURNEY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#050505] tracking-tight leading-[1.15]">
              Powering Every{' '}
              <span className="text-[#65D900]">
                Journey
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-xl">
              Reliable EV charging infrastructure designed to keep drivers moving. Seamlessly positioned across urban arterial roads, workplace hubs, and cross-country corridors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-[#050505] mb-2.5 border border-black/5">
                  <Clock className="w-4 h-4 text-[#050505]" />
                </div>
                <h4 className="font-bold text-[#050505] text-sm">Ultra-Fast 350kW Rate</h4>
                <p className="text-xs text-[#555555] mt-1">
                  Add up to 300 km (186 miles) of driving range in under 10 minutes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#F7F7F7] flex items-center justify-center text-[#3FA800] mb-2.5 border border-black/5">
                  <Shield className="w-4 h-4 text-[#65D900]" />
                </div>
                <h4 className="font-bold text-[#050505] text-sm">Universal Compatibility</h4>
                <p className="text-xs text-[#555555] mt-1">
                  Native CCS2, NACS (Tesla), and 800V silicon-carbide architecture.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-500 backdrop-blur-xl border ${
                isChargingHere
                  ? 'bg-white text-[#050505] border-[#65D900] shadow-[0_0_40px_rgba(101,217,0,0.2)] scale-[1.02] ring-2 ring-[#65D900]/20'
                  : 'bg-white text-[#050505] border-black/10 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isChargingHere ? 'bg-[#65D900] animate-ping' : 'bg-neutral-300'
                    }`}
                  />
                  <span
                    className={`text-xs font-mono font-bold tracking-wider uppercase ${
                      isChargingHere ? 'text-[#3FA800]' : 'text-[#888888]'
                    }`}
                  >
                    {isChargingHere ? '⚡ VEHICLE DOCKED & CHARGING' : 'STATION STANDBY'}
                  </span>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                    isChargingHere
                      ? 'bg-[#65D900]/15 text-[#3FA800] border border-[#65D900]/30'
                      : 'bg-[#F7F7F7] text-[#050505]'
                  }`}
                >
                  350 kW DC
                </span>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#888888] uppercase font-mono">Terminal ID</span>
                    <h3 className="text-lg font-bold text-[#050505]">
                      {station ? station.name : 'AeroPark Urban Fast-Node'}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#888888] uppercase font-mono">Current Output</span>
                    <div className="text-xl font-bold font-mono text-[#050505]">
                      {isChargingHere ? '348.4 kW' : '0.0 kW'}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#555555]">
                      Energy Delivered
                    </span>
                    <span className="font-bold text-[#3FA800]">
                      {isChargingHere ? '42.8 kWh (82%)' : 'Awaiting Vehicle...'}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#F2F2F2] overflow-hidden relative">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isChargingHere
                          ? 'w-[82%] bg-gradient-to-r from-[#65D900] to-[#7CFF00] animate-pulse'
                          : 'w-0 bg-[#65D900]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#F7F7F7] border border-black/5">
                    <div className="text-[10px] text-[#888888]">VOLTAGE</div>
                    <div className="font-bold text-[#050505] mt-0.5">824 V</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F7F7F7] border border-black/5">
                    <div className="text-[10px] text-[#888888]">AMPERAGE</div>
                    <div className="font-bold text-[#050505] mt-0.5">
                      {isChargingHere ? '422 A' : '0 A'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F7F7F7] border border-black/5">
                    <div className="text-[10px] text-[#888888]">EFFICIENCY</div>
                    <div className="font-bold text-[#3FA800] mt-0.5">98.6%</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[#555555]">
                  {isChargingHere
                    ? '✨ Real-time dynamic optical feedback active'
                    : 'Scroll vehicle over node to initiate fast charging'}
                </span>
                <BatteryCharging
                  className={`w-4 h-4 ${
                    isChargingHere ? 'text-[#65D900] animate-bounce' : 'text-[#888888]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
