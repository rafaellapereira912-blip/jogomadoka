import React from 'react';
import { retroAudio } from '../audio/retroAudio';

interface EndingModalProps {
  routeType: 'sacrificio' | 'revolta' | 'ciclo' | null;
  onRestart: () => void;
  onClose: () => void;
  playerName: string;
}

export const EndingModal: React.FC<EndingModalProps> = ({
  routeType,
  onRestart,
  onClose,
  playerName,
}) => {
  if (!routeType) return null;

  const getEndingData = () => {
    switch (routeType) {
      case 'sacrificio':
        return {
          title: 'DESFECHO I: O SACRIFÍCIO DA CIDADE',
          badge: 'ROTA I // SACRIFÍCIO',
          badgeColor: 'border-rose-400 bg-rose-950 text-rose-300',
          image:
            'https://lh3.googleusercontent.com/aida/AEtjO1XFc_rFFlKJZKbOStQfwb480Z7QdH3V__KwPS_fufpWu1YBvWyvQLbrhdfdJ7KipeBukRsGKQFGOqIam1WnUi0_0fcgML8Ium4ZaQo3P5aUaWax4cSYcDv75HbRZIR28qmmm3dQKvSiEvpBIIh-WhFktwAh8YmeJGqOdqoxKKLfPiZkj9vGxG7pJNhw91Nat4KYcvu9almPiFZNwezYdW_JZnZYY9F6JEOorCeHhEblqr6LMeClCZTO61xV',
          quote:
            '“Se uma de nós precisa cair para que o amanhã amanheça em Mitakihara, que seja eu.”',
          narrative: `${playerName} dá um passo à frente da foice partida de Aoi. Conectando sua Joia da Alma diretamente ao vórtice da torre, ela suga para dentro de si cada fração da turbidez e do desespero acumulados na cidade. Seu corpo físico cristaliza-se em uma torre prismática protetora, repelindo as frotas de Estrelinha para sempre. Aoi chora no asfalto molhado enquanto o sol nasce em um céu limpo.`,
          verdict: 'A cidade foi salva, mas o nome de Carmen tornou-se uma oração sussurrada ao vento.',
        };
      case 'revolta':
        return {
          title: 'DESFECHO II: A REVOLTA DOS MORTAIS',
          badge: 'ROTA II // REVOLTA',
          badgeColor: 'border-purple-400 bg-purple-950 text-purple-300',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAaXXJvQJdbX1yCg4CDzRAqdEqASWIVmxAcelYK1E8pV2fLO-cFGYndXt2ZlThwyvERM7ujYePNYyDo1DaLBa2gnj_dDEbeGuszBskw3rCeW9U4DHbHcqbYJGPwSwnc4h0lpMM06hh7yvSVBhOaPZIAFgerE0B1nK0ZuzD06lWxSf2qC3oGFFGHSzYoTu6kUESVeegFKera9FSGJN2P9tR2SCztx2Yp5OktGxGuUz1nNoEjhhdVznj3pw',
          quote:
            '“Não somos seu combustível cósmico. Somos humanos, e esta cidade nos pertence!”',
          narrative: `Combinando a decodificação matemática de Ren com o feixe estelar de ${playerName} e a coragem inquebrável de Aoi, o trio atinge o núcleo transmissor de Estrelinha. As engrenagens alienígenas despedaçam-se em fogo violeta. O incubador tenta recuar para a órbita, mas os selos do grimório cortam sua ligação quântica com a Terra. O contrato é quebrado sem que ninguém precise se transformar em monstro.`,
          verdict: 'A aliança triunfou sobre o cálculo frio das estrelas. O futuro permanece incerto, mas humano.',
        };
      case 'ciclo':
        return {
          title: 'DESFECHO III: A LEI DA ESPERANÇA INFINITA',
          badge: 'ROTA III // O CICLO DA ALMA',
          badgeColor: 'border-yellow-400 bg-amber-950 text-yellow-300',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDMQ1wR6iefMzKGjLJKfp0Vlp2j_zi9MJy65nX4KcnDxy1kZFJe6S8h3VdGKQOsnvKup11YLMqsBT4aUOY7WWoS5r9pV359xcUkYHRnO9sBwybGVOMj1lmO5bLN4O07Ga3IsxQtRhRIr2sJL0df0m17TLRCklT4fCH1Fl1SWz0ujHq9FEAII8hC73BrQYZckP5S3YNhhHhqJfPuCQ04tzxoiMz1pAvL4vIf5rIDE9IYVEQIPAiVuUDzJw',
          quote:
            '“Se as lágrimas criam anomalias, farei com que meu desejo apague o desespero de todas as almas antes que ele comece.”',
          narrative: `${playerName} reformula o próprio pacto estelar em escala metafísica: nenhuma garota mágica no universo morrerá em desespero novamente. No instante em que uma gema atinge o limiar de ruptura, a presença radiante de Carmen desce dos céus e a acolhe em um abraço de paz infinita. Estrelinha assiste atônito enquanto as leis da termodinâmica são reescritas pelo amor.`,
          verdict: 'A Lei do Ciclo foi instaurada. Você ascendeu como a Guardiã Cósmica da Esperança.',
        };
    }
  };

  const data = getEndingData();

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-[#0b0617] border-4 border-yellow-300 max-w-xl w-full p-4 rounded-xl shadow-2xl jrpg-box flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-yellow-400 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping"></span>
            <span className="pixel-title text-[9px] sm:text-[10px] text-yellow-300 uppercase">
              {data.title}
            </span>
          </div>
          <button
            onClick={() => {
              retroAudio.playCursor();
              onClose();
            }}
            className="w-6 h-6 bg-purple-950 border border-purple-400 text-purple-200 font-bold flex items-center justify-center pixel-ui text-xs hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Ending Graphic Viewport */}
        <div className="relative h-44 sm:h-52 w-full rounded-lg overflow-hidden border-2 border-indigo-400/80 mb-3 bg-[#130a20]">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0617] via-transparent to-transparent"></div>
          <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-40"></div>

          <div className="absolute bottom-2 left-3 right-3">
            <span className={`pixel-ui text-[8px] px-2 py-0.5 rounded border font-bold ${data.badgeColor}`}>
              {data.badge}
            </span>
            <p className="pixel-font text-[16px] text-yellow-200 italic mt-1 drop-shadow-md">
              {data.quote}
            </p>
          </div>
        </div>

        {/* Narrative Prose */}
        <div className="p-3 rounded-lg bg-[#140a24] border border-indigo-400/60 mb-3 shadow-inner">
          <span className="pixel-ui text-[8px] text-yellow-300 block mb-1 font-bold">
            EPÍLOGO DA LINHA TEMPORAL:
          </span>
          <p className="pixel-font text-[17px] sm:text-[19px] text-slate-100 leading-relaxed">
            {data.narrative}
          </p>
        </div>

        {/* Verdict Badge */}
        <div className="bg-yellow-950/40 p-2.5 rounded border border-yellow-500/50 mb-3 text-center">
          <span className="pixel-title text-[8.5px] sm:text-[9px] text-yellow-300 block">
            {data.verdict}
          </span>
        </div>

        {/* Controls */}
        <div className="flex gap-2 justify-end pt-1">
          <button
            onClick={() => {
              retroAudio.playCursor();
              onClose();
            }}
            className="px-3 py-1.5 jrpg-subbox border border-indigo-400 text-indigo-200 pixel-ui text-[9px] hover:text-white"
          >
            REVER PRAÇA
          </button>
          <button
            onClick={() => {
              retroAudio.playConfirm();
              onRestart();
            }}
            className="px-4 py-1.5 bg-yellow-400 text-slate-950 font-bold pixel-ui text-[9.5px] border border-white hover:bg-yellow-300 active:scale-95 transition-all shadow"
          >
            🔄 REINICIAR LINHA TEMPORAL (ATO 1) ▶
          </button>
        </div>
      </div>
    </div>
  );
};
