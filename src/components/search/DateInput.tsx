import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TodayIcon from '@mui/icons-material/Today';
import { setAtom } from 'jotai';

interface DateInputProps {
  labelText: string;
  marginBottom?: number;
  atom: { value: Date; setValue: setAtom };
}

function DateInput({ labelText, marginBottom, atom }: DateInputProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { value, setValue } = atom;

  const setDatePickerOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper onClick={setDatePickerOpen} marginBottom={marginBottom}>
      <LabelWrapper>
        <TodayIcon fontSize="small" />
        <span>{labelText}</span>
      </LabelWrapper>
      <DatePicker
        open={isOpen}
        selected={value}
        onChange={(date: Date | null) => {
          date && setValue(date);
        }}
        dateFormat="yyyy년 MM월 dd일"
        shouldCloseOnSelect={true}
      />
    </Wrapper>
  );
}

interface WrapperProps {
  marginBottom?: number;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  border: 1px solid var(--main-text-color);
  border-radius: 3px;
  padding: 3px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + 'px' : 0};

  & > span {
    font-size: 13px;
    line-height: 13px;
  }

  .react-datepicker-wrapper {
    input {
      cursor: pointer;
      font-size: 14px;
      width: 120px;
      outline: none;
      caret-color: transparent;
      font-weight: 500;
      color: var(--main-text-color);
    }
  }
`;

const LabelWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--main-text-color);
`;

export default DateInput;
