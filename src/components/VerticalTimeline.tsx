import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Car } from './Car';
import { MILESTONES } from '../data/mockData';
import type { MilestoneItem, VehicleModel } from '../types';
import { soundFx } from '../utils/soundEffects';
import { Zap, Check, Radio } from 'lucide-react';

interface VerticalTimelineProps {
  vehicle: VehicleModel;
  onTelemetryUpdate?: (data: {
    progress: number;
    speedKmh: number;
    batterySoc: number;
    activeMilestoneIndex: number;
    currentMilestone: MilestoneItem | null;
    isCharging: boolean;
  }) => void;
  onMilestoneClick?: (milestone: MilestoneItem) => void;
}

interface MilestoneNodePos {
  milestone: MilestoneItem;
  y: number;
  lengthAtNode: number;
  state: 'inactive' | 'approaching' | 'active' | 'completed';
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
  vehicle,
  onTelemetryUpdate,
  onMilestoneClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);

  const [dimensions, setDimensions] = useState({ width: 1440, height: 6000 });
  const [timelineX, setTimelineX] = useState(240);
  const [svgPathD, setSvgPathD] = useState('');
  const [totalPathLength, setTotalPathLength] = useState(1000);
  const [milestoneNodes, setMilestoneNodes] = useState<MilestoneNodePos[]>([]);

  // Car state
  const [carState, setCarState] = useState({
    x: 240,
    y: 100,
    angle: 90,
    speed: 0,
    isCharging: false,
    activeMilestone: null as MilestoneItem | null,
    batterySoc: 38,
    progress: 0,
  });

  // Animation calculation refs
  const currentDistRef = useRef(0);
  const targetDistRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const speedRef = useRef(0);
  const activeMilestoneIdRef = useRef<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Measure milestone element positions in DOM and align timeline
  const calculateTimelineGeometry = useCallback(() => {
    if (!containerRef.current) return;

    const w = window.innerWidth;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      5000
    );

    // Desktop: Left-of-center (~80px inside max-w-7xl), Mobile: Left side (28px - 36px)
    let xPos = 240;
    if (w < 768) {
      xPos = 36;
    } else if (w < 1280) {
      xPos = Math.max(60, w * 0.12);
    } else {
      const containerLeft = (w - 1280) / 2;
      xPos = Math.max(80, containerLeft + 120);
    }

    setTimelineX(xPos);
    setDimensions({ width: w, height: scrollHeight });

    // Build straight vertical timeline SVG path
    const startY = 180;
    const endY = scrollHeight - 300;
    const pathD = `M ${xPos} ${startY} L ${xPos} ${endY}`;
    setSvgPathD(pathD);

    // Position milestone nodes by querying corresponding DOM section elements
    const nodes: MilestoneNodePos[] = [];
    const pathTotalLen = endY - startY;

    MILESTONES.forEach((ms) => {
      const el = document.getElementById(`milestone-${ms.number}`);
      let nodeY = startY + (ms.progressPercent / 100) * pathTotalLen;

      if (el) {
        const rect = el.getBoundingClientRect();
        const elCenterY = rect.top + window.scrollY + 80;
        nodeY = Math.max(startY, Math.min(endY, elCenterY));
      }

      nodes.push({
        milestone: ms,
        y: nodeY,
        lengthAtNode: nodeY - startY,
        state: 'inactive',
      });
    });

    setMilestoneNodes(nodes);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimelineGeometry();
    }, 200);

    window.addEventListener('resize', calculateTimelineGeometry);
    window.addEventListener('orientationchange', calculateTimelineGeometry);

    const resizeObserver = new ResizeObserver(() => {
      calculateTimelineGeometry();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateTimelineGeometry);
      window.removeEventListener('orientationchange', calculateTimelineGeometry);
      resizeObserver.disconnect();
    };
  }, [calculateTimelineGeometry]);

  // Compute total path length
  useEffect(() => {
    if (!pathRef.current) return;
    try {
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setTotalPathLength(len);
      }
    } catch {
      // fallback
    }
  }, [svgPathD]);

  // 60FPS Scroll Lerp Loop
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

        // Active line progress
        if (progressPathRef.current) {
          const offset = totalPathLength * (1 - progressRatio);
          progressPathRef.current.style.strokeDashoffset = `${offset}px`;
        }

        const p1 = path.getPointAtLength(clampedDist);
        const p2 = path.getPointAtLength(Math.min(totalPathLength, clampedDist + 4));
        const angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

        // Check milestones proximity
        let nearbyMilestone: MilestoneItem | null = null;
        let isAtMilestone = false;
        let activeIdx = 0;
        const activationThreshold = 70;

        milestoneNodes.forEach((node, idx) => {
          const diff = Math.abs(clampedDist - node.lengthAtNode);
          if (diff < activationThreshold) {
            nearbyMilestone = node.milestone;
            isAtMilestone = true;
            activeIdx = idx;
          }
        });

        if (nearbyMilestone) {
          const msObj = nearbyMilestone as MilestoneItem;
          if (activeMilestoneIdRef.current !== msObj.id) {
            activeMilestoneIdRef.current = msObj.id;
            if (msObj.number === '08') {
              soundFx.playCelebrationChime();
            } else {
              soundFx.playStationChime();
            }
          }
        } else {
          activeMilestoneIdRef.current = null;
        }

        // Calculate battery charge SOC progression
        const baseSoc = 38;
        const calculatedSoc = Math.min(100, Math.round(baseSoc + progressRatio * 62));

        // Update node visual states
        setMilestoneNodes((prev) =>
          prev.map((node) => {
            const diff = clampedDist - node.lengthAtNode;
            let state: 'inactive' | 'approaching' | 'active' | 'completed' = 'inactive';

            if (Math.abs(diff) < activationThreshold) {
              state = 'active';
            } else if (diff >= activationThreshold) {
              state = 'completed';
            } else if (diff < 0 && Math.abs(diff) < 250) {
              state = 'approaching';
            }

            return node.state === state ? node : { ...node, state };
          })
        );

        setCarState({
          x: p1.x,
          y: p1.y,
          angle: angle || 90,
          speed: Math.round(speedRef.current),
          isCharging: isAtMilestone,
          activeMilestone: nearbyMilestone,
          batterySoc: calculatedSoc,
          progress: progressRatio,
        });

        if (onTelemetryUpdate) {
          onTelemetryUpdate({
            progress: progressRatio,
            speedKmh: Math.round(speedRef.current),
            batterySoc: calculatedSoc,
            activeMilestoneIndex: activeIdx,
            currentMilestone: nearbyMilestone,
            isCharging: isAtMilestone,
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
  }, [totalPathLength, milestoneNodes, onTelemetryUpdate]);

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
          <filter id="timelineGlow" x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="activeTimelineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#65D900" />
            <stop offset="50%" stopColor="#7CFF00" />
            <stop offset="100%" stopColor="#3FA800" />
          </linearGradient>
        </defs>

        {/* 1. Base Timeline Track (Default #D0D0D0) */}
        {svgPathD && (
          <path
            ref={pathRef}
            d={svgPathD}
            stroke="#D0D0D0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* 2. Base Subtle Glow */}
        {svgPathD && (
          <path
            d={svgPathD}
            stroke="#000000"
            strokeWidth="5"
            strokeOpacity="0.04"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* 3. Active Energized Progress Timeline (Follows Car - Electric Green #65D900) */}
        {svgPathD && totalPathLength > 0 && (
          <path
            ref={progressPathRef}
            d={svgPathD}
            stroke="#65D900"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${totalPathLength}px`,
              strokeDashoffset: `${totalPathLength}px`,
            }}
            filter="drop-shadow(0 0 6px rgba(101, 217, 0, 0.8))"
          />
        )}
      </svg>

      {/* Milestone Nodes on the Timeline */}
      {milestoneNodes.map((node) => {
        const isCurrentActive = node.state === 'active';
        const isCompleted = node.state === 'completed';
        const isApproaching = node.state === 'approaching';

        return (
          <div
            key={node.milestone.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
            style={{ left: `${timelineX}px`, top: `${node.y}px` }}
            onClick={() => onMilestoneClick?.(node.milestone)}
            title={`${node.milestone.tag} — ${node.milestone.title}`}
          >
            {/* Active Green Radar Ripple */}
            {isCurrentActive && (
              <>
                <div className="absolute -inset-6 rounded-full border border-[#65D900]/60 animate-ping" />
                <div className="absolute -inset-10 rounded-full border border-[#65D900]/30 animate-pulse" />
              </>
            )}

            {/* Circular Milestone Disc with Number */}
            <div
              className={`relative flex items-center justify-center rounded-full font-mono font-bold transition-all duration-500 shadow-md ${
                isCurrentActive
                  ? 'w-11 h-11 bg-[#65D900] text-black text-xs ring-4 ring-[#65D900]/40 shadow-[0_0_25px_rgba(101,217,0,0.6)]'
                  : isCompleted
                  ? 'w-9 h-9 bg-black text-white text-[11px] ring-2 ring-black/20'
                  : isApproaching
                  ? 'w-9 h-9 bg-white text-black border-2 border-[#65D900] text-[11px] animate-pulse ring-2 ring-[#65D900]/30'
                  : 'w-8 h-8 bg-white border-2 border-[#D0D0D0] text-[#555555] text-[10px] group-hover:border-[#65D900] group-hover:text-black'
              }`}
            >
              {isCurrentActive ? (
                <Zap className="w-5 h-5 text-black fill-black animate-bounce" />
              ) : isCompleted ? (
                <Check className="w-4 h-4 text-[#65D900]" />
              ) : (
                node.milestone.number
              )}
            </div>

            {/* Hover / Active Badge */}
            <div
              className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all duration-300 pointer-events-none shadow-lg ${
                isCurrentActive
                  ? 'opacity-100 scale-100 bg-[#111111] text-white border-[#65D900]/50 ring-2 ring-[#65D900]/30'
                  : 'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 bg-white text-[#050505] border-black/10'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Radio className={`w-3 h-3 ${isCurrentActive ? 'text-[#65D900] animate-spin' : 'text-slate-400'}`} />
                <span className="font-bold">{node.milestone.tag}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* The EV Car traveling down the timeline */}
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
