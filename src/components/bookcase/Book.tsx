import styled from 'styled-components';
import { MyBook } from '../../shared/interfaces/book.interface';
import { textOverflowStyles } from '../../shared/styles/\bcommon';
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
      <BookTitle>{myBook.title}</BookTitle>
      <BookAuthor>
        {!!myBook.author &&
          myBook.author.map((author, index) => (
            <>
              <span>{author}</span>
              {myBook.author && index !== myBook.author.length - 1 && (
                <span>, </span>
              )}
            </>
          ))}
      </BookAuthor>
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
  border-radius: 4px;
  width: 100%;
  aspect-ratio: 200/288;
  overflow: hidden;
`;

const BookTitle = styled.span`
  padding-top: 10px;
  line-height: 19px;
  font-size: 16px;
  font-weight: 500;
  ${textOverflowStyles(2)}
`;

const BookAuthor = styled.span`
  padding-top: 8px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2em;
  font-size: 13px;
  color: rgb(128, 137, 145);
  overflow-wrap: break-word;
  ${textOverflowStyles(2)}
`;

export default Book;
