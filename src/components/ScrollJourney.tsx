import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Car } from './Car';
import { STATIONS } from '../data/mockData';
import type { StationNode, VehicleModel } from '../types';
import { soundFx } from '../utils/soundEffects';
import { buildJourneyPath } from '../utils/pathGenerator';
import type { SectionBounds } from '../utils/pathGenerator';
import { Zap, CheckCircle2, Radio, BatteryCharging } from 'lucide-react';

interface ScrollJourneyProps {
  vehicle: VehicleModel;
  onTelemetryUpdate?: (data: {
    progress: number;
    speedKmh: number;
    batterySoc: number;
    activeStation: StationNode | null;
    isCharging: boolean;
  }) => void;
  onStationClick?: (station: StationNode) => void;
}

interface StationLayoutPos {
  station: StationNode;
  x: number;
  y: number;
  lengthAtStation: number;
  state: 'inactive' | 'active' | 'completed';
}

export const ScrollJourney: React.FC<ScrollJourneyProps> = ({
  vehicle,
  onTelemetryUpdate,
  onStationClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);

  // Responsive dimensions
  const [dimensions, setDimensions] = useState({ width: 1440, height: 6500 });
  const [svgPathD, setSvgPathD] = useState<string>('');
  const [totalPathLength, setTotalPathLength] = useState<number>(1000);
  const [stationPositions, setStationPositions] = useState<StationLayoutPos[]>([]);

  // Car animation state
  const [carState, setCarState] = useState({
    x: 100,
    y: 100,
    angle: 0,
    speed: 0,
    isCharging: false,
    activeStation: null as StationNode | null,
    batterySoc: 38,
    progress: 0,
  });

  // Animation calculation refs
  const currentDistRef = useRef(0);
  const targetDistRef = useRef(0);
  const lastAngleRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const speedRef = useRef(0);
  const activeStationIdRef = useRef<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Measure all section cards in DOM and compute the structured SVG route
  const measureAndGeneratePath = useCallback(() => {
    if (!containerRef.current) return;

    const w = window.innerWidth;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      5000
    );

    setDimensions({ width: w, height: scrollHeight });

    // Find all rendered section cards
    const sectionElements = document.querySelectorAll<HTMLElement>('.journey-section-box');
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;

    const boundsList: SectionBounds[] = [];

    sectionElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY - containerTop;
      const bottom = rect.bottom + window.scrollY - containerTop;
      const left = rect.left;
      const right = rect.right;
      const width = rect.width;
      const height = rect.height;
      const centerX = (left + right) / 2;

      boundsList.push({
        id: el.getAttribute('data-journey-id') || `sec-${index}`,
        left,
        right,
        top,
        bottom,
        width,
        height,
        centerX,
      });
    });

    const pathD = buildJourneyPath(boundsList, w, scrollHeight);
    setSvgPathD(pathD);
  }, []);

  // Update on mount, resize, and layout changes
  useEffect(() => {
    const timer = setTimeout(() => {
      measureAndGeneratePath();
    }, 150);

    const handleResize = () => {
      measureAndGeneratePath();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      measureAndGeneratePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      resizeObserver.disconnect();
    };
  }, [measureAndGeneratePath]);

  // Compute total length and layout station nodes once SVG path updates
  useEffect(() => {
    if (!pathRef.current) return;
    try {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setTotalPathLength(len);

        const positions: StationLayoutPos[] = STATIONS.map((station) => {
          const targetDist = (station.progressPercent / 100) * len;
          const pt = pathRef.current?.getPointAtLength(Math.min(len, Math.max(0, targetDist))) || { x: 0, y: 0 };
          return {
            station,
            x: pt.x,
            y: pt.y,
            lengthAtStation: targetDist,
            state: 'inactive',
          };
        });

        setStationPositions(positions);
      }
    } catch {
      // SVG path calculation fallback
    }
  }, [svgPathD]);

  // Shortest angle unwrapping
  const unwrapAngle = (target: number, current: number): number => {
    let diff = (target - current) % 360;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;
    return current + diff;
  };

  // Main 60fps RequestAnimationFrame Scroll-Tracking Engine
  useEffect(() => {
    let isRunning = true;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY || window.pageYOffset;
      const scrollRatio = maxScroll > 0 ? Math.min(1, Math.max(0, currentScroll / maxScroll)) : 0;

      targetDistRef.current = scrollRatio * totalPathLength;

      const now = Date.now();
      const dt = Math.max(16, now - lastScrollTimeRef.current);
      const dy = Math.abs(currentScroll - lastScrollYRef.current);
      const instantSpeed = (dy / dt) * 100;
      speedRef.current = speedRef.current * 0.7 + instantSpeed * 0.3;

      lastScrollYRef.current = currentScroll;
      lastScrollTimeRef.current = now;

      soundFx.updateMotorSpeed(Math.min(1, speedRef.current / 60));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const loop = () => {
      if (!isRunning) return;

      const path = pathRef.current;
      if (path && totalPathLength > 0) {
        const lerpFactor = 0.14;
        currentDistRef.current += (targetDistRef.current - currentDistRef.current) * lerpFactor;

        speedRef.current *= 0.88;
        if (speedRef.current < 0.2) speedRef.current = 0;

        const clampedDist = Math.min(totalPathLength, Math.max(0, currentDistRef.current));
        const progressRatio = clampedDist / totalPathLength;

        if (progressPathRef.current) {
          const offset = totalPathLength * (1 - progressRatio);
          progressPathRef.current.style.strokeDashoffset = `${offset}px`;
        }

        const sampleOffset = 3;
        const p1 = path.getPointAtLength(Math.max(0, Math.min(totalPathLength - sampleOffset, clampedDist)));
        const p2 = path.getPointAtLength(Math.min(totalPathLength, clampedDist + sampleOffset));

        const rawAngle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
        const smoothAngle = unwrapAngle(rawAngle, lastAngleRef.current);
        lastAngleRef.current = smoothAngle;

        let nearbyStation: StationNode | null = null;
        let isAtStation = false;

        const activationThreshold = 65;
        stationPositions.forEach((pos) => {
          const distDiff = Math.abs(clampedDist - pos.lengthAtStation);
          if (distDiff < activationThreshold) {
            nearbyStation = pos.station;
            isAtStation = true;
          }
        });

        if (nearbyStation) {
          const stationObj = nearbyStation as StationNode;
          if (activeStationIdRef.current !== stationObj.id) {
            activeStationIdRef.current = stationObj.id;
            if (stationObj.progressPercent > 95) {
              soundFx.playCelebrationChime();
            } else {
              soundFx.playStationChime();
            }
          }
        } else {
          activeStationIdRef.current = null;
        }

        const calculatedSoc = Math.min(100, Math.round(38 + progressRatio * 62));

        setStationPositions((prev) =>
          prev.map((pos) => {
            const distDiff = clampedDist - pos.lengthAtStation;
            let state: 'inactive' | 'active' | 'completed' = 'inactive';
            if (Math.abs(distDiff) < activationThreshold) {
              state = 'active';
            } else if (distDiff >= activationThreshold) {
              state = 'completed';
            }
            return pos.state === state ? pos : { ...pos, state };
          })
        );

        setCarState({
          x: p1.x,
          y: p1.y,
          angle: smoothAngle,
          speed: Math.round(speedRef.current),
          isCharging: isAtStation,
          activeStation: nearbyStation,
          batterySoc: calculatedSoc,
          progress: progressRatio,
        });

        if (onTelemetryUpdate) {
          onTelemetryUpdate({
            progress: progressRatio,
            speedKmh: Math.round(speedRef.current),
            batterySoc: calculatedSoc,
            activeStation: nearbyStation,
            isCharging: isAtStation,
          });
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalPathLength, stationPositions, onTelemetryUpdate]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none z-20"
      style={{ height: `${dimensions.height}px` }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible pointer-events-none"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="activeEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#65D900" />
            <stop offset="50%" stopColor="#7CFF00" />
            <stop offset="100%" stopColor="#3FA800" />
          </linearGradient>
        </defs>

        {/* 1. Base Structure Shadow */}
        {svgPathD && (
          <path
            d={svgPathD}
            stroke="#000000"
            strokeWidth="5"
            strokeOpacity="0.04"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* 2. Structured Continuous Cable Rail (Base Route - #D0D0D0) */}
        {svgPathD && (
          <path
            ref={pathRef}
            d={svgPathD}
            stroke="#D0D0D0"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
        )}

        {/* 3. Active Energized Route following Scroll (#65D900) */}
        {svgPathD && totalPathLength > 0 && (
          <path
            ref={progressPathRef}
            d={svgPathD}
            stroke="#65D900"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: `${totalPathLength}px`,
              strokeDashoffset: `${totalPathLength}px`,
            }}
            filter="drop-shadow(0 0 6px rgba(101, 217, 0, 0.8))"
          />
        )}
      </svg>

      {/* Station Milestone Nodes along the Structured Path */}
      {stationPositions.map((pos) => {
        const isCurrentActive = pos.state === 'active';
        const isPastCompleted = pos.state === 'completed';

        return (
          <div
            key={pos.station.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            onClick={() => onStationClick?.(pos.station)}
            title={`${pos.station.name} (${pos.station.powerKw}kW)`}
          >
            {isCurrentActive && (
              <>
                <div className="absolute -inset-8 rounded-full border border-[#65D900]/60 animate-ping" />
                <div className="absolute -inset-14 rounded-full border border-[#65D900]/30 animate-pulse" />
              </>
            )}

            <div
              className={`relative flex items-center justify-center rounded-full transition-all duration-500 shadow-md ${
                isCurrentActive
                  ? 'w-12 h-12 bg-[#65D900] text-black ring-4 ring-[#65D900]/40 shadow-[0_0_25px_rgba(101,217,0,0.6)]'
                  : isPastCompleted
                  ? 'w-9 h-9 bg-black text-white ring-2 ring-black/20'
                  : 'w-8 h-8 bg-white border-2 border-[#D0D0D0] text-[#555555] group-hover:border-[#65D900] group-hover:text-black'
              }`}
            >
              {isCurrentActive ? (
                <Zap className="w-6 h-6 animate-bounce text-black fill-black" />
              ) : isPastCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-[#65D900]" />
              ) : (
                <BatteryCharging className="w-4 h-4" />
              )}
            </div>

            <div
              className={`absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all duration-300 pointer-events-none shadow-lg ${
                isCurrentActive
                  ? 'opacity-100 scale-100 bg-[#111111] text-white border-[#65D900]/50 ring-2 ring-[#65D900]/30'
                  : 'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 bg-white text-[#050505] border-black/10'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Radio
                  className={`w-3 h-3 ${
                    isCurrentActive ? 'text-[#65D900] animate-spin' : 'text-slate-400'
                  }`}
                />
                <span className="font-bold">{pos.station.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isCurrentActive
                      ? 'bg-[#65D900]/20 text-[#65D900] font-bold'
                      : 'bg-neutral-100 text-[#555555]'
                  }`}
                >
                  {pos.station.powerKw}kW
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* The Electric Vehicle following the calculated SVG path */}
      <Car
        x={carState.x}
        y={carState.y}
        angle={carState.angle}
        speed={carState.speed}
        isCharging={carState.isCharging}
        batterySoc={carState.batterySoc}
        vehicle={vehicle}
      />
    </div>
  );
};
