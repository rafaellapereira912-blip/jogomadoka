import React from 'react';
import { retroAudio } from '../audio/retroAudio';

interface LogModalProps {
  onClose: () => void;
  logs: { speaker: string; text: string; time: string }[];
}

export const LogModal: React.FC<LogModalProps> = ({ onClose, logs }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-[#0e071c] border-4 border-indigo-400 max-w-lg w-full p-4 rounded-xl shadow-2xl jrpg-box flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-indigo-400 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-300 text-[18px]">history_edu</span>
            <span className="pixel-title text-[9px] sm:text-[10px] text-yellow-300">
              HISTÓRICO DO DIÁLOGO (LOG 32-BIT)
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

        {/* Log Entries */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">
          {logs.map((item, idx) => (
            <div key={idx} className="p-2 rounded bg-[#140a24] border border-indigo-400/40">
              <div className="flex items-center justify-between text-yellow-300 pixel-ui text-[8px] mb-1">
                <span className="font-bold">[{item.speaker}]</span>
                <span className="text-indigo-300/70">{item.time}</span>
              </div>
              <p className="pixel-font text-[15px] sm:text-[16px] text-slate-100 leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-right pt-3 border-t border-indigo-400/40 mt-3">
          <button
            onClick={() => {
              retroAudio.playCursor();
              onClose();
            }}
            className="px-4 py-1.5 bg-yellow-400 text-slate-950 font-bold pixel-ui text-[8.5px] rounded hover:bg-yellow-300 shadow"
          >
            RETORNAR AO JOGO ▶
          </button>
        </div>
      </div>
    </div>
  );
};
