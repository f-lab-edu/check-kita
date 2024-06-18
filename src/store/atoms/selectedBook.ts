import { atom } from 'jotai';

export const selectedBookIdAtom = atom<number>(-1);
export const selectedBookTitleAtom = atom<string>('');
export const selectedBookAuthorAtom = atom<string[]>([]);
export const selectedBookImageAtom = atom<string>('');

export const selectedBookAtom = atom<SelectedBookInfo>((get) => ({
  id: get(selectedBookIdAtom),
  title: get(selectedBookTitleAtom),
  author: get(selectedBookAuthorAtom),
  image: get(selectedBookImageAtom),
}));
