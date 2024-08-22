import { Timestamp } from 'firebase/firestore';

export interface Memo {
  bookId: number;
  memoId: string;
  content: string;
  createdAt?: Timestamp;
}

export interface BookMemos {
  memos: Memo[];
}
