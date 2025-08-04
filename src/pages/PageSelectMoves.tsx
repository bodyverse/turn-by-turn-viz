import { useState } from 'react';
import DeckCards from '../components/DeckCards';
import CardList from '../components/CardList';

type Props = {
    listMoves: Record<string, any>[];
    playerNumber?: number;
    maxCards?: number;
    onSelectionComplete: (selected: Record<string, any>[]) => void;
};

const DEFAULT_MAX_CARDS = 5;

export default function SelectMoves({
    listMoves,
    playerNumber = 1,
    maxCards = DEFAULT_MAX_CARDS,
    onSelectionComplete,
}: Props) {
    const [selected, setSelected] = useState<Record<string, any>[]>([]);

    const toggleMove = (move: Record<string, any>) => {
        if (selected.includes(move)) {
            setSelected(selected.filter((m) => m !== move));
        } else if (selected.length < maxCards) {
            setSelected([...selected, move]);
        }
    };

    const maxReached = selected.length >= maxCards;

    return (
        <div className="w-full flex flex-col h-screen gap-5">
            <div className="w-full flex flex-col pt-5 gap-4">
                <h1 className="text-2xl font-semibold mb-2 app-side-padding">
                    <b>Player {playerNumber}</b> [{selected.length}/{maxCards}]
                </h1>

                <DeckCards
                    deck={selected}
                    onRemove={(move) => setSelected(selected.filter((m) => m !== move))}
                    maxCards={maxCards}
                    showRemove
                />

                {maxReached && (
                    <>
                        {/* 🟩 Animated space between deck and card list */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${maxReached ? 'max-h-32 py-4' : 'max-h-0 py-0'
                                }`}
                        >
                            <div className="flex justify-center">
                                <button
                                    onClick={() => onSelectionComplete(selected)}
                                    className="bg-green-600 text-white px-6 py-3 rounded text-lg font-semibold shadow"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div
                className="relative flex-1 border-t overflow-y-auto border-gray-300"
            >
                <CardList
                    cards={listMoves}
                    selectedMoves={selected}
                    onSelect={toggleMove}
                    maxReached={maxReached}
                />
            </div>
        </div>
    );
}
