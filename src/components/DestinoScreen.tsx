import React, { useState } from 'react';
import { retroAudio } from '../audio/retroAudio';

interface DestinoScreenProps {
  onOpenLog: () => void;
  onSelectEnding: (routeType: 'sacrificio' | 'revolta' | 'ciclo') => void;
  collectiveTurbidity: number;
  setCollectiveTurbidity: React.Dispatch<React.SetStateAction<number>>;
}

export const DestinoScreen: React.FC<DestinoScreenProps> = ({
  onOpenLog,
  onSelectEnding,
  collectiveTurbidity,
  setCollectiveTurbidity,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<'sacrificio' | 'revolta' | 'ciclo' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRouteChoice = (type: 'sacrificio' | 'revolta' | 'ciclo') => {
    setSelectedRoute(type);
    retroAudio.playConfirm();

    if (type === 'sacrificio') {
      setToastMessage('Rota do Sacrifício: Protegendo Aoi e assumindo o fardo cósmico da cidade.');
    } else if (type === 'revolta') {
      setToastMessage('Rota da Revolta: Aliança mágica com Ren para expulsar o invasor estelar.');
    } else {
      setToastMessage('Rota do Ciclo: Quebrando a maldição da entropia através da esperança infinita.');
    }

    setTimeout(() => {
      onSelectEnding(type);
    }, 1400);
  };

  const handlePurify = () => {
    retroAudio.playPurify();
    setCollectiveTurbidity((prev) => Math.max(0, prev - 15));
    setToastMessage('Luz estelar concentrada: Turbidez purificada em -15%!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAdvance = () => {
    if (selectedRoute) {
      onSelectEnding(selectedRoute);
    } else {
      handleRouteChoice('ciclo');
    }
  };

  return (
    <div className="flex flex-col w-full relative max-w-4xl mx-auto pb-12 select-none">
      {/* HUD Superior: Medidor de Joia da Alma / Limiar do Desespero */}
      <div className="relative z-20 px-3 sm:px-4 pt-2 pb-1 flex flex-col gap-1.5">
        <div className="bg-[#130a20]/95 border-2 border-rose-500/80 rounded-xl p-3 shadow-2xl relative overflow-hidden jrpg-box-alert">
          <div className="absolute inset-0 pointer-events-none opacity-20 crt-scanlines"></div>

          <div className="flex items-center justify-between gap-2 relative z-10 flex-wrap">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-lg bg-rose-950 border border-rose-400 flex items-center justify-center shadow-[0_0_12px_rgba(225,29,72,0.8)] shrink-0">
                <span className="material-symbols-outlined text-rose-300 text-[18px] animate-pulse">
                  diamond
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="pixel-ui text-[8px] text-yellow-300 tracking-widest uppercase flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span> JOIA DA ALMA
                </span>
                <span className="pixel-title text-[8.5px] sm:text-[9px] text-white truncate font-bold">
                  LIMIAR DE DESESPERO: {collectiveTurbidity > 85 ? '98.4%' : `${collectiveTurbidity}.0%`}
                </span>
              </div>
            </div>

            <div className="flex items-center shrink-0">
              <span className="pixel-ui text-[8px] px-2 py-0.5 rounded border border-rose-500 bg-rose-950/80 text-rose-300 font-bold tracking-widest uppercase shadow-md animate-pulse">
                [PONTO CRÍTICO]
              </span>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="mt-2 w-full h-3 rounded bg-slate-900 border border-purple-500/60 p-0.5 overflow-hidden flex relative">
            <div
              className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 rounded-sm animate-pulse shadow-[0_0_8px_rgba(225,29,72,0.7)] transition-all duration-300"
              style={{ width: `${Math.max(25, collectiveTurbidity)}%` }}
            ></div>
            <div className="absolute inset-0 pixel-segmented pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Stage Canvas: Cenário Urbano 32-bit (Praça Central à Noite) */}
      <div className="relative z-10 w-full px-3 sm:px-4 my-1">
        <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-400/60 shadow-2xl bg-[#0c0718]">
          <div className="relative h-60 sm:h-72 w-full overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMQ1wR6iefMzKGjLJKfp0Vlp2j_zi9MJy65nX4KcnDxy1kZFJe6S8h3VdGKQOsnvKup11YLMqsBT4aUOY7WWoS5r9pV359xcUkYHRnO9sBwybGVOMj1lmO5bLN4O07Ga3IsxQtRhRIr2sJL0df0m17TLRCklT4fCH1Fl1SWz0ujHq9FEAII8hC73BrQYZckP5S3YNhhHhqJfPuCQ04tzxoiMz1pAvL4vIf5rIDE9IYVEQIPAiVuUDzJw"
              alt="Praça central da cidade da Terra à noite sob céu estrelado com torre do relógio"
              className="w-full h-full object-cover object-center filter saturate-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180f25] via-transparent to-transparent"></div>
            <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-40"></div>

            {/* Retro Corner Badges */}
            <div className="absolute top-2 left-3 flex items-center gap-1.5 px-2 py-1 rounded bg-[#0c0718]/90 border border-indigo-400/50 shadow">
              <span className="material-symbols-outlined text-yellow-300 text-[14px]">schedule</span>
              <span className="pixel-ui text-[8px] text-white font-bold tracking-wider">
                00:00 • TORRE DO RELÓGIO
              </span>
            </div>

            <div className="absolute top-2 right-3 flex items-center gap-1 px-2 py-1 rounded bg-[#0c0718]/90 border border-purple-400/50 shadow">
              <span className="material-symbols-outlined text-purple-300 text-[14px]">public</span>
              <span className="pixel-ui text-[8px] text-purple-200 font-bold tracking-wider">
                TERRA // 32-BIT
              </span>
            </div>

            {/* Ambient Stage Narrative Overlay */}
            <div className="absolute bottom-2 left-3 right-3 text-left">
              <div className="inline-block px-2 py-0.5 mb-1 rounded bg-rose-700/90 text-white pixel-ui text-[8px] tracking-widest uppercase font-bold">
                [FASE FINAL // O CONFRONTO DA CIDADE]
              </div>
              <p className="pixel-font text-[15px] sm:text-[16px] text-slate-100 drop-shadow-md">
                A calmaria da praça adormecida contrasta com o tecido cósmico que se rasga sobre a torre.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot Dialogue Box: Janela Retrô de Estrelinha (Discurso Filosófico) */}
      <div className="relative z-20 px-3 sm:px-4 my-1">
        <div className="bg-[#0c0718]/95 border-2 border-purple-400/70 rounded-xl shadow-2xl overflow-hidden jrpg-box relative">
          <div className="absolute inset-0 pointer-events-none opacity-20 crt-scanlines"></div>

          <div className="p-3 sm:p-4 flex gap-3 items-start relative z-10">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-indigo-950 border-2 border-purple-400 shadow-[0_0_16px_rgba(221,184,255,0.4)]">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UCgRcZowpqSF8Rookq3XsakrGai6h4SsG70RmEhzWDb4jQ784-ng3zriNXfSxt-GUo-y56K7-zllvcSvoU9w6mMWxPrsERYiyBSgPM_OQJQh84e0iuzRlq9YnAK_Z1DNGIHGRgphfbpRf9BuySwQucJHHlj3jEaZRZk6r1oQbTramHaVUYpsZY8D-W2y4biVK0FAddD4ZZljIaVXfUG8K-DJsPjWDTEWWCLqElhlCkIUSk4aBDDMTSrwrv"
                  alt="Estrelinha Discurso Cósmico"
                  className="w-full h-full object-cover scale-105"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-purple-900 border border-purple-400 flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-purple-200 text-[13px]">auto_awesome</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded bg-gradient-to-r from-rose-600 to-purple-700 text-white pixel-ui text-[8.5px] sm:text-[9.5px] uppercase tracking-wider font-bold shadow-sm">
                  ESTRELINHA [VOZ CÓSMICA]
                </span>
                <span className="pixel-ui text-[8px] text-yellow-300 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[12px] animate-pulse">balance</span>
                  TERMODINÂMICA
                </span>
              </div>

              <p className="pixel-font text-[16px] sm:text-[18px] text-slate-100 leading-snug">
                “Por que hesitam diante da praça em silêncio? A entropia não poupa mundos frágeis. As emoções humanas violam as leis da física: transformam afeto em energia inesgotável. O colapso de uma garota mágica sustenta galáxias inteiras. Qual é o valor desta cidade comparado à eternidade do cosmos?”
              </p>

              <div className="mt-2 flex items-center justify-between text-indigo-300 pt-1 border-t border-purple-500/40">
                <span className="pixel-ui text-[8px] uppercase tracking-widest text-purple-300 font-bold">
                  DISCURSO FILOSÓFICO // 32-BIT DIALOGUE
                </span>
                <span className="pixel-ui text-[9px] text-rose-400 animate-bounce font-bold">▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branching Fate Decision System: As 3 Grandes Rotas de Escolha Final */}
      <div className="relative z-30 px-3 sm:px-4 pt-1 flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-yellow-300 text-[18px]">alt_route</span>
            <h3 className="pixel-title text-[9px] sm:text-[10px] text-white tracking-wide">
              O Veredito do Destino
            </h3>
          </div>
          <span className="pixel-ui text-[8px] text-yellow-300 uppercase tracking-wider font-bold bg-indigo-950 px-2 py-0.5 rounded border border-yellow-300/40">
            [3 ROTAS FINAIS]
          </span>
        </div>

        {/* Rota I: Sacrifício */}
        <button
          onClick={() => handleRouteChoice('sacrificio')}
          className={`group text-left w-full p-3 rounded-xl bg-[#0c0718] border transition-all duration-200 shadow-xl flex items-start gap-3 relative overflow-hidden ${
            selectedRoute === 'sacrificio'
              ? 'border-rose-400 bg-rose-950/60 ring-2 ring-rose-400/50'
              : 'border-rose-500/40 hover:border-rose-400'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-[#130a20] border border-rose-500 text-rose-300 flex items-center justify-center shrink-0 pixel-title text-[10px] font-bold">
            I
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="pixel-ui text-[8.5px] text-rose-300 tracking-wider uppercase font-bold">
                [ROTA I: SACRIFÍCIO]
              </span>
              <span className="pixel-ui text-[8px] text-slate-300 flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[13px] text-rose-400">shield</span>
                Proteger
              </span>
            </div>
            <p className="pixel-font text-[16px] text-white leading-snug">
              Proteger Aoi e assumir o fardo da cidade.
            </p>
          </div>
        </button>

        {/* Rota II: Revolta */}
        <button
          onClick={() => handleRouteChoice('revolta')}
          className={`group text-left w-full p-3 rounded-xl bg-[#0c0718] border transition-all duration-200 shadow-xl flex items-start gap-3 relative overflow-hidden ${
            selectedRoute === 'revolta'
              ? 'border-purple-300 bg-purple-950/60 ring-2 ring-purple-400/50'
              : 'border-purple-400/40 hover:border-purple-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-[#130a20] border border-purple-400 text-purple-300 flex items-center justify-center shrink-0 pixel-title text-[10px] font-bold">
            II
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="pixel-ui text-[8.5px] text-purple-300 tracking-wider uppercase font-bold">
                [ROTA II: REVOLTA]
              </span>
              <span className="pixel-ui text-[8px] text-yellow-300 flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[13px]">swords</span>
                Vínculo Ren
              </span>
            </div>
            <p className="pixel-font text-[16px] text-white leading-snug">
              Unir forças com Ren para expulsar a entidade alienígena da Terra.
            </p>
          </div>
        </button>

        {/* Rota III: O Ciclo */}
        <button
          onClick={() => handleRouteChoice('ciclo')}
          className={`group text-left w-full p-3 rounded-xl bg-[#0c0718] border transition-all duration-200 shadow-xl flex items-start gap-3 relative overflow-hidden ${
            selectedRoute === 'ciclo'
              ? 'border-yellow-300 bg-amber-950/60 ring-2 ring-yellow-400/50'
              : 'border-yellow-400/40 hover:border-yellow-300'
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-[#130a20] border border-yellow-400 text-yellow-300 flex items-center justify-center shrink-0 pixel-title text-[10px] font-bold">
            III
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="pixel-ui text-[8.5px] text-yellow-300 tracking-wider uppercase font-bold">
                [ROTA III: CICLO]
              </span>
              <span className="pixel-ui text-[8px] text-rose-300 flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[13px]">flare</span>
                Esperança
              </span>
            </div>
            <p className="pixel-font text-[16px] text-white leading-snug">
              Tentar quebrar a maldição estelar através da esperança.
            </p>
          </div>
        </button>

        {/* Menu de Ações no Rodapé: [HISTÓRICO], [PURIFICAR], [AVANÇAR] */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => {
              retroAudio.playCursor();
              onOpenLog();
            }}
            className="py-2.5 px-2 rounded-xl bg-[#130a20] border border-indigo-400/50 text-indigo-200 hover:text-white active:scale-95 transition-all flex items-center justify-center gap-1 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">history</span>
            <span className="pixel-ui text-[8px] uppercase font-bold tracking-wider">
              HISTÓRICO
            </span>
          </button>

          <button
            onClick={handlePurify}
            className="py-2.5 px-2 rounded-xl bg-[#130a20] border border-purple-400/50 text-purple-200 hover:text-white active:scale-95 transition-all flex items-center justify-center gap-1 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
            <span className="pixel-ui text-[8px] uppercase font-bold tracking-wider">
              PURIFICAR
            </span>
          </button>

          <button
            onClick={handleAdvance}
            className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-950 font-bold active:scale-95 transition-all flex items-center justify-center gap-1 shadow-md border border-white"
          >
            <span className="material-symbols-outlined text-[16px]">fast_forward</span>
            <span className="pixel-ui text-[8px] uppercase font-bold tracking-wider">
              AVANÇAR
            </span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50 transition-all duration-300">
          <div className="bg-[#130a20]/95 border-2 border-yellow-300 p-3 rounded-xl shadow-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-yellow-300 text-[22px]">auto_awesome</span>
            <div className="flex-1 min-w-0">
              <span className="pixel-ui text-[8px] text-yellow-300 uppercase font-bold block">
                DECISÃO REGISTRADA
              </span>
              <p className="pixel-font text-[15px] text-white truncate">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
