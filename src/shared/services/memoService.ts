import { Memo, Memos } from './../interfaces/memo.interface';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * 메모 추가하기, 수정하기
 */
export async function updateBookMemo(bookId: number, memo: Memo) {
  try {
    const docRef = doc(db, 'memos', String(bookId));
    const docSnap = await getDoc(docRef);
    let updatedMemo: Memos;

    if (docSnap.exists()) {
      const beforeMemoInfo = { ...docSnap.data() };

      updatedMemo = { bookId, memos: [...beforeMemoInfo.memos, memo] };
    } else updatedMemo = { bookId, memos: [memo] };

    setDoc(doc(db, 'memos', String(bookId)), updatedMemo).catch((e) => {
      console.log(e);
      // TODO: 에러 핸들링
    });
  } catch (e) {
    console.log(e);
    // TODO: 에러 핸들링
  }
}

/**
 * 책 메모 정보 가져오기
 */
export async function getMemosByBookId(bookId: number): Promise<Memos> {
  const docRef = doc(db, 'memos', String(bookId));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data() as Memos;

  return { bookId, memos: [] };
}

/**
 * 메모 아이디로 메모 삭제
 * @param {string} bookId
 * @return {Promise<boolean>}
 */
export async function deleteMemoByMemoId(
  bookId: number,
  memoId: number
): Promise<boolean> {
  try {
    // get book아이로 가져와서

    const docRef = doc(db, 'memos', String(bookId));
    const docSnap = await getDoc(docRef);

    if (!!!docSnap.exists()) throw new Error('존재하지 않는 메모');

    const beforeMemos = docSnap.data() as Memos;

    const afterMemos = beforeMemos.memos.filter(
      (memo) => memo.memoId !== memoId
    );

    setDoc(doc(db, 'memos', String(bookId)), {
      bookId,
      memos: afterMemos,
    }).catch((e) => {
      console.log(e);
      return false;
      // TODO: 에러 핸들링
    });

    return true;
  } catch (e) {
    return false;
  }
}
