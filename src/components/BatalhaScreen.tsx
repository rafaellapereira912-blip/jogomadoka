import React, { useState } from 'react';
import { retroAudio } from '../audio/retroAudio';

interface BatalhaScreenProps {
  onGoToAlianca: () => void;
  collectiveTurbidity: number;
  setCollectiveTurbidity: React.Dispatch<React.SetStateAction<number>>;
  isAutoPlay: boolean;
}

export const BatalhaScreen: React.FC<BatalhaScreenProps> = ({
  onGoToAlianca,
  collectiveTurbidity,
  setCollectiveTurbidity,
  isAutoPlay,
}) => {
  const [turn, setTurn] = useState<number>(3);
  const [enemyHp, setEnemyHp] = useState<number>(3420);
  const maxEnemyHp = 7000;

  const [protagonistHp, setProtagonistHp] = useState<number>(750);
  const [aoiHp, setAoiHp] = useState<number>(420);
  const [renHp, setRenHp] = useState<number>(600);

  const [aoiTurbidity, setAoiTurbidity] = useState<number>(68);
  const [isSpeed2x, setIsSpeed2x] = useState<boolean>(false);
  const [isBattleOver, setIsBattleOver] = useState<boolean>(false);

  const [battleLogs, setBattleLogs] = useState<string[]>([
    'TURNO 03: A Marionete Mecânica balança fios enferrujados sobre os trilhos!',
    '! ALERTA: A gema de Aoi emitiu faíscas sombrias... É necessário usar ITEM / JOIA para estabilizá-la!',
  ]);

  const addLog = (msg: string) => {
    setBattleLogs((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const executeCommand = (cmd: 'attack' | 'defend' | 'item' | 'escape') => {
    if (isBattleOver) return;

    if (cmd === 'attack') {
      retroAudio.playSpell();
      const dmg = Math.floor(850 + Math.random() * 300);
      const newEnemyHp = Math.max(0, enemyHp - dmg);
      setEnemyHp(newEnemyHp);

      const addedTaint = 4;
      setCollectiveTurbidity((prev) => Math.min(100, prev + addedTaint));
      setAoiTurbidity((prev) => Math.min(100, prev + 2));

      addLog(`TURNO ${turn + 1}: Protagonista dispara Feixe Estelar Puro! Causou ${dmg} de dano! (+4% Turbidez)`);

      if (newEnemyHp <= 0) {
        handleVictory();
        return;
      }

      triggerEnemyTurn(turn + 1, false);
    } else if (cmd === 'defend') {
      retroAudio.playConfirm();
      addLog(`TURNO ${turn + 1}: Defesa de Vínculo ativada! Barreira astral envolve Aoi e reduz dano em 50%!`);
      triggerEnemyTurn(turn + 1, true);
    } else if (cmd === 'item') {
      retroAudio.playPurify();
      setCollectiveTurbidity((prev) => Math.max(0, prev - 20));
      setAoiTurbidity((prev) => Math.max(0, prev - 25));
      setAoiHp((prev) => Math.min(800, prev + 250));
      addLog(`TURNO ${turn + 1}: Semente de Luto purificou a turbidez (-20%) e restaurou +250 HP para Aoi!`);
      triggerEnemyTurn(turn + 1, false);
    } else {
      retroAudio.playCursor();
      addLog(`TURNO ${turn + 1}: Recuo tático tentado nos túneis... A Marionete bloqueia a passagem com engrenagens!`);
      triggerEnemyTurn(turn + 1, false);
    }
  };

  const triggerEnemyTurn = (nextTurn: number, isDefending: boolean) => {
    setTurn(nextTurn);
    const delay = isSpeed2x ? 400 : 800;

    setTimeout(() => {
      retroAudio.playHit();
      const enemyDmg = isDefending ? 70 : 150;
      setProtagonistHp((prev) => Math.max(50, prev - (isDefending ? 40 : 80)));
      setAoiHp((prev) => Math.max(40, prev - enemyDmg));

      addLog(`Marionete Mecânica dispara engrenagens ilusórias! Causou ${enemyDmg} de dano ao grupo!`);
    }, delay);
  };

  const handleVictory = () => {
    retroAudio.playPurify();
    setIsBattleOver(true);
    addLog(`★ VITÓRIA 32-BIT: A Marionete Mecânica foi desmantelada! Porém, um colar escolar rolou pelos trilhos...`);
  };

  const restartBattle = () => {
    retroAudio.playCursor();
    setTurn(3);
    setEnemyHp(3420);
    setProtagonistHp(750);
    setAoiHp(420);
    setRenHp(600);
    setAoiTurbidity(68);
    setIsBattleOver(false);
    setBattleLogs([
      'TURNO 03: A Marionete Mecânica balança fios enferrujados sobre os trilhos!',
      '! ALERTA: A gema de Aoi emitiu faíscas sombrias... É necessário usar ITEM / JOIA para estabilizá-la!',
    ]);
  };

  const enemyHpPercent = Math.max(0, Math.min(100, (enemyHp / maxEnemyHp) * 100));

  return (
    <div className="flex flex-col w-full relative overflow-hidden select-none max-w-4xl mx-auto pb-12">
      {/* STAGE VIEWPORT (Urban Earth Subway with colorful fairytale gears and ribbons) */}
      <div className="relative w-full h-[280px] sm:h-[340px] overflow-hidden border-b-2 border-rose-500/50 shadow-2xl">
        {/* Background Image: Subway Station with magical gears */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWIfT_epfZoCdszm9WwC7WlNOHwuwMTbT2LlfC9QrWIpbfAQSXZ18MIc9k-bOXdyuSJEHkt02XeLnhrWkWzN-2S6ZOf_9D7M2NMhdjcmdTRPgPzWLi0DdL9a4DWdlmbVFQH3jgWygQ_zSZd7dKvh3kfB_MoS2KP2HWPzQpD3caaCCjsMEikZOdvaL5TRP7MoI8CEnnH4EAPC-1Vt6HcDsoQvNvbZHdwSKfJXc6BhbWpAfeWmKPx176ZQ"
          alt="Cenário de estação de metrô com engrenagens mágicas"
          className="w-full h-full object-cover object-center filter saturate-110"
        />

        <div className="crt-scanlines absolute inset-0 z-10 pointer-events-none opacity-40"></div>

        {/* Top Overlay Bar: Area & Enemy Identification */}
        <div className="absolute top-2 left-2 right-2 z-20 flex items-start justify-between pointer-events-none">
          <div className="jrpg-box px-2.5 py-1 flex items-center gap-1.5 bg-[#130a20]/90 border border-indigo-400">
            <span className="material-symbols-outlined text-yellow-300 text-[14px]">subway</span>
            <span className="pixel-title text-[7.5px] sm:text-[8px] text-white tracking-wider">
              PLATAFORMA SUBTERRÂNEA
            </span>
          </div>

          <div className="jrpg-box-alert px-2.5 py-1 flex items-center gap-1.5 bg-[#250814]/90 border border-rose-400">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
            <span className="pixel-title text-[7.5px] sm:text-[8px] text-rose-300 font-bold">
              ENGRENAGEM ILUSÓRIA
            </span>
          </div>
        </div>

        {/* Estrelinha commentary speech bubble in retro RPG style */}
        <div className="absolute top-10 right-2 z-30 max-w-[210px] pointer-events-auto">
          <div className="relative jrpg-box p-2 bg-[#0c0718]/95 border-2 border-yellow-300 shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-1.5 mb-1 pb-0.5 border-b border-yellow-300/40">
              <span className="material-symbols-outlined text-yellow-300 text-[14px] animate-spin" style={{ animationDuration: '8s' }}>
                star
              </span>
              <span className="pixel-ui text-[8px] text-yellow-300 uppercase font-bold">
                ESTRELINHA:
              </span>
            </div>
            <p className="pixel-font text-[14px] sm:text-[15px] text-slate-100 leading-tight">
              "O maquinista virou pesadelo de lata! Atenção aos fios e protejam o coração da Aoi!"
            </p>
            {/* Speech balloon pointer */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-yellow-300"></div>
          </div>
        </div>

        {/* Enemy Target HUD with HP Gauge inside Stage */}
        <div className="absolute bottom-2.5 left-2.5 z-20 w-auto max-w-[270px] pointer-events-auto">
          <div className="jrpg-box p-2 bg-[#100922]/95 border border-rose-400 shadow-[inset_1px_1px_0_#ffe4e6]">
            <div className="flex items-center justify-between gap-3">
              <span className="pixel-title text-[8px] sm:text-[8.5px] text-white font-bold">
                MARIONETE MECÂNICA
              </span>
              <span className="pixel-ui text-[8px] text-rose-300">
                HP {enemyHp.toLocaleString('pt-BR')}/7.000
              </span>
            </div>
            <div className="w-full bg-[#130a20] h-2.5 border border-purple-500/80 mt-1 relative overflow-hidden flex">
              <div
                className="h-full bg-rose-600 transition-all duration-300 shadow-[0_0_8px_rgba(225,29,72,0.9)]"
                style={{ width: `${enemyHpPercent}%` }}
              ></div>
              <div className="h-full bg-slate-900 flex-1"></div>
              <div className="absolute inset-0 pixel-segmented pointer-events-none"></div>
            </div>
            <div className="flex items-center justify-between text-[7px] pixel-ui text-purple-200 mt-1">
              <span>FRAQUEZA: RADIANTE</span>
              <span className="text-yellow-300">TURBID. ATIVA</span>
            </div>
          </div>
        </div>

        {/* Speed toggle & Turn Badge */}
        <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5">
          <button
            onClick={() => {
              retroAudio.playCursor();
              setIsSpeed2x(!isSpeed2x);
            }}
            className={`px-2 py-0.5 jrpg-subbox text-[8px] pixel-ui border ${
              isSpeed2x ? 'border-yellow-300 text-yellow-300' : 'border-indigo-300 text-indigo-200'
            }`}
          >
            {isSpeed2x ? 'SPD x2' : 'SPD x1'}
          </button>
          <div className="px-2 py-0.5 bg-yellow-400 text-slate-950 font-bold pixel-ui text-[8px] border border-white">
            TURNO {String(turn).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* BOTTOM TACTICAL INTERFACE: Party Status + Action Menu + Battle Log */}
      <div className="flex flex-col gap-2.5 p-3 sm:p-4 bg-[#0d071a]">
        {/* 1. PAINEL DE STATUS DO GRUPO (Party Status) */}
        <section className="jrpg-box p-2.5 sm:p-3">
          <div className="flex items-center justify-between pb-1 border-b border-indigo-400/40 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-yellow-300 text-[14px]">groups</span>
              <span className="pixel-title text-[8.5px] sm:text-[9px] text-yellow-300 uppercase tracking-wider">
                GRUPO DE COMBATE (32-BIT)
              </span>
            </div>
            <span className="pixel-ui text-[7px] text-indigo-200 bg-indigo-950 px-1 border border-indigo-400">
              STATUS ATIVO
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {/* Member 1: Protagonista */}
            <div className="flex items-center gap-2 p-1.5 bg-[#130a20]/90 border border-indigo-400/70 shadow-[inset_1px_1px_0_#2f263d]">
              <div className="w-8 h-8 border border-rose-400 bg-rose-950/60 flex flex-col items-center justify-center shrink-0">
                <span className="pixel-ui text-[7px] text-rose-300 font-bold">P1</span>
                <span className="material-symbols-outlined text-[13px] text-rose-300">person</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between leading-none mb-1">
                  <span className="pixel-ui text-[8.5px] text-white font-bold truncate">Protagonista</span>
                  <span className="pixel-ui text-[8px] text-rose-300">HP {protagonistHp}/750</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-900 h-2 border border-slate-700 relative overflow-hidden">
                    <div
                      className="h-full bg-emerald-400"
                      style={{ width: `${(protagonistHp / 750) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 pixel-segmented pointer-events-none"></div>
                  </div>
                  <span className="pixel-ui text-[7px] text-emerald-300 bg-emerald-950/70 border border-emerald-500/60 px-1 py-0.2 whitespace-nowrap">
                    GEMA: 100% ESTÁVEL
                  </span>
                </div>
              </div>
            </div>

            {/* Member 2: Aoi (Veterana - ALERTA) */}
            <div className="flex items-center gap-2 p-1.5 bg-[#260914]/90 border-2 border-rose-500 shadow-[inset_1px_1px_0_#40000c]">
              <div className="w-8 h-8 border border-rose-500 bg-rose-950 flex flex-col items-center justify-center shrink-0">
                <span className="pixel-ui text-[7px] text-rose-300 font-bold">P2</span>
                <span className="material-symbols-outlined text-[13px] text-rose-400 animate-pulse">
                  warning
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between leading-none mb-1">
                  <div className="flex items-center gap-1 truncate">
                    <span className="pixel-ui text-[8.5px] text-white font-bold">Aoi</span>
                    <span className="pixel-ui text-[6.5px] text-white bg-rose-600 px-1 font-bold animate-pulse">
                      [ALERTA]
                    </span>
                  </div>
                  <span className="pixel-ui text-[8px] text-rose-400 font-bold">
                    HP {aoiHp}/800
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-900 h-2 border border-slate-700 relative overflow-hidden">
                    <div
                      className="h-full bg-rose-500"
                      style={{ width: `${(aoiHp / 800) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 pixel-segmented pointer-events-none"></div>
                  </div>
                  <span className="pixel-ui text-[7px] text-rose-300 bg-rose-950 border border-rose-500 px-1 py-0.2 whitespace-nowrap animate-pulse font-bold">
                    GEMA: {aoiTurbidity}% TURBIDEZ
                  </span>
                </div>
              </div>
            </div>

            {/* Member 3: Ren (Analista) */}
            <div className="flex items-center gap-2 p-1.5 bg-[#130a20]/90 border border-indigo-400/70 shadow-[inset_1px_1px_0_#2f263d]">
              <div className="w-8 h-8 border border-yellow-400 bg-yellow-950/60 flex flex-col items-center justify-center shrink-0">
                <span className="pixel-ui text-[7px] text-yellow-300 font-bold">P3</span>
                <span className="material-symbols-outlined text-[13px] text-yellow-300">psychology</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between leading-none mb-1">
                  <span className="pixel-ui text-[8.5px] text-white font-bold truncate">Ren</span>
                  <span className="pixel-ui text-[8px] text-yellow-300">HP {renHp}/600</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-900 h-2 border border-slate-700 relative overflow-hidden">
                    <div
                      className="h-full bg-cyan-400"
                      style={{ width: `${(renHp / 600) * 100}%` }}
                    ></div>
                    <div className="absolute inset-0 pixel-segmented pointer-events-none"></div>
                  </div>
                  <span className="pixel-ui text-[7px] text-cyan-300 bg-cyan-950/70 border border-cyan-500/60 px-1 py-0.2 whitespace-nowrap">
                    GEMA: 35% ESTÁVEL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Barra de Turbidez Coletiva da Alma */}
          <div className="mt-2.5 pt-2 border-t border-indigo-400/40 bg-[#0f091c]/80 p-2 border border-yellow-300/40">
            <div className="flex items-center justify-between leading-none mb-1">
              <span className="pixel-title text-[7.5px] sm:text-[8px] text-yellow-300 tracking-wider uppercase">
                TURBIDEZ COLETIVA DA ALMA
              </span>
              <span className="pixel-ui text-[8px] text-rose-400 font-bold animate-pulse">
                {collectiveTurbidity}% DESGASTE
              </span>
            </div>
            <div className="w-full bg-[#130a20] h-3 border border-yellow-300/60 p-0.5 relative overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-rose-500 to-rose-700 relative shadow-[0_0_10px_rgba(225,29,72,0.8)] transition-all duration-300"
                style={{ width: `${collectiveTurbidity}%` }}
              ></div>
              <div className="h-full bg-slate-900 flex-1 opacity-50"></div>
              <div className="absolute inset-0 pixel-segmented pointer-events-none"></div>
            </div>
            <div className="flex items-center justify-between text-[7px] pixel-ui text-indigo-300 mt-1">
              <span className="text-yellow-200">SEGMENTAÇÃO: 32-BIT</span>
              <span className="text-rose-400">LIMITE DE RUPTURA: 100%</span>
            </div>
          </div>
        </section>

        {/* 2. MENU DE AÇÕES DE COMBATE */}
        <section className="jrpg-box p-2.5 sm:p-3">
          <div className="flex items-center justify-between pb-1 border-b border-indigo-400/40 mb-2">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-yellow-300 text-[14px]">
                sports_martial_arts
              </span>
              <span className="pixel-title text-[8px] sm:text-[8.5px] text-yellow-300 tracking-wider uppercase">
                COMANDOS DE COMBATE
              </span>
            </div>
            <span className="pixel-ui text-[7px] text-slate-950 bg-yellow-300 px-1.5 py-0.5 font-bold">
              ESCOLHA UMA AÇÃO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* 1. MAGIA ESTELAR */}
            <button
              onClick={() => executeCommand('attack')}
              disabled={isBattleOver}
              className="group flex flex-col p-2 bg-[#130a20]/90 border-2 border-rose-500/70 hover:border-rose-400 active:scale-95 transition-all text-left shadow-[inset_1px_1px_0_#ffdada] disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 bg-rose-500 inline-block"></span>
                <span className="pixel-title text-[8px] sm:text-[8.5px] text-rose-300 font-bold group-hover:text-white">
                  1. MAGIA ESTELAR
                </span>
              </div>
              <span className="pixel-font text-[14px] sm:text-[15px] text-slate-200 leading-tight">
                Dispara feixe estelar puro • Custo: +4% Turbidez
              </span>
            </button>

            {/* 2. DEFESA DE VÍNCULO */}
            <button
              onClick={() => executeCommand('defend')}
              disabled={isBattleOver}
              className="group flex flex-col p-2 bg-[#130a20]/90 border-2 border-purple-400/70 hover:border-purple-300 active:scale-95 transition-all text-left shadow-[inset_1px_1px_0_#f0dbff] disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 bg-purple-400 inline-block"></span>
                <span className="pixel-title text-[8px] sm:text-[8.5px] text-purple-300 font-bold group-hover:text-white">
                  2. DEFESA DE VÍNCULO
                </span>
              </div>
              <span className="pixel-font text-[14px] sm:text-[15px] text-slate-200 leading-tight">
                Reduz dano em 50% e protege aliados frágeis
              </span>
            </button>

            {/* 3. ITEM / JOIA */}
            <button
              onClick={() => executeCommand('item')}
              disabled={isBattleOver}
              className="group flex flex-col p-2 bg-[#130a20]/90 border-2 border-yellow-400/80 hover:border-yellow-300 active:scale-95 transition-all text-left shadow-[inset_1px_1px_0_#ffe24c] disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 bg-yellow-400 inline-block"></span>
                <span className="pixel-title text-[8px] sm:text-[8.5px] text-yellow-300 font-bold group-hover:text-white">
                  3. ITEM / JOIA
                </span>
              </div>
              <span className="pixel-font text-[14px] sm:text-[15px] text-slate-200 leading-tight">
                Usa Semente de Luto • Purifica -20% Turbidez
              </span>
            </button>

            {/* 4. ESCAPAR */}
            <button
              onClick={() => executeCommand('escape')}
              disabled={isBattleOver}
              className="group flex flex-col p-2 bg-[#130a20]/90 border-2 border-indigo-400/70 hover:border-rose-400 active:scale-95 transition-all text-left shadow-[inset_1px_1px_0_#5c3f40] disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 bg-indigo-300 inline-block"></span>
                <span className="pixel-title text-[8px] sm:text-[8.5px] text-indigo-200 font-bold group-hover:text-rose-300">
                  4. ESCAPAR
                </span>
              </div>
              <span className="pixel-font text-[14px] sm:text-[15px] text-slate-200 leading-tight">
                Recuo tático para os túneis • Taxa: 65%
              </span>
            </button>
          </div>
        </section>

        {/* 3. REGISTRO DE BATALHA */}
        <section className="jrpg-box p-2.5 sm:p-3 bg-[#0d071a]/95">
          <div className="flex items-center justify-between pb-1 border-b border-indigo-400/40 mb-1.5">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-rose-400">sms</span>
              <span className="pixel-title text-[8px] text-rose-300 tracking-wider uppercase">
                [REGISTRO DE BATALHA]
              </span>
            </div>
            <span className="pixel-ui text-[7px] text-indigo-300">LOG 32-BIT</span>
          </div>
          <div className="flex flex-col gap-1">
            {battleLogs.map((log, index) => (
              <p
                key={index}
                className={`pixel-font text-[14px] sm:text-[15px] leading-snug ${
                  log.startsWith('!')
                    ? 'text-rose-300 font-bold'
                    : log.startsWith('★')
                    ? 'text-yellow-300 font-bold'
                    : 'text-slate-200'
                }`}
              >
                {log}
              </p>
            ))}
          </div>
        </section>

        {/* Victory Banner and Transition to Aliança */}
        {isBattleOver && (
          <div className="p-3 jrpg-box border-2 border-yellow-300 bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-950 text-center animate-pulse">
            <span className="pixel-title text-[10px] text-yellow-300 block mb-1">
              ANOMALIA NEUTRALIZADA!
            </span>
            <p className="pixel-font text-[16px] text-white mb-2">
              Aoi e Ren encontraram evidências de que o monstro era uma veterana corrompida. Encontre-os no terraço escolar para o dossiê completo!
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={restartBattle}
                className="px-3 py-1.5 jrpg-subbox border border-indigo-400 text-indigo-200 pixel-ui text-[9px] hover:text-white"
              >
                REPETIR LUTA
              </button>
              <button
                onClick={() => {
                  retroAudio.playConfirm();
                  onGoToAlianca();
                }}
                className="px-4 py-1.5 bg-yellow-400 text-slate-950 font-bold pixel-ui text-[10px] border border-white hover:bg-yellow-300 shadow-md active:scale-95 transition-all"
              >
                IR PARA O TERRAÇO (ALIANÇA) ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
