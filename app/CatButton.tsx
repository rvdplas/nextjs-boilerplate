"use client";

import { useState } from "react";

export default function CatButton() {
  const [errorInterval, setErrorInterval] = useState<number>(0);
    const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchCatFact() {
    try {

        setErrorInterval(errorInterval+1);
      setLoading(true);
      setFact(null);
      const res = await fetch("https://catfact.ninja/fact");
      const data = await res.json();
      setFact(data.fact);

            if(errorInterval === 3)
      {
        setErrorInterval(0);
        throw new Error("Intentional error after 3 fetches");
      }

    } catch (err) {
      setFact("❌ Failed to fetch cat fact");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <button
        onClick={fetchCatFact}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Get Random Cat Fact 🐱"}
      </button>

      {fact && (
        <p className="mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-900 text-sm font-mono text-center">
          {fact}
        </p>
      )}
    </div>
  );
}
