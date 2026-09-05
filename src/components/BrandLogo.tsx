import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  showSlogan?: boolean;
  onLogoClick?: () => void;
  interactive?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  showSlogan = false,
  onLogoClick,
  interactive = false
}) => {
  const isLight = variant === 'light' || variant === 'white';
  
  return (
    <div
      onClick={onLogoClick}
      className={`flex items-center gap-2.5 select-none ${interactive || onLogoClick ? 'cursor-pointer group' : ''} ${className}`}
      role={onLogoClick ? 'button' : undefined}
      title={onLogoClick ? 'Click logo to toggle light/dark theme' : undefined}
    >
      {/* Brand Icon: Compass & Aviation Wings in Brand Light Blue, Army Green & Deep Blue */}
      <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-sky-600 to-slate-900 shadow-md shadow-sky-500/20 text-white shrink-0 transition-transform ${interactive || onLogoClick ? 'group-hover:scale-105 group-active:scale-95' : ''}`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          {/* Stylized Globe/Compass arc */}
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
          {/* Rwanda Army Green Hill Accent */}
          <path d="M10 26C14 22 17 24 20 22C23 20 27 23 30 26" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          {/* Airplane Silhouette climbing diagonally */}
          <path
            d="M13 25L24 14L28 17L22 23L27 26L25 27L19 24L15 27L14 26L16 23L13 25Z"
            fill="#ffffff"
          />
        </svg>
        {/* Subtle dot badge for Rwanda */}
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1">
          <span className={`font-heading font-extrabold text-xl tracking-tight leading-none ${isLight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            IAN'S
          </span>
          <span className={`font-heading font-semibold text-xs tracking-widest uppercase leading-none ${isLight ? 'text-sky-300' : 'text-sky-600 dark:text-sky-400'}`}>
            TRAVEL & TOURS
          </span>
        </div>
        {showSlogan && (
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-0.5 ${isLight ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
            Conquer the world with us!
          </span>
        )}
      </div>
    </div>
  );
};
