import styled from 'styled-components';
import DateInput from './DateInput';
import Rating from './Rating';
import {
  alreadyBookEndDateAtom,
  alreadyBookRatingAtom,
  alreadyBookStartDateAtom,
} from '../../store';
import { useAtom } from 'jotai';

function AlreadyBookRecordBox() {
  const [alreadyBookStartDate, setAlreadyBookStartDate] = useAtom(
    alreadyBookStartDateAtom
  );
  const [alreadyBookEndDate, setAlreadyBookEndDate] = useAtom(
    alreadyBookEndDateAtom
  );

  const [rating, setRating] = useAtom(alreadyBookRatingAtom);

  return (
    <div>
      <LabelText>독서 기간</LabelText>
      <DateInput
        labelText={'시작일'}
        marginBottom={6}
        atom={{
          value: alreadyBookStartDate,
          setValue: setAlreadyBookStartDate,
        }}
      ></DateInput>
      <DateInput
        labelText={'종료일'}
        marginBottom={12}
        atom={{
          value: alreadyBookEndDate,
          setValue: setAlreadyBookEndDate,
        }}
      ></DateInput>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LabelText>평점을 남겨 주세요!</LabelText>
        <Rating score={rating} setScore={setRating} />
      </div>
    </div>
  );
}

const LabelText = styled.p`
  font-size: 13px;
  margin-bottom: 3px;
`;

export default AlreadyBookRecordBox;
