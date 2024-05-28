/* This is only an example and can be deleted */

import { createFeatureStorage } from './storage-utils';

/* Type of the entities that should be stored */
export type Playlist = {
  id: string;
  title: string;
  createdAt: string;
  imageUrl: string;
  tracks: string[];
};

/* Create the storage with a unique name */
const playlistStorage = createFeatureStorage<Playlist>('playlist');

/* Expose the functions you need in your application */
export const getAllPlaylists = () => {
  return playlistStorage.getAll();
};

export const getPlaylistById = (playlistId: string) => {
  return playlistStorage.getById(playlistId);
};

export const createPlaylist = (title: string) => {
  const date = new Date().toISOString();
  const newPlaylist = { title, createdAt: date, tracks: [], imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/240/240` };
  return playlistStorage.create(newPlaylist);
};

export const addTracksToPlaylist = async (playlistId: string, trackIds: string[]) => {
  return playlistStorage.update({ id: playlistId, tracks: trackIds });
};

export const deletePlaylist = async (playlistId: string) => {
  return playlistStorage.delete(playlistId);
};
