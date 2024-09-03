import axios from 'axios';
import { parseBookXml } from '../utils';
import { SearchBook } from '../interfaces/book.interface';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-Naver-Client-Id': import.meta.env.VITE_APP_NAVER_CLIENT_ID ?? '',
    'X-Naver-Client-Secret': import.meta.env.VITE_APP_NAVER_CLIENT_SECRET ?? '',
  },
});

/**
 *
 * @param {string} search 검색어
 * @param {number} count 가져올 개수
 * @param {number} page 페이징 넘버
 * @returns
 */
export const searchBooks = (
  search: string,
  count: number = 15,
  page: number = 1
): Promise<SearchBook[]> => {
  return api
    .get('/search-books', {
      params: { query: search, display: count, start: page, sort: 'sim' },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data.items;
      }
    })
    .catch((e) => {
      console.log('[API ERROR] searchBooks: ', e);
    });
};

/**
 *
 * @param {string} search 검색어
 * @return {number}
 */
export const getSearchBookCount = (search: string): Promise<number> => {
  return api
    .get('/search-book-count', {
      params: { query: search, display: 100, sort: 'sim' },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data.items.length;
      }
      return 0;
    })
    .catch((e) => {
      console.log('[API ERROR] searchBooks: ', e);
      return 0;
    });
};

/**
 * isbn으로 책 검색
 * @param {number} isbn
 * @returns
 */
export async function searchBookByIsbn(isbn: number): Promise<null | SearchBook> {
  try {
    const res = await api.get('/search-book-by-isbn', {
      params: { d_isbn: isbn },
    });

    if (!res || !res.data || res.status !== 200) return null;

    return parseBookXml(res.data);
  } catch (e) {
    return null;
  }
}

export const imageUpload = async (image: File) => {
  try {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (e) {
    throw new Error('imageUpload Error');
  }
};

/**
 * 수동으로 추가한 책 정보 가져오기
 * @param {number} bookId
 */
export async function getCustomBookByBookId(bookId: number): Promise<SearchBook | null> {
  try {
    const docRef = doc(db, 'myBooks', String(bookId));
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const result = docSnap.data() as SearchBook;
    if (!result) return null;

    return {
      title: result.title,
      author: result.author,
      image: result.image,
      isbn: result.isbn,
      publisher: result.publisher,
    };
  } catch (e) {
    return null;
  }
}
