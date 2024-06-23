import { ActionFunctionArgs, json } from '@remix-run/node';
import { createCollection, getAllCollections } from '~/storage.server/collection-storage';

export async function loader() {
  const collections = await getAllCollections();
  return json(collections, 200);
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    throw new Error(`Method ${request.method} not supported`);
  }

  const payload = await request.json();
  const title = payload.title;

  if (typeof title !== 'string' || !title) {
    throw new Error('Missing data: title');
  }

  const collection = await createCollection(title);
  return json(collection, 200);
}
