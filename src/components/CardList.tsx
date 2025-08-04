import CardListItem from './CardListItem';

type Props = {
    cards: Record<string, any>[];
    selectedMoves?: Record<string, any>[];
    onSelect: (card: Record<string, any>) => void;
    maxReached?: boolean;
};

export default function CardList({
    cards,
    selectedMoves = [],
    onSelect,
    maxReached = false,
}: Props) {
    return (
        <div className="relative pt-10 pb-10 app-side-padding">
            <div
                className={`
                    grid gap-5
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                `}
            >
                {cards.map((card, i) => {
                    const isSelected = selectedMoves.includes(card);
                    return (
                        <CardListItem
                            key={`card_${i}`}
                            move={card}
                            onClick={() => onSelect(card)}
                            isSelected={isSelected}
                            disabled={maxReached && !isSelected}
                        />
                    );
                })}
            </div>

            {/* ✅ Overlay after the list */}
            {maxReached && (
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
            )}
        </div>
    );
}
