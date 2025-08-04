import { useEffect, useState } from 'react';
import { fetchSheet } from './utils/fetchSheet';
import SelectMoves from './pages/PageSelectMoves';
import PageGame from './pages/PageGame';
import { LayoutProvider } from './contexts/LayoutContext';

const DEFAULT_MAX_CARDS = 5;

type Phase = 'select-1' | 'select-2' | 'battle';

function App() {
  const [cards, setCards] = useState<Record<string, any>[]>([]);
  const [phase, setPhase] = useState<Phase>('select-1');

  const [playerOneDeck, setPlayerOneDeck] = useState<Record<string, any>[]>([]);
  const [playerTwoDeck, setPlayerTwoDeck] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    (async () => {
      const cardData = await fetchSheet<Record<string, any>>('Moves');
      setCards(cardData);
    })();
  }, []);

  const handleSelectionComplete = (selected: Record<string, any>[]) => {
    if (phase === 'select-1') {
      setPlayerOneDeck(selected);
      setPhase('select-2');
    } else if (phase === 'select-2') {
      setPlayerTwoDeck(selected);
      setPhase('battle');
    }
  };

  const resetGame = () => {
    setPhase('select-1');
    setPlayerOneDeck([]);
    setPlayerTwoDeck([]);
  };

  return (
    <LayoutProvider>
      <div className="w-screen mx-auto flex flex-col items-start">
        {/* 🔁 Restart button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={resetGame}
            className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded shadow text-sm font-medium"
          >
            Restart
          </button>
        </div>

        {/* 👇 Phase control */}
        {phase === 'select-1' && (
          <SelectMoves
            listMoves={cards}
            playerNumber={1}
            maxCards={DEFAULT_MAX_CARDS}
            onSelectionComplete={handleSelectionComplete}
          />
        )}

        {phase === 'select-2' && (
          <SelectMoves
            listMoves={cards}
            playerNumber={2}
            maxCards={DEFAULT_MAX_CARDS}
            onSelectionComplete={handleSelectionComplete}
          />
        )}

        {phase === 'battle' && (
          <PageGame
            playerOneDeck={playerOneDeck}
            playerTwoDeck={playerTwoDeck}
            onRestart={resetGame}
          />
        )}
      </div>
    </LayoutProvider>
  );
}

export default App;
