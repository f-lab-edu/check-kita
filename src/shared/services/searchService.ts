import axios from 'axios';
import { parseBookXml } from '../utils';
import { SearchBook } from '../interfaces/book.interface';

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
        console.log(res);
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
export const getSearchBookCount = (search: string): Promise<SearchBook[]> => {
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
