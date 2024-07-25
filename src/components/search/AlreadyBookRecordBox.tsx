import styled from 'styled-components';
import DateInput from './DateInput';
import Rating from './Rating';

import {
  AlreadyBook,
  BookRecordDetail,
} from '../../shared/interfaces/book.interface';
import { useEffect, useState } from 'react';
import { ModalType } from '../../shared/interfaces/common.interface';
import { Button } from '@chakra-ui/react';

interface AlreadyBookRecordBoxProps {
  recordInfo: AlreadyBook;
  type: ModalType;
  updateRecord: (recordDetail: BookRecordDetail) => void;
}

function AlreadyBookRecordBox({
  recordInfo,
  type,
  updateRecord,
}: AlreadyBookRecordBoxProps) {
  const [startDate, setStartDate] = useState<Date>(recordInfo.startDate);
  const [endDate, setEndDate] = useState<Date>(recordInfo.endDate);
  const [rating, setRating] = useState<number>(recordInfo.rating);

  useEffect(() => {
    setStartDate(recordInfo.startDate);
    setEndDate(recordInfo.endDate);
    setRating(recordInfo.rating);
  }, [recordInfo]);

  const handleUpdateRecordClick = () => {
    const recordDetail: AlreadyBook = { startDate, endDate, rating };

    updateRecord(recordDetail);
  };

  return (
    <div>
      <LabelText>독서 기간</LabelText>
      <DateInput
        labelText={'시작일'}
        marginBottom={6}
        atom={{
          value: startDate,
          setValue: setStartDate,
        }}
      ></DateInput>
      <DateInput
        labelText={'종료일'}
        marginBottom={12}
        atom={{
          value: endDate,
          setValue: setEndDate,
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
      <ButtonWrapper>
        <Button width={'100%'} onClick={handleUpdateRecordClick}>
          {type === 'save' ? '저장하기' : '수정하기'}
        </Button>
      </ButtonWrapper>
    </div>
  );
}

const LabelText = styled.p`
  font-size: 13px;
  margin-bottom: 3px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

export default AlreadyBookRecordBox;
