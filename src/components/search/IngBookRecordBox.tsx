import { useAtom } from 'jotai';
import DateInput from './DateInput';
import {
  ingBookReadingProgressCountAtom,
  ingBookReadingProgressTypeAtom,
  ingBookStartDateAtom,
} from '../../store';
import styled from 'styled-components';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { BookReadingProgressType } from '../../shared/interfaces/book.interface';

function IngBookRecordBox() {
  const [ingBookStartDate, setIngBookStartDate] = useAtom(ingBookStartDateAtom);
  const [progressType, setProgressType] = useAtom(
    ingBookReadingProgressTypeAtom
  );
  const [progressCount, setProgressCount] = useAtom(
    ingBookReadingProgressCountAtom
  );

  const progressTypeChange = (changeType: BookReadingProgressType) => {
    setProgressType(changeType);
  };

  /**
   * 읽은 페이지 수 변경
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const progressCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventTarget = e.target;

    setProgressCount(+eventTarget.value);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3px',
        }}
      >
        <LabelText marginBottom={'0px'}>독서량</LabelText>
        <ProgressTypeSelector>
          <button onClick={() => progressTypeChange('pages')}>쪽</button>
          <button onClick={() => progressTypeChange('percentage')}>%</button>
        </ProgressTypeSelector>
      </div>
      <ProgressTypeInputBox>
        <LabelWrapper>
          <MenuBookIcon fontSize="small" />
          <span>읽은 페이지</span>
        </LabelWrapper>

        <ProgressTypeInput>
          <input
            value={progressCount}
            onChange={(e) => progressCountChange(e)}
          />
          <span>{progressType === 'pages' ? '쪽' : '%'}</span>
        </ProgressTypeInput>
      </ProgressTypeInputBox>

      <LabelText>독서 기간</LabelText>
      <DateInput
        labelText={'시작일'}
        atom={{ value: ingBookStartDate, setValue: setIngBookStartDate }}
      ></DateInput>
    </div>
  );
}

interface LabelTextProps {
  marginBottom?: string;
}

const LabelText = styled.p<LabelTextProps>`
  font-size: 13px;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '3px'};
`;

const ProgressTypeSelector = styled.div`
  // TODO: 슬라이드 애니메이션 넣기
  display: flex;
  align-items: center;
  gap: 4px;

  & > button {
    font-size: 13px;
    line-height: 13px;
    border-radius: 3px;
  }
`;

const ProgressTypeInputBox = styled.div`
  width: 100%;
  border: 1px solid var(--main-text-color);
  border-radius: 3px;
  padding: 3px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const LabelWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--main-text-color);

  & > span {
    font-size: 13px;
    line-height: 13px;
  }
`;

const ProgressTypeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  input {
    text-align: right;
    outline: none;
  }

  span {
    font-size: 13px;
    line-height: 13px;
  }
`;

export default IngBookRecordBox;
