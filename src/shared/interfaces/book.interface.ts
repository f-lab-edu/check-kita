import { BookReadingProgressType, BookRecordType } from '../enums/book.enum';

export interface SearchBook {
  title: string;
  link: string;
  image: string;
  author: string;
  discount?: number;
  description: string;
  publisher: string;
  isbn: number;
  pubdate: string;
}

export interface MyBook {
  title: string;
  author: string[];
  image: string;
  readingRecord: ReadingRecord;
}
// 책 기록
export interface ReadingRecord {
  recordType: BookRecordType;
  recordDetail: AlreadyBook | IngBook | WantBook;
}

export interface AlreadyBook {
  startDate: Date;
  endDate: Date;
  rating: number;
}

export interface IngBook {
  startDate: Date;
  readingProgressType: BookReadingProgressType;
  readingProgressCount: number;
}

export interface WantBook {
  expectationRating: number;
  expectationMemo: string;
}
