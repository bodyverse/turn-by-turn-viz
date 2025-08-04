import { CARD_WIDTH, CARD_HEIGHT } from './Card';

type Props = {
    move: Record<string, any>;
    onClick?: () => void;
    isSelected?: boolean;
    disabled?: boolean;
};

export default function CardListItem({
    move,
    onClick,
    isSelected = false,
    disabled = false,
}: Props) {
    const imageUrl = move.image || move.Image || null;
    const filteredEntries = Object.entries(move).filter(
        ([key]) => key.toLowerCase() !== 'move id'
    );

    return (
        <div
            onClick={() => {
                if (!disabled && onClick) onClick();
            }}
            className={`relative flex items-center gap-4 p-3 border rounded-[5px] transition-all duration-300 ${isSelected
                ? 'bg-gray-400 border-gray-600 shadow-sm'
                : 'bg-white border-gray-200 hover:shadow'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {/* ✅ Tick icon */}
            {isSelected && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow">
                    ✔
                </div>
            )}

            {/* ✅ Image or placeholder */}
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Move"
                    className="w-20 h-20 object-cover rounded-[5px] flex-shrink-0"
                />
            ) : (
                <div
                    style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                    className="w-20 h-20 flex items-center justify-center rounded-[5px] border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 text-xs flex-shrink-0"
                >
                    IMAGE
                </div>
            )}

            <div className="flex flex-col justify-center text-sm text-gray-800">
                {filteredEntries.slice(0, 4).map(([key, value], i) => {
                    const isNumeric = !isNaN(parseFloat(value)) && isFinite(value as number);
                    return (
                        <div key={i} className="flex justify-between gap-2 text-xs sm:text-sm">
                            {isNumeric ? (
                                <>
                                    <span className="uppercase text-gray-600">{key.slice(0, 3)}</span>
                                    <span className="font-bold">{value}</span>
                                </>
                            ) : (
                                <span className="font-bold truncate">{value}</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
