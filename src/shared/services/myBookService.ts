import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { BookRecordType, MyBook } from '../interfaces/book.interface';

/**
 * 책 추가하기
 * @param {MyBook} saveBook
 */
export async function addMyBook(saveBook: MyBook) {
  try {
    const { id } = saveBook;

    setDoc(doc(db, 'myBooks', String(id)), saveBook).catch((e) => {
      console.log(e);
      // TODO: 에러 핸들링
    });
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
export async function getAllMyBooks(
  recordType: BookRecordType | 'all' = 'all'
): Promise<MyBook[]> {
  const q =
    recordType === 'all'
      ? query(collection(db, 'myBooks'))
      : query(
          collection(db, 'myBooks'),
          where('readingRecord.recordType', '==', recordType)
        );

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
export async function getMyBookInfoByBookId(
  bookId: string
): Promise<null | MyBook> {
  try {
    const docRef = doc(db, 'myBooks', bookId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return docSnap.data() as MyBook;
  } catch (e) {
    return null;
  }
}

/**
 * 책 아이디로 책기록 삭제하기
 * @param {string} bookId
 * @return {Promise<boolean>}
 */
export async function deleteRecordByBookId(bookId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'myBooks', bookId));

    return true;
  } catch (e) {
    return false;
  }
}
