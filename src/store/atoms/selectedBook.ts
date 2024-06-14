import { atom } from 'jotai';

export const selectedBookTitleAtom = atom<string>('');
export const selectedBookAuthorAtom = atom<string[]>([]);
export const selectedBookImageAtom = atom<string>('');
