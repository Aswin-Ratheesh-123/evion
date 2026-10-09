import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEffects';
import { X, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface StationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StationBookingModal: React.FC<StationBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    siteType: 'commercial',
    chargerCount: '4',
    powerReq: '350kw',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCelebrationChime();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#65D900', '#7CFF00', '#000000', '#1C1C1C'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-[#111111] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#65D900] fill-[#65D900]" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-white">Deploy IDSEVION Infrastructure</h3>
              <p className="text-xs text-neutral-400 font-mono">Turnkey Ultra-Fast EV Hub Deployment & Fleet Solutions</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form or Success View */}
        {submitted ? (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#65D900]/20 text-[#3FA800] mx-auto flex items-center justify-center shadow-lg shadow-[#65D900]/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-[#050505]">Consultation Request Received!</h4>
              <p className="text-sm text-[#555555] mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-[#050505]">{formData.name || 'Partner'}</strong>! An IDSEVION infrastructure engineer will deliver your custom site assessment and ROI financial model within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F7F7] border border-black/10 text-xs font-mono text-[#555555] text-left max-w-sm mx-auto space-y-1">
              <div><strong>Site Classification:</strong> {formData.siteType.toUpperCase()}</div>
              <div><strong>Proposed Units:</strong> {formData.chargerCount} High-Power Dispensers</div>
              <div><strong>Target Architecture:</strong> {formData.powerReq.toUpperCase()} Liquid-Cooled</div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold shadow-md shadow-[#65D900]/25 transition-all"
            >
              Done & Return to Journey
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#050505] mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 focus:border-[#65D900] focus:ring-2 focus:ring-[#65D900]/20 text-xs text-[#050505] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#050505] mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  placeholder="marcus@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 focus:border-[#65D900] focus:ring-2 focus:ring-[#65D900]/20 text-xs text-[#050505] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#050505] mb-1">Organization / Property Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Logistics Center"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 focus:border-[#65D900] focus:ring-2 focus:ring-[#65D900]/20 text-xs text-[#050505] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#050505] mb-1">Site Classification</label>
                <select
                  value={formData.siteType}
                  onChange={(e) => setFormData({ ...formData, siteType: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 focus:border-[#65D900] focus:ring-2 focus:ring-[#65D900]/20 text-xs text-[#050505] outline-none"
                >
                  <option value="commercial">Commercial Real Estate / Retail Hub</option>
                  <option value="fleet">Enterprise Fleet Depot / Logistics</option>
                  <option value="highway">Highway Travel Center / Corridor</option>
                  <option value="workplace">Corporate Workplace Campus</option>
                  <option value="multi-tenant">Multi-Family Residential Community</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#050505] mb-1">Target Number of Dispensers</label>
                <select
                  value={formData.chargerCount}
                  onChange={(e) => setFormData({ ...formData, chargerCount: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 focus:border-[#65D900] focus:ring-2 focus:ring-[#65D900]/20 text-xs text-[#050505] outline-none"
                >
                  <option value="2-4">2 – 4 Dispensers (Pilot Program)</option>
                  <option value="4-8">4 – 8 Dispensers (Standard Plaza)</option>
                  <option value="12-24">12 – 24 Dispensers (Superhub)</option>
                  <option value="30+">30+ Dispensers (Megawatt Fleet Depot)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#050505] mb-1">Power Tier Requirement</label>
                <select
                  value={formData.powerReq}
                  onChange={(e) => setFormData({ ...formData, powerReq: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 focus:border-[#65D900] focus:ring-2 focus:ring-[#65D900]/20 text-xs text-[#050505] outline-none"
                >
                  <option value="350kw">350 kW Ultra-Fast DC (Liquid-Cooled)</option>
                  <option value="500kw">500 kW Megawatt Ready</option>
                  <option value="150kw">150 kW Urban Fast DC</option>
                  <option value="turnkey">Full Custom Grid & BESS Microgrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#050505] mb-1">Project Details / Goals</label>
              <textarea
                rows={2}
                placeholder="Describe your site location, timeline, or fleet vehicle composition..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/15 focus:border-[#65D900] focus:ring-2 focus:ring-[#65D900]/20 text-xs text-[#050505] outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#65D900] hover:bg-[#7CFF00] text-black text-xs font-bold shadow-md shadow-[#65D900]/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Request Custom Site Assessment & Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
