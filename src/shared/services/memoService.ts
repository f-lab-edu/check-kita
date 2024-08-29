import { Memo } from './../interfaces/memo.interface';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * 메모 추가하기, 수정하기
 */
export async function updateMemo(memo: Memo) {
  try {
    setDoc(doc(db, 'memos', String(memo.memoId)), { ...memo, createdAt: serverTimestamp() }).catch(
      (e) => {
        console.log(e);
        // TODO: 에러 핸들링
      }
    );
  } catch (e) {
    console.log(e);
    // TODO: 에러 핸들링
  }
}

/**
 * 메모 정보 가져오기
 */
export async function getMemosByBookIsbn(
  userId: string,
  bookIsbn: number,
  count: number = 10
): Promise<Memo[]> {
  const q = query(
    collection(db, 'memos'),
    where('userId', '==', userId),
    where('bookIsbn', '==', bookIsbn),
    limit(count)
  );

  const querySnapshot = await getDocs(q);
  const memos: Memo[] = querySnapshot.docs.map((doc) => ({
    userId: doc.data().userId,
    bookIsbn: doc.data().bookIsbn,
    memoId: doc.data().memoId,
    content: doc.data().content,
    createdAt: doc.data().createdAt,
  }));

  return memos;
}

/**
 * 메모 아이디로 메모 삭제
 * @param {string} bookId
 * @return {Promise<boolean>}
 */
export async function deleteMemoByMemoId(memoId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'memos', String(memoId)));

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 전체 메모 가져오기
 */
export async function getAllMemos(userId: string, count: number = 10): Promise<Memo[]> {
  try {
    const q = query(
      collection(db, 'memos'),
      where('userId', '==', userId),
      orderBy('createdAt'),
      limit(count)
    );

    const querySnapshot = await getDocs(q);
    const memos: Memo[] = querySnapshot.docs.map((doc) => ({
      userId: doc.data().userId,
      bookId: doc.data().bookId,
      memoId: doc.data().memoId,
      content: doc.data().content,
      createdAt: doc.data().createdAt,
    }));

    return memos;
  } catch (e) {
    console.log(e);
    return [];
  }
}
