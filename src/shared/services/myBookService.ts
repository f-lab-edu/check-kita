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
  limit,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import { BookRecordType, MyBook } from '../interfaces/book.interface';
import { INIT_NOT_EXISTS_RECORD } from '../constants/constants';
import { convertDateMapKey, convertTimestamps } from '../utils';

/**
 * 책 추가하기, 수정하기
 * @param {MyBook} saveBook
 */
export async function updateMyBook(saveBook: MyBook) {
  try {
    const { id } = saveBook;

    setDoc(doc(db, 'myBooks', String(id)), { ...saveBook, createdAt: serverTimestamp() }).catch(
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
 * @param {number} count
 * @returns
 */
export async function getAllMyBooks(
  userId: string,
  recordType: BookRecordType | 'all' = 'all',
  count: number = 50
): Promise<MyBook[]> {
  const q =
    recordType === 'all'
      ? query(collection(db, 'myBooks'), where('userId', '==', userId), limit(count))
      : query(
          collection(db, 'myBooks'),
          where('userId', '==', userId),
          where('readingRecord.recordType', '==', recordType),
          limit(count)
        );

  const querySnapshot = await getDocs(q);
  const books: MyBook[] = querySnapshot.docs.map((doc) => ({
    userId: doc.data().userId,
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

    return convertTimestamps(result);
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

/**
 * 이번년도 원하는 월의 기록 개수 가져오기
 * @param month
 * @return {Promise<number>}
 */
export async function getMonthlyRecordCount(month: number): Promise<number> {
  try {
    const year = new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const q = query(
      collection(db, 'myBooks'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<', endDate)
      // OPTIMIZE: myBook 인터페이스 변경 - nested하게 저장한 recordType 바깥으로 빼기
      // 추후에 ['already', 'ing', 'want'] 각각 where로 나눠서 가져와서 배열로 묶어서 return
      // where('readingRecord.recordType', '==', 'already')
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.size;
  } catch (e) {
    return 0;
  }
}

/**
 * 이번년도 원하는 월의 기록 가져오기
 * @param month
 * @return {Promise<Map<string, MyBook[]>>}
 */
export async function getMonthlyRecords(month: number): Promise<Map<string, MyBook[]>> {
  try {
    const year = new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const q = query(
      collection(db, 'myBooks'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<', endDate)
    );

    const querySnapshot = await getDocs(q);

    const books = new Map<string, MyBook[]>();

    for (const doc of querySnapshot.docs) {
      const record = {
        id: doc.data().id,
        title: doc.data().title,
        author: doc.data().author,
        image: doc.data().image,
        readingRecord: doc.data().readingRecord,
        createdAt: doc.data().createdAt,
      };

      const createdAt = record.createdAt.toDate();
      const recordKey = convertDateMapKey(createdAt);

      if (books.has(recordKey)) {
        const targetDateRecords = books.get(recordKey);
        targetDateRecords?.push(record);
        targetDateRecords && books.set(recordKey, targetDateRecords);
      } else {
        books.set(recordKey, [record]);
      }
    }
    return books;
  } catch (e) {
    return new Map();
  }
}
