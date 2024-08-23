import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import BookcasePage from './pages/BookcasePage';
import SearchBookPage from './pages/SearchBookPage';
import BookDetailPage from './pages/BookDetailPage';
import MyPage from './pages/MyPage';
import AuthPage from './pages/AuthPage';
import KakaoCallback from './components/auth/KakaoCallback';
import NaverCallback from './components/auth/NaverCallback';

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

      // 나의 기록
      {
        path: 'my',
        element: <MyPage />,
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'kakao/callback',
        element: <KakaoCallback />,
      },
      {
        path: 'naver/callback',
        element: <NaverCallback />,
      },
    ],
  },
]);

export default router;
