"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "../../lib/useLocalStorage";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function AddPostPage() {
  const router = useRouter();

  // 🧠 Retrieve current posts from localStorage
  const [posts, setPosts] = useLocalStorage("posts", []);

  // 📝 Controlled form fields
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [content, setContent] = useState("");

  // 🧩 Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚨 Validation: username & content required
    if (!username.trim() || !content.trim()) {
      toast.error("Please enter both username and content!");
      return;
    }

    // ✅ Create a new post object (consistent with HomePage and PostCard)
    const newPost = {
      id: Date.now(), // unique ID based on timestamp
      username: username.trim(),
      avatarUrl: avatarUrl.trim() || null,
      content: content.trim(),
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    // 🧠 Add new post to the beginning of the array
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // 🎉 Show success notification and redirect
    toast.success("Post added successfully!");
    setTimeout(() => router.push("/"), 1500);

    // 🧹 Clear form fields
    setUsername("");
    setAvatarUrl("");
    setContent("");
  };

  return (
    <main className="min-h-screen bg-slate-700 text-gray-100">
      {/* 🔔 Toast container for notifications */}
      <Toaster position="top-right" />

      {/* 🧭 Navigation bar (consistent with homepage) */}
      <nav className="bg-slate-800 text-gray-100 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-amber-400">Vibe Hive</h1>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <Link href="/add-post" className="hover:text-amber-400 transition-colors">
            Add Post
          </Link>
        </div>
      </nav>

      {/* 🗒️ Form Section */}
      <section className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add a New Post</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-6 rounded-lg shadow-md space-y-4"
        >
          {/* Username Input */}
          <label className="block">
            <span className="text-sm font-medium">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 rounded bg-slate-700 text-gray-100 border border-slate-600"
              placeholder="Your name"
            />
          </label>

          {/* Avatar URL Input */}
          <label className="block">
            <span className="text-sm font-medium">Avatar URL (optional)</span>
            <input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mt-1 block w-full p-2 rounded bg-slate-700 text-gray-100 border border-slate-600"
              placeholder="https://..."
            />
          </label>

          {/* Content Textarea */}
          <label className="block">
            <span className="text-sm font-medium">Post Content</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="mt-1 block w-full p-2 rounded bg-slate-700 text-gray-100 border border-slate-600"
              placeholder="What’s on your mind?"
            />
          </label>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded hover:bg-amber-400 transition"
            >
              Add Post
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-4 py-2 border border-slate-500 rounded hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}