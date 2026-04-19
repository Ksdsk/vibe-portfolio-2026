'use client';

import { useEffect, useRef, useState } from 'react';

// Configuration
const PHRASE = "Hello, my name is Daniel. I'm a software engineer bringing expertise from ";
const COMPANIES = ["Amazon Web Services", "Dalhousie University", "Government of Canada"];
const CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]|/\\~";

// Toronto coordinates
const TORONTO_LAT = 43.6532;
const TORONTO_LON = -79.3832;
const TORONTO_LAT_RAD = (TORONTO_LAT * Math.PI) / 180;
const TORONTO_LON_RAD = (TORONTO_LON * Math.PI) / 180;

const COMPANY_INTERVAL = 2200;

interface Cell {
  squareAngle: number;
  squareR: number;
  squareBrightness: number;
  sphereData: {
    lat: number;
    lon: number;
    isLand: boolean;
    continentColor: number[] | null;
  };
  textX: number;
  textY: number;
  char: string;
  ci: number;
  seed: number;
}

interface CellArray extends Array<Cell> {
  _centerX?: number;
  _centerY?: number;
  _radius?: number;
  _companyY?: number;
}

export default function EarthGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [showBounce, setShowBounce] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    // Show scroll indicator after 10 seconds if user hasn't scrolled
    const showTimer = setTimeout(() => {
      if (!hasScrolled) {
        setShowScrollIndicator(true);
      }
    }, 10000);

    // Listen for scroll events
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  useEffect(() => {
    // Trigger bounce animation every 5 seconds
    const bounceInterval = setInterval(() => {
      setShowBounce(false);
      setTimeout(() => setShowBounce(true), 100);
    }, 5000);

    return () => clearInterval(bounceInterval);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number, fontSize: number, cellW: number, cellH: number;
    let cells: CellArray = [];
    let companyIndex = 0;
    let companyTimer = 0;
    let lastTime = 0;
    let globalContinentData: any = null;
    let animationId: number;

    // Setup
    function setup() {
      if (!canvas || !ctx) return;
      
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const maxW = Math.min(W, 480);
      fontSize = Math.max(12, Math.floor(maxW / 28));
      cellW = fontSize * 0.6;
      cellH = fontSize * 1.3;

      loadContinentData();
    }

    // Load GeoJSON
    function loadContinentData() {
      fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
        .then(response => response.json())
        .then(data => {
          globalContinentData = processGeoJSON(data);
          buildCells();
        })
        .catch(err => {
          console.error('Failed to load GeoJSON:', err);
          globalContinentData = getFallbackContinents();
          buildCells();
        });
    }

    function processGeoJSON(geojson: any) {
      const continents: any[] = [];
      const colors = [
        [255, 100, 100], [255, 255, 100], [100, 200, 255],
        [100, 255, 100], [200, 100, 255], [255, 100, 200],
      ];

      geojson.features.forEach((feature: any, idx: number) => {
        const geometry = feature.geometry;
        const color = colors[idx % colors.length];

        if (geometry.type === 'Polygon') {
          const coords = geometry.coordinates[0];
          const polygon = coords.map((coord: number[]) => {
            const lon = (coord[0] * Math.PI) / 180;
            const lat = (coord[1] * Math.PI) / 180;
            return [lon, lat];
          });

          continents.push({
            name: `Land_${idx}`,
            color: color,
            polygons: [polygon]
          });
        } else if (geometry.type === 'MultiPolygon') {
          const allPolygons = geometry.coordinates.map((poly: any) => {
            const coords = poly[0];
            return coords.map((coord: number[]) => {
              const lon = (coord[0] * Math.PI) / 180;
              const lat = (coord[1] * Math.PI) / 180;
              return [lon, lat];
            });
          });

          continents.push({
            name: `Land_${idx}`,
            color: color,
            polygons: allPolygons
          });
        }
      });

      return continents;
    }

    function getFallbackContinents() {
      return [
        {
          name: "North America",
          color: [255, 100, 100],
          polygons: [[
            [-3.05, 1.05], [-2.88, 1.18], [-2.70, 1.24], [-2.53, 1.18], [-2.36, 1.09],
            [-2.18, 1.00], [-2.01, 0.92], [-1.83, 0.83], [-1.66, 0.79], [-1.48, 0.87],
            [-1.31, 0.96], [-1.13, 1.05], [-0.96, 1.00], [-0.87, 0.87], [-1.05, 0.79],
            [-1.22, 0.70], [-1.39, 0.61], [-1.39, 0.43], [-1.48, 0.26], [-1.57, 0.09],
            [-1.66, -0.09], [-1.74, -0.09], [-1.83, -0.09], [-1.92, -0.09], [-2.01, 0.00],
            [-2.09, 0.09], [-2.27, 0.09], [-2.44, 0.26], [-2.62, 0.43], [-2.79, 0.61],
            [-2.97, 0.79], [-3.05, 0.96]
          ]]
        }
      ];
    }

    function buildCells() {
      if (!globalContinentData) return;

      cells = [];

      const txtCols = Math.floor(W / cellW);
      const maxLineChars = Math.min(txtCols - 2, 32);
      const words = PHRASE.trim().split(' ');
      const lines: string[] = [];
      let cur = '';

      for (const w of words) {
        const test = cur ? cur + ' ' + w : w;
        if (test.length > maxLineChars && cur) {
          lines.push(cur);
          cur = w;
        } else {
          cur = test;
        }
      }
      if (cur) lines.push(cur);

      const totalH = (lines.length + 2) * cellH;
      const startY = (H - totalH) / 2;

      const textPositions: any[] = [];
      for (let l = 0; l < lines.length; l++) {
        const line = lines[l];
        const startX = (W - line.length * cellW) / 2;
        for (let c = 0; c < line.length; c++) {
          textPositions.push({
            x: startX + c * cellW,
            y: startY + l * cellH,
            char: line[c],
          });
        }
      }

      const numSquareChars = textPositions.length * 50;
      const radius = Math.min(W, H) * 0.35;
      const centerX = W / 2;
      const centerY = H / 2;

      function pointInPolygon(lon: number, lat: number, polygon: number[][]) {
        if (!polygon || polygon.length < 3) return false;

        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const [xi, yi] = polygon[i];
          const [xj, yj] = polygon[j];

          const intersect = ((yi > lat) !== (yj > lat)) &&
            (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }
        return inside;
      }

      function isOnContinent(lon: number, lat: number) {
        let lonNorm = lon;
        while (lonNorm > Math.PI) lonNorm -= Math.PI * 2;
        while (lonNorm < -Math.PI) lonNorm += Math.PI * 2;

        for (const cont of globalContinentData) {
          if (cont.isCircular) {
            if (lat >= cont.latMin && lat <= cont.latMax) {
              return { color: cont.color, name: cont.name };
            }
          } else {
            for (const polygon of cont.polygons) {
              if (pointInPolygon(lonNorm, lat, polygon)) {
                return { color: cont.color, name: cont.name };
              }
            }
          }
        }
        return null;
      }

      const squarePositions: any[] = [];
      let attempts = 0;
      const maxAttempts = numSquareChars * 5;

      while (squarePositions.length < numSquareChars && attempts < maxAttempts) {
        attempts++;

        const lat = Math.asin((Math.random() * 2 - 1));
        const lon = Math.random() * Math.PI * 2;

        const continentInfo = isOnContinent(lon, lat);

        const acceptanceRate = continentInfo ? 0.95 : 0.01;
        if (Math.random() > acceptanceRate) continue;

        const z = Math.cos(lat) * Math.cos(lon);
        const x = Math.cos(lat) * Math.sin(lon);
        const y = Math.sin(lat);

        const posX = centerX + x * radius + (Math.random() - 0.5) * cellW * 0.2;
        const posY = centerY - y * radius + (Math.random() - 0.5) * cellH * 0.2;

        const distFromCenter = Math.sqrt(Math.pow(posX - centerX, 2) + Math.pow(posY - centerY, 2)) / radius;
        const horizontalPos = x;
        const verticalPos = y;

        const sphereShading = 1 - (distFromCenter * 0.5);
        const dayNightGradient = 0.7 + (horizontalPos * -0.4);
        const atmosphereGradient = 1 - (Math.abs(verticalPos) * 0.15);

        const landBoost = continentInfo ? 1.1 : 0.9;

        const brightness = sphereShading * dayNightGradient * atmosphereGradient * landBoost;

        squarePositions.push({
          x: posX,
          y: posY,
          brightness: Math.max(0.25, Math.min(1, brightness)),
          angle: lon,
          r: Math.sqrt(Math.pow(posX - centerX, 2) + Math.pow(posY - centerY, 2)),
          lat,
          lon,
          isLand: continentInfo !== null,
          continentColor: continentInfo ? continentInfo.color : null,
        });
      }

      for (let i = 0; i < squarePositions.length; i++) {
        const sqPos = squarePositions[i];
        const textPos = textPositions[i % textPositions.length];

        const sphereData = {
          lat: sqPos.lat,
          lon: sqPos.lon,
          isLand: sqPos.isLand,
          continentColor: sqPos.continentColor,
        };

        cells.push({
          squareAngle: sqPos.angle,
          squareR: sqPos.r,
          squareBrightness: sqPos.brightness,
          sphereData: sphereData,
          textX: textPos.x,
          textY: textPos.y,
          char: textPos.char,
          ci: i,
          seed: Math.random(),
        });
      }

      cells._centerX = centerX;
      cells._centerY = centerY;
      cells._radius = radius;
      cells._companyY = startY + (lines.length + 1) * cellH;
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function ease(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function randChar() {
      return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
    }

    function draw(ts: number) {
      if (!lastTime) lastTime = ts;
      const dt = ts - lastTime;
      lastTime = ts;
      companyTimer += dt;

      if (cells.length === 0) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        animationId = requestAnimationFrame(draw);
        return;
      }

      const scrollY = window.scrollY;
      const rawP = Math.min(1, Math.max(0, scrollY / (H * 1.5)));
      const progress = ease(rawP);

      const fadeStart = H * 1.8;
      const fadeEnd = H * 2.2;
      const fade = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

      if (fade >= 1) {
        viewport.classList.add('opacity-0');
        viewport.style.pointerEvents = 'none';
        animationId = requestAnimationFrame(draw);
        return;
      }
      viewport.classList.remove('opacity-0');
      viewport.style.opacity = String(1 - fade);
      viewport.style.pointerEvents = 'auto';

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = 'top';

      const centerX = cells._centerX!;
      const centerY = cells._centerY!;
      const radius = cells._radius!;
      const rotationSpeed = 0.0003;
      const rotation = ts * rotationSpeed;

      for (const cell of cells) {
        const sphere = cell.sphereData;
        const currentLon = sphere.lon + rotation;

        const z3d = radius * Math.cos(sphere.lat) * Math.cos(currentLon);
        const x3d = radius * Math.cos(sphere.lat) * Math.sin(currentLon);
        const y3d = radius * Math.sin(sphere.lat);

        const visibility = z3d > 0 ? 1 : 0;
        const scale = 1 + (z3d / radius) * 0.1;

        const squareX = centerX + x3d * scale;
        const squareY = centerY - y3d * scale;

        const normalizedLon = ((currentLon % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const sunAngle = Math.abs(normalizedLon - Math.PI);
        const dayNightFactor = 0.5 + 0.5 * Math.cos(sunAngle);

        const x = lerp(squareX, cell.textX, progress);
        const y = lerp(squareY, cell.textY, progress);

        let lonDiff = Math.abs(sphere.lon - TORONTO_LON_RAD);
        if (lonDiff > Math.PI) lonDiff = 2 * Math.PI - lonDiff;

        const latDiff = Math.abs(sphere.lat - TORONTO_LAT_RAD);
        const distToToronto = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
        const isTorontoCell = distToToronto < 0.03;

        let ch;
        if (progress < 0.2) {
          const flick = Math.sin(ts * 0.002 + cell.seed * 100) > 0.6;
          ch = flick && Math.random() < 0.08 ? randChar() : cell.char;
        } else if (progress < 0.7) {
          const settle = (progress - 0.2) / 0.5;
          ch = Math.random() > settle && Math.random() < 0.15 ? randChar() : cell.char;
        } else {
          ch = cell.char;
        }

        let alpha = 1;
        let brightness = 1;

        if (progress < 0.7) {
          const landBoost = sphere.isLand ? 1.4 : 0.6;
          brightness = cell.squareBrightness * (0.4 + dayNightFactor * 0.6) * landBoost;
          alpha = visibility;
        } else {
          brightness = lerp(cell.squareBrightness * dayNightFactor, 1, (progress - 0.7) / 0.3);
          const shouldShow = cell.ci % 50 === 0;
          alpha = shouldShow ? 1 : lerp(1, 0, (progress - 0.7) / 0.3);
        }

        if (alpha > 0.05) {
          if (progress < 0.7 && isTorontoCell && visibility > 0) {
            ctx.fillStyle = `rgba(255,0,0,${(alpha * brightness * 1.2).toFixed(2)})`;
          } else {
            ctx.fillStyle = `rgba(255,255,255,${(alpha * brightness).toFixed(2)})`;
          }
          ctx.fillText(ch, x, y);
        }
      }

      if (progress > 0.85) {
        drawCompany(ts, Math.min(1, (progress - 0.85) / 0.15));
      }

      animationId = requestAnimationFrame(draw);
    }

    function drawCompany(ts: number, masterAlpha: number) {
      if (companyTimer > COMPANY_INTERVAL) {
        companyTimer = 0;
        companyIndex = (companyIndex + 1) % COMPANIES.length;
      }

      const name = COMPANIES[companyIndex];
      const y = cells._companyY!;
      const startX = (W - name.length * cellW) / 2;
      const cycle = companyTimer / COMPANY_INTERVAL;

      let visible;
      if (cycle < 0.25) visible = Math.ceil((cycle / 0.25) * name.length);
      else if (cycle < 0.75) visible = name.length;
      else visible = Math.floor(((1 - cycle) / 0.25) * name.length);
      visible = Math.max(0, Math.min(name.length, visible));

      for (let i = 0; i < visible; i++) {
        const isEdge = i === visible - 1 && (cycle < 0.25 || cycle > 0.75);
        const ch = isEdge && Math.random() < 0.4 ? randChar() : name[i];
        ctx.fillStyle = `rgba(255,255,255,${masterAlpha.toFixed(2)})`;
        ctx.fillText(ch, startX + i * cellW, y);
      }

      if (Math.floor(ts / 530) % 2 === 0) {
        ctx.fillStyle = `rgba(255,255,255,${(masterAlpha * 0.8).toFixed(2)})`;
        ctx.fillText('_', startX + visible * cellW, y);
      }
    }

    setup();
    animationId = requestAnimationFrame(draw);

    const handleResize = () => setup();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={viewportRef} className="fixed inset-0 z-10 flex items-center justify-center bg-black transition-opacity duration-400">
      <canvas ref={canvasRef} className="block" />
      
      {/* Scroll indicator - only show after 10 seconds if user hasn't scrolled */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className={`flex flex-col items-center gap-2 ${showBounce ? 'animate-bounce-slow' : ''}`}>
            <span className="text-[0.65rem] text-[#666] uppercase tracking-wider">Scroll</span>
            <svg 
              className="w-6 h-6 text-[#666]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
