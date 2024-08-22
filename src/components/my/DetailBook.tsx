import styled from 'styled-components';
import {
  AlreadyBook,
  BookRecordType,
  IngBook,
  MyBook,
  WantBook,
} from '../../shared/interfaces/book.interface';
import { convertDateToDisplayFormat } from '../../shared/utils';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

interface DetailBookProps {
  record: MyBook;
}

function DetailBook({ record }: DetailBookProps) {
  const navigate = useNavigate();

  const RecordDetail = () => {
    if (!record.readingRecord) return;

    const { recordType, recordDetail } = record.readingRecord;

    switch (recordType) {
      case 'already':
        const { rating } = recordDetail as AlreadyBook;

        return (
          <>
            {/* TODO: 별 UI로 바꾸기 , 디테일페이지 포함 */}
            <ContentWraper recordType={recordType}>
              <ContentLabel>나의 평점</ContentLabel>
              <MainContentBox>
                <ContentMainText>{rating}</ContentMainText>
                {' 점'}
              </MainContentBox>
            </ContentWraper>
          </>
        );
      case 'ing':
        return (
          <>
            <ContentWraper recordType={recordType}>
              <ContentLabel>시작일</ContentLabel>
              <MainContentBox>
                <ContentMainText>
                  {convertDateToDisplayFormat((recordDetail as IngBook).startDate)}
                </ContentMainText>
                {' ~ '}
              </MainContentBox>
            </ContentWraper>
          </>
        );
      case 'want':
        const { expectationRating } = recordDetail as WantBook;
        return (
          <>
            <ContentWraper recordType={recordType}>
              <ContentLabel>기대지수</ContentLabel>
              <MainContentBox>
                <ContentMainText>{expectationRating}</ContentMainText>
                {' 점'}
              </MainContentBox>
            </ContentWraper>
          </>
        );
    }
  };

  const goToDetail = () => {
    navigate(`/book/${record.id}`);
  };

  return (
    <Wrapper onClick={goToDetail}>
      <BookCover src={record.image} />
      <BookInfoWrapper>
        <BookTitle>{record.title}</BookTitle>
        <BookAuthor>{record.author}</BookAuthor>
        {record.readingRecord && <RecordDetail />}
      </BookInfoWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 12px 8px;
  border-radius: var(--wrapper-border-radius);
  background-color: var(--background-color);
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const BookCover = styled.img`
  width: 100px;
  flex: 0 0 auto;
  border-radius: 8px;
`;

const BookInfoWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: 'HakgyoansimWooju';
`;

const BookTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
`;

const BookAuthor = styled.div`
  font-size: 12px;
  color: var(--sub-text-color-1);
`;

interface ContentWraperProps {
  recordType: BookRecordType;
}

const ContentWraper = styled.div<ContentWraperProps>`
  flex: 1 1 auto;
  margin: 4px;
  padding: 4px;
  border-radius: 5px;
  border: 1px solid;
  border-color: ${(props) =>
    props.recordType === 'already'
      ? 'var(--already-text-color)'
      : props.recordType === 'ing'
      ? 'var(--ing-text-color)'
      : 'var(--want-text-color)'};
  background-color: ${(props) =>
    props.recordType === 'already'
      ? 'var(--already-color)'
      : props.recordType === 'ing'
      ? 'var(--ing-color)'
      : 'var(--want-color)'};
`;

const ContentLabel = styled.span`
  font-size: 12px;
  color: var(--sub-text-color-1);
`;

const MainContentBox = styled.div``;

const ContentMainText = styled.span``;

export default DetailBook;
