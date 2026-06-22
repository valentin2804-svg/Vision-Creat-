'use strict';

// ── Events Data ───────────────────────────────────────────────────────────
const EVENTS = [
  { id:1,  name:'Russia–Ukraine War',          lat:49.0,  lng:31.0,   type:'war',      severity:10, region:'Europe',       casualties:'700,000+',      status:'Active',   desc:'Full-scale Russian invasion since Feb 2022. Active front through Donetsk, Zaporizhzhia, Kharkiv & Kherson oblasts.' },
  { id:2,  name:'Gaza War',                    lat:31.5,  lng:34.5,   type:'war',      severity:9,  region:'Middle East',  casualties:'45,000+',       status:'Active',   desc:'Israeli military operation following Hamas attacks on 7 Oct 2023. Severe humanitarian crisis in Gaza Strip.' },
  { id:3,  name:'Sudan Civil War',             lat:15.5,  lng:32.5,   type:'war',      severity:8,  region:'Africa',       casualties:'15,000+',       status:'Active',   desc:'SAF vs RSF (Rapid Support Forces). World\'s worst displacement crisis — over 8 million displaced.' },
  { id:4,  name:'Myanmar Civil War',           lat:17.0,  lng:96.0,   type:'war',      severity:7,  region:'Asia',         casualties:'50,000+',       status:'Active',   desc:'Military junta vs People\'s Defence Forces following 2021 coup. Junta controls less than 50% of territory.' },
  { id:5,  name:'DRC – M23 Conflict',          lat:-1.5,  lng:29.0,   type:'war',      severity:7,  region:'Africa',       casualties:'6M displaced',  status:'Active',   desc:'M23 rebel advance backed by Rwanda in eastern DRC. Goma remains contested.' },
  { id:6,  name:'Yemen War',                   lat:15.3,  lng:44.2,   type:'war',      severity:6,  region:'Middle East',  casualties:'377,000+',      status:'Active',   desc:'Houthi forces vs Saudi-led coalition. Red Sea attacks destabilize global shipping.' },
  { id:7,  name:'Syria – Ongoing Violence',    lat:35.0,  lng:38.8,   type:'war',      severity:5,  region:'Middle East',  casualties:'500,000+',      status:'Active',   desc:'Post-Assad transition fragile — continued militia activity and IS attacks.' },
  { id:8,  name:'Ethiopia – Amhara Region',    lat:11.5,  lng:37.8,   type:'war',      severity:5,  region:'Africa',       casualties:'Ongoing',       status:'Active',   desc:'Government forces vs Amhara Fano militias. Heavy civilian toll.' },
  { id:9,  name:'Lebanon Conflict',            lat:33.6,  lng:35.5,   type:'war',      severity:5,  region:'Middle East',  casualties:'4,000+',        status:'Active',   desc:'Cross-border hostilities between Israel and Hezbollah. South Lebanon affected.' },
  { id:10, name:'Libya – Civil Instability',   lat:27.0,  lng:18.0,   type:'war',      severity:3,  region:'Africa',       casualties:'Ongoing',       status:'Active',   desc:'Divided government, proxy warfare and militia activity.' },
  { id:11, name:'Sahel Jihadist Insurgency',   lat:14.5,  lng:-2.5,   type:'terrorism', severity:7, region:'Africa',       casualties:'Ongoing',       status:'Active',   desc:'JNIM & ISGS active in Mali, Burkina Faso, Niger. Millions displaced.' },
  { id:12, name:'Somalia – Al-Shabaab',        lat:2.0,   lng:45.3,   type:'terrorism', severity:6, region:'Africa',       casualties:'Ongoing',       status:'Active',   desc:'Al-Shabaab insurgency targeting government and civilians.' },
  { id:13, name:'Nigeria – ISWAP',             lat:12.5,  lng:13.3,   type:'terrorism', severity:5, region:'Africa',       casualties:'Ongoing',       status:'Active',   desc:'ISWAP and Boko Haram insurgency in the Lake Chad Basin.' },
  { id:14, name:'Afghanistan – IS-K',          lat:34.5,  lng:69.2,   type:'terrorism', severity:5, region:'Asia',         casualties:'Ongoing',       status:'Active',   desc:'IS-Khorasan attacks targeting Taliban and civilians.' },
  { id:15, name:'Pakistan – TTP',              lat:33.7,  lng:70.5,   type:'terrorism', severity:5, region:'Asia',         casualties:'Ongoing',       status:'Active',   desc:'Tehrik-i-Taliban Pakistan attacks in Khyber Pakhtunkhwa.' },
  { id:16, name:'Iraq – ISIS Remnants',        lat:33.8,  lng:43.8,   type:'terrorism', severity:4, region:'Middle East',  casualties:'Ongoing',       status:'Active',   desc:'Remaining ISIS cells conducting guerrilla attacks in Iraq & Syria.' },
  { id:17, name:'Mozambique – ISCAP',          lat:-13.0, lng:40.4,   type:'terrorism', severity:4, region:'Africa',       casualties:'1M displaced',  status:'Active',   desc:'IS-affiliated insurgency in Cabo Delgado province.' },
  { id:18, name:'Haiti – Gang War',            lat:18.55, lng:-72.35, type:'unrest',    severity:6, region:'Americas',     casualties:'8,000+/yr',     status:'Active',   desc:'Armed gang coalitions control majority of Port-au-Prince.' },
  { id:19, name:'Mexico – Cartel Violence',    lat:24.0,  lng:-104.0, type:'unrest',    severity:5, region:'Americas',     casualties:'30,000+/yr',    status:'Active',   desc:'CJNG, Sinaloa and other cartel warfare across multiple states.' },
  { id:20, name:'Colombia – FARC/ELN',         lat:4.5,   lng:-74.0,  type:'unrest',    severity:3, region:'Americas',     casualties:'Ongoing',       status:'Active',   desc:'FARC dissident groups and ELN continue attacks despite negotiations.' },
  { id:21, name:'Horn of Africa Drought',      lat:4.0,   lng:41.5,   type:'disaster',  severity:7, region:'Africa',       casualties:'22M at risk',   status:'Active',   desc:'Severe multi-year drought affecting Ethiopia, Somalia and Kenya.' },
  { id:22, name:'Bangladesh Flooding',         lat:23.7,  lng:90.4,   type:'disaster',  severity:5, region:'Asia',         casualties:'Seasonal',      status:'Seasonal', desc:'Annual monsoon flooding affecting millions in low-lying coastal areas.' },
  { id:23, name:'Philippines – Typhoon Zone',  lat:14.0,  lng:121.0,  type:'disaster',  severity:5, region:'Asia',         casualties:'Seasonal',      status:'Seasonal', desc:'High-frequency typhoon corridor. 20 typhoons per year average.' },
  { id:24, name:'Turkey – Earthquake Zone',    lat:38.5,  lng:34.0,   type:'disaster',  severity:4, region:'Europe/Asia',  casualties:'Ongoing risk',  status:'Watch',    desc:'Highly seismic zone. 2023 earthquake killed 50,000+.' },
  { id:25, name:'Mpox – DRC & Central Africa', lat:-3.0,  lng:23.5,   type:'disease',   severity:7, region:'Africa',       casualties:'20,000+ cases', status:'PHEIC',    desc:'Mpox clade I epidemic in DRC spreading to neighbors. WHO declared global Public Health Emergency.' },
  { id:26, name:'Cholera – East Africa',       lat:5.0,   lng:42.0,   type:'disease',   severity:5, region:'Africa',       casualties:'100k+ cases',   status:'Active',   desc:'Cholera outbreaks linked to conflict and displacement in Sudan, Somalia, Ethiopia.' },
  { id:27, name:'Dengue – Southeast Asia',     lat:12.0,  lng:108.0,  type:'disease',   severity:5, region:'Asia',         casualties:'5M+ cases/yr',  status:'Endemic',  desc:'Record dengue fever across Thailand, Vietnam, Philippines and Malaysia.' },
  { id:28, name:'H5N1 Avian Flu – Americas',   lat:40.0,  lng:-95.0,  type:'disease',   severity:5, region:'Americas',     casualties:'Spreading',     status:'Alert',    desc:'H5N1 spreading through US dairy cattle. WHO monitoring human transmission.' },
  { id:29, name:'Dengue – South America',      lat:-15.0, lng:-55.0,  type:'disease',   severity:5, region:'Americas',     casualties:'7M+ cases',     status:'Active',   desc:'Record dengue epidemic in Brazil, Argentina and South America.' },
  { id:30, name:'Yellow Fever – Angola',       lat:-8.8,  lng:13.2,   type:'disease',   severity:4, region:'Africa',       casualties:'Growing',       status:'Outbreak', desc:'Yellow fever outbreak in Angola and neighboring DRC border regions.' },
  { id:31, name:'COVID-19 – New Variants',     lat:35.0,  lng:105.0,  type:'disease',   severity:3, region:'Global',       casualties:'700M+ total',   status:'Endemic',  desc:'New variants causing seasonal surges globally. WHO monitoring.' },
];

// iOS system accent colors (dark mode), matching style.css design tokens
const T = {
  war:       { color:'#ff453a', label:'Armed Conflict'     },
  terrorism: { color:'#ff9f0a', label:'Terrorism'          },
  unrest:    { color:'#ffd60a', label:'Civil Unrest'       },
  disaster:  { color:'#0a84ff', label:'Natural Disaster'   },
  disease:   { color:'#bf5af2', label:'Disease / Outbreak' },
};

// Ukraine front line (approximate, 2025) — [lng, lat] pairs
const UKRAINE_FRONT_COORDS = [
  32.3,46.5, 32.7,46.7, 33.1,46.9, 33.5,47.1, 33.9,47.2,
  34.3,47.3, 34.8,47.4, 35.3,47.45, 35.8,47.5, 36.3,47.5,
  36.7,47.52, 37.0,47.75, 37.2,48.0, 37.4,48.2, 37.5,48.45,
  37.4,48.7, 37.3,48.95, 37.6,49.15, 38.0,49.4, 38.2,49.65,
  38.1,49.9, 37.7,50.2, 37.3,50.5, 36.9,50.85, 36.6,51.1,
];

// ── Stock Config ──────────────────────────────────────────────────────────
const STOCKS_TO_FETCH = [
  { symbol:'^GDAXI',   name:'DAX'      }, { symbol:'^DJI',     name:'DOW'      },
  { symbol:'^GSPC',    name:'S&P 500'  }, { symbol:'^IXIC',    name:'NASDAQ'   },
  { symbol:'EURUSD=X', name:'EUR/USD'  }, { symbol:'CL=F',     name:'WTI Oil'  },
  { symbol:'GC=F',     name:'Gold'     }, { symbol:'BTC-USD',  name:'Bitcoin'  },
  { symbol:'NVDA',     name:'NVIDIA'   }, { symbol:'SAP.DE',   name:'SAP'      },
  { symbol:'BMW.DE',   name:'BMW'      }, { symbol:'MBG.DE',   name:'Mercedes' },
  { symbol:'TSLA',     name:'Tesla'    }, { symbol:'AMZN',     name:'Amazon'   },
];

const STOCK_FALLBACK = [
  { symbol:'^GDAXI',   name:'DAX',      price:18432,  change:+1.21, prefix:'',  decimals:0 },
  { symbol:'^DJI',     name:'DOW',      price:38921,  change:-0.31, prefix:'',  decimals:0 },
  { symbol:'^GSPC',    name:'S&P 500',  price:5412,   change:+0.52, prefix:'',  decimals:0 },
  { symbol:'^IXIC',    name:'NASDAQ',   price:16821,  change:+1.15, prefix:'',  decimals:0 },
  { symbol:'EURUSD=X', name:'EUR/USD',  price:1.0842, change:-0.10, prefix:'',  decimals:4 },
  { symbol:'CL=F',     name:'WTI Oil',  price:78.50,  change:-1.21, prefix:'$', decimals:2 },
  { symbol:'GC=F',     name:'Gold',     price:2341,   change:+0.39, prefix:'$', decimals:0 },
  { symbol:'BTC-USD',  name:'Bitcoin',  price:67500,  change:+2.12, prefix:'$', decimals:0 },
  { symbol:'NVDA',     name:'NVIDIA',   price:892.40, change:+3.56, prefix:'$', decimals:2 },
  { symbol:'SAP.DE',   name:'SAP',      price:185.20, change:+2.83, prefix:'€', decimals:2 },
  { symbol:'BMW.DE',   name:'BMW',      price:82.50,  change:-2.08, prefix:'€', decimals:2 },
  { symbol:'MBG.DE',   name:'Mercedes', price:61.40,  change:+2.68, prefix:'€', decimals:2 },
  { symbol:'TSLA',     name:'Tesla',    price:182.30, change:-1.78, prefix:'$', decimals:2 },
  { symbol:'AMZN',     name:'Amazon',   price:186.50, change:+1.84, prefix:'$', decimals:2 },
];

// ── News ──────────────────────────────────────────────────────────────────
const WORLD_QUERIES = {
  all:'war conflict attack killed disaster outbreak', war:'war military battle soldiers offensive killed',
  terror:'terrorist attack bomb explosion militant', disaster:'earthquake flood hurricane typhoon wildfire disaster',
  unrest:'protest riot coup uprising crackdown opposition',
};
const GERMANY_QUERIES = {
  all:'Deutschland Germany Berlin Bundesregierung', politics:'Bundestag Bundesregierung Scholz CDU SPD',
  economy:'Deutsche Wirtschaft DAX Bundesbank Konjunktur', security:'Bundeswehr NATO Sicherheit Terrorismus',
  society:'Deutschland Migration Bildung Gesellschaft Klimaschutz',
};
const WORLD_FALLBACK = [
  { domain:'reuters.com',      seendate:'20260604T200000Z', title:'Ukraine frontline: Russian forces press offensive near Kharkiv amid heavy casualties on both sides', url:'https://reuters.com' },
  { domain:'bbc.co.uk',        seendate:'20260604T194000Z', title:'Gaza ceasefire talks stall as humanitarian situation reaches critical point, UN warns', url:'https://bbc.co.uk' },
  { domain:'wsj.com',          seendate:'20260604T191000Z', title:'Global markets shaken by Middle East escalation; oil surges past $85 per barrel', url:'https://wsj.com' },
  { domain:'handelsblatt.com', seendate:'20260604T185000Z', title:'NATO erhöht Alarmbereitschaft: Deutschland sichert Ukraine weitere Milliardenhilfe zu', url:'https://handelsblatt.com' },
  { domain:'apnews.com',       seendate:'20260604T182000Z', title:'Sudan: RSF forces shell residential areas of Khartoum, displacing thousands more civilians', url:'https://apnews.com' },
  { domain:'bbc.co.uk',        seendate:'20260604T175000Z', title:'Myanmar junta launches airstrikes on resistance-held towns in Sagaing region', url:'https://bbc.co.uk' },
  { domain:'dw.com',           seendate:'20260604T172000Z', title:'Sahel crisis: jihadist attacks kill dozens in Burkina Faso and Mali this week', url:'https://dw.com' },
  { domain:'reuters.com',      seendate:'20260604T165000Z', title:'Houthi drone attacks on Red Sea shipping resume after brief pause in Yemen fighting', url:'https://reuters.com' },
  { domain:'apnews.com',       seendate:'20260604T162000Z', title:'WHO: Mpox outbreak spreads to five new countries; emergency vaccination activated', url:'https://apnews.com' },
  { domain:'wsj.com',          seendate:'20260604T155000Z', title:'H5N1 bird flu: US reports new cattle herd infections, human spillover risk rises', url:'https://wsj.com' },
  { domain:'dw.com',           seendate:'20260604T150000Z', title:'Haiti: gang violence displaces 200,000 in Port-au-Prince as UN Security Council meets', url:'https://dw.com' },
  { domain:'bbc.co.uk',        seendate:'20260604T143000Z', title:'DRC: M23 rebels advance toward Goma despite international pressure for ceasefire', url:'https://bbc.co.uk' },
];
const GERMANY_FALLBACK = [
  { domain:'tagesschau.de',    seendate:'20260604T200000Z', title:'Bundestag debattiert neue Migrationspolitik — heftige Auseinandersetzungen zwischen Koalitionspartnern', url:'https://tagesschau.de' },
  { domain:'handelsblatt.com', seendate:'20260604T194000Z', title:'Deutsche Wirtschaft schrumpft erneut — BIP sinkt im zweiten Quartal um 0,2 Prozent', url:'https://handelsblatt.com' },
  { domain:'faz.net',          seendate:'20260604T191000Z', title:'Bundesfinanzminister: Haushaltslücke von 12 Milliarden Euro muss geschlossen werden', url:'https://faz.net' },
  { domain:'spiegel.de',       seendate:'20260604T185000Z', title:'SPD und CDU streiten über Rentenreform — Koalitionsgespräche vorübergehend gescheitert', url:'https://spiegel.de' },
  { domain:'sueddeutsche.de',  seendate:'20260604T180000Z', title:'Bayernwahl: CSU laut neuesten Umfragen mit deutlichem Vorsprung vor SPD', url:'https://sueddeutsche.de' },
  { domain:'welt.de',          seendate:'20260604T174000Z', title:'Deutsche Rüstungsexporte steigen auf Rekordniveau von 13 Milliarden Euro', url:'https://welt.de' },
  { domain:'tagesschau.de',    seendate:'20260604T170000Z', title:'Bundeswehr erhöht Verteidigungsausgaben auf 2,1 Prozent des BIP — historischer Schritt', url:'https://tagesschau.de' },
  { domain:'handelsblatt.com', seendate:'20260604T163000Z', title:'DAX auf Talfahrt: US-Zölle und Konjunktursorgen belasten deutschen Aktienmarkt', url:'https://handelsblatt.com' },
  { domain:'zeit.de',          seendate:'20260604T155000Z', title:'Energiepreise: Strom wird günstiger — doch Netzentgelte steigen für Verbraucher', url:'https://zeit.de' },
  { domain:'spiegel.de',       seendate:'20260604T150000Z', title:'Scholz trifft Macron: Gemeinsame Erklärung zu Ukraine-Unterstützung und europäischer Verteidigung', url:'https://spiegel.de' },
  { domain:'faz.net',          seendate:'20260604T143000Z', title:'KI in der Industrie: Siemens und BMW investieren Milliarden in Automatisierung', url:'https://faz.net' },
  { domain:'sueddeutsche.de',  seendate:'20260604T135000Z', title:'Asylsystem: Kommunen fordern dringend mehr Unterstützung vom Bund', url:'https://sueddeutsche.de' },
];

// ── State ─────────────────────────────────────────────────────────────────
let viewer       = null;
let activeFilters = new Set(Object.keys(T));
let activeTab    = 'all';
let newsMode     = 'world';
let fetching     = false;
let autoRotate   = true;
let rotateTimer  = null;
const allEntities = []; // { dot, rings[], event }

// ── Boot ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  buildNewsTabs('world');
  try {
    initGlobe();
  } catch (e) {
    console.error('Globe failed to initialize:', e);
    showGlobeError('Globe failed to load. Click to retry.');
  }
  fetchNews();
  fetchStocks();
  setInterval(fetchNews,   5 * 60 * 1000);
  setInterval(fetchStocks, 3 * 60 * 1000);
  stampTime();
});

function hideGlobeLoading() {
  const el = document.getElementById('globe-loading');
  if (el) el.classList.add('hidden');
}

function showGlobeError(message) {
  const el   = document.getElementById('globe-loading');
  const text = document.getElementById('globe-loading-text');
  if (!el || !text) return;
  text.textContent = message;
  el.classList.remove('hidden');
  el.style.cursor = 'pointer';
  el.onclick = () => window.location.reload();
}

// ── CesiumJS Globe ────────────────────────────────────────────────────────
function initGlobe() {
  // Suppress Ion token requirement — we use only third-party providers
  try { Cesium.Ion.defaultAccessToken = undefined; } catch(e) {}

  // Hide credit container
  const creditDiv = document.createElement('div');
  creditDiv.style.display = 'none';
  document.body.appendChild(creditDiv);

  // UrlTemplateImageryProvider is synchronous and works in all Cesium versions.
  // Esri World Imagery: free, no API key, satellite tiles up to zoom 19 (~0.3m/px).
  const satelliteProvider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maximumLevel: 17, // plenty for building-level zoom; avoids 404-thrash past Esri's real coverage
    enablePickFeatures: false,
    credit: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics',
  });

  // Esri reference labels overlay (city names, roads, country names)
  const labelsProvider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    maximumLevel: 17,
    enablePickFeatures: false,
  });

  viewer = new Cesium.Viewer('globe-el', {
    imageryProvider:    satelliteProvider,
    terrainProvider:    new Cesium.EllipsoidTerrainProvider(),
    animation:          false,
    baseLayerPicker:    false,
    fullscreenButton:   false,
    geocoder:           false,
    homeButton:         false,
    infoBox:            false,
    sceneModePicker:    false,
    selectionIndicator: false,
    timeline:           false,
    navigationHelpButton: false,
    creditContainer:    creditDiv,
  });

  // Add labels overlay on top of satellite
  viewer.imageryLayers.addImageryProvider(labelsProvider);

  // ── Performance tuning ──────────────────────────────────────────────
  // The pulsing rings + continuous rotation + tile streaming were pegging
  // the GPU at uncapped frame rate. Cap FPS, lower render resolution, and
  // reduce tile detail demand so the globe stays smooth on modest hardware.
  viewer.targetFrameRate = 30;
  viewer.resolutionScale = 0.8;
  viewer.scene.fxaa = false;
  viewer.scene.postProcessStages.fxaa.enabled = false;
  viewer.scene.globe.maximumScreenSpaceError = 4; // default 2 — fewer/lower-res tiles needed
  viewer.scene.globe.enableLighting       = false;
  viewer.scene.fog.enabled                = false;
  viewer.scene.skyAtmosphere.show         = true;
  viewer.scene.globe.showGroundAtmosphere = false; // ground glow was an extra render cost
  viewer.scene.globe.tileCacheSize = 50;           // keep fewer tiles resident

  // Start view: show Europe / Africa / Middle East
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(20, 15, 15000000),
    duration: 0,
  });

  // Hide the loading overlay once the first batch of tiles has painted —
  // with a safety-net timeout so a stalled tile request never leaves the
  // user staring at a spinner forever.
  const onTileProgress = remaining => { if (remaining === 0) hideGlobeLoading(); };
  viewer.scene.globe.tileLoadProgressEvent.addEventListener(onTileProgress);
  setTimeout(hideGlobeLoading, 5000);

  // Load country border polygons (async)
  loadCountryBorders();

  // Draw Ukraine front line
  drawFrontLine();

  // Add all conflict markers
  buildConflictEntities();

  // Animation: rings + auto-rotation run on every render frame
  viewer.scene.preRender.addEventListener(onRenderFrame);

  // Stop rotation when user interacts, resume after 6s
  viewer.camera.moveStart.addEventListener(() => {
    autoRotate = false;
    clearTimeout(rotateTimer);
  });
  viewer.camera.moveEnd.addEventListener(() => {
    rotateTimer = setTimeout(() => { autoRotate = true; }, 6000);
  });

  // Click → open popup
  const clickH = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  clickH.setInputAction(evt => {
    const picked = viewer.scene.pick(evt.position);
    if (Cesium.defined(picked) && picked.id?.worldwatchData) {
      openPopup(picked.id.worldwatchData);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // Hover → tooltip (throttled — scene.pick() on every mousemove was a major jank source)
  const hoverH  = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  const tooltip = document.getElementById('tooltip');
  let hoverThrottle = false;
  hoverH.setInputAction(evt => {
    if (hoverThrottle) return;
    hoverThrottle = true;
    setTimeout(() => { hoverThrottle = false; }, 80);

    const picked = viewer.scene.pick(evt.endPosition);
    if (Cesium.defined(picked) && picked.id?.worldwatchData) {
      tooltip.textContent       = picked.id.worldwatchData.name;
      tooltip.style.display     = 'block';
      viewer.scene.canvas.style.cursor = 'pointer';
    } else {
      tooltip.style.display     = 'none';
      viewer.scene.canvas.style.cursor = 'default';
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

// Called every rendered frame
function onRenderFrame() {
  // Auto-rotate around Earth's axis
  if (autoRotate) {
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.00007);
  }

  // Reposition the CSS pulse rings to track each entity's screen position.
  // Cheap (one matrix projection per event, no geometry) — the actual pulse
  // animation runs in CSS via `transform`/`opacity`, so positioning here uses
  // left/top instead, which never collides with the running CSS animation.
  const globeEl = document.getElementById('globe-el');
  const w = globeEl.clientWidth, h = globeEl.clientHeight;
  allEntities.forEach(({ dot, ringEl, event }) => {
    if (!dot.show) { ringEl.style.display = 'none'; return; }
    const win = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, dot.position.getValue(viewer.clock.currentTime));
    if (!win || win.x < -50 || win.x > w + 50 || win.y < -50 || win.y > h + 50) {
      ringEl.style.display = 'none';
    } else {
      ringEl.style.display = 'block';
      ringEl.style.left = win.x + 'px';
      ringEl.style.top  = win.y + 'px';
    }
  });
}

function buildConflictEntities() {
  allEntities.length = 0;
  const globeEl = document.getElementById('globe-el');

  EVENTS.forEach(event => {
    const pos     = Cesium.Cartesian3.fromDegrees(event.lng, event.lat);
    const hex     = T[event.type]?.color || '#ff2244';
    const color   = Cesium.Color.fromCssColorString(hex);
    const visible = activeFilters.has(event.type);
    const sizePx  = 13 + event.severity * 3; // ring footprint in screen px — kept modest so clustered markers don't blur into a blob

    // CSS-animated pulse ring (DOM div, positioned per-frame) — replaces the
    // old per-event animated Cesium ellipse, which forced a CPU geometry
    // rebuild every frame and was the single biggest cause of GPU stutter.
    const ringEl = document.createElement('div');
    ringEl.className = 'pulse-ring';
    ringEl.style.width      = sizePx + 'px';
    ringEl.style.height     = sizePx + 'px';
    ringEl.style.marginLeft = (-sizePx / 2) + 'px'; // centers the ring on its left/top point
    ringEl.style.marginTop  = (-sizePx / 2) + 'px';
    ringEl.style.color      = hex; // currentColor used by border/background in CSS
    ringEl.style.animationDelay = `${(event.id * 0.31) % 2.4}s`;
    ringEl.style.display    = visible ? 'block' : 'none';
    globeEl.appendChild(ringEl);

    // Static center dot + label for critical events
    const dot = viewer.entities.add({
      show: visible,
      position: pos,
      point: {
        pixelSize: 4 + event.severity * 0.55,
        color: color,
        outlineColor: Cesium.Color.WHITE.withAlpha(0.55),
        outlineWidth: 1,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
      label: event.severity >= 8 ? {
        text: event.name,
        font: '11px "Segoe UI", system-ui, sans-serif',
        fillColor: Cesium.Color.fromCssColorString('#ffe8e8'),
        showBackground: true,
        backgroundColor: new Cesium.Color(0, 0, 0.05, 0.75),
        backgroundPadding: new Cesium.Cartesian2(6, 3),
        pixelOffset: new Cesium.Cartesian2(0, -20),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 9000000),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      } : undefined,
    });

    // Store event data on the entity for click/hover
    dot.worldwatchData = event;
    dot.isConflict     = true;

    allEntities.push({ dot, ringEl, event });
  });

  updateStats(filteredEvents());
}

function updateEntityVisibility() {
  allEntities.forEach(({ dot, ringEl, event }) => {
    const show = activeFilters.has(event.type);
    dot.show = show;
    if (!show) ringEl.style.display = 'none';
  });
  updateStats(filteredEvents());
}

function loadCountryBorders() {
  // No clampToGround — our terrain is a flat EllipsoidTerrainProvider (no
  // elevation data), so clamping bought nothing but triggered an expensive
  // (and here buggy — "Too many properties to enumerate") ground-clamped
  // rhumb-line subdivision for every one of the ~180 country polygons.
  Cesium.GeoJsonDataSource.load(
    'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson',
    {
      stroke:      Cesium.Color.fromCssColorString('#bbbbdd').withAlpha(0.35),
      fill:        new Cesium.Color(0, 0, 0, 0),
      strokeWidth: 1,
      clampToGround: false,
    }
  ).then(ds => viewer.dataSources.add(ds)).catch(() => {});
}

function drawFrontLine() {
  viewer.entities.add({
    polyline: {
      positions:     Cesium.Cartesian3.fromDegreesArray(UKRAINE_FRONT_COORDS),
      width:         2.5,
      material: new Cesium.PolylineDashMaterialProperty({
        color:       Cesium.Color.fromCssColorString('#ff9f0a').withAlpha(0.9),
        dashLength:  20.0,
        dashPattern: parseInt('1111000011110000', 2),
      }),
      clampToGround: false,
    },
  });

  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(37.5, 48.5),
    label: {
      text: 'Front Line (est.)',
      font: '11px -apple-system, Segoe UI, sans-serif',
      fillColor: Cesium.Color.fromCssColorString('#ff9f0a'),
      showBackground: true,
      backgroundColor: new Cesium.Color(0, 0, 0, 0.7),
      backgroundPadding: new Cesium.Cartesian2(5, 3),
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 4500000),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  });
}

function filteredEvents() {
  return EVENTS.filter(e => activeFilters.has(e.type));
}

// refreshGlobe is called by filters and refreshAll
function refreshGlobe() {
  if (viewer) updateEntityVisibility();
}

// ── Filters ───────────────────────────────────────────────────────────────
function buildFilters() {
  const container = document.getElementById('filter-list');
  Object.entries(T).forEach(([type, cfg]) => {
    const count = EVENTS.filter(e => e.type === type).length;
    const row   = document.createElement('div');
    row.className = 'filter-row';
    row.innerHTML = `
      <div class="f-dot" style="background:${cfg.color};box-shadow:0 0 4px ${cfg.color}"></div>
      <span class="f-label">${cfg.label}</span>
      <span class="f-count">${count}</span>
      <div class="f-toggle" data-type="${type}" style="background:${cfg.color}"></div>
    `;
    const toggle = row.querySelector('.f-toggle');
    toggle.addEventListener('click', () => {
      if (activeFilters.has(type)) {
        activeFilters.delete(type);
        toggle.classList.add('off');
        toggle.style.background = 'rgba(120,120,128,0.32)'; // inline style beats CSS class, so set it directly
      } else {
        activeFilters.add(type);
        toggle.classList.remove('off');
        toggle.style.background = cfg.color;
      }
      refreshGlobe();
    });
    container.appendChild(row);
  });
}

// ── Stats ─────────────────────────────────────────────────────────────────
function updateStats(data) {
  const total    = data.length;
  const critical = data.filter(d => d.severity >= 8).length;
  const wars     = data.filter(d => d.type === 'war').length;
  const terror   = data.filter(d => d.type === 'terrorism').length;
  set('st-total',     total);    set('hdr-total',    total);
  set('st-critical',  critical); set('hdr-critical', critical);
  set('st-wars',      wars);     set('hdr-wars',     wars);
  set('st-terror',    terror);
}

// ── Popup ─────────────────────────────────────────────────────────────────
function openPopup(d) {
  const color = T[d.type]?.color || '#ff2244';
  set('p-name', d.name);
  const badge = document.getElementById('p-badge');
  badge.textContent   = T[d.type]?.label || d.type;
  badge.style.cssText = `background:${color}18;color:${color};border:1px solid ${color}40`;
  set('p-region',     d.region     || '—');
  set('p-casualties', d.casualties || '—');
  set('p-status',     d.status     || 'Active');
  set('p-desc',       d.desc       || '');
  const bar = document.getElementById('p-sev');
  bar.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const pip = document.createElement('div');
    pip.className = 'sev-pip' + (i <= d.severity ? ' on' : '');
    if (i <= d.severity) pip.style.background = color;
    bar.appendChild(pip);
  }
  document.getElementById('popup').classList.add('open');

  // Fly camera to conflict location
  if (viewer) {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(d.lng, d.lat, 4500000),
      duration: 1.5,
    });
  }
}

function closePopup() {
  document.getElementById('popup').classList.remove('open');
}

// ── News Mode & Tabs ──────────────────────────────────────────────────────
const WORLD_TABS   = [{id:'all',label:'All'},{id:'war',label:'War'},{id:'terror',label:'Terror'},{id:'disaster',label:'Disaster'},{id:'unrest',label:'Unrest'}];
const GERMANY_TABS = [{id:'all',label:'Alle'},{id:'politics',label:'Politik'},{id:'economy',label:'Wirtschaft'},{id:'security',label:'Sicherheit'},{id:'society',label:'Gesellschaft'}];

function buildNewsTabs(mode) {
  const container = document.getElementById('news-tabs');
  const tabs      = mode === 'world' ? WORLD_TABS : GERMANY_TABS;
  container.innerHTML = '';
  tabs.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className   = 'ntab' + (i === 0 ? ' active' : '');
    btn.textContent = t.label;
    btn.dataset.tab = t.id;
    btn.onclick     = () => setTab(btn, t.id);
    container.appendChild(btn);
  });
  activeTab = 'all';
  set('news-source-hint',
    mode === 'world'
      ? 'Reuters · BBC · WSJ · Handelsblatt · DW · AP'
      : 'Tagesschau · Spiegel · FAZ · SZ · Zeit · Welt'
  );
}

function setNewsMode(mode) {
  newsMode = mode;
  document.getElementById('mode-world').classList.toggle('active',   mode === 'world');
  document.getElementById('mode-germany').classList.toggle('active', mode === 'germany');
  buildNewsTabs(mode);
  fetchNews();
}

function setTab(btn, tab) {
  activeTab = tab;
  document.querySelectorAll('.ntab').forEach(b => b.classList.toggle('active', b === btn));
  fetchNews();
}

// ── News Fetch ────────────────────────────────────────────────────────────
async function fetchNews() {
  if (fetching) return;
  fetching = true;
  const list = document.getElementById('news-list');
  list.innerHTML = '<div class="news-loading"><div class="spinner"></div><span>Loading…</span></div>';
  const queryMap = newsMode === 'world' ? WORLD_QUERIES : GERMANY_QUERIES;
  const fallback = newsMode === 'world' ? WORLD_FALLBACK : GERMANY_FALLBACK;
  const q = (queryMap[activeTab] || queryMap.all).split(' ').slice(0, 5).join('+');
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(q)}&mode=artlist&maxrecords=15&format=json&timespan=12h&sort=DateDesc`;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    const data = await res.json();
    if (data?.articles?.length) {
      renderNews(data.articles);
      renderTicker(data.articles);
      fetching = false; stampTime(); return;
    }
  } catch {}
  renderNews(fallback);
  renderTicker(fallback);
  fetching = false;
  stampTime();
}

function renderNews(articles) {
  const list = document.getElementById('news-list');
  list.innerHTML = '';
  if (!articles?.length) { list.innerHTML = '<div class="news-empty">Keine Artikel verfügbar.</div>'; return; }
  articles.forEach(art => {
    const a = document.createElement('a');
    a.className = 'news-card';
    a.href = art.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.innerHTML = `
      <div class="nc-meta">
        <span class="nc-source">${esc(art.domain || parseDomain(art.url))}</span>
        <span class="nc-time">${esc(relTime(art.seendate))}</span>
      </div>
      <div class="nc-title">${esc(art.title)}</div>
    `;
    list.appendChild(a);
  });
}

function renderTicker(articles) {
  const inner = document.getElementById('ticker-inner');
  const items = (articles || []).slice(0, 10).map(a => `<span class="ti">${esc(a.title)}</span>`).join('');
  inner.innerHTML = items + items;
}

// ── Stock Ticker ──────────────────────────────────────────────────────────
async function fetchStocks() {
  const results = await Promise.allSettled(
    STOCKS_TO_FETCH.map(async s => {
      try {
        const ctrl = new AbortController();
        const t    = setTimeout(() => ctrl.abort(), 5000);
        const res  = await fetch(`https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s.symbol)}?interval=1d&range=1d`, { signal: ctrl.signal });
        clearTimeout(t);
        const d    = await res.json();
        const meta = d?.chart?.result?.[0]?.meta;
        if (!meta?.regularMarketPrice) return null;
        const price = meta.regularMarketPrice;
        const prev  = meta.previousClose || price;
        return { symbol: s.symbol, name: s.name, price, change: ((price - prev) / prev) * 100 };
      } catch { return null; }
    })
  );
  const data = STOCKS_TO_FETCH.map((s, i) => {
    const r = results[i];
    if (r.status === 'fulfilled' && r.value) return r.value;
    return STOCK_FALLBACK.find(f => f.symbol === s.symbol) || null;
  }).filter(Boolean);
  renderStockBar(data.length ? data : STOCK_FALLBACK);
}

function renderStockBar(stocks) {
  const inner = document.getElementById('stock-inner');
  const items = stocks.map(s => {
    const cfg      = STOCK_FALLBACK.find(f => f.symbol === s.symbol) || {};
    const prefix   = cfg.prefix   ?? '';
    const decimals = cfg.decimals ?? (s.price < 10 ? 4 : s.price < 100 ? 2 : 0);
    const priceFmt = Number(s.price).toLocaleString('de-DE', { minimumFractionDigits:decimals, maximumFractionDigits:decimals });
    const chg      = typeof s.change === 'number' ? s.change : 0;
    const cls      = chg >= 0 ? 'up' : 'dn';
    const arrow    = chg >= 0 ? '▲' : '▼';
    return `<span class="si"><span class="si-name">${esc(s.name)}</span> <span class="si-price">${prefix}${priceFmt}</span> <span class="si-chg ${cls}">${arrow} ${(chg >= 0 ? '+' : '')}${Math.abs(chg).toFixed(2)}%</span></span>`;
  }).join('');
  inner.innerHTML = items + items;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function refreshAll() { refreshGlobe(); fetchNews(); fetchStocks(); }
function stampTime() { const e = document.getElementById('last-update'); if (e) e.textContent = new Date().toLocaleTimeString('de-DE'); }
function set(id, val) { const e = document.getElementById(id); if (e) e.textContent = val; }
function parseDomain(url) { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; } }
function relTime(s) {
  if (!s) return '';
  try {
    const d = new Date(s.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
    const m = Math.floor((Date.now() - d) / 60000);
    if (m < 60) return `${m}m ago`; if (m < 1440) return `${Math.floor(m/60)}h ago`; return `${Math.floor(m/1440)}d ago`;
  } catch { return ''; }
}
function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
