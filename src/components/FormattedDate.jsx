"use client";
import { useState, useEffect } from "react";

export default function FormattedDate({ dateString }) {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    if (dateString) {
      setFormatted(new Date(dateString).toLocaleString());
    }
  }, [dateString]);

  return <span className="text-xs text-gray-400">{formatted}</span>;
}