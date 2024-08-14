import styled from 'styled-components';
import MontlyGraph from '../components/my/MontlyGraph';
import MontlyCalendar from '../components/my/MontlyCalendar';

function MyPage() {
  return (
    <Wrapper>
      <Container>
        <ContentBox>
          <MontlyCalendar />
        </ContentBox>
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
  gap: 16px;
  min-width: 768px;
  max-width: 1154px;
  min-height: 100%;
  padding: var(--header-height) 24px 0;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  gap: 16px;
`;
const ContentBox = styled.div`
  /* border: 10px solid gold; */
  flex: 1 1 auto;
`;
