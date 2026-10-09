export interface Point {
  x: number;
  y: number;
}

export interface SectionBounds {
  id: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
}

/**
 * Converts an array of 2D waypoints into an SVG path string with smoothly rounded corners.
 */
export function createRoundedPath(points: Point[], radius: number = 28): string {
  if (!points || points.length < 2) return '';

  // Filter out any duplicate adjacent points
  const cleanPoints: Point[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const prev = cleanPoints[cleanPoints.length - 1];
    const curr = points[i];
    if (Math.hypot(curr.x - prev.x, curr.y - prev.y) > 2) {
      cleanPoints.push(curr);
    }
  }

  if (cleanPoints.length < 2) return '';

  let d = `M ${cleanPoints[0].x.toFixed(1)} ${cleanPoints[0].y.toFixed(1)}`;

  for (let i = 1; i < cleanPoints.length - 1; i++) {
    const pPrev = cleanPoints[i - 1];
    const pCurr = cleanPoints[i];
    const pNext = cleanPoints[i + 1];

    const v1 = { x: pCurr.x - pPrev.x, y: pCurr.y - pPrev.y };
    const len1 = Math.hypot(v1.x, v1.y);

    const v2 = { x: pNext.x - pCurr.x, y: pNext.y - pCurr.y };
    const len2 = Math.hypot(v2.x, v2.y);

    if (len1 === 0 || len2 === 0) continue;

    const effectiveRadius = Math.min(radius, len1 / 2.1, len2 / 2.1);

    const u1 = { x: v1.x / len1, y: v1.y / len1 };
    const u2 = { x: v2.x / len2, y: v2.y / len2 };

    const startX = pCurr.x - u1.x * effectiveRadius;
    const startY = pCurr.y - u1.y * effectiveRadius;

    const endX = pCurr.x + u2.x * effectiveRadius;
    const endY = pCurr.y + u2.y * effectiveRadius;

    d += ` L ${startX.toFixed(1)} ${startY.toFixed(1)}`;
    d += ` Q ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  }

  const last = cleanPoints[cleanPoints.length - 1];
  d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;

  return d;
}

/**
 * Builds the structured reference EV journey path wrapping around the measured sections.
 * Matches the reference ASCII architecture:
 * ┌───────────────────────────────────────────────┐
 * │   CONTENT                         IMAGE       │
 * │  🚗                                          │
 * ╰───────────────────────────────────────────────┘
 *                          │
 *                          🚗
 *                          │
 * ┌────────────────────────╯
 * │       IMAGE                  CONTENT
 * ╰───────────────────────────────────────────────┐
 *                                                 │
 *                          🚗                     │
 * ┌───────────────────────────────────────────────┘
 */
export function buildJourneyPath(
  bounds: SectionBounds[],
  containerWidth: number,
  containerHeight: number
): string {
  const radius = containerWidth < 768 ? 20 : 36;
  const waypoints: Point[] = [];

  if (!bounds || bounds.length === 0) {
    // Graceful default proportional layout
    const pad = Math.max(16, containerWidth * 0.05);
    const L = pad;
    const R = containerWidth - pad;
    const M = containerWidth * 0.5;
    const H = containerHeight;

    const defaultWaypoints: Point[] = [
      { x: L, y: H * 0.03 },
      { x: R, y: H * 0.03 },
      { x: R, y: H * 0.12 },
      { x: L, y: H * 0.12 },
      { x: M, y: H * 0.12 },
      { x: M, y: H * 0.20 },
      { x: L, y: H * 0.20 },
      { x: L, y: H * 0.31 },
      { x: R, y: H * 0.31 },
      { x: R, y: H * 0.42 },
      { x: L, y: H * 0.42 },
      { x: L, y: H * 0.53 },
      { x: R, y: H * 0.53 },
      { x: R, y: H * 0.65 },
      { x: L, y: H * 0.65 },
      { x: L, y: H * 0.77 },
      { x: R, y: H * 0.77 },
      { x: R, y: H * 0.89 },
      { x: M, y: H * 0.89 },
      { x: M, y: H * 0.985 },
    ];
    return createRoundedPath(defaultWaypoints, radius);
  }

  // Iterate through measured sections
  for (let i = 0; i < bounds.length; i++) {
    const curr = bounds[i];
    const next = bounds[i + 1];

    // Inset slightly so line hugs the card border nicely
    const inset = containerWidth < 768 ? 8 : 16;
    const L = Math.max(16, curr.left - inset);
    const R = Math.min(containerWidth - 16, curr.right + inset);
    const T = curr.top - 8;
    const B = curr.bottom + 8;
    const M = (L + R) / 2;

    if (i === 0) {
      // SECTION 1 (Hero):
      // Starts near top-left, goes across top to right, down right side, across bottom to center
      waypoints.push({ x: L, y: T + 40 });
      waypoints.push({ x: L, y: T });
      waypoints.push({ x: R, y: T });
      waypoints.push({ x: R, y: B });
      waypoints.push({ x: M, y: B });

      if (next) {
        // Vertical drop to next section
        waypoints.push({ x: M, y: next.top - 8 });
      }
    } else {
      const isEven = i % 2 === 0;

      if (isEven) {
        // EVEN SECTIONS (e.g. Section 3, 5, 7):
        // Enters at Top (from center or right), wraps across top, down left, across bottom to right
        const prevExit = waypoints[waypoints.length - 1];

        // Connect from entry point to Top-Right or Top-Left
        if (Math.abs(prevExit.x - R) > 5) {
          waypoints.push({ x: R, y: T });
        }
        waypoints.push({ x: L, y: T });
        waypoints.push({ x: L, y: B });
        waypoints.push({ x: R, y: B });

        if (next) {
          // Drop down from right edge into next section
          waypoints.push({ x: R, y: next.top - 8 });
        } else {
          waypoints.push({ x: M, y: B });
          waypoints.push({ x: M, y: B + 40 });
        }
      } else {
        // ODD SECTIONS (e.g. Section 2, 4, 6, 8):
        // Enters at Top (from center or right), goes to Top-Left, down right/left, across bottom to left
        const prevExit = waypoints[waypoints.length - 1];

        if (Math.abs(prevExit.x - L) > 5) {
          waypoints.push({ x: L, y: T });
        }
        waypoints.push({ x: R, y: T });
        waypoints.push({ x: R, y: B });
        waypoints.push({ x: L, y: B });

        if (next) {
          // Drop down from left edge into next section
          waypoints.push({ x: L, y: next.top - 8 });
        } else {
          waypoints.push({ x: M, y: B });
          waypoints.push({ x: M, y: B + 40 });
        }
      }
    }
  }

  // Destination final stopping terminal
  if (bounds.length > 0) {
    const lastSec = bounds[bounds.length - 1];
    const lastM = (lastSec.left + lastSec.right) / 2;
    waypoints.push({ x: lastM, y: lastSec.bottom + 30 });
  }

  return createRoundedPath(waypoints, radius);
}
