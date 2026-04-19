// ── Configuration ────────────────────────────────────────────
const PHRASE = "Hello, my name is Daniel. I'm a software engineer bringing expertise from ";
const COMPANIES = ["Amazon Web Services", "Department of National Defence", "Dalhousie University"];
const CHAR_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]|/\\~";

// Toronto, Ontario, Canada coordinates
const TORONTO_LAT = 43.6532; // degrees
const TORONTO_LON = -79.3832; // degrees
const TORONTO_LAT_RAD = (TORONTO_LAT * Math.PI) / 180;
const TORONTO_LON_RAD = (TORONTO_LON * Math.PI) / 180;

// ── State ───────────────────────────────────────────────────
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
const viewport = document.getElementById("hero-viewport");

let W, H, fontSize, cellW, cellH;
let cells = []; // Each cell: {squareX, squareY, textX, textY, char, ci}
let companyIndex = 0;
let companyTimer = 0;
let lastTime = 0;
const COMPANY_INTERVAL = 2200;

// Global continent data
let globalContinentData = null;

// ── Setup ───────────────────────────────────────────────────
function setup() {
  const dpr = window.devicePixelRatio || 1;
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const maxW = Math.min(W, 480);
  fontSize = Math.max(12, Math.floor(maxW / 28));
  cellW = fontSize * 0.6;
  cellH = fontSize * 1.3;

  // Load GeoJSON data first, then build cells
  loadContinentData();
}

// ── Load GeoJSON continent data ──────────────────────────────
function loadContinentData() {
  console.log('Loading continent data from GeoJSON...');
  
  // Try Natural Earth GeoJSON
  fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    })
    .then(data => {
      console.log('GeoJSON loaded successfully');
      globalContinentData = processGeoJSON(data);
      console.log(`Processed ${globalContinentData.length} land masses`);
      buildCells();
    })
    .catch(err => {
      console.error('Failed to load GeoJSON, using fallback:', err);
      globalContinentData = getFallbackContinents();
      buildCells();
    });
}

// ── Process GeoJSON into continent polygons ──────────────────
function processGeoJSON(geojson) {
  const continents = [];
  
  // Assign colors to different land masses
  const colors = [
    [255, 100, 100],  // Red
    [255, 255, 100],  // Yellow  
    [100, 200, 255],  // Cyan
    [100, 255, 100],  // Green
    [200, 100, 255],  // Purple
    [255, 100, 200],  // Pink
  ];
  
  geojson.features.forEach((feature, idx) => {
    const geometry = feature.geometry;
    const color = colors[idx % colors.length];
    
    if (geometry.type === 'Polygon') {
      // Single polygon - convert coordinates
      const coords = geometry.coordinates[0]; // Outer ring
      const polygon = coords.map(coord => {
        const lon = (coord[0] * Math.PI) / 180; // degrees to radians
        const lat = (coord[1] * Math.PI) / 180;
        return [lon, lat];
      });
      
      continents.push({
        name: `Land_${idx}`,
        color: color,
        polygons: [polygon]
      });
    } else if (geometry.type === 'MultiPolygon') {
      // Multiple polygons
      const allPolygons = geometry.coordinates.map(poly => {
        const coords = poly[0]; // Outer ring
        return coords.map(coord => {
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

// ── Fallback continent data ──────────────────────────────────
function getFallbackContinents() {
  // Simplified fallback if GeoJSON fails to load
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
    },
    {
      name: "South America",
      color: [255, 255, 100],
      polygons: [[
        [-1.31, 0.17], [-1.13, 0.17], [-1.05, 0.09], [-0.96, 0.00], [-0.87, -0.09],
        [-0.79, -0.17], [-0.70, -0.26], [-0.61, -0.35], [-0.61, -0.43], [-0.70, -0.52],
        [-0.79, -0.61], [-0.87, -0.70], [-0.96, -0.79], [-1.05, -0.87], [-1.13, -0.96],
        [-1.22, -1.05], [-1.31, -0.96], [-1.39, -0.87], [-1.48, -0.79], [-1.57, -0.70],
        [-1.66, -0.61], [-1.74, -0.52], [-1.83, -0.43], [-1.92, -0.35], [-2.01, -0.26],
        [-2.09, -0.17], [-2.01, 0.00], [-1.92, 0.09], [-1.83, 0.17], [-1.66, 0.17],
        [-1.48, 0.17], [-1.39, 0.17]
      ]]
    },
    {
      name: "Africa",
      color: [100, 200, 255],
      polygons: [[
        [-0.26, 0.61], [-0.17, 0.61], [0.00, 0.61], [0.17, 0.61], [0.35, 0.61],
        [0.52, 0.52], [0.61, 0.43], [0.70, 0.35], [0.79, 0.26], [0.87, 0.17],
        [0.87, 0.00], [0.87, -0.17], [0.79, -0.26], [0.70, -0.35], [0.61, -0.43],
        [0.52, -0.52], [0.44, -0.61], [0.35, -0.70], [0.26, -0.79], [0.17, -0.87],
        [0.00, -0.79], [-0.09, -0.70], [-0.17, -0.61], [-0.26, -0.52], [-0.35, -0.43],
        [-0.44, -0.35], [-0.52, -0.26], [-0.52, 0.00], [-0.52, 0.17], [-0.44, 0.26],
        [-0.35, 0.35], [-0.26, 0.43], [-0.26, 0.52]
      ]]
    },
    {
      name: "Europe",
      color: [100, 255, 100],
      polygons: [[
        [0.17, 1.13], [0.26, 1.18], [0.35, 1.22], [0.44, 1.18], [0.52, 1.13],
        [0.61, 1.05], [0.70, 0.96], [0.79, 0.87], [0.87, 0.79], [0.87, 0.70],
        [0.79, 0.61], [0.70, 0.61], [0.52, 0.61], [0.35, 0.70], [0.17, 0.70],
        [0.00, 0.70], [-0.17, 0.70], [-0.17, 0.79], [-0.09, 0.87], [0.00, 0.96],
        [0.09, 1.05]
      ]]
    },
    {
      name: "Asia",
      color: [200, 100, 255],
      polygons: [[
        [0.87, 1.22], [1.05, 1.31], [1.22, 1.39], [1.39, 1.39], [1.57, 1.39],
        [1.74, 1.39], [1.92, 1.39], [2.09, 1.39], [2.27, 1.31], [2.44, 1.22],
        [2.62, 1.13], [2.79, 1.05], [2.88, 0.96], [2.97, 0.87], [3.05, 0.79],
        [3.05, 0.70], [2.97, 0.61], [2.88, 0.52], [2.79, 0.43], [2.70, 0.35],
        [2.62, 0.26], [2.53, 0.17], [2.44, 0.09], [2.36, 0.00], [2.27, -0.09],
        [2.18, -0.17], [2.09, -0.26], [2.01, -0.17], [1.92, -0.09], [1.83, 0.00],
        [1.74, 0.09], [1.66, 0.17], [1.57, 0.26], [1.48, 0.35], [1.39, 0.43],
        [1.31, 0.35], [1.22, 0.26], [1.13, 0.35], [1.05, 0.43], [0.96, 0.52],
        [0.87, 0.61], [0.87, 0.79], [0.87, 0.96], [0.87, 1.13]
      ]]
    },
    {
      name: "Australia",
      color: [255, 100, 200],
      polygons: [[
        [2.18, -0.17], [2.27, -0.17], [2.36, -0.17], [2.44, -0.26], [2.53, -0.35],
        [2.62, -0.43], [2.70, -0.52], [2.70, -0.61], [2.70, -0.70], [2.62, -0.79],
        [2.53, -0.87], [2.44, -0.87], [2.36, -0.87], [2.27, -0.87], [2.18, -0.87],
        [2.09, -0.87], [2.01, -0.79], [1.92, -0.70], [1.92, -0.61], [1.92, -0.52],
        [1.92, -0.43], [1.92, -0.35], [2.01, -0.26], [2.09, -0.17]
      ]]
    },
    {
      name: "Antarctica",
      color: [200, 200, 200],
      isCircular: true,
      latMin: -1.48,
      latMax: -1.05
    }
  ];
}

// ── Build cells: square positions + text positions ──────────
function buildCells() {
  if (!globalContinentData) {
    console.log('Waiting for continent data...');
    return;
  }
  
  cells = [];
  
  // Text positions: lay out the phrase as centered lines
  const txtCols = Math.floor(W / cellW);
  const maxLineChars = Math.min(txtCols - 2, 32);
  const words = PHRASE.trim().split(" ");
  const lines = [];
  let cur = "";

  for (const w of words) {
    const test = cur ? cur + " " + w : w;
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

  // Build text positions array
  const textPositions = [];
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

  // Globe: create MORE characters than we need (N:1 mapping)
  const numSquareChars = textPositions.length * 50;
  const radius = Math.min(W, H) * 0.35;
  const centerX = W / 2;
  const centerY = H / 2;

  // Point-in-polygon test (ray casting algorithm)
  function pointInPolygon(lon, lat, polygon) {
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

  // Check if point is on a continent
  function isOnContinent(lon, lat) {
    // Normalize longitude to -PI to PI
    let lonNorm = lon;
    while (lonNorm > Math.PI) lonNorm -= Math.PI * 2;
    while (lonNorm < -Math.PI) lonNorm += Math.PI * 2;
    
    for (const cont of globalContinentData) {
      if (cont.isCircular) {
        // Antarctica: simple latitude check
        if (lat >= cont.latMin && lat <= cont.latMax) {
          return { color: cont.color, name: cont.name };
        }
      } else {
        // Check all polygons for this continent
        for (const polygon of cont.polygons) {
          if (pointInPolygon(lonNorm, lat, polygon)) {
            return { color: cont.color, name: cont.name };
          }
        }
      }
    }
    return null; // Ocean
  }

  // Create globe positions with continent clustering
  const squarePositions = [];
  let attempts = 0;
  const maxAttempts = numSquareChars * 5;

  console.log(`Generating ${numSquareChars} characters...`);

  while (squarePositions.length < numSquareChars && attempts < maxAttempts) {
    attempts++;
    
    // Random position on sphere
    const lat = Math.asin((Math.random() * 2 - 1)); // -PI/2 to PI/2
    const lon = Math.random() * Math.PI * 2; // 0 to 2PI
    
    const continentInfo = isOnContinent(lon, lat);
    
    // Accept point based on continent density
    // Earth is ~71% ocean, 29% land
    const acceptanceRate = continentInfo ? 0.95 : 0.01;
    if (Math.random() > acceptanceRate) continue;
    
    // Convert to 2D projection for initial positioning
    // Use proper spherical to Cartesian conversion
    const z = Math.cos(lat) * Math.cos(lon); // depth
    const x = Math.cos(lat) * Math.sin(lon); // horizontal
    const y = Math.sin(lat); // vertical
    
    const posX = centerX + x * radius + (Math.random() - 0.5) * cellW * 0.2;
    const posY = centerY - y * radius + (Math.random() - 0.5) * cellH * 0.2;
    
    // Calculate brightness
    const distFromCenter = Math.sqrt(Math.pow(posX - centerX, 2) + Math.pow(posY - centerY, 2)) / radius;
    const horizontalPos = x; // Already normalized (-1 to 1)
    const verticalPos = y; // Already normalized (-1 to 1)
    
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

  console.log(`Generated ${squarePositions.length} characters (${squarePositions.filter(p => p.isLand).length} on land)`);

  // Map each square character to a text position (many-to-one)
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
  
  // Debug: Count Toronto cells
  const torontoCells = cells.filter(c => {
    let lonDiff = Math.abs(c.sphereData.lon - TORONTO_LON_RAD);
    if (lonDiff > Math.PI) lonDiff = 2 * Math.PI - lonDiff;
    const latDiff = Math.abs(c.sphereData.lat - TORONTO_LAT_RAD);
    const dist = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
    return dist < 0.03;
  });
  console.log(`Toronto cells: ${torontoCells.length} out of ${cells.length}`);
}

// ── Helpers ─────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function ease(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; }
function randChar() { return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]; }

// ── Draw ────────────────────────────────────────────────────
function draw(ts) {
  if (!lastTime) lastTime = ts;
  const dt = ts - lastTime;
  lastTime = ts;
  companyTimer += dt;

  if (cells.length === 0) {
    // Still loading
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    requestAnimationFrame(draw);
    return;
  }

  const scrollY = window.scrollY;
  const rawP = Math.min(1, Math.max(0, scrollY / (H * 1.5)));
  const progress = ease(rawP);

  const fadeStart = H * 2.0;
  const fadeEnd = H * 2.7;
  const fade = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

  if (fade >= 1) {
    viewport.classList.add("hidden");
    requestAnimationFrame(draw);
    return;
  }
  viewport.classList.remove("hidden");
  viewport.style.opacity = String(1 - fade);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
  ctx.textBaseline = "top";

  // Draw all cells
  const centerX = cells._centerX;
  const centerY = cells._centerY;
  const radius = cells._radius;
  const rotationSpeed = 0.0003;
  const rotation = ts * rotationSpeed;

  for (const cell of cells) {
    // Earth: 3D sphere rotation
    const sphere = cell.sphereData;
    const currentLon = sphere.lon + rotation;
    
    // Project 3D sphere point to 2D using proper spherical coordinates
    // Standard spherical to Cartesian: x = r*cos(lat)*cos(lon), y = r*cos(lat)*sin(lon), z = r*sin(lat)
    // But we need to adjust for screen coordinates where Y increases downward
    const z3d = radius * Math.cos(sphere.lat) * Math.cos(currentLon); // depth (toward viewer)
    const x3d = radius * Math.cos(sphere.lat) * Math.sin(currentLon); // horizontal
    const y3d = radius * Math.sin(sphere.lat); // vertical (positive = north/up)
    
    // Only show characters on front hemisphere (z > 0 means facing viewer)
    const visibility = z3d > 0 ? 1 : 0;
    
    // Apply perspective
    const scale = 1 + (z3d / radius) * 0.1;
    
    const squareX = centerX + x3d * scale;
    const squareY = centerY - y3d * scale; // Negative because screen Y increases downward
    
    // Day/night shading
    const normalizedLon = ((currentLon % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const sunAngle = Math.abs(normalizedLon - Math.PI);
    const dayNightFactor = 0.5 + 0.5 * Math.cos(sunAngle);
    
    const x = lerp(squareX, cell.textX, progress);
    const y = lerp(squareY, cell.textY, progress);

    // Check if this cell is near Toronto
    // Need to account for longitude wrapping and use proper great circle distance
    let lonDiff = Math.abs(sphere.lon - TORONTO_LON_RAD);
    // Handle wrapping around -PI/PI boundary
    if (lonDiff > Math.PI) lonDiff = 2 * Math.PI - lonDiff;
    
    const latDiff = Math.abs(sphere.lat - TORONTO_LAT_RAD);
    const distToToronto = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
    const isTorontoCell = distToToronto < 0.03; // Smaller radius, ~2 degrees

    // Character: flicker in square phase, settle in text phase
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

    // Fade out duplicate characters as they converge
    let alpha = 1;
    let brightness = 1;
    
    if (progress < 0.7) {
      // Use Earth shading in globe phase
      const landBoost = sphere.isLand ? 1.4 : 0.6;
      brightness = cell.squareBrightness * (0.4 + dayNightFactor * 0.6) * landBoost;
      alpha = visibility;
    } else {
      // Fade to uniform white and reduce duplicates
      brightness = lerp(cell.squareBrightness * dayNightFactor, 1, (progress - 0.7) / 0.3);
      const shouldShow = cell.ci % 50 === 0;
      alpha = shouldShow ? 1 : lerp(1, 0, (progress - 0.7) / 0.3);
    }

    if (alpha > 0.05) {
      // Color Toronto cells red in globe phase
      if (progress < 0.7 && isTorontoCell && visibility > 0) {
        ctx.fillStyle = `rgba(255,0,0,${(alpha * brightness * 1.2).toFixed(2)})`; // Bright red, boosted brightness
      } else {
        ctx.fillStyle = `rgba(255,255,255,${(alpha * brightness).toFixed(2)})`;
      }
      ctx.fillText(ch, x, y);
    }
  }

  // Company name
  if (progress > 0.85) {
    drawCompany(ts, Math.min(1, (progress - 0.85) / 0.15));
  }

  requestAnimationFrame(draw);
}

// ── Company name ────────────────────────────────────────────
function drawCompany(ts, masterAlpha) {
  if (companyTimer > COMPANY_INTERVAL) {
    companyTimer = 0;
    companyIndex = (companyIndex + 1) % COMPANIES.length;
  }

  const name = COMPANIES[companyIndex];
  const y = cells._companyY;
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
    ctx.fillText("_", startX + visible * cellW, y);
  }
}

// ── Init ────────────────────────────────────────────────────
setup();
requestAnimationFrame(draw);
window.addEventListener("resize", () => { setup(); });
