import { atom } from 'jotai';
import {
  AlreadyBook,
  BookReadingProgressType,
  BookRecordType,
  IngBook,
  WantBook,
} from '../../shared/interfaces/book.interface';

// 기록 책 정보
export const readingRecordTypeAtom = atom<BookRecordType>('already');

// 읽은 책
export const alreadyBookStartDateAtom = atom<Date>(new Date());
export const alreadyBookEndDateAtom = atom<Date>(new Date());
export const alreadyBookRatingAtom = atom<number>(5);
export const alreadyBookAtom = atom<AlreadyBook>((get) => ({
  startDate: get(alreadyBookStartDateAtom),
  endDate: get(alreadyBookEndDateAtom),
  rating: get(alreadyBookRatingAtom),
}));

// 읽고 있는 책
export const ingBookStartDateAtom = atom<Date>(new Date());
export const ingBookReadingProgressTypeAtom =
  atom<BookReadingProgressType>('pages');
export const ingBookReadingProgressCountAtom = atom<number>(0);
export const ingBookAtom = atom<IngBook>((get) => ({
  startDate: get(ingBookStartDateAtom),
  readingProgressType: get(ingBookReadingProgressTypeAtom),
  readingProgressCount: get(ingBookReadingProgressCountAtom),
}));

// 읽고 싶은 책
export const wantBookExpectationRatingAtom = atom<number>(0);
export const wantBookExpectationMemoAtom = atom<string>('');
export const wantBookAtom = atom<WantBook>((get) => ({
  expectationRating: get(wantBookExpectationRatingAtom),
  expectationMemo: get(wantBookExpectationMemoAtom),
}));
