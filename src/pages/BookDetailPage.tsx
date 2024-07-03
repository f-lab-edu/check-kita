import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchBook } from '../shared/interfaces/book.interface';
import * as api from '../shared/services/searchService';
import styled from 'styled-components';
import { splitBookAuthor } from '../shared/utils';
import { Button, Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalAddBook from '../components/bookDetail/ModalAddBook';
import { useSetAtom } from 'jotai';
import {
  selectedBookAuthorAtom,
  selectedBookIdAtom,
  selectedBookImageAtom,
  selectedBookTitleAtom,
} from '../store';
import { useQuery } from '@tanstack/react-query';
import { getMyBookInfoByBookId } from '../shared/services/myBookService';
import { match } from 'ts-pattern';
import BookRecordBox from '../components/bookDetail/BookRecordBox';

function BookDetailPage() {
  const navigate = useNavigate();
  const { bookIsbn } = useParams();
  const [bookInfo, setBookInfo] = useState<SearchBook>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setBookId = useSetAtom(selectedBookIdAtom);
  const setBookTitle = useSetAtom(selectedBookTitleAtom);
  const setBookImage = useSetAtom(selectedBookImageAtom);
  const setBookAuthor = useSetAtom(selectedBookAuthorAtom);

  const { data: myBook, isLoading } = useQuery({
    queryKey: ['myBook', bookIsbn],
    queryFn: () => getMyBookInfoByBookId(bookIsbn as string),
  });

  // TODO: react-query로 수정하기
  useEffect(() => {
    !!bookIsbn &&
      api
        .searchBookByIsbn(Number(bookIsbn))
        .then((book) => {
          if (!book) {
            // TODO: 에러 컨벤션 정해지면 throw
            // TODO: 알럿 띄우기
            navigate(-1);
            return;
          }

          setBookId(book.isbn);
          setBookTitle(book.title);
          setBookImage(book.image);
          const authors = splitBookAuthor(book.author);
          setBookAuthor(authors);

          setBookInfo(book);
        })
        .catch(() => {
          //TODO: 에러 핸들링
        });
  }, []);

  return (
    <div>
      <BookTopInfo>
        <img src={bookInfo?.image} width={200} />
        <BookInfoBox>
          <BookTitle>{bookInfo?.title}</BookTitle>
          <BookPublisingInfoTop>
            <p>
              {bookInfo?.author &&
                splitBookAuthor(bookInfo?.author).map((bookAuthor, index) => (
                  <span key={index}>
                    <strong>{bookAuthor}</strong>
                    {index !== bookInfo?.author.split('^').length - 1 && (
                      <span>, </span>
                    )}
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
            {myBook && <BookRecordBox bookRecord={myBook.readingRecord} />}
            <MyBookButtonBox>
              {match({ isLoading, myBook })
                .with({ isLoading: true }, () => (
                  <Button onClick={onOpen}>저장하기</Button>
                ))
                .with({ isLoading: false, myBookInfo: null }, () => (
                  <Button onClick={onOpen}>저장하기</Button>
                ))
                .otherwise(() => (
                  <>
                    <Button>수정하기</Button>
                    <Button>삭제하기</Button>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalAddBook onClose={onClose} />
      </Modal>
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
