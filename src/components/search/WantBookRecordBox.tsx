import styled from 'styled-components';
import {
  wantBookExpectationMemoAtom,
  wantBookExpectationRatingAtom,
} from '../../store';
import Rating from './Rating';
import { useAtom } from 'jotai';

function WantBookRecordBox() {
  const [rating, setRating] = useAtom(wantBookExpectationRatingAtom);
  const [expectationMemo, setExpectationMemo] = useAtom(
    wantBookExpectationMemoAtom
  );
  const memoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventTarget = e.target;

    setExpectationMemo(eventTarget.value);
  };

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
