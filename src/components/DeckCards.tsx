import Card from './Card';
import CardPlaceholder from './CardPlaceholder';

type Props = {
    deck: Record<string, any>[];
    onRemove: (card: Record<string, any>) => void;
    maxCards: number;
    showRemove?: boolean;
};

export default function DeckCards({ deck, onRemove, maxCards, showRemove }: Props) {
    const placeholders = maxCards - deck.length;

    return (
        <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 w-max pb-5 app-side-padding">
                {deck.map((card, i) => (
                    <Card
                        key={card.name + "card" + i}
                        move={card}
                        onClick={() => { }}
                        onRemove={() => onRemove(card)}
                        showRemove={showRemove}
                    />
                ))}

                {Array.from({ length: placeholders }).map((_, i) => (
                    <CardPlaceholder key={`placeholder-${i}`} />
                ))}
            </div>
        </div>
    );
}
