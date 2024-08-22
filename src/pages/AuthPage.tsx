import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_APP_KAKAO_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_APP_KAKO_REDIRECT_URI}&response_type=code`;

function AuthPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loginSuccess = searchParams.get('success');

    if (loginSuccess && loginSuccess === 'false') window.alert('로그인 실패');
  }, []);

  const kakaoLogin = async () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrapper>
      <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
      <Button onClick={kakaoLogin}>카카오 로그인 버튼</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: var(--header-height);
`;

export default AuthPage;
