import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import * as api from '../../shared/services/myBookService';
import Book from '../bookcase/Book';

function AllRecords() {
  const { data: myBooks, isLoading } = useQuery({
    queryKey: ['myBooks', 'all'],
    queryFn: () => api.getAllMyBooks('all', 10),
  });

  return (
    <Wrapper>
      <TopWrapper>
        <Title>기록</Title>
      </TopWrapper>
      <BookList>
        {myBooks?.map((myBook) => (
          <Book key={myBook.id} myBook={myBook} />
        ))}
      </BookList>
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
