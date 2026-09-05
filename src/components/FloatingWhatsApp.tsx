import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="WhatsApp Quick Support" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-semibold shadow-xl border border-slate-200 animate-in fade-in slide-in-from-right-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Chat with us 24/7 on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={getGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-700/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open WhatsApp conversation with IAN'S Travel & Tours"
        id="floating-whatsapp-btn"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
        </span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </a>
    </aside>
  );
};
