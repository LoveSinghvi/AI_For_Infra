import React, { useState } from 'react';
import { LANGUAGES } from '../data/mockData';
import { LanguageOption } from '../types';

interface CitizenVoiceTabProps {
  currentLanguage: LanguageOption;
  onSelectLanguage: (lang: LanguageOption) => void;
  onOpenLanguageModal: () => void;
  onOpenWhatsApp: () => void;
  onOpenPhoto: () => void;
  onOpenIVR: () => void;
  showToast: (msg: string) => void;
}

export const CitizenVoiceTab: React.FC<CitizenVoiceTabProps> = ({
  currentLanguage,
  onSelectLanguage,
  onOpenLanguageModal,
  onOpenWhatsApp,
  onOpenPhoto,
  onOpenIVR,
  showToast,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [verifiedCount, setVerifiedCount] = useState(74);
  const [hasVerified, setHasVerified] = useState(false);
  const [submittedToken, setSubmittedToken] = useState('#BHR-2024-9842');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Quick languages for the horizontal strip
  const quickLanguages = LANGUAGES.slice(0, 6);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      showToast('Bhashini AI Listening... Speak in any Indian dialect.');
    } else {
      setIsRecording(false);
      showToast('Voice processed. AI Intent extracted.');
    }
  };

  const handleVerify = () => {
    if (!hasVerified) {
      setHasVerified(true);
      setVerifiedCount((prev) => prev + 1);
      showToast('Verified! Your citizen endorsement has been stamped on-chain.');
    }
  };

  const handleConfirmSubmit = () => {
    const newToken = '#BHR-2024-' + Math.floor(1000 + Math.random() * 9000);
    setSubmittedToken(newToken);
    setIsSubmitted(true);
    showToast(`Request submitted! Assigned Token ${newToken}. Merging with district queue.`);
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      {/* Top Banner & Title */}
      <div className="pt-2 sm:pt-4 pb-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className="material-symbols-outlined text-[#a73a00] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            spatial_audio_off
          </span>
          <span className="font-['JetBrains_Mono'] text-xs uppercase font-bold text-[#a73a00] tracking-wider">
            Bhashini Multimodal v3.4
          </span>
        </div>
        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl md:text-3xl text-[#00162d] tracking-tight">
          अपनी आवाज़ उठाएं | Make Your Voice Heard
        </h1>
        <p className="font-['Noto_Sans'] text-xs sm:text-sm text-[#43474d] mt-1 max-w-2xl leading-relaxed">
          Report village, ward, or city infrastructure needs via Voice, WhatsApp, or Photo in 22 Scheduled Indian Languages.
        </p>

        {/* Language Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 select-none">
          {quickLanguages.map((lang) => {
            const isSelected = currentLanguage.code === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang);
                  showToast(`Switched to ${lang.name} (${lang.nativeName})`);
                }}
                className={`flex-shrink-0 h-9 px-3.5 rounded-full font-['Noto_Sans'] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  isSelected
                    ? 'bg-[#00162d] text-white shadow-sm ring-1 ring-[#00162d]'
                    : 'bg-[#dce9ff] text-[#0b1c30] hover:bg-[#c4c6ce]/60'
                }`}
              >
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#97f7ad]" />}
                <span>{lang.nativeName} ({lang.name})</span>
              </button>
            );
          })}
          <button
            onClick={onOpenLanguageModal}
            className="flex-shrink-0 h-9 px-3 rounded-full bg-[#e5eeff] text-[#43474d] hover:text-[#0b1c30] font-['JetBrains_Mono'] text-xs flex items-center gap-1 hover:bg-[#dce9ff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>+16 More</span>
          </button>
        </div>
      </div>

      {/* Responsive Grid: Single column on phone, 2-column balanced on tablet/desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column (Main Audio & Ingestion Channels) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Primary Voice Interaction Card */}
          <div className="bg-[#ffffff] rounded-xl shadow-md p-4 sm:p-5 flex flex-col items-center text-center relative overflow-hidden border border-[#e5eeff]">
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#e5eeff]/60">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-[#ba1a1a] animate-ping' : 'bg-[#a73a00] animate-pulse'}`} />
                <span className={`font-['JetBrains_Mono'] text-xs font-semibold ${isRecording ? 'text-[#ba1a1a]' : 'text-[#a73a00]'}`}>
                  {isRecording ? 'Live Mic: Recording...' : 'Dialect AI: Active'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#2f4867] font-['JetBrains_Mono'] text-[11px] font-bold">
                Free Data DPI
              </span>
            </div>

            {/* Pulse Mic Button */}
            <div className="relative my-4 sm:my-6 flex items-center justify-center">
              <div
                className={`absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full transition-all duration-300 ${
                  isRecording
                    ? 'bg-[#ffdad6] animate-ping opacity-80'
                    : 'bg-[#ffdbce]/50 animate-ping opacity-60'
                }`}
              />
              <div
                className={`absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-all duration-300 ${
                  isRecording
                    ? 'bg-[#ba1a1a]/20 animate-pulse'
                    : 'bg-[#fd651e]/20 animate-pulse'
                }`}
              />
              <button
                onClick={toggleRecording}
                aria-label={isRecording ? 'Stop Recording' : 'Tap to speak'}
                className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full text-white shadow-xl flex flex-col items-center justify-center transform active:scale-95 transition-all cursor-pointer ${
                  isRecording ? 'bg-[#ba1a1a] hover:bg-[#93000a]' : 'bg-[#a73a00] hover:bg-[#fd651e]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[36px] sm:text-[40px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-0.5 mt-1">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg sm:text-xl text-[#00162d]">
                {isRecording ? 'सुन रहे हैं... (बोलना जारी रखें)' : 'बोलने के लिए दबाएं'}
              </span>
              <span className="font-['Noto_Sans'] text-xs text-[#43474d]">
                {isRecording ? 'Tap again to pause and finalize' : 'Tap to Speak in Any Indian Dialect'}
              </span>
            </div>

            {/* Simulated Realtime Audio Feedback Strip */}
            <div className="w-full mt-4 p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-2 border border-[#dce9ff]/60">
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-[#a73a00] text-[18px]">
                    graphic_eq
                  </span>
                  <span className="font-['Noto_Sans'] text-xs text-[#0b1c30] font-semibold truncate">
                    {isRecording ? 'Ingesting Audio Stream...' : 'Listening... Bhashini Speech-to-Intent'}
                  </span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#005227] font-bold bg-[#97f7ad]/40 px-2 py-0.5 rounded-full">
                  {currentLanguage.dialect || 'Bhojpuri / Hindi'}
                </span>
              </div>

              {/* Live Waveform Animation */}
              <div className="flex items-end justify-center gap-1 h-6 w-full py-1">
                {[12, 20, 8, 24, 16, 8, 20, 12, 18, 14, 22, 10, 16, 14, 20, 9, 18].map((baseHeight, i) => (
                  <span
                    key={i}
                    className={`w-1 sm:w-1.5 rounded-full transition-all duration-200 ${
                      isRecording ? 'bg-[#ba1a1a] animate-bounce' : 'bg-[#a73a00]'
                    }`}
                    style={{
                      height: isRecording ? `${baseHeight}px` : `${Math.max(6, baseHeight * 0.45)}px`,
                      animationDelay: `${(i % 5) * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Live Speech Transcription Preview Card */}
            <div className="w-full mt-3 p-3.5 sm:p-4 rounded-lg bg-[#ffffff] shadow-xs text-left border border-[#e5eeff]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['Noto_Sans'] text-xs text-[#43474d] font-semibold">
                  Live Speech Transcription
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bda93] bg-[#0f2b48] px-2 py-0.5 rounded font-bold">
                  Confidence 98.4%
                </span>
              </div>
              <p className="font-['Noto_Sans'] text-sm sm:text-base text-[#00162d] font-medium italic leading-relaxed">
                {currentLanguage.sampleTranscript ||
                  '"हमारे गांव रामनगर में मुख्य सड़क टूटी हुई है और बारिश में पानी भर जाता है, स्कूल की बस नहीं आ पाती।"'}
              </p>

              {/* Auto Extracted Intelligence Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 bg-[#eff4ff] rounded-lg p-2 border border-[#dce9ff]/50">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#d3e4fe] text-[#001c37] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">alt_route</span>
                  <span>Rural Road & Drainage</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#d3e4fe] text-[#001c37] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                  <span>Ramnagar Block 4</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#ffdbce] text-[#370e00] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">report</span>
                  <span>High: School Access Blocked</span>
                </div>
              </div>

              <button
                onClick={handleConfirmSubmit}
                className="w-full mt-3.5 h-12 rounded-lg bg-[#00162d] text-white font-['Noto_Sans'] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-[#0f2b48] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>{isSubmitted ? 'Request Submitted · Resubmit Another' : 'Confirm & Submit Request'}</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>

          {/* Alternative Easy Input Modalities */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00162d]">
                Other Simple Channels
              </h2>
              <span className="font-['JetBrains_Mono'] text-xs text-[#43474d]">Zero Apps Needed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* WhatsApp Card */}
              <div
                onClick={onOpenWhatsApp}
                className="p-3.5 rounded-xl bg-[#ffffff] shadow-xs flex sm:flex-col items-center sm:items-start gap-3 hover:bg-[#eff4ff] transition-colors text-left border border-[#e5eeff] cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#128C7E] text-[24px]">chat</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                      WhatsApp Bot
                    </h3>
                    <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#128C7E] bg-[#25D366]/20 px-2 py-0.5 rounded-full">
                      Instant
                    </span>
                  </div>
                  <p className="font-['Noto_Sans'] text-xs text-[#43474d] truncate mt-1">
                    Send to <strong>88000-BHARAT</strong>
                  </p>
                </div>
              </div>

              {/* Geotagged Photo Upload */}
              <div
                onClick={onOpenPhoto}
                className="p-3.5 rounded-xl bg-[#ffffff] shadow-xs flex sm:flex-col items-center sm:items-start gap-3 hover:bg-[#eff4ff] transition-colors text-left border border-[#e5eeff] cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#ffdbce] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#a73a00] text-[24px]">photo_camera</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                      Geotagged Photo
                    </h3>
                    <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#a73a00] bg-[#ffdbce]/50 px-2 py-0.5 rounded-full">
                      Auto-GPS
                    </span>
                  </div>
                  <p className="font-['Noto_Sans'] text-xs text-[#43474d] truncate mt-1">
                    Snap pothole or broken pump
                  </p>
                </div>
              </div>

              {/* Toll-Free IVR Phone Call */}
              <div
                onClick={onOpenIVR}
                className="p-3.5 rounded-xl bg-[#ffffff] shadow-xs flex sm:flex-col items-center sm:items-start gap-3 hover:bg-[#eff4ff] transition-colors text-left border border-[#e5eeff] cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#d2e4ff] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#00162d] text-[24px]">phone_in_talk</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30]">
                      Toll-Free IVR
                    </h3>
                    <span className="font-['JetBrains_Mono'] text-[10px] font-semibold text-[#00162d] bg-[#d2e4ff] px-2 py-0.5 rounded-full">
                      24x7 Free
                    </span>
                  </div>
                  <p className="font-['Noto_Sans'] text-xs text-[#43474d] truncate mt-1">
                    Dial <strong>1800-INFRA-IN</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Tracking, Evidence, Trust Architecture) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Live Active Tracking / Recent Citizen Submission Card */}
          <div className="bg-[#ffffff] rounded-xl shadow-xs p-4 sm:p-5 text-left border border-[#e5eeff]">
            <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]/60">
              <div className="flex flex-col">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#43474d] uppercase font-medium">
                  Tracking Token
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00162d] tracking-tight">
                  {submittedToken}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#0D7A3E] font-['Noto_Sans'] text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span>AI Validated & Merged</span>
              </span>
            </div>

            <p className="font-['Noto_Sans'] text-xs sm:text-sm text-[#0b1c30] my-3">
              Assigned to: <strong className="text-[#00162d] font-semibold">Ward 14 Cluster (Rural Road & Storm Drain Remediation)</strong>
            </p>

            {/* Milestone Stepper */}
            <div className="space-y-3.5 pl-1 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0D7A3E] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Noto_Sans'] text-xs text-[#00162d] font-semibold">
                      Citizen Voice Logged
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#43474d]">
                      12 Oct, 09:14 AM
                    </span>
                  </div>
                  <p className="font-['Noto_Sans'] text-[11px] text-[#43474d]">
                    Voice transcribing & geotag stamped at Ramnagar Primary School corner.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0D7A3E] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">done_all</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Noto_Sans'] text-xs text-[#00162d] font-semibold">
                      Duplicate Check & Cluster Merging
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#43474d]">
                      12 Oct, 09:16 AM
                    </span>
                  </div>
                  <p className="font-['Noto_Sans'] text-[11px] text-[#43474d]">
                    Consolidated with 3 similar requests in a 400m perimeter to prevent split budgeting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ffdbce] text-[#a73a00] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-['Noto_Sans'] text-xs text-[#a73a00] font-bold">
                      Collector Queue & DPR Estimate
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#a73a00] font-semibold">
                      In Progress
                    </span>
                  </div>
                  <p className="font-['Noto_Sans'] text-[11px] text-[#43474d]">
                    Automated Detailed Project Report drafting via State PWD engineering rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Verification / Upvote Action */}
            <div className="pt-3 flex items-center justify-between gap-3 bg-[#eff4ff] p-3 rounded-lg border border-[#dce9ff]/60">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
                  <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[#d3e4fe] text-[#00162d] font-['JetBrains_Mono'] text-[10px] flex items-center justify-center font-bold">
                    R
                  </span>
                  <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[#ffdbce] text-[#a73a00] font-['JetBrains_Mono'] text-[10px] flex items-center justify-center font-bold">
                    P
                  </span>
                  <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[#d2e4ff] text-[#00162d] font-['JetBrains_Mono'] text-[10px] flex items-center justify-center font-bold">
                    M
                  </span>
                </div>
                <span className="font-['Noto_Sans'] text-xs text-[#0b1c30] font-semibold truncate">
                  {verifiedCount} neighbours verified
                </span>
              </div>

              <button
                onClick={handleVerify}
                className={`h-10 px-3.5 rounded-lg font-['Noto_Sans'] text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 flex-shrink-0 active:scale-95 cursor-pointer ${
                  hasVerified
                    ? 'bg-[#a73a00] text-white'
                    : 'bg-[#ffffff] text-[#a73a00] hover:bg-[#ffdbce]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {hasVerified ? 'done' : 'thumb_up'}
                </span>
                <span>{hasVerified ? 'Verified!' : '+1 Verify'}</span>
              </button>
            </div>
          </div>

          {/* Real Issue Imagery Evidence Context */}
          <div className="bg-[#ffffff] rounded-xl shadow-xs p-4 sm:p-5 overflow-hidden border border-[#e5eeff]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00162d]">
                Recent Community Evidence
              </h2>
              <span className="font-['JetBrains_Mono'] text-xs text-[#43474d]">Live Uplink</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div
                className="flex flex-col gap-1.5 group cursor-pointer"
                onClick={() => showToast('GPS 23.41, 77.29: Waterlogged road cluster - 14 verified submissions')}
              >
                <div className="relative rounded-lg overflow-hidden h-28 sm:h-32 bg-[#dce9ff]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt="Waterlogged approach road"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoA7LbfI1ExmpitM96-RLcvH62RpRwEBWwEjOS4fWMPtBUgk8wrf8m5XDhTTodUFjIYm5IHrdN__saeUwWPuikA_UwUQ_GvJFNCCKqC5evWoBnsbvOSyzmRaa6qW6AnhERoiNWQnoAUyc-ByZoJlSF83HkvANCp8E9yAUgZ6icSs1gk6qMOYxxYojncQpCX1Y2MptdVgzR5APspSoI01W2OY8xKWQlZ0ZoaNG6LG6P_MQ593jGDj6c"
                  />
                  <span className="absolute bottom-1 left-1 bg-[#213145]/85 text-[#eaf1ff] font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded backdrop-blur-xs">
                    GPS: 23.41, 77.29
                  </span>
                </div>
                <span className="font-['Noto_Sans'] text-xs text-[#0b1c30] font-semibold truncate">
                  Waterlogged approach road
                </span>
              </div>

              <div
                className="flex flex-col gap-1.5 group cursor-pointer"
                onClick={() => showToast('GPS 23.42, 77.31: Dry tube-well bore pump cluster - 9 verified submissions')}
              >
                <div className="relative rounded-lg overflow-hidden h-28 sm:h-32 bg-[#dce9ff]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt="Dry tube-well bore pump"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXCakEnb9DUE34SZn3kOD4nWX7smZ2fuDBm3QUK4NK_BZUkxqwOsBNPyYqVpQXlqZV-eaG2lY-J0VxIAat_MgcvRsILkcXNgmwIZcBkx8mDHU-5SCjhIGqGMeuVepuhdVCPslKzCHkO1oN9r734Iltm-eyRKADoCQ7nNBwp2CGdOhqT7-8dQDx22mI829HNlgIcuNTfpC8eBBIjrenqlevfebFdweeuJlXu5_eZojxjLuyAfKYwo81"
                  />
                  <span className="absolute bottom-1 left-1 bg-[#213145]/85 text-[#eaf1ff] font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded backdrop-blur-xs">
                    GPS: 23.42, 77.31
                  </span>
                </div>
                <span className="font-['Noto_Sans'] text-xs text-[#0b1c30] font-semibold truncate">
                  Dry tube-well bore pump
                </span>
              </div>
            </div>
          </div>

          {/* Accessible GovTech Trust Section */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#dce9ff]/60 flex flex-col items-center text-center gap-2 border border-[#dce9ff]">
            <div className="flex items-center justify-center gap-3">
              <span className="material-symbols-outlined text-[#00162d] text-[24px]">verified_user</span>
              <span className="material-symbols-outlined text-[#005227] text-[24px]">lock</span>
              <span className="material-symbols-outlined text-[#a73a00] text-[24px]">
                network_intelligence_update
              </span>
            </div>
            <p className="font-['Noto_Sans'] font-bold text-xs sm:text-sm text-[#00162d]">
              Certified Digital Public Good (DPG) & Sovereign DPI Architecture
            </p>
            <p className="font-['Noto_Sans'] text-[11px] text-[#43474d] max-w-sm leading-relaxed">
              All voice logs are tokenized on-device. No private biometric or Aadhaar data is stored without explicit consent under DPDP Act 2023.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#43474d] font-['JetBrains_Mono'] text-[10px] font-semibold">
                NIC Server Sync
              </span>
              <span className="px-2 py-0.5 rounded bg-[#e5eeff] text-[#43474d] font-['JetBrains_Mono'] text-[10px] font-semibold">
                DigiLocker Linked
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
