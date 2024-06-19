import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { MyBook } from '../interfaces/book.interface';

export async function addMyBook(saveBook: MyBook) {
  try {
    const { id } = saveBook;

    setDoc(doc(db, 'myBooks', String(id)), saveBook).catch((e) => {
      // TODO: 에러 핸들링
    });
  } catch () {
    // TODO: 에러 핸들링
  }
}
