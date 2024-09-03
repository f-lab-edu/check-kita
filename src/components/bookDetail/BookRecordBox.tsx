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
import { Button } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import * as api from '../../shared/services/myBookService';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../main';

interface BookRecordBoxProps {
  bookRecord: ReadingRecord;
  bookId: string;
}

function BookRecordBox({ bookRecord, bookId }: BookRecordBoxProps) {
  const { recordType, recordDetail } = bookRecord;

  // TODO: 알럿 먼저 띄우기
  const deleteRecord = useMutation({
    mutationFn: () => api.deleteRecordByBookId(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['record', bookId] });
      alert('삭제 성공!');
    },
    onError: () => {
      alert('삭제 실패!');
    },
  });

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
      <Container>
        <RecordType>
          {<RecordTypeIcon recordType={recordType} iconSize="small" />}
          {BookRecordTypeLabel[recordType]}
        </RecordType>
        <RecordDetail />
      </Container>
      <Button
        variant="clear"
        size="24"
        onClick={() => {
          deleteRecord.mutate();
        }}
      >
        <DeleteIcon />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  background-color: var(--wrapper-color);
  border-radius: var(--wrapper-border-radius);
  padding: 18px 24px;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  flex: 1 1 auto;
`;

const RecordType = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: var(--sub-text-color-1);
`;

const ContentWraper = styled.div`
  font-weight: 500;
  color: var(--sub-text-color-2);
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const ContentLabel = styled.span`
  display: inline-block;
  margin-right: 8px;
  color: var(--brand-color-2);
  font-weight: 700;
  line-height: 22px;
`;

const ContentMainText = styled.span`
  color: var(--main-text-color);
  font-weight: 700;
  display: inline-block;
  word-break: break-all;
  line-height: 22px;
`;

const QuoteWrapper = styled.div`
  display: inline-block;
  transform: scaleX(-1);
  height: 24px;
`;

export default BookRecordBox;
