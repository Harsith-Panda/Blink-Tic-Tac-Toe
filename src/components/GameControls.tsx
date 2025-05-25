type Props = {
  currentPlayer: number;
  winner: number | null;
  onRestart: () => void;
};

export default function GameControls({
  currentPlayer,
  winner,
  onRestart,
}: Props) {
  return (
    <div className="mt-4 text-center">
      {winner !== null ? (
        <>
          <h2 className="text-2xl">Player {winner} Wins!</h2>
          <button
            onClick={onRestart}
            className="mt-2 px-4 py-2 bg-green-600 text-white"
          >
            Play Again
          </button>
        </>
      ) : (
        <h2 className="text-lg">Player {currentPlayer}'s Turn</h2>
      )}
    </div>
  );
}
