import { useEffect, useState } from 'react';
import { useOrientation } from '../contexts/LayoutContext';
import Card, { CARD_WIDTH, CARD_HEIGHT } from '../components/Card';
import CardPlaceholder from '../components/CardPlaceholder';

export default function PageGame({ playerOneDeck, playerTwoDeck, onRestart }: {
    playerOneDeck: Record<string, any>[];
    playerTwoDeck: Record<string, any>[];
    onRestart: () => void;
}) {
    const [currentTurn, setCurrentTurn] = useState<1 | 2>(1);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [playedCards, setPlayedCards] = useState<{ p1: any | null; p2: any | null }>({ p1: null, p2: null });
    const [playedIndices, setPlayedIndices] = useState<{ p1: Set<number>; p2: Set<number> }>({
        p1: new Set(),
        p2: new Set(),
    });
    const [round, setRound] = useState(0);
    const [score, setScore] = useState({ p1: 0, p2: 0 });
    const [showResult, setShowResult] = useState(false);

    const totalRounds = playerOneDeck.length;
    const isGameOver = round >= totalRounds;
    const currentDeck = currentTurn === 1 ? playerOneDeck : playerTwoDeck;
    const selectedCard = selectedCardIndex !== null ? currentDeck[selectedCardIndex] : null;

    const orientation = useOrientation();

    const handleCardSelect = (index: number) => {
        setSelectedCardIndex(prev => prev === index ? null : index);
    };

    const playCard = () => {
        if (selectedCardIndex === null) return;
        const playerKey = `p${currentTurn}` as 'p1' | 'p2';
        const selected = currentDeck[selectedCardIndex];

        setPlayedCards(prev => ({ ...prev, [playerKey]: selected }));
        setPlayedIndices(prev => {
            const updated = new Set(prev[playerKey]);
            updated.add(selectedCardIndex);
            return { ...prev, [playerKey]: updated };
        });
        setSelectedCardIndex(null);

        if (currentTurn === 2) {
            const p1Index = [...playedIndices.p1][playedIndices.p1.size - 1] ?? 0;
            const impact1 = parseFloat(playerOneDeck[p1Index]?.Impact || '0');
            const impact2 = parseFloat(playerTwoDeck[selectedCardIndex]?.Impact || '0');
            if (impact1 > impact2) setScore(s => ({ ...s, p1: s.p1 + 200 }));
            else if (impact2 > impact1) setScore(s => ({ ...s, p2: s.p2 + 200 }));
            setShowResult(true);
        } else {
            setCurrentTurn(2);
        }
    };

    const nextRound = () => {
        setPlayedCards({ p1: null, p2: null });
        setRound(r => r + 1);
        setCurrentTurn(1);
        setShowResult(false);
    };

    const renderDeck = (deck: Record<string, any>[], player: 1 | 2) => {
        const isCurrent = player === currentTurn;
        const playedSet = playedIndices[`p${player}` as 'p1' | 'p2'];
        const dimmed = showResult || (!isCurrent && !isGameOver);

        return (
            <div className="relative w-full md:w-1/2 flex flex-col pt-5 gap-4">
                <h2 className="text-white text-xl app-side-padding">
                    Player {player}: <span className="font-bold">{score[`p${player}`]}</span>
                </h2>
                <div className="overflow-x-auto pb-3">
                    <div className="flex gap-2 pb-2 app-side-padding w-max">
                        {deck.map((card, i) => {
                            const isSelected = isCurrent && selectedCardIndex === i;
                            const isPlayed = playedSet.has(i);

                            return (
                                <div
                                    key={i}
                                    style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                                    onClick={() => isCurrent && handleCardSelect(i)}
                                >
                                    {isPlayed ? (
                                        <CardPlaceholder />
                                    ) : (
                                        <Card
                                            move={card}
                                            onClick={() => { }}
                                            showRemove={false}
                                            selected={isSelected}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {dimmed && (
                    <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
                )}
            </div>
        );
    };

    useEffect(() => {
        if (isGameOver && onRestart) {
            onRestart();
        }
    }, [isGameOver]);

    return (
        <div className="flex flex-col md:flex-col w-full h-screen pb-12">
            <div className="flex flex-col md:flex-row w-full">
                {renderDeck(playerOneDeck, 1)}
                {orientation !== 'portrait' ? (
                    renderDeck(playerTwoDeck, 2)
                ) : null}
            </div>

            <div className="flex-1 relative flex items-center justify-center border border-gray-300 rounded p-4 bg-white shadow-inner mx-4 overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-6 min-w-[300px] z-10">
                    {showResult && (
                        <div className="text-center text-gray-800">
                            <div className="text-xl font-semibold mb-1">
                                {parseFloat(playedCards.p1?.Impact || 0) > parseFloat(playedCards.p2?.Impact || 0)
                                    ? 'Player 1 wins the round!'
                                    : parseFloat(playedCards.p2?.Impact || 0) > parseFloat(playedCards.p1?.Impact || 0)
                                        ? 'Player 2 wins the round!'
                                        : "It's a tie!"}
                            </div>
                            <div className="text-sm text-gray-600">
                                P1 ({playedCards.p1?.Impact || '0'}) Impact&nbsp;
                                {parseFloat(playedCards.p1?.Impact || 0) > parseFloat(playedCards.p2?.Impact || 0)
                                    ? 'is HIGHER than'
                                    : parseFloat(playedCards.p2?.Impact || 0) > parseFloat(playedCards.p1?.Impact || 0)
                                        ? 'is LOWER than'
                                        : 'equals'}&nbsp;
                                P2 ({playedCards.p2?.Impact || '0'})
                            </div>
                        </div>
                    )}

                    <div className="flex gap-8 items-center justify-center">
                        {playedCards.p1 && (
                            <div className="shadow-xl">
                                <Card move={playedCards.p1} />
                            </div>
                        )}
                        {playedCards.p2 && (
                            <div className="shadow-xl">
                                <Card move={playedCards.p2} />
                            </div>
                        )}
                    </div>

                    {showResult && (
                        <button
                            onClick={nextRound}
                            className="bg-purple-600 text-white px-4 py-2 rounded"
                        >
                            Continue
                        </button>
                    )}
                </div>

                {!isGameOver && !showResult && selectedCard && (
                    orientation === 'portrait' ? (
                        <div className={`absolute left-1/2 -translate-x-1/2 z-20 ${currentTurn === 1 ? 'top-4' : 'bottom-4'}`}>
                            <button
                                onClick={playCard}
                                className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                            >
                                Play Card
                            </button>
                        </div>
                    ) : (
                        <div className={`absolute top-4 z-20 ${currentTurn === 1 ? 'left-1/4 -translate-x-1/2' : 'right-1/4 translate-x-1/2'}`}>
                            <button
                                onClick={playCard}
                                className="bg-blue-600 text-white px-4 py-2 rounded shadow"
                            >
                                Play Card
                            </button>
                        </div>
                    )
                )}

                {isGameOver && (
                    <div className="absolute top-6 text-2xl font-bold text-center z-20 text-gray-800">
                        Game Over!{' '}
                        {score.p1 > score.p2
                            ? 'Player 1 wins!'
                            : score.p2 > score.p1
                                ? 'Player 2 wins!'
                                : "It's a tie!"}
                    </div>
                )}
            </div>

            {orientation === 'portrait' && (
                <div className="flex flex-col md:flex-row w-full">
                    {renderDeck(playerTwoDeck, 2)}
                </div>
            )}
        </div>
    );
}
