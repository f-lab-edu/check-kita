import styled from 'styled-components';
import Book from '../components/bookcase/Book';
import { getAllMyBooks } from '../shared/services/myBookService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import { match } from 'ts-pattern';
import LandingImage from '../components/bookcase/LandingImage';
import Container from '../elements/Container';
import RecentBooks from '../components/bookcase/RecentBooks';
import { Tab, TabList, Tabs } from '@chakra-ui/react';

function BookcasePage() {
  const selectedTabStyle = { color: 'white', bg: 'brand.500' };

  // TODO: 첫번째 이외에 10개씩 가지고 와서 페이지네이션 하기
  const { data: myBooks, isLoading } = useQuery({
    queryKey: ['myBooks', 'all'],
    queryFn: () => getAllMyBooks('all', 9),
  });

  return (
    <Wrapper>
      <LandingImage />
      <RecentBooks></RecentBooks>
      <Container>
        <Title>All My Recorded Books</Title>

        <BooksContainer>
          {match(isLoading)
            .with(true, () => <Loading />)
            .otherwise(() => (
              <>
                <Tabs variant="soft-rounded">
                  <TabList>
                    <Tab _selected={selectedTabStyle}>전체</Tab>
                    <Tab _selected={selectedTabStyle}>읽은 책</Tab>
                    <Tab _selected={selectedTabStyle}>읽고 있는 책</Tab>
                    <Tab _selected={selectedTabStyle}>읽고 싶은 책</Tab>
                  </TabList>
                </Tabs>
                <BookList>
                  <MoreCard>
                    <Slogan>Have A Book Day.</Slogan>
                    <div>
                      <strong>Checkita!</strong>에 기록한 책 확인하러 가기
                    </div>
                    <div>그래프를 통해서 내가 언제, 얼마나 읽었는지 알 수 있어요</div>
                    <div>관심있는 책에 메모를 남겨 보세요</div>
                  </MoreCard>
                  {myBooks?.map((myBook) => (
                    <Book key={myBook.id} myBook={myBook} />
                  ))}
                </BookList>
              </>
            ))}
        </BooksContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  color: var(--main-text-color);
  font-size: 28px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 30px;
`;

const BooksContainer = styled.div`
  width: 100%;
  background-color: var(--wrapper-color);
  border-radius: 18px;
  padding: 32px;
`;

const BookList = styled.div`
  padding-top: 32px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 10px;
`;

const MoreCard = styled.div`
  border-radius: 4px;
  background-image: url('${import.meta.env.VITE_APP_IMAGEPATH}/bookcase/img_card.jpg');
  background-size: cover;
  padding: 24px 12px;
  font-family: 'HakgyoansimWooju';
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s linear;
  font-size: 14px;

  & > div {
    color: var(--sub-text-color-1);
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

const Slogan = styled.div`
  color: var(--main-text-color);
  font-family: 'HakgyoansimWooju';
  font-size: 24px;
  font-weight: 900;
  padding-bottom: 24px;
`;

export default BookcasePage;
