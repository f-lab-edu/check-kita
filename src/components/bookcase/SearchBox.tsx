import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function SearchBox() {
  const [searchText, setSearchText] = useState('');

  return (
    <Wrapper>
      <SearchIcon fontSize="large" />
      <input
        value={searchText}
        placeholder="Search Books"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
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
