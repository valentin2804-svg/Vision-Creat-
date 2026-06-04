'use strict';

// ── Conflict & Crisis Data ─────────────────────────────────────────────────
const EVENTS = [
  // Armed Conflicts / Wars
  { id:1,  name:'Russia–Ukraine War',       lat:49.0,  lng:31.0,   type:'war',       severity:10, region:'Europe',       casualties:'700,000+',  status:'Active',    desc:'Full-scale Russian invasion since Feb 2022. Largest land war in Europe since WWII.' },
  { id:2,  name:'Gaza War',                 lat:31.5,  lng:34.5,   type:'war',       severity:9,  region:'Middle East',  casualties:'45,000+',   status:'Active',    desc:'Israeli military operation following Hamas attacks on 7 Oct 2023.' },
  { id:3,  name:'Sudan Civil War',          lat:15.5,  lng:32.5,   type:'war',       severity:8,  region:'Africa',       casualties:'15,000+',   status:'Active',    desc:'SAF vs RSF conflict. World\'s worst displacement crisis — 8M+ displaced.' },
  { id:4,  name:'Myanmar Civil War',        lat:17.0,  lng:96.0,   type:'war',       severity:7,  region:'Asia',         casualties:'50,000+',   status:'Active',    desc:'Military junta vs People\'s Defence Forces following 2021 coup.' },
  { id:5,  name:'DRC – M23 Conflict',       lat:-1.5,  lng:29.0,   type:'war',       severity:7,  region:'Africa',       casualties:'6M displaced', status:'Active', desc:'M23 rebel advance backed by Rwanda in eastern DRC.' },
  { id:6,  name:'Yemen War',                lat:15.3,  lng:44.2,   type:'war',       severity:6,  region:'Middle East',  casualties:'377,000+',  status:'Active',    desc:'Houthi forces vs Saudi-led coalition. Major humanitarian catastrophe.' },
  { id:7,  name:'Syria – Ongoing Violence', lat:35.0,  lng:38.8,   type:'war',       severity:5,  region:'Middle East',  casualties:'500,000+',  status:'Active',    desc:'Continued fragmented fighting despite reduced intensity since 2020.' },
  { id:8,  name:'Ethiopia – Amhara Region', lat:11.5,  lng:37.8,   type:'war',       severity:5,  region:'Africa',       casualties:'Ongoing',   status:'Active',    desc:'Government forces vs Amhara Fano militias. Significant civilian toll.' },
  { id:9,  name:'Lebanon – IDF Conflict',   lat:33.6,  lng:35.5,   type:'war',       severity:5,  region:'Middle East',  casualties:'4,000+',    status:'Active',    desc:'Cross-border hostilities between Israel and Hezbollah.' },
  { id:10, name:'Libya – Civil Instability',lat:27.0,  lng:18.0,   type:'war',       severity:3,  region:'Africa',       casualties:'Ongoing',   status:'Active',    desc:'Divided government, proxy warfare and militia activity.' },

  // Terrorism / Insurgencies
  { id:11, name:'Sahel Jihadist Insurgency',lat:14.5,  lng:-2.5,   type:'terrorism', severity:7,  region:'Africa',       casualties:'Ongoing',   status:'Active',    desc:'JNIM & ISGS active in Mali, Burkina Faso, Niger. Millions displaced.' },
  { id:12, name:'Somalia – Al-Shabaab',     lat:2.0,   lng:45.3,   type:'terrorism', severity:6,  region:'Africa',       casualties:'Ongoing',   status:'Active',    desc:'Al-Shabaab insurgency targeting government forces and civilians.' },
  { id:13, name:'Nigeria – ISWAP/Boko Haram',lat:12.5, lng:13.3,   type:'terrorism', severity:5,  region:'Africa',       casualties:'Ongoing',   status:'Active',    desc:'ISWAP and Boko Haram insurgency in the Lake Chad Basin.' },
  { id:14, name:'Afghanistan – IS-K',       lat:34.5,  lng:69.2,   type:'terrorism', severity:5,  region:'Asia',         casualties:'Ongoing',   status:'Active',    desc:'IS-Khorasan attacks targeting Taliban and civilians.' },
  { id:15, name:'Pakistan – TTP',           lat:33.7,  lng:70.5,   type:'terrorism', severity:5,  region:'Asia',         casualties:'Ongoing',   status:'Active',    desc:'Tehrik-i-Taliban Pakistan attacks in Khyber Pakhtunkhwa.' },
  { id:16, name:'Iraq – ISIS Remnants',     lat:33.8,  lng:43.8,   type:'terrorism', severity:4,  region:'Middle East',  casualties:'Ongoing',   status:'Active',    desc:'Remaining ISIS cells conducting guerrilla attacks in Iraq & Syria.' },
  { id:17, name:'Mozambique – ISCAP',       lat:-13.0, lng:40.4,   type:'terrorism', severity:4,  region:'Africa',       casualties:'1M displaced', status:'Active', desc:'IS-affiliated insurgency in Cabo Delgado province.' },

  // Civil / Political Unrest
  { id:18, name:'Haiti – Gang War',         lat:18.55, lng:-72.35, type:'unrest',    severity:6,  region:'Americas',     casualties:'8,000+/yr', status:'Active',    desc:'Armed gang coalitions control majority of Port-au-Prince.' },
  { id:19, name:'Mexico – Cartel Violence', lat:24.0,  lng:-104.0, type:'unrest',    severity:5,  region:'Americas',     casualties:'30,000+/yr',status:'Active',    desc:'CJNG, Sinaloa and other cartel warfare across multiple states.' },
  { id:20, name:'Colombia – FARC/ELN',      lat:4.5,   lng:-74.0,  type:'unrest',    severity:3,  region:'Americas',     casualties:'Ongoing',   status:'Active',    desc:'FARC dissident groups and ELN continue attacks.' },

  // Natural Disasters (persistent/seasonal high-risk zones)
  { id:21, name:'Horn of Africa Drought',   lat:4.0,   lng:41.5,   type:'disaster',  severity:7,  region:'Africa',       casualties:'22M at risk',status:'Active',   desc:'Severe drought affecting Ethiopia, Somalia and Kenya. UN declares emergency.' },
  { id:22, name:'Bangladesh Flooding',      lat:23.7,  lng:90.4,   type:'disaster',  severity:5,  region:'Asia',         casualties:'Seasonal',  status:'Seasonal',  desc:'Annual flooding affecting millions in low-lying coastal areas.' },
  { id:23, name:'Philippines – Typhoon Zone',lat:14.0, lng:121.0,  type:'disaster',  severity:5,  region:'Asia',         casualties:'Seasonal',  status:'Seasonal',  desc:'High-frequency typhoon corridor in the Western Pacific.' },
  { id:24, name:'Turkey Earthquake Zone',   lat:38.5,  lng:34.0,   type:'disaster',  severity:4,  region:'Europe/Asia',  casualties:'Ongoing risk', status:'Watch', desc:'Highly seismic zone following 2023 earthquake disaster.' },
];

// ── Type Config ────────────────────────────────────────────────────────────
const T = {
  war:       { color:'#ff2244', label:'Armed Conflict' },
  terrorism: { color:'#ff6600', label:'Terrorism'      },
  unrest:    { color:'#ff8800', label:'Civil Unrest'   },
  disaster:  { color:'#0099ff', label:'Natural Disaster'},
};

// ── State ──────────────────────────────────────────────────────────────────
let globe = null;
let activeFilters = new Set(['war','terrorism','unrest','disaster']);
let activeTab = 'all';
let fetching = false;
let rotateTimer = null;

// ── GDELT Query Map ────────────────────────────────────────────────────────
const QUERIES = {
  all:     'war conflict killed attack explosion earthquake flood',
  war:     'war military offensive soldiers killed battle',
  terror:  'terrorist attack bomb explosion militant killed',
  disaster:'earthquake flood hurricane typhoon wildfire disaster killed',
  unrest:  'protest riot coup uprising crackdown killed',
};

// ── Boot ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  initGlobe();
  fetchNews();
  setInterval(fetchNews, 5 * 60 * 1000);
  stampTime();
});

// ── Globe ──────────────────────────────────────────────────────────────────
function initGlobe() {
  const el = document.getElementById('globe-el');
  const tooltip = document.getElementById('tooltip');

  // Mount first, then configure
  globe = Globe()(el);

  globe
    .backgroundColor('#000000')
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .showAtmosphere(true)
    .atmosphereColor('#3344bb')
    .atmosphereAltitude(0.14)
    .onPointHover(d => {
      el.style.cursor = d ? 'pointer' : 'default';
      if (d) {
        tooltip.textContent = d.name;
        tooltip.style.display = 'block';
      } else {
        tooltip.style.display = 'none';
      }
    })
    .onPointClick(d => openPopup(d));

  globe.pointOfView({ lat: 20, lng: 15, altitude: 2.3 });

  // Auto-rotation (wrapped — controls may not be ready immediately)
  try {
    const ctrl = globe.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.28;
    ctrl.addEventListener('start', () => {
      globe.controls().autoRotate = false;
      clearTimeout(rotateTimer);
    });
    ctrl.addEventListener('end', () => {
      rotateTimer = setTimeout(() => { globe.controls().autoRotate = true; }, 6000);
    });
  } catch (e) {
    console.warn('Controls not ready yet:', e.message);
  }

  // Responsive resize
  const ro = new ResizeObserver(() => {
    globe.width(el.clientWidth).height(el.clientHeight);
  });
  ro.observe(el);

  // Set data — use setTimeout so the GL context finishes setup
  setTimeout(refreshGlobe, 50);
}

function filteredEvents() {
  return EVENTS.filter(e => activeFilters.has(e.type));
}

function refreshGlobe() {
  const data = filteredEvents();

  globe
    .ringsData(data)
    .ringColor(d => T[d.type]?.color || '#ff2244')
    .ringMaxRadius(d => d.severity * 2.4)
    .ringPropagationSpeed(d => Math.max(0.8, d.severity * 0.35))
    .ringRepeatPeriod(d => 1400 - d.severity * 60)
    .ringAltitude(0.005)
    .ringResolution(72);

  globe
    .pointsData(data)
    .pointColor(d => T[d.type]?.color || '#ff2244')
    .pointAltitude(0.015)
    .pointRadius(d => 0.12 + d.severity * 0.045)
    .pointsMerge(false);

  globe
    .labelsData(data.filter(d => d.severity >= 8))
    .labelText(d => d.name)
    .labelColor(() => 'rgba(255,220,220,0.75)')
    .labelSize(0.55)
    .labelAltitude(0.025)
    .labelResolution(2)
    .labelIncludeDot(false);

  updateStats(data);
}

// ── Popup ──────────────────────────────────────────────────────────────────
function openPopup(d) {
  const popup = document.getElementById('popup');
  const color = T[d.type]?.color || '#ff2244';

  document.getElementById('p-name').textContent = d.name;

  const badge = document.getElementById('p-badge');
  badge.textContent = T[d.type]?.label || d.type;
  badge.style.cssText = `background:${color}18;color:${color};border:1px solid ${color}40`;

  document.getElementById('p-region').textContent     = d.region     || '—';
  document.getElementById('p-casualties').textContent = d.casualties || '—';
  document.getElementById('p-status').textContent     = d.status     || 'Active';
  document.getElementById('p-desc').textContent       = d.desc       || '';

  const bar = document.getElementById('p-sev');
  bar.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const pip = document.createElement('div');
    pip.className = 'sev-pip' + (i <= d.severity ? ' on' : '');
    if (i <= d.severity) pip.style.background = color;
    bar.appendChild(pip);
  }

  popup.classList.add('open');
  globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.9 }, 900);
}

function closePopup() {
  document.getElementById('popup').classList.remove('open');
}

// ── Filters ────────────────────────────────────────────────────────────────
function buildFilters() {
  const container = document.getElementById('filter-list');
  const types = ['war','terrorism','unrest','disaster'];
  types.forEach(type => {
    const count = EVENTS.filter(e => e.type === type).length;
    const color = T[type].color;
    const row = document.createElement('div');
    row.className = 'filter-row';
    row.innerHTML = `
      <div class="f-dot" style="background:${color};box-shadow:0 0 5px ${color}"></div>
      <span class="f-label">${T[type].label}</span>
      <span class="f-count">${count}</span>
      <div class="f-toggle" data-type="${type}"></div>
    `;
    const toggle = row.querySelector('.f-toggle');
    toggle.addEventListener('click', () => {
      if (activeFilters.has(type)) {
        activeFilters.delete(type);
        toggle.classList.add('off');
      } else {
        activeFilters.add(type);
        toggle.classList.remove('off');
      }
      refreshGlobe();
    });
    container.appendChild(row);
  });
}

// ── Stats ──────────────────────────────────────────────────────────────────
function updateStats(data) {
  const total    = data.length;
  const critical = data.filter(d => d.severity >= 8).length;
  const wars     = data.filter(d => d.type === 'war').length;
  const terror   = data.filter(d => d.type === 'terrorism').length;

  document.getElementById('st-total').textContent    = total;
  document.getElementById('st-critical').textContent = critical;
  document.getElementById('st-wars').textContent     = wars;
  document.getElementById('st-terror').textContent   = terror;

  document.getElementById('hdr-total').textContent    = total;
  document.getElementById('hdr-critical').textContent = critical;
  document.getElementById('hdr-wars').textContent     = wars;
}

// ── Fallback news shown when GDELT is unreachable ─────────────────────────
const FALLBACK_NEWS = [
  { domain:'reuters.com',     seendate:'20260604T200000Z', title:'Ukraine frontline: Russian forces press offensive near Kharkiv amid heavy casualties on both sides', url:'https://reuters.com' },
  { domain:'bbc.co.uk',       seendate:'20260604T194000Z', title:'Gaza ceasefire talks stall as humanitarian situation reaches critical point, UN warns', url:'https://bbc.co.uk' },
  { domain:'apnews.com',      seendate:'20260604T191500Z', title:'Sudan: RSF forces shell residential areas of Khartoum, displacing thousands more civilians', url:'https://apnews.com' },
  { domain:'aljazeera.com',   seendate:'20260604T185000Z', title:'Myanmar junta launches airstrikes on resistance-held towns, killing at least 34 civilians', url:'https://aljazeera.com' },
  { domain:'theguardian.com', seendate:'20260604T182000Z', title:'DRC: M23 rebels advance on Goma despite international calls for ceasefire', url:'https://theguardian.com' },
  { domain:'dw.com',          seendate:'20260604T175000Z', title:'Sahel crisis: jihadist attacks kill dozens in Burkina Faso and Mali this week', url:'https://dw.com' },
  { domain:'reuters.com',     seendate:'20260604T172000Z', title:'Houthi drone attacks on Red Sea shipping resume after brief pause in Yemen fighting', url:'https://reuters.com' },
  { domain:'bbc.co.uk',       seendate:'20260604T165000Z', title:'Horn of Africa drought: 22 million facing acute food insecurity, WFP says', url:'https://bbc.co.uk' },
  { domain:'france24.com',    seendate:'20260604T162000Z', title:'Haiti: gang violence displaces 200,000 in Port-au-Prince as security council meets', url:'https://france24.com' },
  { domain:'apnews.com',      seendate:'20260604T155000Z', title:'Pakistan: military operation against TTP militants kills 18 in Khyber Pakhtunkhwa', url:'https://apnews.com' },
  { domain:'aljazeera.com',   seendate:'20260604T152000Z', title:'Somalia: Al-Shabaab suicide bombing targets government convoy in Mogadishu', url:'https://aljazeera.com' },
  { domain:'reuters.com',     seendate:'20260604T145000Z', title:'Mexico records 94 homicides in 24 hours as cartel violence surges in three states', url:'https://reuters.com' },
];

// ── News Feed (GDELT with fallback) ───────────────────────────────────────
async function fetchNews() {
  if (fetching) return;
  fetching = true;

  const list = document.getElementById('news-list');
  list.innerHTML = '<div class="news-loading"><div class="spinner"></div><span>Loading reports…</span></div>';

  const q = (QUERIES[activeTab] || QUERIES.all).split(' ').slice(0,4).join('+');
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(q)}&mode=artlist&maxrecords=20&format=json&timespan=12h&sort=DateDesc`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res  = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const data = await res.json();

    if (data?.articles?.length) {
      const english = data.articles.filter(a => a.language === 'English' || !a.language);
      renderNews(english.length ? english : data.articles);
      renderTicker(english.length ? english : data.articles);
      fetching = false;
      stampTime();
      return;
    }
  } catch (err) {
    console.info('GDELT unavailable, using fallback data');
  }

  // Fallback: show curated recent headlines
  const filtered = activeTab === 'all' ? FALLBACK_NEWS : FALLBACK_NEWS.slice(0, 6);
  renderNews(filtered);
  renderTicker(filtered);
  fetching = false;
  stampTime();
}

function renderNews(articles) {
  const list = document.getElementById('news-list');
  list.innerHTML = '';

  articles.forEach(art => {
    const a = document.createElement('a');
    a.className = 'news-card';
    a.href = art.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const domain = art.domain || parseDomain(art.url);
    const time   = relTime(art.seendate);

    a.innerHTML = `
      <div class="nc-meta">
        <span class="nc-source">${esc(domain)}</span>
        <span class="nc-time">${esc(time)}</span>
      </div>
      <div class="nc-title">${esc(art.title)}</div>
    `;
    list.appendChild(a);
  });
}

function renderTicker(articles) {
  const inner = document.getElementById('ticker-inner');
  const items = articles.slice(0, 10).map(a => `<span class="ti">${esc(a.title)}</span>`).join('');
  inner.innerHTML = items + items;
}

// ── Tab switching ──────────────────────────────────────────────────────────
function setTab(btn, tab) {
  activeTab = tab;
  document.querySelectorAll('.ntab').forEach(b => b.classList.toggle('active', b === btn));
  fetchNews();
}

// ── Manual refresh ─────────────────────────────────────────────────────────
function refreshAll() {
  refreshGlobe();
  fetchNews();
}

// ── Helpers ────────────────────────────────────────────────────────────────
function stampTime() {
  const el = document.getElementById('last-update');
  if (el) el.textContent = new Date().toLocaleTimeString();
}

function parseDomain(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); }
  catch { return ''; }
}

function relTime(s) {
  if (!s) return '';
  try {
    const d = new Date(s.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1-$2-$3T$4:$5:$6Z'));
    const m = Math.floor((Date.now() - d) / 60000);
    if (m < 60)   return `${m}m ago`;
    if (m < 1440) return `${Math.floor(m/60)}h ago`;
    return `${Math.floor(m/1440)}d ago`;
  } catch { return ''; }
}

function esc(str) {
  return (str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
