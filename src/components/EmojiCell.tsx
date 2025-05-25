type Props = {
  emoji: string | null;
  onClick: () => void;
};

export default function EmojiCell({ emoji, onClick }: Props) {
  return (
    <button
      className="w-24 h-24 border border-gray-400 bg-white text-5xl flex items-center justify-center rounded-xl transition hover:bg-gray-100"
      onClick={onClick}
      disabled={!!emoji}
      style={{
        fontFamily:
          "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif",
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {emoji}
    </button>
  );
}
