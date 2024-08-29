import styled from 'styled-components';
import MontlyGraph from '../components/my/MontlyGraph';
import MontlyCalendar from '../components/my/MontlyCalendar';
import MemoBox from '../components/my/MemoBox';
import AllRecords from '../components/my/AllRecords';

function MyPage() {
  return (
    <Wrapper>
      <TopWrapper>
        <Container>
          <MontlyCalendar />
        </Container>
        <Container>
          <MontlyGraph />
          <ContentBox>
            <MemoBox />
          </ContentBox>
          <ContentBox>리뷰자리</ContentBox>
        </Container>
      </TopWrapper>
      <BottomWrapper>
        <AllRecords />
      </BottomWrapper>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.div`
  min-width: 768px;
  max-width: 1154px;
  min-height: 100%;
  padding: calc(30px + var(--header-height)) 24px 0;
  margin: auto;
`;

const TopWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1 1 300px;
`;

const ContentBox = styled.div`
  flex: 1 1 255px;
`;

const BottomWrapper = styled.div`
  margin-top: 24px;
`;
