import React, { useState } from 'react';
import { TabType, LanguageOption } from './types';
import { LANGUAGES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CitizenVoiceTab } from './components/CitizenVoiceTab';
import { DemandHeatmapTab } from './components/DemandHeatmapTab';
import { AIPrioritizerTab } from './components/AIPrioritizerTab';
import { PublicImpactTab } from './components/PublicImpactTab';
import {
  LanguageModal,
  WhatsAppModal,
  PhotoModal,
  IVRModal,
  SynthesisDetailModal,
  CabinetNoteModal,
  AuditLedgerModal,
  ApiKeyModal,
} from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('citizen-voice');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[0]);
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'mobile'>('responsive');

  // Modals
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isIVRModalOpen, setIsIVRModalOpen] = useState(false);
  const [isSynthesisModalOpen, setIsSynthesisModalOpen] = useState(false);
  const [isCabinetModalOpen, setIsCabinetModalOpen] = useState(false);
  const [isAuditLedgerModalOpen, setIsAuditLedgerModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleNavigateToPrioritizer = (_hotspotId?: string) => {
    setActiveTab('ai-prioritizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDeviceMode = () => {
    const nextMode = deviceMode === 'responsive' ? 'mobile' : 'responsive';
    setDeviceMode(nextMode);
    showToast(
      nextMode === 'mobile'
        ? 'Switched to Phone Frame Mode (390px Viewport)'
        : 'Switched to Fluid Responsive Mode (Tablet / Desktop Optimized)'
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col items-center">
      {/* Toast Notification Floating Pill */}
      {toastMessage && (
        <div className="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#00162d] text-white font-['Noto_Sans'] text-xs font-semibold shadow-2xl flex items-center gap-2 transition-all animate-bounce border border-white/20">
          <span className="material-symbols-outlined text-[#fd651e] text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Shell: Either fluid responsive or phone frame */}
      <div
        className={`w-full flex flex-col min-h-screen relative transition-all duration-300 ${
          deviceMode === 'mobile'
            ? 'max-w-[420px] bg-white shadow-2xl sm:border sm:border-[#c4c6ce]/60 my-0 sm:my-3 sm:rounded-3xl overflow-hidden'
            : 'max-w-full bg-[#f8f9ff]'
        }`}
      >
        {/* Fixed Sovereign Top Header */}
        <Header
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          selectedLanguage={selectedLanguage.code}
          onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          deviceMode={deviceMode}
          onToggleDeviceMode={toggleDeviceMode}
          showToast={showToast}
        />

        {/* Scrollable Content Body with Top Padding for Fixed Header */}
        <main className="flex-1 w-full pt-16 md:pt-20 pb-16 md:pb-8">
          {activeTab === 'citizen-voice' && (
            <CitizenVoiceTab
              currentLanguage={selectedLanguage}
              onSelectLanguage={(l) => setSelectedLanguage(l)}
              onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
              onOpenPhoto={() => setIsPhotoModalOpen(true)}
              onOpenIVR={() => setIsIVRModalOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'demand-heatmap' && (
            <DemandHeatmapTab
              onNavigateToPrioritizer={handleNavigateToPrioritizer}
              showToast={showToast}
            />
          )}

          {activeTab === 'ai-prioritizer' && (
            <AIPrioritizerTab
              onOpenSynthesisModal={() => setIsSynthesisModalOpen(true)}
              onOpenCabinetModal={() => setIsCabinetModalOpen(true)}
              showToast={showToast}
            />
          )}

          {activeTab === 'public-impact' && (
            <PublicImpactTab
              onOpenAuditLedger={() => setIsAuditLedgerModalOpen(true)}
              onOpenApiKey={() => setIsApiKeyModalOpen(true)}
              showToast={showToast}
            />
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          deviceMode={deviceMode}
        />
      </div>

      {/* Interactive Modals */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        selectedLang={selectedLanguage.code}
        onSelectLang={(lang) => {
          setSelectedLanguage(lang);
          showToast(`Switched language to ${lang.name} (${lang.nativeName})`);
        }}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onSubmitGrievance={(text) => {
          showToast(`Grievance received from WhatsApp: "${text.substring(0, 30)}..."`);
        }}
      />

      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onPhotoSaved={(desc) => {
          showToast(`Stamped with GPS coordinates: ${desc}`);
        }}
      />

      <IVRModal
        isOpen={isIVRModalOpen}
        onClose={() => setIsIVRModalOpen(false)}
      />

      <SynthesisDetailModal
        isOpen={isSynthesisModalOpen}
        onClose={() => setIsSynthesisModalOpen(false)}
      />

      <CabinetNoteModal
        isOpen={isCabinetModalOpen}
        onClose={() => setIsCabinetModalOpen(false)}
      />

      <AuditLedgerModal
        isOpen={isAuditLedgerModalOpen}
        onClose={() => setIsAuditLedgerModalOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
