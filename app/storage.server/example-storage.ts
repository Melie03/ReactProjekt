/* This is only an example and can be deleted */

import { createFeatureStorage } from './storage-utils';

/* Type of the entities that should be stored */
export type ExampleType = {
  id: string;
  name: string;
  createdAt: string;
};

/* Create the storage with a unique name */
const exampleStorage = createFeatureStorage<ExampleType>('example');

/* Expose the functions you need in your application */
export const getAllExamples = () => {
  return exampleStorage.getAll();
};

export const getExampleById = (id: string) => {
  return exampleStorage.getById(id);
};

export const createExample = (name: string) => {
  const date = new Date().toISOString();
  const newExample = { name: name, createdAt: date };
  return exampleStorage.create(newExample);
};

export const updateExampleName = async (id: string, name: string) => {
  return exampleStorage.update({ id: id, name: name });
};

export const deleteExample = async (id: string) => {
  return exampleStorage.delete(id);
};
