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

// 나의 책
const myBookTitleAtom = atom<string>('');
const myBookAuthorAtom = atom<string[]>([]);
const myBookImageAtom = atom<string>('');
const myBookAtom = atom<MyBook>((get) => ({
  title: get(myBookTitleAtom),
  author: get(myBookAuthorAtom),
  image: get(myBookImageAtom),
  readingRecord: get(readingRecordAtom),
}));

// 기록 책 정보
const readingRecordTypeAtom = atom<BookRecordType>(BookRecordType.already);
const readingRecordDetailAtom = atom<AlreadyBook>((get) =>
  get(alreadyBookAtom)
);
const readingRecordAtom = atom<ReadingRecord>((get) => ({
  recordType: get(readingRecordTypeAtom),
  recordDetail: get(readingRecordDetailAtom),
}));

// 읽은 책
const alreadyBookStartDateAtom = atom<Date>(new Date());
const alreadyBookEndDateAtom = atom<Date>(new Date());
const alreadyBookRatingAtom = atom<Date>(0);
const alreadyBookAtom = atom<AlreadyBook>((get) => ({
  startDate: get(alreadyBookStartDateAtom),
  endDate: get(alreadyBookEndDateAtom),
  rating: get(alreadyBookRatingAtom),
}));

// 읽고 있는 책
const ingBookStartDateAtom = atom<Date>(new Date());
const ingBookReadingProgressTypeAtom = atom<BookReadingProgressType>(
  BookReadingProgressType.pages
);
const ingBookReadingProgressCountAtom = atom<number>(0);
const ingBookAtom = atom<IngBook>((get) => ({
  startDate: get(ingBookStartDateAtom),
  readingProgressType: get(ingBookReadingProgressTypeAtom),
  readingProgressCount: get(ingBookReadingProgressCountAtom),
}));

// 읽고 싶은 책
const wantBookExpectationRatingAtom = atom<number>(0);
const wantBookExpectationMemoAtom = atom<string>('');
const wantBookAtom = atom<WantBook>((get) => ({
  expectationRating: get(wantBookExpectationRatingAtom),
  expectationMemo: get(wantBookExpectationMemoAtom),
}));
