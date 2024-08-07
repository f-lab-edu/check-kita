import styled from 'styled-components';
import MontlyGraph from '../components/my/MontlyGraph';

function MyPage() {
  return (
    <Wrapper>
      <Container>
        <ContentBox>달력</ContentBox>
        {/* 월별 그래프 */}
        <ContentBox>
          <MontlyGraph />
        </ContentBox>
      </Container>
      <Container>
        <ContentBox>등록한 책</ContentBox>
        <ContentBox>메모</ContentBox>
      </Container>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div`
  border: 10px solid red;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;
const ContentBox = styled.div`
  border: 10px solid gold;
`;
