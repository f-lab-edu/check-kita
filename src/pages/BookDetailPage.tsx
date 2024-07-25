import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../shared/services';
import styled from 'styled-components';
import { Button, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalAddBook from '../components/bookDetail/ModalAddBook';
import { useMutation, useQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';
import BookRecordBox from '../components/bookDetail/BookRecordBox';
import { queryClient } from '../main';
import { SearchBook } from '../shared/interfaces/book.interface';
import { useEffect, useState } from 'react';
import { splitBookAuthor } from '../shared/utils';
import MemoBox from '../components/bookDetail/MemoBox';

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

  const deleteRecord = useMutation({
    mutationFn: () => api.deleteRecordByBookId(Number(bookIsbn)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['record', bookIsbn] });
      alert('삭제 성공!');
    },
    onError: () => {
      alert('삭제 실패!');
    },
  });

  useEffect(() => {
    if (!!bookInfo?.author) {
      setAuthors(splitBookAuthor(bookInfo.author));
    }
  }, [bookInfo?.author]);

  return (
    <div>
      {!bookInfoIsLoading && (
        <>
          <BookTopInfo>
            <img src={bookInfo?.image} width={200} />
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
              <HorizontalLine />
              <div>
                {!!myBook?.readingRecord && (
                  <BookRecordBox bookRecord={myBook.readingRecord} />
                )}
                <MyBookButtonBox>
                  {match({ isLoading, myBook })
                    .with({ isLoading: true }, () => (
                      <Button onClick={onOpen}>저장하기</Button>
                    ))
                    .with({ isLoading: false, myBook: undefined }, () => (
                      <Button onClick={onOpen}>저장하기</Button>
                    ))
                    .with(
                      { isLoading: false, myBook: { id: undefined } },
                      () => <Button onClick={onOpen}>저장하기</Button>
                    )
                    .otherwise(() => (
                      <>
                        <Button onClick={onOpen}>수정하기</Button>
                        <Button
                          onClick={() => {
                            deleteRecord.mutate();
                          }}
                        >
                          삭제하기
                        </Button>
                      </>
                    ))}
                </MyBookButtonBox>
              </div>
            </BookInfoBox>
          </BookTopInfo>
          <BookInfoBottom>
            <DescriptionTitle>작품 소개</DescriptionTitle>
            <HorizontalLine color="#666" margin="0 0 16px"></HorizontalLine>
            <p>{bookInfo?.description}</p>
          </BookInfoBottom>
          <MemoBox />
          {/* 기록 업데이트 모달 */}
          {!!bookIsbn && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalAddBook onClose={onClose} bookIsbn={bookIsbn} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

const BookTopInfo = styled.div`
  display: flex;
  gap: 40px;

  & > img {
    width: 200px;
    height: fit-content;
    flex: 0 0 200px;
    border-radius: 3px;
  }
`;

const BookInfoBox = styled.div`
  flex: 1 1 auto;
  padding-top: 22px;
`;

const BookTitle = styled.span`
  font-size: 30px;
  line-height: 1.3em;
  color: #333;
  font-weight: 700;
`;

const BookPublisingInfoTop = styled.div`
  padding: 20px 0;
  font-size: 13px;
  line-height: 120%;
  color: #666;

  & > p {
    &:first-of-type {
      padding-bottom: 6px;
    }
  }

  strong {
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
  font-size: 12px;
  color: #666;

  & > p {
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
  border: 1px solid ${(props) => (props.color ? props.color : '#e6e8eb')};
  margin: ${(props) => (props.margin ? props.margin : '20px 0')};
`;

const BookInfoBottom = styled.div`
  margin-top: 20px;
  & > p {
    font-size: 15px;
    line-height: 1.74em;
    color: #666;
  }
`;

const DescriptionTitle = styled.div`
  font-size: 20px;
  color: #666;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 24px;
  padding: 10px 0 8px;
`;

const MyBookButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export default BookDetailPage;
