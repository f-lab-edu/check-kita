import styled from 'styled-components';
import {
  AlreadyBook,
  IngBook,
  ReadingRecord,
  WantBook,
} from '../../shared/interfaces/book.interface';
import { BookRecordTypeLabel } from '../../shared/enums/book.enum';
import RecordTypeIcon from '../common/RecordTypeIcon';

interface BookRecordBoxProps {
  recordId: number | undefined;
  bookRecord: ReadingRecord;
}

function BookRecordBox({ bookRecord, recordId }: BookRecordBoxProps) {
  const { recordType, recordDetail } = bookRecord;

  const RecordDetail = () => {
    switch (recordType) {
      case 'already':
        const { startDate, endDate, rating } = recordDetail as AlreadyBook;
        return <></>;
      case 'ing':
        const { readingProgressType, readingProgressCount } = recordDetail as IngBook;
        return <></>;
      case 'want':
        const { expectationRating, expectationMemo } = recordDetail as WantBook;
        return <></>;
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
  padding: 18px;
`;

const RecordType = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 120%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default BookRecordBox;
