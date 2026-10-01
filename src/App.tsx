import { useState } from 'react';
import { ScreenType, DossierRecord, SaveSlotData } from './types/game';
import { HeaderBar } from './components/HeaderBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HistoriaScreen } from './components/HistoriaScreen';
import { BatalhaScreen } from './components/BatalhaScreen';
import { AliancaScreen } from './components/AliancaScreen';
import { DestinoScreen } from './components/DestinoScreen';
import { DossierModal } from './components/DossierModal';
import { EndingModal } from './components/EndingModal';
import { MemoryModal } from './components/MemoryModal';
import { LogModal } from './components/LogModal';
import { retroAudio } from './audio/retroAudio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('historia');
  const [playerName, setPlayerName] = useState<string>('Carmen');
  const [collectiveTurbidity, setCollectiveTurbidity] = useState<number>(38);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isCrtOn, setIsCrtOn] = useState<boolean>(true);
  const [isBgmOn, setIsBgmOn] = useState<boolean>(false);

  // Modals state
  const [selectedDossier, setSelectedDossier] = useState<DossierRecord | null>(null);
  const [endingRoute, setEndingRoute] = useState<'sacrificio' | 'revolta' | 'ciclo' | null>(null);
  const [isLogOpen, setIsLogOpen] = useState<boolean>(false);
  const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false);

  // Persistent dialogue logs
  const [logs, setLogs] = useState<{ speaker: string; text: string; time: string }[]>([
    {
      speaker: 'ESTRELINHA',
      text: '“Faça um contrato comigo... Em troca de qualquer desejo do seu coração, você só precisa se tornar uma Garota Mágica e colher a luz das sombras. Você não quer salvar o mundo?”',
      time: '17:45',
    },
    {
      speaker: 'ESTRELINHA',
      text: '“O maquinista virou pesadelo de lata! Atenção aos fios e protejam o coração da Aoi!”',
      time: '18:10',
    },
    {
      speaker: 'AOI // VETERANA',
      text: '“Você ainda não entendeu?! Não existem criaturas vindas do espaço... Aquelas coisas [ÉRAMOS NÓS!] Quando nossa Joia da Alma se desgasta pelo desespero, nos tornamos as próprias anomalias.”',
      time: '18:35',
    },
    {
      speaker: 'ESTRELINHA [VOZ CÓSMICA]',
      text: '“Por que hesitam diante da praça em silêncio? A entropia não poupa mundos frágeis. O colapso de uma garota mágica sustenta galáxias inteiras. Qual é o valor desta cidade comparado à eternidade do cosmos?”',
      time: '00:00',
    },
  ]);

  const handleToggleBgm = () => {
    const active = retroAudio.toggleBgm();
    setIsBgmOn(active);
  };

  const handleRestartTimeline = () => {
    setCollectiveTurbidity(0);
    setCurrentScreen('historia');
    setEndingRoute(null);
    setLogs((prev) => [
      {
        speaker: 'SISTEMA',
        text: '--- NOVA LINHA TEMPORAL INICIADA (ATO 01: O PACTO) ---',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);
  };

  const handleLoadSaveState = (data: SaveSlotData) => {
    setCurrentScreen(data.currentScreen);
    setPlayerName(data.playerName);
    setCollectiveTurbidity(data.collectiveTurbidity);
    setLogs((prev) => [
      {
        speaker: 'SISTEMA',
        text: `--- MEMÓRIA CARREGADA: SLOT ${data.slot} (${data.date}) ---`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);
  };

  return (
    <div className={`min-h-screen bg-[#0b0713] text-[#ecdcfc] flex flex-col relative ${isCrtOn ? 'crt-screen' : ''}`}>
      {/* 32-bit Console CRT scanlines overlay across viewport */}
      {isCrtOn && (
        <div className="fixed inset-0 crt-scanlines pointer-events-none z-40 opacity-30"></div>
      )}

      {/* Top 32-bit Header Bar */}
      <HeaderBar
        currentScreen={currentScreen}
        onOpenLog={() => setIsLogOpen(true)}
        onOpenSave={() => setIsSaveOpen(true)}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
        isCrtOn={isCrtOn}
        onToggleCrt={() => setIsCrtOn(!isCrtOn)}
        isBgmOn={isBgmOn}
        onToggleBgm={handleToggleBgm}
        collectiveTurbidity={collectiveTurbidity}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 w-full pt-16 sm:pt-20 pb-20 sm:pb-24 px-2 sm:px-4">
        {currentScreen === 'historia' && (
          <HistoriaScreen
            onGoToBattle={() => setCurrentScreen('batalha')}
            onOpenLog={() => setIsLogOpen(true)}
            playerName={playerName}
            isAutoPlay={isAutoPlay}
          />
        )}

        {currentScreen === 'batalha' && (
          <BatalhaScreen
            onGoToAlianca={() => setCurrentScreen('alianca')}
            collectiveTurbidity={collectiveTurbidity}
            setCollectiveTurbidity={setCollectiveTurbidity}
            isAutoPlay={isAutoPlay}
          />
        )}

        {currentScreen === 'alianca' && (
          <AliancaScreen
            onGoToDestino={() => setCurrentScreen('destino')}
            onOpenDossier={(doc) => setSelectedDossier(doc)}
            setCollectiveTurbidity={setCollectiveTurbidity}
            collectiveTurbidity={collectiveTurbidity}
          />
        )}

        {currentScreen === 'destino' && (
          <DestinoScreen
            onOpenLog={() => setIsLogOpen(true)}
            onSelectEnding={(route) => setEndingRoute(route)}
            collectiveTurbidity={collectiveTurbidity}
            setCollectiveTurbidity={setCollectiveTurbidity}
          />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />

      {/* Modals */}
      <DossierModal
        dossier={selectedDossier}
        onClose={() => setSelectedDossier(null)}
      />

      <EndingModal
        routeType={endingRoute}
        onRestart={handleRestartTimeline}
        onClose={() => setEndingRoute(null)}
        playerName={playerName}
      />

      {isSaveOpen && (
        <MemoryModal
          onClose={() => setIsSaveOpen(false)}
          currentScreen={currentScreen}
          collectiveTurbidity={collectiveTurbidity}
          playerName={playerName}
          setPlayerName={setPlayerName}
          onLoadState={handleLoadSaveState}
        />
      )}

      {isLogOpen && (
        <LogModal
          onClose={() => setIsLogOpen(false)}
          logs={logs}
        />
      )}
    </div>
  );
}
