import React, { useState } from 'react';
import { STATIONS } from '../../data/mockData';
import type { StationNode } from '../../types';
import { soundFx } from '../../utils/soundEffects';
import { MapPin, Search, Filter, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ChargingNetworkSectionProps {
  onStationSelect: (station: StationNode) => void;
  activeStationId: string | null;
}

export const ChargingNetworkSection: React.FC<ChargingNetworkSectionProps> = ({
  onStationSelect,
  activeStationId,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStations = STATIONS.filter((station: StationNode) => {
    const matchesFilter = filterType === 'all' || station.type === filterType;
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="network" className="relative py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-bg-pattern opacity-30 pointer-events-none" />

      <div
        data-journey-id="section-3"
        className="journey-section-box max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 relative z-10 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F7] border border-black/10 text-xs font-semibold text-[#050505] font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#65D900]" />
              <span>SECTION 04</span>
              <span className="text-[#888888]">•</span>
              <span className="text-[#555555]">EXPANDING CHARGING ARTERY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#050505] tracking-tight leading-[1.15]">
              Built for a Growing{' '}
              <span className="text-[#65D900]">
                EV Network
              </span>
            </h2>

            <p className="text-base text-[#555555] leading-relaxed">
              Strategic high-power hubs located every 50 miles along national interstates and dense urban metropolitan centers. Designed for high volume, zero congestion, and instant power delivery.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#111111] text-[#65D900] flex items-center justify-center font-bold text-lg font-mono">
              100%
            </div>
            <div>
              <div className="text-xs font-mono text-[#888888] uppercase font-semibold">Corridor Coverage</div>
              <div className="text-sm font-bold text-[#050505]">Coast-to-Coast Fast Charging</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7F7F7] border border-black/10 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search station or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-black/10 text-xs text-[#050505] focus:outline-none focus:border-[#65D900] focus:ring-1 focus:ring-[#65D900]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono text-[#888888] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Type:
            </span>
            {[
              { id: 'all', label: 'All Hubs' },
              { id: 'highway', label: 'Highway Fast (350kW)' },
              { id: 'urban', label: 'Urban Plazas' },
              { id: 'fleet', label: 'Fleet Depots' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  soundFx.playClick();
                  setFilterType(f.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === f.id
                    ? 'bg-[#65D900] text-black font-bold shadow-sm'
                    : 'bg-white border border-black/10 text-[#555555] hover:text-black'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredStations.map((station: StationNode) => {
            const isCurrentlyActive = activeStationId === station.id;

            return (
              <div
                key={station.id}
                onClick={() => {
                  soundFx.playClick();
                  onStationSelect(station);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isCurrentlyActive
                    ? 'bg-white border-[#65D900] shadow-lg ring-2 ring-[#65D900]/20'
                    : 'bg-white border-black/10 hover:border-[#65D900] hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isCurrentlyActive
                          ? 'bg-[#65D900] text-black'
                          : 'bg-[#F7F7F7] text-[#050505] border border-black/10'
                      }`}
                    >
                      {station.powerKw} kW DC
                    </span>
                    <span className="text-[10px] font-mono text-[#3FA800] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Online
                    </span>
                  </div>

                  <h3 className="font-bold text-[#050505] text-base group-hover:text-black transition-colors">
                    {station.name}
                  </h3>

                  <p className="text-xs text-[#555555] mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                    {station.location}
                  </p>

                  <p className="text-xs text-[#555555] mt-3 line-clamp-2">
                    {station.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#888888]">10-80%: <strong>{station.metrics.chargeTimeMin}m</strong></span>
                  <span className="text-[#050505] group-hover:text-[#3FA800] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
                    View Specs <ArrowUpRight className="w-3.5 h-3.5 text-[#65D900]" />
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
