import { useState } from "react";
import GameBoard from "./components/Board";
import EmojiSelector from "./components/EmojiSelector";
import GameControls from "./components/GameControls";
import { EMOJI_CATEGORIES, BOARD_SIZE } from "./utility/emojis.ts";
import { checkWinner } from "./utility/logic.ts";
import useSound from "use-sound";
import placeSound from "./assets/sounds/place.mp3";
import winSound from "./assets/sounds/win.mp3";

type Cell = { emoji: string; player: number } | null;
const emptyBoard: Cell[][] = Array.from({ length: BOARD_SIZE }, () =>
  Array(BOARD_SIZE).fill(null),
);

type Placement = { row: number; col: number };

function App() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [emojiQueues, setEmojiQueues] = useState<{
    [key: number]: Placement[];
  }>({ 1: [], 2: [] });
  const [playerEmojis, setPlayerEmojis] = useState<{ [key: number]: string[] }>(
    { 1: [], 2: [] },
  );
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: number]: string;
  }>({});
  const [categoriesSelected, setCategoriesSelected] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);

  const [playPlace] = useSound(placeSound);
  const [playWin] = useSound(winSound);

  const handleCategorySelect = (
    category: "animals" | "food" | "sports",
    player: number,
  ) => {
    setPlayerEmojis((prev) => ({
      ...prev,
      [player]: EMOJI_CATEGORIES[category],
    }));
    setSelectedCategories((prev) => ({ ...prev, [player]: category }));
    if (player === 2) setCategoriesSelected(true);
  };

  const handleCellClick = (row: number, col: number) => {
    if (winner || board[row][col] !== null) return;

    const emojiPool = playerEmojis[currentPlayer];
    const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];

    const updatedBoard = board.map((row) => [...row]);
    const updatedQueue = [...emojiQueues[currentPlayer]];

    if (updatedQueue.length >= 3) {
      const oldest = updatedQueue.shift();
      if (oldest) {
        updatedBoard[oldest.row][oldest.col] = null;
      }
    }

    updatedBoard[row][col] = { emoji, player: currentPlayer };
    updatedQueue.push({ row, col });

    setBoard(updatedBoard);
    setEmojiQueues((prev) => ({ ...prev, [currentPlayer]: updatedQueue }));

    playPlace();

    if (checkWinner(updatedBoard, currentPlayer)) {
      playWin();
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer(1);
    setEmojiQueues({ 1: [], 2: [] });
    setCategoriesSelected(false);
    setWinner(null);
    setPlayerEmojis({ 1: [], 2: [] });
    setSelectedCategories({});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center space-y-6 animate-fadeIn">
      <h1 className="text-4xl font-bold text-blue-700 animate-bounce">
        🎮 Blink Tac Toe
      </h1>

      {!categoriesSelected ? (
        <EmojiSelector
          onSelect={handleCategorySelect}
          selectedCategories={selectedCategories}
        />
      ) : (
        <>
          <div className="flex justify-between w-full max-w-md mb-4">
            <div className="bg-white shadow-md rounded-lg p-3 w-1/2 mr-2 transition-transform duration-300 hover:scale-105">
              <h2 className="font-semibold text-lg text-center">Player 1</h2>
              <p className="text-center capitalize">{selectedCategories[1]}</p>
              <div className="flex justify-center mt-2 space-x-1">
                {playerEmojis[1].map((e) => (
                  <span key={e}>{e}</span>
                ))}
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-3 w-1/2 ml-2 transition-transform duration-300 hover:scale-105">
              <h2 className="font-semibold text-lg text-center">Player 2</h2>
              <p className="text-center capitalize">{selectedCategories[2]}</p>
              <div className="flex justify-center mt-2 space-x-1">
                {playerEmojis[2].map((e) => (
                  <span key={e}>{e}</span>
                ))}
              </div>
            </div>
          </div>

          <GameBoard board={board} onCellClick={handleCellClick} />
          <GameControls
            currentPlayer={currentPlayer}
            winner={winner}
            onRestart={resetGame}
          />
        </>
      )}
    </div>
  );
}

export default App;
