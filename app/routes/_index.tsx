import { useEffect, useState } from 'react';
import { Joke, fetchRandomJokeFromApi } from '../lib/jokeApi';

const JokeOfTheDay = () => {
  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    const savedJoke = JSON.parse(localStorage.getItem('jokeOfTheDay') || 'null');
    const lastFetchTime = localStorage.getItem('lastFetchTime');

    const shouldFetchNewJoke = !savedJoke || !lastFetchTime || (Date.now() - new Date(lastFetchTime).getTime()) > 86400000;

    if (shouldFetchNewJoke) {
      fetchRandomJokeFromApi().then(newJoke => {
        setJoke(newJoke);
        localStorage.setItem('jokeOfTheDay', JSON.stringify(newJoke));
        localStorage.setItem('lastFetchTime', new Date().toISOString());
      });
    } else {
      setJoke(savedJoke);
    }
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
};

export default JokeOfTheDay;
