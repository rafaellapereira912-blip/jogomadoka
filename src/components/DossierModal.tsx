import React from 'react';
import { DossierRecord } from '../types/game';
import { retroAudio } from '../audio/retroAudio';

interface DossierModalProps {
  dossier: DossierRecord | null;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ dossier, onClose }) => {
  if (!dossier) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-[#0e071c] border-4 border-yellow-400 max-w-lg w-full p-4 rounded-lg shadow-2xl jrpg-box flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b-2 border-yellow-300 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping"></span>
            <span className="pixel-title text-[9px] sm:text-[10px] text-yellow-300">
              {dossier.subtitle}
            </span>
          </div>
          <button
            onClick={() => {
              retroAudio.playCursor();
              onClose();
            }}
            className="w-6 h-6 bg-rose-950 border border-rose-400 text-rose-300 font-bold flex items-center justify-center pixel-ui text-xs hover:bg-rose-900"
          >
            ✕
          </button>
        </div>

        {/* Dossier Image & Details */}
        <div className="flex flex-col sm:flex-row gap-3 items-start mb-3">
          <div className="w-full sm:w-36 h-36 rounded border-2 border-yellow-300/80 overflow-hidden shrink-0 bg-indigo-950 shadow-inner">
            <img
              src={dossier.imageUrl}
              alt={dossier.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`pixel-ui text-[8px] px-1.5 py-0.5 rounded border font-bold ${dossier.badgeColor}`}>
                {dossier.badge}
              </span>
              <span className="pixel-ui text-[8px] text-indigo-300">
                REGISTRO: {dossier.docCode}
              </span>
            </div>
            <h3 className="pixel-title text-[10px] text-white leading-tight mb-1">
              {dossier.title}
            </h3>
            <p className="pixel-font text-[14px] text-slate-300 leading-snug">
              {dossier.description}
            </p>
          </div>
        </div>

        {/* Classified Content Box */}
        <div className="bg-[#140a24] p-3 rounded border border-indigo-400/60 mb-3 shadow-inner">
          <span className="pixel-ui text-[8px] text-yellow-300 block mb-1 font-bold">
            TRANSCRIÇÃO DECODIFICADA:
          </span>
          <pre className="font-mono-code text-[11px] sm:text-[12px] text-purple-200 whitespace-pre-wrap leading-relaxed">
            {dossier.classifiedText}
          </pre>
        </div>

        {/* Analysis Footer */}
        <div className="bg-yellow-950/40 p-2.5 rounded border border-yellow-500/40 mb-3">
          <span className="pixel-ui text-[8px] text-yellow-300 font-bold block mb-0.5">
            PARECER DE COMBATE:
          </span>
          <p className="pixel-font text-[14px] text-yellow-100/90 leading-tight">
            {dossier.analysis}
          </p>
        </div>

        {/* Action Button */}
        <div className="text-right">
          <button
            onClick={() => {
              retroAudio.playCursor();
              onClose();
            }}
            className="px-4 py-1.5 bg-yellow-400 text-slate-950 font-bold pixel-ui text-[9px] border border-white hover:bg-yellow-300 active:scale-95 transition-all shadow"
          >
            RETORNAR AO TERRAÇO ▶
          </button>
        </div>
      </div>
    </div>
  );
};
