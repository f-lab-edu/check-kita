import axios from 'axios';

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
      params: { query: search, display: count, sort: 'sim' },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data.items);
        return res.data.items;
      }
    })
    .catch();
};
