import React, { useState } from 'react';
import { EV_COMPARISON_MODELS } from '../../data/mockData';
import type { EVComparisonModel } from '../../types';
import { soundFx } from '../../utils/soundEffects';
import { Smartphone, Zap, DollarSign, Clock, Compass } from 'lucide-react';

export const ForDriversSection: React.FC = () => {
  const [selectedEvId, setSelectedEvId] = useState<string>('tesla3');
  const startSoc = 15;
  const [targetSoc, setTargetSoc] = useState<number>(80);

  const selectedModel =
    EV_COMPARISON_MODELS.find((m: EVComparisonModel) => m.id === selectedEvId) ||
    EV_COMPARISON_MODELS[0];

  const energyNeededKwh = selectedModel.batteryKwh * ((targetSoc - startSoc) / 100);
  const averageChargeSpeedKw = Math.min(selectedModel.maxKw, 280) * 0.78;
  const chargeTimeMinutes = Math.max(4, Math.round((energyNeededKwh / averageChargeSpeedKw) * 60));
  const rangeAddedKm = Math.round((energyNeededKwh * 1000) / selectedModel.effWhKm);
  const rangeAddedMiles = Math.round(rangeAddedKm * 0.621371);
  const estimatedEvCost = (energyNeededKwh * 0.32).toFixed(2);
  const estimatedGasEquivalent = ((rangeAddedMiles / 28) * 3.85).toFixed(2);
  const savings = Math.max(0, Number(estimatedGasEquivalent) - Number(estimatedEvCost)).toFixed(2);

  return (
    <section id="drivers" className="relative py-28 bg-[#F7F7F7] overflow-hidden">
      <div
        data-journey-id="section-4"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 w-full"
      >
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-semibold text-[#050505] font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#65D900]" />
            <span>SECTION 05</span>
            <span className="text-[#888888]">•</span>
            <span className="text-[#555555]">CONSUMER MOBILITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#050505] tracking-tight leading-[1.15]">
            Made for{' '}
            <span className="text-[#65D900]">
              Every Driver
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            From everyday commutes to long-distance journeys, EVION makes EV charging simple, reliable, and accessible with zero hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 group">
              <img
                src="/images/driver-cockpit.jpg"
                alt="EVION In-Car Smart Navigation and Cockpit"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-2.5 py-1 rounded-full bg-[#65D900] text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  EVION In-Car Cockpit OS
                </span>
                <h3 className="text-lg font-bold mt-2 text-white">Zero-Tap Plug & Charge</h3>
                <p className="text-xs text-neutral-300 mt-1">
                  Plug in and walk away. Billing, authentication, and thermal conditioning start instantly.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-black/10 shadow-sm flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#65D900] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#050505]">EVION Driver App</h4>
                  <p className="text-[11px] text-[#555555] mt-0.5">Live bay availability & one-tap reservation.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-black/10 shadow-sm flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#3FA800] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#050505]">Intelligent Routing</h4>
                  <p className="text-[11px] text-[#555555] mt-0.5">Auto-navigates along fastest chargers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#111111] text-[#65D900] flex items-center justify-center">
                    <Zap className="w-5 h-5 fill-[#65D900]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#050505] text-base">Interactive EV Charging Simulator</h3>
                    <p className="text-xs text-[#555555] font-mono">Calculate real-world speeds for your EV model</p>
                  </div>
                </div>

                <span className="hidden sm:inline px-3 py-1 rounded-full bg-[#65D900]/15 text-[#3FA800] border border-[#65D900]/30 text-xs font-mono font-bold">
                  800V DC Optimized
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#050505] block">Select Vehicle Model:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EV_COMPARISON_MODELS.map((model: EVComparisonModel) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedEvId(model.id);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedEvId === model.id
                          ? 'bg-[#65D900] border-[#65D900] text-black shadow-sm font-bold'
                          : 'bg-[#F7F7F7] border-black/10 text-[#333333] hover:bg-neutral-100 font-medium'
                      }`}
                    >
                      <div className="text-xs truncate">{model.name.split('/')[0]}</div>
                      <div className={`text-[10px] font-mono mt-0.5 ${selectedEvId === model.id ? 'text-black/80' : 'text-[#888888]'}`}>
                        {model.maxKw} kW Peak
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#555555]">
                    Charge Range: <strong className="text-[#050505]">{startSoc}%</strong> to <strong className="text-[#050505]">{targetSoc}%</strong>
                  </span>
                  <span className="text-[#3FA800] font-bold">
                    +{(targetSoc - startSoc)}% Energy Boost ({energyNeededKwh.toFixed(1)} kWh)
                  </span>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={targetSoc}
                    onChange={(e) => setTargetSoc(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#65D900]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#888888]">
                    <span>Quick Top-up (50%)</span>
                    <span>Sweet Spot (80%)</span>
                    <span>Full Pack (100%)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#F7F7F7] border border-black/10 text-center">
                  <Clock className="w-4 h-4 text-[#050505] mx-auto mb-1" />
                  <div className="text-[10px] uppercase font-mono text-[#888888]">Charging Time</div>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#050505] mt-0.5">
                    {chargeTimeMinutes} <span className="text-xs font-normal text-[#555555]">mins</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F7F7] border border-black/10 text-center">
                  <Zap className="w-4 h-4 text-[#65D900] fill-[#65D900] mx-auto mb-1" />
                  <div className="text-[10px] uppercase font-mono text-[#888888]">Range Added</div>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#3FA800] mt-0.5">
                    +{rangeAddedMiles} <span className="text-xs font-normal text-[#555555]">mi</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F7F7] border border-black/10 text-center">
                  <DollarSign className="w-4 h-4 text-[#050505] mx-auto mb-1" />
                  <div className="text-[10px] uppercase font-mono text-[#888888]">Trip Savings</div>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#050505] mt-0.5">
                    ${savings} <span className="text-xs font-normal text-[#555555]">saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
