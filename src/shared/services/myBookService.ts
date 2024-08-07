import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { BookRecordType, MyBook } from '../interfaces/book.interface';
import { INIT_NOT_EXISTS_RECORD } from '../constants';
import { convertTimestampsToDate } from '../utils';

/**
 * 책 추가하기, 수정하기
 * @param {MyBook} saveBook
 */
export async function updateMyBook(saveBook: MyBook) {
  try {
    const { id } = saveBook;

    setDoc(doc(db, 'myBooks', String(id)), { ...saveBook, createAt: serverTimestamp() }).catch(
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
 * 추가한 책 가져오기
 * @param {BookRecordType | 'all'} recordType
 * @returns
 */
export async function getAllMyBooks(recordType: BookRecordType | 'all' = 'all'): Promise<MyBook[]> {
  const q =
    recordType === 'all'
      ? query(collection(db, 'myBooks'))
      : query(collection(db, 'myBooks'), where('readingRecord.recordType', '==', recordType));

  const querySnapshot = await getDocs(q);
  const books: MyBook[] = querySnapshot.docs.map((doc) => ({
    id: doc.data().id,
    title: doc.data().title,
    author: doc.data().author,
    image: doc.data().image,
    readingRecord: doc.data().readingRecord,
  }));

  return books;
}

/**
 * 책 아이디로 내 책 정보 가져오기
 * @param {number} bookId
 */
export async function getMyBookInfoByBookId(bookId: number): Promise<MyBook> {
  try {
    const docRef = doc(db, 'myBooks', String(bookId));
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return INIT_NOT_EXISTS_RECORD;

    const result = docSnap.data() as MyBook;
    if (!result) return INIT_NOT_EXISTS_RECORD;

    return convertTimestampsToDate(result);
  } catch (e) {
    return INIT_NOT_EXISTS_RECORD;
  }
}

/**
 * 책 아이디로 책기록 삭제하기
 * @param {number} bookId
 * @return {Promise<boolean>}
 */
export async function deleteRecordByBookId(bookId: number): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'myBooks', String(bookId)));

    return true;
  } catch (e) {
    return false;
  }
}
