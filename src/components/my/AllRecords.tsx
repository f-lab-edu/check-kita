import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import * as api from '../../shared/services/myBookService';
import Book from '../bookcase/Book';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Flex } from '@chakra-ui/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PageNationFirebase } from '../../shared/interfaces/common.interface';
import { useState } from 'react';

const ITEMS_PER_PAGE = 12;

function AllRecords() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagenationInfo, setPagenationInfo] = useState<PageNationFirebase>({
    action: 'NEXT',
    count: ITEMS_PER_PAGE,
    firstTimestamp: null,
    lastTimestamp: null,
  });

  const { user } = useAuth();
  const { data: myBooks } = useQuery({
    queryKey: ['myBooks', 'all', currentPage],
    queryFn: async () => {
      if (!user) return;
      const result = await api.getAllMyBooks(user.id, 'all', pagenationInfo);

      if (result.length) {
        setPagenationInfo({
          ...pagenationInfo,
          firstTimestamp: result[0].createdAt,
          lastTimestamp: result[result.length - 1].createdAt,
        });
      }

      return result;
    },
  });

  const handleNextPage = () => {
    setPagenationInfo({ ...pagenationInfo, action: 'NEXT' });
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPagenationInfo({ ...pagenationInfo, action: 'PREV' });
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Wrapper>
      <TopWrapper>
        <Title>기록</Title>
      </TopWrapper>
      <Flex flexDirection={'column'} gap={'12px'} alignItems={'center'}>
        <BookList>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: var(--wrapper-color);
  border-radius: var(--wrapper-border-radius);
  padding: 16px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px 10px;
`;

export default AllRecords;
