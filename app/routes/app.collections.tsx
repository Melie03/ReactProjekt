import {useNavigate, Link} from "@remix-run/react";
import {useQuery} from "@tanstack/react-query";
import {collectionQueryOptions} from "~/apis/collection-api";

const AppCollections = () => {

    const navigate = useNavigate();

    const goToNewCollections = () => {
        navigate('/collections/new');
    };

    const { data, isSuccess, isLoading } = useQuery(collectionQueryOptions);


    return (
        <main className="min-h-screen p-10 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white">
            <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-8 text-center">Collections</h1>
                <button onClick={goToNewCollections} className="p-2 bg-blue-500 text-white rounded">
                    Create New Collection
                </button>
                <hr/>
                <br/>
                <div className="space-y-6">
                    {isLoading ? <p className="text-xl text-center">Loading...</p> : null}
                    {isSuccess
                        ? data?.map((collection) => (
                            <div className="p-4 bg-white bg-opacity-30 rounded-lg shadow-md">
                            <Link key={collection.id} to={`/app/collection/${collection.id}`}
                                  className="block">
                                {collection.title}
                            </Link>
                            </div>
                        ))
                        : null}
                </div>
            </div>
        </main>
    );
};

export default AppCollections;
