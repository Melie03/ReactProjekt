import {Joke} from "~/models/joke";
import {useState} from "react";

type JokeInput = {
    joke: Joke;
};

export function JokeCard({ joke, allCollections }) {
    const [selectedCollections, setSelectedCollections] = useState<{ [key: string]: string }>({});


    const handleSelectionChange = (jokeId, newValue) => {
        setSelectedCollections(prev => ({
            ...prev,
            [jokeId]: newValue
        }));
    };

    const handleAddToCollection = (joke: Joke) => {
        const collection = selectedCollections[joke.id];
        if (collection) {
            console.log(`Adding joke to ${collection}`, joke);
        } else {
            alert("Please select a collection first.");
        }
    };

    //const collections = ["Favorite Jokes", "Programming Jokes", "Random Jokes"];
    const collections = allCollections;

    return (
        <div key={joke.id} className="p-4 bg-white bg-opacity-30 rounded-lg shadow-md">
            <p className="text-xl italic">{joke.setup}</p>
            <p className="text-2xl font-semibold mt-2 italic">{joke.punchline}</p>
            <div className="mt-4">
                <label htmlFor={`select-${joke.id}`} className="block mb-2">Add to Collection:</label>
                <select
                    id={`select-${joke.id}`}
                    value={selectedCollections[joke.id] || ""}
                    onChange={(e) => handleSelectionChange(joke.id, e.target.value)}
                    className="p-2 bg-white text-black rounded"
                >
                    <option value="">Select a collection</option>
                    {collections.map((collection) => (
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
        </div>
    )
}