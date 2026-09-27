import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  deviceMode?: 'responsive' | 'mobile';
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab, deviceMode = 'responsive' }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'citizen-voice', label: 'Citizen Voice', icon: 'mic' },
    { id: 'demand-heatmap', label: 'Heatmap', icon: 'radar' },
    { id: 'ai-prioritizer', label: 'AI Prioritizer', icon: 'auto_awesome' },
    { id: 'public-impact', label: 'Public Impact', icon: 'verified' },
  ];

  return (
    <nav
      className={`fixed bottom-0 inset-x-0 w-full z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-[#e5eeff] ${
        deviceMode === 'responsive' ? 'md:hidden' : ''
      }`}
      aria-label="Primary Navigation"
    >
      <div className="h-16 max-w-md mx-auto flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer select-none ${
                isActive
                  ? 'text-[#a73a00] font-semibold'
                  : 'text-[#43474d] hover:text-[#0b1c30]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] transition-transform active:scale-90"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="font-['Noto_Sans'] text-[11px] leading-tight tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1 rounded-full bg-[#fd651e] -mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
