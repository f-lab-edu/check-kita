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
      <MainContainer>
        <ImgWrapper>
          <img src="/src/assets/images/bookcase/img_library.jpg" alt="이미지" width={400} />
          <TextContainer>
            <span>HAVE A BOOK DAY!</span>
            <span>
              그래프를 통해서
              <br /> 내가 언제, 얼마나 읽었는지 알 수 있어요!
            </span>
            <span>관심있는 책에 메모를 남겨 보세요!</span>
          </TextContainer>
        </ImgWrapper>
        <ContentWrapper>
          <Title>SIGN UP NOW</Title>
          <SubText>로그인 후 나의 독서 현황을 기록해 보세요!</SubText>
          <ButtonContainer>
            <img onClick={naverLogin} src="/src/assets/images/img_naver_login.png" />
            <img onClick={kakaoLogin} src="/src/assets/images/img_kakao_login.png" />
          </ButtonContainer>
        </ContentWrapper>
      </MainContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding-top: calc(var(--header-height) + 30px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 400px;
  background-color: var(--wrapper-color);
  display: flex;
  flex-direction: column;
  border-radius: var(--wrapper-border-radius);
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  width: 100%;
  aspect-ratio: 400 / 244;
  position: relative;

  & > img {
    position: absolute;
    filter: brightness(0.4);
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 30px;
  z-index: 1;

  & > span {
    display: block;

    &:nth-of-type(1) {
      padding-bottom: 32px;
      font-weight: 900;
      font-size: 30px;
    }

    &:not(:nth-of-type(1)) {
      font-family: 'HakgyoansimWooju';
      font-size: 18px;
      color: var(--sub-text-color-1);
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 0 1 50%;
  padding: 30px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 20px;
`;

const SubText = styled.div`
  margin-top: 8px;
  color: var(--sub-text-color-2);
`;

const ButtonContainer = styled.div`
  width: 200px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > img {
    cursor: pointer;
  }
`;
export default AuthPage;
