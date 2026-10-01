import React from 'react';
import { ScreenType } from '../types/game';
import { retroAudio } from '../audio/retroAudio';

interface HeaderBarProps {
  currentScreen: ScreenType;
  onOpenLog: () => void;
  onOpenSave: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  isCrtOn: boolean;
  onToggleCrt: () => void;
  isBgmOn: boolean;
  onToggleBgm: () => void;
  collectiveTurbidity: number;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScreen,
  onOpenLog,
  onOpenSave,
  isAutoPlay,
  onToggleAutoPlay,
  isCrtOn,
  onToggleCrt,
  isBgmOn,
  onToggleBgm,
  collectiveTurbidity,
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'historia':
        return {
          title: 'PUELLA CARMEN',
          version: 'EARTH VER.',
          sub: 'CIDADE DE MITAKIHARA',
        };
      case 'batalha':
        return {
          title: '[TERRA • METRÔ S04]',
          version: 'TURNO 03',
          sub: 'LABIRINTO URBANO',
        };
      case 'alianca':
        return {
          title: '[SYS: 32-BIT SATURN-VN]',
          version: `TAINT ${collectiveTurbidity}%`,
          sub: 'ALIANÇA // TERRA',
        };
      case 'destino':
        return {
          title: 'CLÍMAX: PRAÇA CENTRAL',
          version: '32-BIT',
          sub: 'TERRA // NOITE DE LUAR',
        };
      case 'menu':
        return {
          title: 'PUELLA CARMEN',
          version: '32-BIT ENGINE',
          sub: 'MENU PRINCIPAL',
        };
    }
  };

  const meta = getScreenTitle();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#090b1c]/95 border-b-2 border-[#818cf8] shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-md">
      <div className="h-14 sm:h-16 px-3 sm:px-4 max-w-5xl mx-auto flex items-center justify-between gap-2 relative overflow-hidden">
        {/* CRT Scanline overlay in header */}
        <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-40"></div>

        {/* Left HUD Branding */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 z-10">
          <div className="w-8 h-8 jrpg-subbox flex items-center justify-center shrink-0 border border-yellow-300 shadow-[0_0_6px_rgba(255,226,76,0.5)]">
            <span className="pixel-ui text-[10px] sm:text-[11px] text-yellow-300 font-bold">32b</span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="pixel-title text-[8px] sm:text-[9px] text-[#ffd700] tracking-wide truncate">
                {meta.title}
              </span>
              <span className="pixel-ui text-[8px] sm:text-[9px] text-indigo-300 bg-indigo-950/80 px-1 border border-indigo-400/40 shrink-0">
                {meta.version}
              </span>
            </div>
            <span className="pixel-font text-[16px] sm:text-[18px] text-white tracking-wider leading-none truncate">
              {meta.sub}
            </span>
          </div>
        </div>

        {/* Right HUD Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 z-10">
          {/* Audio Toggle */}
          <button
            onClick={() => {
              retroAudio.playCursor();
              onToggleBgm();
            }}
            title={isBgmOn ? 'Música Ligada' : 'Música Desligada'}
            className={`px-2 py-1 jrpg-subbox flex items-center gap-1 text-[9px] pixel-ui transition-all ${
              isBgmOn ? 'text-yellow-300 border-yellow-400 bg-indigo-950' : 'text-indigo-300 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">
              {isBgmOn ? 'volume_up' : 'volume_off'}
            </span>
            <span className="hidden md:inline">{isBgmOn ? 'BGM: ON' : 'BGM: OFF'}</span>
          </button>

          {/* CRT Filter Toggle */}
          <button
            onClick={() => {
              retroAudio.playCursor();
              onToggleCrt();
            }}
            title="Alternar filtro CRT"
            className={`px-2 py-1 jrpg-subbox flex items-center gap-1 text-[9px] pixel-ui transition-all ${
              isCrtOn ? 'text-cyan-300 border-cyan-400 bg-indigo-950' : 'text-indigo-300 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">tv</span>
            <span className="hidden md:inline">CRT</span>
          </button>

          {/* Log / History */}
          <button
            onClick={() => {
              retroAudio.playCursor();
              onOpenLog();
            }}
            className="px-2 py-1 jrpg-subbox flex items-center gap-1 text-indigo-200 hover:text-white active:scale-95 transition-all text-[9px] pixel-ui"
          >
            <span className="material-symbols-outlined text-[13px]">menu_book</span>
            <span>LOG</span>
          </button>

          {/* Auto Play */}
          <button
            onClick={() => {
              retroAudio.playCursor();
              onToggleAutoPlay();
            }}
            className={`px-2 py-1 jrpg-subbox flex items-center gap-1 text-[9px] pixel-ui active:scale-95 transition-all ${
              isAutoPlay ? 'text-yellow-300 border-yellow-400' : 'text-indigo-200 hover:text-yellow-300'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">
              {isAutoPlay ? 'pause' : 'play_arrow'}
            </span>
            <span>AUTO</span>
          </button>

          {/* Memory / Save */}
          <button
            onClick={() => {
              retroAudio.playCursor();
              onOpenSave();
            }}
            title="Gerenciador de Memória"
            className="w-7 h-7 jrpg-subbox flex items-center justify-center text-yellow-300 hover:text-white active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">save</span>
          </button>
        </div>
      </div>
    </header>
  );
};
