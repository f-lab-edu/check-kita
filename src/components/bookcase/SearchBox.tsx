import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

function SearchBox() {
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
      <SearchIcon fontSize="large" />
      <input
        value={search}
        placeholder="Search Books"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={enterPressHandle}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 30px;
  width: 50%;
  padding: 8px 16px;
  border-radius: 17.712px;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;

  & > input {
    width: 100%;
    height: 35px;
    background-color: transparent;
    border: none;
    outline: none;
    color: #000;
    font-size: 28px;
    line-height: normal;
    color: var(--main-text-color);

    &::placeholder {
      color: var(--main-text-color);
      opacity: 0.7;
    }
  }
`;

export default SearchBox;
