import React, { useState } from 'react';
import { PIPELINE_DATA } from '../data/mockData';

interface PublicImpactTabProps {
  onOpenAuditLedger: () => void;
  onOpenApiKey: () => void;
  showToast: (msg: string) => void;
}

export const PublicImpactTab: React.FC<PublicImpactTabProps> = ({
  onOpenAuditLedger,
  onOpenApiKey,
  showToast,
}) => {
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [isExportingJson, setIsExportingJson] = useState(false);

  const handleDownloadCsv = () => {
    setIsExportingCsv(true);
    setTimeout(() => {
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        encodeURIComponent(
          [
            'Project_ID,State,District,Sector,Citizen_Audio_Count,Confidence,Fiscal_Outlay_Cr,Status',
            'BHR-2024-9842,Uttar Pradesh,Varanasi,Rural Roads,4820,96.4%,24.8,Sanctioned',
            'BHR-2024-7021,Madhya Pradesh,Barwani,Drinking Water,2190,94.1%,16.2,Awaiting Sign-off',
            'BHR-2024-2180,Tamil Nadu,Tiruvallur,Disaster Drainage,3190,91.8%,38.5,Pre-feasibility Validated',
            'BHR-2023-8812,Bihar,Gopalganj,Primary Health,2340,98.1%,8.4,Completed & Handed Over',
            'BHR-2023-5630,Karnataka,Kolar,Solar RO Water,18400,95.0%,12.1,Completed & Audited',
          ].join('\n')
        );

      const link = document.createElement('a');
      link.setAttribute('href', csvContent);
      link.setAttribute('download', 'NDAP_D_Infra_Bharat_Public_Ledger_2025.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExportingCsv(false);
      showToast('NDAP Compliant CSV Export downloaded successfully.');
    }, 900);
  };

  const handleDownloadJson = () => {
    setIsExportingJson(true);
    setTimeout(() => {
      const jsonContent =
        'data:application/json;charset=utf-8,' +
        encodeURIComponent(
          JSON.stringify(
            {
              $schema: 'https://ndap.niti.gov.in/schema/dpi-infra/v3',
              governingAgency: 'Ministry of Electronics and Information Technology (MeitY)',
              dataPlatform: 'D Infra.Bharat Open DPG Node',
              cagAuditRecord: '2024-INFR-99',
              totalCapexPipelineCr: 14200,
              conversionRate: '69.4%',
              auditedRecordsCount: 2841,
              sampleRecord: {
                clusterId: 'BHR-2024-9842',
                sector: 'Rural Road & Storm Drainage',
                demographicImpact: 142000,
                sentimentPositive: '94%',
              },
            },
            null,
            2
          )
        );

      const link = document.createElement('a');
      link.setAttribute('href', jsonContent);
      link.setAttribute('download', 'NDAP_Schema_D_Infra_Bharat.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExportingJson(false);
      showToast('NDAP JSON Schema downloaded successfully.');
    }, 900);
  };

  const handleScanQr = () => {
    showToast('Gram Sabha Audit Token Verified: Gopalganj PHC Sub-centre Nonce #99812-PASS');
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section 1: Transparency Header */}
      <div className="pt-2 sm:pt-4 pb-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#005227] font-['JetBrains_Mono'] text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            CAG AUDIT RECORD #2024-INFR-99
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdbce] text-[#a73a00] font-['Noto_Sans'] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a73a00] animate-pulse"></span>
            Live Sync
          </span>
        </div>

        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl md:text-3xl text-[#00162d] tracking-tight mt-1">
          Public Fund Allocation & DPI Verification
        </h1>
        <p className="font-['Noto_Sans'] text-xs sm:text-sm text-[#43474d] leading-relaxed max-w-2xl">
          Real-time open accounting of citizen voice converted into physical public infrastructure.
        </p>
      </div>

      {/* Main 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column (Capital Deployment & Verified Milestones) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Capital Deployment Overview */}
          <div className="bg-[#ffffff] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-4 border border-[#e5eeff]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#00162d]">
                  Capital Deployment Pipeline
                </span>
                <span className="font-['Noto_Sans'] text-xs text-[#43474d]">
                  FY 2024-25 • Union & State Joint Outlay
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#00162d] font-['JetBrains_Mono'] text-[11px] font-bold">
                69.4% Conversion
              </span>
            </div>

            {/* Progressive Capital Pipeline Bar Representation */}
            <div className="flex flex-col gap-2.5">
              {/* Demand */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-['Noto_Sans'] text-[#43474d] flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#476080]"></span>
                    Citizen Prioritized Demand
                  </span>
                  <span className="font-['JetBrains_Mono'] font-bold text-[#00162d]">
                    ₹{PIPELINE_DATA.totalDemand.toLocaleString()} Cr
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#e5eeff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#476080] w-full"></div>
                </div>
              </div>

              {/* Capex */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-['Noto_Sans'] text-[#43474d] flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#0f2b48]"></span>
                    Approved & Sanctioned Capex
                  </span>
                  <span className="font-['JetBrains_Mono'] font-bold text-[#00162d]">
                    ₹{PIPELINE_DATA.approvedCapex.toLocaleString()} Cr
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#e5eeff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#0f2b48]" style={{ width: '69.4%' }}></div>
                </div>
              </div>

              {/* Disbursed */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-['Noto_Sans'] text-[#43474d] flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#a73a00]"></span>
                    Disbursed & Grounded Projects
                  </span>
                  <span className="font-['JetBrains_Mono'] font-bold text-[#00162d]">
                    ₹{PIPELINE_DATA.disbursed.toLocaleString()} Cr
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#e5eeff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#a73a00]" style={{ width: '45.2%' }}></div>
                </div>
              </div>

              {/* Completed */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-['Noto_Sans'] text-[#43474d] flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#44a362]"></span>
                    Completed & Public-Verified
                  </span>
                  <span className="font-['JetBrains_Mono'] font-bold text-[#00162d]">
                    ₹{PIPELINE_DATA.completed.toLocaleString()} Cr
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#e5eeff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#44a362]" style={{ width: '22.4%' }}></div>
                </div>
              </div>
            </div>

            {/* Sector Breakdown */}
            <div className="pt-1 flex flex-col gap-1.5">
              <span className="font-['Noto_Sans'] text-[11px] uppercase tracking-wider text-[#43474d] font-bold">
                Sector Deployment Allocation
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PIPELINE_DATA.sectors.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between p-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff]/60"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 mb-1">
                      <span className="material-symbols-outlined text-[16px]" style={{ color: s.color }}>
                        {s.icon}
                      </span>
                      <span className="font-['Noto_Sans'] text-xs text-[#00162d] truncate">
                        {s.name}
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00162d]">
                      {s.share}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Completed Infrastructure Showcase with Before vs After */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#00162d]">
                  Verified Milestones
                </h2>
                <p className="font-['Noto_Sans'] text-xs text-[#43474d]">
                  Social audit proof & vernacular feedback
                </p>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#a73a00] font-bold">
                2,841 Audited
              </span>
            </div>

            {/* Project Card 1: Bihar Health Sub-Centre */}
            <div className="bg-[#ffffff] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-3 border border-[#e5eeff]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#2f4867] font-['JetBrains_Mono'] text-[10px] font-bold">
                      BIHAR • GOPALGANJ
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#005227] font-['JetBrains_Mono'] text-[10px] font-bold">
                      18 SEPT 2024
                    </span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#00162d] mt-1 leading-snug">
                    Flood-Resilient Primary Health Sub-Centre
                  </h3>
                  <span className="font-['Noto_Sans'] text-xs text-[#43474d]">
                    Initiated via Citizen Voice Cluster{' '}
                    <span className="font-['JetBrains_Mono'] font-bold text-[#00162d]">#8812</span> (Bhojpuri audio grievances)
                  </span>
                </div>
              </div>

              {/* Before / After Visual Comparison Split Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {/* Before Card */}
                <div className="flex flex-col gap-1">
                  <div className="relative rounded-lg overflow-hidden h-28 sm:h-36 bg-[#e5eeff]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Submerged health centre before reconstruction"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0p-BzuWs0v3nzsVTjuKaEoQVjmpw3xQj8fYMo0jD79ifMS_9ZbX_YnC63EiyG9LqVkY60sjzVqKo33_dpIw1c3LOrQ_LnY_X16BCGQJZihzT8BMJyNBNYmu_ymSSREETV6avlMpMXx5kdpEmvTMYWKF2SfIce2murRB124saxQDifp7b2deCJ5BIOIkvy1lVhRsRMexu8lgA_Xjmghr_GxBfA6wySdLJTGG6isI8hQvdHHWm_9riy"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#ba1a1a]/90 text-white font-['JetBrains_Mono'] text-[10px] font-bold tracking-wider">
                      BEFORE (JUL 2023)
                    </span>
                  </div>
                  <span className="font-['Noto_Sans'] text-[11px] text-[#43474d] leading-tight">
                    Submerged & dysfunctional during monsoons
                  </span>
                </div>

                {/* After Card */}
                <div className="flex flex-col gap-1">
                  <div className="relative rounded-lg overflow-hidden h-28 sm:h-36 bg-[#e5eeff]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Elevated clinic on concrete stilts after reconstruction"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBetSHWG8kFUQ9qG5Mq-W0gIeTnIzf4S96yz10xNhMq6ChtBf9Sz6s44VRHXXojDI2V1705VUKTCN5X4ijPlfI7LSDmru3t6UOnmeI2dyqJBjCJmGbLGZp1kX23duvvqNZW7T3F32UxMJ5IFdywvFeWQDeNWNb7LckXsKBOyMqN3g_ejMCn79KZPit5yHiJMepkCHrDLggy5hRXI6zOY5LcKiOuHwEOi4tFGoPZd6k57t1mIPzpETAa"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#003215]/90 text-[#44a362] font-['JetBrains_Mono'] text-[10px] font-bold tracking-wider">
                      AFTER (OCT 2024)
                    </span>
                  </div>
                  <span className="font-['Noto_Sans'] text-[11px] text-[#43474d] leading-tight">
                    Stilt-elevated, 24/7 solar power with telemedicine
                  </span>
                </div>
              </div>

              {/* Citizen Sentiment Meter */}
              <div className="p-3 rounded-xl bg-[#eff4ff] flex flex-col gap-1.5 border border-[#dce9ff]/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#a73a00]">
                      record_voice_over
                    </span>
                    <span className="font-['Noto_Sans'] text-xs font-bold text-[#00162d]">
                      Post-Completion Sentiment
                    </span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#005227]">
                    94% Positive
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden">
                  <div className="h-full rounded-full bg-[#005227]" style={{ width: '94%' }}></div>
                </div>
                <p className="font-['Noto_Sans'] text-xs text-[#43474d]">
                  Surveyed <span className="font-['JetBrains_Mono'] font-bold text-[#00162d]">2,340</span> verified local residents in Bhojpuri & Hindi via automated Bhashini voice calls.
                </p>
              </div>

              {/* Signoff */}
              <div className="pt-1 flex items-center justify-between text-xs font-['Noto_Sans'] text-[#43474d]">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#005227]">verified</span>
                  <span>PWD Er. R. Shrivastava</span>
                </div>
                <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-[11px]">
                  <span className="material-symbols-outlined text-[15px] text-[#00162d]">groups</span>
                  <span>Gram Sabha Passed</span>
                </div>
              </div>
            </div>

            {/* Project Card 2: Kolar Solar Water Kiosks */}
            <div className="bg-[#ffffff] rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-3 border border-[#e5eeff]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#2f4867] font-['JetBrains_Mono'] text-[10px] font-bold">
                      KARNATAKA • KOLAR
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#005227] font-['JetBrains_Mono'] text-[10px] font-bold">
                      12 OCT 2024
                    </span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-[#00162d] mt-1 leading-snug">
                    Rural Solar Pure RO Drinking Water Kiosk Grid
                  </h3>
                  <span className="font-['Noto_Sans'] text-xs text-[#43474d]">
                    42 autonomous purification kiosks across fluorosis-affected taluks
                  </span>
                </div>
              </div>

              {/* Metric Comparison */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#eff4ff] flex flex-col gap-0.5 border border-[#dce9ff]/60">
                  <span className="font-['Noto_Sans'] text-[11px] text-[#43474d]">
                    Prior Water Quality Satisfaction
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#ba1a1a]">
                    14%
                  </span>
                  <span className="font-['Noto_Sans'] text-[10px] text-[#43474d]">
                    High fluoride groundwater
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#dce9ff] flex flex-col gap-0.5 border border-[#c4c6ce]/40">
                  <span className="font-['Noto_Sans'] text-[11px] text-[#2f4867] font-medium">
                    Post-Deployment Rating
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#005227]">
                    91%
                  </span>
                  <span className="font-['Noto_Sans'] text-[10px] text-[#005227] font-semibold">
                    18,400 daily families served
                  </span>
                </div>
              </div>

              {/* Geo-Tag Inspection Snapshot */}
              <div className="relative rounded-lg overflow-hidden h-32 sm:h-40 bg-[#e5eeff]">
                <img
                  className="w-full h-full object-cover"
                  alt="Community drinking water station in Karnataka"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKgMuPZ8JMEfDxhyPNGCznVRsK7gRRwhm-6rv8ZlGIEhuo-IITbEJQav0wQO83O0SmdegLK_8Ga_LlVkfoQEYiKyHG5Nw2WdbW1OGiJkqcxnePs3hDkJ24c712Nca1tBJFvA4YQFRCwZ5Fdynl9FA1q-zgvZUwfOxhCpEeuCytT-euPgK0tm1UeOhKdtKd79YH6LqXb32HaE54OdG912y360-405ff77htsh8bJPeDWC80ePVcK9jx"
                />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-[#213145]/85 backdrop-blur-xs text-[#eaf1ff] text-[10px] font-['JetBrains_Mono']">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#7bda93]">check_circle</span>
                    IoT Telemetry Live: 84,200 L/Day
                  </span>
                  <span>Bhuvan ID: 563-KLR</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs font-['Noto_Sans'] text-[#43474d]">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#005227]">task_alt</span>
                  <span>Panchayat Social Audit Complete</span>
                </div>
                <button
                  onClick={onOpenAuditLedger}
                  className="text-[#a73a00] font-bold text-xs flex items-center gap-0.5 hover:underline cursor-pointer"
                >
                  Audit Ledger
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Trust Badges & Open Data DPG Access) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Trust Badges Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
            <div
              onClick={() => showToast('Recognized on Digital Public Goods Alliance Registry')}
              className="bg-[#eff4ff] p-3 rounded-xl flex items-center gap-3 shadow-xs border border-[#dce9ff]/60 cursor-pointer hover:bg-[#e5eeff] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#005227] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-['Noto_Sans'] text-xs font-bold text-[#00162d]">
                  DPG Certified
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#43474d]">
                  Digital Public Good Standard v2.0
                </span>
              </div>
            </div>

            <div
              onClick={() => showToast('Tamper-evident ledger replicated across 8 NIC server nodes')}
              className="bg-[#eff4ff] p-3 rounded-xl flex items-center gap-3 shadow-xs border border-[#dce9ff]/60 cursor-pointer hover:bg-[#e5eeff] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#0f2b48] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-['Noto_Sans'] text-xs font-bold text-[#00162d]">
                  Tamper-Ledger
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#43474d]">
                  NIC Sovereign Node Consensual Proof
                </span>
              </div>
            </div>

            <div
              onClick={() => showToast('Geotags certified with ISRO Bhuvan satellite basemap')}
              className="bg-[#eff4ff] p-3 rounded-xl flex items-center gap-3 shadow-xs border border-[#dce9ff]/60 cursor-pointer hover:bg-[#e5eeff] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#a73a00] flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">pin_drop</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-['Noto_Sans'] text-xs font-bold text-[#00162d]">
                  Geo-Tag Verified
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#43474d]">
                  ISRO Bhuvan Portal Space Validation
                </span>
              </div>
            </div>
          </div>

          {/* Open Data & Digital Public Good (DPG) Access Box */}
          <div className="rounded-xl bg-[#00162d] text-white p-4 sm:p-5 shadow-md flex flex-col gap-3.5 relative overflow-hidden border border-white/10">
            {/* Decorative Sovereign Ambient SVG */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 pointer-events-none">
              <svg fill="currentColor" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="2"></circle>
                <circle cx="50" cy="50" fill="none" r="10" stroke="currentColor" strokeWidth="2"></circle>
                <path d="M 50 5 L 50 95 M 5 50 L 95 50 M 18 18 L 82 82 M 18 82 L 82 18"></path>
              </svg>
            </div>

            <div className="flex flex-col gap-1 relative z-10">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#fd651e] text-[20px]">public</span>
                <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[#ffdbce]">
                  Open Digital Public Good
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg text-white">
                Open API & Social Audit Datasets
              </h3>
              <p className="font-['Noto_Sans'] text-xs text-[#7a93b5] leading-relaxed">
                Compliant with India National Data Analytics Platform (NDAP). Unfiltered project registries for auditors, journalists, and Gram Sabhas.
              </p>
            </div>

            {/* Action Buttons for Data Download */}
            <div className="flex flex-col gap-2 relative z-10">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadCsv}
                  className="h-12 px-3 rounded-lg bg-white text-[#00162d] font-['Noto_Sans'] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#eff4ff] transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[18px] text-[#a73a00] ${isExportingCsv ? 'animate-spin' : ''}`}>
                    {isExportingCsv ? 'sync' : 'download'}
                  </span>
                  <span>{isExportingCsv ? 'Exporting...' : 'CSV Dataset'}</span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="h-12 px-3 rounded-lg bg-[#dce9ff] text-[#001c37] font-['Noto_Sans'] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#c4c6ce] transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[18px] text-[#00162d] ${isExportingJson ? 'animate-spin' : ''}`}>
                    {isExportingJson ? 'sync' : 'data_object'}
                  </span>
                  <span>{isExportingJson ? 'Generating...' : 'JSON Schema'}</span>
                </button>
              </div>

              <button
                onClick={onOpenApiKey}
                className="h-12 w-full px-4 rounded-lg bg-[#a73a00] text-white font-['Noto_Sans'] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#571a00] transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                <span>Access Sovereign REST API Key</span>
              </button>
            </div>

            {/* Verifiable Gram Sabha Social Audit Card */}
            <div
              onClick={handleScanQr}
              className="rounded-lg bg-white p-3 text-[#0b1c30] flex items-center justify-between gap-3 relative z-10 cursor-pointer hover:bg-[#eff4ff] transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <span className="font-['Noto_Sans'] text-xs font-bold text-[#00162d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#005227]">
                    qr_code_scanner
                  </span>
                  Gram Sabha Social Audit QR
                </span>
                <span className="font-['Noto_Sans'] text-[11px] text-[#43474d] mt-0.5">
                  Instant on-site verification token. Tap to scan with Umang or Aadhaar FaceRD app.
                </span>
              </div>

              <div className="w-14 h-14 bg-white p-1 rounded-sm flex-shrink-0 flex items-center justify-center border border-[#e5eeff]">
                <svg className="w-full h-full text-[#00162d]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 2h8v8H2zm2 2v4h4V4zm-2 8h8v8H2zm2 2v4h4v-4zm8-12h8v8h-8zm2 2v4h4V4zm1 8h2v2h-2zm-3 2h2v2h-2zm4 0h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm-2 2h2v2h-2zm4 0h2v2h-2zm-4-6h2v2h-2zm4 0h2v2h-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
