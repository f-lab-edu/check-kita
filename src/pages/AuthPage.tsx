import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '../shared/constants/auth';

function AuthPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loginSuccess = searchParams.get('success');

    if (loginSuccess && loginSuccess === 'false') window.alert('로그인 실패');
  }, []);

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <Wrapper>
      <Button onClick={kakaoLogin}>카카오 로그인 버튼</Button>
      <Button onClick={naverLogin}>네이버 로그인 버튼</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--header-height);
`;

export default AuthPage;
