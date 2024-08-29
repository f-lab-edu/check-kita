import { Timestamp } from 'firebase/firestore';

export interface Review {
  userId: string;
  bookIsbn: string;
  reviewId: string;
  content: string;
  nickname: string;
  createdAt?: Timestamp;
}

export interface BookReviews {
  memos: Review[];
}
