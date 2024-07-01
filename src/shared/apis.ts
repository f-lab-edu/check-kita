import axios from 'axios';
import { parseBookXml } from './utils';

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
  count: number = 20,
  page: number = 1
) => {
  console.log(search, count, page);

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
 * isbn으로 책 검색
 * @param {number} isbn
 * @returns
 */
export const searchBookByIsbn = (isbn: number) => {
  return api
    .get('/search-book-by-isbn', {
      params: { d_isbn: isbn },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);

        return parseBookXml(res.data);
      }
    })
    .catch();
};
