export type Joke = {
    id: string;
    type: string;
    setup: string;
    punchline: string;
  };
  
  /* Fetch Jokes from the API */
  export const fetchRandomJokeFromApi = async (): Promise<Joke> => {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!response.ok) {
      throw new Error('Failed to fetch a random joke');
    }
    const joke = await response.json();
    joke.id = joke.id.toString(); // ID in String umwandeln
    return joke;
  };
  
export const fetchTenRandomJokesFromApi = async (): Promise<Joke[]> => {
    const response = await fetch('https://official-joke-api.appspot.com/random_ten');
    if (!response.ok) {
        throw new Error('Failed to fetch ten random jokes');
    }
    const jokes = await response.json();
    return jokes.map((joke: Joke) => ({ ...joke, id: joke.id.toString() })); // IDs in Strings umwandeln
};
  
  export const fetchJokeByIdFromApi = async (id: string): Promise<Joke> => {
    const response = await fetch(`https://official-joke-api.appspot.com/jokes/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch joke with id ${id}`);
    }
    const joke = await response.json();
    joke.id = joke.id.toString(); // ID in String umwandeln
    return joke;
  };
  
export const fetchJokesByTypeFromApi = async (type: string): Promise<Joke[]> => {
    const response = await fetch(`https://official-joke-api.appspot.com/jokes/${type}/ten`);
    if (!response.ok) {
        throw new Error(`Failed to fetch jokes of type ${type}`);
    }
    const jokes = await response.json();
    return jokes.map((joke: Joke) => ({ ...joke, id: joke.id.toString() })); // IDs in Strings umwandeln
};
  