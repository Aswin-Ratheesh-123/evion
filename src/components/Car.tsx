import React from 'react';
import type { VehicleModel } from '../types';

interface CarProps {
  x: number;
  y: number;
  angle: number;
  speed: number;
  isCharging: boolean;
  batterySoc: number;
  vehicle: VehicleModel;
}

export const Car: React.FC<CarProps> = ({
  x,
  y,
  angle,
  speed,
  isCharging,
  batterySoc,
  vehicle,
}) => {
  const speedFactor = Math.min(1, Math.max(0, speed / 80));

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none z-30 transition-transform will-change-transform"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) rotate(${angle}deg)`,
      }}
      aria-label="IDSEVION Electric Vehicle traveling down the journey timeline"
    >
      {/* Subtle Gray Environment Shadow & Contact Shadow for White Background Visibility */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none"
        style={{
          width: '150px',
          height: '80px',
          left: '-25px',
          top: '-18px',
          background: isCharging
            ? 'radial-gradient(ellipse at center, rgba(101, 217, 0, 0.45) 0%, rgba(0, 0, 0, 0.18) 50%, transparent 75%)'
            : `radial-gradient(ellipse at center, rgba(0, 0, 0, ${0.22 + speedFactor * 0.15}) 0%, rgba(0, 0, 0, 0.08) 50%, transparent 70%)`,
          filter: isCharging ? 'blur(10px)' : 'blur(8px)',
          transform: 'scale(1.15)',
        }}
      />

      {/* Charging High-Voltage Electric Green Pulse Ring */}
      {isCharging && (
        <div className="absolute -inset-8 rounded-full animate-ping opacity-75 border-2 border-[#65D900] pointer-events-none" />
      )}

      {/* Premium EV Vehicle Vector Graphic (Pearl White / Silver with Dark Graphite & Black Details) */}
      <div className="relative w-24 h-12 sm:w-28 sm:h-14 select-none filter drop-shadow-xl">
        <svg
          viewBox="0 0 160 80"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Body paint gradient: Pearl White / Metallic Silver */}
            <linearGradient id={`carBody-${vehicle.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor={vehicle.primaryColor || '#F5F5F5'} />
              <stop offset="70%" stopColor="#DCDCDC" />
              <stop offset="100%" stopColor="#BFBFBF" />
            </linearGradient>

            {/* Black Glass Canopy Roof */}
            <linearGradient id="glassRoof" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="50%" stopColor="#1C1C1C" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>

            {/* Electric Green / Laser Headlight Beam */}
            <radialGradient id="headlightBeam" cx="0%" cy="50%" r="100%">
              <stop offset="0%" stopColor="rgba(101, 217, 0, 0.85)" />
              <stop offset="40%" stopColor="rgba(124, 255, 0, 0.25)" />
              <stop offset="100%" stopColor="rgba(101, 217, 0, 0)" />
            </radialGradient>

            {/* Specular Roof Reflection */}
            <linearGradient id="specularGlint" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
            </linearGradient>
          </defs>

          {/* Front Headlight Light Cones */}
          <g opacity={isCharging ? 0.9 : 0.55 + speedFactor * 0.35}>
            <path d="M152 24 L270 6 L270 38 Z" fill="url(#headlightBeam)" filter="blur(5px)" />
            <path d="M152 56 L270 42 L270 74 Z" fill="url(#headlightBeam)" filter="blur(5px)" />
          </g>

          {/* Deep Dark Contact Shadow */}
          <rect x="6" y="8" width="148" height="66" rx="22" fill="#000000" fillOpacity="0.38" filter="blur(4px)" />

          {/* 4 Wheels: Dark Graphite with Electric Green Calipers */}
          <rect x="106" y="2" width="28" height="10" rx="3" fill="#111111" stroke="#2B2B2B" strokeWidth="1.5" />
          <rect x="112" y="4" width="16" height="6" rx="1.5" fill="#65D900" fillOpacity={0.7 + speedFactor * 0.3} />
          
          <rect x="24" y="2" width="28" height="10" rx="3" fill="#111111" stroke="#2B2B2B" strokeWidth="1.5" />
          <rect x="30" y="4" width="16" height="6" rx="1.5" fill="#65D900" fillOpacity={0.7 + speedFactor * 0.3} />
          
          <rect x="106" y="68" width="28" height="10" rx="3" fill="#111111" stroke="#2B2B2B" strokeWidth="1.5" />
          <rect x="112" y="70" width="16" height="6" rx="1.5" fill="#65D900" fillOpacity={0.7 + speedFactor * 0.3} />
          
          <rect x="24" y="68" width="28" height="10" rx="3" fill="#111111" stroke="#2B2B2B" strokeWidth="1.5" />
          <rect x="30" y="70" width="16" height="6" rx="1.5" fill="#65D900" fillOpacity={0.7 + speedFactor * 0.3} />

          {/* Body Chassis: Pearl White / Metallic with Graphite Outline for Contrast */}
          <path
            d="M10 40 C 10 18, 30 10, 50 10 L 115 10 C 145 10, 156 24, 156 40 C 156 56, 145 70, 115 70 L 50 70 C 30 70, 10 62, 10 40 Z"
            fill={`url(#carBody-${vehicle.id})`}
            stroke="#1C1C1C"
            strokeWidth="1.5"
          />

          {/* Character lines: Dark Graphite & Specular Light */}
          <path d="M 45 16 L 120 16 C 135 16, 142 24, 145 32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 45 64 L 120 64 C 135 64, 142 56, 145 48" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" />

          {/* Panoramic Black Glass Canopy */}
          <path
            d="M 42 40 C 42 22, 54 18, 70 18 L 105 18 C 125 18, 134 26, 134 40 C 134 54, 125 62, 105 62 L 70 62 C 54 62, 42 58, 42 40 Z"
            fill="url(#glassRoof)"
            stroke="#000000"
            strokeWidth="1.5"
          />

          {/* Subtle Electric Green Cockpit Ambient Pulse */}
          <ellipse cx="98" cy="40" rx="16" ry="12" fill="#65D900" fillOpacity="0.25" filter="blur(3px)" />

          {/* Specular Roof Reflection */}
          <path d="M 50 24 Q 85 20 120 28" stroke="url(#specularGlint)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Front Dual Electric Green Laser Headlights */}
          <g filter="drop-shadow(0 0 5px #65D900)">
            <ellipse cx="150" cy="24" rx="4" ry="7" fill="#F0FFDF" />
            <ellipse cx="150" cy="56" rx="4" ry="7" fill="#F0FFDF" />
            <line x1="146" y1="20" x2="152" y2="28" stroke="#65D900" strokeWidth="2" strokeLinecap="round" />
            <line x1="146" y1="60" x2="152" y2="52" stroke="#65D900" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Front Lightbar (Electric Green) */}
          <path d="M 152 28 Q 155 40 152 52" stroke="#65D900" strokeWidth="2" strokeLinecap="round" filter="drop-shadow(0 0 4px #7CFF00)" />

          {/* Rear Red LED Strip (Preserved Semantic) */}
          <g filter="drop-shadow(0 0 4px #FF3366)">
            <path d="M 12 25 Q 9 40 12 55" stroke="#FF1A53" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="11" cy="40" r="2" fill="#FFFFFF" />
          </g>

          {/* Charging Port Door LED Indicator on Left Quarter Panel */}
          <circle cx="36" cy="14" r="2" fill={isCharging ? '#7CFF00' : '#65D900'} filter="drop-shadow(0 0 4px #65D900)" />

          {/* EVION Emblem */}
          <circle cx="140" cy="40" r="2.5" fill="#65D900" />
        </svg>
      </div>

      {/* Floating Speed & Battery Badge (Dark Graphite with Electric Green indicator) */}
      <div className="absolute left-1/2 -top-10 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#111111]/95 text-white text-[11px] font-mono tracking-tight flex items-center gap-1.5 shadow-xl border border-white/10 backdrop-blur-md whitespace-nowrap">
        <span className={`w-2 h-2 rounded-full ${isCharging ? 'bg-[#65D900] animate-ping' : 'bg-[#65D900]'}`} />
        <span>{isCharging ? `⚡ DOCKED • ${batterySoc}%` : `${Math.round(speed)} km/h • ${batterySoc}%`}</span>
      </div>
    </div>
  );
};
