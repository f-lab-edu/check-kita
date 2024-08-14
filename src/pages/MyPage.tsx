import styled from 'styled-components';
import MontlyGraph from '../components/my/MontlyGraph';
import MontlyCalendar from '../components/my/MontlyCalendar';
import MemoBox from '../components/my/MemoBox';

function MyPage() {
  return (
    <Wrapper>
      <Container>
        <ContentBox>
          <MontlyCalendar />
        </ContentBox>
        <ContentBox>등록한 책</ContentBox>
      </Container>
      <Container>
        <ContentBox>
          <MontlyGraph />
        </ContentBox>
        <ContentBox>
          <MemoBox />
        </ContentBox>
      </Container>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div`
  border: 10px solid red;
  display: flex;
  gap: 16px;
  min-width: 768px;
  max-width: 1154px;
  min-height: 100%;
  padding: var(--header-height) 24px 0;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 300px;
`;
const ContentBox = styled.div`
  /* border: 10px solid gold; */
`;
