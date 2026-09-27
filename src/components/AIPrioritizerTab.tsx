import React, { useState } from 'react';
import { PROPOSALS } from '../data/mockData';

interface AIPrioritizerTabProps {
  onOpenSynthesisModal: () => void;
  onOpenCabinetModal: () => void;
  showToast: (msg: string) => void;
}

export const AIPrioritizerTab: React.FC<AIPrioritizerTabProps> = ({
  onOpenSynthesisModal,
  onOpenCabinetModal,
  showToast,
}) => {
  const [filterMode, setFilterMode] = useState<'roi' | 'urgency' | 'aspirational' | 'under50' | 'dpr'>('roi');
  const [sanctionedIds, setSanctionedIds] = useState<Record<string, boolean>>({});
  const [nudgedIds, setNudgedIds] = useState<Record<string, boolean>>({});
  const [isSimDrawerOpen, setIsSimDrawerOpen] = useState(false);
  const [budgetAllocation, setBudgetAllocation] = useState(80);

  const handleSanction = (id: string, title: string) => {
    setSanctionedIds((prev) => ({ ...prev, [id]: true }));
    showToast(`Sanction Approved via e-Office API for: ${title}`);
  };

  const handleNudge = (id: string) => {
    setNudgedIds((prev) => ({ ...prev, [id]: true }));
    showToast('DC Office alerted via e-Governance SMS & WhatsApp dispatch');
  };

  const p1Cost = PROPOSALS[0].estCost;
  const p2Cost = PROPOSALS[1].estCost;
  const p3Cost = PROPOSALS[2].estCost;
  const totalCostAll3 = p1Cost + p2Cost + p3Cost; // 79.5 Cr

  return (
    <div className="flex flex-col w-full pb-28 animate-fade-in relative max-w-7xl mx-auto px-4 sm:px-6">
      {/* Top Header */}
      <section className="pt-2 sm:pt-4 pb-3">
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#00162d] font-['JetBrains_Mono'] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#a73a00] animate-pulse"></span>
            <span className="font-bold">Gati Shakti Engine v4.2</span>
          </div>
          <div className="inline-flex items-center gap-1 text-[#005227] bg-[#97f7ad]/40 px-2 py-0.5 rounded-full font-['Noto_Sans'] text-xs font-bold">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span>NIC Verified Feed</span>
          </div>
        </div>

        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl md:text-3xl text-[#0b1c30] tracking-tight">
          AI Priority Matrix
        </h1>
        <p className="font-['Noto_Sans'] text-xs sm:text-sm text-[#43474d] mt-0.5 max-w-2xl">
          Multimodal voice distress signals cross-referenced with GIS spatial layers & fiscal viability index.
        </p>

        {/* Key Synthesis Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3 p-3.5 sm:p-4 rounded-xl bg-[#e5eeff] shadow-xs border border-[#dce9ff]">
          <div className="flex flex-col">
            <span className="font-['Noto_Sans'] text-xs text-[#43474d]">Active Proposals</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#00162d] font-bold">148</span>
          </div>
          <div className="flex flex-col sm:border-l sm:border-[#c4c6ce]/50 sm:pl-3">
            <span className="font-['Noto_Sans'] text-xs text-[#43474d]">Total Pipeline</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#a73a00] font-bold">₹1,420 Cr</span>
          </div>
          <div className="flex flex-col sm:border-l sm:border-[#c4c6ce]/50 sm:pl-3">
            <span className="font-['Noto_Sans'] text-xs text-[#43474d]">Avg AI Score</span>
            <div className="flex items-center gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#005227] font-bold">92.4%</span>
              <span className="material-symbols-outlined text-[#a73a00] text-[18px]">trending_up</span>
            </div>
          </div>
        </div>

        {/* Scrollable Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 select-none">
          <button
            onClick={() => setFilterMode('roi')}
            className={`flex-shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-full font-['Noto_Sans'] text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              filterMode === 'roi' ? 'bg-[#00162d] text-white' : 'bg-[#dce9ff] text-[#0b1c30] hover:bg-[#c4c6ce]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">stars</span>
            <span>Ranked by Public ROI</span>
          </button>
          <button
            onClick={() => setFilterMode('urgency')}
            className={`flex-shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-full font-['Noto_Sans'] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterMode === 'urgency' ? 'bg-[#00162d] text-white' : 'bg-[#dce9ff] text-[#0b1c30] hover:bg-[#c4c6ce]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">timer</span>
            <span>Urgency Index</span>
          </button>
          <button
            onClick={() => setFilterMode('aspirational')}
            className={`flex-shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-full font-['Noto_Sans'] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterMode === 'aspirational' ? 'bg-[#00162d] text-white' : 'bg-[#dce9ff] text-[#0b1c30] hover:bg-[#c4c6ce]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">flag</span>
            <span>Aspirational Districts</span>
          </button>
          <button
            onClick={() => setFilterMode('under50')}
            className={`flex-shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-full font-['Noto_Sans'] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterMode === 'under50' ? 'bg-[#00162d] text-white' : 'bg-[#dce9ff] text-[#0b1c30] hover:bg-[#c4c6ce]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">currency_rupee</span>
            <span>Under ₹50 Cr</span>
          </button>
          <button
            onClick={() => setFilterMode('dpr')}
            className={`flex-shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-full font-['Noto_Sans'] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              filterMode === 'dpr' ? 'bg-[#00162d] text-white' : 'bg-[#dce9ff] text-[#0b1c30] hover:bg-[#c4c6ce]/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">task_alt</span>
            <span>Ready for DPR</span>
          </button>
        </div>
      </section>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Proposals Stream */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          {/* CARD #1 (Bridge & Road) */}
          <article className="bg-[#ffffff] rounded-xl shadow-md p-4 sm:p-5 relative overflow-hidden flex flex-col gap-3.5 border border-[#e5eeff]">
            <div className="h-1.5 w-full bg-[#fd651e] absolute top-0 left-0"></div>

            {/* Rank & AI Score */}
            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#a73a00]/10 text-[#a73a00] font-['Noto_Sans'] text-xs font-bold">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>#1 National Priority</span>
              </div>
              <div className="flex items-center gap-1 text-[#005227] bg-[#97f7ad]/35 px-2 py-0.5 rounded-full font-['JetBrains_Mono'] text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                <span>AI 96.4%</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#0b1c30] tracking-tight">
                Sevapuri-Chandauli High-Level Bridge & Approach Road
              </h2>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1 text-[#43474d] text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#a73a00]">add_road</span>
                  Road & Rural Connectivity
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  Varanasi, Uttar Pradesh
                </span>
              </div>
            </div>

            {/* Visual Geospatial Anchor */}
            <div className="relative w-full h-36 sm:h-48 rounded-lg overflow-hidden bg-[#e5eeff] shadow-inner">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEjYMIDIorh4ivGlTsikjfiXfFMVjzknwt4Q3I1-_7wyVka3CwiGgjLEFi3VD4K27pEIUQZ1Oh2JIZWjIWETbPZ2jFBLicojkhk6wDLkKGhE5I7h2mfzUwVNmgI6f74ulTOiw0QvcecPtL9gmTlkUhOj_QKNXBSF7MF2Bj72oyCNN84de5s_7NSPUZ3dHOFhKTtZol6Eqcw16hoK738fg2XuH2itdtNTPRYFA3huELcYCmJG-GJee"
                alt="Varuna River Corridor GIS View"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00162d]/85 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffdbce]">layers</span>
                  NIC GIS Layer: Varuna River Corridor P-42
                </span>
              </div>
            </div>

            {/* AI Rationale & Explainability Box */}
            <div className="bg-[#eff4ff] rounded-lg p-3 sm:p-4 flex flex-col gap-2 border border-[#dce9ff]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#00162d] text-xs font-bold">
                  <span className="material-symbols-outlined text-[18px] text-[#a73a00]">auto_awesome</span>
                  <span>Multimodal Policy Synthesis Rationale</span>
                </div>
                <span className="text-[#43474d] font-['JetBrains_Mono'] text-[11px]">Bhashini Corpus v3</span>
              </div>
              <ul className="flex flex-col gap-1.5 text-[#0b1c30] text-xs font-['Noto_Sans']">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#a73a00] text-[18px] flex-shrink-0 mt-0.5">
                    record_voice_over
                  </span>
                  <span>
                    <strong>4,820 citizen voice grievances</strong> synthesized from 18 Gram Panchayats over 90 days.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#005227] text-[18px] flex-shrink-0 mt-0.5">
                    emergency
                  </span>
                  <span>
                    Guarantees <strong>year-round healthcare transit for 142,000 villagers</strong> marooned in peak monsoons.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#00162d] text-[18px] flex-shrink-0 mt-0.5">
                    account_tree
                  </span>
                  <span>
                    Directly accelerates <strong>PM Gram Sadak Yojana (PMGSY) Phase IV</strong> economic feeder network.
                  </span>
                </li>
              </ul>
            </div>

            {/* Financial Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 bg-[#e5eeff] p-3 sm:p-3.5 rounded-lg border border-[#dce9ff]">
              <div className="flex flex-col">
                <span className="text-xs text-[#43474d]">Est. Fiscal Outlay</span>
                <span className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl font-bold text-[#0b1c30]">₹24.8 Cr</span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#43474d]">MoRTH Schedule of Rates 24-25</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#43474d]">5-Yr Projected ROI</span>
                <div className="flex items-center gap-1">
                  <span className="font-['Plus_Jakarta_Sans'] text-lg sm:text-xl font-bold text-[#005227]">3.4x</span>
                  <span className="text-xs text-[#005227] font-semibold">Social ROI</span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#43474d]">₹84.3 Cr Net Economic Value</span>
              </div>
            </div>

            {/* Readiness & Timeline */}
            <div className="flex items-center justify-between text-xs px-1">
              <span className="flex items-center gap-1 text-[#43474d]">
                <span className="material-symbols-outlined text-[16px] text-[#7bda93]">verified</span>
                Automated DPR Draft Generated
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#a73a00]">
                Ready for Tender: 45 Days
              </span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => handleSanction('prop-1', 'Sevapuri-Chandauli High-Level Bridge')}
                className={`w-full min-h-[48px] px-4 rounded-lg font-['Noto_Sans'] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  sanctionedIds['prop-1']
                    ? 'bg-[#0f2b48] text-[#97f7ad]'
                    : 'bg-[#a73a00] hover:bg-[#571a00] text-white active:scale-[0.99]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {sanctionedIds['prop-1'] ? 'check_circle' : 'assignment_turned_in'}
                </span>
                <span>
                  {sanctionedIds['prop-1']
                    ? 'Sanction Approved · DPR Transmitted'
                    : 'Sanction Budget & Issue DPR'}
                </span>
              </button>
              <button
                onClick={onOpenSynthesisModal}
                className="w-full min-h-[44px] px-4 rounded-lg bg-[#dce9ff] text-[#00162d] font-['Noto_Sans'] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#c4c6ce]/60 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">query_stats</span>
                <span>View Detailed Synthesis Data & Audio Clips</span>
              </button>
            </div>
          </article>

          {/* CARD #2 (Barwani Solar Grid) */}
          <article className="bg-[#ffffff] rounded-xl shadow-md p-4 sm:p-5 relative overflow-hidden flex flex-col gap-3.5 border border-[#e5eeff]">
            <div className="h-1.5 w-full bg-[#0f2b48] absolute top-0 left-0"></div>

            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0f2b48]/10 text-[#0f2b48] font-['Noto_Sans'] text-xs font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>#2 National Priority</span>
              </div>
              <div className="flex items-center gap-1 text-[#005227] bg-[#97f7ad]/35 px-2 py-0.5 rounded-full font-['JetBrains_Mono'] text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                <span>AI 94.1%</span>
              </div>
            </div>

            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#0b1c30] tracking-tight">
                Barwani Integrated Borewell Recharge & Solar Water Grid
              </h2>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1 text-[#43474d] text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#00162d]">water_drop</span>
                  Jal Jeevan Mission + Solar DPI
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  Barwani Tribal Belt, MP
                </span>
              </div>
            </div>

            <div className="relative w-full h-32 sm:h-44 rounded-lg overflow-hidden bg-[#e5eeff] shadow-inner">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-YopYRY8iIMUdLwls6wPBq-wIhpon_xqxLj3zRtmtr2ViAXbIr8nw1rxkwCbx6lU8pmtUevSIkgyynhc14PoRZ_zd-jy3Frkm5GO44MApQ3RMn81RAxbbrnsLriMjAYANmJUZprFm3l-MMxNnNDAfk0YiIZmXTVw0uPTWzS83XI9wnfS0fGCvIjt2CHV8gnFS8rBuHLaS7eOcbw91b5_8k0uWw5kEUrwpaqyddncHffMEr75sS5WH"
                alt="Community solar water grid in Barwani"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#ffffff]/90 px-2 py-1 rounded font-['JetBrains_Mono'] text-[10px] text-[#0b1c30] font-semibold shadow-xs">
                Aspirational Block: Sendhwa
              </div>
            </div>

            <div className="bg-[#eff4ff] rounded-lg p-3 sm:p-3.5 flex flex-col gap-1.5 text-[#0b1c30] text-xs">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#a73a00] text-[18px] flex-shrink-0 mt-0.5">
                  water_ec
                </span>
                <span>Resolves severe seasonal fluoride salinity captured in <strong>2,190 dialect voice recordings</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#005227] text-[18px] flex-shrink-0 mt-0.5">
                  group
                </span>
                <span>Secures direct piped drinking water access for <strong>62,000 tribal residents</strong> across 42 hamlets.</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#e5eeff] rounded-lg border border-[#dce9ff]">
              <div>
                <span className="text-xs text-[#43474d] block">Est. Outlay</span>
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#0b1c30]">₹16.2 Cr</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#43474d] block">Governance Status</span>
                <span className="inline-flex items-center gap-1 text-[#a73a00] text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                  Awaiting DC Counter-Sign
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleNudge('prop-2')}
                className={`flex-1 min-h-[44px] px-3 rounded-lg font-['Noto_Sans'] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  nudgedIds['prop-2']
                    ? 'bg-[#005227] text-white'
                    : 'bg-[#00162d] text-white hover:bg-[#0f2b48]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {nudgedIds['prop-2'] ? 'done' : 'draw'}
                </span>
                <span>{nudgedIds['prop-2'] ? 'DC Office Dispatched' : 'Nudge Collector Office'}</span>
              </button>
              <button
                onClick={() => showToast('Opening GIS Map layer for Barwani Aquifer W-19')}
                aria-label="Quick GIS map preview"
                className="min-h-[44px] px-3.5 rounded-lg bg-[#dce9ff] text-[#0b1c30] text-xs font-semibold flex items-center justify-center hover:bg-[#c4c6ce]/60 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">map</span>
              </button>
            </div>
          </article>

          {/* CARD #3 (Chennai Drainage) */}
          <article className="bg-[#ffffff] rounded-xl shadow-md p-4 sm:p-5 relative overflow-hidden flex flex-col gap-3.5 border border-[#e5eeff]">
            <div className="h-1.5 w-full bg-[#476080] absolute top-0 left-0"></div>

            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#43474d] font-['Noto_Sans'] text-xs font-bold">
                <span className="material-symbols-outlined text-[18px]">thunderstorm</span>
                <span>#3 National Priority</span>
              </div>
              <div className="flex items-center gap-1 text-[#005227] bg-[#97f7ad]/35 px-2 py-0.5 rounded-full font-['JetBrains_Mono'] text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                <span>AI 91.8%</span>
              </div>
            </div>

            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#0b1c30] tracking-tight">
                Madhavaram Stormwater Micro-Drainage Channel
              </h2>
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1 text-[#43474d] text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#00162d]">flood</span>
                  Urban Disaster Resilience
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  Tiruvallur / Chennai North, TN
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-3 rounded-lg border border-[#dce9ff]/60">
              <div className="flex flex-col">
                <span className="text-xs text-[#43474d]">Est. Project Cost</span>
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#0b1c30]">₹38.5 Cr</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#43474d]">Direct Protection</span>
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00162d]">184,000 Citizens</span>
              </div>
            </div>

            <p className="font-['Noto_Sans'] text-xs text-[#43474d] leading-relaxed">
              Mitigates perennial urban waterlogging hotspots across 3 municipal zones identified through citizen flood SOS clustering and monsoon topographic modeling.
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="inline-flex items-center gap-1 font-['JetBrains_Mono'] text-[11px] text-[#43474d]">
                <span className="w-2 h-2 rounded-full bg-[#7bda93]"></span>
                Pre-feasibility Validated
              </span>
              <button
                onClick={() => showToast('Madhavaram DPR proposal queued for Chennai Municipal Corporation')}
                className="min-h-[44px] px-4 rounded-lg bg-[#dce9ff] text-[#00162d] font-['Noto_Sans'] text-xs font-bold flex items-center gap-1.5 hover:bg-[#c4c6ce]/60 transition-colors cursor-pointer"
              >
                <span>Review Proposal</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </article>
        </section>

        {/* Sidebar on Desktop (`lg:`): Sticky Executive Simulator & Sanction Command Center */}
        <aside className="hidden lg:flex lg:col-span-4 sticky top-24 flex-col gap-4">
          <div className="bg-[#ffffff] rounded-2xl shadow-md p-5 border border-[#e5eeff] flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fd651e] text-[24px]">tune</span>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Fiscal Scenario Simulator
                </h3>
                <span className="text-[11px] text-[#43474d]">Portfolio Optimization Engine</span>
              </div>
            </div>

            <p className="text-xs text-[#43474d] leading-relaxed">
              Adjust available tranche ceiling to preview AI auto-selection of optimal portfolio ROI across sanctioned clusters.
            </p>

            {/* Slider */}
            <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-2 border border-[#dce9ff]">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#0b1c30]">Budget Allocation Cap</span>
                <span className="font-bold text-[#a73a00] font-['JetBrains_Mono']">
                  ₹{budgetAllocation} Crore
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="250"
                step="5"
                value={budgetAllocation}
                onChange={(e) => setBudgetAllocation(Number(e.target.value))}
                className="w-full accent-[#fd651e] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#43474d]">
                <span>₹30 Cr</span>
                <span>₹140 Cr</span>
                <span>₹250 Cr</span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-3 rounded-lg bg-[#97f7ad]/20 text-[#005227] flex items-start gap-2 border border-[#7bda93]/40">
              <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">smart_toy</span>
              <span className="text-xs leading-relaxed">
                {budgetAllocation >= totalCostAll3 ? (
                  <>
                    <strong>Optimal Bundle:</strong> Projects #1, #2, and #3 can be fully sanctioned with ₹
                    {(budgetAllocation - totalCostAll3).toFixed(1)} Cr surplus remaining.
                  </>
                ) : budgetAllocation >= p1Cost + p2Cost ? (
                  <>
                    <strong>High ROI Bundle:</strong> Projects #1 and #2 can be sanctioned (₹
                    {(p1Cost + p2Cost).toFixed(1)} Cr), preserving local rural lifeline connectivity.
                  </>
                ) : (
                  <>
                    <strong>Priority 1 Only:</strong> Project #1 (Bridge & Road, ₹24.8 Cr) fits within this tranche.
                  </>
                )}
              </span>
            </div>

            <button
              onClick={() => {
                showToast(`Sanction Bundle Authorized for ₹${Math.min(budgetAllocation, totalCostAll3).toFixed(1)} Cr!`);
              }}
              className="w-full min-h-[46px] rounded-lg bg-[#00162d] text-white font-['Noto_Sans'] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0f2b48] shadow-md cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>
                Authorize Bundle (₹{Math.min(budgetAllocation, totalCostAll3).toFixed(1)} Cr)
              </span>
            </button>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#e5eeff]">
              <button
                onClick={onOpenCabinetModal}
                className="p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00162d] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#a73a00]">description</span>
                <span>Cabinet Note</span>
              </button>
              <button
                onClick={() => showToast('Direct Alert sent to Office of Chief Secretary (UP/MP)')}
                className="p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00162d] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#005227]">send_and_archive</span>
                <span>Notify CS</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky Policymaker Executive Action Bar (For Mobile & Tablets) */}
      <section className="lg:hidden sticky bottom-16 z-30 px-4 pb-2 pt-2 bg-gradient-to-t from-[#f8f9ff] via-[#f8f9ff]/95 to-transparent">
        <div className="bg-[#00162d] text-white rounded-xl p-3 shadow-xl flex flex-col gap-2.5 border border-white/10 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#fd651e] text-[22px]">policy</span>
              <div>
                <span className="font-['Noto_Sans'] text-xs font-bold block leading-tight text-white">
                  Executive Sanction Panel
                </span>
                <span className="font-['Noto_Sans'] text-[11px] text-[#afc8ed]">
                  1-Click Inter-Ministerial Clearance
                </span>
              </div>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] bg-[#0f2b48] px-2 py-0.5 rounded text-[#d3e4fe] font-bold">
              FY 2025-Q1
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onOpenCabinetModal}
              className="min-h-[44px] p-2 rounded-lg bg-[#0f2b48] hover:bg-[#2f4867] transition-colors flex flex-col items-center justify-center text-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ffdbce]">description</span>
              <span className="font-['Noto_Sans'] text-[11px] text-white font-medium leading-none">Cabinet Note</span>
            </button>
            <button
              onClick={() => showToast('Direct Alert sent to Office of Chief Secretary (UP/MP)')}
              className="min-h-[44px] p-2 rounded-lg bg-[#0f2b48] hover:bg-[#2f4867] transition-colors flex flex-col items-center justify-center text-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#97f7ad]">send_and_archive</span>
              <span className="font-['Noto_Sans'] text-[11px] text-white font-medium leading-none">Notify CS</span>
            </button>
            <button
              onClick={() => setIsSimDrawerOpen(true)}
              className="min-h-[44px] p-2 rounded-lg bg-[#fd651e] hover:bg-[#a73a00] transition-colors flex flex-col items-center justify-center text-center gap-1 text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-white">tune</span>
              <span className="font-['Noto_Sans'] text-[11px] text-white font-bold leading-none">Simulate</span>
            </button>
          </div>
        </div>
      </section>

      {/* Fiscal Scenario Simulator Drawer (Slide-Up on Mobile) */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-16 z-40 bg-[#ffffff] shadow-2xl rounded-t-2xl p-4 transition-transform duration-300 transform border-t border-[#c4c6ce]/50 flex flex-col gap-3 max-w-md mx-auto ${
          isSimDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-12 h-1.5 bg-[#c4c6ce] rounded-full mx-auto mb-1"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a73a00]">tune</span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
              Fiscal Scenario Simulator
            </h3>
          </div>
          <button
            onClick={() => setIsSimDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#43474d] hover:bg-[#dce9ff]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="font-['Noto_Sans'] text-xs text-[#43474d]">
          Adjust available tranche ceiling to preview AI auto-selection of optimal portfolio ROI.
        </p>

        {/* Range Slider */}
        <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-2 border border-[#dce9ff]">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#0b1c30]">Budget Cap Allocation</span>
            <span className="font-bold text-[#a73a00] font-['JetBrains_Mono']">
              ₹{budgetAllocation} Crore
            </span>
          </div>
          <input
            type="range"
            min="30"
            max="250"
            step="5"
            value={budgetAllocation}
            onChange={(e) => setBudgetAllocation(Number(e.target.value))}
            className="w-full accent-[#fd651e] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#43474d]">
            <span>₹30 Cr</span>
            <span>₹140 Cr</span>
            <span>₹250 Cr</span>
          </div>
        </div>

        {/* Optimal Bundle recommendation */}
        <div className="p-2.5 rounded-lg bg-[#97f7ad]/20 text-[#005227] flex items-center gap-2 border border-[#7bda93]/40">
          <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          <span className="text-xs leading-relaxed">
            {budgetAllocation >= totalCostAll3 ? (
              <>
                <strong>Optimal Bundle:</strong> Projects #1, #2, and #3 can be fully sanctioned with ₹
                {(budgetAllocation - totalCostAll3).toFixed(1)} Cr surplus remaining.
              </>
            ) : budgetAllocation >= p1Cost + p2Cost ? (
              <>
                <strong>High ROI Bundle:</strong> Projects #1 and #2 can be sanctioned (₹
                {(p1Cost + p2Cost).toFixed(1)} Cr), preserving local rural lifeline connectivity.
              </>
            ) : (
              <>
                <strong>Priority 1 Only:</strong> Project #1 (Bridge & Road, ₹24.8 Cr) fits within this tranche.
              </>
            )}
          </span>
        </div>

        <button
          onClick={() => {
            setIsSimDrawerOpen(false);
            showToast(`Sanction Bundle Authorized for ₹${Math.min(budgetAllocation, totalCostAll3).toFixed(1)} Cr!`);
          }}
          className="w-full min-h-[48px] rounded-lg bg-[#00162d] text-white font-['Noto_Sans'] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0f2b48] shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>
            Authorize Sanction Bundle (₹{Math.min(budgetAllocation, totalCostAll3).toFixed(1)} Cr)
          </span>
        </button>
      </div>
    </div>
  );
};
