import EmojiCell from "./EmojiCell";

type Cell = { emoji: string; player: number } | null;

export default function GameBoard({
  board,
  onCellClick,
}: {
  board: Cell[][];
  onCellClick: (r: number, c: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <EmojiCell
            key={`${rowIndex}-${colIndex}`}
            emoji={cell?.emoji ?? null}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        )),
      )}
    </div>
  );
}
