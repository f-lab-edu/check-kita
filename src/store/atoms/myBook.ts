import { atom } from 'jotai';
import {
  BookReadingProgressType,
  BookRecordType,
} from '../../shared/enums/book.enum';
import {
  AlreadyBook,
  IngBook,
  MyBook,
  WantBook,
} from '../../shared/interfaces/book.interface';
import {
  selectedBookAuthorAtom,
  selectedBookImageAtom,
  selectedBookTitleAtom,
} from './index';

// 나의 책
export const myBookAtom = atom<MyBook>((get) => ({
  title: get(selectedBookTitleAtom),
  author: get(selectedBookAuthorAtom),
  image: get(selectedBookImageAtom),
  readingRecord: get(readingRecordAtom),
}));

// 기록 책 정보
export const readingRecordTypeAtom = atom<BookRecordType>(
  BookRecordType.already
);
export const readingRecordDetailAtom = atom<AlreadyBook>((get) =>
  get(alreadyBookAtom)
);
export const readingRecordAtom = atom<ReadingRecord>((get) => ({
  recordType: get(readingRecordTypeAtom),
  recordDetail: get(readingRecordDetailAtom),
}));

// 읽은 책
export const alreadyBookStartDateAtom = atom<Date>(new Date());
export const alreadyBookEndDateAtom = atom<Date>(new Date());
export const alreadyBookRatingAtom = atom<Date>(0);
export const alreadyBookAtom = atom<AlreadyBook>((get) => ({
  startDate: get(alreadyBookStartDateAtom),
  endDate: get(alreadyBookEndDateAtom),
  rating: get(alreadyBookRatingAtom),
}));

// 읽고 있는 책
export const ingBookStartDateAtom = atom<Date>(new Date());
export const ingBookReadingProgressTypeAtom = atom<BookReadingProgressType>(
  BookReadingProgressType.pages
);
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
