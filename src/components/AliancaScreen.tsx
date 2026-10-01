import React, { useState } from 'react';
import { DOSSIER_RECORDS } from '../data/dossierData';
import { DossierRecord } from '../types/game';
import { retroAudio } from '../audio/retroAudio';

interface AliancaScreenProps {
  onGoToDestino: () => void;
  onOpenDossier: (doc: DossierRecord) => void;
  setCollectiveTurbidity: React.Dispatch<React.SetStateAction<number>>;
  collectiveTurbidity: number;
}

export const AliancaScreen: React.FC<AliancaScreenProps> = ({
  onGoToDestino,
  onOpenDossier,
  setCollectiveTurbidity,
  collectiveTurbidity,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [dialogueText, setDialogueText] = useState<string>(
    '“Você ainda não entendeu?! Não existem criaturas vindas do espaço... Aquelas coisas [ÉRAMOS NÓS!] Quando nossa Joia da Alma se desgasta pelo desespero, nos tornamos as próprias anomalias. Estrelinha nos usa apenas para coletar energia!”'
  );
  const [speakerBadge, setSpeakerBadge] = useState<string>('AOI // VETERANA');
  const [mascotMessage, setMascotMessage] = useState<string | null>(null);

  const handleDecision = (index: number) => {
    setSelectedChoice(index);
    retroAudio.playConfirm();

    if (index === 1) {
      setSpeakerBadge('AOI // VETERANA');
      setDialogueText(
        '“Eu também neguei no início... até ver a fita de formatura da Tomoe presa nas engrenagens daquela marionete. Olhe a cor da sua própria Joia agora e veja se ela mente!”'
      );
      setCollectiveTurbidity((prev) => Math.min(100, prev + 5));
    } else if (index === 2) {
      setSpeakerBadge('REN // ANALISTA');
      setDialogueText(
        '“Infelizmente sim. Meus sensores registraram a mesma assinatura celular nas quatro anomalias abatidas nesta semana. A espécie dele atrai garotas pelo desejo e depois colhe o desespero do colapso.”'
      );
      setCollectiveTurbidity((prev) => Math.min(100, prev + 8));
    } else {
      setSpeakerBadge('AOI // VETERANA');
      setDialogueText(
        '“É isso! Essa é a primeira vez que vejo alguém encarar o abismo sem se curvar. O Estrelinha está convocando você para a Praça Central agora à meia-noite. Vamos acabar com a farsa dele!”'
      );
      setCollectiveTurbidity((prev) => Math.max(10, prev - 5));
    }
  };

  const handleMascotClick = () => {
    retroAudio.playWarning();
    setMascotMessage(
      "Estrelinha sussurra em telepatia: 'Por que o espanto? Vocês mesmas pediram para transformar seus maiores desejos em milagres. A entropia simplesmente cobra o equilíbrio matemático.'"
    );
  };

  return (
    <div className="flex flex-col w-full relative max-w-4xl mx-auto pb-12 select-none">
      {/* Rooftop Scene Background */}
      <div className="relative w-full h-[320px] sm:h-[360px] bg-cover bg-center overflow-hidden border-b-2 border-indigo-400/50 shadow-2xl bg-[#130a20]">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaXXJvQJdbX1yCg4CDzRAqdEqASWIVmxAcelYK1E8pV2fLO-cFGYndXt2ZlThwyvERM7ujYePNYyDo1DaLBa2gnj_dDEbeGuszBskw3rCeW9U4DHbHcqbYJGPwSwnc4h0lpMM06hh7yvSVBhOaPZIAFgerE0B1nK0ZuzD06lWxSf2qC3oGFFGHSzYoTu6kUESVeegFKera9FSGJN2P9tR2SCztx2Yp5OktGxGuUz1nNoEjhhdVznj3pw"
          alt="Terraço escolar ao entardecer em Tóquio"
          className="w-full h-full object-cover object-center filter saturate-110"
        />

        {/* Sunset Vignette & CRT Retro Screen Filter */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0718] via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-40"></div>

        {/* Rooftop Scene Meta Tags */}
        <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0718]/90 border border-indigo-400/60 shadow-md">
            <span className="material-symbols-outlined text-[13px] text-yellow-300">apartment</span>
            <span className="pixel-title text-[7.5px] sm:text-[8px] uppercase tracking-wider text-white font-bold">
              TOKYO-03 // TERRAÇO ESCOLAR [17:48]
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-600/90 border border-rose-400 shadow-md text-white">
            <span className="material-symbols-outlined text-[13px]">alarm</span>
            <span className="pixel-ui text-[8px] tracking-wider font-bold">OCASO SOLAR</span>
          </div>
        </div>

        {/* Character Stage: Layered 32-Bit Pixel Art VN Portraits */}
        <div className="absolute inset-0 flex items-end justify-between px-3 sm:px-8 pb-1 pointer-events-none">
          {/* Left: Ren (Analista Mágico) */}
          <div className="relative w-[48%] max-w-[210px] flex flex-col items-center select-none">
            <div className="relative p-1 rounded-sm border-2 border-indigo-400/80 bg-[#0c0718]/85 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.85)] pointer-events-auto">
              <img
                className="h-36 sm:h-44 object-contain filter contrast-110 drop-shadow-[0_4px_12px_rgba(5,2,8,0.9)] z-10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5iJmjoEU5lsu0FFr6hP6BjHm8vlILVK3DPb2f6hLDjz1GDOpcOyWYgGK0JDzYqbOEC-5qQpN9KFOw_PAqdAh7htJbOWxwhgo_zZroaVI_clOOQuswTIXMtPlRhym8wqkunoDmk9T3VJCkDQFXRHsUQSh_WE98pGoS1idNaEdXi70IgCdCoaxxXdS1MliMzYcbQMtCXEvihiKOftErGoy-OBbjRKFwRVhsGzdCOZVy3zqaQb-ncND0-w"
                alt="Retrato de Ren analista"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 px-2 py-0.2 rounded-sm border border-indigo-400 bg-indigo-950 text-indigo-200 text-center whitespace-nowrap shadow">
                <span className="pixel-ui text-[7.5px] sm:text-[8px] font-bold tracking-wider">
                  [REN // ANALISTA]
                </span>
              </div>
            </div>
          </div>

          {/* Right: Aoi (Veterana Alertando) */}
          <div className="relative w-[48%] max-w-[210px] flex flex-col items-center select-none">
            <div className="relative p-1 rounded-sm border-2 border-rose-500/80 bg-[#0c0718]/85 backdrop-blur-sm shadow-[0_4px_16px_rgba(225,29,72,0.4)] pointer-events-auto">
              <img
                className="h-36 sm:h-44 object-contain filter contrast-110 drop-shadow-[0_4px_12px_rgba(225,29,72,0.4)] z-10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZDB6ecpDs9EOOQNE24GZqgdQ7dZImICT-6a-GJm9dI-5QbP3S5mdqurBK7nMGvPp_K6tR7p1WwiANWUUkyMpDfrQDeaA6HMSdP2j0sDLcDoMLdAcJKt5GRIovDUk8MXYtwSz5T7j6kaaejn5qa-iXTZqBYFLuS03AvZ8U9kgiEl6zwiBMexzJPW1EgIRZZSkVFoXbhwfdVYvMRMTETiezJeB2v5mTaPlbumXLodTNUlM6BYHGKHXnZg"
                alt="Retrato de Aoi veterana"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 px-2 py-0.2 rounded-sm border border-rose-400 bg-rose-950 text-rose-200 text-center whitespace-nowrap shadow">
                <span className="pixel-ui text-[7.5px] sm:text-[8px] font-bold tracking-wider">
                  [AOI // VETERANA]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Estrelinha Floating Familiar Pixel Token Overlay */}
        <div className="absolute top-10 right-3 z-20 flex flex-col items-end pointer-events-auto">
          <button
            onClick={handleMascotClick}
            title="Tocar no Mascote Estrelinha"
            className="relative group cursor-pointer active:scale-95 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-sm border-2 border-yellow-300 bg-[#0c0718] p-0.5 shadow-[0_0_12px_rgba(226,198,45,0.6)] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSlB3ZTycP-Vkpy7mH7L0IMeYSoxi9Op4g1BhzLJQXv-z8yV2Zts8vjY0DS021t2JnkNR8khyXFPS_oAEmwkEBkzK7GRfT7av-fhpkxmhyawkCbIeGqXo6m_boOW3JPHeY7Uuax7z_rfyWt7tcAu4QeiRNT0pdjYN8HoOGdgDLnhcTkfGOWayVV4odgsXzPfPDs27Ujgc2a7lQ2SnG5qKMdunLoudVoWgOJfesANSpr_r6wXZzHgA-ag"
                alt="Token Estrelinha Familiar"
              />
            </div>
            <span className="absolute -bottom-2 -left-2 px-1 py-0.2 rounded-sm bg-[#0c0718] border border-yellow-300/80 text-yellow-300 pixel-ui text-[7px] font-bold tracking-widest shadow">
              INCUBADOR
            </span>
          </button>
        </div>
      </div>

      {/* Mascot Secret Telepathy Notification */}
      {mascotMessage && (
        <div className="mx-3 sm:mx-4 mt-2 p-2.5 jrpg-box border-2 border-yellow-300 bg-[#160d27] flex items-start gap-2 shadow-xl animate-pulse">
          <span className="material-symbols-outlined text-yellow-300 text-[18px] shrink-0">psychology</span>
          <div className="flex-1 min-w-0">
            <span className="pixel-ui text-[8px] text-yellow-300 font-bold block mb-0.5">
              TELEPATIA DO INCUBADOR:
            </span>
            <p className="pixel-font text-[14px] text-slate-100 leading-snug">{mascotMessage}</p>
          </div>
          <button
            onClick={() => setMascotMessage(null)}
            className="text-slate-400 hover:text-white pixel-ui text-[10px]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Visual Novel Dialogue Stage */}
      <div className="px-3 sm:px-4 -mt-2 relative z-30 flex flex-col gap-3">
        {/* 32-bit Visual Novel Dialogue Box */}
        <div className="relative w-full rounded-sm bg-[#0c0718]/95 p-3.5 shadow-2xl text-white border-2 border-indigo-400/80 jrpg-box">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-400/50">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-sm bg-rose-600 text-white pixel-ui text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-rose-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">speaker_notes</span>
                {speakerBadge}
              </span>
              <span className="px-1.5 py-0.5 rounded-sm bg-indigo-950 border border-indigo-400 pixel-ui text-[8px] sm:text-[9px] text-yellow-300 font-bold tracking-wider">
                [REVELAÇÃO CRÍTICA]
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-sm bg-indigo-950 border border-rose-400 text-rose-300 pixel-ui text-[8px] sm:text-[9px] font-bold">
              <span className="material-symbols-outlined text-[12px]">vital_signs</span>
              <span>JOIA: 24%</span>
            </div>
          </div>

          <div className="p-2.5 rounded-sm bg-[#130a20]/90 border border-indigo-500/40 shadow-inner">
            <p className="pixel-font text-[18px] sm:text-[20px] text-white leading-relaxed tracking-wide select-none">
              {dialogueText}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1 text-yellow-300">
            <div className="flex items-center gap-1 text-indigo-300 pixel-ui text-[8px] sm:text-[9px]">
              <span className="material-symbols-outlined text-[12px] text-yellow-300">memory</span>
              SATURN_VRAM://SCENE_TERRACO_04
            </div>
            <div className="flex items-center gap-1 text-yellow-300 pixel-ui text-[8.5px] sm:text-[9px] animate-pulse font-bold tracking-wider">
              <span>PRESS [A / ENTER]</span>
              <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
            </div>
          </div>
        </div>

        {/* Branching Tactical Decisions */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1 border-b border-indigo-400/50 pb-1">
            <span className="pixel-ui text-[9px] sm:text-[10px] uppercase text-white font-bold tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-yellow-300">call_split</span>
              [DECISÃO DE CONSCIÊNCIA // ESCOLHA DE DIÁLOGO]
            </span>
            <span className="pixel-ui text-[8px] text-yellow-300 font-bold tracking-widest px-1.5 py-0.2 rounded-sm bg-indigo-950 border border-indigo-400">
              TURNO #01
            </span>
          </div>

          {/* Choice I */}
          <button
            onClick={() => handleDecision(1)}
            className={`w-full text-left p-2.5 rounded-sm bg-[#0c0718] border-2 transition-all shadow-md flex items-start gap-2.5 ${
              selectedChoice === 1
                ? 'border-yellow-300 bg-indigo-900/80 ring-2 ring-yellow-400/50'
                : 'border-indigo-400/70 hover:border-rose-400'
            }`}
          >
            <div className="w-6 h-6 rounded-sm bg-indigo-950 border border-indigo-400 flex items-center justify-center pixel-title text-[9px] text-rose-300 font-bold shrink-0">
              [I]
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="pixel-ui text-[10px] sm:text-[11px] font-bold text-white group-hover:text-rose-300 transition-colors">
                “Isso é mentira... Estrelinha disse que éramos heroínas da Terra!”
              </span>
              <div className="flex items-center gap-1.5 mt-1 pixel-font text-[13px] text-indigo-300">
                <span className="text-yellow-300 font-bold">[NEGAÇÃO INICIAL]</span>
                <span>• Mantém calma temporária (+15%)</span>
              </div>
            </div>
          </button>

          {/* Choice II */}
          <button
            onClick={() => handleDecision(2)}
            className={`w-full text-left p-2.5 rounded-sm bg-[#0c0718] border-2 transition-all shadow-md flex items-start gap-2.5 ${
              selectedChoice === 2
                ? 'border-yellow-300 bg-indigo-900/80 ring-2 ring-yellow-400/50'
                : 'border-indigo-400/70 hover:border-purple-300'
            }`}
          >
            <div className="w-6 h-6 rounded-sm bg-indigo-950 border border-indigo-400 flex items-center justify-center pixel-title text-[9px] text-purple-300 font-bold shrink-0">
              [II]
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="pixel-ui text-[10px] sm:text-[11px] font-bold text-white group-hover:text-purple-300 transition-colors">
                “Então todas as anomalias urbanas que eliminamos... eram outras garotas?!”
              </span>
              <div className="flex items-center gap-1.5 mt-1 pixel-font text-[13px] text-indigo-300">
                <span className="text-purple-300 font-bold">[COMPREENSÃO DO CICLO]</span>
                <span>• Conexão empática revelada</span>
              </div>
            </div>
          </button>

          {/* Choice III */}
          <button
            onClick={() => handleDecision(3)}
            className={`w-full text-left p-2.5 rounded-sm bg-[#0c0718] border-2 transition-all shadow-md flex items-start gap-2.5 ${
              selectedChoice === 3
                ? 'border-yellow-300 bg-indigo-900/80 ring-2 ring-yellow-400/50'
                : 'border-indigo-400/70 hover:border-yellow-300'
            }`}
          >
            <div className="w-6 h-6 rounded-sm bg-indigo-950 border border-indigo-400 flex items-center justify-center pixel-title text-[9px] text-yellow-300 font-bold shrink-0">
              [III]
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="pixel-ui text-[10px] sm:text-[11px] font-bold text-white group-hover:text-yellow-300 transition-colors">
                “Não vamos nos render ao desespero. Vamos desmascarar o Estrelinha juntas!”
              </span>
              <div className="flex items-center gap-1.5 mt-1 pixel-font text-[13px] text-indigo-300">
                <span className="text-yellow-300 font-bold">[REVOLTA CONJUNTA]</span>
                <span>• Prepara formação de contra-ataque</span>
              </div>
            </div>
          </button>
        </div>

        {/* Transition Button to Destino */}
        {selectedChoice && (
          <div className="pt-2 animate-bounce">
            <button
              onClick={() => {
                retroAudio.playSpell();
                onGoToDestino();
              }}
              className="w-full py-2.5 jrpg-subbox border-2 border-rose-400 bg-gradient-to-r from-rose-950 via-purple-900 to-indigo-950 text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.6)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">hourglass_bottom</span>
              <span className="pixel-ui text-[10.5px] tracking-wider text-yellow-300">
                CONFRONTAR O CLÍMAX NA PRAÇA CENTRAL ▶
              </span>
            </button>
          </div>
        )}

        {/* Investigation Board & Occult Clues Section (Dossiê Escolar 32-bit de Detetive VN) */}
        <div className="mt-2 flex flex-col gap-2.5 pb-4">
          <div className="flex items-center justify-between px-1 border-b border-indigo-400/50 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-yellow-300">folder_special</span>
              <span className="pixel-title text-[8px] sm:text-[9px] tracking-wider text-white uppercase font-bold">
                [DOSSIÊ INVESTIGATIVO // CLUB DE OCULTISMO]
              </span>
            </div>
            <span className="pixel-ui text-[8px] text-yellow-300 px-1.5 py-0.2 rounded-sm bg-indigo-950 border border-indigo-400 font-bold">
              3 REGISTROS
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {DOSSIER_RECORDS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  retroAudio.playCursor();
                  onOpenDossier(doc);
                }}
                className="p-2.5 rounded-sm bg-[#0c0718] border-2 border-indigo-400/60 hover:border-yellow-300 shadow-md flex gap-3 items-start cursor-pointer active:scale-[0.99] transition-all group"
              >
                <div className="w-[72px] h-[72px] rounded-sm border border-indigo-400/80 overflow-hidden shrink-0 bg-indigo-950 relative">
                  <img className="w-full h-full object-cover" src={doc.imageUrl} alt={doc.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0718]/80 to-transparent"></div>
                  <span className="absolute bottom-0.5 left-1 text-[8px] pixel-ui text-yellow-300 font-bold">
                    {doc.docCode}
                  </span>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="pixel-ui text-[8.5px] sm:text-[9px] text-indigo-300 font-bold uppercase tracking-wider group-hover:text-yellow-300">
                      [{doc.subtitle}]
                    </span>
                    <span
                      className={`pixel-ui text-[7px] px-1 rounded-sm border font-bold ${doc.badgeColor}`}
                    >
                      {doc.badge}
                    </span>
                  </div>

                  <h4 className="pixel-ui text-[10px] sm:text-[11px] font-bold text-white mt-1 group-hover:text-yellow-200">
                    {doc.title}
                  </h4>
                  <p className="pixel-font text-[13px] text-slate-300 mt-0.5 leading-snug line-clamp-2">
                    {doc.description}
                  </p>
                  <span className="pixel-ui text-[8px] text-yellow-300/80 mt-1 flex items-center gap-1">
                    <span>TOQUE PARA INSPECIONAR DOCUMENTO</span>
                    <span>▶</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
