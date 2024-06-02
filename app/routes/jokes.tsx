import { useEffect, useState } from 'react';
import { Joke } from '../lib/jokeApi'; 
import { fetchTenRandomJokesFromApi } from '../lib/jokeApi'; 

const collections = ["Favorite Jokes", "Programming Jokes", "Random Jokes"];

const Jokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCollection, setSelectedCollection] = useState<string>("");

  useEffect(() => {
    const getJokes = async () => {
      try {
        const jokesData = await fetchTenRandomJokesFromApi();
        setJokes(jokesData);
      } catch (error) {
        console.error('Failed to fetch jokes:', error);
      } finally {
        setLoading(false);
      }
    };

    getJokes();
  }, []);

  const handleAddToCollection = (joke: Joke) => {
    if (selectedCollection) {
      console.log(`Adding joke to ${selectedCollection}`, joke);
    } else {
      alert("Please select a collection first.");
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center">List of Jokes</h1>
        {loading ? (
          <p className="text-xl text-center">Loading...</p>
        ) : (
          <ul className="space-y-6">
            {jokes.map((joke) => (
              <li key={joke.id} className="p-4 bg-white bg-opacity-30 rounded-lg shadow-md">
                <p className="text-xl italic">{joke.setup}</p>
                <p className="text-2xl font-semibold mt-2 italic">{joke.punchline}</p>
                <div className="mt-4">
                  <label className="block mb-2">Add to Collection:</label>
                  <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="p-2 bg-white text-black rounded"
                  >
                    <option value="">Select a collection</option>
                    {collections.map((collection) => (
                      <option key={collection} value={collection}>
                        {collection}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAddToCollection(joke)}
                    className="ml-2 p-2 bg-blue-600 rounded text-white"
                  >
                    Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Jokes;
