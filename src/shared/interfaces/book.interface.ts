import { BookRecordType } from '../enums/book.enum';

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
  readingRecord: {
    recordType: BookRecordType;
    recordDetail: AlreadyBook | IngBook | WantBook;
  };
}

export interface AlreadyBook {
  startDate: Date;
  endDate: Date;
  rating: number;
}

export interface IngBook {
  startDate: Date;
  readingProgressType: 'percentage' | 'pages';
  readingProgressCount: number;
}

export interface WantBook {
  expectationRating: number;
  expectationMemo: string;
}
