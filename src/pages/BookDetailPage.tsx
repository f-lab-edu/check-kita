import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../shared/services';
import styled from 'styled-components';
import { Button, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalAddBook from '../components/bookDetail/ModalAddBook';
import { useQuery } from '@tanstack/react-query';
import BookRecordBox from '../components/bookDetail/BookRecordBox';
import { SearchBook } from '../shared/interfaces/book.interface';
import { useEffect, useState } from 'react';
import { splitBookAuthor } from '../shared/utils';
import MemoBox from '../components/bookDetail/MemoBox';
import Container from '../elements/Container';

function BookDetailPage() {
  const navigate = useNavigate();
  const { bookIsbn } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [authors, setAuthors] = useState<string[]>([]);

  const { data: myBook, isLoading } = useQuery({
    queryKey: ['record', bookIsbn],
    queryFn: async () => {
      const result = await api.getMyBookInfoByBookId(Number(bookIsbn));

      return result;
    },
    enabled: !!bookIsbn,
    retry: false,
    staleTime: 0,
  });

  const { data: bookInfo, isLoading: bookInfoIsLoading } = useQuery({
    queryKey: ['book', bookIsbn],
    queryFn: async (): Promise<SearchBook> => {
      const result = await api.searchBookByIsbn(Number(bookIsbn));

      if (result === null) {
        alert('데이터 불러오기 실패!');
        navigate(-1);
        throw new Error('[BookDetailPage] searchBookByIsbn failed');
      }

      return result;
    },
  });

  const isRecordedBook = () => {
    if (isLoading || !myBook || !myBook.id) return false;
    return true;
  };

  useEffect(() => {
    if (!!bookInfo?.author) {
      setAuthors(splitBookAuthor(bookInfo.author));
    }
  }, [bookInfo?.author]);

  return (
    <Wrapper>
      <Container>
        {!bookInfoIsLoading && (
          <>
            <BookTopInfo>
              <ImgContainer>
                <img src={bookInfo?.image} width={200} />
                <Button onClick={onOpen}>{isRecordedBook() ? '수정하기' : '저장하기'}</Button>
              </ImgContainer>
              <BookInfoBox>
                <BookTitle>{bookInfo?.title}</BookTitle>
                <BookPublisingInfoTop>
                  <p>
                    {!!authors &&
                      authors.map((bookAuthor, index) => (
                        <span key={index}>
                          <strong>{bookAuthor}</strong>
                          {index !== authors.length - 1 && <span>, </span>}
                        </span>
                      ))}{' '}
                    저
                  </p>
                  <p>
                    <strong>{bookInfo?.publisher}</strong> 출판
                  </p>
                </BookPublisingInfoTop>
                <BookPublisingInfoBottom>
                  <InfoBox>
                    <p>출간일</p>
                    <p>{bookInfo?.pubdate}</p>
                  </InfoBox>
                  <InfoBox>
                    <p>ISBN</p>
                    <p>{bookInfo?.isbn}</p>
                  </InfoBox>
                </BookPublisingInfoBottom>

                {/* 나의 책 기록 */}
                {!!myBook?.readingRecord && bookIsbn && (
                  <BookRecordBox bookRecord={myBook.readingRecord} bookIsbn={bookIsbn} />
                )}
              </BookInfoBox>
            </BookTopInfo>
            <BookInfoBottom>
              <DescriptionTitle>작품 소개</DescriptionTitle>
              <HorizontalLine margin="0 0 16px"></HorizontalLine>
              <p>{bookInfo?.description}</p>
            </BookInfoBottom>
            <MemoBox />
            {/* 기록 업데이트 모달 */}
            {!!bookIsbn && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalAddBook onClose={onClose} bookInfo={bookInfo} bookIsbn={bookIsbn} />
              </Modal>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: calc(30px + var(--header-height)) 0 0;
`;

const BookTopInfo = styled.div`
  display: flex;
  gap: 40px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 0 0 auto;

  & > img {
    width: 200px;
    height: fit-content;
    flex: 0 0 200px;
    border-radius: 3px;
  }
`;

const BookInfoBox = styled.div`
  width: calc(100% - 200px - 40px);
  flex: 1 1 auto;
`;

const BookTitle = styled.span`
  font-size: 30px;
  line-height: 1.3em;
  color: var(--main-text-color);
  font-weight: 700;
`;

const BookPublisingInfoTop = styled.div`
  padding: 20px 0;
  font-size: 16px;
  line-height: 120%;

  & > p {
    color: var(--sub-text-color-2);

    &:first-of-type {
      padding-bottom: 6px;
    }
  }

  strong {
    color: var(--sub-text-color-1);
    font-weight: 700;
    cursor: pointer;
  }
`;

const BookPublisingInfoBottom = styled.div`
  display: flex;
  gap: 16px;
`;

const InfoBox = styled.div`
  display: flex;
  font-size: 14px;

  & > p {
    color: var(--sub-text-color-2);

    &:first-of-type {
      font-weight: 700;
      margin-right: 8px;
    }
  }
`;

interface HorizontalLineProps {
  color?: string;
  margin?: string;
}

const HorizontalLine = styled.div<HorizontalLineProps>`
  width: 100%;
  border: 1px solid ${(props) => (props.color ? props.color : 'var(--main-text-color)')};
  margin: ${(props) => (props.margin ? props.margin : '20px 0')};
`;

const BookInfoBottom = styled.div`
  margin-top: 20px;
  & > p {
    font-size: 15px;
    line-height: 1.74em;
    color: var(--sub-text-color-1);
  }
`;

const DescriptionTitle = styled.div`
  font-size: 20px;
  color: var(--main-text-color);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 24px;
  padding: 10px 0 8px;
`;

export default BookDetailPage;
