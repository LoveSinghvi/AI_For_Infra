import React, { useState } from 'react';
import { HOTSPOTS } from '../data/mockData';
import { HotspotData } from '../types';

interface DemandHeatmapTabProps {
  onNavigateToPrioritizer: (hotspotId?: string) => void;
  showToast: (msg: string) => void;
}

export const DemandHeatmapTab: React.FC<DemandHeatmapTabProps> = ({
  onNavigateToPrioritizer,
  showToast,
}) => {
  const [selectedHotspotKey, setSelectedHotspotKey] = useState<string>('varanasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStateFilter, setActiveStateFilter] = useState('All');
  const [nitiActive, setNitiActive] = useState(true);
  const [pmgsyActive, setPmgsyActive] = useState(false);
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeHotspot: HotspotData = HOTSPOTS[selectedHotspotKey] || HOTSPOTS.varanasi;

  const handleSelectHotspot = (key: string) => {
    setSelectedHotspotKey(key);
    setIsPlayingAudio(false);
    showToast(`Focused on ${HOTSPOTS[key].title}`);
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      showToast(`Playing verified dialect recording: ${activeHotspot.audioDialect}`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      {/* Live Sync Ticker Bar */}
      <div className="py-2 px-3 sm:px-4 bg-[#dce9ff]/60 border border-[#dce9ff] rounded-xl flex items-center justify-between gap-2 mt-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a73a00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a73a00]"></span>
          </span>
          <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#43474d] truncate">
            NIC-BHASHINI ENGINE: LIVE
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#43474d] flex-shrink-0">
          <span className="material-symbols-outlined text-[15px] text-[#7bda93]">cloud_sync</span>
          <span className="font-['Noto_Sans'] text-xs text-[#43474d]">4m ago</span>
        </div>
      </div>

      {/* Primary Header */}
      <div className="pb-3 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-[#00162d] text-white font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase font-bold">
            PM GatiShakti Stack
          </span>
          <span className="text-[#a73a00] font-['Noto_Sans'] text-xs flex items-center gap-0.5 font-semibold">
            <span className="material-symbols-outlined text-[14px]">insights</span> GIS Synced
          </span>
        </div>
        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl md:text-3xl text-[#00162d] tracking-tight">
          AI Demand Hotspots
        </h1>
        <p className="font-['Noto_Sans'] text-xs sm:text-sm text-[#43474d]">
          Citizen multi-lingual grievance signals synthesized into capital allocation intelligence.
        </p>
      </div>

      {/* Search Bar & State Filter */}
      <div className="pb-4">
        <div className="bg-[#ffffff] rounded-xl p-2.5 sm:p-3 shadow-xs flex flex-col gap-2 border border-[#e5eeff]">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#74777e] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search District, Pincode or Gram Panchayat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2.5 bg-[#eff4ff] rounded-lg font-['Noto_Sans'] text-xs sm:text-sm text-[#0b1c30] placeholder:text-[#74777e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#00162d]/20 transition-all"
            />
            <button
              onClick={() => showToast('Refined by GIS Spatial Index')}
              className="absolute right-1.5 px-3 py-1.5 bg-[#00162d] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer hover:bg-[#0f2b48]"
            >
              <span className="material-symbols-outlined text-[14px]">tune</span>
              <span>Filters</span>
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-nowrap select-none">
            <button
              onClick={() => setActiveStateFilter('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                activeStateFilter === 'All'
                  ? 'bg-[#0f2b48] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">flag</span> All States
            </button>
            <button
              onClick={() => {
                setActiveStateFilter('UP');
                setSelectedHotspotKey('varanasi');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                activeStateFilter === 'UP'
                  ? 'bg-[#0f2b48] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              <span>Uttar Pradesh</span>
              <span className="w-4 h-4 rounded-full bg-[#ffdbce] text-[#a73a00] text-[10px] flex items-center justify-center font-bold">
                412
              </span>
            </button>
            <button
              onClick={() => {
                setActiveStateFilter('MP');
                setSelectedHotspotKey('barwani');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                activeStateFilter === 'MP'
                  ? 'bg-[#0f2b48] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              <span>Madhya Pradesh</span>
              <span className="w-4 h-4 rounded-full bg-[#dce9ff] text-[#00162d] text-[10px] flex items-center justify-center font-bold">
                298
              </span>
            </button>
            <button
              onClick={() => {
                setActiveStateFilter('TN');
                setSelectedHotspotKey('chennai');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                activeStateFilter === 'TN'
                  ? 'bg-[#0f2b48] text-white shadow-xs'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
              }`}
            >
              <span>Tamil Nadu</span>
              <span className="w-4 h-4 rounded-full bg-[#dce9ff] text-[#00162d] text-[10px] flex items-center justify-center font-bold">
                184
              </span>
            </button>
            <button
              onClick={() => setActiveStateFilter('BR')}
              className="px-3 py-1.5 rounded-full bg-[#eff4ff] text-[#0b1c30] text-xs font-medium hover:bg-[#e5eeff] transition-all cursor-pointer"
            >
              <span>Bihar</span>
              <span className="w-4 h-4 rounded-full bg-[#dce9ff] text-[#00162d] text-[10px] flex items-center justify-center font-bold">
                119
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI & Aggregation Metrics Ribbon */}
      <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#ffffff] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between border border-[#e5eeff]">
          <div className="flex items-center justify-between text-[#a73a00]">
            <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bda93] bg-[#0f2b48] px-1.5 py-0.5 rounded font-bold">
              22 Lang
            </span>
          </div>
          <div className="mt-2">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl sm:text-2xl text-[#00162d] tracking-tight">
              2.84M
            </span>
            <p className="font-['Noto_Sans'] text-xs leading-tight text-[#43474d] mt-0.5">
              Citizen Voice Requests
            </p>
          </div>
          <span className="text-[11px] font-medium text-[#74777e] mt-1.5">74% Voice/WhatsApp</span>
        </div>

        <div className="bg-[#ffffff] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between border border-[#e5eeff]">
          <div className="flex items-center justify-between text-[#a73a00]">
            <span className="material-symbols-outlined text-[20px]">hub</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#571a00] bg-[#ffdbce] px-1.5 py-0.5 rounded font-bold">
              CRITICAL
            </span>
          </div>
          <div className="mt-2">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl sm:text-2xl text-[#00162d] tracking-tight">
              1,420
            </span>
            <p className="font-['Noto_Sans'] text-xs leading-tight text-[#43474d] mt-0.5">
              Hotspots Identified
            </p>
          </div>
          <span className="text-[11px] font-medium text-[#005227] mt-1.5 font-bold">89% Verified Ground</span>
        </div>

        <div className="bg-[#ffffff] rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between border border-[#e5eeff]">
          <div className="flex items-center justify-between text-[#a73a00]">
            <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded font-bold">
              GAP
            </span>
          </div>
          <div className="mt-2">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl sm:text-2xl text-[#00162d] tracking-tight">
              ₹18.4k
            </span>
            <p className="font-['Noto_Sans'] text-xs leading-tight text-[#43474d] mt-0.5">
              Cr Unaddressed
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#ba1a1a] mt-1.5">Priority Deficit</span>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column: Interactive GIS Map */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#0f2b48] rounded-2xl overflow-hidden shadow-lg relative flex flex-col border border-[#2f4867]/50">
            {/* Map Layer Controls */}
            <div className="p-3 bg-[#00162d]/85 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 z-20 border-b border-white/10">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setNitiActive(!nitiActive)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    nitiActive
                      ? 'bg-[#fd651e] text-white shadow-xs'
                      : 'bg-[#dce9ff]/20 text-[#afc8ed] hover:bg-[#dce9ff]/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">military_tech</span>
                  <span>NITI Aspirational</span>
                </button>
                <button
                  onClick={() => setPmgsyActive(!pmgsyActive)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    pmgsyActive
                      ? 'bg-[#fd651e] text-white shadow-xs'
                      : 'bg-[#dce9ff]/20 text-[#afc8ed] hover:bg-[#dce9ff]/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">alt_route</span>
                  <span>PMGSY Gap</span>
                </button>
              </div>

              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[#afc8ed] text-[14px]">layers</span>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="bg-transparent text-[#afc8ed] text-[11px] focus:outline-none cursor-pointer"
                >
                  <option className="text-black bg-white">All Sectors</option>
                  <option className="text-black bg-white">Rural Roads & Bridges</option>
                  <option className="text-black bg-white">Water Drainage & Canals</option>
                  <option className="text-black bg-white">Healthcare Centres</option>
                  <option className="text-black bg-white">Power Feeder Line</option>
                </select>
              </div>
            </div>

            {/* Simulated GIS Canvas */}
            <div
              className="relative w-full h-[360px] sm:h-[420px] bg-[#071728] overflow-hidden select-none"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s' }}
            >
              {/* SVG India Geometrical Silhouette & Corridor Vectors */}
              <svg
                className="absolute inset-0 w-full h-full opacity-45"
                fill="none"
                viewBox="0 0 400 340"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Lat/Long Grid */}
                <line stroke="#2F4867" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="400" y1="85" y2="85" />
                <line stroke="#2F4867" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="400" y1="170" y2="170" />
                <line stroke="#2F4867" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="400" y1="255" y2="255" />
                <line stroke="#2F4867" strokeDasharray="4 4" strokeWidth="0.5" x1="100" x2="100" y1="0" y2="340" />
                <line stroke="#2F4867" strokeDasharray="4 4" strokeWidth="0.5" x1="200" x2="200" y1="0" y2="340" />
                <line stroke="#2F4867" strokeDasharray="4 4" strokeWidth="0.5" x1="300" x2="300" y1="0" y2="340" />

                {/* Regional Terrain Polygons */}
                <path
                  d="M120 40 L160 55 L210 50 L270 95 L250 145 L275 190 L240 240 L195 320 L160 250 L110 200 L95 140 L130 90 Z"
                  fill="#0C2540"
                  stroke="#204A75"
                  strokeWidth="1.2"
                />
                <path d="M165 110 L230 135 L260 180 L220 220 L170 170 Z" fill="#133659" opacity="0.6" />
                <path
                  d="M135 145 Q 185 130 225 155 T 260 240"
                  stroke="#EA580C"
                  strokeDasharray="6 3"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />
                <path
                  d="M110 190 Q 155 210 190 270"
                  stroke="#38BDF8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                />
              </svg>

              {/* Hotspot A: Varanasi Corridor (Active default) */}
              <div
                className={`absolute top-[138px] left-[215px] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-transform ${
                  selectedHotspotKey === 'varanasi' ? 'scale-110' : 'hover:scale-105 opacity-85'
                }`}
                onClick={() => handleSelectHotspot('varanasi')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-11 w-11 rounded-full bg-[#fd651e] opacity-60"></span>
                  <span className="absolute inline-flex h-7 w-7 rounded-full bg-[#a73a00] opacity-40"></span>
                  <div className="w-5 h-5 rounded-full bg-[#fd651e] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="material-symbols-outlined text-[13px] font-bold">priority_high</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#00162d]/90 backdrop-blur-sm rounded text-white font-['JetBrains_Mono'] text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 border border-[#fd651e]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fd651e]"></span>
                  <span>Varanasi Cor. (92)</span>
                </div>
              </div>

              {/* Hotspot B: North Chennai Suburban Belt */}
              <div
                className={`absolute top-[265px] left-[188px] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-transform ${
                  selectedHotspotKey === 'chennai' ? 'scale-110' : 'hover:scale-105 opacity-85'
                }`}
                onClick={() => handleSelectHotspot('chennai')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-sky-400 opacity-40"></span>
                  <div className="w-4 h-4 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-md border border-white/60">
                    <span className="material-symbols-outlined text-[10px]">water_drop</span>
                  </div>
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#00162d]/80 backdrop-blur-sm rounded text-white font-['JetBrains_Mono'] text-[9px] whitespace-nowrap">
                  North Chennai (78)
                </div>
              </div>

              {/* Hotspot C: Barwani Tribal Belt MP */}
              <div
                className={`absolute top-[175px] left-[135px] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-transform ${
                  selectedHotspotKey === 'barwani' ? 'scale-110' : 'hover:scale-105 opacity-85'
                }`}
                onClick={() => handleSelectHotspot('barwani')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-amber-400 opacity-40"></span>
                  <div className="w-4 h-4 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-md border border-white/60">
                    <span className="material-symbols-outlined text-[10px]">local_hospital</span>
                  </div>
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#00162d]/80 backdrop-blur-sm rounded text-white font-['JetBrains_Mono'] text-[9px] whitespace-nowrap">
                  Barwani (84)
                </div>
              </div>

              {/* GIS Zoom Controls & Compass */}
              <div className="absolute top-3 right-3 flex flex-col items-center gap-1 z-10 bg-[#00162d]/70 p-1.5 rounded-lg backdrop-blur-xs border border-white/10">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.45))}
                  className="w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
                  title="Zoom in"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
                  className="w-7 h-7 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer"
                  title="Zoom out"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <div className="mt-1 flex flex-col items-center">
                  <span className="font-['JetBrains_Mono'] text-[8px] text-white font-bold">N</span>
                  <span className="material-symbols-outlined text-[14px] text-[#a73a00]">navigation</span>
                </div>
              </div>

              {/* Bottom Legend Floating Bar */}
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-[#00162d]/85 backdrop-blur-md flex items-center justify-between z-10 text-[11px] text-[#afc8ed] font-['Noto_Sans'] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fd651e]"></span>
                    <span>Roads Deficit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                    <span>Water/Canal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"></span>
                    <span>Health Link</span>
                  </div>
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bda93] font-semibold">
                  GIS 1:50,000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hotspot Inspector Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-[#ffffff] rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-3.5 border border-[#e5eeff]">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 pb-1 border-b border-[#e5eeff]/60">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
                    {activeHotspot.badge}
                  </span>
                  <span className="text-[#43474d] font-['JetBrains_Mono'] text-[11px]">
                    {activeHotspot.code}
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl font-bold text-[#00162d] mt-1 tracking-tight">
                  {activeHotspot.title}
                </h2>
                <p className="font-['Noto_Sans'] text-xs text-[#43474d]">
                  {activeHotspot.sector}
                </p>
              </div>

              {/* Severity Gauge Meter */}
              <div className="flex flex-col items-end flex-shrink-0">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e5eeff]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-[#fd651e]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={activeHotspot.dashArray}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#a73a00] leading-none">
                      {activeHotspot.severity}
                    </span>
                    <span className="text-[9px] text-[#43474d]">/ 100</span>
                  </div>
                </div>
                <span className="text-[10px] font-['JetBrains_Mono'] uppercase text-[#ba1a1a] font-bold mt-0.5">
                  High Severity
                </span>
              </div>
            </div>

            {/* Real-Time Voice Synthesis & Audio Evidence */}
            <div className="bg-[#eff4ff] rounded-xl p-3 sm:p-3.5 flex flex-col gap-2 border border-[#dce9ff]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#a73a00]">
                    graphic_eq
                  </span>
                  <span className="font-['Noto_Sans'] text-xs font-bold text-[#0b1c30]">
                    Citizen Audio & Text Corpus
                  </span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#00162d]">
                  {activeHotspot.notes}
                </span>
              </div>

              {/* Playable Sample */}
              <div className="p-2.5 rounded-lg bg-[#ffffff] flex items-center justify-between gap-2.5 shadow-xs border border-[#e5eeff]">
                <button
                  onClick={toggleAudio}
                  className="w-8 h-8 rounded-full bg-[#fd651e] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#a73a00] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isPlayingAudio ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#43474d]">
                    <span className="truncate">{activeHotspot.audioDialect}</span>
                    <span>{activeHotspot.audioDuration}</span>
                  </div>
                  {/* Waveform graphic */}
                  <div className="flex items-center gap-0.5 h-4 mt-1">
                    {[2, 3.5, 2, 4, 3, 1.5, 3.5, 4, 2.5, 3, 2, 3, 1, 2.5, 1.5, 2].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full transition-all duration-200 ${
                          isPlayingAudio
                            ? 'bg-[#a73a00] animate-pulse'
                            : i < 7
                            ? 'bg-[#a73a00]'
                            : i < 10
                            ? 'bg-[#fd651e]'
                            : 'bg-[#c4c6ce]'
                        }`}
                        style={{ height: `${h * 4}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[11px] font-medium text-[#43474d]">Synthesized Keywords:</span>
                {activeHotspot.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#00162d] font-['Noto_Sans'] text-[11px] font-semibold"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Demographic Exposure & Sanction Pipeline Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between border border-[#dce9ff]/60">
                <div className="flex items-center gap-1 text-[#43474d]">
                  <span className="material-symbols-outlined text-[16px] text-[#00162d]">groups</span>
                  <span className="font-['Noto_Sans'] text-[11px] font-semibold">Demographic Impact</span>
                </div>
                <div className="mt-2">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#00162d]">
                    {activeHotspot.pop}
                  </span>
                  <p className="font-['Noto_Sans'] text-[11px] text-[#43474d]">Residents affected</p>
                </div>
                <div className="mt-2 flex flex-col gap-0.5 text-[10px] font-['JetBrains_Mono'] text-[#43474d]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#005227]">school</span> 38 Primary Schools
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#a73a00]">cabin</span> 4 Tribal Habitations
                  </span>
                </div>
              </div>

              <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col justify-between border border-[#dce9ff]/60">
                <div className="flex items-center gap-1 text-[#43474d]">
                  <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">
                    account_balance
                  </span>
                  <span className="font-['Noto_Sans'] text-[11px] font-semibold">Sanction Pipeline</span>
                </div>
                <div className="mt-2">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#ba1a1a]">
                    {activeHotspot.gap}
                  </span>
                  <p className="font-['Noto_Sans'] text-[11px] text-[#43474d]">Estimated Deficit</p>
                </div>
                <div className="mt-2 flex flex-col gap-0.5 text-[10px] font-['JetBrains_Mono'] text-[#43474d]">
                  <span>2023-24 Budget: ₹1.2 Cr</span>
                  <span className="text-[#ba1a1a] font-bold">Underfunded by 91%</span>
                </div>
              </div>
            </div>

            {/* Geo-Spatial Satellite Thumbnail with AI Detection Mask */}
            <div className="flex items-center gap-3 bg-[#eff4ff] rounded-xl p-2.5 sm:p-3 border border-[#dce9ff]/60">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#0f2b48]">
                <img
                  src={activeHotspot.image}
                  alt="Satellite GIS View"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#a73a00]/20 flex items-center justify-center">
                  <span className="px-1 py-0.5 rounded bg-[#00162d]/85 text-white font-['JetBrains_Mono'] text-[8px] font-bold">
                    SENTINEL-2
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#a73a00]">
                  <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
                  <span>NISAR & ISRO Ground Validation</span>
                </div>
                <p className="font-['Noto_Sans'] text-[11px] leading-snug text-[#43474d] mt-0.5 line-clamp-2">
                  Physical blockage detected at Chandauli feeder junction; bridge span unserviceable during monsoon surges.
                </p>
              </div>
            </div>

            {/* Sovereign CTA Action Button */}
            <button
              onClick={() => onNavigateToPrioritizer(activeHotspot.id)}
              className="w-full h-12 bg-[#fd651e] hover:bg-[#a73a00] text-white rounded-xl font-['Noto_Sans'] text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all font-bold cursor-pointer active:scale-[0.99]"
            >
              <span>Examine in AI Prioritizer</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
