import styled from 'styled-components';
import {
  AlreadyBook,
  IngBook,
  ReadingRecord,
  WantBook,
} from '../../shared/interfaces/book.interface';
import { BookRecordTypeLabel } from '../../shared/enums/book.enum';
import RecordTypeIcon from '../common/RecordTypeIcon';
import { convertDateToDisplayFormat } from '../../shared/utils';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

interface BookRecordBoxProps {
  bookRecord: ReadingRecord;
}

function BookRecordBox({ bookRecord }: BookRecordBoxProps) {
  const { recordType, recordDetail } = bookRecord;

  const RecordDetail = () => {
    switch (recordType) {
      case 'already':
        const { startDate, endDate, rating } = recordDetail as AlreadyBook;

        return (
          <>
            <ContentWraper>
              <ContentLabel>읽은 기간</ContentLabel>
              <ContentMainText>{convertDateToDisplayFormat(startDate)}</ContentMainText>
              {' ~ '}
              <ContentMainText>{convertDateToDisplayFormat(endDate)}</ContentMainText>
            </ContentWraper>
            <ContentWraper>
              <ContentLabel>나의 평점</ContentLabel>
              <ContentMainText>{rating}</ContentMainText>
              {' 점'}
            </ContentWraper>
          </>
        );
      case 'ing':
        const { readingProgressType, readingProgressCount } = recordDetail as IngBook;
        return (
          <>
            <ContentWraper>
              <ContentLabel>시작일</ContentLabel>
              <ContentMainText>
                {convertDateToDisplayFormat((recordDetail as IngBook).startDate)}
              </ContentMainText>
              {' ~ '}
            </ContentWraper>
            <ContentWraper>
              <ContentLabel>독서량</ContentLabel>
              <ContentMainText>
                {readingProgressCount} {readingProgressType === 'pages' ? ' 쪽 ' : ' % '}
              </ContentMainText>
            </ContentWraper>
          </>
        );
        return <></>;
      case 'want':
        const { expectationRating, expectationMemo } = recordDetail as WantBook;
        return (
          <>
            <ContentWraper>
              <ContentLabel>기대지수</ContentLabel>
              <ContentMainText>{expectationRating}</ContentMainText>
              {' 점'}
            </ContentWraper>
            <ContentWraper>
              <ContentLabel>기대평</ContentLabel>
              <QuoteWrapper>
                <FormatQuoteIcon />
              </QuoteWrapper>
              <ContentMainText>{expectationMemo}</ContentMainText>
            </ContentWraper>
          </>
        );
    }
  };

  return (
    <Wrapper>
      <RecordType>
        {<RecordTypeIcon recordType={recordType} iconSize="small" />}
        {BookRecordTypeLabel[recordType]}
      </RecordType>
      {RecordDetail()}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  background-color: var(--wrapper-color);
  border-radius: var(--wrapper-border-radius);
  display: flex;
  padding: 18px 24px;
  gap: 10px 24px;
  flex-wrap: wrap;
  overflow: hidden;
`;

const RecordType = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--sub-text-color-1);
`;

const ContentWraper = styled.div`
  display: inline-block;
  font-weight: 500;
  color: var(--sub-text-color-2);
  display: flex;
  align-items: flex-start;
`;

const ContentLabel = styled.span`
  display: inline-block;
  margin-right: 8px;
  color: var(--brand-color-2);
  font-weight: 700;
`;

const ContentMainText = styled.span`
  color: var(--main-text-color);
  font-weight: 700;
  display: inline-block;
  word-break: break-all;
`;

const QuoteWrapper = styled.div`
  display: inline-block;
  transform: scaleX(-1);
  height: 24px;
`;

export default BookRecordBox;
