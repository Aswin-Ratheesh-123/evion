import React, { useState } from 'react';
import { soundFx } from '../../utils/soundEffects';
import { Building2, Truck, ArrowRight, TrendingUp, DollarSign, ShieldCheck, Zap } from 'lucide-react';

interface ForBusinessesSectionProps {
  onOpenBookingModal: () => void;
}

export const ForBusinessesSection: React.FC<ForBusinessesSectionProps> = ({
  onOpenBookingModal,
}) => {
  const [stationCount, setStationCount] = useState<number>(6);
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(14);

  const monthlySessions = stationCount * sessionsPerDay * 30;
  const avgKwhPerSession = 42;
  const marginPerKwh = 0.18;
  const monthlyRevenue = Math.round(monthlySessions * avgKwhPerSession * marginPerKwh);
  const annualCo2Tons = Math.round((monthlySessions * avgKwhPerSession * 12 * 0.85) / 2000);

  return (
    <section id="businesses" className="relative py-28 bg-white text-[#050505] overflow-hidden">
      <div className="absolute inset-0 grid-bg-pattern opacity-30 pointer-events-none" />

      <div
        data-journey-id="section-5"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 w-full"
      >
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-semibold text-[#050505] font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#65D900]" />
            <span>SECTION 06</span>
            <span className="text-[#888888]">•</span>
            <span className="text-[#555555]">ENTERPRISE & COMMERCIAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#050505] leading-[1.15]">
            Power Your Business With{' '}
            <span className="text-[#65D900]">
              EV Charging
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            Turn your real estate into high-yield clean energy destinations. Enterprise fleet depots, commercial retail shopping plazas, and corporate campus turnkey deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 group">
              <img
                src="/images/business-fleet.jpg"
                alt="EVION Commercial Fleet and Workplace EV Charging Plaza"
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#65D900] text-black text-[10px] font-mono font-bold uppercase tracking-wider">
                  Turnkey Fleet Infrastructure
                </span>
                <h3 className="text-xl font-bold text-white">Zero Upfront Capital Program</h3>
                <p className="text-xs text-neutral-300">
                  EVION finances, installs, operates, and maintains high-power charging plazas with guaranteed revenue share.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white border border-black/10 shadow-sm">
                <Building2 className="w-5 h-5 text-[#050505] mx-auto mb-1" />
                <div className="text-xs font-bold text-[#050505]">Commercial Real Estate</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-black/10 shadow-sm">
                <Truck className="w-5 h-5 text-[#3FA800] mx-auto mb-1" />
                <div className="text-xs font-bold text-[#050505]">Logistics Fleets</div>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-black/10 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#65D900] mx-auto mb-1" />
                <div className="text-xs font-bold text-[#050505]">Full O&M Warranty</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#111111] text-[#65D900] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#050505] text-base">Site Host Revenue Estimator</h3>
                    <p className="text-xs text-[#555555] font-mono">Estimate your property's net monthly charging yields</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-[#555555] mb-1.5">
                    <span>Number of 350kW Dispensers:</span>
                    <span className="text-[#050505] font-bold text-sm">{stationCount} Dispensers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="2"
                    value={stationCount}
                    onChange={(e) => setStationCount(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#65D900]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-[#555555] mb-1.5">
                    <span>Estimated Sessions / Dispenser / Day:</span>
                    <span className="text-[#3FA800] font-bold text-sm">{sessionsPerDay} Sessions</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="30"
                    step="2"
                    value={sessionsPerDay}
                    onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#65D900]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#F7F7F7] border border-black/10">
                  <div className="flex items-center gap-1.5 text-[#555555] text-xs font-mono">
                    <DollarSign className="w-4 h-4 text-[#050505]" />
                    <span>Est. Monthly Net Yield</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#050505] mt-1">
                    ${monthlyRevenue.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#888888] mt-0.5">Recurring ancillary revenue</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F7F7] border border-black/10">
                  <div className="flex items-center gap-1.5 text-[#555555] text-xs font-mono">
                    <Zap className="w-4 h-4 text-[#3FA800]" />
                    <span>Annual CO2 Displaced</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#3FA800] mt-1">
                    {annualCo2Tons.toLocaleString()} <span className="text-xs font-normal">tons</span>
                  </div>
                  <div className="text-[10px] text-[#888888] mt-0.5">Scope 1 & 3 ESG compliance</div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenBookingModal();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#65D900] hover:bg-[#7CFF00] text-black font-extrabold text-xs tracking-wider uppercase shadow-md shadow-[#65D900]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>Explore Business Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
