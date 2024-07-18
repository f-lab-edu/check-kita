import styled from 'styled-components';
import {
  wantBookExpectationMemoAtom,
  wantBookExpectationRatingAtom,
} from '../../store';
import Rating from './Rating';
import { useAtom } from 'jotai';
import { MyBook, WantBook } from '../../shared/interfaces/book.interface';
import { useEffect } from 'react';

interface WantBookRecordBoxProps {
  bookRecord: MyBook | undefined;
}

function WantBookRecordBox({ bookRecord }: WantBookRecordBoxProps) {
  const [rating, setRating] = useAtom(wantBookExpectationRatingAtom);
  const [expectationMemo, setExpectationMemo] = useAtom(
    wantBookExpectationMemoAtom
  );
  const memoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventTarget = e.target;

    setExpectationMemo(eventTarget.value);
  };

  useEffect(() => {
    if (!!!bookRecord) return;
    const { readingRecord } = bookRecord;

    if (!!!readingRecord) return;
    const { recordType, recordDetail } = readingRecord;

    if (recordType !== 'want') return;

    const { expectationRating, expectationMemo } = recordDetail as WantBook;

    setRating(expectationRating);
    setExpectationMemo(expectationMemo);
  }, [bookRecord]);

  return (
    <div>
      <LabelText>기대 지수</LabelText>
      <div style={{ marginBottom: '12px' }}>
        <Rating score={rating} setScore={setRating} />
      </div>
      <LabelText>기대평</LabelText>
      <textarea
        value={expectationMemo}
        onChange={(e) => memoChange(e)}
      ></textarea>
    </div>
  );
}

const LabelText = styled.p`
  font-size: 13px;
  margin-bottom: 3px;
`;

export default WantBookRecordBox;
