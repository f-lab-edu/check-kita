import axios from 'axios';
import { parseBookXml } from '../utils';

const api = axios.create({
  baseURL: '',
  headers: {
    'X-Naver-Client-Id': import.meta.env.VITE_APP_NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': import.meta.env.VITE_APP_NAVER_CLIENT_SECRET,
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
  return api
    .get('/search-books', {
      params: { query: search, display: count, start: page, sort: 'sim' },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.items);
        return res.data.items;
      }
    })
    .catch();
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
    .catch((e) => {
      // TODO: 에러 핸들링
    });
};