import { json } from '@remix-run/react';
import { getAllCollections } from '~/storage.server/collection-storage';

export async function loader() {
    const playlists = await getAllCollections();
    return json(playlists, 200);
}
