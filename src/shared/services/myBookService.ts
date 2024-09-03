import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  serverTimestamp,
  orderBy,
  limit,
  startAfter,
  endBefore,
} from 'firebase/firestore';
import { db } from '../firebase';
import { BookRecordType, MyBook } from '../interfaces/book.interface';
import { INIT_NOT_EXISTS_RECORD } from '../constants/constants';
import { convertDateMapKey, convertTimestamps, setFirebaseQueryPagenation } from '../utils';
import { PageNationFirebase } from '../interfaces/common.interface';

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
  pagenationInfo: PageNationFirebase
): Promise<MyBook[]> {
  try {
    let baseQuery = query(
      collection(db, 'myBooks'),
      where('userId', '==', userId),
      orderBy('createdAt')
    );

    // 타입이 있을 경우
    if (recordType !== 'all')
      baseQuery = query(baseQuery, where('readingRecord.recordType', '==', recordType));

    baseQuery = setFirebaseQueryPagenation(baseQuery, pagenationInfo);

    const querySnapshot = await getDocs(baseQuery);
    const books: MyBook[] = querySnapshot.docs.map((doc) => ({
      userId: doc.data().userId,
      id: doc.data().id,
      title: doc.data().title,
      author: doc.data().author,
      image: doc.data().image,
      isbn: doc.data().isbn,
      createdAt: doc.data().createdAt,
      readingRecord: doc.data().readingRecord,
    }));

    return books;
  } catch (e) {
    return [];
  }
}

/**
 * 책 아이디로 내 책 정보 가져오기
 * @param {number} isbn
 */
export async function getMyBookInfoByBookIsbn(userId: string, isbn: number): Promise<MyBook> {
  try {
    const q = query(
      collection(db, 'myBooks'),
      where('userId', '==', userId),
      where('isbn', '==', isbn)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return INIT_NOT_EXISTS_RECORD;

    const doc = querySnapshot.docs[0];
    const data = doc.data() as MyBook;
    return convertTimestamps(data);
  } catch (e) {
    return INIT_NOT_EXISTS_RECORD;
  }
}

/**
 * 책 아이디로 책기록 삭제하기
 * @param {number} bookId
 * @return {Promise<boolean>}
 */
export async function deleteRecordByBookId(bookId: string): Promise<boolean> {
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
export async function getMonthlyRecordCount(userId: string, month: number): Promise<number> {
  try {
    const year = new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const q = query(
      collection(db, 'myBooks'),
      where('userId', '==', userId),
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
export async function getMonthlyRecords(
  userId: string,
  month: number
): Promise<Map<string, MyBook[]>> {
  try {
    const year = new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const q = query(
      collection(db, 'myBooks'),
      where('userId', '==', userId),
      where('createdAt', '>=', startDate),
      where('createdAt', '<', endDate)
    );

    const querySnapshot = await getDocs(q);

    const books = new Map<string, MyBook[]>();

    for (const doc of querySnapshot.docs) {
      const record = {
        userId: doc.data().userId,
        id: doc.data().id,
        title: doc.data().title,
        author: doc.data().author,
        image: doc.data().image,
        readingRecord: doc.data().readingRecord,
        createdAt: doc.data().createdAt,
        isbn: doc.data().isbn,
      };

      const createdAt = record.createdAt.toDate();
      const recordKey = convertDateMapKey(createdAt);

      if (books.has(recordKey)) {
        const targetDateRecords = books.get(recordKey);
        targetDateRecords?.push(convertTimestamps(record));
        targetDateRecords && books.set(recordKey, targetDateRecords);
      } else {
        books.set(recordKey, [convertTimestamps(record)]);
      }
    }

    return books;
  } catch (e) {
    return new Map();
  }
}
