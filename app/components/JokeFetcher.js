"use client";
import { useState } from "react";

export default function JokeFetcher() {
    const [category, setCategory] = useState('Programming');
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const categories = ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
  
    const fetchJoke = async () => {
      setLoading(true);
      setError(null);
      setJoke(null);
  
      try {
        const response = await fetch (`https://v2.jokeapi.dev/joke/${category}?type=single`);
        const data = await response.json();
  
        if(data.error)
          {
            throw new Error ('Failed to fetch a joke. Please try again later.');
          }
          setJoke(data.joke);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Joke Fetcher</h1>
            <div className="mb-4">
                <label htmlFor="categotry" className="block text-sm font-medium text-gray-700 mb-2">
                    Select category
                </label>
                <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <button
            onClick={fetchJoke}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition-colors duration-200`}>
                {loading ? "Fetching...": "Get a Joke"}
            </button>
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {joke && (
                <div className="mt-4 p-4 bg-green-100 text-gray-800 rounded-md">
                    <p className="text-lg">{joke}</p>
                </div>
            )}
        </div>
    </div>
  );
}
