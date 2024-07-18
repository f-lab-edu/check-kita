export interface Memo {
  memoId: number;
  content: string;
}

export interface Memos {
  bookId: number;
  memos: Memo[];
}
