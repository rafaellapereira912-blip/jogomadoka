import React, { useState, useEffect } from 'react';
import { retroAudio } from '../audio/retroAudio';

interface HistoriaScreenProps {
  onGoToBattle: () => void;
  onOpenLog: () => void;
  playerName: string;
  isAutoPlay: boolean;
}

export const HistoriaScreen: React.FC<HistoriaScreenProps> = ({
  onGoToBattle,
  onOpenLog,
  playerName,
  isAutoPlay,
}) => {
  const [dialogueText, setDialogueText] = useState<string>(
    '“Faça um contrato comigo... Em troca de qualquer desejo do seu coração, você só precisa se tornar uma Garota Mágica e colher a luz das sombras. Você não quer salvar o mundo?”'
  );
  const [displayedText, setDisplayedText] = useState<string>('');
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isUiVisible, setIsUiVisible] = useState<boolean>(true);
  const [toastData, setToastData] = useState<{
    visible: boolean;
    title: string;
    desc: string;
    icon: string;
  }>({
    visible: false,
    title: '',
    desc: '',
    icon: '',
  });
  const [chosenOption, setChosenOption] = useState<string | null>(null);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setCharIndex(0);
  }, [dialogueText]);

  useEffect(() => {
    if (charIndex < dialogueText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + dialogueText[charIndex]);
        if (charIndex % 4 === 0) {
          retroAudio.playTone(480 + (charIndex % 6) * 20, 'square', 0.02, 0.015);
        }
        setCharIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [charIndex, dialogueText]);

  // Auto-play trigger
  useEffect(() => {
    if (isAutoPlay && !chosenOption) {
      const timer = setTimeout(() => {
        handleChoice('accept');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isAutoPlay, chosenOption]);

  const triggerToast = (title: string, desc: string, icon: string) => {
    setToastData({ visible: true, title, desc, icon });
    setTimeout(() => {
      setToastData((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const handleChoice = (type: 'accept' | 'hesitate' | 'refuse') => {
    setChosenOption(type);
    retroAudio.playConfirm();

    if (type === 'accept') {
      triggerToast('PACTO INICIADO', 'Uma centelha mágica ressoa ao entardecer.', 'auto_fix_high');
      setDialogueText(
        `“Excelente, ${playerName}! Seu desejo é o mais puro de todos... Vamos trilhar este caminho juntos nesta cidade. A primeira anomalia aguarda nos trilhos do metrô!”`
      );
    } else if (type === 'hesitate') {
      triggerToast('DÚVIDA GERADA', 'Estrelinha sorri com curiosidade tranquila.', 'help');
      setDialogueText(
        '“Curiosidade é típica das garotas da Terra. Mas lembre-se: as sombras não esperam o pôr do sol acabar. Venha, sinta a Joia da Alma pulsar antes de julgar.”'
      );
    } else {
      triggerToast('ESCOLHA ADIADA', 'O vento da tarde sopra suave pelas ruas.', 'shield');
      setDialogueText(
        '“Entendo... Você prefere voltar para casa agora. Mas estarei sempre por perto quando o grito dos inocentes ecoar pelos trilhos da cidade.”'
      );
    }
  };

  const skipTypewriter = () => {
    retroAudio.playCursor();
    setDisplayedText(dialogueText);
    setCharIndex(dialogueText.length);
  };

  return (
    <div className="flex flex-col w-full relative select-none overflow-hidden max-w-4xl mx-auto pb-10">
      {/* Nostalgic Earth Sunset Twilight Visual Stage */}
      <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden bg-[#1a1426] border-b-2 border-[#818cf8]/50 shadow-2xl">
        {/* Background Image: Walking Home Japanese Suburban Street */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0RShkWP0ggf3ZW7wqtoFn1Eei87UF-3GDm54wp8uMY5GWjD5Zn67L4k4uZNXpP-cQOzhb_njlDAjqLCzz8WR497kcUK9u4t7bELF51WCUPZjufgH6XWx1Y4n5FnlFwGtTC-kLQfz-vt0PAZdFCDNfEFh4zcuT0p_MtekQd39QHZM1M77pH-Nq7GXnoGOSNQonHv__GK9LU7cFrQ114_qdKyjxTyihMblSmZ6mjPLR-o9pzyDaZLwRLw"
          alt="Pixel art 32-bit style Japanese city street at twilight"
          className="absolute inset-0 w-full h-full object-cover object-center filter saturate-110"
        />

        {/* 32-bit CRT Scanlines & Warm Twilight Vignette */}
        <div className="absolute inset-0 crt-scanlines z-10 pointer-events-none opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b1c]/40 via-transparent to-[#090b1c]/90 pointer-events-none z-10"></div>

        {/* Retro 32-bit HUD: Gema da Alma Status (Top Left) */}
        <div className="absolute top-3 left-3 z-20 jrpg-subbox px-2.5 py-1 flex items-center gap-2 border-2 border-white/80 shadow-md">
          <div className="w-4 h-4 bg-rose-500 border border-white flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse">
            <span className="material-symbols-outlined text-[11px] text-white font-bold">diamond</span>
          </div>
          <div className="flex flex-col">
            <span className="pixel-ui text-[8px] text-yellow-300 tracking-wider">[GEMA DA ALMA]</span>
            <span className="pixel-font text-[16px] text-white leading-none">100% PURA</span>
          </div>
        </div>

        {/* Retro 32-bit HUD: Chapter/Episode indicator (Top Right) */}
        <div className="absolute top-3 right-3 z-20 jrpg-subbox px-2.5 py-1 flex items-center gap-1.5 border-2 border-white/80 shadow-md">
          <span className="w-2 h-2 bg-yellow-400 border border-white animate-ping"></span>
          <span className="pixel-ui text-[8.5px] sm:text-[9px] text-yellow-300 font-bold tracking-wider">
            CAP.01 // RETORNO ESCOLAR
          </span>
        </div>

        {/* Floating Encounter: Mascot Sprite in Center Stage */}
        <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none pt-4">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
            {/* Gentle magical shimmer halo around the friendly mascot */}
            <div className="absolute w-44 h-44 rounded-full bg-amber-400/20 blur-xl animate-pulse"></div>
            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-t from-pink-500/25 to-indigo-500/25 blur-md"></div>
            {/* Clean Sprite of Estrelinha */}
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UCgRcZowpqSF8Rookq3XsakrGai6h4SsG70RmEhzWDb4jQ784-ng3zriNXfSxt-GUo-y56K7-zllvcSvoU9w6mMWxPrsERYiyBSgPM_OQJQh84e0iuzRlq9YnAK_Z1DNGIHGRgphfbpRf9BuySwQucJHHlj3jEaZRZk6r1oQbTramHaVUYpsZY8D-W2y4biVK0FAddD4ZZljIaVXfUG8K-DJsPjWDTEWWCLqElhlCkIUSk4aBDDMTSrwrv"
              alt="Estrelinha - Mascote Celestial"
              className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] pulse-soul"
            />
          </div>
        </div>

        {/* 32-bit Scanline / Frame Specifier Tag */}
        <div className="absolute bottom-2 right-3 z-20 pixel-ui text-[8px] text-white/80 bg-black/70 px-1.5 py-0.5 border border-white/30 rounded-sm">
          STAGE 01: TERRA - TÓQUIO 17:45
        </div>
      </div>

      {/* Visual Novel Dialogue & Choice Interface */}
      <div className="relative z-30 px-3 sm:px-4 flex flex-col gap-2.5 -mt-6">
        {/* Classic 32-bit JRPG Main Dialogue Window */}
        <div
          className="jrpg-box relative p-3 sm:p-4 text-white transition-opacity duration-200"
          style={{ opacity: isUiVisible ? 1 : 0.25 }}
        >
          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-30"></div>

          {/* Character Badge & Portrait Frame in 32-bit Bevel */}
          <div className="flex items-start gap-3">
            {/* Portrait Frame with Estrelinha */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-950 border-2 border-white shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#000] p-0.5 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UCgRcZowpqSF8Rookq3XsakrGai6h4SsG70RmEhzWDb4jQ784-ng3zriNXfSxt-GUo-y56K7-zllvcSvoU9w6mMWxPrsERYiyBSgPM_OQJQh84e0iuzRlq9YnAK_Z1DNGIHGRgphfbpRf9BuySwQucJHHlj3jEaZRZk6r1oQbTramHaVUYpsZY8D-W2y4biVK0FAddD4ZZljIaVXfUG8K-DJsPjWDTEWWCLqElhlCkIUSk4aBDDMTSrwrv"
                  alt="Portrait de Estrelinha"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-30"></div>
              </div>
              <div className="mt-1 bg-yellow-400 text-slate-950 px-1.5 py-0.2 border border-white shadow-sm">
                <span className="pixel-ui text-[8.5px] sm:text-[9px] font-bold">[ESTRELINHA]</span>
              </div>
            </div>

            {/* Dialogue Content Area */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-indigo-400/40">
                <span className="pixel-title text-[8.5px] sm:text-[9px] text-yellow-300 tracking-wider">
                  MENSAGEM
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      retroAudio.playCursor();
                      onOpenLog();
                    }}
                    className="pixel-ui text-[8px] text-indigo-200 hover:text-white"
                  >
                    LOG
                  </button>
                  <span className="text-indigo-400 text-[9px]">|</span>
                  <button
                    onClick={skipTypewriter}
                    className="pixel-ui text-[8px] text-indigo-200 hover:text-white"
                  >
                    SKIP
                  </button>
                  <span className="text-indigo-400 text-[9px]">|</span>
                  <button
                    onClick={() => {
                      retroAudio.playCursor();
                      setIsUiVisible(!isUiVisible);
                    }}
                    className="pixel-ui text-[8px] text-indigo-200 hover:text-white"
                  >
                    {isUiVisible ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <p className="pixel-font text-[20px] sm:text-[22px] text-white leading-[25px] tracking-wide min-h-[55px]">
                {displayedText}
                <span className="inline-block w-2.5 h-4 bg-yellow-300 ml-1.5 align-middle cursor-blink"></span>
              </p>
            </div>
          </div>

          {/* Dialogue Box Footer Indicator */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-indigo-400/40 pixel-ui text-[8.5px] sm:text-[9px]">
            <span className="text-indigo-200">▶ PRESSIONE [A] OU TOQUE NA ESCOLHA</span>
            <span className="text-yellow-300 flex items-center gap-1 font-bold">
              <span>DECISÃO REQUERIDA</span>
              <span className="cursor-blink">▼</span>
            </span>
          </div>
        </div>

        {/* Branching Choice Deck in 32-bit Classic Menu Window Boxes */}
        <div className="flex flex-col gap-2 pt-1">
          {/* Choice 1 */}
          <button
            onClick={() => handleChoice('accept')}
            className={`retro-choice-btn group w-full text-left p-2.5 flex items-center justify-between transition-all ${
              chosenOption === 'accept' ? 'border-yellow-300 bg-indigo-900 ring-2 ring-yellow-400/50' : ''
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-6 h-6 jrpg-subbox border border-yellow-300 text-yellow-300 flex items-center justify-center pixel-title text-[9px] shrink-0 font-bold">
                I
              </span>
              <div className="flex flex-col min-w-0">
                <span className="pixel-ui text-[9.5px] sm:text-[10px] text-yellow-200 tracking-wider truncate group-hover:text-yellow-300">
                  ▶ “Qualquer desejo...? Eu aceito!”
                </span>
                <span className="pixel-font text-[16px] text-slate-200 truncate">
                  Aceitar o Contrato com Estrelinha
                </span>
              </div>
            </div>
            <span className="pixel-ui text-[9px] bg-indigo-950 px-2 py-0.5 border border-indigo-400 text-indigo-200 shrink-0 group-hover:border-yellow-300 group-hover:text-yellow-300">
              PACTO
            </span>
          </button>

          {/* Choice 2 */}
          <button
            onClick={() => handleChoice('hesitate')}
            className={`retro-choice-btn group w-full text-left p-2.5 flex items-center justify-between transition-all ${
              chosenOption === 'hesitate' ? 'border-yellow-300 bg-indigo-900 ring-2 ring-yellow-400/50' : ''
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-6 h-6 jrpg-subbox border border-indigo-300 text-indigo-200 flex items-center justify-center pixel-title text-[9px] shrink-0 font-bold">
                II
              </span>
              <div className="flex flex-col min-w-0">
                <span className="pixel-ui text-[9.5px] sm:text-[10px] text-indigo-200 tracking-wider truncate group-hover:text-yellow-300">
                  ▶ “Por que você precisa da minha energia?”
                </span>
                <span className="pixel-font text-[16px] text-slate-200 truncate">
                  Hesitar e perscrutar os olhos vazios
                </span>
              </div>
            </div>
            <span className="pixel-ui text-[9px] bg-indigo-950 px-2 py-0.5 border border-indigo-400 text-indigo-200 shrink-0 group-hover:border-yellow-300 group-hover:text-yellow-300">
              DÚVIDA
            </span>
          </button>

          {/* Choice 3 */}
          <button
            onClick={() => handleChoice('refuse')}
            className={`retro-choice-btn group w-full text-left p-2.5 flex items-center justify-between transition-all ${
              chosenOption === 'refuse' ? 'border-yellow-300 bg-indigo-900 ring-2 ring-yellow-400/50' : ''
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-6 h-6 jrpg-subbox border border-pink-300 text-pink-300 flex items-center justify-center pixel-title text-[9px] shrink-0 font-bold">
                III
              </span>
              <div className="flex flex-col min-w-0">
                <span className="pixel-ui text-[9.5px] sm:text-[10px] text-pink-200 tracking-wider truncate group-hover:text-yellow-300">
                  ▶ “Há algo de perturbador no seu olhar...”
                </span>
                <span className="pixel-font text-[16px] text-slate-200 truncate">
                  Recuar e rejeitar o pacto estelar
                </span>
              </div>
            </div>
            <span className="pixel-ui text-[9px] bg-indigo-950 px-2 py-0.5 border border-indigo-400 text-indigo-200 shrink-0 group-hover:border-yellow-300 group-hover:text-yellow-300">
              RECUSA
            </span>
          </button>
        </div>

        {/* Transition Button to Batalha */}
        {chosenOption && (
          <div className="pt-2 animate-bounce">
            <button
              onClick={() => {
                retroAudio.playSpell();
                onGoToBattle();
              }}
              className="w-full py-2.5 jrpg-subbox border-2 border-yellow-300 bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-950 text-yellow-300 hover:text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.5)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">swords</span>
              <span className="pixel-ui text-[11px] tracking-wider">
                AVANÇAR PARA A BATALHA NO METRÔ S04 ▶
              </span>
            </button>
          </div>
        )}

        {/* Retro JRPG Flavor Text */}
        <div className="flex items-center justify-center gap-2 py-1 text-indigo-300/80">
          <span className="pixel-ui text-[9px] text-yellow-300">SYSTEM:</span>
          <span className="pixel-font text-[15px] tracking-wider text-slate-300">
            MEMÓRIA SALVA NO SLOT 1 // NÍVEL DE VÍNCULO: 01
          </span>
        </div>
      </div>

      {/* Interactive Toast Feedback in 32-bit Style */}
      <div
        className={`fixed inset-x-4 max-w-md mx-auto bottom-20 z-50 pointer-events-none transition-all duration-300 ${
          toastData.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="jrpg-box p-3 border-2 border-yellow-300 flex items-center gap-3 bg-[#0d0f2b]/95 shadow-2xl">
          <span className="material-symbols-outlined text-yellow-300 text-[24px]">
            {toastData.icon || 'star'}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="pixel-title text-[9.5px] text-yellow-300 uppercase">
              {toastData.title}
            </span>
            <span className="pixel-font text-[16px] text-white truncate">
              {toastData.desc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
