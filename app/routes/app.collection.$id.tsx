import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getCollectionById } from '~/storage.server/collection-storage';
import { fetchJokeByIdFromApi } from '~/lib/jokeApi';
import { JokeCard } from '~/components/joke';
import {  Joke } from '~/models/joke';

export async function loader({ params }: LoaderFunctionArgs) {
    const collectionId = params['id'];

    if (!collectionId) {
        throw new Error('404');
    }

    const collection = await getCollectionById(collectionId);
    if (!collection) {
        throw new Error('Collection not found');
    }

    const filteredJokes = await Promise.all(
        collection.jokes.map(jokeId => fetchJokeByIdFromApi(jokeId.toString()))
    );

    return { collection, collectionJokes: filteredJokes };
}

export default function CollectionDetail() {
    const data = useLoaderData<typeof loader>();
    const { collection, collectionJokes: jokes } = data;

    if (!collection) {
        return <h1>Oops, we could not find your collection</h1>;
    }

    return (
        <main className="min-h-screen p-10 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white">
            <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
                <h2 className="text-2xs mb-1 text-center">Collection</h2>
                <h1 className="text-4xl font-bold mb-8 text-center">List of Jokes</h1>
                <div className="space-y-6">
                    {jokes.length ? (
                        jokes.map((joke: Joke) => (
                            <JokeCard key={joke.id} joke={joke} allCollections={[]} />
                        ))
                    ) : (
                        <p>There are no jokes in this collection!</p>
                    )}
                </div>
            </div>
        </main>
    );
}