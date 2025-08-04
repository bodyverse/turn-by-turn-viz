import { CARD_WIDTH, CARD_HEIGHT } from './Card';

export default function CardPlaceholder() {
    return (
        <div
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            className="border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm rounded"
        >
            Empty
        </div>
    );
}
