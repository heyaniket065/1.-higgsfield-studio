'use client';

import { useState, useEffect, useCallback } from 'react';
import { ImageStudio, VideoStudio, LipSyncStudio, CinemaStudio } from 'studio';
import ApiKeyModal from './ApiKeyModal';

const TABS = [
  { id: 'image', label: 'Image', detail: 'Create stills', mark: '01' },
  { id: 'video', label: 'Video', detail: 'Bring ideas to life', mark: '02' },
  { id: 'lipsync', label: 'Lip sync', detail: 'Make a portrait speak', mark: '03' },
  { id: 'cinema', label: 'Cinema', detail: 'Direct every frame', mark: '04' },
];

const STORAGE_KEY = 'kie_key';

export default function StandaloneShell() {
  const [apiKey, setApiKey] = useState(null);
  const [activeTab, setActiveTab] = useState('image');
  const [showSettings, setShowSettings] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
  }, []);

  const handleKeySave = useCallback((key) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  }, []);

  const handleKeyChange = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
    setShowSettings(false);
  }, []);

  if (!hasMounted) return (
    <div className="min-h-screen bg-[#090a08] flex items-center justify-center">
      <div className="size-8 rounded-full border-2 border-white/10 border-t-[#d9ff00] animate-spin" aria-label="Loading studio" />
    </div>
  );

  if (!apiKey) return <ApiKeyModal onSave={handleKeySave} />;

  const activeTool = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="h-screen bg-[#090a08] text-white flex flex-col overflow-hidden selection:bg-[#d9ff00] selection:text-black">
      <header className="h-[68px] shrink-0 flex items-center justify-between px-5 lg:px-8 border-b border-white/[0.07] bg-[#0b0c0a]">
        <a href="/studio" className="flex items-center gap-3" aria-label="Open Higgsfield Studio home">
          <span className="size-8 rounded-lg bg-[#d9ff00] text-black grid place-items-center font-black text-sm">H</span>
          <span className="font-semibold tracking-tight text-[15px]">Higgsfield <span className="text-white/40 font-normal">Studio</span></span>
        </a>
        <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-white/35">
          <span className="size-1.5 rounded-full bg-[#d9ff00]" /> Creative workspace
        </div>
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-white/65 hover:border-white/20 hover:text-white transition-colors"
          aria-label="Open settings"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-4"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8.1 1.7 1.7 0 0 0-.9 1.5v.2h-3.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8-.1l-.2.1-1.7-2.9.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 6 14.1h-.2v-3.4H6a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.1-1.8l-.1-.2L9 4.8l.2.1a1.7 1.7 0 0 0 1.8-.1 1.7 1.7 0 0 0 .9-1.5v-.2h3.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8.1l.2-.1 1.7 2.9-.1.2a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1h.2v3.4h-.2a1.7 1.7 0 0 0-1.5 1Z"/></svg>
          Settings
        </button>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="hidden md:flex w-[224px] shrink-0 flex-col border-r border-white/[.07] bg-[#0b0c0a] px-3 py-6" aria-label="Creative tools">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/30">Workspace</p>
          <nav className="flex flex-col gap-1" aria-label="Choose a creative tool">
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} aria-current={selected ? 'page' : undefined}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${selected ? 'bg-white/[.07] text-white' : 'text-white/45 hover:bg-white/[.04] hover:text-white/80'}`}>
                  <span className={`grid size-9 place-items-center rounded-lg text-[10px] font-semibold tracking-wider ${selected ? 'bg-[#d9ff00] text-black' : 'bg-white/[.06] text-white/45 group-hover:text-white/75'}`}>{tab.mark}</span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-[13px] font-medium">{tab.label}</span>
                    <span className="text-[10px] text-white/35">{tab.detail}</span>
                  </span>
                  {selected && <span className="ml-auto size-1.5 rounded-full bg-[#d9ff00]" />}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto rounded-xl border border-white/[.07] bg-white/[.025] p-4">
            <p className="text-[11px] font-medium text-white/70">Your ideas, in motion.</p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-white/35">Choose a tool, shape your prompt, and make something unexpected.</p>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between border-b border-white/[.06] px-4 py-3 md:px-7">
            <div className="flex items-center gap-2 text-xs text-white/35"><span>Studio</span><span aria-hidden="true">/</span><span className="text-white/75">{activeTool.label}</span></div>
            <div className="md:hidden flex items-center gap-1 overflow-x-auto" aria-label="Creative tools">
              {TABS.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} aria-pressed={activeTab === tab.id} className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] ${activeTab === tab.id ? 'bg-[#d9ff00] text-black font-semibold' : 'text-white/50'}`}>{tab.label}</button>)}
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 text-[10px] text-white/35"><span className="size-1.5 rounded-full bg-emerald-400" /> Ready</span>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            {activeTab === 'image' && <ImageStudio apiKey={apiKey} />}
            {activeTab === 'video' && <VideoStudio apiKey={apiKey} />}
            {activeTab === 'lipsync' && <LipSyncStudio apiKey={apiKey} />}
            {activeTab === 'cinema' && <CinemaStudio apiKey={apiKey} />}
          </div>
        </main>
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowSettings(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="settings-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#11120f] p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div><p className="text-[10px] uppercase tracking-[.2em] text-[#d9ff00]/75">Workspace</p><h2 id="settings-title" className="mt-2 text-xl font-semibold">Settings</h2></div>
              <button type="button" onClick={() => setShowSettings(false)} aria-label="Close settings" className="rounded-lg px-2 py-1 text-white/45 hover:bg-white/5 hover:text-white">×</button>
            </div>
            <div className="rounded-xl border border-white/[.07] bg-black/20 p-4">
              <p className="text-xs font-medium text-white/80">Muapi connection</p>
              <p className="mt-2 text-xs text-white/40">API key <span className="ml-2 font-mono text-white/70">{apiKey.slice(0, 5)}••••••••</span></p>
            </div>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={handleKeyChange} className="flex-1 rounded-xl border border-red-400/20 bg-red-400/[.08] px-4 py-2.5 text-xs font-medium text-red-300 hover:bg-red-400/[.14] transition-colors">Change API key</button>
              <button type="button" onClick={() => setShowSettings(false)} className="flex-1 rounded-xl bg-white/[.08] px-4 py-2.5 text-xs font-medium text-white hover:bg-white/[.12] transition-colors">Done</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
