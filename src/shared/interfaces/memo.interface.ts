import { Timestamp } from 'firebase/firestore';

export interface Memo {
  userId: string;
  bookIsbn: number;
  memoId: string;
  content: string;
  createdAt?: Timestamp;
}
