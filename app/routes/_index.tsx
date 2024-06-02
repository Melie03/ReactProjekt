import { useEffect, useState } from 'react';
import { Joke } from '../lib/jokeApi'; // Importiere den Joke-Typ
import { fetchRandomJokeFromApi } from '../lib/jokeApi'; // Importiere die Funktion zum Abrufen eines zufälligen Witzes

export default function Page() {
  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    const getJoke = async () => {
      try {
        const jokeData = await fetchRandomJokeFromApi();
        setJoke(jokeData);
      } catch (error) {
        console.error('Failed to fetch joke:', error);
      }
    };

    getJoke();
  }, []);

  return (
    <main className="h-screen p-10 flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="max-w-2xl bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Joke of the Day</h1>
        {joke ? (
          <div>
            <p className="text-xl italic">{joke.setup}</p>
            <p className="text-2xl font-semibold mt-4 italic">{joke.punchline}</p>
          </div>
        ) : (
          <p className="text-xl">Loading...</p>
        )}
      </div>
    </main>
  );
}
