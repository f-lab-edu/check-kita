import { useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  /**
   * 엔터키 클릭시 검색 결과 페이지로 이동
   * @param {React.KeyboardEvent<HTMLInputElement>} e
   */
  const enterPressHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      goToSearchPage();
    }
  };

  const goToSearchPage = () => {
    const param = { search };
    const searchString = createSearchParams(param).toString();

    navigate({
      pathname: '/search',
      search: `?${searchString}`,
    });
  };

  return (
    <Wrapper>
      <ContentBox>
        <Checkita
          onClick={() => {
            navigate('');
          }}
        >
          Checkita!
        </Checkita>
        <NavigationBox>
          {location.pathname !== 'bookcase' && (
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={enterPressHandle}
              placeholder={
                location.pathname.includes('search') ? '등록할 책 검색하기' : '나의 책 검색하기'
              }
            />
          )}
          <button
            onClick={() => {
              navigate('/my');
            }}
          >
            Logs
          </button>
          <button>Login</button>
        </NavigationBox>
      </ContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: var(--header-height);
  padding: 30px;
  // TODO: 스크롤, 라우터 주소에 맞춰서 색상 지정
  /* background-color: rgba(0, 0, 0, 0.5); */
`;

const ContentBox = styled.div`
  margin: auto;
  max-width: 1440px;
  min-width: calc(60px + var(--min-width));
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Checkita = styled.div`
  color: #fff;
  font-size: 35px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const NavigationBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  & > button {
    font-size: 24px;
    color: var(--sub-text-color-2);
    font-weight: 700;
  }
`;

export default Header;
