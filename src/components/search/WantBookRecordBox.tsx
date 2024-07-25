import styled from 'styled-components';
import Rating from './Rating';
import {
  BookRecordDetail,
  WantBook,
} from '../../shared/interfaces/book.interface';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ModalType } from '../../shared/interfaces/common.interface';

interface WantBookRecordBoxProps {
  recordInfo: WantBook;
  type: ModalType;
  updateRecord: (recordDetail: BookRecordDetail) => void;
}

function WantBookRecordBox({
  recordInfo,
  type,
  updateRecord,
}: WantBookRecordBoxProps) {
  const [rating, setRating] = useState(recordInfo.expectationRating);
  const [expectationMemo, setExpectationMemo] = useState(
    recordInfo.expectationMemo
  );

  const memoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventTarget = e.target;

    setExpectationMemo(eventTarget.value);
  };

  useEffect(() => {
    console.log(rating, expectationMemo);
  }, [rating, expectationMemo]);

  const handleUpdateRecordClick = () => {
    const recordDetail: WantBook = {
      expectationRating: rating,
      expectationMemo: expectationMemo,
    };

    updateRecord(recordDetail);
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

export default WantBookRecordBox;
