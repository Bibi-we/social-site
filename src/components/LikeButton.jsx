"use client";

/**
 * LikeButton Component
 * -------------------
 * Displays a heart icon with the number of likes.
 * Handles click events to increment likes.
 *
 * Props:
 * - likes: number of likes for the post
 * - onClick: function to call when the button is clicked
 */

export default function LikeButton({ likes, onClick }) {
  return (
    <button
      // Tailwind styling: flex row, gap, background hover effect, rounded corners
      className="flex items-center gap-1 px-3 py-1 bg-slate-500 hover:bg-slate-400 rounded text-gray-100 transition-colors duration-200"
      onClick={onClick} // Trigger the parent's onLike function
    >
      {/* Heart icon (can also use an SVG or emoji) */}
      <span className="text-red-400 text-lg">❤️</span>

      {/* Display the current number of likes */}
      <span className="text-sm font-medium">{likes}</span>
    </button>
  );
}