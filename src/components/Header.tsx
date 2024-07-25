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
      헤더
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
      {/* TODO: 실시간 검색 결과 팝오버로 보여주기 */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  border: 10px solid blue;
  display: flex;
  position: absolute;
  width: 100vw;
  top: 0;
`;

export default Header;
