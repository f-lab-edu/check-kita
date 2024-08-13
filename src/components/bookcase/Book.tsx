import styled from 'styled-components';
import { MyBook } from '../../shared/interfaces/book.interface';
import { textOverflowStyles } from '../../shared/styles/common';
import { useNavigate } from 'react-router-dom';

interface BookProps {
  myBook: MyBook;
}

function Book({ myBook }: BookProps) {
  const navigate = useNavigate();

  const goToBookDetail = () => {
    navigate(`/book/${myBook.id}`);
  };

  return (
    <Wrapper onClick={goToBookDetail}>
      <BookImgWrapper>
        <img src={myBook.image} />
      </BookImgWrapper>
      <BookInfoBox>
        <BookTitle>{myBook.title}</BookTitle>
        {!!myBook.author &&
          myBook.author.map((author, index) => (
            <BookAuthor key={index}>
              <span>{author}</span>
              {myBook.author && index !== myBook.author.length - 1 && <span>, </span>}
            </BookAuthor>
          ))}
      </BookInfoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
`;

const BookImgWrapper = styled.div`
  width: 100%;
  overflow: hidden;

  & > img {
    border-radius: 4px;
  }
`;

const BookInfoBox = styled.div`
  padding-top: 12px;
  font-family: 'HakgyoansimWooju';
`;

const BookTitle = styled.span`
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  ${textOverflowStyles(2)}
`;

const BookAuthor = styled.div`
  padding-top: 6px;
  font-family: 'HakgyoansimWooju';

  span {
    font-family: inherit;
    font-weight: 400;
    font-size: 12px;
    color: var(--sub-text-color-2);
    ${textOverflowStyles(2)}
  }
`;

export default Book;
