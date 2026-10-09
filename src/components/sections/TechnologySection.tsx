import React, { useState } from 'react';
import { Cpu, Layers, Database } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export const TechnologySection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const techFeatures = [
    {
      title: 'Silicon-Carbide (SiC) Power Modules',
      subtitle: '98.8% Peak Inversion Efficiency',
      desc: 'Next-generation solid-state semiconductor converters minimize heat loss and enable sustained 350kW to 500kW continuous power delivery with zero thermal throttling.',
      icon: Cpu,
      stats: [
        { label: 'Conversion Efficiency', value: '98.8%' },
        { label: 'Voltage Range', value: '200V - 1000V' },
        { label: 'Coolant Flow', value: '18 L/min Active' },
      ],
    },
    {
      title: 'OCPP 2.0.1 & ISO 15118 Autocharge',
      subtitle: 'Universal Zero-Trust Encryption',
      desc: 'TLS cryptographic handshake establishes instant vehicle identification upon cable connection. Authorizes and bills charging sessions in under 1.2 seconds.',
      icon: Database,
      stats: [
        { label: 'Auth Latency', value: '< 1.2s' },
        { label: 'Protocol', value: 'OCPP 2.0.1' },
        { label: 'Security Level', value: 'AES-256 TLS' },
      ],
    },
    {
      title: 'Dynamic Grid Virtual Power Plant (VPP)',
      subtitle: 'Bi-directional V2G Microgrid Sync',
      desc: 'Integrated with regional electric utilities for peak shaving and demand response. Feeds clean energy back to the community grid during critical power shortages.',
      icon: Layers,
      stats: [
        { label: 'Grid Response', value: '150 ms' },
        { label: 'BESS Capacity', value: '2.5 MWh' },
        { label: 'Carbon Offset', value: '100% Green' },
      ],
    },
  ];

  return (
    <section id="technology" className="relative py-28 bg-[#F7F7F7] overflow-hidden">
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />

      <div
        data-journey-id="section-6"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 w-full"
      >
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-semibold text-[#050505] font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#65D900]" />
            <span>SECTION 07</span>
            <span className="text-[#888888]">•</span>
            <span className="text-[#555555]">DEEP TECH ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#050505] tracking-tight leading-[1.15]">
            Intelligent{' '}
            <span className="text-[#65D900]">
              EV Infrastructure
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            Engineered from silicon to software. Ultra-fast power conversion, real-time edge telemetry, and predictive maintenance algorithms that anticipate faults before they occur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-4">
            {techFeatures.map((feat, idx) => {
              const isSelected = activeCard === idx;
              const IconComp = feat.icon;

              return (
                <div
                  key={feat.title}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveCard(idx);
                  }}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#65D900] shadow-lg ring-1 ring-[#65D900]/20'
                      : 'bg-white border-black/10 hover:border-black/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#65D900] text-black shadow-md shadow-[#65D900]/30'
                          : 'bg-[#F7F7F7] text-[#050505]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#050505] text-base">{feat.title}</h3>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#65D900] animate-ping" />
                        )}
                      </div>
                      <div className="text-xs font-mono text-[#3FA800] font-bold">
                        {feat.subtitle}
                      </div>
                      <p className="text-xs text-[#555555] pt-1 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-6">
            <div className="h-full rounded-3xl bg-[#111111] text-white p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#65D900] animate-ping" />
                  <span className="text-xs font-mono text-neutral-300 font-bold uppercase tracking-wider">
                    Edge Controller Node ID-9402
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#65D900] bg-[#65D900]/15 px-2.5 py-1 rounded-full border border-[#65D900]/30 font-bold">
                  REAL-TIME SENSOR STREAM
                </span>
              </div>

              <div className="py-8 space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#888888] uppercase">Subsystem Telemetry</span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {techFeatures[activeCard].title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 font-mono">
                    Active Channel Monitoring • Auto-load distribution protocol
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {techFeatures[activeCard].stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3.5 rounded-2xl bg-black/60 border border-white/10"
                    >
                      <div className="text-[10px] uppercase font-mono text-[#888888]">
                        {stat.label}
                      </div>
                      <div className="text-base sm:text-lg font-mono font-bold text-[#65D900] mt-1">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs font-mono text-[#888888]">
                    <span>Power Stage Waveform (PWM 50kHz)</span>
                    <span className="text-[#65D900] font-bold">THD &lt; 2.1%</span>
                  </div>
                  <div className="h-12 w-full flex items-end gap-1 overflow-hidden">
                    {[40, 65, 85, 95, 80, 50, 25, 45, 75, 90, 100, 85, 60, 35, 20, 55, 80, 95, 90, 65, 40, 20, 50, 85, 100, 75, 45, 30].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#65D900] to-[#7CFF00] rounded-t-sm"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>Silicon-Carbide MosFETs Nominal</span>
                <span className="text-[#65D900] font-bold">Temp: 41.2°C (Liquid Cooled)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
