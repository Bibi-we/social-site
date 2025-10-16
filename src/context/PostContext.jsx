

"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PostContext = createContext();

// Provider component wraps the app
export function PostProvider({ children }) {
  // State: posts array, initially from localStorage
  const [posts, setPosts] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("posts");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Sync posts to localStorage whenever posts state changes
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Function to add a new post
  function addPost(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  // Function to like a post
  function likePost(id) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  }

  return (
    <PostContext.Provider value={{ posts, addPost, likePost }}>
      {children}
    </PostContext.Provider>
  );
}

// Custom hook for consuming the context easily
export function usePosts() {
  return useContext(PostContext);
}