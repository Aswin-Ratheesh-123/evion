import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';
import {
  Zap,
  ArrowRight,
  Sparkles,
  Building2,
  Hotel,
  ShoppingBag,
  Car,
  Sun,
  Battery,
  ShieldCheck,
  Activity,
  Home,
  Navigation as NavIcon,
} from 'lucide-react';

interface MilestonesJourneyProps {
  activeMilestoneIndex: number;
  batterySoc: number;
  isCharging?: boolean;
  onOpenBookingModal: () => void;
}

export const MilestonesJourney: React.FC<MilestonesJourneyProps> = ({
  activeMilestoneIndex,
  batterySoc,
  onOpenBookingModal,
}) => {
  const [activeCityTab, setActiveCityTab] = useState<'office' | 'hotel' | 'retail' | 'parking'>('office');

  return (
    <div className="relative z-10 space-y-36 pb-32">
      {/* ========================================================================= */}
      {/* MILESTONE 01 — CONNECT */}
      {/* ========================================================================= */}
      <section
        id="milestone-01"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505]">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>01 — CONNECT</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">PLUG & CHARGE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#050505] tracking-tight leading-[1.1]">
              Connect Without{' '}
              <span className="text-[#65D900]">
                Compromise
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              Simple, reliable charging designed around the way people actually drive. Just plug in — vehicle cryptographic authentication, safety checks, and billing initiate in under 1 second.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-black/10 shadow-sm text-center">
                <div className="text-[10px] font-mono text-[#888888] uppercase">Auth Speed</div>
                <div className="text-lg font-bold font-mono text-[#050505] mt-0.5">&lt; 1.0s</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-black/10 shadow-sm text-center">
                <div className="text-[10px] font-mono text-[#888888] uppercase">Protocol</div>
                <div className="text-lg font-bold font-mono text-[#050505] mt-0.5">ISO 15118</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-black/10 shadow-sm text-center">
                <div className="text-[10px] font-mono text-[#888888] uppercase">Cable</div>
                <div className="text-lg font-bold font-mono text-[#3FA800] mt-0.5">Liquid-Cooled</div>
              </div>
            </div>
          </div>

          {/* Cinematic Image Right with Docking Glow */}
          <div className="lg:col-span-6 relative">
            <div
              className={`relative rounded-3xl overflow-hidden shadow-xl border transition-all duration-500 ${
                activeMilestoneIndex === 0
                  ? 'border-[#65D900] ring-4 ring-[#65D900]/20 shadow-[0_0_40px_rgba(101,217,0,0.25)]'
                  : 'border-black/10'
              }`}
            >
              <img
                src="/images/hero-charging.jpg"
                alt="EVION Plug and Charge Station"
                className="w-full h-80 sm:h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#65D900] uppercase tracking-wider font-bold">
                    {activeMilestoneIndex === 0 ? '⚡ CONNECTOR ACTIVE • DOCKED' : 'STATION READY'}
                  </span>
                  <h3 className="text-base font-bold text-white">Ultra-Fast 350kW Dispenser</h3>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    activeMilestoneIndex === 0 ? 'bg-[#65D900] animate-ping' : 'bg-neutral-400'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MILESTONE 02 — CHARGE */}
      {/* ========================================================================= */}
      <section
        id="milestone-02"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Cinematic In-Car Cockpit Image Left */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 group">
              <img
                src="/images/driver-cockpit.jpg"
                alt="In-Car Charging Cockpit Screen"
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Minimalist Floating Charging HUD Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#111111]/95 border border-white/10 backdrop-blur-xl text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#888888] uppercase">State of Charge</div>
                  <div className="text-2xl font-bold font-mono text-[#65D900] mt-0.5 flex items-center gap-2">
                    <span>{activeMilestoneIndex >= 1 ? `${batterySoc}%` : '62%'}</span>
                    <Zap className="w-4 h-4 text-[#65D900] fill-[#65D900] animate-bounce" />
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-[#888888] uppercase">Charging Speed</div>
                  <div className="text-lg font-bold font-mono text-white mt-0.5">348.6 kW</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505]">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>02 — CHARGE</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">800V ARCHITECTURE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#050505] tracking-tight leading-[1.1]">
              Fast Charging.{' '}
              <span className="text-[#65D900]">
                Less Waiting.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              High-voltage silicon-carbide power converters deliver sustained high-power curves, adding up to 300 km of driving range in 10 minutes. Optimized thermal management protects battery longevity.
            </p>

            {/* Minimal Charging Indicator */}
            <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#555555] font-bold uppercase">Charging Status:</span>
                <span className="text-[#3FA800] font-bold">
                  {activeMilestoneIndex >= 1 ? '⚡ 350kW DC FAST ACTIVE' : 'CONNECTED • 62%'}
                </span>
              </div>
              <div className="h-3 rounded-full bg-[#F2F2F2] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#65D900] to-[#7CFF00] transition-all duration-700 rounded-full"
                  style={{ width: `${activeMilestoneIndex >= 1 ? batterySoc : 62}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-[#888888]">
                <span>10% Start</span>
                <span>80% Sweet Spot (12 mins)</span>
                <span>100% Target</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MILESTONE 03 — DESTINATIONS */}
      {/* ========================================================================= */}
      <section
        id="milestone-03"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505]">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>03 — DESTINATIONS</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">EVERYDAY CHARGING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#050505] tracking-tight leading-[1.1]">
              Charging Where{' '}
              <span className="text-[#65D900]">
                Life Happens
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              From workplaces and retail destinations to hotels and public spaces. EVION integrates seamlessly into premium architectural urban environments.
            </p>

            {/* Destination Badges Selector */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {[
                { id: 'office', label: 'OFFICE HUBS', icon: Building2, desc: 'Workplace fast top-ups' },
                { id: 'hotel', label: 'HOTEL PLAZAS', icon: Hotel, desc: 'Overnight luxury guest charge' },
                { id: 'retail', label: 'RETAIL CENTERS', icon: ShoppingBag, desc: 'Charge while shopping' },
                { id: 'parking', label: 'PUBLIC PARKING', icon: Car, desc: 'City-wide infrastructure' },
              ].map((tab) => {
                const isSelected = activeCityTab === tab.id;
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveCityTab(tab.id as typeof activeCityTab);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#65D900] text-black border-[#65D900] shadow-md shadow-[#65D900]/20 font-bold'
                        : 'bg-white border-black/10 text-[#333333] hover:bg-[#F7F7F7] hover:border-black/20'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-black' : 'text-[#65D900]'}`} />
                    <div className="text-xs font-mono font-bold">{tab.label}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-black/80' : 'text-[#888888]'}`}>
                      {tab.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Large City Visual Right */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 group">
              <img
                src="/images/smart-city.jpg"
                alt="City Charging Where Life Happens"
                className="w-full h-80 sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#65D900] text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                    Urban Infrastructure
                  </span>
                  <h3 className="text-lg font-bold mt-1.5 text-white">AeroPlaza City Pedestals</h3>
                </div>
                <span className="text-xs font-mono text-[#65D900] font-bold bg-black/60 px-3 py-1 rounded-full border border-[#65D900]/30 backdrop-blur-sm">
                  100% Green Grid
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MILESTONE 04 — SCALE */}
      {/* ========================================================================= */}
      <section
        id="milestone-04"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505]">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>04 — SCALE</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">COMMERCIAL & FLEETS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#050505] tracking-tight leading-[1.1]">
              Built to{' '}
              <span className="text-[#65D900]">
                Scale
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              Flexible EV charging infrastructure for businesses ready for electric mobility. Modular power cabinets, multi-dispenser fleet depots, and zero-upfront-capital site host deployment.
            </p>
          </div>

          {/* Large Commercial Property Scene */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 group">
            <img
              src="/images/business-fleet.jpg"
              alt="Commercial Fleet Depot and Workplace Charging"
              className="w-full h-80 sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#65D900] text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  Enterprise Fleet Solutions
                </span>
                <h3 className="text-xl font-bold mt-1.5 text-white">Turnkey High-Power Plazas</h3>
                <p className="text-xs text-neutral-300 mt-0.5">
                  Full financing, hardware installation, smart load balancing, and 24/7 uptime guarantee.
                </p>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingModal();
                }}
                className="px-6 py-3 rounded-2xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold font-mono uppercase tracking-wider shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
              >
                <span>BUSINESS SOLUTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MILESTONE 05 — INTELLIGENCE (Clean White/Light Section) */}
      {/* ========================================================================= */}
      <section
        id="milestone-05"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="rounded-3xl bg-[#F7F7F7] text-[#050505] p-8 sm:p-12 border border-black/10 shadow-lg relative overflow-hidden space-y-10">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-mono font-bold text-[#050505] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>05 — INTELLIGENCE</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">AI POWER MATRIX</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#050505] tracking-tight leading-[1.1]">
              Intelligence Behind{' '}
              <span className="text-[#65D900]">
                Every Charge
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              Autonomous grid load distribution, real-time edge telemetry, and predictive health monitoring. Our AI cloud dynamically balances power demand across thousands of parallel ports in milliseconds.
            </p>
          </div>

          {/* Floating Minimal Clean UI Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#888888] uppercase">NETWORK STATUS</span>
                <span className="w-2 h-2 rounded-full bg-[#65D900] animate-ping" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#050505]">99.98%</div>
              <div className="text-xs text-[#555555] mt-1 font-mono">14,200+ Ports Synced</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#888888] uppercase">AVAILABILITY</span>
                <Activity className="w-4 h-4 text-[#65D900]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#050505]">96.4%</div>
              <div className="text-xs text-[#555555] mt-1 font-mono">Real-time Bay Routing</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#888888] uppercase">ENERGY FLOW</span>
                <Zap className="w-4 h-4 text-[#65D900] fill-[#65D900]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#3FA800]">350 kW</div>
              <div className="text-xs text-[#555555] mt-1 font-mono">800V Liquid Cooled</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#888888] uppercase">VEHICLE STATUS</span>
                <ShieldCheck className="w-4 h-4 text-[#050505]" />
              </div>
              <div className="text-3xl font-bold font-mono text-[#050505]">OPTIMAL</div>
              <div className="text-xs text-[#555555] mt-1 font-mono">Cell Balancing Active</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MILESTONE 06 — ENERGY (Renewable Environment) */}
      {/* ========================================================================= */}
      <section
        id="milestone-06"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Renewable Visual Left */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 group">
              <img
                src="/images/solar-microgrid.jpg"
                alt="Solar Canopy and Battery Storage Microgrid"
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-3 py-1 rounded-full bg-[#65D900] text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  Zero-Emission Microgrid
                </span>
                <h3 className="text-lg font-bold mt-1.5 text-white">Solar Photovoltaic + BESS Buffer</h3>
              </div>
            </div>
          </div>

          {/* Step Flow Right */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505]">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>06 — ENERGY</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">CLEAN MICROGRID</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#050505] tracking-tight leading-[1.1]">
              Charging Powered by{' '}
              <span className="text-[#65D900]">
                Smarter Energy
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              Integrated solar canopies and high-capacity battery energy storage buffer peak utility demand, enabling 100% green renewable power for high-throughput charging corridors.
            </p>

            {/* Visual Step Flow: SOLAR -> BESS -> CHARGER -> EV */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center">
              <div className="p-3 rounded-2xl bg-white border border-black/10 shadow-sm">
                <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold text-[#050505]">1. SOLAR</div>
                <div className="text-[9px] text-[#555555] mt-0.5">450 kWp</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-black/10 shadow-sm">
                <Battery className="w-5 h-5 text-[#65D900] mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold text-[#050505]">2. BESS</div>
                <div className="text-[9px] text-[#555555] mt-0.5">2.5 MWh</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-black/10 shadow-sm">
                <Zap className="w-5 h-5 text-[#050505] mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold text-[#050505]">3. DISPENSER</div>
                <div className="text-[9px] text-[#555555] mt-0.5">350 kW DC</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-black/10 shadow-sm">
                <Car className="w-5 h-5 text-[#3FA800] mx-auto mb-1" />
                <div className="text-[10px] font-mono font-bold text-[#050505]">4. VEHICLE</div>
                <div className="text-[9px] text-[#555555] mt-0.5">800V Pack</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MILESTONE 07 — EVERYWHERE (Branching Destinations) */}
      {/* ========================================================================= */}
      <section
        id="milestone-07"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505]">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>07 — EVERYWHERE</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">UNIFIED ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#050505] tracking-tight leading-[1.1]">
              Wherever the{' '}
              <span className="text-[#65D900]">
                Journey Takes You
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#555555] leading-relaxed font-normal">
              One connected ecosystem covering every phase of your journey.
            </p>
          </div>

          {/* 4 Branching Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] text-[#050505] flex items-center justify-center mb-4 border border-black/5">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#050505] text-base">HOME CHARGING</h3>
              <p className="text-xs text-[#555555] mt-1">Smart Level 2 overnight charging with automated off-peak rates.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] text-[#050505] flex items-center justify-center mb-4 border border-black/5">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#050505] text-base">BUSINESS & WORK</h3>
              <p className="text-xs text-[#555555] mt-1">Workplace charging for employees, tenants, and commercial fleets.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] text-[#3FA800] flex items-center justify-center mb-4 border border-black/5">
                <NavIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#050505] text-base">HIGHWAY FAST HUBS</h3>
              <p className="text-xs text-[#555555] mt-1">350kW liquid-cooled travel plazas every 50 miles along interstates.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-[#65D900] hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#F7F7F7] text-[#65D900] flex items-center justify-center mb-4 border border-black/5">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#050505] text-base">CITY DESTINATIONS</h3>
              <p className="text-xs text-[#555555] mt-1">Seamless charging at shopping centers, hotels, and urban districts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL MILESTONE 08 — THE FUTURE (Clean White/Light Section) */}
      {/* ========================================================================= */}
      <section
        id="milestone-08"
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pl-14 sm:pl-24 lg:pl-48"
      >
        <div className="rounded-3xl bg-white text-[#050505] p-8 sm:p-14 border border-black/10 shadow-xl text-center space-y-8 relative overflow-hidden">
          {/* Destination Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-mono font-bold text-[#050505] relative z-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#65D900] animate-ping" />
            <span>READY FOR THE NEXT JOURNEY • APEX HUB REACHED</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#050505] tracking-tight leading-[1.05]">
              Drive Into the{' '}
              <span className="text-[#65D900]">
                Future.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-[#555555] leading-relaxed font-normal">
              Building smarter charging infrastructure for the electric mobility era. Join property hosts, enterprise fleets, and EV drivers accelerating clean transport worldwide.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {/* Primary CTA */}
              <button
                onClick={() => {
                  soundFx.playCelebrationChime();
                  onOpenBookingModal();
                }}
                className="px-8 py-4 rounded-2xl bg-[#65D900] hover:bg-[#7CFF00] text-black font-bold text-sm shadow-lg shadow-[#65D900]/25 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingModal();
                }}
                className="px-8 py-4 rounded-2xl bg-white border border-black text-black hover:bg-black hover:text-white font-bold text-sm transition-all"
              >
                <span>CONTACT EVION</span>
              </button>
            </div>
          </div>

          {/* Grand Destination Visual */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 mt-10 group max-w-5xl mx-auto">
            <img
              src="/images/future-megahub.jpg"
              alt="EVION Apex Megawatt EV Destination Superhub"
              className="w-full h-80 sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#111111]/90 border border-white/10 backdrop-blur-xl text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Apex Megawatt Hub Beta</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#65D900]/20 text-[#65D900] font-bold border border-[#65D900]/30">
                    Zero-Carbon Certified
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-0.5">
                  50 Ultra-Power Bays • Integrated Solar Canopy • 2.5MWh Battery Energy Storage
                </p>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingModal();
                }}
                className="px-4 py-2 rounded-xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold font-mono transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Explore Deployment</span>
                <Sparkles className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
