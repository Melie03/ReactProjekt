import {Joke} from '~/models/joke';
import {Collection} from '~/models/collection';
import {useState} from 'react';
import {Heart} from 'lucide-react';
import {dislikeAction, likeAction} from '~/store.client/like-reducer';
import {useAppDispatch, useAppSelector} from '~/store.client/store';
import {addJokesToCollection} from '~/apis/collection-api';

type JokeCardProps = {
    joke: Joke;
    allCollections: Collection[];
};

export function JokeCard({joke, allCollections}: JokeCardProps) {
    const [selectedCollections, setSelectedCollections] = useState<{ [key: string]: string }>({});
    const dispatch = useAppDispatch();
    const currentLikedJokes = useAppSelector((state) => state.joke.jokeIdArray);
    const [isAdded, setIsAdded] = useState(false);
    const handleSelectionChange = (jokeId: string, newValue: string) => {
        setSelectedCollections((prev) => ({
            ...prev,
            [jokeId]: newValue,
        }));
    };

    const handleAddToCollection = async (joke: Joke) => {
        const collectionId = selectedCollections[joke.id];
        console.log(allCollections)
        const collection = allCollections.find(col => col.id === collectionId);
        if (collection && collectionId) {
            console.log(`Adding joke to ${collection}`, joke);
            collection.jokes.push(joke.id);
            console.log(collection);
            const updated = await addJokesToCollection(collectionId, collection.jokes)
            console.log(updated);
            setIsAdded(true);
        } else {
            alert('Please select a collection first.');
        }
    };

    const checkForJokeInCollection = () => {
        const collectionIWant = allCollections.filter(collection => collection.jokes.some(j => j.includes(joke.id)))
            .map(collection => collection.title);
        return collectionIWant;
    }

    const likeButtonClicked = () => {
        dispatch(likeAction({jokeId: joke.id}));
    };

    const dislikeButtonClicked = () => {
        console.log('disliked');
        dispatch(dislikeAction({jokeId: joke.id}));
    };

    const isCurrentlyLiked = currentLikedJokes?.includes(joke.id) ?? false; // Sicherstellen, dass currentLikedJokes nicht null ist

    return (
        <div key={joke.id} className="p-4 bg-white bg-opacity-30 rounded-lg shadow-md">
            <div className="flex" style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                <p className="text-xl italic">{joke.setup}</p>
                {isCurrentlyLiked ? (
                    <Heart onClick={dislikeButtonClicked} fill="red"/>
                ) : (
                    <Heart onClick={likeButtonClicked}/>
                )}
            </div>
            <p className="text-2xl font-semibold mt-2 italic">{joke.punchline}</p>
            {(allCollections.length > 0 && checkForJokeInCollection().length == 0 && !isAdded) ? (
                <div className="mt-4">
                    <label htmlFor={`select-${joke.id}`} className="block mb-2">Add to Collection:</label>
                    <select
                        id={`select-${joke.id}`}
                        value={selectedCollections[joke.id] || ''}
                        onChange={(e) => handleSelectionChange(joke.id, e.target.value)}
                        className="p-2 bg-white text-black rounded"
                    >
                        <option value="">Select a collection</option>
                        {allCollections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.title}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => handleAddToCollection(joke)}
                        className="ml-2 p-2 rounded text-white bg-green-500"
                    >
                        Add
                    </button>
                </div>
            ) : null}
            {(checkForJokeInCollection().length>0) ? (
                <div>
                    <p className="block mt-4 mb-2">In Collection: {checkForJokeInCollection()[0]}</p>
                </div>
            ) : null}
        </div>
    );
}
