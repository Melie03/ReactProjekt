import { useEffect, useState } from 'react';
import {fetchJokeByIdFromApi, Joke} from '../lib/jokeApi';
import { fetchTenRandomJokesFromApi } from '../lib/jokeApi';
import {JokeCard} from "~/components/joke";
import {collectionQueryOptions} from "~/apis/collection-api";
import {useQuery} from "@tanstack/react-query";
import {push} from "micromark-util-chunked";
import {useAppSelector} from "~/store.client/store";



const Jokes = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { data, isSuccess, isLoading } = useQuery(collectionQueryOptions);
    const currentLikedJokes = useAppSelector((state) => {
        return state.joke.jokeIdArray;
    });



    useEffect(() => {
        const getJokes = async () => {
            try {
                loadLikedJokes(currentLikedJokes).then(jokesData => {
                    console.log(jokesData);
                    setJokes(jokesData);
                }).catch(error => {
                    console.error('Error fetching jokes:', error);
                });

            } catch (error) {
                console.error('Failed to fetch jokes:', error);
            } finally {
                setLoading(false);
            }
        };

        getJokes();
    }, []);

    async function loadLikedJokes(currentLikedJokes) {
        if (!currentLikedJokes) return [];
        const jokesData = await Promise.all(
            currentLikedJokes.map(jId => fetchJokeByIdFromApi(jId))
        );
        return jokesData;
    }



    return (
        <main className="min-h-screen p-10 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white">
            <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-8 text-center">List of Liked Jokes</h1>
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
