import React, { useState, useEffect } from 'react';
import { SaveSlotData, ScreenType } from '../types/game';
import { retroAudio } from '../audio/retroAudio';

interface MemoryModalProps {
  onClose: () => void;
  currentScreen: ScreenType;
  collectiveTurbidity: number;
  playerName: string;
  setPlayerName: (name: string) => void;
  onLoadState: (data: SaveSlotData) => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({
  onClose,
  currentScreen,
  collectiveTurbidity,
  playerName,
  setPlayerName,
  onLoadState,
}) => {
  const [slots, setSlots] = useState<(SaveSlotData | null)[]>([null, null, null]);
  const [nameInput, setNameInput] = useState<string>(playerName);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadSlotsFromStorage();
  }, []);

  const loadSlotsFromStorage = () => {
    const loaded: (SaveSlotData | null)[] = [];
    for (let i = 1; i <= 3; i++) {
      const item = localStorage.getItem(`puella_carmen_slot_${i}`);
      if (item) {
        try {
          loaded.push(JSON.parse(item));
        } catch {
          loaded.push(null);
        }
      } else {
        loaded.push(null);
      }
    }
    setSlots(loaded);
  };

  const handleSave = (slotNum: number) => {
    retroAudio.playConfirm();
    const newSave: SaveSlotData = {
      slot: slotNum,
      date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      playerName: nameInput.trim() || 'Carmen',
      currentScreen,
      collectiveTurbidity,
      aoiTurbidity: 68,
      enemyHp: 3420,
      bondRen: 10,
      bondAoi: 10,
    };

    localStorage.setItem(`puella_carmen_slot_${slotNum}`, JSON.stringify(newSave));
    setPlayerName(newSave.playerName);
    loadSlotsFromStorage();

    setSaveSuccessMsg(`Memória gravada no Slot ${slotNum}!`);
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  const handleLoad = (slotNum: number) => {
    const data = slots[slotNum - 1];
    if (data) {
      retroAudio.playConfirm();
      onLoadState(data);
      onClose();
    }
  };

  const handleApplyName = () => {
    retroAudio.playCursor();
    const trimmed = nameInput.trim() || 'Carmen';
    setPlayerName(trimmed);
    setSaveSuccessMsg(`Identidade atualizada para "${trimmed}"!`);
    setTimeout(() => setSaveSuccessMsg(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-[#0e071c] border-4 border-yellow-300 max-w-md w-full p-4 rounded-xl shadow-2xl jrpg-box flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-yellow-400 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-300 text-[18px]">save</span>
            <span className="pixel-title text-[9px] sm:text-[10px] text-yellow-300">
              GERENCIADOR DE MEMÓRIA (SAVE/LOAD)
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

        {/* Change Name */}
        <div className="p-2.5 rounded bg-[#140a24] border border-indigo-400/50 mb-3">
          <label className="pixel-ui text-[8px] text-yellow-300 block mb-1 font-bold">
            NOME DA PROTAGONISTA:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              maxLength={16}
              onChange={(e) => setNameInput(e.target.value)}
              className="flex-1 bg-[#090412] border border-indigo-400 rounded px-2 py-1 text-white pixel-font text-[18px] focus:outline-none focus:border-yellow-400"
            />
            <button
              onClick={handleApplyName}
              className="px-2.5 py-1 bg-indigo-900 border border-indigo-400 text-yellow-300 pixel-ui text-[8px] hover:bg-indigo-800"
            >
              APLICAR
            </button>
          </div>
        </div>

        {/* Save Slots */}
        <div className="space-y-2 mb-3">
          {[1, 2, 3].map((num) => {
            const slotData = slots[num - 1];
            return (
              <div
                key={num}
                className="flex items-center justify-between p-2.5 bg-[#140a24] border border-indigo-400/60 rounded"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="pixel-title text-[8.5px] text-yellow-300">SLOT {num}</span>
                    {slotData && (
                      <span className="pixel-ui text-[7px] text-emerald-300 bg-emerald-950 px-1 border border-emerald-500">
                        {slotData.currentScreen.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <p className="pixel-font text-[14px] text-slate-300 truncate">
                    {slotData
                      ? `${slotData.date} • ${slotData.playerName} • Turbidez: ${slotData.collectiveTurbidity}%`
                      : 'Nenhuma gravação estelar neste slot'}
                  </p>
                </div>

                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => handleSave(num)}
                    className="px-2 py-1 bg-indigo-900 hover:bg-indigo-800 border border-indigo-400 text-yellow-300 pixel-ui text-[8px] rounded"
                  >
                    SALVAR
                  </button>
                  <button
                    onClick={() => handleLoad(num)}
                    disabled={!slotData}
                    className="px-2 py-1 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold pixel-ui text-[8px] rounded disabled:opacity-30 disabled:pointer-events-none"
                  >
                    CARREGAR
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success message */}
        {saveSuccessMsg && (
          <div className="p-2 mb-2 bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-center pixel-ui text-[8.5px] animate-pulse">
            {saveSuccessMsg}
          </div>
        )}

        <div className="text-right pt-1 border-t border-indigo-400/40">
          <button
            onClick={() => {
              retroAudio.playCursor();
              onClose();
            }}
            className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded border border-indigo-400 pixel-ui text-[8.5px] hover:text-white"
          >
            FECHAR
          </button>
        </div>
      </div>
    </div>
  );
};
