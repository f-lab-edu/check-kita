import styled from 'styled-components';
import { SearchBook } from '../../shared/interfaces/book.interface';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { textOverflowStyles } from '../../shared/styles/\bcommon';
import { changedMoneyFormat, splitBookAuthor } from '../../shared/utils';

interface SearchResultBookProps {
  bookInfo: SearchBook;
}

const HighlightedText = (target: string, search: string) => {
  const parts = target.split(new RegExp(`(${search})`, 'gi'));

  return parts.map((part, index) =>
    part === search ? (
      <strong key={index}>{part}</strong>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

function SearchResultBook({ bookInfo }: SearchResultBookProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const navigate = useNavigate();

  const goToSearchBookDetail = () => {
    navigate(`/book/${bookInfo.isbn}`);
  };

  // TODO: 작가, 출판사 누르면 검색하게 연결

  return (
    <BookWrapper key={bookInfo.isbn}>
      <img
        src={bookInfo.image}
        width={100}
        onClick={goToSearchBookDetail}
        onKeyDown={goToSearchBookDetail}
      />
      <BookInfoContainer>
        <BookTitle lines={2} onClick={goToSearchBookDetail}>
          {HighlightedText(bookInfo.title, search as string)}
        </BookTitle>
        <BookAuthor>
          {splitBookAuthor(bookInfo.author).map((bookAuthor, index) => (
            <span key={index}>
              <span>{bookAuthor}</span>
              {index !== bookInfo.author.split('^').length - 1 && (
                <span>, </span>
              )}
            </span>
          ))}
        </BookAuthor>
        <BookPublisher>{bookInfo.publisher}</BookPublisher>
        <BookDesc lines={3} onClick={goToSearchBookDetail}>
          {bookInfo.description}
        </BookDesc>
        {bookInfo.discount && (
          <BookDisCount>{changedMoneyFormat(bookInfo.discount)}원</BookDisCount>
        )}
      </BookInfoContainer>
    </BookWrapper>
  );
}

const BookWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid rgb(209, 213, 217);
  display: flex;
  gap: 15px;

  & > img {
    flex: 0 0 100px;
    width: 100px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;
  }
`;

const BookInfoContainer = styled.div`
  width: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

interface TextOverflowStylesParams {
  lines: number;
}

const BookTitle = styled.div<TextOverflowStylesParams>`
  font-size: 14px;
  line-height: 1.4em;
  font-weight: 400;
  white-space: normal;
  color: black;
  ${(props) => textOverflowStyles(props.lines)};
  cursor: pointer;
  // TODO; 마우스 호버 밑줄 넣기

  & > strong {
    font-weight: bolder;
  }
`;

const BookAuthor = styled.div`
  font-weight: normal;
  line-height: 1.2em;
  font-size: 14px;
  color: rgb(99, 108, 115);
`;

const BookPublisher = styled.div`
  font-weight: normal;
  line-height: 1.2em;
  font-size: 13px;
  color: rgb(128, 137, 145);
  overflow-wrap: break-word;
`;

const BookDesc = styled.div<TextOverflowStylesParams>`
  color: rgb(102, 102, 102);
  font-size: 13px;
  ${(props) => textOverflowStyles(props.lines)};
  max-height: calc(4.5em);
  line-height: 1.5em;
  margin: 6px 0;
  cursor: pointer;
`;

const BookDisCount = styled.div`
  color: var(--brand-color);
  font-weight: bold;
`;

export default SearchResultBook;
