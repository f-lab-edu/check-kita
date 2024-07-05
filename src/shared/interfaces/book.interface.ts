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

export interface SelectedBookInfo {
  id: number;
  title: string;
  author: string[];
  image: string;
}

export interface MyBook {
  id: number;
  title: string;
  author: string[];
  image: string;
  readingRecord: ReadingRecord;
}

export type BookRecordType = 'already' | 'ing' | 'want';

// 책 기록
export interface ReadingRecord {
  recordType: BookRecordType;
  recordDetail: AlreadyBook | IngBook | WantBook;
}

// 이미 읽은 책
export interface AlreadyBook {
  startDate: Date;
  endDate: Date;
  rating: number;
}

export type BookReadingProgressType = 'pages' | 'percentage';

// 읽는 중 책
export interface IngBook {
  startDate: Date;
  readingProgressType: BookReadingProgressType;
  readingProgressCount: number;
}

// 읽고 싶은 책
export interface WantBook {
  expectationRating: number;
  expectationMemo: string;
}
