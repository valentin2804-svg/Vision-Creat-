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

// ── Country Info ─────────────────────────────────────────────────────────
// Political/fiscal data not present in the Natural Earth borders GeoJSON
// (which only carries POP_EST / GDP_MD_EST). Curated static snapshot — like
// the news/stock fallback data elsewhere in this file, real-world leadership
// and debt figures shift over time and there is no live API for this, so
// treat it as illustrative rather than continuously up to date.
const COUNTRY_INFO = {
  USA: { leader:'Donald Trump',          party:'Republican Party',        orientation:'Rechts / Populistisch-konservativ',     debtGdp:123 },
  DEU: { leader:'Friedrich Merz',        party:'CDU/CSU',                 orientation:'Mitte-rechts / Christdemokratisch',     debtGdp:63  },
  FRA: { leader:'Emmanuel Macron',       party:'Renaissance',             orientation:'Mitte / Liberal',                       debtGdp:112 },
  GBR: { leader:'Keir Starmer',          party:'Labour Party',            orientation:'Mitte-links / Sozialdemokratisch',      debtGdp:100 },
  RUS: { leader:'Vladimir Putin',        party:'Einiges Russland',        orientation:'Autoritär / Nationalistisch',           debtGdp:20  },
  CHN: { leader:'Xi Jinping',            party:'Kommunistische Partei',   orientation:'Autoritär / Kommunistisch',             debtGdp:88  },
  UKR: { leader:'Volodymyr Zelensky',    party:'Diener des Volkes',       orientation:'Mitte / Pro-westlich',                  debtGdp:95  },
  ITA: { leader:'Giorgia Meloni',        party:'Fratelli d’Italia',  orientation:'Rechts / National-konservativ',         debtGdp:137 },
  ESP: { leader:'Pedro Sánchez',         party:'PSOE',                    orientation:'Mitte-links / Sozialdemokratisch',      debtGdp:105 },
  POL: { leader:'Donald Tusk',           party:'Koalicja Obywatelska',    orientation:'Mitte / Liberal-konservativ',           debtGdp:55  },
  IND: { leader:'Narendra Modi',         party:'BJP',                     orientation:'Rechts / Nationalistisch',              debtGdp:83  },
  JPN: { leader:'Shigeru Ishiba',        party:'LDP',                     orientation:'Mitte-rechts / Konservativ',            debtGdp:255 },
  KOR: { leader:'Lee Jae-myung',         party:'Demokratische Partei',    orientation:'Mitte-links / Liberal',                 debtGdp:50  },
  BRA: { leader:'Luiz Inácio Lula da Silva', party:'Partido dos Trabalhadores', orientation:'Links / Sozialdemokratisch',      debtGdp:85  },
  MEX: { leader:'Claudia Sheinbaum',     party:'Morena',                  orientation:'Links / Populistisch',                  debtGdp:52  },
  CAN: { leader:'Mark Carney',           party:'Liberal Party',           orientation:'Mitte / Liberal',                       debtGdp:107 },
  AUS: { leader:'Anthony Albanese',      party:'Labor Party',             orientation:'Mitte-links / Sozialdemokratisch',      debtGdp:50  },
  SAU: { leader:'König Salman / Kronprinz MbS', party:'Absolute Monarchie', orientation:'Autoritär / Konservativ',            debtGdp:26  },
  EGY: { leader:'Abdel Fattah el-Sisi',  party:'Militärnah / unabhängig', orientation:'Autoritär',                             debtGdp:96  },
  ZAF: { leader:'Cyril Ramaphosa',       party:'ANC (Koalitionsregierung)', orientation:'Mitte-links / Sozialdemokratisch',    debtGdp:75  },
  NGA: { leader:'Bola Tinubu',           party:'APC',                     orientation:'Mitte-rechts',                          debtGdp:52  },
  ARG: { leader:'Javier Milei',          party:'La Libertad Avanza',      orientation:'Rechts / Libertär',                     debtGdp:155 },
  IDN: { leader:'Prabowo Subianto',      party:'Gerindra',                orientation:'Rechts / Nationalistisch',              debtGdp:39  },
  PAK: { leader:'Shehbaz Sharif',        party:'PML-N',                   orientation:'Mitte / Konservativ',                   debtGdp:74  },
  VNM: { leader:'Tô Lâm',                party:'Kommunistische Partei',   orientation:'Autoritär / Kommunistisch',             debtGdp:34  },
  THA: { leader:'Paetongtarn Shinawatra', party:'Pheu Thai',              orientation:'Mitte / Populistisch',                  debtGdp:64  },
  NLD: { leader:'Dick Schoof',           party:'Parteilos (PVV-Koalition)', orientation:'Rechte Koalition',                    debtGdp:46  },
  SWE: { leader:'Ulf Kristersson',       party:'Moderaterna',             orientation:'Mitte-rechts / Konservativ',            debtGdp:33  },
  NOR: { leader:'Jonas Gahr Støre',      party:'Arbeiderpartiet',         orientation:'Mitte-links',                           debtGdp:42  },
  CHE: { leader:'Bundesrat (Kollegium)', party:'Mehrparteienregierung',   orientation:'Mitte',                                 debtGdp:18  },
  TUR: { leader:'Recep Tayyip Erdoğan',  party:'AKP',                     orientation:'Rechts / National-konservativ',         debtGdp:28  },
  ISR: { leader:'Benjamin Netanyahu',    party:'Likud',                   orientation:'Rechts / National-konservativ',         debtGdp:62  },
  IRN: { leader:'Masoud Pezeshkian / Ali Khamenei', party:'Theokratie',   orientation:'Autoritär / Theokratisch',              debtGdp:30  },
  SDN: { leader:'Abdel Fattah al-Burhan (Übergangsrat)', party:'Militärjunta', orientation:'Autoritär / Militärisch',          debtGdp:250 },
  ETH: { leader:'Abiy Ahmed',            party:'Wohlstandspartei',        orientation:'Mitte / Nationalistisch',               debtGdp:50  },
  SOM: { leader:'Hassan Sheikh Mohamud', party:'Föderalregierung',        orientation:'Mitte',                                 debtGdp:7   },
  MMR: { leader:'Min Aung Hlaing (Militärjunta)', party:'Verwaltungsrat', orientation:'Autoritär / Militärisch',              debtGdp:25  },
  COD: { leader:'Félix Tshisekedi',      party:'UDPS',                    orientation:'Mitte',                                 debtGdp:15  },
  YEM: { leader:'Rashad al-Alimi (Präsidialrat) / Houthis (Nord)', party:'Geteilte Übergangsregierung', orientation:'Gespalten', debtGdp:80 },
  SYR: { leader:'Ahmed al-Sharaa (Übergangspräsident)', party:'Übergangsregierung', orientation:'Im Umbruch',                 debtGdp:150 },
  LBN: { leader:'Joseph Aoun',           party:'Parteilos / Mehrkonfessionell', orientation:'Mitte-Koalition',                debtGdp:170 },
  LBY: { leader:'Abdul Hamid Dbeibah (West) / Rivalisierende Ostregierung', party:'Geteilt', orientation:'Gespalten',         debtGdp:4   },
  HTI: { leader:'Übergangspräsidialrat', party:'Übergangsregierung',      orientation:'Übergangsphase',                        debtGdp:30  },
  COL: { leader:'Gustavo Petro',         party:'Pacto Histórico',         orientation:'Links',                                 debtGdp:55  },
};

// ── Global Trade Routes (illustrative major corridors) ───────────────────
const TRADE_ROUTES = [
  { name:'Asien–Europa (Suez)',        color:'#30d158', coords:[121.5,31.2, 103.8,1.3, 32.5,29.9, 4.5,51.9] },
  { name:'Transpazifik (China–USA)',   color:'#0a84ff', coords:[121.5,31.2, -118.2,33.7] },
  { name:'Transatlantik (USA–Europa)', color:'#0a84ff', coords:[-74.0,40.7, 4.5,51.9] },
  { name:'Persischer Golf–Asien (Öl)', color:'#ff9f0a', coords:[56.3,26.5, 121.5,31.2] },
  { name:'Persischer Golf–Europa (Öl)', color:'#ff9f0a', coords:[56.3,26.5, 4.5,51.9] },
  { name:'Russland–China (Energie)',   color:'#ff9f0a', coords:[142.0,53.0, 121.5,31.2] },
  { name:'Australien–China (Erz)',     color:'#ffd60a', coords:[115.9,-31.9, 121.5,31.2] },
  { name:'Brasilien–China (Agrar/Erz)', color:'#ffd60a', coords:[-46.3,-23.9, 121.5,31.2] },
  { name:'Indien–Europa',              color:'#30d158', coords:[72.8,19.0, 32.5,29.9, 4.5,51.9] },
  { name:'USA–Ostasien',               color:'#0a84ff', coords:[-118.2,33.7, 139.7,35.6] },
];

// ── Ships (illustrative static positions along major shipping lanes) ─────
const SHIP_TYPE = {
  container: { color:'#0a84ff', label:'Containerschiff' },
  tanker:    { color:'#ff9f0a', label:'Öltanker' },
  lng:       { color:'#bf5af2', label:'LNG-Tanker' },
};
const SHIPS = [
  { name:'Ever Ace',              type:'container', cargo:'Container (24.000 TEU)', flag:'Panama',      lat:29.9,  lng:32.5,   route:'Asien–Europa (Suez)' },
  { name:'MSC Gülsün',            type:'container', cargo:'Container (23.500 TEU)', flag:'Panama',      lat:2.5,   lng:101.5,  route:'Straße von Malakka' },
  { name:'OOCL Hong Kong',        type:'container', cargo:'Container (21.400 TEU)', flag:'Hongkong',    lat:20.0,  lng:-160.0, route:'Asien–USA (Pazifik)' },
  { name:'CMA CGM Marco Polo',    type:'container', cargo:'Container (18.000 TEU)', flag:'Malta',       lat:35.0,  lng:-40.0,  route:'Transatlantik' },
  { name:'COSCO Shipping Universe', type:'container', cargo:'Container (21.000 TEU)', flag:'China',     lat:15.0,  lng:113.0,  route:'Südchinesisches Meer' },
  { name:'Maersk Madrid',         type:'container', cargo:'Container (16.000 TEU)', flag:'Dänemark',    lat:50.5,  lng:1.5,    route:'Ärmelkanal' },
  { name:'HMM Algeciras',         type:'container', cargo:'Container (23.900 TEU)', flag:'Südkorea',    lat:36.0,  lng:-6.0,   route:'Straße von Gibraltar' },
  { name:'Yang Ming Warranty',    type:'container', cargo:'Container (14.000 TEU)', flag:'Taiwan',      lat:9.1,   lng:-79.7,  route:'Panama-Kanal' },
  { name:'Front Altair',          type:'tanker',    cargo:'Rohöl (~2 Mio. Barrel)', flag:'Marshallinseln', lat:26.2, lng:56.7, route:'Straße von Hormus' },
  { name:'TI Europe',             type:'tanker',    cargo:'Rohöl (VLCC, ~3 Mio. Barrel)', flag:'Belgien', lat:26.6, lng:50.2, route:'Ras Tanura' },
  { name:'Sonangol Sangos',       type:'tanker',    cargo:'Rohöl (Westafrika)', flag:'Angola',          lat:3.0,   lng:7.0,    route:'Golf von Guinea' },
  { name:'Eagle Ford',            type:'tanker',    cargo:'Rohöl (US-Export)', flag:'USA',              lat:26.0,  lng:-90.0,  route:'Golf von Mexiko' },
  { name:'NS Leader',             type:'tanker',    cargo:'Rohöl (russischer Export)', flag:'Russland', lat:58.0,  lng:20.0,   route:'Ostsee' },
  { name:'Suez Rajan',            type:'tanker',    cargo:'Rohöl', flag:'Marshallinseln',                lat:20.0,  lng:38.0,   route:'Rotes Meer' },
  { name:'Yamal Spirit',          type:'lng',       cargo:'Flüssigerdgas (LNG)', flag:'Russland',        lat:72.0,  lng:70.0,   route:'Karasee (Arktis)' },
  { name:'Al Gattara',            type:'lng',       cargo:'Flüssigerdgas (LNG)', flag:'Katar',           lat:25.0,  lng:52.0,   route:'Persischer Golf' },
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
let tradeRoutesVisible = true;
let shipsVisible = true;
const allEntities = []; // { dot, rings[], event }
const tradeRouteEntities = [];
const shipEntities = [];

// ── Boot ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  buildTradeFilters();
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
// Optional: paste a free Cesium ion access token (cesium.com/ion → Access
// Tokens) here to enable real 3D OSM building extrusions on close zoom.
// Left empty, the globe still works fully — just without building geometry.
const CESIUM_ION_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYmI3YjA4NS1iZTJjLTQxMWMtYmVkNS0yMzU2ZTc0OWY2MzUiLCJpZCI6NDQ3NzQ0LCJzdWIiOiJ2YWxlbnRpbjI4MDQtc3ZnIiwiaXNzIjoiaHR0cHM6Ly9hcGkuY2VzaXVtLmNvbSIsImF1ZCI6IldXIiwiaWF0IjoxNzgyMTYxNDIxfQ.WUR2FOk9pxfq5t_aUIvIgpyEL3c32zS9k0S7U7ndwKA';

function initGlobe() {
  if (CESIUM_ION_TOKEN) {
    try { Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN; } catch(e) {}
  } else {
    // Suppress Ion token requirement — we use only third-party providers
    try { Cesium.Ion.defaultAccessToken = undefined; } catch(e) {}
  }

  // Hide credit container
  const creditDiv = document.createElement('div');
  creditDiv.style.display = 'none';
  document.body.appendChild(creditDiv);

  // UrlTemplateImageryProvider is synchronous and works in all Cesium versions.
  // Esri World Imagery: free, no API key, satellite tiles up to zoom 19 (~0.3m/px).
  const satelliteProvider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maximumLevel: 19, // Esri's real coverage tops out around here in well-mapped urban areas
    enablePickFeatures: false,
    credit: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics',
  });

  // Esri reference labels overlay (city names, roads, country names)
  const labelsProvider = new Cesium.UrlTemplateImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    maximumLevel: 19,
    enablePickFeatures: false,
  });

  viewer = new Cesium.Viewer('globe-el', {
    baseLayer:          false, // Cesium 1.104+: constructor's old `imageryProvider` option
                                // is ignored, silently leaving zero base layers. We add the
                                // satellite + labels layers ourselves right below, in order.
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

  // Satellite imagery first (bottom), reference labels/boundaries on top
  viewer.imageryLayers.addImageryProvider(satelliteProvider);
  viewer.imageryLayers.addImageryProvider(labelsProvider);

  // Real 3D building extrusions (only available with a Cesium ion token)
  if (CESIUM_ION_TOKEN) {
    Cesium.createOsmBuildingsAsync()
      .then(tileset => viewer.scene.primitives.add(tileset))
      .catch(e => console.warn('OSM Buildings failed to load:', e));
  }

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

  // Add global trade route arrows and ship markers
  buildTradeRoutes();
  buildShipEntities();

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
    if (!Cesium.defined(picked) || !picked.id) return;
    const id = picked.id;
    if (id.isConflict && id.worldwatchData) {
      openPopup(id.worldwatchData);
    } else if (id.isShip && id.worldwatchData) {
      openShipPopup(id.worldwatchData);
    } else if (id.properties?.ADM0_A3 || id.properties?.NAME) {
      openCountryPopup(id);
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
    const id     = Cesium.defined(picked) ? picked.id : undefined;
    const label  = id?.worldwatchData?.name || id?.properties?.NAME?.getValue() || id?.properties?.ADMIN?.getValue();
    if (label) {
      tooltip.textContent       = label;
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
  // wgs84ToWindowCoordinates is a pure projection with no occlusion test, so
  // markers on the far side of the globe still get a screen position and
  // "shine through" the surface — guard with EllipsoidalOccluder so only
  // points actually facing the camera get shown.
  const globeEl = document.getElementById('globe-el');
  const w = globeEl.clientWidth, h = globeEl.clientHeight;
  const occluder = new Cesium.EllipsoidalOccluder(viewer.scene.globe.ellipsoid, viewer.scene.camera.positionWC);
  allEntities.forEach(({ dot, ringEl, event }) => {
    if (!dot.show) { ringEl.style.display = 'none'; return; }
    const pos = dot.position.getValue(viewer.clock.currentTime);
    if (!occluder.isPointVisible(pos)) { ringEl.style.display = 'none'; return; }
    const win = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, pos);
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

// Cesium's own polygon-outline geometry funnels long segments through the
// same buggy geodesic/rhumb subdivision as the trade routes did (see
// buildGeodesicArc above) — a few large, simply-shaped countries (e.g.
// Russia, Canada, Australia) have multi-hundred-km straight segments at
// this resolution, and that occasionally throws "Too many properties to
// enumerate" depending on load timing. Side-step it the same way: disable
// Cesium's built-in outline entirely and draw our own border polylines,
// only subdividing the rare long segments ourselves.
function resampleBorderRing(cartesians) {
  const ellipsoid = Cesium.Ellipsoid.WGS84;
  const n = cartesians.length;
  const positions = [];
  for (let i = 0; i < n; i++) {
    const a = cartesians[i];
    const b = cartesians[(i + 1) % n];
    positions.push(a);
    const dist = Cesium.Cartesian3.distance(a, b);
    if (dist > 300000) { // > ~300km: pre-sample so Cesium never has to subdivide it itself
      const geodesic = new Cesium.EllipsoidGeodesic(
        Cesium.Cartographic.fromCartesian(a, ellipsoid),
        Cesium.Cartographic.fromCartesian(b, ellipsoid)
      );
      const steps = Math.min(30, Math.ceil(dist / 200000));
      for (let s = 1; s < steps; s++) {
        positions.push(Cesium.Cartographic.toCartesian(geodesic.interpolateUsingFraction(s / steps), ellipsoid));
      }
    }
  }
  positions.push(cartesians[0]);
  return positions;
}

function loadCountryBorders() {
  Cesium.GeoJsonDataSource.load(
    'https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson',
    {
      fill:        new Cesium.Color(0, 0, 0, 0),
      stroke:      Cesium.Color.TRANSPARENT,
      strokeWidth: 0,
      clampToGround: false,
    }
  ).then(ds => {
    viewer.dataSources.add(ds);
    const borderColor = Cesium.Color.fromCssColorString('#bbbbdd').withAlpha(0.35);
    ds.entities.values.forEach(entity => {
      if (!entity.polygon) return;
      entity.polygon.outline = false; // never let Cesium build its own outline geometry
      const hierarchy = entity.polygon.hierarchy?.getValue(viewer.clock.currentTime);
      if (!hierarchy?.positions?.length) return;
      viewer.entities.add({
        polyline: {
          positions: resampleBorderRing(hierarchy.positions),
          width: 1,
          material: new Cesium.ColorMaterialProperty(borderColor),
          arcType: Cesium.ArcType.NONE,
          clampToGround: false,
        },
      });
    });
  }).catch(() => {});
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

// ── Trade & Shipping ─────────────────────────────────────────────────────
function buildTradeFilters() {
  const container = document.getElementById('trade-filter-list');
  if (!container) return;
  const rows = [
    { key:'routes', color:'#30d158', label:'Handelsrouten', count: TRADE_ROUTES.length, get: () => tradeRoutesVisible, set: v => { tradeRoutesVisible = v; tradeRouteEntities.forEach(e => e.show = v); } },
    { key:'ships',  color:'#0a84ff', label:'Schiffe',       count: SHIPS.length,        get: () => shipsVisible,       set: v => { shipsVisible = v; shipEntities.forEach(e => e.show = v); } },
  ];
  rows.forEach(r => {
    const row = document.createElement('div');
    row.className = 'filter-row';
    row.innerHTML = `
      <div class="f-dot" style="background:${r.color};box-shadow:0 0 4px ${r.color}"></div>
      <span class="f-label">${r.label}</span>
      <span class="f-count">${r.count}</span>
      <div class="f-toggle" data-key="${r.key}" style="background:${r.color}"></div>
    `;
    const toggle = row.querySelector('.f-toggle');
    toggle.addEventListener('click', () => {
      const next = !r.get();
      r.set(next);
      toggle.classList.toggle('off', !next);
      toggle.style.background = next ? r.color : 'rgba(120,120,128,0.32)';
    });
    container.appendChild(row);
  });
}

// Cesium's built-in GEODESIC arc subdivision throws a RangeError ("Too many
// properties to enumerate") on long, continent-spanning segments — the same
// underlying bug previously hit via clampToGround. Side-step it entirely by
// pre-sampling the great-circle arc ourselves and handing Cesium already-short
// straight segments (arcType: NONE), so it never runs its own subdivision.
function buildGeodesicArc(coordsFlat, segmentsPerLeg = 24) {
  const positions = [];
  for (let i = 0; i < coordsFlat.length - 2; i += 2) {
    const start    = Cesium.Cartographic.fromDegrees(coordsFlat[i],   coordsFlat[i + 1]);
    const end      = Cesium.Cartographic.fromDegrees(coordsFlat[i + 2], coordsFlat[i + 3]);
    const geodesic = new Cesium.EllipsoidGeodesic(start, end);
    for (let s = (i > 0 ? 1 : 0); s <= segmentsPerLeg; s++) {
      const carto = geodesic.interpolateUsingFraction(s / segmentsPerLeg);
      positions.push(Cesium.Cartographic.toCartesian(carto));
    }
  }
  return positions;
}

function buildTradeRoutes() {
  tradeRouteEntities.length = 0;
  TRADE_ROUTES.forEach(route => {
    const entity = viewer.entities.add({
      show: tradeRoutesVisible,
      polyline: {
        positions: buildGeodesicArc(route.coords),
        width: 5,
        material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString(route.color).withAlpha(0.85)),
        arcType: Cesium.ArcType.NONE,
        clampToGround: false,
      },
    });
    entity.worldwatchData = { name: route.name };
    tradeRouteEntities.push(entity);
  });
}

const _shipIconCache = {};
function shipIconDataUrl(color) {
  if (_shipIconCache[color]) return _shipIconCache[color];
  const canvas = document.createElement('canvas');
  canvas.width = 28; canvas.height = 28;
  const ctx = canvas.getContext('2d');
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(14, 14, 12, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth   = 1.5;
  ctx.stroke();
  ctx.font = '14px sans-serif';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🚢', 14, 15);
  const url = canvas.toDataURL();
  _shipIconCache[color] = url;
  return url;
}

function buildShipEntities() {
  shipEntities.length = 0;
  SHIPS.forEach(ship => {
    const color = SHIP_TYPE[ship.type]?.color || '#0a84ff';
    const entity = viewer.entities.add({
      show: shipsVisible,
      position: Cesium.Cartesian3.fromDegrees(ship.lng, ship.lat),
      billboard: {
        image:  shipIconDataUrl(color),
        width:  22,
        height: 22,
        // No disableDepthTestDistance: billboards should be (and correctly
        // are, by default) occluded by the globe when on its far side.
      },
    });
    entity.worldwatchData = ship;
    entity.isShip = true;
    shipEntities.push(entity);
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
  closeInfoPopup();
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

// ── Country / Ship Info Popup (generic) ───────────────────────────────────
function openInfoPopup({ name, badgeText, badgeColor, rows, desc, flyTo }) {
  closePopup();
  set('i-name', name);
  const badge = document.getElementById('i-badge');
  badge.textContent   = badgeText;
  badge.style.cssText = `background:${badgeColor}18;color:${badgeColor};border:1px solid ${badgeColor}40`;
  const rowsEl = document.getElementById('i-rows');
  rowsEl.innerHTML = rows.map(([k, v]) => `<div class="popup-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('');
  set('i-desc', desc || '');
  document.getElementById('info-popup').classList.add('open');
  if (flyTo && viewer) {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(flyTo.lng, flyTo.lat, flyTo.height || 3500000),
      duration: 1.2,
    });
  }
}

function closeInfoPopup() {
  document.getElementById('info-popup').classList.remove('open');
}

function openCountryPopup(entity) {
  const props = entity.properties;
  const name  = props.NAME?.getValue() ?? props.ADMIN?.getValue() ?? 'Unbekannt';
  const iso   = props.ADM0_A3?.getValue() || props.ISO_A3?.getValue();
  const pop   = props.POP_EST?.getValue();
  const gdpMd = props.GDP_MD_EST?.getValue(); // millions USD
  const info  = COUNTRY_INFO[iso] || {};
  const rows = [
    ['Regierungschef',       info.leader      || '— keine Daten —'],
    ['Partei',               info.party       || '—'],
    ['Politische Ausrichtung', info.orientation || '—'],
    ['Bevölkerung',          pop   ? Math.round(pop).toLocaleString('de-DE')         : '—'],
    ['BIP',                  gdpMd ? '$' + Math.round(gdpMd / 1000).toLocaleString('de-DE') + ' Mrd.' : '—'],
    ['Staatsverschuldung',   info.debtGdp != null ? info.debtGdp + '% des BIP' : '—'],
  ];
  openInfoPopup({
    name,
    badgeText: props.CONTINENT?.getValue() || 'Land',
    badgeColor: '#0a84ff',
    rows,
    desc: info.leader ? 'Stand: 2025 — politische Angaben können sich seither geändert haben.' : 'Für dieses Land liegen keine detaillierten politischen Daten vor.',
  });
}

function openShipPopup(ship) {
  const cfg = SHIP_TYPE[ship.type] || {};
  openInfoPopup({
    name: ship.name,
    badgeText: cfg.label || ship.type,
    badgeColor: cfg.color || '#0a84ff',
    rows: [
      ['Ladung',   ship.cargo],
      ['Flagge',   ship.flag],
      ['Position', `${ship.lat.toFixed(1)}°, ${ship.lng.toFixed(1)}°`],
      ['Route',    ship.route],
    ],
    desc: 'Position illustrativ — kein Live-AIS-Tracking.',
    flyTo: { lng: ship.lng, lat: ship.lat, height: 1500000 },
  });
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
