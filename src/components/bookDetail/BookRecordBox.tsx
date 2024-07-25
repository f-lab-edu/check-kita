import styled from 'styled-components';
import { ReadingRecord } from '../../shared/interfaces/book.interface';
import { BookRecordTypeLabel } from '../../shared/enums/book.enum';
import { match } from 'ts-pattern';

interface BookRecordBoxProps {
  bookRecord: ReadingRecord;
}

function BookRecordBox({ bookRecord }: BookRecordBoxProps) {
  const { recordType } = bookRecord;

  return (
    <Wrapper>
      <RecordBox>
        <RecordType>{BookRecordTypeLabel[recordType]}</RecordType>
        {/* TODO: 책 기록 퍼블리싱 */}
        {match(recordType)
          .with('already', () => <div></div>)
          .with('ing', () => <div></div>)
          .otherwise(() => (
            <div></div>
          ))}
      </RecordBox>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const RecordType = styled.p`
  font-size: 15px;
  color: #59667a;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 120%;
`;

const RecordBox = styled.div`
  margin-top: 10px;
  border: solid 4px #f2f4f5;
  padding: 20px 26px;
`;

export default BookRecordBox;
