import styled from 'styled-components';
import { getDaysInMonth } from '../../shared/utils';
import { DAYS_OF_THE_WEEK } from '../../shared/constants';

function Calendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const startWeek = new Date(year, month - 1, 1).getDay();

  return (
    <Wrapper>
      {/* 요일 */}
      {DAYS_OF_THE_WEEK.map((week) => (
        <WeekBox key={week}>{week}</WeekBox>
      ))}
      {/* 날짜 */}
      {Array.from({ length: startWeek }).map((_, index) => (
        <DateBox key={index + 1}></DateBox>
      ))}
      {Array.from({ length: getDaysInMonth(year, month) }).map((_, index) => (
        <DateBox key={index + 1}>{index + 1}일</DateBox>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 450px;
  display: flex;
  flex-wrap: wrap;
`;

const WeekBox = styled.div`
  border: 10px solid gold;

  flex: 1 0 calc(100% / 7);
`;

const DateBox = styled.div`
  border: 5px solid blue;

  flex: 1 0 calc(100% / 7);
`;

export default Calendar;
