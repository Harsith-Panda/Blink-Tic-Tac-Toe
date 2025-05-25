import { EMOJI_CATEGORIES } from "../utility/emojis.ts";

type EmojiCategory = keyof typeof EMOJI_CATEGORIES;

type Props = {
  onSelect: (category: EmojiCategory, player: 1 | 2) => void;
  selectedCategories: Record<1 | 2, EmojiCategory>;
};

export default function EmojiSelector({ onSelect, selectedCategories }: Props) {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
        Choose Your Emoji Category
      </h2>
      {[1, 2].map((player) => (
        <div key={player} className="space-y-4">
          <p className="text-lg font-medium text-center">Player {player}:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
            {(Object.keys(EMOJI_CATEGORIES) as EmojiCategory[]).map(
              (category) => {
                const isSelected = selectedCategories[player] === category;
                return (
                  <button
                    key={category}
                    onClick={() => onSelect(category, player as 1 | 2)}
                    className={`w-full px-4 py-3 rounded-xl text-center font-medium capitalize transition border-2 ${
                      isSelected
                        ? "border-blue-600 bg-blue-100 text-blue-800"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                );
              },
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
