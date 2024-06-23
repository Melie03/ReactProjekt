import { queryOptions } from '@tanstack/react-query';
import { Collection } from '~/models/collection';

export async function fetchCollections() {
    const response = await fetch('/api/collections');
    const collection: Collection[] = await response.json();
    return collection;
}

export async function createCollection(title: string) {
    const response = await fetch('/api/collections', {
        method: 'POST',
        body: JSON.stringify({ title: title }),
    });
    const newCollection: Collection = await response.json();

    return newCollection;
}

export const collectionQueryOptions = queryOptions({
    queryKey: ['collections'],
    queryFn: () => fetchCollections(),
});
