import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { MyBook } from '../interfaces/book.interface';
import { BookRecordType } from '../enums/book.enum';

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
