import { AlreadyBook, IngBook, WantBook } from '../interfaces/book.interface';

export const INIT_RECORD_DETAIL = {
  startDate: new Date(),
  endDate: new Date(),
  rating: 0,
};

export const INIT_NOT_EXISTS_RECORD = {
  id: undefined,
  title: undefined,
  author: undefined,
  image: undefined,
  readingRecord: undefined,
};

export const INIT_ALREADYBOOK: AlreadyBook = {
  startDate: new Date(),
  endDate: new Date(),
  rating: 0,
};

export const INIT_INGBOOK: IngBook = {
  startDate: new Date(),
  readingProgressType: 'pages',
  readingProgressCount: 0,
};

export const INIT_WANTBOOK: WantBook = {
  expectationRating: 0,
  expectationMemo: '',
};

export const DAYS_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const INIT_SEARCH_BOOK = {
  title: '',
  image: '',
  author: '',
  publisher: '',
  isbn: -1,
};
