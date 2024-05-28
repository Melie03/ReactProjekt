import { storage } from './db';
import { prefixStorage } from 'unstorage';
import { v4 as uuidv4 } from 'uuid';

export function createFeatureStorage<T extends { id: string }>(key: string) {
  const featureStorage = prefixStorage<T[]>(storage, key);

  async function getAll() {
    return (await featureStorage.getItem('data')) ?? [];
  }

  async function getById(id: string) {
    const entries = await getAll();
    return entries.find((x) => x.id === id);
  }

  async function createItem(data: Omit<T, 'id'>) {
    const entries = await getAll();
    const id = uuidv4();
    const newEntry = { ...data, id } as T;
    await featureStorage.setItem('data', [...entries, newEntry]);
    return newEntry;
  }

  async function deleteItem(id: string) {
    const entries = await getAll();
    const updatedEntries = entries.filter((x) => x.id !== id);
    await featureStorage.setItem('data', updatedEntries);
    return updatedEntries;
  }

  async function updateItem(data: Partial<T> & { id: string }) {
    const entries = await getAll();
    const updatedEntries = entries.map((currentEntry) => {
      return currentEntry.id == data.id ? { ...currentEntry, ...data } : currentEntry;
    });
    await featureStorage.setItem('data', updatedEntries);
    return updatedEntries;
  }

  return {
    getAll,
    getById,
    create: createItem,
    delete: deleteItem,
    update: updateItem,
  };
}
