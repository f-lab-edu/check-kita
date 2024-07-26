import styled from 'styled-components';
import Container from '../../elements/Container';
import { useQuery } from '@tanstack/react-query';
import { getAllMyBooks } from '../../shared/services';
import { match } from 'ts-pattern';
import Loading from '../Loading';
import { textOverflowStyles } from '../../shared/styles/common';
import RecordTypeIcon from '../common/RecordTypeIcon';
import { BookRecordTypeLabel } from '../../shared/enums/book.enum';
import { Button } from '@chakra-ui/react';

function RecentBooks() {
  const { data, isLoading } = useQuery({
    queryKey: ['myBooks', 'all', 4],
    queryFn: () => getAllMyBooks('all', 4),
  });

  return (
    <Wrapper>
      <Container>
        <Title>Recently Recorded Books</Title>
        <ImgSlider>
          {match(isLoading)
            .with(true, () => <Loading />)
            .otherwise(() => (
              <>
                {data?.map((book) => (
                  <BookBox key={book.id}>
                    <img src={book.image} />
                    <BookTitle>{book.title}</BookTitle>
                    <BookAuthor>
                      {book.author?.map((author, index) => (
                        <div key={author}>
                          <span>{author}</span>
                          {book.author && book.author.length - 1 !== index && <span>, </span>}
                        </div>
                      ))}
                    </BookAuthor>
                    <BookRecordTypeBox>
                      <Button width={'100%'}>
                        <RecordTypeIcon
                          recordType={book.readingRecord?.recordType}
                          iconSize="small"
                        />
                        <span>
                          {book.readingRecord && BookRecordTypeLabel[book.readingRecord.recordType]}{' '}
                          보러 가기
                        </span>
                      </Button>
                    </BookRecordTypeBox>
                  </BookBox>
                ))}
              </>
            ))}
        </ImgSlider>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  top: -80px;
`;

const Title = styled.div`
  color: var(--main-text-color);
  font-size: 28px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 30px;
`;

const ImgSlider = styled.div`
  display: flex;
  gap: 30px;
  // TODO: Framer 사용해서 이미지 슬라이더 만들기
`;

const BookBox = styled.div`
  height: fit-content;
  flex: 1 1 100%;
  background-color: var(--wrapper-color);
  border-radius: 18px;
  padding: 18px;
  font-family: 'HakgyoansimWooju';

  & > img {
    width: 100%;
    border-radius: 10px;
  }
`;

const BookTitle = styled.p`
  margin-top: 15px;
  color: var(--sub-text-color-1);
  font-size: 18px;
  font-weight: 300;
  line-height: normal;
  ${textOverflowStyles(2)}
`;

const BookAuthor = styled.div`
  margin-top: 5px;
  display: inline-block;

  span {
    color: var(--sub-text-color-2);
    font-size: 13px;
    line-height: normal;
    ${textOverflowStyles(1)}
  }
`;

const BookRecordTypeBox = styled.div`
  margin-top: 30px;

  span {
    margin-left: 6px;
  }
`;

export default RecentBooks;
