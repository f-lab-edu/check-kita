import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import BookcasePage from './pages/BookcasePage';
import SearchBookPage from './pages/SearchBookPage';
import BookDetailPage from './pages/BookDetailPage';
import MyBookPage from './pages/MyBookPage';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate replace to="bookcase" />,
      },
      // 등록한 책 전체 뷰
      {
        path: 'bookcase',
        element: <BookcasePage />,
        children: [{ path: ':bookId', element: <MyBookPage /> }],
      },

      // 도서 검색
      {
        path: 'search',
        element: <SearchBookPage />,
      },
      {
        path: 'book/:bookIsbn',
        element: <BookDetailPage />,
      },

      // TODO: 아래 라우터 구조 변경될 가능성이 있음
      // 나의 기록
      {
        path: 'my',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
