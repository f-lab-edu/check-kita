import styled from 'styled-components';
import { SearchBook } from '../../shared/interfaces/book.interface';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { textOverflowStyles } from '../../shared/styles/common';
import { changedMoneyFormat, splitBookAuthor } from '../../shared/utils';
import { useEffect, useState } from 'react';

interface SearchResultBookProps {
  bookInfo: SearchBook;
}

const HighlightedText = (target: string, search: string) => {
  const parts = target.split(new RegExp(`(${search})`, 'gi'));

  return parts.map((part, index) =>
    part === search ? <strong key={index}>{part}</strong> : <span key={index}>{part}</span>
  );
};

function SearchResultBook({ bookInfo }: SearchResultBookProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<string[]>([]);

  const goToSearchBookDetail = () => {
    navigate(`/book/${bookInfo.isbn}`);
  };

  const goToSearchPage = (search: string) => {
    const param = { search };
    const searchString = createSearchParams(param).toString();

    navigate({
      pathname: '/search',
      search: `?${searchString}`,
    });
  };

  useEffect(() => {
    if (!!bookInfo.author) {
      setAuthors(splitBookAuthor(bookInfo.author));
    }
  }, [bookInfo.author]);

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
          {HighlightedText(bookInfo.title, String(search))}
        </BookTitle>
        <BookAuthor>
          {authors.map((bookAuthor, index) => (
            <span key={index}>
              <span
                data-type="author"
                onClick={() => {
                  goToSearchPage(bookAuthor);
                }}
              >
                {bookAuthor}
              </span>
              {index !== authors.length - 1 && <span>, </span>}
            </span>
          ))}
        </BookAuthor>
        <BookPublisher
          onClick={() => {
            goToSearchPage(bookInfo.publisher);
          }}
        >
          {bookInfo.publisher}
        </BookPublisher>
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
  border-bottom: 1px solid var(--border-color);
  display: flex;
  gap: 15px;

  & > img {
    flex: 0 0 100px;
    width: 100px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;
    border-radius: 4px;
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

const BookTitle = styled.span<TextOverflowStylesParams>`
  font-size: 18px;
  line-height: 1.4em;
  font-weight: 400;
  white-space: normal;
  color: black;
  ${(props) => textOverflowStyles(props.lines)};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--main-text-color);
  }

  & > strong {
    font-weight: bolder;
  }
`;

const BookAuthor = styled.div`
  font-weight: normal;
  line-height: 1.2em;
  font-size: 14px;
  color: var(--sub-text-color-1);

  span[data-type='author'] {
    &:hover {
      text-decoration: underline;
      text-decoration-color: var(--main-text-color);
    }
  }
`;

const BookPublisher = styled.div`
  font-weight: normal;
  line-height: 1.2em;
  font-size: 13px;
  color: var(--sub-text-color-2);
  overflow-wrap: break-word;

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--main-text-color);
  }
`;

const BookDesc = styled.div<TextOverflowStylesParams>`
  color: var(--sub-text-color-1);
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
