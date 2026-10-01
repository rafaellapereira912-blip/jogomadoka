import React from 'react';
import { ScreenType } from '../types/game';
import { retroAudio } from '../audio/retroAudio';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentScreen, onSelectScreen }) => {
  const navItems: { screen: ScreenType; label: string; icon: string }[] = [
    { screen: 'historia', label: '[HISTÓRIA]', icon: 'auto_stories' },
    { screen: 'batalha', label: '[BATALHA]', icon: 'swords' },
    { screen: 'alianca', label: '[ALIANÇA]', icon: 'groups' },
    { screen: 'destino', label: '[DESTINO]', icon: 'hourglass_bottom' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#090b1c]/95 border-t-2 border-[#818cf8] shadow-[0_-4px_16px_rgba(0,0,0,0.85)] backdrop-blur-md">
      <div className="flex items-center justify-around h-14 sm:h-16 px-2 max-w-4xl mx-auto relative">
        <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-40"></div>

        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => {
                retroAudio.playCursor();
                onSelectScreen(item.screen);
              }}
              className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[84px] h-11 sm:h-12 active:scale-95 transition-all z-10 ${
                isActive
                  ? 'text-yellow-300 bg-indigo-950/90 border border-yellow-300/80 shadow-[0_0_10px_rgba(255,215,0,0.35)]'
                  : 'text-indigo-300 hover:text-white border border-transparent'
              }`}
            >
              <span className={`material-symbols-outlined text-[19px] sm:text-[20px] ${isActive ? 'text-yellow-300' : 'text-indigo-300'}`}>
                {item.icon}
              </span>
              <span className="pixel-ui text-[8.5px] sm:text-[9.5px] mt-0.5 tracking-wider font-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
