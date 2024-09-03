import styled from 'styled-components';
import Book from '../components/bookcase/Book';
import { getAllMyBooks } from '../shared/services/myBookService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/common/Loading';
import { match } from 'ts-pattern';
import LandingImage from '../components/bookcase/LandingImage';
import Container from '../elements/Container';
import RecentBooks from '../components/bookcase/RecentBooks';
import { Button, Flex, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import imgMordCard from '../assets/images/bookcase/img_card.jpg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';
import { INIT_PAGENATION_INFO } from '../shared/constants/constants';
import { PageNationFirebase } from '../shared/interfaces/common.interface';

const ITEMS_PER_PAGE = 9;

function BookcasePage() {
  const { isAuthenticated, user } = useAuth();
  const selectedTabStyle = { color: 'white', bg: 'brand.500' };

  const [currentPage, setCurrentPage] = useState(1);
  const [pagenationInfo, setPagenationInfo] = useState<PageNationFirebase>(INIT_PAGENATION_INFO);

  const {
    data: myBooks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['myBooks', 'all', currentPage],
    queryFn: async () => {
      if (!user) return [];
      const result = await getAllMyBooks(user.id, 'all', pagenationInfo);

      if (result.length) {
        setPagenationInfo({
          ...pagenationInfo,
          firstTimestamp: result[0].createdAt,
          lastTimestamp: result[result.length - 1].createdAt,
        });
      }

      return result;
    },
    refetchOnWindowFocus: false,
  });

  const handleNextPage = () => {
    setPagenationInfo({ ...pagenationInfo, action: 'NEXT' });
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPagenationInfo({ ...pagenationInfo, action: 'PREV', count: 9 });
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <Wrapper>
      <LandingImage />
      {isAuthenticated && <RecentBooks></RecentBooks>}
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
                <Flex flexDirection={'column'} gap={'12px'} alignItems={'center'}>
                  <BookList>
                    <MoreCard img={imgMordCard}>
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
                  <Flex alignItems={'center'}>
                    <Button
                      variant="goast"
                      size={'mdIcon'}
                      isDisabled={currentPage === 1}
                      onClick={handlePrevPage}
                    >
                      <ChevronLeftIcon />
                    </Button>
                    <Button
                      variant="goast"
                      size={'mdIcon'}
                      onClick={handleNextPage}
                      isDisabled={ITEMS_PER_PAGE > Number(myBooks?.length)}
                    >
                      <ChevronRightIcon />
                    </Button>
                  </Flex>
                </Flex>
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
  min-height: 522px;
  background-color: var(--wrapper-color);
  border-radius: var(--wrapper-border-radius);
  padding: 32px;
`;

const BookList = styled.div`
  padding-top: 32px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 10px;
`;

interface MoreCardProps {
  img: string;
}

const MoreCard = styled.div<MoreCardProps>`
  border-radius: 4px;
  background-image: urls(${(props) => props.img});
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
