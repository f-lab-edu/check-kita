export interface Memo {
  memoId: string;
  content: string;
}

export interface Memos {
  bookId: number;
  memos: Memo[];
}
