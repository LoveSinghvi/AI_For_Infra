import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenLanguageModal: () => void;
  selectedLanguage: string;
  deviceMode: 'responsive' | 'mobile';
  onToggleDeviceMode: () => void;
  showToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenLanguageModal,
  selectedLanguage,
  deviceMode,
  onToggleDeviceMode,
  showToast,
}) => {
  const desktopTabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'citizen-voice', label: 'Citizen Voice', icon: 'mic' },
    { id: 'demand-heatmap', label: 'Heatmap', icon: 'radar' },
    { id: 'ai-prioritizer', label: 'AI Prioritizer', icon: 'auto_awesome' },
    { id: 'public-impact', label: 'Public Impact', icon: 'verified' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 pt-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]">
      {/* Indian National Tricolor Ribbon */}
      <div className="w-full h-1 flex">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-[#FFFFFF]"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>

      <div className="h-16 md:h-20 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <img
            alt="D Infra.Bharat Emblem"
            className="h-8 md:h-9 w-auto object-contain flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UO0SHFCYW92-GSG8I0Mw5R1072sx1Pc761ijmxaR2JbCE2n7z6QPUs12Pb6fGgcaX1kj1jxAyYp0-sfvrfcV0pFMQB34zXmF08c0AdO0g1vVrScSbqeoJZ3WR8pqvXkRx7E1nZ5HKelDsccX3DTtyI157ExOZisdbEKbQMvCuUpHYXpKOKnX8H9iEGW8v76tAaQJeKKLCHQPqDYWhRZGafUT4B2t4RdsgV2zCvhLY1ccQCwG2syarKwAQ"
            loading="eager"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#00162d] tracking-tight truncate">
                D Infra.Bharat
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#dce9ff] text-[#005227] font-['JetBrains_Mono'] text-[10px] uppercase font-bold tracking-wider">
                DPI Initiative
              </span>
              <span className="hidden sm:inline text-[11px] font-medium text-[#43474d] truncate">
                GovTech Multimodal AI
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links (Visible on Tablets and Laptops) */}
        {deviceMode === 'responsive' && (
          <nav className="hidden md:flex items-center gap-1 bg-[#eff4ff] p-1 rounded-full border border-[#dce9ff]">
            {desktopTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00162d] text-white shadow-xs'
                      : 'text-[#43474d] hover:text-[#00162d] hover:bg-[#dce9ff]/50'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Device View Mode Toggle Button */}
          <button
            onClick={onToggleDeviceMode}
            title={
              deviceMode === 'responsive'
                ? 'Switch to Mobile Frame Mode (390px phone view)'
                : 'Switch to Fluid Responsive Mode (Desktop/Tablet optimized)'
            }
            aria-label="Toggle device frame preview"
            className="hidden sm:inline-flex min-h-[38px] px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#dce9ff] transition-all items-center gap-1.5 text-[#00162d] text-xs font-semibold cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px] text-[#a73a00]">
              {deviceMode === 'responsive' ? 'smartphone' : 'devices'}
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px]">
              {deviceMode === 'responsive' ? 'Phone Mode' : 'Fluid View'}
            </span>
          </button>

          {/* Language Switcher Button */}
          <button
            onClick={onOpenLanguageModal}
            aria-label="Switch Language"
            className="min-h-[38px] md:min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#dce9ff] active:scale-95 transition-all flex items-center gap-1 text-[#0b1c30] text-xs font-semibold cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-[#a73a00]">
              translate
            </span>
            <span className="font-medium">
              {selectedLanguage === 'hi'
                ? 'ENG | हिन्दी'
                : selectedLanguage.toUpperCase() + ' | Bhashini'}
            </span>
          </button>

          {/* User Profile Avatar with Online Sovereign Sync Indicator */}
          <div
            onClick={() => showToast('Authenticated via DigiLocker Sovereign Node')}
            title="DigiLocker Authenticated Profile"
            className="relative min-w-[38px] min-h-[38px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center cursor-pointer group"
          >
            <img
              alt="Profile"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-1 ring-[#c4c6ce] group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl59HZBXOC9g_hFwIhQkf3ge0ItFhmUxxqx-Vt-MiuuKMndY5DSE0g4Qb-umQ18QdfVS2d7Qv8k1U34Z7KQtDPFTiyZ0sqtuaBfAeakdb4ire-DZ1U9CywOHUTlmeFUvloSm9ej-tx4_dUwCxsgKYWb7251YIZ7gxr43J6s1t6T0AwICYCEp9JU6V9EU42SBqKApgul90EfisCwIc8kS4Xx3SL1HJoKIx9dcOD45CaMiGDDaDZI_j8"
            />
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#7bda93] ring-2 ring-white"></span>
          </div>
        </div>
      </div>
    </header>
  );
};
