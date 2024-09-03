import { Timestamp } from 'firebase/firestore';

export interface SearchBook {
  title: string;
  link?: string;
  image: string;
  author: string;
  discount?: number;
  description?: string;
  publisher: string;
  isbn: number;
  pubdate?: string;
}

export interface SelectedBookInfo {
  id: number;
  title: string;
  author: string[];
  image: string;
}

//FIXME: 커스텀 책
export interface MyBook {
  id?: string;
  isbn: number; // 필요?
  title?: string;
  author?: string[];
  image?: string;

  //FIXME: 분리하기
  // 레코드
  // 유저가 저장한 정보
  // 레코드 아이디
  userId: string;
  readingRecord?: ReadingRecord;
  createdAt?: Timestamp;
  // bookIsbn - customBook에서는 Id?
}

export type BookRecordType = 'already' | 'ing' | 'want';

export type BookRecordDetail = AlreadyBook | IngBook | WantBook;

// 책 기록
export interface ReadingRecord {
  recordType: BookRecordType;
  recordDetail: BookRecordDetail;
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
