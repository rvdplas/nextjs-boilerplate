"use client";

import { useState } from "react";

export interface DogApiResponse {
  message: string; // URL of the dog image
  status: string;  // e.g. "success"
}

export default function DogButton() {
  const [errorInterval, setErrorInterval] = useState<number>(0);

  const [dogData, setDogData] = useState<DogApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchDogImage() {
    try {
      setErrorInterval(errorInterval+1);

      setLoading(true);
      setDogData(null);
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data: DogApiResponse = await res.json();
      setDogData(data);

      if(errorInterval === 3)
      {
        setErrorInterval(0);
        throw new Error("Intentional error after 3 fetches");
      }
    } catch (err) {
      setDogData({
        status: "error",
        message: "❌ Failed to fetch dog image",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <button
        onClick={fetchDogImage}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Get Random Dog image"}
      </button>

      {/* {dogData && dogData.status === "success" && (
        <img src={dogData.message} alt="Random Dog" className="mt-2 border rounded" />
      )} */}

      {dogData && (
        dogData.status === "success" ? (
          <img
            src={dogData.message}
            alt="Random Dog"
            className="mt-2 border rounded"
          />
        ) : (
          <p className="mt-2 text-red-600">
            ❌ Failed to fetch dog image: {dogData.message}
          </p>
        )
      )}
    </div>
  );
}
