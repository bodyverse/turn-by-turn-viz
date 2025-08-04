type Props = {
    playerOneScore: number;
    playerTwoScore: number;
};

export default function ScoreBoard({ playerOneScore, playerTwoScore }: Props) {
    return (
        <div className="text-white text-xl font-bold">
            {playerOneScore} — {playerTwoScore}
        </div>
    );
}
