import styled from 'styled-components';
import Book from '../components/bookcase/Book';
import { getAllMyBooks } from '../shared/services/myBookService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import { match } from 'ts-pattern';

function BookcasePage() {
  const { data: myBooks, isLoading } = useQuery({
    queryKey: ['myBooks', 'all'],
    queryFn: () => getAllMyBooks(),
  });

  return (
    <Wrapper>
      {match(isLoading)
        .with(true, () => <Loading />)
        .otherwise(() => (
          <>
            <Categories>
              <div>읽은 책</div>
              <div>읽고 싶은 책</div>
              <div>읽고 있는 책</div>
            </Categories>
            <BookList>
              {myBooks?.map((myBook) => (
                <Book key={myBook.id} myBook={myBook} />
              ))}
            </BookList>
          </>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 10px solid red;
`;

const Categories = styled.div`
  width: 100%;
  border: 1px solid blue;
  display: flex;
`;

const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 220px));
  gap: 10px;
`;

export default BookcasePage;
