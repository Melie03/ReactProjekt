import { createFeatureStorage } from './storage-utils';

/* Type of the entities that should be stored */
export type Joke = {
  id: string;
  type: string;
  setup: string;
  punchline: string;
};

/* Create the storage with a unique name */
const jokeStorage = createFeatureStorage<Joke>('joke');

/* Fetch Jokes from the API */

const fetchTenRandomJokesFromApi = async (): Promise<Joke[]> => {
  const response = await fetch('https://official-joke-api.appspot.com/random_ten');
  if (!response.ok) {
    throw new Error('Failed to fetch ten random jokes');
  }
  return response.json();
};

const fetchJokeByIdFromApi = async (id: number): Promise<Joke> => {
  const response = await fetch(`https://official-joke-api.appspot.com/jokes/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch joke with id ${id}`);
  }
  return response.json();
};


/* Expose the functions you need in your application */
export const getAllJokes = async () => {
  const jokes = await fetchTenRandomJokesFromApi();
  jokes.forEach(joke => jokeStorage.create(joke));
  return jokeStorage.getAll();
};

export const getJokeById = async (jokeId: number) => {
  let joke = await fetchJokeByIdFromApi(jokeId);
  if (!joke) {
    joke = await fetchJokeByIdFromApi(jokeId);
    jokeStorage.create(joke);
  }
  return joke;
};

export const createJoke = async (joke: Omit<Joke, 'id'>) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newJoke = { id: Number(id), ...joke };
  return jokeStorage.create(newJoke);
};

export const deleteJoke = async (jokeId: number) => {
  return jokeStorage.delete(jokeId.toString());
};
