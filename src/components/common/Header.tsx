import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@chakra-ui/react';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { isAuthenticated, logout } = useAuth();

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
          <InputWrapper>
            <SearchIcon fontSize="small" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={enterPressHandle}
              placeholder="Search Books"
            />
          </InputWrapper>
          <Button
            variant="clear"
            onClick={() => {
              navigate('/my');
            }}
          >
            My Logs
          </Button>
          <Button
            variant={isAuthenticated ? 'clear' : 'solid'}
            onClick={
              isAuthenticated
                ? logout
                : () => {
                    navigate('/auth');
                  }
            }
          >
            {isAuthenticated ? 'Log Out' : 'Log In'}
          </Button>
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
  padding: 21px 30px;
  background-color: rgba(0, 0, 0, 0.5);
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
  font-size: 30px;
  font-weight: 900;
  line-height: normal;
  cursor: pointer;
`;

const NavigationBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputWrapper = styled.div`
  border-radius: 17.712px;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;

  & > input {
    width: 100%;
    height: 35px;
    background-color: transparent;
    border: none;
    outline: none;
    color: #000;
    font-size: 16px;
    line-height: normal;
    color: var(--main-text-color);

    &::placeholder {
      color: var(--main-text-color);
      opacity: 0.7;
    }
  }
`;

export default Header;
