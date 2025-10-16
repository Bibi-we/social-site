"use client";
/*
  useLocalStorage.js
  -------------------
  Custom React Hook for syncing state with localStorage.

  Works just like useState, but automatically saves and loads data
  from localStorage so it persists across page reloads.
*/

import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // Initialize state with data from localStorage (if available)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // Whenever state changes, update localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("Error setting localStorage key:", key, error);
    }
  }, [key, storedValue]);

  // Return getter and setter, just like useState
  return [storedValue, setStoredValue];
}