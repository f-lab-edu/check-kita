import { Memos } from './../interfaces/memo.interface';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * 메모 추가하기, 수정하기
 */
export async function updateBookMemo(bookId: number, memo: string) {
  try {
    // get 헤서 가져와서
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
