import React, { useState } from 'react';
import { ShieldCheck, Activity, Wifi, ThermometerSnowflake, CheckCircle2, Play } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export const ReliabilitySection: React.FC = () => {
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<number | null>(14);

  const runDiagnosticPing = () => {
    soundFx.playClick();
    setTestingPing(true);
    setTimeout(() => {
      setPingResult(Math.floor(Math.random() * 8) + 11);
      setTestingPing(false);
      soundFx.playStationChime();
    }, 900);
  };

  const pillars = [
    {
      title: '24/7 Autonomous Network Monitoring',
      desc: 'Over 120 sensor parameters per dispenser monitored in 250ms cycles. Automated power failover switches modules instantaneously.',
      icon: Activity,
      stat: '99.98% Uptime',
    },
    {
      title: 'Modular Redundant Power Cabinets',
      desc: 'Dual redundant 175kW liquid-cooled rectifiers per bay ensure uninterrupted operation even during component service.',
      icon: ShieldCheck,
      stat: 'N+1 Redundancy',
    },
    {
      title: 'IP65 Extreme Weather Resistance',
      desc: 'Operational from -35°C arctic freezes to +55°C desert heatwaves with hermetically sealed silicon-carbide chambers.',
      icon: ThermometerSnowflake,
      stat: '-35°C to +55°C',
    },
    {
      title: 'Resilient Multi-Carrier Connectivity',
      desc: 'Quad-redundant dual 5G cellular + Low-Earth-Orbit satellite backup ensures 100% offline payment and charging capability.',
      icon: Wifi,
      stat: '< 20ms Cloud Sync',
    },
  ];

  return (
    <section id="reliability" className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-bg-pattern opacity-30 pointer-events-none" />

      <div
        data-journey-id="section-7"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-semibold text-[#050505] font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>SECTION 08</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">MISSION-CRITICAL UPTIME</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#050505] tracking-tight leading-[1.15]">
              Charging You Can{' '}
              <span className="text-[#65D900]">
                Count On
              </span>
            </h2>

            <p className="text-base text-[#555555] leading-relaxed">
              Never get stranded. IDSEVION infrastructure is built with carrier-grade reliability standards, hot-swappable power modules, and automated remote health healing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm flex items-center gap-3">
            <button
              onClick={runDiagnosticPing}
              disabled={testingPing}
              className="px-3.5 py-2 rounded-xl bg-[#F7F7F7] text-[#050505] hover:bg-neutral-200 border border-black/10 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold"
            >
              <Play className={`w-3.5 h-3.5 ${testingPing ? 'animate-spin' : 'text-[#3FA800]'}`} />
              <span>{testingPing ? 'Pinging Nodes...' : 'Run Diagnostics Ping'}</span>
            </button>

            <div className="text-right">
              <div className="text-[10px] font-mono text-[#888888]">NETWORK LATENCY</div>
              <div className="text-xs font-mono font-bold text-[#3FA800]">
                {pingResult}ms • 100% ONLINE
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const IconComp = pillar.icon;

            return (
              <div
                key={pillar.title}
                className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] text-[#050505] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-black/5">
                    <IconComp className="w-6 h-6 text-[#65D900]" />
                  </div>

                  <span className="px-2.5 py-0.5 rounded-md bg-[#F7F7F7] text-[#050505] text-[10px] font-mono font-bold uppercase tracking-wider border border-black/10">
                    {pillar.stat}
                  </span>

                  <h3 className="font-bold text-[#050505] text-base mt-2.5 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-[#555555] mt-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-[#3FA800] font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65D900]" /> Verified Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
