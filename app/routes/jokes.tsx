import { useEffect, useState } from 'react';
import { Joke } from '../lib/jokeApi';
import { fetchTenRandomJokesFromApi } from '../lib/jokeApi';
import {JokeCard} from "~/components/joke";
import {collectionQueryOptions} from "~/apis/collection-api";
import {useQuery} from "@tanstack/react-query";



const Jokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, isSuccess, isLoading } = useQuery(collectionQueryOptions);



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



  return (
      <main className="min-h-screen p-10 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center">List of Jokes</h1>
          {loading && isLoading ? (
              <p className="text-xl text-center">Loading...</p>
          ) : (
              <div className="space-y-6">
                {jokes.map((joke) => (
                    // eslint-disable-next-line react/jsx-key
                    <JokeCard joke={joke} allCollections={data}></JokeCard>
                ))}
              </div>
          )}
        </div>
      </main>
  );
};

export default Jokes;
