import { EMOJI_CATEGORIES } from "../utility/emojis.ts";

type EmojiCategory = keyof typeof EMOJI_CATEGORIES;

type Props = {
  onSelect: (category: EmojiCategory, player: 1 | 2) => void;
  selectedCategories: Record<1 | 2, EmojiCategory>;
};

export default function EmojiSelector({ onSelect, selectedCategories }: Props) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">
        Select Emoji Categories
      </h2>
      {[1, 2].map((player) => (
        <div key={player} className="flex flex-col items-center space-y-2">
          <p className="text-lg font-medium text-gray-600">Player {player}:</p>
          <div className="flex space-x-4">
            {(Object.keys(EMOJI_CATEGORIES) as EmojiCategory[]).map(
              (category) => {
                const isSelected =
                  selectedCategories[player as 1 | 2] === category;
                return (
                  <button
                    key={category}
                    onClick={() => onSelect(category, player as 1 | 2)}
                    className={`px-4 py-2 rounded-lg border-2 transition duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-100 text-blue-700 font-semibold"
                        : "border-gray-300 hover:border-blue-400"
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
