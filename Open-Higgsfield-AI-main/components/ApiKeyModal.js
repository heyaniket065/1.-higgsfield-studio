'use client';

import { useState } from 'react';

export default function ApiKeyModal({ onSave }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) { setError('Please enter your API key'); return; }
    onSave(trimmed);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090a08] px-4 py-12 text-white flex items-center justify-center">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 size-[28rem] rounded-full bg-[#d9ff00]/[.045] blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -right-24 size-[32rem] rounded-full bg-[#d9ff00]/[.025] blur-[110px]" />
      <section className="relative w-full max-w-[460px] rounded-[28px] border border-white/[.09] bg-[#10110e]/95 p-7 shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:p-10">
        <div className="mb-9 flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-[#d9ff00] text-sm font-black text-black">H</span>
          <span className="text-sm font-semibold tracking-tight">Higgsfield <span className="font-normal text-white/40">Studio</span></span>
        </div>
        <div className="mb-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.22em] text-[#d9ff00]/75">Your creative workspace</p>
          <h1 className="text-[32px] font-semibold leading-tight tracking-[-.04em] sm:text-[38px]">Make something<br />worth looking at.</h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">Connect your generation engine to explore image, video, lip sync, and cinematic tools.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="muapi-key" className="mb-2 block text-[11px] font-medium uppercase tracking-[.14em] text-white/45">Muapi API key</label>
            <input
              id="muapi-key"
              type="password"
              autoComplete="off"
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(''); }}
              placeholder="Paste your API key"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'api-key-error' : 'api-key-help'}
              className="w-full rounded-xl border border-white/[.1] bg-black/30 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#d9ff00]/50 focus:ring-2 focus:ring-[#d9ff00]/10"
              suppressHydrationWarning
            />
            {error && <p id="api-key-error" role="alert" className="mt-2 text-xs text-red-300">{error}</p>}
          </div>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9ff00] py-3.5 text-sm font-semibold text-black transition hover:bg-[#e4ff48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9ff00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10110e]" suppressHydrationWarning>
            Enter the studio <span aria-hidden="true">→</span>
          </button>
          <p id="api-key-help" className="text-center text-xs text-white/35">Your key stays in this browser and is never shown in the interface.</p>
        </form>
        <div className="mt-7 border-t border-white/[.07] pt-5 text-center text-xs text-white/35">
          New to Muapi? <a href="https://muapi.ai" target="_blank" rel="noreferrer" className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-[#d9ff00]">Get an API key</a>
        </div>
      </section>
    </main>
  );
}
