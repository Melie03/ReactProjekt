import { ActionFunctionArgs, json } from '@remix-run/node';
import { addJokesToCollection, createCollection, getAllCollections } from '~/storage.server/collection-storage';

export async function loader() {
  const collections = await getAllCollections();
  return json(collections, 200);
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST' && request.method !== 'PUT') {
    throw new Error(`Method ${request.method} not supported`);
  }

  if (request.method == 'POST') {
    const payload = await request.json();
    const title = payload.title;
  
    if (typeof title !== 'string' || !title) {
      throw new Error('Missing data: title');
    }
  
    const collection = await createCollection(title);
    return json(collection, 200);
  } else if (request.method == 'PUT') {
    const payload = await request.json();
    const collectionId = payload.collectionId;
    const jokes = payload.jokes;

    const collection = await addJokesToCollection(collectionId, jokes);
    return json(collection, 200);    
  }
}
