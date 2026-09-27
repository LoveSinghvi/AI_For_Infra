import React, { useState } from 'react';
import { LANGUAGES } from '../data/mockData';
import { LanguageOption } from '../types';

// 1. Language Selection Modal (22 Scheduled Indian Languages)
export const LanguageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedLang: string;
  onSelectLang: (lang: LanguageOption) => void;
}> = ({ isOpen, onClose, selectedLang, onSelectLang }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.dialect && l.dialect.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#e5eeff]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e5eeff] flex items-center justify-between bg-[#eff4ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a73a00]">translate</span>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00162d]">
                Bhashini Multilingual Engine
              </h3>
              <p className="text-xs text-[#43474d]">22 Official Scheduled Indian Languages</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#dce9ff] hover:bg-[#c4c6ce] flex items-center justify-center text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-[#e5eeff] bg-[#ffffff]">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#74777e] text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search language or dialect..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#eff4ff] rounded-lg text-sm text-[#0b1c30] placeholder:text-[#74777e] focus:outline-none focus:ring-2 focus:ring-[#00162d]/20"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto divide-y divide-[#eff4ff] space-y-1">
          {filtered.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLang(lang);
                  onClose();
                }}
                className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-colors ${
                  isSelected ? 'bg-[#dce9ff] text-[#00162d]' : 'hover:bg-[#eff4ff] text-[#0b1c30]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{lang.nativeName}</span>
                    <span className="text-xs text-[#43474d]">({lang.name})</span>
                  </div>
                  {lang.dialect && (
                    <span className="text-[11px] font-['JetBrains_Mono'] text-[#a73a00]">
                      Dialect: {lang.dialect}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-[#005227] text-[20px]">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e5eeff] bg-[#eff4ff] flex items-center justify-between text-xs text-[#43474d]">
          <span>MeitY Bhashini API v3.4 Compliant</span>
          <span className="font-['JetBrains_Mono'] font-bold text-[#005227]">100% On-Device Tokenized</span>
        </div>
      </div>
    </div>
  );
};

// 2. WhatsApp Bot Simulation Modal
export const WhatsAppModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmitGrievance: (text: string) => void }> = ({
  isOpen,
  onClose,
  onSubmitGrievance,
}) => {
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to D Infra.Bharat Official WhatsApp Helpdesk (88000-BHARAT). Please send your voice note, text, or photo of the infrastructure defect with location.',
      time: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    const newMsg = inputMsg;
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: newMsg, time: 'Just now' },
      {
        sender: 'bot',
        text: 'Received! AI Model has auto-tokenized your message. Grievance registered under Token #BHR-2024-' + Math.floor(1000 + Math.random() * 9000) + '. Merging with district queue.',
        time: 'Just now',
      },
    ]);
    setInputMsg('');
    onSubmitGrievance(newMsg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] border border-[#e5eeff]">
        {/* WhatsApp Header */}
        <div className="px-4 py-3 bg-[#075E54] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
              🇮🇳
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">D Infra.Bharat WhatsApp Bot</h3>
              <p className="text-[11px] text-[#25D366]">Official GovTech DPI • Online</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Message Flow */}
        <div className="flex-1 p-3 bg-[#ECE5DD] overflow-y-auto space-y-2.5 text-xs font-['Noto_Sans']">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[82%] rounded-lg p-2.5 shadow-xs ${
                m.sender === 'user'
                  ? 'ml-auto bg-[#DCF8C6] text-[#0b1c30]'
                  : 'mr-auto bg-white text-[#0b1c30]'
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>
              <span className="text-[9px] text-[#74777e] self-end mt-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-2.5 bg-[#F0F0F0] border-t border-[#c4c6ce]/50 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type complaint or location in any language..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-white px-3 py-2 rounded-full text-xs text-[#0b1c30] focus:outline-none shadow-inner"
          />
          <button
            onClick={handleSend}
            className="w-9 h-9 rounded-full bg-[#128C7E] text-white flex items-center justify-center hover:bg-[#075E54] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Geotagged Photo Upload Simulation Modal
export const PhotoModal: React.FC<{ isOpen: boolean; onClose: () => void; onPhotoSaved: (desc: string) => void }> = ({
  isOpen,
  onClose,
  onPhotoSaved,
}) => {
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [defectType, setDefectType] = useState('Pothole & Road Washout');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#e5eeff]">
        <div className="px-4 py-3 bg-[#eff4ff] border-b border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a73a00]">photo_camera</span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#00162d]">
              Auto-GPS Geotagged Camera
            </h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-[#dce9ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoA7LbfI1ExmpitM96-RLcvH62RpRwEBWwEjOS4fWMPtBUgk8wrf8m5XDhTTodUFjIYm5IHrdN__saeUwWPuikA_UwUQ_GvJFNCCKqC5evWoBnsbvOSyzmRaa6qW6AnhERoiNWQnoAUyc-ByZoJlSF83HkvANCp8E9yAUgZ6icSs1gk6qMOYxxYojncQpCX1Y2MptdVgzR5APspSoI01W2OY8xKWQlZ0ZoaNG6LG6P_MQ593jGDj6c"
              alt="Live Geotag Camera View"
              className="w-full h-full object-cover"
            />
            {/* GPS Overlay HUD */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white font-['JetBrains_Mono'] text-[10px]">
              GPS: 23.4148° N, 77.2912° E ± 2.1m
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#005227]/90 text-white font-['JetBrains_Mono'] text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7bda93] animate-ping" />
              ISRO Bhuvan Real-Time Geofence Match
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#00162d] block mb-1">Defect Classification</label>
            <select
              value={defectType}
              onChange={(e) => setDefectType(e.target.value)}
              className="w-full p-2 bg-[#eff4ff] rounded-lg text-xs font-medium text-[#0b1c30] border border-[#dce9ff]"
            >
              <option>Pothole & Road Washout</option>
              <option>Dry / Non-Functional Handpump Borewell</option>
              <option>Broken Streetlight & Live Electrical Cable</option>
              <option>Choked Stormwater Silt Drainage</option>
              <option>Primary Health Sub-centre Inaccessible</option>
            </select>
          </div>

          <button
            onClick={() => {
              setPhotoCaptured(true);
              onPhotoSaved(`Geotagged Photo: ${defectType} (GPS: 23.41, 77.29)`);
              onClose();
            }}
            className="w-full h-11 rounded-lg bg-[#a73a00] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#fd651e] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Upload & Stamp Geotag to Cluster</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Toll-Free IVR Phone Simulator Modal
export const IVRModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [callActive, setCallActive] = useState(false);
  const [digitPressed, setDigitPressed] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-xs rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#e5eeff]">
        <div className="p-4 bg-[#00162d] text-white text-center flex flex-col items-center">
          <span className="material-symbols-outlined text-[32px] text-[#fd651e] mb-1">phone_in_talk</span>
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm">1800-INFRA-IN</h3>
          <p className="text-[10px] text-[#afc8ed]">24x7 Toll-Free Voice Grievance IVR</p>
          <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#7bda93] animate-pulse"></span>
            <span>{callActive ? 'Voice Bot Recording in Bhojpuri...' : 'Ready to Connect'}</span>
          </div>
        </div>

        <div className="p-4 bg-[#eff4ff] flex flex-col items-center gap-3">
          <div className="grid grid-cols-3 gap-2 w-full max-w-[200px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => (
              <button
                key={d}
                onClick={() => setDigitPressed(d)}
                className="w-14 h-11 rounded-lg bg-white shadow-xs font-bold text-sm text-[#00162d] hover:bg-[#dce9ff] active:scale-95 transition-all flex items-center justify-center"
              >
                {d}
              </button>
            ))}
          </div>

          <div className="w-full flex gap-2">
            {!callActive ? (
              <button
                onClick={() => setCallActive(true)}
                className="flex-1 h-10 rounded-lg bg-[#005227] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Dial 1800-463-7246</span>
              </button>
            ) : (
              <button
                onClick={() => setCallActive(false)}
                className="flex-1 h-10 rounded-lg bg-[#ba1a1a] text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">call_end</span>
                <span>End Call & Submit Note</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 h-10 rounded-lg bg-[#dce9ff] text-[#00162d] text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Synthesis Detail Modal (Audio clips + Gram Panchayats)
export const SynthesisDetailModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#e5eeff]">
        <div className="px-5 py-4 border-b border-[#e5eeff] bg-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a73a00]">auto_awesome</span>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00162d]">
                Multimodal Synthesis Corpus Breakdown
              </h3>
              <p className="text-xs text-[#43474d]">Sevapuri-Chandauli Bridge Project Rationale</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#dce9ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs font-['Noto_Sans']">
          {/* Audio Player */}
          <div className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#dce9ff] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#00162d]">Primary Grievance Audio Composite</span>
              <span className="font-['JetBrains_Mono'] text-[#a73a00] font-semibold">Bhojpuri Dialect (Bhashini AI)</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#fd651e] text-white flex items-center justify-center shadow-md hover:bg-[#a73a00] transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <div className="flex-1">
                <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] text-[#74777e] mb-1">
                  <span>{isPlaying ? '0:12' : '0:00'}</span>
                  <span>0:38</span>
                </div>
                {/* Dynamic waveform */}
                <div className="flex items-end gap-1 h-5">
                  {[4, 12, 18, 9, 20, 14, 6, 16, 22, 10, 15, 8, 19, 12, 5, 17, 21, 11].map((h, i) => (
                    <span
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-[#a73a00] animate-pulse' : 'bg-[#c4c6ce]'
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gram Panchayats Cluster List */}
          <div>
            <span className="font-bold text-[#00162d] block mb-2">
              18 Contributing Gram Panchayats (Varanasi & Chandauli)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {[
                { name: 'Ramnagar GP', votes: '512 audio notes', status: 'Cut-off' },
                { name: 'Karsara Khurd', votes: '430 audio notes', status: 'Flooded' },
                { name: 'Bhitari GP', votes: '390 audio notes', status: 'Submerged' },
                { name: 'Babatpur South', votes: '322 audio notes', status: 'Isolated' },
                { name: 'Chandauli Border GP', votes: '610 audio notes', status: 'Severed' },
                { name: 'Sevapuri Central', votes: '445 audio notes', status: 'Monsoon Halt' },
              ].map((gp, i) => (
                <div key={i} className="p-2 rounded-lg bg-[#eff4ff] flex flex-col justify-between">
                  <span className="font-semibold text-[#00162d]">{gp.name}</span>
                  <div className="flex justify-between text-[10px] text-[#74777e] mt-1 font-['JetBrains_Mono']">
                    <span>{gp.votes}</span>
                    <span className="text-[#a73a00] font-bold">{gp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Benefit Matrix */}
          <div className="p-3 bg-[#e5eeff] rounded-xl space-y-1">
            <span className="font-bold text-[#00162d] block text-xs">Estimated Social & Fiscal Multipliers</span>
            <p className="text-[11px] text-[#43474d] leading-relaxed">
              Based on PM GatiShakti corridor logistics models, this high-level bridge eliminates a 34-km detour for agricultural produce trucks and guarantees 12-month ambulance transit to BHU Trauma Centre.
            </p>
          </div>
        </div>

        <div className="p-3 border-t border-[#e5eeff] bg-[#eff4ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#00162d] text-white font-semibold text-xs hover:bg-[#0f2b48]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 6. Cabinet Note Preview Modal
export const CabinetNoteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#e5eeff]">
        <div className="px-5 py-4 border-b border-[#e5eeff] bg-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00162d]">description</span>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00162d]">
                E-Cabinet Note Template (FY 2025-Q1)
              </h3>
              <p className="text-xs text-[#43474d]">Inter-Ministerial Committee on Infrastructure Priorities</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#dce9ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 font-serif text-xs text-[#0b1c30] leading-relaxed">
          <div className="text-center border-b border-black/10 pb-2">
            <p className="font-bold uppercase tracking-widest text-[11px]">Government of India • Ministry of Road Transport & Highways</p>
            <p className="font-['JetBrains_Mono'] text-[10px] text-[#74777e]">Document Ref: CAB-NOTE-2025-DPI-7841</p>
          </div>
          <p>
            <strong>Subject:</strong> Administrative and Expenditure Sanction for Construction of High-Level Bridge over Varuna River on Sevapuri-Chandauli Rural Corridor under PMGSY Phase IV.
          </p>
          <p>
            <strong>1. Genesis:</strong> Project was synthesized through the Bhashini Multimodal Digital Public Infrastructure, aggregating 4,820 verified citizen voice recordings with an AI confidence factor of 96.4%.
          </p>
          <p>
            <strong>2. Total Outlay:</strong> ₹24.8 Crore as per MoRTH Schedule of Rates 2024-25.
          </p>
          <p>
            <strong>3. Clearance Status:</strong> Pre-feasibility approved by NIC Spatial GIS Engine. Detailed Project Report (DPR) is automated and awaiting formal cabinet sign-off.
          </p>
        </div>

        <div className="p-3 border-t border-[#e5eeff] bg-[#eff4ff] flex items-center justify-between">
          <span className="text-[11px] font-['JetBrains_Mono'] text-[#005227]">✓ Signed with e-Sign Digital Token</span>
          <button
            onClick={() => {
              window.print ? window.print() : onClose();
            }}
            className="px-4 py-2 rounded-lg bg-[#a73a00] text-white font-bold text-xs hover:bg-[#fd651e] transition-colors"
          >
            Download Official PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// 7. Audit Ledger Modal
export const AuditLedgerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#e5eeff]">
        <div className="px-5 py-4 border-b border-[#e5eeff] bg-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005227]">lock</span>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#00162d]">
                NIC Sovereign Audit Ledger
              </h3>
              <p className="text-xs text-[#43474d]">Cryptographic Nonce Trail for Project #563-KLR</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#dce9ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 text-xs font-['JetBrains_Mono']">
          {[
            {
              event: 'CITIZEN_VOICE_INGESTION',
              hash: '0x8f2a...91ce',
              time: '12-OCT-2023 09:14:22 IST',
              validator: 'Node-MeitY-Varanasi',
            },
            {
              event: 'SPATIAL_CLUSTER_CONSOLIDATION',
              hash: '0x43b1...78aa',
              time: '12-OCT-2023 09:16:04 IST',
              validator: 'Node-ISRO-Bhuvan',
            },
            {
              event: 'TREASURY_PFMS_DISBURSEMENT',
              hash: '0x7e29...12c8',
              time: '18-JAN-2024 14:02:11 IST',
              validator: 'Node-MoF-PFMS',
            },
            {
              event: 'IOT_WATER_METER_STREAM_ACTIVE',
              hash: '0x99dc...fa20',
              time: '12-OCT-2024 11:30:00 IST',
              validator: 'Node-JalJeevan-Telemetry',
            },
          ].map((entry, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
              <div className="flex items-center justify-between text-[#00162d] font-bold">
                <span>{entry.event}</span>
                <span className="text-[#005227]">VERIFIED</span>
              </div>
              <div className="text-[10px] text-[#74777e] mt-1 space-y-0.5">
                <div>Hash: {entry.hash}</div>
                <div>Time: {entry.time}</div>
                <div>Witness: {entry.validator}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#e5eeff] bg-[#eff4ff] flex justify-between items-center text-xs">
          <span className="text-[#43474d]">Compliant with Section 4(1)(b) RTI Act</span>
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg bg-[#00162d] text-white font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// 8. Sovereign REST API Key Modal
export const ApiKeyModal: React.FC<{ isOpen: boolean; onClose: () => void; showToast: (msg: string) => void }> = ({
  isOpen,
  onClose,
  showToast,
}) => {
  const [apiKey] = useState('d_infra_dpi_live_79a2e38c4bf011498');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#e5eeff]">
        <div className="px-4 py-3 bg-[#00162d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fd651e]">terminal</span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm">Sovereign REST API Access</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 text-xs font-['Noto_Sans']">
          <p className="text-[#43474d]">
            This REST API provides read access to the NDAP-standardized infrastructure grievance corpus, automated DPR estimates, and public capex execution pipelines.
          </p>

          <div>
            <label className="font-bold text-[#00162d] block mb-1">Your Token (Sandbox Environment)</label>
            <div className="flex items-center gap-1.5 p-2 bg-[#eff4ff] rounded-lg font-['JetBrains_Mono'] text-xs text-[#00162d] border border-[#dce9ff]">
              <span className="flex-1 truncate">{apiKey}</span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(apiKey);
                  showToast('API Key copied to clipboard!');
                }}
                className="px-2 py-1 rounded bg-[#dce9ff] text-[#00162d] hover:bg-[#c4c6ce] text-[11px] font-bold"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#f8f9ff] border border-[#e5eeff] space-y-1 font-['JetBrains_Mono'] text-[11px]">
            <span className="text-[#74777e]">GET /v3/hotspots?state=Uttar+Pradesh</span>
            <span className="text-[#005227] block">Authorization: Bearer {apiKey}</span>
          </div>
        </div>

        <div className="p-3 border-t border-[#e5eeff] bg-[#eff4ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#00162d] text-white font-semibold text-xs hover:bg-[#0f2b48]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
