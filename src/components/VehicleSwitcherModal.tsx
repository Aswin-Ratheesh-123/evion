import React from 'react';
import { VEHICLE_MODELS } from '../data/mockData';
import type { VehicleModel } from '../types';
import { soundFx } from '../utils/soundEffects';
import { X, Check, Battery, Zap, Gauge, Sparkles } from 'lucide-react';

interface VehicleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVehicle: VehicleModel;
  onSelectVehicle: (vehicle: VehicleModel) => void;
}

export const VehicleSwitcherModal: React.FC<VehicleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentVehicle,
  onSelectVehicle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#111111] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#65D900]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Select Your Electric Vehicle</h3>
              <p className="text-xs text-neutral-400 font-mono">
                The car physically tracks the continuous route as you scroll
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {VEHICLE_MODELS.map((model) => {
            const isSelected = currentVehicle.id === model.id;

            return (
              <div
                key={model.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectVehicle(model);
                }}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-[#65D900] bg-[#65D900]/10 shadow-md ring-1 ring-[#65D900]/30'
                    : 'border-black/10 hover:border-black/20 bg-white hover:bg-[#F7F7F7]'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#050505] text-base">{model.name}</h4>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-[#65D900] text-black text-[10px] font-bold font-mono">
                        ACTIVE DRIVER
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#555555] font-medium">{model.tagline}</p>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#555555] pt-2">
                    <span className="flex items-center gap-1">
                      <Battery className="w-3.5 h-3.5 text-[#3FA800]" />
                      {model.batteryCapacityKwh} kWh
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-[#050505]" />
                      {model.maxChargeRateKw} kW Peak
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-[#65D900]" />
                      {model.rangeKm} km Range
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/10 text-xs font-mono">
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: model.primaryColor }}
                    />
                    <span className="text-[#555555] text-[11px]">{model.colorName.split('&')[0]}</span>
                  </div>

                  <button
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#65D900] text-black'
                        : 'bg-[#F7F7F7] hover:bg-neutral-200 text-[#050505]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Selected
                      </>
                    ) : (
                      'Drive This'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F7F7F7] border-t border-black/10 flex items-center justify-between">
          <span className="text-xs text-[#555555]">
            Current Paint: <strong className="text-[#050505]">{currentVehicle.colorName}</strong>
          </span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#000000] text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
