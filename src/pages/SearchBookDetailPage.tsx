import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchBook } from '../shared/interfaces/book.interface';
import * as api from '../shared/services/searchService';
import styled from 'styled-components';
import { changedMoneyFormat, splitBookAuthor } from '../shared/utils';
import { Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ModalAddBook from '../components/search/ModalAddBook';
import { useSetAtom } from 'jotai';
import {
  selectedBookAuthorAtom,
  selectedBookIdAtom,
  selectedBookImageAtom,
  selectedBookTitleAtom,
} from '../store';

function SearchBookDetailPage() {
  const navigate = useNavigate();
  const { bookIsbn } = useParams();
  const [bookInfo, setBookInfo] = useState<SearchBook>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setBookId = useSetAtom(selectedBookIdAtom);
  const setBookTitle = useSetAtom(selectedBookTitleAtom);
  const setBookImage = useSetAtom(selectedBookImageAtom);
  const setBookAuthor = useSetAtom(selectedBookAuthorAtom);

  useEffect(() => {
    bookIsbn &&
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
        .catch((e) => {
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
          <BookDiscountBox>
            <DiscountText>
              <span>판매가</span>
              {bookInfo?.discount && (
                <strong>{changedMoneyFormat(bookInfo.discount)}</strong>
              )}
            </DiscountText>
            <button>구매하러 가기</button>
          </BookDiscountBox>
          {/* TODO: 이미 저장한 책일 경우 별점이랑 삭제 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onOpen}>저장</button>
          </div>
        </BookInfoBox>
      </BookTopInfo>
      <HorizontalLine />
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

const BookDiscountBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DiscountText = styled.p`
  font-size: 13px;
  color: #808991;

  & > strong {
    margin-left: 8px;
    font-size: 16px;
    font-weight: 700;
    color: #1e9eff;
  }
`;

const BookInfoBottom = styled.div`
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

export default SearchBookDetailPage;
