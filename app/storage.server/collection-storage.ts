import { createFeatureStorage } from './storage-utils';
import { Collection } from '~/models/collection';

/* Create the storage with a unique name */
const collectionStorage = createFeatureStorage<Collection>('collection');

/* Expose the functions you need in your application */
export const getAllCollections = () => {
return collectionStorage.getAll();
};

export const getCollectionById = (collectionId: string) => {
  return collectionStorage.getById(collectionId);
};

export const createCollection = (title: string) => {
  const date = new Date().toISOString();
  const newCollection = { title, createdAt: date, jokes: [] };
  return collectionStorage.create(newCollection);
};

export const addJokesToCollection = async (collectionId: string, jokeIds: string[]) => {
  return collectionStorage.update({ id: collectionId, jokes: jokeIds });
};

export const deleteCollection = async (collectionId: string) => {
  return collectionStorage.delete(collectionId);
};
