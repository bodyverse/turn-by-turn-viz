export const CARD_WIDTH = 80;
export const CARD_HEIGHT = 130;

type Props = {
    move: Record<string, any>;
    onClick?: () => void;
    onRemove?: () => void;
    showRemove?: boolean;
    selected?: boolean;
};

export default function Card({
    move,
    onClick,
    onRemove,
    showRemove = false,
    selected = false,
}: Props) {
    const imageUrl = move.image || move.Image || null;

    const filteredEntries = Object.entries(move).filter(
        ([key]) => key.toLowerCase() !== 'move id'
    );

    return (
        <div
            className="relative flex flex-col items-center"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        >
            {showRemove && onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-md z-10 p-0"
                >
                    <p className="-mt-[5px] text-white text-xl font-bold">x</p>
                </button>
            )}

            <div
                onClick={onClick}
                className={`w-full h-full border rounded shadow-sm transition flex flex-col justify-between overflow-hidden 
                    ${selected ? 'bg-gray-400' : 'bg-white'} 
                    hover:shadow-md`}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="Move" className="object-cover w-full h-full" />
                ) : (
                    <div className="p-2 flex flex-col justify-center gap-1 text-xs text-gray-800">
                        {filteredEntries.slice(0, 4).map(([key, value], i) => {
                            const isNumeric =
                                !isNaN(parseFloat(value)) && isFinite(value as number);
                            return (
                                <div key={i} className="flex justify-between">
                                    {isNumeric ? (
                                        <>
                                            <span className="uppercase text-gray-600">{key.slice(0, 3)}</span>
                                            <span className="font-bold">{value}</span>
                                        </>
                                    ) : (
                                        <span className="font-bold">{value}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
