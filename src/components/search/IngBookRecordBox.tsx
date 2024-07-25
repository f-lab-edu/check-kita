import DateInput from './DateInput';
import styled from 'styled-components';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
  BookReadingProgressType,
  BookRecordDetail,
  IngBook,
} from '../../shared/interfaces/book.interface';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ModalType } from '../../shared/interfaces/common.interface';

interface IngBookRecordBoxProps {
  recordInfo: IngBook;
  type: ModalType;
  updateRecord: (recordDetail: BookRecordDetail) => void;
}

function IngBookRecordBox({
  recordInfo,
  type,
  updateRecord,
}: IngBookRecordBoxProps) {
  const [startDate, setStartDate] = useState<Date>(recordInfo.startDate);
  const [progressType, setProgressType] = useState<BookReadingProgressType>(
    recordInfo.readingProgressType
  );
  const [progressCount, setProgressCount] = useState<number>(
    recordInfo.readingProgressCount
  );

  const progressCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setProgressCount(Number(value));
  };

  useEffect(() => {
    setStartDate(recordInfo.startDate);
    setProgressType(recordInfo.readingProgressType);
    setProgressCount(recordInfo.readingProgressCount);
  }, [recordInfo]);

  const handleUpdateRecordClick = () => {
    const recordDetail: IngBook = {
      startDate,
      readingProgressType: progressType,
      readingProgressCount: progressCount,
    };

    updateRecord(recordDetail);
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
          <button onClick={() => setProgressType('pages')}>쪽</button>
          <button onClick={() => setProgressType('percentage')}>%</button>
        </ProgressTypeSelector>
      </div>
      <ProgressTypeInputBox>
        <LabelWrapper>
          <MenuBookIcon fontSize="small" />
          <span>읽은 페이지</span>
        </LabelWrapper>

        <ProgressTypeInput>
          <input
            type="number"
            value={progressCount}
            onChange={(e) => progressCountChange(e)}
          />
          <span>{progressType === 'pages' ? '쪽' : '%'}</span>
        </ProgressTypeInput>
      </ProgressTypeInputBox>

      <LabelText>독서 기간</LabelText>
      <DateInput
        labelText={'시작일'}
        atom={{
          value: startDate,
          setValue: setStartDate,
        }}
      ></DateInput>
      <ButtonWrapper>
        <Button width={'100%'} onClick={handleUpdateRecordClick}>
          {type === 'save' ? '저장하기' : '수정하기'}
        </Button>
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

export default IngBookRecordBox;
