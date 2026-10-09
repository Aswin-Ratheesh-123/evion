import React, { useState } from 'react';
import { Zap, Cpu, Wifi, Activity } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

interface SmartChargingSectionProps {
  isChargingHere: boolean;
}

export const SmartChargingSection: React.FC<SmartChargingSectionProps> = ({
  isChargingHere,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'thermal' | 'load'>('matrix');

  return (
    <section id="smart-charging" className="relative py-28 bg-[#F7F7F7] text-[#050505] overflow-hidden">
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />

      <div
        data-journey-id="section-2"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 w-full"
      >
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-semibold text-[#050505] font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#65D900]" />
            <span>SECTION 03</span>
            <span className="text-[#888888]">•</span>
            <span className="text-[#555555]">AI POWER ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#050505] leading-[1.15]">
            Smart Charging.{' '}
            <span className="text-[#65D900]">
              Seamless Experience.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            Real-time algorithmic energy distribution, predictive battery thermal preconditioning, and autonomous Plug & Charge technology powered by ISO 15118.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-black/10 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#111111] flex items-center justify-center shadow-sm">
                    <Zap className="w-5 h-5 text-[#65D900] fill-[#65D900]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-mono text-[#050505]">EVION MATRIX-AI</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#65D900]/15 text-[#3FA800] border border-[#65D900]/30 font-bold">
                        {isChargingHere ? 'CONNECTED • CHARGING' : 'STANDBY READY'}
                      </span>
                    </div>
                    <span className="text-xs text-[#888888] font-mono">OCPP 2.0.1 • 800V DC High Voltage</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#555555]">
                  <Wifi className="w-4 h-4 text-[#65D900] animate-pulse" />
                  <span>5G TELEMETRY</span>
                </div>
              </div>

              <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="relative flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        stroke="#F0F0F0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="68"
                        stroke="url(#dialGrad)"
                        strokeWidth="12"
                        strokeDasharray={427}
                        strokeDashoffset={isChargingHere ? 427 * (1 - 0.82) : 427 * (1 - 0.45)}
                        strokeLinecap="round"
                        fill="none"
                        className="transition-all duration-700"
                      />
                      <defs>
                        <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#65D900" />
                          <stop offset="100%" stopColor="#7CFF00" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                        {isChargingHere ? 'Battery Level' : 'Initial SOC'}
                      </span>
                      <span className="text-4xl font-extrabold font-mono text-[#050505] tracking-tight">
                        {isChargingHere ? '82%' : '45%'}
                      </span>
                      <span className="text-[11px] font-mono text-[#3FA800] mt-0.5 font-bold">
                        {isChargingHere ? '+245 km added' : 'Ready to Plug'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#F7F7F7] border border-black/5">
                    <div className="flex justify-between text-xs font-mono text-[#555555]">
                      <span>Charging Speed</span>
                      <span className="text-[#3FA800] font-bold">
                        {isChargingHere ? '348.6 kW' : '350.0 kW Max'}
                      </span>
                    </div>
                    <div className="text-lg font-mono font-bold text-[#050505] mt-1">
                      {isChargingHere ? '1,180 km/hour rate' : 'Ready for 800V EV'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F7F7F7] border border-black/5">
                    <div className="flex justify-between text-xs font-mono text-[#555555]">
                      <span>Time Remaining to 80%</span>
                      <span className="text-[#3FA800] font-bold">
                        {isChargingHere ? '4 mins' : '10 mins typical'}
                      </span>
                    </div>
                    <div className="text-lg font-mono font-bold text-[#050505] mt-1">
                      {isChargingHere ? 'Battery Cell Balancing' : 'Plug & Charge Autostart'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('matrix');
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      activeTab === 'matrix'
                        ? 'bg-[#65D900] text-black font-bold shadow-sm'
                        : 'bg-[#F2F2F2] text-[#555555] hover:text-black'
                    }`}
                  >
                    AI Matrix
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('thermal');
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      activeTab === 'thermal'
                        ? 'bg-[#65D900] text-black font-bold shadow-sm'
                        : 'bg-[#F2F2F2] text-[#555555] hover:text-black'
                    }`}
                  >
                    Liquid Thermal
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveTab('load');
                    }}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      activeTab === 'load'
                        ? 'bg-[#65D900] text-black font-bold shadow-sm'
                        : 'bg-[#F2F2F2] text-[#555555] hover:text-black'
                    }`}
                  >
                    Grid Balancing
                  </button>
                </div>

                <span className="text-[#888888] hidden sm:inline">ISO 15118 Authen. Active</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] text-[#050505] flex items-center justify-center mb-3 border border-black/5">
                <Cpu className="w-5 h-5 text-[#65D900]" />
              </div>
              <h3 className="text-lg font-bold text-[#050505]">Dynamic AI Load Balancing</h3>
              <p className="text-xs text-[#555555] mt-1.5 leading-relaxed">
                Smart microgrid algorithms dynamically distribute power between parallel bays in milliseconds to eliminate grid demand spikes and maximize driver throughput.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] text-[#050505] flex items-center justify-center mb-3 border border-black/5">
                <Activity className="w-5 h-5 text-[#3FA800]" />
              </div>
              <h3 className="text-lg font-bold text-[#050505]">Continuous Cell Health Guard</h3>
              <p className="text-xs text-[#555555] mt-1.5 leading-relaxed">
                High-frequency impedance analysis adjusts the current curve in real time to preserve lithium battery longevity while delivering maximum continuous power.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
