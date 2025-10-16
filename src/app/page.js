"use client";

/*
  HomePage.jsx
  ------------
  Displays all user posts as social cards with:
   - username, avatar, post content, like count
   - "Like" button functionality
   - Clean Tailwind-based styling and layout
   - Navigation bar consistent with AddPostPage

  ⚡ Minor visual polish added:
     - better card spacing & alignment
     - subtle hover effects
     - improved typography & shadows
*/

import { useState, useEffect } from "react";
import useLocalStorage from "../lib/useLocalStorage";
import samplePosts from "../lib/sampleData";
import PostCard from "../components/PostCard";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useLocalStorage("posts", samplePosts);

  // Handle Like button click
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  // Ensure posts are updated when localStorage changes
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("posts"));
    if (stored) setPosts(stored);
  }, []);

  return (
    <main className="min-h-screen bg-slate-700 text-gray-100">
      {/* 🧭 Navigation Bar */}
      <nav className="bg-slate-800 text-gray-100 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-400 tracking-wide">Vibe Hive</h1>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <Link href="/add-post" className="hover:text-amber-400 transition-colors">
            Add Post
          </Link>
        </div>
      </nav>

      {/* 🧱 Main Feed */}
      <section className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-amber-400">Latest Posts</h2>

        {posts.length === 0 ? (
          <p className="text-gray-400 italic">No posts yet — add one to get started!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="transition-transform transform hover:scale-[1.01]"
              >
                <PostCard post={post} onLike={() => handleLike(post.id)} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✨ Footer */}
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-slate-600 mt-10">
        © {new Date().getFullYear()} Vibe Hive — Made with ❤️ for learning
      </footer>
    </main>
  );
}