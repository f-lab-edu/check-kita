import styled from 'styled-components';
import Container from '../../elements/Container';
import { Button } from '@chakra-ui/react';
import SearchBox from './SearchBox';

function LandingImage() {
  return (
    <Wrapper>
      <BackgroundImg>
        <Filter />
      </BackgroundImg>
      <Container>
        <ContentBox>
          <Slogan>Have A Book Day.</Slogan>
          <Title>Checkita!</Title>
          <SearchBox />
          <Description>
            <strong>Checkita!</strong>는 어쩌구 저쩌구 어쩌구 저쩌구 이렇고 저렇고 그런
            사이트입니다.
          </Description>
          <Button marginTop={30}>Browse My Records</Button>
          <CharacterBox>
            <InfoText>
              Already Books
              <br />+ 50
            </InfoText>
            <InfoText>
              Ing Books
              <br />+ 100
            </InfoText>
            <Character />
          </CharacterBox>
        </ContentBox>
      </Container>
    </Wrapper>
  );
}

// TODO: 반응형 추가 768 - 1024
// TODO: Info 텍스트에 책 개수 서버에서 가져와서 수정하기

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/1;
  min-height: 720px;
  padding-top: var(--header-height);
`;

const BackgroundImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: var(--min-width);
  height: 100%;
  background-image: url('${import.meta.env.VITE_APP_IMAGEPATH}/bookcase/img_library.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.4);
`;

const Filter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--background-color) 89.58%);
`;

const ContentBox = styled.div`
  position: absolute;
  width: calc(100% - 48px);
  padding: 20px 0;
`;

const Slogan = styled.div`
  color: var(--sub-text-color-2);
  font-size: 50px;
  font-weight: 700;
  line-height: 120%;
`;

const Title = styled.div`
  color: var(--main-text-color);
  font-size: 80px;
  font-weight: 700;
  line-height: 120%;
`;

const Description = styled.p`
  display: block;
  margin-top: 30px;
  width: 50%;
  font-size: 30px;
  line-height: 120%;
  color: var(--sub-text-color-1);

  & > strong {
    color: var(--brand-color);
    font-weight: 700;
  }
`;

const CharacterBox = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const InfoText = styled.p`
  color: var(--sub-text-color-1);
  font-family: 'Galmuri14';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  position: absolute;

  &:nth-of-type(1) {
    top: -80px;
    right: 300px;
  }

  &:nth-of-type(2) {
    top: -40px;
    right: 50px;
  }
`;

const Character = styled.div`
  width: 60%;
  aspect-ratio: 700/415;
  background-image: url('${import.meta.env.VITE_APP_IMAGEPATH}/bookcase/img_character.png');
  background-size: cover;
  background-position: center;
`;

export default LandingImage;
