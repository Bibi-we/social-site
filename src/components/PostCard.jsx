"use client";

/*
  PostCard.jsx
  -------------
  Displays a single post in a social card layout.

  Includes:
   - avatar (optional)
   - username
   - timestamp (formatted client-side)
   - post content
   - like count with button

  🧠 Hydration Fix:
  To prevent mismatch errors between SSR and client,
  we only render the formatted date AFTER the component
  has mounted on the client.
*/

import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function PostCard({ post, onLike }) {
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  // Wait until the component is mounted on client before formatting the date
  useEffect(() => {
    setMounted(true);
    if (post?.createdAt) {
      try {
        setFormattedDate(format(new Date(post.createdAt), "PPpp"));
      } catch {
        setFormattedDate("Invalid date");
      }
    }
  }, [post?.createdAt]);

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md">
      {/* 🧑 User Info */}
      <div className="flex items-center mb-3">
        {post.avatarUrl ? (
          <img
            src={post.avatarUrl}
            alt={`${post.username}'s avatar`}
            className="w-10 h-10 rounded-full mr-3 border border-slate-600 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full mr-3 bg-slate-600 flex items-center justify-center text-gray-300">
            {post.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <p className="font-semibold text-amber-400">{post.username}</p>
          {/* 🕓 Render date only on client */}
          <p className="text-xs text-gray-400">
            {mounted ? formattedDate : "Loading..."}
          </p>
        </div>
      </div>

      {/* 📝 Post Content */}
      <p className="text-gray-200 mb-3 leading-relaxed">
        {post.content || "No content provided."}
      </p>

      {/* ❤️ Like Section */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onLike}
          className="px-3 py-1 bg-amber-500 text-slate-900 rounded hover:bg-amber-400 transition"
        >
          👍 Like
        </button>
        <span className="text-gray-300 text-sm">{post.likes} likes</span>
      </div>
    </div>
  );
}